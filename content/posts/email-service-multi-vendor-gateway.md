---
title: 'The Email Service That Took Longer Than SMS, and Why'
date: '2020-08-10'
summary: 'Same shape of problem as the SMS service — one call, many vendors, no client agreeing on which one. It still took about a month and a half instead of one, and attachments were the entire reason.'
tags: ['notifications', 'email', 'grpc', 'architecture']
draft: false
---

Right after the multi-vendor SMS service shipped, the same need showed up for
email across the same client base: OTPs, transactional notices, marketing
campaigns, and now reports and receipts too. I expected the email service to
be a quick copy of the SMS one with a different vendor list. It took about a
month and a half instead of the month SMS took, and the gap was almost
entirely attachments.

## The same abstraction, reused on purpose

The shape carried over directly, because the underlying problem was
identical: every client already had, or had picked, their own provider —
here SendGrid, Mailgun, Amazon SES, and Mailjet — and a service tied to one
of them would have meant a fork per client.

So the email service kept the same three decisions the SMS service made:

- **One send function, vendor behind the interface.** Vendor credentials live
  in per-client configuration; switching vendors is a config change.
- **A "from" parameter scoped per client, not a global default** — the same
  client can run transactional email through one vendor and marketing sends
  through another.
- **Content resolved by `template_name`, not passed in the request** — copy
  changes centrally without any caller redeploying.

None of that needed rethinking. It is the part that came after where SMS
stopped being a useful template.

## Where the extra time went: attachments

SMS is a string. Email is not. Invoices, receipts, and reports are a normal
reason to send an email, and none of them fit in a template string — so the
service needed a way to attach files, and specifically *multiple* files per
send, as a repeatable field on the request rather than a single optional
blob.

That single feature dragged in everything that makes email harder than SMS
in practice:

- **Every vendor's attachment API is shaped differently.** Some want raw
  bytes, some want a hosted URL, size limits and encoding expectations differ
  across SendGrid, Mailgun, SES, and Mailjet — all of which the "one
  interface" promise still had to hide from the caller.
- **Multiple attachments per send meant the request shape itself needed to
  change**, not just the vendor adapter underneath it — a repeatable
  attachment field, each with its own filename and content type, sitting
  alongside the existing template/data payload.
- **Failure modes multiply.** An SMS either sends or it doesn't. An email
  with three attachments can fail on the second one after the first already
  queued, and the four vendors do not agree on how they report that back.

None of this touched the routing or template design — that part was done in
the first week. The rest of the month and a half was normalizing four
providers' worth of attachment behavior behind a request shape that looks
the same to every caller regardless of which vendor a given client is on.

## What I would keep from this one

- **A shared shape does not mean a shared timeline.** SMS and email look like
  the same problem from a distance — one send call, many vendors — and the
  routing and templating logic really was identical. The content model
  underneath was not, and that is where the schedule actually went.
- **Let the hard channel tell you where the abstraction is thin.** Building
  SMS first, then email, surfaced exactly which parts of the design were
  genuinely channel-agnostic (routing, per-client vendor selection,
  templates) versus which were quietly SMS-shaped (a single string, no
  attachments) and needed to be generalized, not just reused.
- **Attachments are a request-shape decision, not a vendor-adapter detail.**
  Repeatable file fields had to be part of the contract every caller saw, not
  something patched in per vendor underneath it.
