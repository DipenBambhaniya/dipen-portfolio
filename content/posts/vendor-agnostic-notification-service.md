---
title: 'One Send Function, Six SMS Vendors, and a Template Name'
date: '2020-06-23'
summary: 'A hundred-plus client apps meant a hundred-plus reasons to need SMS or email, on whatever vendor that client already had a contract with. The fix was one gRPC service with one function per channel, driven entirely by configuration.'
tags: ['notifications', 'grpc', 'sms', 'email', 'architecture']
draft: false
---

By the time I had shipped somewhere north of a hundred client apps on
Appscrip's in-house product line — mostly TikTok-, Instagram-, and
Tinder-style clones customized off our base app, plus a run of individual
builds like Sales Paddock, an insurance-industry app, and Intrvu — one need
showed up in every single one: send an OTP, send a transactional notice, run
a marketing campaign. Rebuilding that per client was the actual waste, not
the clone customization itself.

## The constraint that shaped it: nobody agrees on a vendor

Every client already had, or picked, their own SMS and email provider. Across
the client base that meant supporting Twilio, Amazon SNS, MSG91, Bandwidth,
Infobip, and Bird for SMS, and SendGrid, Mailgun, Amazon SES, and Mailjet for
email. A service hard-coded to one vendor would have needed a fork per client.
A service with a vendor-shaped API for every vendor would have needed a
client-side integration decision per client, which defeats the point of a
shared service.

So the actual design goal was narrower than "support these vendors." It was:
**the caller should not need to know which vendor is behind the call.**

## One function per channel, configuration underneath

The service exposes exactly one send operation for SMS and one for email over
gRPC. Every vendor plugs into the same interface behind it — vendor
credentials live in per-client configuration, not in the calling code, and
switching a client from one vendor to another is a config change, not a
redeploy.

That alone would not be enough, though, because "per client" was too coarse a
unit. A single client can have more than one vendor for different purposes —
transactional OTPs on one provider, marketing blasts on a cheaper or
higher-throughput one. So the send call takes an explicit parameter for which
configured vendor slot to send *from*, scoped per client, not a single
implicit default.

## Content lives outside the request

The other piece worth calling out: the send request never carries the message
body. It carries a `template_name` — a unique key resolved server-side into
the actual content. Two things fall out of that:

- **Copy changes do not touch calling code.** Every client app that fires an
  OTP message references the same template name; the wording, localization,
  or compliance disclaimer text can change centrally without a single caller
  redeploying.
- **The wire payload is structural, not content.** A gRPC call carrying a
  template name and a data payload to interpolate is a much smaller surface
  to validate and audit than one carrying arbitrary message text per call
  site.

Email got one more thing SMS did not need: attachments as a repeatable field,
since invoices, receipts, and reports are a normal reason to send an email and
none of them fit in a template string.

## What made it worth building once

This is the same shape of problem I hit again years later on Truly-Free's
Payments service — Spreedly abstracting card gateways so the purchase code
never had to know which processor was underneath. Here it was notifications
instead of payments, but the lesson transfers directly: when the thing that
varies is *which vendor*, put the abstraction at the boundary and make
everything past it vendor-blind. That is also exactly why this service outlived
the client apps it was built for — Truly-Free's SMS runs on it years later,
unchanged, because the interface was never about any one vendor to begin with.

## What I would keep from this one

- **Design for "nobody agrees on a vendor," not for today's vendor.** The
  moment a service assumes one provider, every new client with a different
  contract becomes a special case instead of a config entry.
- **A unit for configuration is not the same as a unit for routing.** "Per
  client" was the right scope for credentials, but the right scope for
  routing a specific send was "per client, per use case" — collapsing the two
  would have forced every client onto one vendor for everything.
- **Keep content out of the transport.** A template name is a smaller,
  safer, more centrally editable contract than a message body passed on every
  call.

## Why I'm writing this down

Most of what lands here is a specific trade-off from a system I actually
shipped, not general advice. If you've built a notification layer across a
similarly wide vendor spread and drew the line between "configuration" and
"per-call parameter" somewhere else, I'd like to hear how. Email is the
fastest way to reach me.
