---
title: 'Idempotency is not a header'
date: '2026-08-18'
summary: 'Why an idempotency key alone does not make a payment flow safe, and where the real state machine has to live.'
tags: ['payments', 'distributed-systems', 'reliability']
draft: true
---

> **Outline / draft.** Structure and argument are sketched; prose is not finished.
> Flesh this out or delete it — it will not appear on the published site while
> `draft: true`.

## The claim to argue against

"We pass an `Idempotency-Key`, so retries are safe." This is the belief worth dismantling — the header only deduplicates at the edge. It says nothing about the four or five writes that happen behind it.

## The scenario to walk through

- Client POSTs a charge, network drops before the response.
- Client retries with the same key.
- Meanwhile the first request is still in flight, halfway through: payment intent created at the processor, ledger row not yet written.

Points to cover:

- What "in flight" means for the dedupe store — a key that exists but has no result yet is the hard case, not the easy one.
- Why returning `409 Conflict` is more honest than blocking.
- Why the processor's own idempotency and yours are different concerns.

## Where the state machine belongs

The argument: idempotency is a property of a **persisted state machine**, not of a request handler. Sketch:

- One row per logical operation, created before any external call.
- Explicit terminal and non-terminal states.
- Every external call keyed by that row's id, not by the client's key.

## The reconciliation loop

Nothing above survives a crash between the external call and the local commit. Needs a section on:

- Sweeping non-terminal rows older than N minutes.
- Querying the processor as source of truth.
- Why this loop, not the retry header, is what actually makes the system correct.

## What to measure

- Rate of duplicate-key hits that resolved to in-flight.
- Age distribution of non-terminal rows.
- Reconciliation corrections per day — should trend toward zero, never reach it.
