/**
 * The India page's facts, each with its public source. Moved here word for
 * word from the old home sections' India variants (ProofBand, ProblemJourney,
 * systemGapData, ThreeJobs, MemberExperience, GoLive, Faq) so those files can
 * go. The rules are read from the IRDAI circular of 5 September 2024 itself —
 * not the repealed 30/45-day rule still quoted on insurer websites.
 */

export const STATS = [
  { value: "3.26 cr", label: "health claims settled in a year", source: "IRDAI Annual Report 2024-25", hue: "#1D4ED8" },
  { value: "39.57 lakh", label: "PM-JAY claims over the 12-hour pre-auth limit", source: "CAG Report No. 11 of 2023 · audit of PM-JAY", hue: "#DC2626" },
  { value: "15 days", label: "to settle, from submission", source: "IRDAI circular, 5 September 2024", hue: "#D97706" },
  { value: "₹1 crore", label: "penalty, for exactly these failures", source: "IRDAI order, 15 December 2025", hue: "#059669" },
];

export interface Stage {
  key: string;
  label: string;
  /** The claim stops here in practice. */
  stops: boolean;
  rule: string;
  reality: string;
  source: string;
}

export const STAGES: Stage[] = [
  { key: "intimation", label: "Intimation", stops: false, rule: "From this day, interest at bank rate + 2% a year runs until the claim is paid — and the insurer must pay it without being asked.", reality: "The meter starts here, whichever step the claim later gets stuck at.", source: "IRDAI Master Circular, 5 Sep 2024 · para 2.ii" },
  { key: "eligibility", label: "Eligibility", stops: false, rule: "The policy and the member are checked against the record.", reality: "This step works. The claims system holds the record and does it well.", source: "Your claims system" },
  { key: "preauth", label: "Pre-auth", stops: true, rule: "1 hour to approve a cashless request. 3 hours to authorise a discharge.", reality: "In India's own government health scheme, 39.57 lakh claims took longer than 12 hours for pre-auth approval.", source: "CAG Report No. 11 of 2023 · audit of PM-JAY" },
  { key: "documents", label: "Documents", stops: true, rule: "The TPA must collect documents from the hospital — not the member. No claim may be closed for want of them.", reality: "About 1 in 5 rejections were never medical — an unanswered query or a missing document. Since 2024 those claims cannot be rejected, so they stay open, with interest running.", source: "IRDAI circular 2024 · paras 1.ii, 3(iii)3 · industry-reported FY24 ranges" },
  { key: "adjudication", label: "Adjudication", stops: true, rule: "Every deduction explained. A rejection must cite the policy clause and clear a review committee.", reality: "₹15,100 crore was cut from approved claims in FY24. In December 2025 IRDAI fined an insurer ₹1 crore — partly for never explaining deductions.", source: "IRDAI data, FY24 · IRDAI order, 15 Dec 2025" },
  { key: "settlement", label: "Settlement", stops: true, rule: "15 days from submission of the claim.", reality: "Hospitals report waiting 6–8 months. One bank transfer can cover 40–80 claims, so nobody can tell which claim was paid.", source: "Industry-reported" },
];

export const PARTIES = [
  { who: "Hospital", holds: "The documents and the bill", says: "We sent the bill.", member: false },
  { who: "TPA", holds: "The claim record and the workflow", says: "The insurer decides.", member: false },
  { who: "Insurer", holds: "The decision and the money", says: "The TPA holds the data.", member: false },
  { who: "Member", holds: "Nothing but the wait", says: "Nobody tells me anything.", member: true },
];

export const MOMENTS = ["A status to tell", "Documents to collect", "A reason to explain", "A clock to beat"];

export const HEALTH_WORKFLOWS = [
  "Claim status, with the source and date",
  "Pending documents, asked and reminded",
  "Query reasons, in the insurer's own words",
  "Insurance questions, from your knowledge library",
  "Cashless and pre-authorisation status, against the clock",
  "Complaints, on the IRDAI clock",
];

export type Job = "clock" | "chase" | "queue" | "member" | "gate" | "record";

export const JOB_LABEL: Record<Job, string> = { clock: "Clock", chase: "Chasing", queue: "Work queue", member: "Member", gate: "Checked", record: "On record" };
export const JOB_HUE: Record<Job, string> = { clock: "#D97706", chase: "#2563EB", queue: "#7C3AED", member: "#059669", gate: "#0891B2", record: "#C026D3" };

export interface DaySpec {
  day: number;
  /** What the claims system shows — accurate, and the same for weeks. */
  status: string;
  deficiency?: string;
  /** What Gooclaim OS did that day. */
  event: string;
  jobs: Job[];
}

