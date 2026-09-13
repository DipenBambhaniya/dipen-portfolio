---
title: 'Content Moderation in social-v1: Google Scores, Admin Thresholds'
date: '2024-02-19'
summary: 'Google will hand you a probability that a piece of content is toxic or unsafe. It will not tell you what to do with it. That decision — and the escape hatch around it — is the part worth writing down.'
tags: ['moderation', 'trust-safety', 'social', 'google-cloud']
draft: false
---

Before social-v1 had moderation, it had a support queue. Every reported post,
comment, or product listing was a human looking at content after the fact,
deciding case by case, with no consistency between reviewers and no way to
stop the worst of it from ever going live. This is a note about replacing that
with an automated pass that still leaves a human in charge of the actual
policy.

## What gets checked

Moderation runs on every kind of content the platform accepts, not just posts:

- **Social posts** — text, images, and video.
- **Comments** on those posts.
- **Product listings** — product images and product descriptions, since a
  seller-authored description is just as capable of being abusive or unsafe as
  a social caption is.

Text, image, and video each go through a different Google API suited to that
media type, but they all land in the same shape afterward: a set of category
scores that the rest of the pipeline treats uniformly regardless of where they
came from.

## Google gives you a score, not a verdict

The category names differ by content type — toxicity, insult, and harassment
for text; unsafe categories like adult and violent content for images and
video — but the response shape is the same idea everywhere: a probability per
category, not a yes/no. Google is not making the moderation decision. It is
handing back a number and leaving the decision to whoever configured the
integration.

That is the part that has to be designed, not just wired up.

## The decision is a threshold, and the threshold is the admin's

For each content type, an admin sets an **allowed percentage** per category —
the ceiling below which content is considered safe. A common default is
something like 60%, but it is not hardcoded: it is a per-category,
per-content-type setting, because a marketplace description and a social
comment do not deserve the same tolerance for, say, profanity.

At submission time, the content goes to Google, the response comes back with
its category scores, and each score is compared against the admin's
configured ceiling for that category:

- **Every score at or under its ceiling** → auto-approved. It goes live
  without a human touching it.
- **Any score over its ceiling** → auto-rejected, with the offending category
  and score attached, so the "why" is not a mystery to whoever looks at it
  later.

The threshold, not the raw Google score, is the actual moderation policy.
Google is a sensor; the admin configuration is the decision function.

## The override, because automated is not the same as correct

No threshold survives contact with real content forever. Sarcasm reads as
insult, medical or educational content trips the adult-content category,
brand names get caught in a profanity filter that was never trying to catch
them. So admins have a manual override on top of the automated pass — **force
approve** or **force reject** on any individual item, regardless of what
Google returned or which side of the threshold it landed on.

The override is not a bypass hack bolted on afterward; it is what makes the
automated system safe to trust in production. Automation handles the volume.
The override handles the cases automation gets wrong, and it is the reason a
false positive costs one admin click instead of a support ticket and a
week's wait.

## What I would keep from this one

- **Never let a third-party score double as your policy.** Google's numbers
  are an input. The threshold that turns a number into approve/reject is a
  business decision, and it has to live in configuration an admin controls,
  not in the code that calls the API.
- **Different content deserves different tolerance.** A single global
  threshold for "toxicity" ignores that a product description and a social
  comment fail differently and should be allowed to.
- **Automate the volume, not the judgment call.** The bulk of content is
  unambiguous in either direction — the override exists for the minority that
  is not, and pretending that minority doesn't exist is how automated
  moderation loses trust.

## Why I'm writing this down

Most of what lands here is this kind of note — a trade-off I actually had to
make, or a gap between what a third-party API gives you and what the product
actually needs. If you have built moderation or trust-and-safety tooling on a
different stack and hit similar edges, I would like to hear about it. Email is
the fastest way to reach me.
