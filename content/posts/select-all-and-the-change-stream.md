---
title: 'Offer Service — Select All Products'
date: '2026-08-21'
summary: 'A one-click bulk action looks like a UI feature. If you have change streams watching that collection, it is actually a load test you did not schedule. Notes from building the Offer-service at Truly-Free.'
tags: ['mongodb', 'change-streams', 'backpressure', 'architecture']
draft: false
---

I have spent the last decade building backend systems — payments, inventory,
real-time commerce, and the messaging layers that hold them together. Most of
what I have learned came from moments like this one: a request that looked
small on the ticket and was not small at all once it hit production.

## The request was as simple as product requests get

On the Offer-service at Truly-Free, sellers build promotional offers by
choosing which products the offer applies to — one at a time. Fine for a
boutique with forty SKUs. Absurd for a seller with a hundred thousand.

So: add a **Select All** button. Apply the offer to the entire catalogue in
one click.

## The version that looks finished

An hour's work:

```js
await products.updateMany(
  { sellerId },
  { $addToSet: { offers: offerId } }
)
```

One query. Runs in seconds even at six figures. The seller clicks a button, the
offer covers everything, the ticket closes.

This is the version that takes your pipeline down.

## What the write path hides

The products collection has a change stream on it. Anything that mutates a
product document emits an event, and a set of consumers react — reindexing
search, invalidating caches, recomputing projections. That design is deliberate
and it works well, because in normal operation product updates arrive at human
speed: a seller edits a price, one event fires, everything downstream catches up
in milliseconds.

`updateMany` does not arrive at human speed.

A hundred thousand matched documents is a hundred thousand change events, all
inside the few seconds Mongo needs to do the write. The write itself is not the
problem — Mongo is good at this. The problem is that **every consumer watching
the collection now has a hundred thousand events queued**, delivered faster than
any of them was built to drain. Consumer lag climbs, memory climbs behind it,
and the process that dies is not the one that did the write.

There is a second-order version of the same problem: that many documents moving
through the oplog in one burst puts replication pressure on secondaries, so the
blast radius is not limited to your own consumers.

The lesson generalises past Mongo. Change streams, CDC, database triggers,
outbox tables — anything that turns writes into a downstream event stream turns
your bulk operations into traffic spikes. The efficiency of the bulk write is
exactly what makes it dangerous: it compresses hours of normal event volume into
one moment.

## Batching as backpressure

The fix is not a bigger consumer. It is refusing to generate the burst in the
first place — batch the write and pace it deliberately:

```js
for (const batch of chunk(productIds, 50)) {
  await products.updateMany(
    { _id: { $in: batch } },
    { $addToSet: { offers: offerId } }
  )
  await sleep(5_000)
}
```

Fifty documents, then five seconds of nothing. That is a sustained ceiling of
**ten change events per second**, chosen to sit comfortably under what the
slowest consumer can absorb. The burst never forms, so nothing downstream needs
to defend itself.

Note what this is not. It is not a retry policy, and it is not a queue in front
of the consumers. Both of those absorb a spike after you have created it. This
removes the spike at the source, which is cheaper than every alternative and
requires no changes to the consumers at all.

## The part that has to be said out loud

Ten documents per second is 600 a minute. A hundred thousand products is
therefore about **two hours and forty-five minutes** for the offer to fully
apply.

That number changes the feature. It is no longer a button that does a thing — it
is a long-running job, and pretending otherwise is how you end up with a seller
staring at a spinner. So the actual implementation needs:

- **Persisted job state.** The work outlives the request, so it cannot live in
  process memory.
- **Resumability.** Two hours is long enough to overlap a deploy. Track the last
  completed batch and continue from it rather than starting over.
- **Idempotent batches.** A retried batch must not corrupt anything. `$addToSet`
  helps here — reapplying an offer to a product that already has it is a no-op,
  which makes at-least-once delivery safe by construction.
- **Visible progress.** The seller needs to see *42,000 of 100,000 products
  covered*, not an indefinite wait. This is the difference between a slow
  feature and a broken one.

## What I would change next

The batch size and the delay are constants, and constants are a first version.
They were picked to be safely below observed consumer throughput, which means
they are wrong in both directions: too slow when the system is idle, and still
too fast if a consumer is degraded for an unrelated reason.

The better shape is to read consumer lag and adapt — widen the batch while lag
is near zero, back off when it grows. That turns a guess into a control loop,
and it is the version I would build if this had to handle a million products
instead of a hundred thousand.

## Three things worth keeping

- **A bulk write is a traffic spike.** If anything observes your writes, the
  size of the operation is the size of the incident.
- **Throttle at the source.** Pacing the producer is simpler and cheaper than
  hardening every consumer against a burst you chose to create.
- **Any operation slow enough to need pacing is a background job.** Give it
  persisted state, resumability, and a progress number before you ship it, not
  after the first support ticket.

## Why I'm writing this down

Most of what shows up here will be this kind of note: a trade-off I actually
had to make, a failure mode I actually hit, or a gap between a third-party API
and its documentation. Not tutorials, not framework advocacy — if I recommend
something, it is because I ran it in production and can describe what went
wrong. If you have hit this same wall from a different angle, I would
genuinely like to hear about it — the fastest way to reach me is email.
