---
title: 'Adding PayPal on Top of Spreedly, Through Braintree'
date: '2026-09-13'
summary: 'PayPal was a new checkout option, but not a new payment pipeline. Routing Spreedly through Braintree as the gateway meant the purchase, refund, and retry code we already had for cards did not need to change.'
tags: ['payments', 'spreedly', 'braintree', 'paypal', 'integrations']
draft: false
---

Card and wallet checkout at Truly-Free already ran on
[Spreedly](https://www.spreedly.com/), with Apple Pay and Google Pay added on
top of it earlier this year. This week the business asked for PayPal as a
checkout option, and the interesting part of the work was how little of the
existing system had to move to get there.

## Where PayPal sits in the chain

Spreedly is a gateway abstraction, not a gateway itself — it still needs a real
processor underneath to move money. For PayPal, that processor is
[Braintree](https://www.braintreepayments.com/), which is itself a PayPal
company and the standard way to accept PayPal through a tokenized
integration. So the call chain for a PayPal order is:

**our backend → Spreedly → Braintree → PayPal**

Spreedly holds the Braintree gateway credentials and exposes it as one more
gateway option alongside the card processor we already use. Braintree is the
piece that actually talks to PayPal — creating the payment method, obtaining
authorization, and settling the transaction — using Braintree's own SDK
conventions under the hood, but from our side it is invisible: we never touch
the Braintree or PayPal SDKs directly, only Spreedly's API.

## Why the existing pipeline didn't need to change

The same property that made Apple Pay and Google Pay cheap to add held here
too: everything downstream of "we have a payment method token" is gateway
agnostic. Purchase, refund, void, retry — all of it keys off that token, not
off which processor is behind it. PayPal just meant:

- Configuring the Braintree gateway in Spreedly with the PayPal-enabled
  Braintree credentials.
- Adding a PayPal button to checkout that creates a Braintree/PayPal payment
  method token through Spreedly, instead of the card iFrame flow.
- Sending that token through the same `purchase` call the card and wallet
  flows already use.

No new state machine, no new refund path, no new webhook handling. The
purchase, settlement, and refund code treats a PayPal-backed token exactly
like a card-backed one.

## One integration, two storefronts

This backend serves both trulyfree.com and Truly-Free Home (TFH). TFH does not
have its own separate payment stack — it places its orders through the same
Truly-Free payment APIs — so the PayPal option landed on both storefronts from
a single change to the Payments service, with no per-brand payment code to
duplicate or keep in sync.

## What I'd keep from this one

- **Gateway abstraction pays off exactly when a new gateway shows up.**
  Spreedly's job is to make "add another way to pay" a configuration and
  token-creation change, not a new integration. That's exactly what happened
  here.
- **The processor behind the gateway is an implementation detail worth
  hiding.** Our code doesn't know or care that Braintree is in the chain
  talking to PayPal — and that's the point. If the gateway changes again,
  the purchase/refund code shouldn't need to.
- **Shared services should mean shared payment rails.** TFH getting PayPal
  "for free" only works because it was never given its own payment stack to
  begin with.
