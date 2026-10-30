export const SITE = {
  url: "https://www.gooclaim.com",
  name: "Gooclaim OS",
  brand: "Gooclaim",
  twitter: "@gooclaim",
  defaultTitle: "Gooclaim OS · The Claim OS for TPAs and insurers",
  defaultDescription:
    "Gooclaim OS is a Claim OS for TPAs and insurers. Built for every claim — every channel, every CMS, every workflow — with consent, approved messages and an audit trail on every claim.",
  defaultOgImage: "/og-default.png",
};

export interface PageSEO {
  title: string;
  description: string;
  ogImage?: string;
  keywords?: string;
  /** `og:locale`, only on a country page (`en_IN`); the other pages serve every country. */
  locale?: string;
}

/**
 * The same page in other countries, for `hreflang`. Every version lists every
 * version, itself included; the home page is the `x-default` for anyone else.
 * `/us` and `/ae` are added here when those pages exist — not before.
 */
export const COUNTRY_ALTERNATES = [
  { hreflang: "x-default", path: "/" },
  { hreflang: "en-IN", path: "/in" },
];

export const SEO_HOME: PageSEO = {
  title: "Gooclaim OS · One Claims OS. Fully agentic.",
  description:
    "Gooclaim OS is a Claim OS for TPAs and insurers: one agentic core that answers members, works beside your team and keeps every claim on the record — on the claims system you already run.",
  keywords:
    "claims OS, insurance AI, TPA software, claims automation, multi-agent insurance, WhatsApp claims, email claims",
};

export const SEO_INDIA: PageSEO = {
  title: "Gooclaim OS India · The Claim OS for India's TPAs and insurers",
  description:
    "Gooclaim OS for India: IRDAI's 1-hour, 3-hour and 15-day clocks on every claim, DPDP consent before a word, and members answered on WhatsApp and email in English, Hindi and Hinglish.",
  keywords:
    "claims automation India, IRDAI cashless, IRDAI 15 days, DPDP compliance, TPA software India, health insurance claims India",
  ogImage: "/og-india.png",
  locale: "en_IN",
};

export const SEO_PRICING: PageSEO = {
  title: "Pricing · Gooclaim OS",
  description:
    "Engagement modes for TPAs and insurers — Pilot, Production, Enterprise. Custom quotes shaped to your channels, verticals and volume. Book a 20-minute walkthrough.",
  keywords: "Gooclaim OS pricing, insurance AI pricing, TPA software pricing",
};

export const SEO_DEMO: PageSEO = {
  title: "Book a demo · Gooclaim OS",
  description:
    "See Gooclaim OS in a live 20-minute walkthrough — your costliest workflow first, on a sample claims system, and how a 90-day pilot would run.",
  keywords:
    "Gooclaim OS demo, claims AI demo, insurance automation demo, TPA software demo",
};

export const SEO_COMPLIANCE: PageSEO = {
  title: "Compliance in India · IRDAI + DPDP · Gooclaim OS",
  description:
    "How Gooclaim OS maps to IRDAI Master Circular, PPHI penalties, Internal Ombudsman Guidelines 2025 and the DPDP Act 2023 — control by control.",
  keywords:
    "IRDAI compliance, DPDP compliance, insurance audit ledger, claims compliance India",
};

export const SEO_PRIVACY: PageSEO = {
  title: "Privacy Notice · Gooclaim OS",
  description:
    "How Gooclaim OS processes personal data under the DPDP Act 2023 — consent, retention, sub-processors, your rights and grievance redressal.",
};

export const SEO_TERMS: PageSEO = {
  title: "Terms of Service · Gooclaim OS",
  description:
    "Terms governing access to the Gooclaim OS marketing site and any pilot, preview or production use of the platform.",
};

export const SEO_PLATFORM: PageSEO = {
  title: "Platform · Gooclaim OS",
  description:
    "Gooclaim OS is a Claim OS: one multi-agent core that reads any claims system, answers on WhatsApp and email, and checks every message before it leaves. Seven layers, one audit ledger.",
  keywords:
    "claims operating system, claims automation platform, insurance AI platform, TPA software, claims CMS integration",
};

export const SEO_ORION: PageSEO = {
  title: "Orion · The AI claims coworker · Gooclaim OS",
  description:
    "Orion works beside your claims staff — Work Pulse with legal clocks, a live claim brief, the next safe step with its evidence, and answers from your own policy library. A person always decides.",
  keywords: "AI claims coworker, claims copilot, TPA staff AI, claims operations AI, Orion Gooclaim",
};

export const SEO_SECURITY: PageSEO = {
  title: "Security & compliance · Gooclaim OS",
  description:
    "How Gooclaim OS protects claims data: read-only to your claims system, strict per-tenant isolation, masked personal numbers, encryption at rest, consent first and an append-only audit trail — plus legal clocks on every claim.",
  keywords: "insurance data security, data protection, claims compliance, claims data protection, audit trail",
};

export function buildUseCaseSEO(slug: string, label: string): PageSEO {
  return {
    title: `${label} · Use cases · Gooclaim OS`,
    description: `Gooclaim OS for ${label}. The agentic claims operating system built for TPAs and insurers to handle ${label.toLowerCase()} workflows end-to-end — multi-channel, audit-grade, compliant by design.`,
    keywords: `Gooclaim OS ${label}, ${label} insurance AI, claims automation ${label}`,
    ogImage: `/og-default.png`,
    ...(slug ? {} : {}),
  };
}

export function buildModuleSEO(slug: string, label: string): PageSEO {
  return {
    title: `${label} · Platform · Gooclaim OS`,
    description: `${label} — a module of Gooclaim OS. Built in, multi-tenant, audited. Read what ${label} actually does and the outcomes you see when it ships.`,
    keywords: `Gooclaim OS ${label}, ${label} insurance, claims operating system`,
    ogImage: `/og-default.png`,
    ...(slug ? {} : {}),
  };
}
