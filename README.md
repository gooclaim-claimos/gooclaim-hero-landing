# gooclaim-hero-landing

The marketing site for **Gooclaim OS** — a Claim OS for India's TPAs and insurers.

Live at **https://www.gooclaim.com** (Vercel, deployed from `main`).

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:5174 (fixed port)
```

The waitlist form posts to `/api/waitlist`. In dev, `vite.config.ts` serves the same
`api/waitlist.ts` that Vercel runs in production, so no `vercel dev` is needed. It needs the
environment variables below in `.env.local`. Without them the form shows an error, and the
rest of the site works.

**Where leads come from (no cookies).** Tag links you share, for example
`https://www.gooclaim.com/?utm_source=linkedin&utm_campaign=launch`. When the site loads, it reads
the `utm_*` tags once and keeps them in memory only: no cookie and no storage. They survive moving
between pages. The form appends them to its `source` field, for example
`hero-primary · utm_source=linkedin, utm_campaign=launch`, so they reach the waitlist sheet and the
team email without any change to the sheet. See `sourceWithUtm()` in `src/lib/waitlist.ts`.

> ⚠️ Submitting the form for real writes a row to the waitlist sheet and sends real emails.
> When testing, stub `fetch` or leave the env vars unset.

## Scripts

```bash
npm run dev          # dev server on :5174
npm run build        # tsc → client build → SSR bundle → prerender all 19 routes into dist/
npm run build:client # client bundle only
npm run build:ssr    # SSR bundle only (dist-ssr/)
npm run prerender    # prerender against an existing dist/ and dist-ssr/
npm run preview      # serve dist/ locally
npm run typecheck    # tsc --noEmit
```

`npm run lint` is defined, but ESLint is not installed and the repo has no ESLint config, so it does
not run yet.

**Before every push, run:** `npm run typecheck && npm run build`. There is no CI for this repo; the
only automatic check is the Vercel build.

## Stack

- **Vite 5**, **React 18**, **TypeScript** (strict)
- **Tailwind CSS 3** with a custom theme. Fonts: **Inter Tight** (display) and **Inter** (body).
- **Framer Motion** and **GSAP / ScrollTrigger** for motion
- **Lenis** smooth scroll on desktop. It is off on touch-only devices and with reduced motion.
  Scroll in-page through `scrollToSection()` in `src/lib/lenis.ts` so it never fights Lenis.
- **React Router v6**, and **react-helmet-async** for per-route SEO
- **hls.js** for the hero background video (Mux HLS). hls.js is tried first and native HLS is only
  the fallback, because Chrome reports `canPlayType` "maybe" for HLS and then fails.
- **Vercel Web Analytics** and **Speed Insights**. Both are cookieless. The site sets no cookies and
  uses no browser storage. Adding an ad or tracking tag would need a consent banner and a
  privacy-notice update first.
- Static prerendering through a Vite SSR bundle and `scripts/prerender.mjs`

## Routes (19, all prerendered)

| Route | What it is |
|---|---|
| `/` | Home: hero → the problem (one claim, six steps) → why your claims system can't fix it (day-by-day demo) → three jobs → what your member sees (WhatsApp / Email / Voice preview) → going live → FAQ |
| `/platform` | One core, OS not chatbot, the six modules, coverage, health moments, full FAQ |
| `/orion` | Orion, the AI claims coworker for staff (interactive) |
| `/security` | Security and data, and what happens on every claim |
| `/pricing` | Engagement modes |
| `/demo` | 30-minute walkthrough |
| `/compliance` | IRDAI + DPDP control map |
| `/privacy` | Privacy notice (DPDP Act 2023 and DPDP Rules 2025) |
| `/terms` | Terms of service |
| `/use-cases/{tpas,insurers,hospitals,health}` | Use-case pages |
| `/platform/{channel-gateway,workflow-engine,truth-layer,knowledge-layer,policy-gate,audit-ledger}` | Module pages |

`vercel.json` permanently redirects the removed `/use-cases/life` and `/use-cases/motor` to `/`.

**To add a route:** create the page, add it to `src/App.tsx`, add it to `ROUTES` in
`scripts/prerender.mjs`, and add it to `public/sitemap.xml`. Then check that the build reports the
new count.

## Folder layout

