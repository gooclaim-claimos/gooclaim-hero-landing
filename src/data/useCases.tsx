import { type ReactNode } from "react";

export interface UseCaseStat {
  big: string;
  caption: string;
  hue: string;
}

export interface UseCaseCapability {
  title: string;
  body: string;
  hue: string;
}

export interface UseCasePersona {
  role: string;
  why: string;
}

export interface UseCaseData {
  slug: string;
  label: string;
  eyebrow: string;
  heroTitle: ReactNode;
  heroIntro: string;
  problemStat: UseCaseStat;
  problemBody: string;
  problemSource: string;
  capabilities: UseCaseCapability[];
  personas: UseCasePersona[];
  trustChips: { label: string; hue: string }[];
  closingTitle: ReactNode;
  closingBody: string;
}

export const USE_CASES: UseCaseData[] = [
  {
    slug: "tpas",
    label: "TPAs",
    eyebrow: "Use case · TPAs",
    heroTitle: (
      <>
        For TPAs.{" "}
        <span className="text-white/55">
          The hidden bottleneck, now automated.
        </span>
      </>
    ),
    heroIntro:
      "TPAs sit between insurers, hospitals and members — yet have zero modern multi-channel infrastructure. Gooclaim OS plugs into the existing CMS and turns cashless ops into a default, not a fire drill.",
    problemStat: {
      big: "6–8 months",
      caption: "hospital dues delayed by TPAs",
      hue: "#f59e0b",
    },
    problemBody:
      "IRDAI now allows 1 hour for cashless pre-auth, 3 hours for discharge and 15 days to settle a reimbursement. Miss it and interest runs at bank rate + 2% a year from the day of intimation — a cost TPAs can no longer absorb manually.",
    problemSource: "Moneylife · IRDAI Master Circular (29 May 2024) · PPHI Circular (Sept 2024)",
    capabilities: [
      {
        title: "Cashless agent mesh",
        body: "Automated cashless authorisation + discharge handling against the regulator clock — no human queue.",
        hue: "#0d99ff",
      },
      {
        title: "Multi-channel patient layer",
        body: "WhatsApp + Voice + SMS for members, the same OS hospitals can pull status from.",
        hue: "#7dc4ff",
      },
      {
        title: "Read your CMS, never write",
        body: "Plug into your existing TPA platform — modern or legacy — without write-back risk.",
        hue: "#10b981",
      },
      {
        title: "Audit-grade per insurer",
        body: "Immutable ledger per partner insurer, IRDAI-format export on demand.",
        hue: "#f59e0b",
      },
      {
        title: "Hospital sync",
        body: "Hospitals see the same real-time state members do — no more “TPA blamed” loops.",
        hue: "#7c3aed",
      },
      {
        title: "Penalty avoidance",
        body: "SLA observability per workflow, alerts before a Bank Rate + 2% breach is logged.",
        hue: "#0d99ff",
      },
    ],
    personas: [
      {
        role: "Head of Claims Ops",
        why: "Owns the 1hr / 3hr SLA against the regulator clock.",
      },
      {
        role: "COO",
        why: "Owns late-settlement interest exposure and hospital-network goodwill.",
      },
      {
        role: "Compliance Officer",
        why: "Owns the IRDAI audit trail and ombudsman exposure.",
      },
    ],
    trustChips: [
      { label: "IRDAI 1hr / 3hr SLA tracking", hue: "#0d99ff" },
      { label: "Per-insurer audit ledger", hue: "#f59e0b" },
      { label: "Multi-tenant by design", hue: "#10b981" },
    ],
    closingTitle: (
      <>
        From regulatory exposure{" "}
        <span className="text-white/55">to a competitive moat.</span>
      </>
    ),
    closingBody:
      "Show insurers and hospitals real-time status, audited every step. The TPA that automates first wins the next book.",
  },
  {
    slug: "insurers",
    label: "Insurers",
    eyebrow: "Use case · Insurers",
    heroTitle: (
      <>
        For insurers.{" "}
        <span className="text-white/55">
          One layer atop every TPA and every channel.
        </span>
      </>
    ),
    heroIntro:
      "Insurers carry the regulatory risk while TPAs handle the ops. Gooclaim OS gives the insurer a single, audited communication layer that works across every TPA and every channel — without ripping out the CMS.",
    problemStat: {
      big: "₹26,037 Cr",
      caption: "of health claims rejected in FY24",
      hue: "#ef4444",
    },
    problemBody:
      "Most rejections are not policy-related — they are communication failures: missed deadlines, wrong format, no proactive nudge. Each one becomes an ombudsman case the insurer has to defend.",
    problemSource: "Moneylife · IRDAI Annual Report 2024-25",
    capabilities: [
      {
        title: "TPA-agnostic comms",
        body: "Run a single member-facing OS across every TPA you partner with — no per-TPA project.",
        hue: "#0d99ff",
      },
      {
        title: "Built around the claim",
        body: "Built on what every claim shares. Health first — another line of insurance is new workflows, not a rebuild.",
        hue: "#7c3aed",
      },
      {
        title: "IRDAI Ombudsman ready",
        body: "Immutable audit ledger with consent, content and decision history — ready for the new Internal Ombudsman Guidelines 2025.",
        hue: "#f59e0b",
      },
      {
        title: "Brand-safe outbound",
        body: "Templates-only, 4-tier policy gate — free text never leaves on your letterhead.",
        hue: "#10b981",
      },
      {
        title: "Real-time SLA dashboards",
        body: "Per-TPA, per-channel breach tracking against the 1hr / 3hr mandate.",
        hue: "#7dc4ff",
      },
      {
        title: "DPDP-native",
        body: "Consent gate at step zero, withdrawal honoured within one business day.",
        hue: "#0d99ff",
      },
    ],
    personas: [
      {
        role: "Head of Customer Operations",
        why: "Owns CSAT, NPS, ombudsman volume and TAT.",
      },
      {
        role: "Chief Risk / Compliance Officer",
        why: "Owns IRDAI exposure, audit posture, DPDP readiness.",
      },
      {
        role: "Chief Technology Officer",
        why: "Owns CMS, channels and the never-ending integration backlog.",
      },
    ],
    trustChips: [
      { label: "IRDAI + DPDP compliant by design", hue: "#0d99ff" },
      { label: "Built around the claim", hue: "#7c3aed" },
      { label: "Per-TPA isolated audit ledger", hue: "#f59e0b" },
    ],
    closingTitle: (
      <>
        Same actuarial. <span className="text-white/55">Different mouth.</span>
      </>
    ),
    closingBody:
      "Your policies, pricing and underwriting are world-class. Replace the stone-age communication layer underneath — without touching the rest of the stack.",
  },
  {
    slug: "hospitals",
    label: "Hospitals",
    eyebrow: "Use case · Hospitals",
    heroTitle: (
      <>
        For hospitals.{" "}
        <span className="text-white/55">
          Stop chasing TPAs. Start discharging on time.
        </span>
      </>
    ),
    heroIntro:
      "Cashless denials happen at admission and discharge — and the patient always blames the hospital. Gooclaim OS gives your front desk and billing team a single, real-time view across every TPA your network deals with.",
    problemStat: {
      big: "6–48 hrs",
      caption: "patients wait for cashless discharge today",
      hue: "#7c3aed",
    },
    problemBody:
      "Multiple TPAs, multiple portals, multiple statuses. Hospital staff lose hours on phone-tag while patients sit in beds. The IRDAI 3-hour discharge mandate now penalises the whole chain.",
    problemSource: "Pilot field interviews 2026 · RTI Wiki · IRDAI Master Circular 2024",
    capabilities: [
      {
        title: "One inbox across every TPA",
        body: "Unified status, unified queries, unified document requests — no more juggling portals.",
        hue: "#0d99ff",
      },
      {
        title: "Voice agent for reception",
        body: "Front-desk staff can’t always type. Voice in, voice out, audited.",
        hue: "#10b981",
      },
      {
        title: "Real-time patient updates",
        body: "Send status changes to patients on WhatsApp the moment they happen — no IVR chase.",
        hue: "#7dc4ff",
      },
      {
        title: "Document collection, automated",
        body: "TPA asks for a document → Gooclaim OS asks the patient → patient uploads → file moves.",
        hue: "#f59e0b",
      },
      {
        title: "Multi-lingual",
        body: "Hindi · English · Hinglish — meet your patients where they are.",
        hue: "#7c3aed",
      },
      {
        title: "Network-wide rollout",
        body: "One pilot at one hospital, then network roll-out — no per-site rebuild.",
        hue: "#0d99ff",
      },
    ],
    personas: [
      {
        role: "Hospital Administrator",
        why: "Owns bed turnover, patient satisfaction and TPA relationships.",
      },
      {
        role: "Billing / Insurance Desk Manager",
        why: "Owns daily cashless throughput and revenue cycle.",
      },
      {
        role: "Group IT Head",
        why: "Owns the chaos of multiple TPA portals and integrations.",
      },
    ],
    trustChips: [
      { label: "Works with every TPA", hue: "#0d99ff" },
      { label: "Voice + WhatsApp + SMS", hue: "#10b981" },
      { label: "Audited every step", hue: "#f59e0b" },
    ],
    closingTitle: (
      <>
        Your team should run beds.{" "}
        <span className="text-white/55">Not phone trees.</span>
      </>
    ),
    closingBody:
      "Bring TPAs, insurers, patients and your front desk into the same audited conversation. Discharge clocks become predictable, and the patient stops blaming the wrong people.",
  },
  {
    slug: "health",
    label: "Health",
    eyebrow: "Use case · Health insurance",
    heroTitle: (
      <>
        For health.{" "}
        <span className="text-white/55">Where we started. Ready today.</span>
      </>
    ),
    heroIntro:
      "Health is where Gooclaim OS goes first — because it is where the broken communication layer hurts most. Full workflow coverage for cashless, query, document collection and rejection-reason, all template-only, all audited.",
    problemStat: {
      big: "75–80%",
      caption: "of all insurance grievances in India are health",
      hue: "#ef4444",
    },
    problemBody:
      "Health complaints doubled in six years. ₹26,037 Cr of claims rejected in FY24. 13% rejected, another 9% repudiated. Most are process failures, not policy denials.",
    problemSource: "IRDAI Annual Report 2024-25 · Bima Bharosa · Moneylife",
    capabilities: [
      {
        title: "Claim status, any channel",
        body: "“Where is my claim?” answered end-to-end on WhatsApp, voice, SMS or web.",
        hue: "#0d99ff",
      },
      {
        title: "Pending-doc workflow",
        body: "Multi-day, durable, never-loses-state document collection — patient uploads, claim moves.",
        hue: "#7dc4ff",
      },
      {
        title: "Reason-for-rejection",
        body: "Safe templated explanations of why a claim was repudiated, with next-step actions.",
        hue: "#7c3aed",
      },
      {
        title: "1hr / 3hr cashless SLA",
        body: "Per-tenant SLA observability against the IRDAI cashless mandate.",
        hue: "#10b981",
      },
      {
        title: "Multi-lingual outbound",
        body: "Hindi · English · Hinglish — every claimant on their terms.",
        hue: "#f59e0b",
      },
      {
        title: "Templates-only safety",
        body: "Every outbound passes the 4-tier policy gate — no free text on health PII.",
        hue: "#0d99ff",
      },
    ],
    personas: [
      {
        role: "Health Insurer Customer Ops",
        why: "Owns the 75-80% complaint share that lands on health.",
      },
      {
        role: "TPA Leadership",
        why: "Owns the cashless clock and per-claim economics.",
      },
      {
        role: "Hospital Chain Ops",
        why: "Owns discharge predictability across every TPA partner.",
      },
    ],
    trustChips: [
      { label: "IRDAI 1hr / 3hr ready", hue: "#0d99ff" },
      { label: "DPDP consent gate", hue: "#10b981" },
      { label: "7-year audit ledger", hue: "#f59e0b" },
    ],
    closingTitle: (
      <>
        Health is the wedge.{" "}
        <span className="text-white/55">The OS is the moat.</span>
      </>
    ),
    closingBody:
      "We started with health because its clock is the strictest. Gooclaim OS is built on what every claim shares — so another line of insurance is new workflows, not a rebuild.",
  },
];
