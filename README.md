# gooclaim-hero-landing

Marketing landing site for **Gooclaim OS** — the operating system for India's claims industry. Built for TPAs and insurers.

Live at: `https://www.gooclaim.com`

## Stack

- **Vite 5** + **React 18** + **TypeScript** (strict)
- **Tailwind CSS 3** with custom theme
- **Framer Motion** + **GSAP / ScrollTrigger** for animations
- **Lenis** smooth scroll
- **React Router v6** for client routing
- **react-helmet-async** for per-route SEO
- Static prerendering via Vite SSR + a custom build script

## Scripts

```bash
npm run dev          # local dev server on http://localhost:5174
npm run build        # type-check → client build → SSR bundle → prerender 18 routes
npm run build:client # client bundle only
npm run build:ssr    # SSR bundle only
npm run prerender    # run the prerender step against existing dist/ and dist-ssr/
npm run preview      # serve dist/ locally
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
```

## Routes

Static HTML is generated for every route at build time, so search engines see full content immediately.

- `/` — Home
- `/pricing` — Engagement modes + Calendly
- `/demo` — 30-minute walkthrough booking
- `/compliance` — IRDAI + DPDP control map
- `/privacy` — DPDP Privacy Notice
- `/terms` — Terms of Service
- `/use-cases/{tpas,insurers,hospitals,health,life,motor}` — six vertical pages
- `/platform/{channel-gateway,workflow-engine,truth-layer,knowledge-layer,policy-gate,audit-ledger}` — six module pages

## Folder layout

```
src/
  pages/             page components (one per route, or one renderer + data file)
  sections/          landing sections (hero, problem, solution, modules, coverage, footer)
  components/        shared UI (PageShell, LegalShell, SEOHead, CTA, etc.)
  data/              structured content (useCases, platform modules)
  lib/               gsap, lenis, motion, seo, structured-data helpers
  styles/            globals + tailwind components
  entry-server.tsx   Vite SSR entry — used at build time for prerendering

public/
  og-default.{svg,png}   open-graph preview (1200×630)
  robots.txt
  sitemap.xml
  connectors/            36 brand icons (WhatsApp, Slack, ServiceNow, etc.)
  logo-gooclaim.{svg,png}

scripts/
  prerender.mjs          renders every route into dist/<route>/index.html with helmet head
  svg2png.mjs            regenerate og-default.png from og-default.svg
```

## SEO

- Per-route `<title>`, `<meta description>`, OpenGraph, Twitter card, canonical
- JSON-LD: `Organization`, `SoftwareApplication`, `WebSite`, `BreadcrumbList`
- `public/sitemap.xml` lists all 18 routes
- `public/robots.txt` allows all, links to sitemap
- All HTML is prerendered — Googlebot never has to execute JS

## OG image workflow

```bash
# Edit public/og-default.svg, then:
node scripts/svg2png.mjs public/og-default.svg public/og-default.png
```

## Deploy

The `dist/` directory after `npm run build` is fully static — drop it on Vercel, Netlify, Cloudflare Pages or any static host. Directory-index URLs (`/pricing/index.html`) work out of the box.

## Branches

- `main` — production
- `develop` — integration branch for new work