```
api/
  waitlist.ts          Vercel function: validates, writes to the waitlist sheet, sends emails (Resend)
src/
  pages/               one component per route (UseCase/Module render from src/data)
  sections/            page sections (HeroMeshGrid, ProblemJourney, SystemGap, MemberExperience, …)
  components/          shared UI (PageShell, LegalShell, SiteNav, MobileMenu, WaitlistModal, CTA, …)
  data/                useCases.tsx, platform.tsx (module pages)
  lib/                 seo, structured data (JSON-LD), lenis, gsap, motion, waitlist events
  entry-server.tsx     SSR entry used at build time
public/
  sitemap.xml          19 URLs (keep in step with the prerender list)
  robots.txt
  og-default.{svg,png} open-graph image (1200×630)
  logo-gooclaim.{svg,png}
  connectors/          brand icons used by the connector constellation
scripts/
  prerender.mjs        renders every route into dist/<route>/index.html
  svg2png.mjs          regenerates og-default.png from og-default.svg
vercel.json            redirects for removed pages
```

## Waitlist environment variables

Set these in Vercel (Production) and in `.env.local` for local testing. Only the names are listed
here; never commit values.

| Variable | Purpose |
|---|---|
| `SHEETS_WEBHOOK_URL` | Endpoint that appends the entry to the waitlist sheet |
| `SHEETS_SHARED_SECRET` | Shared secret for that endpoint |
| `RESEND_API_KEY` | Sends the team notification and the welcome email |
| `NOTIFY_EMAIL` | Who gets the new-signup notification |
| `FROM_EMAIL` | Sender address |
| `REPLY_TO` | Reply-to on the welcome email |
| `SITE_URL` | Optional; defaults to `https://www.gooclaim.com` |
| `LOGO_URL` | Optional; defaults to the site logo |

## Content rules

Everything on the site is a public claim. Keep these rules when editing:

1. **English only.** No Hindi or Hinglish anywhere on the site.
2. **Lead with "Gooclaim OS is a Claim OS"**, for TPAs and insurers. The hero line is
   *Built for every claim. Every channel. Every CMS. Every workflow.*
3. **Built around the claim, started with health.** Do not mark other lines of insurance as
   "coming next", list them as live, or attach dates to them. Motor and life are mentioned only as
   having the same moments.
4. **No internal names.** Do not use layer codes (L1–L7), internal service names, dev data
   (claim ids, tenant ids, dev amounts or dates) or task numbers. Samples use neutral data such as
   `CLM-24817` and "Your claims system".
5. **Every number has a public source** shown next to it. IRDAI clocks are **1 hour** for cashless,
   **3 hours** for discharge and **15 days** to settle, with interest at **bank rate + 2% a year from
   intimation**. These come from the 2024 circulars. The 30/45-day figures are the repealed 2017
   rule — never use them.
6. **Do not show a feature as live unless it is live.** Upcoming channels (voice, SMS, Telegram,
   web chat) are labelled *Soon*.
7. **Interest demos use the current RBI bank rate** (5.75% from 7 Oct 2026) and say "illustrative".
   When the RBI changes the rate, update `OnEveryClaim.tsx` and `SystemGap.tsx`.
8. **Legal pages** (`/privacy`, `/compliance`, `/terms`) describe only what the product does today.
   Bump the "Last updated" date on any change, and have the founder's legal advisor review changes
   to the privacy notice.

Before pushing copy changes, scan the build for leaks, for example:

```bash
find dist -name '*.html' -print0 | xargs -0 grep -l -E 'CLM-00[0-9]|\bL[1-7] [A-Z]|Coming next' || echo clean
```

## SEO

- Per-route title, description, OpenGraph, Twitter card and canonical (`src/lib/seo.ts`)
- JSON-LD: Organization, SoftwareApplication, WebSite, BreadcrumbList and FAQPage
  (`src/lib/structured.ts`, `src/sections/Faq.tsx`)
- All HTML is prerendered, so crawlers never need to run JS
- OG image: edit `public/og-default.svg`, then
  `node scripts/svg2png.mjs public/og-default.svg public/og-default.png`

## Branches and deploy

1. Push work to **`release/dev`**. Vercel builds a preview, which needs a Vercel login to view.
2. Open a PR from `release/dev` to `main`.
3. Merging to **`main`** deploys production to www.gooclaim.com.

A commit pushed after a PR is merged is not in that merge, so open a new PR for it. The old
`develop` branch is no longer used.
