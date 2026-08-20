---
title: 'What I write about here'
date: '2026-08-20'
summary: 'A short note on the kinds of backend problems I find worth writing down — and what to expect from this space.'
tags: ['meta', 'backend']
draft: false
---

I have spent the last decade building backend systems — payments, inventory, real-time commerce, and the messaging layers that hold them together. Most of what I have learned came from production incidents rather than from design documents, and very little of it made it into writing.

This is where I intend to fix that.

## What this space is for

Three kinds of posts, roughly:

- **Trade-offs I actually had to make.** Choosing Cassandra over MongoDB for write-heavy movement history is a decision with consequences six months later. Those consequences are the interesting part, and they are usually missing from the blog posts that recommend the technology.
- **Failure modes.** Retries that double-charge. Consumers that fall behind and never catch up. Rate limits discovered at 2 a.m. The mechanics of how a distributed system breaks are more instructive than the diagram of how it works.
- **Integration reality.** Third-party APIs — tax engines, ad platforms, payment processors — behave nothing like their documentation. Notes on closing that gap.

## What it is not

Not tutorials, and not framework advocacy. There are enough of both. If a post recommends something, it is because I ran it in production and can describe what went wrong.

## Where to find me

The fastest way to reach me is email. If something here is wrong, or you have hit the same problem from a different angle, I would genuinely like to hear about it — that is most of the value of writing this down in public.
