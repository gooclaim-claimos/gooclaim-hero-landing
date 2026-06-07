import { type ReactNode } from "react";

export interface ModuleCapability {
  title: string;
  body: string;
  hue: string;
}

export interface ModuleOutcome {
  title: string;
  body: string;
}

export interface ModuleData {
  slug: string;
  label: string;
  tagline: string;
  eyebrow: string;
  accent: string;
  heroTitle: ReactNode;
  heroIntro: string;
  capabilities: ModuleCapability[];
  outcomes: ModuleOutcome[];
  trustChips: { label: string; hue: string }[];
  closingTitle: ReactNode;
  closingBody: string;
}

export const MODULES: ModuleData[] = [
  {
    slug: "channel-gateway",
    label: "Channel Gateway",
    tagline: "Every claim message starts here.",
    eyebrow: "Platform · Inbound",
    accent: "#0d99ff",
    heroTitle: (
      <>
        Every channel,{" "}
        <span className="text-white/55">one inbound layer.</span>
      </>
    ),
    heroIntro:
      "Claim messages can come in on WhatsApp, voice, SMS, email or web. Channel Gateway receives all of them, normalises them into a single conversation thread, and routes each one to the right tenant — secure, audited, ready out of the box.",
    capabilities: [
      {
        title: "WhatsApp",
        body: "Claims-grade messaging via the WhatsApp business surface — verified senders, approved templates, member-aware threads.",
        hue: "#10b981",
      },
      {
        title: "Voice agents",
        body: "Inbound and outbound voice, in your customer&rsquo;s language — handled by the same agent mesh that handles text.",
        hue: "#0d99ff",
      },
      {
        title: "SMS · Email · Web",
        body: "Every other channel a claimant actually uses, on the same audited conversation thread.",
        hue: "#7dc4ff",
      },
      {
        title: "Per-tenant routing",
        body: "Multi-tenant by design — one inbound layer for many TPAs, many insurers, many verticals.",
        hue: "#7c3aed",
      },
      {
        title: "Signature-verified webhooks",
        body: "Every inbound message is validated at the door — no spoofed senders, no impersonated tenants.",
        hue: "#f59e0b",
      },
      {
        title: "One conversation, every channel",
        body: "Customer starts on WhatsApp, follows up on voice, finishes on email — the thread is unbroken.",
        hue: "#0d99ff",
      },
    ],
    outcomes: [
      {
        title: "No channel handoff loss",
        body: "Context survives across WhatsApp, voice, SMS, email — the agent always knows the full history.",
      },
      {
        title: "One inbox for ops",
        body: "Your team monitors one unified queue instead of five disconnected portals.",
      },
      {
        title: "Mobile-first by default",
        body: "Members reach you on the channels they already live in, on the language they actually speak.",
      },
    ],
    trustChips: [
      { label: "Tenant-scoped routing", hue: "#0d99ff" },
      { label: "Webhook signature verified", hue: "#10b981" },
      { label: "Audit on every inbound", hue: "#f59e0b" },
    ],
    closingTitle: (
      <>
        Meet your customers where they are.{" "}
        <span className="text-white/55">On every channel.</span>
      </>
    ),
    closingBody:
      "Stop forcing claimants into your portal. Bring claim conversation into the channels they already use — without giving up control or audit.",
  },
  {
    slug: "workflow-engine",
    label: "Workflow Engine",
    tagline: "Multi-agent claim reasoning.",
    eyebrow: "Platform · Reasoning",
    accent: "#7dc4ff",
    heroTitle: (
      <>
        Every claim,{" "}
        <span className="text-white/55">reasoned end-to-end.</span>
      </>
    ),
    heroIntro:
      "Workflow Engine is the brain of Gooclaim OS. It decides what happens for every claim message — which flow runs, which agent handles it, when to escalate, how to retry — across the multi-day journeys insurance actually needs.",
    capabilities: [
      {
        title: "Multi-agent reasoning",
        body: "Specialist agents handle different parts of a claim, coordinated through one orchestration layer.",
        hue: "#0d99ff",
      },
      {
        title: "Multi-day durability",
        body: "Workflows that span days or weeks survive restarts, retries and partner outages without losing state.",
        hue: "#7dc4ff",
      },
      {
        title: "Custom flows per tenant",
        body: "Every insurer and TPA gets their own versioned workflow set — shipped as configuration, not as a new build.",
        hue: "#10b981",
      },
      {
        title: "Per-tenant kill-switch",
        body: "Operational / restricted / suspended — flip a workflow per tenant during incident response, and audit every state change.",
        hue: "#f59e0b",
      },
      {
        title: "Escalation paths",
        body: "When the platform can&rsquo;t resolve autonomously, it hands off to a human operator with full context.",
        hue: "#7c3aed",
      },
      {
        title: "Retry + backoff",
        body: "Transient failures don&rsquo;t become customer-visible — the engine retries with intelligent backoff.",
        hue: "#0d99ff",
      },
    ],
    outcomes: [
      {
        title: "Custom workflows in weeks, not quarters",
        body: "New flow ships as config — no platform rewrite, no per-tenant fork.",
      },
      {
        title: "Multi-day claims handled cleanly",
        body: "Pending-document and reason-for-rejection flows survive the whole journey.",
      },
      {
        title: "Audited every step",
        body: "Every decision the engine makes lands in the audit ledger.",
      },
    ],
    trustChips: [
      { label: "Durable, multi-day flows", hue: "#7dc4ff" },
      { label: "Custom per tenant", hue: "#0d99ff" },
      { label: "Kill-switch + audit", hue: "#f59e0b" },
    ],
    closingTitle: (
      <>
        Reason, retry, escalate.{" "}
        <span className="text-white/55">All audited.</span>
      </>
    ),
    closingBody:
      "Replace fragile point-bots and ad-hoc scripts with a reasoning layer built for the multi-day, multi-party shape of real claims.",
  },
  {
    slug: "truth-layer",
    label: "Truth Layer",
    tagline: "Read your CMS, never write.",
    eyebrow: "Platform · Source of truth",
    accent: "#0d99ff",
    heroTitle: (
      <>
        Any CMS.{" "}
        <span className="text-white/55">No write-back risk.</span>
      </>
    ),
    heroIntro:
      "Truth Layer is how Gooclaim OS plugs into the claims management system you already run. Read-only by design — modern or legacy, REST or SOAP, web or SFTP — with encrypted credentials, per-tenant safety nets and a full audit trail of every external call.",
    capabilities: [
      {
        title: "Modern + legacy CMS",
        body: "Connect to current-generation REST APIs and to systems older than your engineers — without per-CMS rebuilds.",
        hue: "#0d99ff",
      },
      {
        title: "Per-tenant encrypted credentials",
        body: "Every tenant&rsquo;s CMS access lives in an isolated, encrypted vault — never shared, never exposed.",
        hue: "#7c3aed",
      },
      {
        title: "Read-only safety",
        body: "Gooclaim OS never writes back to your system of record. Your CMS stays the source of truth.",
        hue: "#10b981",
      },
      {
        title: "Per-tenant safety net",
        body: "Outages, rate limits and partner incidents are contained inside one tenant — they don&rsquo;t cascade across the platform.",
        hue: "#f59e0b",
      },
      {
        title: "Audited every call",
        body: "Every fetch is logged with claim, time, layer and outcome — useful for both debugging and ombudsman defence.",
        hue: "#7dc4ff",
      },
      {
        title: "Fallback ladder",
        body: "When the primary integration is down, an automatic fallback chain keeps claim status flowing — no human in the loop.",
        hue: "#0d99ff",
      },
    ],
    outcomes: [
      {
        title: "No CMS rip-and-replace",
        body: "Whatever your TPA / insurer runs today, we plug in around it.",
      },
      {
        title: "Real-time status, zero risk",
        body: "Members see live claim status — your system of record stays untouched.",
      },
      {
        title: "Partner outage isolation",
        body: "A single tenant&rsquo;s CMS hiccup never takes down the platform.",
      },
    ],
    trustChips: [
      { label: "Read-only by design", hue: "#10b981" },
      { label: "Per-tenant credentials", hue: "#0d99ff" },
      { label: "Audited every external call", hue: "#f59e0b" },
    ],
    closingTitle: (
      <>
        Your CMS stays sacred.{" "}
        <span className="text-white/55">Gooclaim sits beside it.</span>
      </>
    ),
    closingBody:
      "No rip-and-replace, no write-back exposure, no per-CMS project. Plug Gooclaim OS into the system of record you already trust.",
  },
  {
    slug: "knowledge-layer",
    label: "Knowledge Layer",
    tagline: "Your policy library, AI-searchable.",
    eyebrow: "Platform · Context",
    accent: "#7c3aed",
    heroTitle: (
      <>
        Every policy doc.{" "}
        <span className="text-white/55">One AI search.</span>
      </>
    ),
    heroIntro:
      "Knowledge Layer connects to wherever your policy and past-claim knowledge already lives — SharePoint, Drive, Notion, Confluence, SQL, S3 and 50+ more sources — and makes all of it searchable in plain language for the workflow agents that need it.",
    capabilities: [
      {
        title: "50+ source connectors",
        body: "Notion, Drive, SharePoint, SQL, S3, Slack, Confluence and more — your knowledge stays where your team already keeps it.",
        hue: "#0d99ff",
      },
      {
        title: "AI-powered semantic search",
        body: "Agents ask in plain language — “what does this policy say about pre-existing conditions?” — and the right passage surfaces.",
        hue: "#7c3aed",
      },
      {
        title: "Hybrid retrieval",
        body: "Combines semantic understanding with keyword precision — fewer hallucinations, sharper answers.",
        hue: "#10b981",
      },
      {
        title: "Per-tenant isolation",
        body: "Each tenant&rsquo;s knowledge is strictly walled off — never cross-pollinated, never visible to another.",
        hue: "#f59e0b",
      },
      {
        title: "Continuously improving",
        body: "Miss-signals from real claims feed back to improve retrieval — quietly, automatically.",
        hue: "#7dc4ff",
      },
      {
        title: "Source citations",
        body: "Every answer carries a pointer back to the source document — defendable, auditable, transparent.",
        hue: "#0d99ff",
      },
    ],
    outcomes: [
      {
        title: "Policy intent stays consistent",
        body: "Every reply pulls from the same source — no agent improvises a different answer.",
      },
      {
        title: "No knowledge migration project",
        body: "Your docs stay in the tools your team already uses.",
      },
      {
        title: "Audit-defensible answers",
        body: "Every customer-visible explanation links back to the policy clause that grounds it.",
      },
    ],
    trustChips: [
      { label: "50+ connectors", hue: "#0d99ff" },
      { label: "Per-tenant isolated", hue: "#f59e0b" },
      { label: "Source-grounded answers", hue: "#10b981" },
    ],
    closingTitle: (
      <>
        Your policy library{" "}
        <span className="text-white/55">— for every agent, every reply.</span>
      </>
    ),
    closingBody:
      "Stop copy-pasting policy clauses into chat windows. Every workflow agent reaches into your knowledge base, with citations.",
  },
  {
    slug: "policy-gate",
    label: "Policy Gate",
    tagline: "Compliant by architecture.",
    eyebrow: "Platform · Safety",
    accent: "#10b981",
    heroTitle: (
      <>
        Every outbound{" "}
        <span className="text-white/55">passes a multi-tier check.</span>
      </>
    ),
    heroIntro:
      "Policy Gate is the safety layer that sits between every workflow agent and every claimant. Every outbound message — WhatsApp, voice, SMS, email — passes a multi-tier safety check before it leaves the platform. Free text never reaches a customer on your brand.",
    capabilities: [
      {
        title: "Exact-template match",
        body: "Every outbound must match an approved template — no improvised text, no off-script replies.",
        hue: "#10b981",
      },
      {
        title: "Semantic safety check",
        body: "Even within approved templates, content is screened for tone, claims and prohibited language.",
        hue: "#0d99ff",
      },
      {
        title: "Personal data redaction",
        body: "PII never leaves the platform in plaintext — phone numbers, names and claim IDs are scrubbed or hashed.",
        hue: "#7c3aed",
      },
      {
        title: "Source verification",
        body: "Claims of fact in outbound content are checked against the Knowledge Layer — no hallucinated promises.",
        hue: "#f59e0b",
      },
      {
        title: "Block + audit on fail",
        body: "Failed checks block the send and write an audit event — never silent, never bypassed.",
        hue: "#7dc4ff",
      },
      {
        title: "Channel-aware safety",
        body: "Different channels have different rules — voice TTS, WhatsApp HSM, SMS — the gate adapts.",
        hue: "#0d99ff",
      },
    ],
    outcomes: [
      {
        title: "Brand-safe by default",
        body: "No surprise outbound on your letterhead, no compliance fire-drill at 11pm.",
      },
      {
        title: "Ombudsman-defensible",
        body: "Every message ever sent passed the same gate — and the audit ledger proves it.",
      },
      {
        title: "Regulator-ready",
        body: "Meets the spirit and letter of IRDAI brand-safety and DPDP personal-data rules.",
      },
    ],
    trustChips: [
      { label: "Templates-only output", hue: "#10b981" },
      { label: "Personal data scrubbed", hue: "#0d99ff" },
      { label: "Block + audit on fail", hue: "#f59e0b" },
    ],
    closingTitle: (
      <>
        Free text never leaves.{" "}
        <span className="text-white/55">By design.</span>
      </>
    ),
    closingBody:
      "Bring AI into your claim ops without bringing free-text risk. Policy Gate makes brand-safety, PII protection and source verification non-optional.",
  },
  {
    slug: "audit-ledger",
    label: "Audit Ledger",
    tagline: "Immutable record of every decision.",
    eyebrow: "Platform · Proof",
    accent: "#f59e0b",
    heroTitle: (
      <>
        When IRDAI asks,{" "}
        <span className="text-white/55">you have the receipt.</span>
      </>
    ),
    heroIntro:
      "Audit Ledger is the immutable event store at the heart of Gooclaim OS. Every automated decision, every customer message, every consent grant, every policy-gate outcome lands here — append-only, hash-chained, retained for seven years, exportable in IRDAI-required format.",
    capabilities: [
      {
        title: "Append-only by design",
        body: "Events go in. Nothing edits them. Nothing deletes them. The history is what it is.",
        hue: "#f59e0b",
      },
      {
        title: "Hash-chained integrity",
        body: "Each event carries the hash of the previous one — tampering breaks the chain visibly.",
        hue: "#0d99ff",
      },
      {
        title: "7-year retention",
        body: "Aligned to IRDAI record-keeping requirements — out of the box, per tenant.",
        hue: "#7dc4ff",
      },
      {
        title: "IRDAI-format export",
        body: "When the regulator asks, your team produces the audit pack with one query — no scramble.",
        hue: "#10b981",
      },
      {
        title: "DPDP-compliant",
        body: "Personal data inside events is hashed where possible — full audit, zero needless exposure.",
        hue: "#7c3aed",
      },
      {
        title: "Per-tenant isolated",
        body: "One tenant&rsquo;s history is never visible to another, even to Gooclaim engineers under normal operations.",
        hue: "#0d99ff",
      },
    ],
    outcomes: [
      {
        title: "Ombudsman cases defended",
        body: "Every contested claim has a complete, time-stamped, tamper-evident history.",
      },
      {
        title: "Regulator confidence",
        body: "IRDAI Internal Ombudsman Guidelines 2025 ready, with the audit trail to prove it.",
      },
      {
        title: "Internal accountability",
        body: "Engineering, ops and compliance teams share one source of truth on what happened, when.",
      },
    ],
    trustChips: [
      { label: "Append-only · hash-chained", hue: "#f59e0b" },
      { label: "7-year retention", hue: "#0d99ff" },
      { label: "IRDAI export · DPDP native", hue: "#10b981" },
    ],
    closingTitle: (
      <>
        Disputes happen.{" "}
        <span className="text-white/55">Your defence is automatic.</span>
      </>
    ),
    closingBody:
      "Replace partial logs and patchy spreadsheets with one immutable record of every claim decision. The audit pack writes itself.",
  },
];
