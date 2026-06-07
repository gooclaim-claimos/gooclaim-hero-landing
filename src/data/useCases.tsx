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
      "The IRDAI 1-hour admission / 3-hour discharge mandate is now law. Without automation, every breach costs Bank Rate + 2% daily — a penalty TPAs can no longer absorb manually.",
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
        why: "Owns daily penalty exposure and hospital-network goodwill.",
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
      "Insurers carry the regulatory risk while TPAs handle the ops. Gooclaim OS gives the insurer a single, audited communication layer that works across every TPA, every channel, every vertical — without ripping out the CMS.",
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
        title: "Multi-vertical, one platform",
        body: "Health today, Motor tomorrow, Life next. Same OS, swap workflows by tenant.",
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
      { label: "Multi-vertical · same OS", hue: "#7c3aed" },
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
        body: "Front-desk staff can&rsquo;t always type. Voice in, voice out, audited.",
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
        body: "Hindi · English · Hinglish + regional — meet your patients where they are.",
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
        <span className="text-white/55">The pilot vertical, ready today.</span>
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
        body: "Hindi · English · Hinglish + regional — every claimant on their terms.",
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
      "We start with health because it bleeds the most. The same platform then expands to Life, Motor and beyond — without a rebuild.",
  },
  {
    slug: "life",
    label: "Life",
    eyebrow: "Use case · Life insurance",
    heroTitle: (
      <>
        For life.{" "}
        <span className="text-white/55">
          Mis-selling, mended. Death claims, dignified.
        </span>
      </>
    ),
    heroIntro:
      "Life insurance gets the longest, hardest conversations — mis-selling disputes, death claim chains, nominee follow-ups. Gooclaim OS adds proactive, vernacular communication where today there is silence.",
    problemStat: {
      big: "22.14%",
      caption: "of all life complaints are mis-selling",
      hue: "#f59e0b",
    },
    problemBody:
      "The death-claim documentation chain — death certificate, nominee KYC, claim form, bank details — routinely takes 6 to 12 months. Nominees in tier-2 and tier-3 cities navigate English-only systems while grieving.",
    problemSource: "Outlook Business · Ditto · IRDAI",
    capabilities: [
      {
        title: "Proactive nominee outreach",
        body: "Voice and WhatsApp campaigns that contact nominees first — vernacular, audited, kind.",
        hue: "#0d99ff",
      },
      {
        title: "Document chain orchestration",
        body: "Multi-week document collection — death certificate, KYC, claim form, bank — single thread.",
        hue: "#7dc4ff",
      },
      {
        title: "Mis-selling audit defence",
        body: "Every promise made, every consent given, immutably logged — defendable in ombudsman cases.",
        hue: "#f59e0b",
      },
      {
        title: "Regional language",
        body: "Hindi · English · Hinglish + regional — for nominees who don&rsquo;t live in English.",
        hue: "#7c3aed",
      },
      {
        title: "Premium reminders",
        body: "Channel-aware, lapse-preventing — UPI-link aware, paid in one tap.",
        hue: "#10b981",
      },
      {
        title: "Lapsation reduction",
        body: "Multi-touch outreach across voice + WhatsApp + SMS — every lapse caught early.",
        hue: "#7dc4ff",
      },
    ],
    personas: [
      {
        role: "Life Insurer Claims Head",
        why: "Owns death-claim cycle time and nominee experience.",
      },
      {
        role: "Customer Operations",
        why: "Owns mis-selling disputes and persistency.",
      },
      {
        role: "Agency Distribution Head",
        why: "Owns agent-led complaints and the audit trail behind them.",
      },
    ],
    trustChips: [
      { label: "Regional language coverage", hue: "#7c3aed" },
      { label: "Immutable consent ledger", hue: "#f59e0b" },
      { label: "Voice-first for nominees", hue: "#0d99ff" },
    ],
    closingTitle: (
      <>
        The hardest conversations.{" "}
        <span className="text-white/55">Handled with care.</span>
      </>
    ),
    closingBody:
      "Replace silence with proactive, audited, vernacular contact. Lower complaint volume, lower lapsation, stronger trust.",
  },
  {
    slug: "motor",
    label: "Motor",
    eyebrow: "Use case · Motor insurance",
    heroTitle: (
      <>
        For motor.{" "}
        <span className="text-white/55">
          Surveyors, garages and customers, on one thread.
        </span>
      </>
    ),
    heroIntro:
      "Motor claims fall apart in the handoffs — between customer, surveyor and garage. Gooclaim OS coordinates the chain in real time, on the channel each party actually uses.",
    problemStat: {
      big: "24.8%",
      caption: "of all general insurance complaints are motor",
      hue: "#0d99ff",
    },
    problemBody:
      "Two-wheeler claims are routinely abandoned. Garage networks are opaque to customers. Surveyor scheduling drifts. Even with the IRDAI 30-day mandate (45 for investigation), the experience feels broken.",
    problemSource: "Business Standard · IRDAI PPI Regulations 2024",
    capabilities: [
      {
        title: "Surveyor scheduling",
        body: "Real-time surveyor → garage → customer coordination, on WhatsApp.",
        hue: "#0d99ff",
      },
      {
        title: "Garage network clarity",
        body: "Customer gets a live, network-validated list of cashless garages, not a generic PDF.",
        hue: "#7dc4ff",
      },
      {
        title: "Total-loss vs repair transparency",
        body: "Templated, audited explanation when valuation comes in — no surprise call.",
        hue: "#f59e0b",
      },
      {
        title: "Two-wheeler friction killer",
        body: "Low-value claims fully automated — no abandonment, no manual triage.",
        hue: "#10b981",
      },
      {
        title: "Photo + doc collection",
        body: "Multi-day workflow for damage photos, RC, DL and FIR — single thread.",
        hue: "#7c3aed",
      },
      {
        title: "30-day SLA observability",
        body: "Per-claim countdown against the regulator clock, alerts before breach.",
        hue: "#0d99ff",
      },
    ],
    personas: [
      {
        role: "Motor Claims Head",
        why: "Owns settlement cycle, surveyor productivity and customer NPS.",
      },
      {
        role: "Network Manager",
        why: "Owns garage performance and cashless-network goodwill.",
      },
      {
        role: "Customer Ops",
        why: "Owns the long tail of motor complaints — especially two-wheeler.",
      },
    ],
    trustChips: [
      { label: "IRDAI 30-day SLA tracking", hue: "#0d99ff" },
      { label: "Surveyor + garage coordination", hue: "#10b981" },
      { label: "Audited every handoff", hue: "#f59e0b" },
    ],
    closingTitle: (
      <>
        Stop losing two-wheeler claims.{" "}
        <span className="text-white/55">Start finishing them.</span>
      </>
    ),
    closingBody:
      "Make the surveyor-garage-customer chain one audited thread, on the channels each party already uses. Cycle times drop, complaints drop, retention climbs.",
  },
];
