---
title: 'A Wallet Inside an End-to-End Encrypted Messenger'
date: '2019-04-11'
summary: 'End-to-end encryption means the server cannot see what is inside a message. A wallet means the server has to be completely sure about a number. Building both into 24 Messenger meant refusing to let one hide inside the other.'
tags: ['messaging', 'e2e-encryption', 'wallet', 'mqtt', 'architecture']
draft: false
---

At Appscrip a chunk of my work was in-house products built on one shared
real-time backend — chat delivery, presence, and media pipelines over MQTT,
reused across several client-style apps rather than rebuilt each time. 24
Messenger was one of them: a secure Android messenger with end-to-end
encrypted chat, media messages, and a feature that made it more than a chat
clone — a built-in wallet, so users could send and receive money with a
contact without leaving the conversation.

Those two features want opposite things from the server, and the interesting
part of the build was refusing to let the wallet quietly borrow the chat
pipe's trust model.

## What end-to-end encryption actually buys you

The point of E2E encryption is that the server is not a participant it has to
trust. A message is encrypted on the sender's device and only the recipient
can decrypt it. Our backend routes ciphertext and metadata — sender,
recipient, timestamps, delivery state — and never sees plaintext. That is a
deliberate blind spot, and it is the entire value proposition to the user: we
designed the server to not need to know.

## What a wallet needs, which is the opposite

A wallet cannot have a blind spot anywhere near the number that matters. Every
balance change needs a server-side ledger entry, an audit trail, and a single
source of truth that the server itself computed and can defend later. "We
don't actually know what happened in that transfer" is an acceptable property
for a chat message. It is not an acceptable property for money.

So the two features could not share a trust model, even though the product
experience wanted them to feel like one seamless thing — send someone a
message, send someone money, same screen, same contact.

## Keeping them on separate rails

The fix was architectural, not cryptographic: money movement never travels as
encrypted chat payload.

- A wallet transfer is its own authenticated request against a ledger
  service, independent of the messaging pipeline. The server computes the
  balance change directly and durably — nothing about it depends on
  decrypting anything.
- What appears *inside* the conversation is a system-generated reference to
  that transaction (amount, status, a transaction id) — rendered in the chat
  UI so it feels native to the conversation, but it is metadata about a
  transfer that already happened on the ledger, not the transfer itself.
- The chat pipeline's job stayed exactly what it was before the wallet
  existed: move ciphertext and metadata, know nothing about content. The
  wallet's job was to be the one place in the app the server was fully
  trusted, by design, and to stay there.

Nothing about the encrypted messaging path changed to accommodate the wallet.
That was the actual goal — not finding a clever way to move money through an
encrypted channel, but making sure the feature that needed server trust never
had a reason to go looking for it inside the channel that was built to avoid
it.

## What I would keep from this one

- **A feature's trust requirement decides its transport, not its UI
  placement.** Money and messages could sit on the same screen without
  sitting on the same pipe. Where something appears in the product tells you
  nothing about where it should run.
- **"The server can't see this" and "the server must be sure of this" cannot
  share an implementation.** The moment they do, one of the two guarantees is
  no longer real — either the wallet has an auditability gap, or the
  encryption has a plaintext leak.
- **Reusable real-time infrastructure earns its keep by staying boring.** The
  MQTT chat/presence pipeline stayed unchanged across every app built on it,
  24 Messenger included, precisely because we never asked it to carry
  something it wasn't designed for.

## Why I'm writing this down

Most of what I put here is a specific decision I actually had to defend in
production, not a general best practice. If you have built a payment feature
next to an encrypted or otherwise zero-trust channel and drew the boundary
somewhere else, I'd like to hear where and why — email is the fastest way to
reach me.
