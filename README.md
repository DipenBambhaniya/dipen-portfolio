# dipen-portfolio

Personal portfolio site for **Dipen Bambhaniya** — Lead Software Engineer.

Built with Next.js (App Router), TypeScript, and Tailwind CSS v4. Statically
exported, so it deploys to GitHub Pages with no server.

## Running locally

Requires Node.js 20+ (this machine has a portable Node 24 at
`C:\Users\conta\.local\node`, already on your user `PATH`).

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run typecheck  # tsc --noEmit
npm run build      # static export into ./out
```

`npm run build` writes a fully static site to `out/`. To preview that build
exactly as Pages will serve it:

```bash
npx serve out
```

## Editing content

Almost nothing is hard-coded in JSX. Two places to edit:

| What | Where |
| --- | --- |
| Name, title, summary, contact details | [`src/content/profile.ts`](src/content/profile.ts) |
| Skills, experience, projects, education, nav | [`src/content/profile.ts`](src/content/profile.ts) |
| Blog posts | [`content/posts/*.md`](content/posts/) |
| Résumé PDF | [`public/resume.pdf`](public/) |
| Colours, fonts, markdown styles | [`src/app/globals.css`](src/app/globals.css) |

### Projects

`projects` in `profile.ts` has optional `repoUrl` and `liveUrl` fields. They are
omitted right now, so no links render. Add either one and the card grows a
footer with the link.

### Blog posts

One markdown file per post in `content/posts/`. Front matter:

```yaml
---
title: 'Post title'
date: '2026-08-20'      # YYYY-MM-DD, used for sorting
summary: 'One or two sentences shown in listings.'
tags: ['payments', 'distributed-systems']
draft: true             # true = visible in `npm run dev`, excluded from builds
---
```

Reading time is computed from word count — don't set it manually.

**Two of the three posts shipped here are outlines, marked `draft: true`.** They
are structure and argument only, not finished prose, and they will not appear on
the deployed site. Flesh them out or delete them. Only `hello.md` is published.

## Theming

Light and dark are CSS custom properties in `globals.css`. The site follows the
OS preference until the user clicks the toggle, after which the choice is stored
in `localStorage` and an inline script in `layout.tsx` applies it before first
paint so there's no flash.

To change the accent colour, edit `--accent` and `--accent-soft` in both `:root`
and `.dark`.

## Deployment

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and
publishes on every push to `main`.

**One-time setup:** in the repo, go to **Settings → Pages → Build and
deployment → Source** and select **GitHub Actions**. The workflow fails until
this is set.

The site then serves from `https://<user>.github.io/dipen-portfolio/`.

### Base path

A project Pages site lives under `/<repo>`, not the domain root, so the workflow
sets `NEXT_PUBLIC_BASE_PATH=/dipen-portfolio` at build time.
[`next.config.mjs`](next.config.mjs) feeds that into `basePath` and
`assetPrefix`. Locally the variable is unset, so everything serves from `/`.

Next rewrites `<Link>` hrefs and `/_next` assets automatically. Plain `<a href>`
and `<img src>` pointing into `public/` do **not** get rewritten — wrap those in
`withBasePath()` from [`src/lib/basePath.ts`](src/lib/basePath.ts). The résumé
link already does.

**If you move to a custom domain** or rename the repo to
`<user>.github.io`, delete the `env:` block from the build step in the workflow
and add a `public/CNAME` file containing your domain.

## Notes

- `public/.nojekyll` stops GitHub from trying to process `_next/` as Jekyll.
- `trailingSlash: true` in the Next config keeps nested routes such as
  `/blog/hello/` resolving correctly on static hosting.
- `images: { unoptimized: true }` is required for `output: 'export'`.