// A sample reimbursement claim — sample number, never real data.
export const DAYS: DaySpec[] = [
  { day: 0, status: "Under process", event: "Claim intimated. The 15-day clock starts, and so does the interest meter.", jobs: ["clock", "record"] },
  { day: 2, status: "On hold — deficient", deficiency: "Discharge summary", event: "Discharge summary requested through a secure upload link — approved wording, checked before sending.", jobs: ["chase", "gate", "record"] },
  { day: 5, status: "On hold — deficient", deficiency: "Discharge summary", event: "Member asks on WhatsApp. Answered: which document is pending, the upload link, the source and date.", jobs: ["member", "gate", "record"] },
  { day: 7, status: "On hold — deficient", deficiency: "Discharge summary", event: "First reminder sent.", jobs: ["chase", "record"] },
  { day: 12, status: "On hold — deficient", deficiency: "Discharge summary", event: "Three days to the limit. Orion moves the claim to the top of your team’s queue, with the next step.", jobs: ["queue", "clock"] },
  { day: 14, status: "On hold — deficient", deficiency: "Discharge summary", event: "Second reminder sent. A person is told it is still open.", jobs: ["chase", "queue", "record"] },
  { day: 16, status: "On hold — deficient", deficiency: "Discharge summary", event: "Past 15 days. The claim shows overdue, with the interest owed since day 0.", jobs: ["clock", "queue"] },
  { day: 21, status: "On hold — deficient", deficiency: "Discharge summary", event: "Final notice sent and a ticket opened for your team. The claim stays open — the law does not allow closing it.", jobs: ["chase", "queue", "record"] },
];

export const LIMIT = 15;
export const CLAIM_RUPEES = 100_000;
/** RBI bank rate 5.75% (from 7 Oct 2026) + IRDAI's 2%, a year. */
export const RATE = (5.75 + 2) / 100;
/** How long each day holds before the timeline steps on. */
export const STEP_MS = 2600;
export const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export const THREE_JOBS = [
  { who: "For your members", title: "Answers, not a helpline number.", body: "Status, pending documents and decisions on messaging tools and email, and by voice call in early access — in the member's language, with the source and date.", points: ["Consent and OTP first", "Approved messages only", "Secure document upload"], cta: "How it works", to: "/platform", hue: "#2563EB" },
  { who: "For your team", title: "Orion, the AI claims coworker.", body: "What needs a person and why, the claim read for them, and the next safe step with its evidence — a person says yes.", points: ["Work Pulse with IRDAI clocks", "Live Claim Brief", "Next Safe Step"], cta: "Meet Orion", to: "/orion", hue: "#059669" },
  { who: "For compliance", title: "Every claim, on the record.", body: "IRDAI clocks on every claim, complaints with their own deadlines, the NL-48 report from the record, and an append-only audit trail.", points: ["IRDAI + DPDP by design", "Strict per-tenant isolation", "Tested every day, on every channel"], cta: "Security & compliance", to: "/security", hue: "#D97706" },
];

export const PILLARS = [
  { label: "Consent first", body: "DPDP consent before a single claim detail.", hue: "#059669" },
  { label: "Verified", body: "On WhatsApp, the registered number. On email and calls, a code sent to it first.", hue: "#2563EB" },
  { label: "Source & date", body: "Every answer names whose record it read, and when.", hue: "#0891B2" },
  { label: "Never free text", body: "Messages use approved wording only, in the member's language.", hue: "#D97706" },
];

export const STEPS = [
  { title: "Connect your claims system", body: "By API, a secure file drop, or a batch upload. Your knowledge library joins the same way.", yours: "Read-only. Nothing is ever written back.", hue: "#6366F1" },
  { title: "Approve your messages", body: "Every member message, in each language, in your own words.", yours: "Not one can be sent until your team approves it.", hue: "#8B5CF6" },
  { title: "Test on your own claims", body: "A testing stage with sample claims, on every channel and language, with the evidence.", yours: "You sign it off before anything goes live.", hue: "#10B981" },
  { title: "Go live, watched", body: "One workflow at a time. The first days are monitored closely.", yours: "Any workflow pauses in a click.", hue: "#F97316" },
];

/** The four questions buyers ask first (the old home FAQ, first four). */
export const FAQS = [
  { q: "Do we have to replace our claims system?", a: "No. Gooclaim OS reads from the claims system you already run — by API, a secure file drop or a batch upload — and never writes back to it. Your system stays the source of truth." },
  { q: "Does the AI write messages to our members?", a: "No. Members only ever receive messages your team has approved. The AI decides which approved message fits, and every value in it is checked against your record before it is sent." },
  { q: "What happens when the AI isn't sure?", a: "It hands the case to a person on your team, with the reason and what it already checked. It never guesses an answer to a member." },
  { q: "Is it only for health insurance?", a: "No. Every claim — health, motor or life — has the same moments: a status to tell, documents to collect, a reason to explain and a clock to beat. Gooclaim OS is built on those. We started with health, where the clock is strictest. Running another line of insurance? Talk to us." },
];
