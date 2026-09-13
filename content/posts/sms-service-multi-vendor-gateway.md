---
title: 'A Multi-Vendor SMS Service Behind One gRPC Call'
date: '2020-06-23'
summary: 'Six SMS vendors, a hundred-plus clients, and no client agreeing on which one to use. About a month of work went into making that the last time it would matter to any caller.'
tags: ['notifications', 'sms', 'grpc', 'architecture']
draft: false
---

By the time I had shipped somewhere north of a hundred client apps on
Appscrip's in-house product line — mostly TikTok-, Instagram-, and
Tinder-style clones customized off our base app, plus individual builds like
Sales Paddock — one need showed up in every single one: send an OTP, send a
transactional notice, run a marketing campaign, all over SMS. It took about a
month to build the service that made that a solved problem instead of a
per-client integration.

## The constraint that shaped it: nobody agrees on a vendor

Every client already had, or picked, their own SMS provider. Across the
client base that meant supporting Twilio, Amazon SNS, MSG91, Bandwidth,
Infobip, and Bird. A service hard-coded to one vendor would have needed a
fork per client. A service with a vendor-shaped API for every vendor would
have needed a client-side integration decision per client, which defeats the
point of a shared service.

So the actual design goal was narrower than "support six vendors." It was:
**the caller should not need to know which vendor is behind the call.**

## One function, configuration underneath

The service exposes exactly one send operation over gRPC. Every vendor plugs
into the same interface behind it — vendor credentials live in per-client
configuration, not in the calling code, and switching a client from one
vendor to another is a config change, not a redeploy.

That alone would not be enough, though, because "per client" was too coarse a
unit. A single client can have more than one vendor configured for different
purposes — transactional OTPs on one provider, marketing blasts on a cheaper
or higher-throughput one. So the send call takes an explicit parameter for
which configured vendor slot to send *from*, scoped per client, not a single
implicit default.

## Content lives outside the request

The send request never carries the message body. It carries a
`template_name` — a unique key resolved server-side into the actual content.
Two things fall out of that:

- **Copy changes do not touch calling code.** Every client app that fires an
  OTP message references the same template name; the wording, localization,
  or compliance disclaimer text can change centrally without a single caller
  redeploying.
- **The wire payload is structural, not content.** A gRPC call carrying a
  template name and a data payload to interpolate is a much smaller surface
  to validate and audit than one carrying arbitrary message text per call
  site.

## What made a month enough

A month is fast for six vendor integrations, and it worked because the scope
was genuinely narrow: SMS is a single string with strict length and encoding
rules, delivery is fire-and-forget from the caller's point of view, and none
of the six vendors needed anything as involved as attachments or multi-part
content. Normalizing six "send a text" APIs behind one interface is a much
smaller problem than it sounds like, once content and routing are pulled out
of the calling contract. That would not hold for email, which is the next
piece of this — and took considerably longer.

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

This same service later carried Truly-Free's SMS, unchanged, years after the
client apps it was originally built for — which is the actual payoff of
building the abstraction once instead of per client.
