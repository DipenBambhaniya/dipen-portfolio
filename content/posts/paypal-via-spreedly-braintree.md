---
title: 'Adding PayPal on Top of Spreedly, Through Braintree'
date: '2026-09-13'
summary: 'PayPal was a new checkout option, but not a new payment pipeline. The harder part was that our Payments service quietly serves two platforms with two separate gateways, and PayPal had to land on both.'
tags: ['payments', 'spreedly', 'braintree', 'paypal', 'multi-tenant', 'integrations']
draft: false
---

Card and wallet checkout at Truly-Free already ran on
[Spreedly](https://www.spreedly.com/), with Apple Pay and Google Pay added on
top of it earlier this year. This week the business asked for PayPal as a
checkout option, and the interesting part of the work was less about PayPal
itself and more about where it had to land: this Payments service serves two
platforms, on two separate gateways, and PayPal needed both.

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

## One service, two platforms, separate gateways

The Payments service does not serve one storefront — it serves two: the
Truly-Free (TF) marketplace, where multiple stores, affiliates, and customers
transact, and Truly-Free Home (TFH), a single-brand store site. TFH used to run
its payments through [Sticky](https://sticky.io/) entirely outside this
service; when the business requirement changed, TFH moved onto the same
Payments service TF already used, rather than staying on its own stack.

"Same service" does not mean "same gateway." TF and TFH each have their own
Braintree merchant account, so PayPal — and cards, Apple Pay, and Google Pay —
resolve to different Spreedly/Braintree gateway credentials depending on which
platform the request came from. We record which platform every request
belongs to as a plain column on the payment record. It is not used for any
clever routing logic beyond gateway selection; the honest reason it exists is
monitoring — being able to see TF and TFH volume, failure rates, and payment
mix separately, and to know at a glance which gateway account a given
transaction actually went through.

So adding PayPal was not "add a Braintree gateway" — it was "add a Braintree
gateway on each platform's Spreedly account," configured and tested twice,
selected by that same platform column at charge time.

## What I'd keep from this one

- **Gateway abstraction pays off exactly when a new gateway shows up.**
  Spreedly's job is to make "add another way to pay" a configuration and
  token-creation change, not a new integration. That held for both platforms.
- **The processor behind the gateway is an implementation detail worth
  hiding.** Our purchase/refund code doesn't know or care that Braintree is in
  the chain talking to PayPal, or which platform's Braintree account it is —
  and that's the point.
- **A cheap discriminator column is worth adding before you need it for
  logic.** The platform column was added purely for monitoring. It turned out
  to be exactly the field gateway selection needed once TFH stopped being a
  separate stack — no migration to bolt it on later.
- **"One service" is a claim about code, not about credentials.** TF and TFH
  sharing a Payments service didn't mean sharing a merchant account. Keeping
  the gateways separate per platform, with the service itself shared, was the
  actual design decision here.
