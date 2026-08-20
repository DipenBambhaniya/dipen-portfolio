---
title: 'Four data stores, one product'
date: '2026-08-15'
summary: 'Notes on running Cassandra, MongoDB, Redis, and MySQL side by side — what each earned its place doing, and the cost of the seams between them.'
tags: ['databases', 'architecture', 'cassandra', 'mongodb']
draft: true
---

> **Outline / draft.** Structure and argument are sketched; prose is not finished.
> Flesh this out or delete it — it will not appear on the published site while
> `draft: true`.

## Framing

Polyglot persistence gets sold as "right tool for the job." In practice the tools are easy and the **seams** are expensive. This post is about the seams.

## What each store earned

Concrete, not abstract — one paragraph each on the access pattern that justified it:

- **Cassandra** — append-heavy inventory movement history. Partition key choice, and the query that made a wide-row layout obvious.
- **MongoDB** — product documents with genuinely variable shape across categories. Where the schema flexibility paid off and where it quietly cost us.
- **Redis** — read paths and short-lived coordination. The distinction between cache and system-of-record-for-a-few-seconds.
- **MySQL** — anything needing a real transaction. Payments, orders, ledger.

## The seams, which is the actual point

- **No cross-store transaction.** What we did instead: outbox pattern, Kafka, idempotent consumers. See [Idempotency is not a header](/blog/idempotent-payment-flows).
- **Divergent truth.** Two stores disagreeing is not a bug you fix once; it is a steady-state condition you detect and correct. Reconciliation jobs as first-class services.
- **Operational surface.** Four backup strategies, four upgrade paths, four sets of failure modes for on-call to learn. This is the cost nobody quotes.
- **Query fan-out.** The endpoint that needs data from three stores. Why we denormalized instead.

## What I would do differently

Candidate argument: start with one relational store and add a second only when a measured access pattern breaks it. Two of the four were justified by real load. Be specific about which, and honest that the answer is not "all of them."

## Rules of thumb to close on

- A new store needs an access pattern the existing ones provably cannot serve — not a preference.
- Every store you add needs a reconciliation story before it ships, not after.
- Denormalize across the seam rather than querying across it.
