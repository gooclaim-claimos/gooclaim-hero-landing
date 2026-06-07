export const SITE = {
  url: "https://www.gooclaim.com",
  name: "Gooclaim OS",
  brand: "Gooclaim",
  twitter: "@gooclaim",
  defaultTitle: "Gooclaim OS · The operating system for India's claims industry",
  defaultDescription:
    "Gooclaim OS is the multi-agent AI operating system for India's TPAs and insurers. Built for every claim — every channel, every CMS, every vertical. IRDAI + DPDP compliant by design.",
  defaultOgImage: "/og-default.png",
  locale: "en_IN",
};

export interface PageSEO {
  title: string;
  description: string;
  ogImage?: string;
  keywords?: string;
}

export const SEO_HOME: PageSEO = {
  title: "Gooclaim OS · One Claims OS. Fully agentic.",
  description:
    "The agentic claims operating system for India's TPAs and insurers. Multi-channel, multi-CMS, multi-vertical — IRDAI + DPDP compliant by design.",
  keywords:
    "claims OS, insurance AI, TPA software, claims automation India, IRDAI cashless, DPDP compliance, multi-agent insurance, WhatsApp claims",
};

export const SEO_PRICING: PageSEO = {
  title: "Pricing · Gooclaim OS",
  description:
    "Engagement modes for India's TPAs and insurers — Pilot, Production, Enterprise. Custom quotes shaped to your channels, verticals and volume. Connect for a 30-minute call.",
  keywords: "Gooclaim OS pricing, insurance AI pricing, TPA software pricing",
};

export const SEO_DEMO: PageSEO = {
  title: "Book a demo · Gooclaim OS",
  description:
    "See Gooclaim OS in a live 30-minute walkthrough — real workflows on real channels against a sample CMS. Pilot proposal scoped to your operation.",
  keywords:
    "Gooclaim OS demo, claims AI demo, insurance automation demo, TPA software demo",
};

export const SEO_COMPLIANCE: PageSEO = {
  title: "Compliance · IRDAI + DPDP · Gooclaim OS",
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

export function buildUseCaseSEO(slug: string, label: string): PageSEO {
  return {
    title: `${label} · Use cases · Gooclaim OS`,
    description: `Gooclaim OS for ${label}. The agentic claims operating system India's TPAs and insurers use to handle ${label.toLowerCase()} workflows end-to-end — multi-channel, audit-grade, IRDAI + DPDP compliant.`,
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
