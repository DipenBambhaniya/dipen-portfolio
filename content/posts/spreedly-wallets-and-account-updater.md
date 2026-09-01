---
title: 'Apple Pay, Google Pay, and Card Auto-Update on Spreedly'
date: '2026-03-10'
summary: 'The card purchase flow was already on Spreedly. Adding wallet payments and a network account updater on top of it was mostly an exercise in not touching the code that already worked.'
tags: ['payments', 'spreedly', 'apple-pay', 'google-pay', 'integrations']
draft: false
---

I have spent the last decade on backend systems — payments, inventory, and the
integration glue between them. This is a note about a payments change at
Truly-Free that went smoothly for one specific reason, and a second part of the
same project that did not, for reasons the third-party docs do not spell out.

## The flow that already existed

Card checkout at Truly-Free runs on [Spreedly](https://www.spreedly.com/). The
shape is standard: the card fields on the checkout page are a Spreedly iFrame,
not our inputs. The customer types a number, Spreedly tokenizes it client-side
and hands the browser back a **payment method token**. Our backend never sees a
PAN — it sees that token, and it calls Spreedly's `purchase` endpoint against
the configured gateway with it.

The property that mattered later: everything after *"we have a payment method
token"* is agnostic to how the token was created. Purchase, authorize, capture,
void, refund, retry — all of it keys off that one opaque string. The gateway
underneath can change and none of that code notices.

## Wallets are just another way to mint that token

Apple Pay and Google Pay look like a big feature from the outside. In Spreedly's
model they are a different front door to the same hallway.

The browser hands you an encrypted wallet payload — an Apple Pay payment token,
or a Google Pay token. You send that to Spreedly's create-payment-method
endpoint with the wallet-specific shape, and you get back the same kind of
payment method token the iFrame produces. The purchase call after that is
byte-for-byte the code that already existed.

So the work was not in the payment pipeline. It was in the setup around it:

- **Apple Pay merchant validation.** Host the domain association file at
  `/.well-known/apple-developer-merchantid-domain-association`, and stand up a
  backend endpoint that answers the `onvalidatemerchant` callback by calling
  Apple's validation URL with the merchant identity certificate. This is a
  handshake that has nothing to do with Spreedly and fails opaquely if the
  domain, merchant ID, or certificate disagree.
- **Certificates registered with Spreedly.** Spreedly generates the CSR, you
  round-trip it through Apple, and hand the certificate back so Spreedly can
  decrypt the Apple Pay token on its side.
- **Google Pay gateway wiring.** The gateway merchant ID in the Google Pay
  configuration has to point at the Spreedly environment, not at the underlying
  processor. Get this wrong and the sheet renders, the customer taps, and the
  charge fails with nothing useful in the response.
- **Sandbox not matching production.** The wallet sandboxes and Spreedly's test
  environment have their own combinations of what works, so "green in test" was
  not proof of anything until it was green end to end.

None of the refund, dispute, or retry code changed. The new payment surface sits
on top of the same pipe.

## Account Updater: the part with the sharp edges

The second piece was card auto-update — enrolling stored cards in the card
networks' account updater service so that when a customer's card expires or gets
reissued, the stored credential is refreshed instead of just starting to decline.

Spreedly offers this as a managed feature. The integration is small. The
decisions around it are not.

**It only works on retained payment methods.** Spreedly purges a payment method
token shortly after creation unless you explicitly `retain` it. If you did not
retain, there is nothing to enroll, and you find this out when the enrollment
job silently does nothing.

**It has a per-enrollment cost.** That single fact shaped the design more than
any technical constraint. We do not enroll every card that ever touched
checkout — we enroll cards attached to something that will actually be charged
again: active subscriptions and cards a customer explicitly saved for reuse. The
enrollment job filters on that, and the filter is the feature.

**"Updated" is not "will succeed."** The results come back in three classes —
updated, closed, and unchanged — and only *closed* has an obvious action: route
the customer into a dunning flow and ask for a new card. An *updated* card can
still decline on the next charge for unrelated reasons, so the update is new
information, not a guarantee. Each of the three outcomes needs its own branch,
including the boring one where nothing changed.

**Do not swap card data silently.** If the updater changes the number, the
last-four the customer sees in their saved payments has to change with it.
Otherwise support gets "there is a card here I do not recognize" tickets, and
those are worse than a decline.

## What I would keep

- **A clean tokenization boundary pays compound interest.** The wallet work was
  small because *"get a payment method token"* was already the seam in the
  system. Every later payment method plugs into that same point.
- **Read the third-party's cost model before designing the batch job.** Account
  Updater's pricing decided which cards we enroll. That belonged in the design
  review, not in a billing surprise a month later.
- **Every external "we changed your data" event needs a branch per outcome.**
  Updated, closed, unchanged — and the customer-visible state has to track the
  change, not just the database.

## Why I'm writing this down

Most of what lands here is this kind of note — a gap between a third-party API
and its documentation, or a trade-off I actually had to make in production. If
you have integrated wallets or account updater on a different platform and hit
the same edges from another angle, I would like to hear about it. Email is the
fastest way to reach me.
