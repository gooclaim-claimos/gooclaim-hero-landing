import type { SegmentKey } from "./theme";

export interface Segment {
  key: SegmentKey;
  label: string;
  eyebrow: string;
  h1a: string;
  h1b: string;
  lead: string;
  cta: string;
  chips: string[];
  num: string;
  numLabel: string;
  numText: string;
  source: string;
  whatK: string;
  whatH: string;
  items: [title: string, desc: string][];
}

export const SEGMENTS: Segment[] = [
  {
    key: "tpas", label: "TPAs", eyebrow: "USE CASE · TPAS", h1a: "For TPAs.", h1b: "The claims that stop moving, and nobody is told.",
    lead: "A claim waiting on one document can sit for weeks while the clock runs, because asking for it is somebody’s manual job. Gooclaim OS reads your existing claims system, asks the member itself, and keeps every clock and every message on the claim.",
    cta: "Talk to us for TPAs", chips: ["Read-only on your CMS", "Regulator clocks per claim", "Tenant from login"],
    num: "5%", numLabel: "of health claims were still open when the year ended", numText: "In India, interest runs at bank rate + 2% from the date of intimation, and a claim cannot be closed for want of documents. An unanswered document request is not a backlog item. It is a meter.",
    source: "INDIA · IRDAI ANNUAL REPORT 2024-25 · IRDAI CIRCULAR, 5 SEPTEMBER 2024", whatK: "WHAT GOOCLAIM OS DOES FOR TPAS", whatH: "Every claim keeps moving — and every clock stays in sight.",
    items: [
      ["Reads the system you already run", "By API, a secure file drop or a batch upload — whichever your platform speaks. Read-only: nothing is ever written back."],
      ["Asks the member, and counts", "A document request becomes a message with an upload link, reminders on day 7 and 14, and a final notice on day 21 with a ticket for your team."],
      ["Checks the file before you see it", "Readable, the right document, this member’s? A file seen on another claim or marked as AI-generated is flagged for a person — never refused on its own."],
      ["The clock on every claim", "In India, 1 hour, 3 hours and 15 days, counted per claim with the interest already estimated — so a breach is visible before it is a payment."],
      ["Audit ledger per tenant", "Append-only, SHA-256 chained, 10-year retention — and turnaround reports such as NL-48 built from the record and frozen with their checksum."],
      ["Your wording, approved first", "Every member message, in each language, in your own words. Not one can be sent until your team approves it."],
    ],
  },
  {
    key: "insurers", label: "Insurers", eyebrow: "USE CASE · INSURERS", h1a: "For insurers.", h1b: "One record, across every TPA you work with.",
    lead: "You carry the regulatory duty while the handling sits with your TPAs, each on a different system with a different trail. Gooclaim OS sits on top of them and keeps one audited record of what every member was told, and when.",
    cta: "Talk to us for Insurers", chips: ["Compliance by design", "Per-tenant audit ledger", "Templates only"],
    num: "8%", numLabel: "of health claims repudiated in a year", numText: "Each one can become a complaint, and a complaint is answered with a record: what the member was asked for, when, and what they were told. When that record lives in four systems, the answer takes weeks.",
    source: "INDIA · IRDAI ANNUAL REPORT 2024-25", whatK: "WHAT GOOCLAIM OS DOES FOR INSURERS", whatH: "One member-facing layer, whichever partner handles the claim.",
    items: [
      ["The same OS across every TPA", "One member-facing layer, whichever partner handles the claim. No project per TPA, and no second trail to reconcile."],
      ["The complaint has its own clock", "Tracked against its own deadline, separately from the claim it came from, with the member’s own words kept on the record."],
      ["Nothing leaves unchecked", "Templates only, and a policy gate that matches each value to the record before it goes. Free text never reaches a member."],
      ["The turnaround return, from the record", "Built from the claims themselves rather than typed up, frozen with a checksum so the file you filed is the file you can show."],
      ["Consent before anything", "Consent is checked before a workflow runs. A document notice still reaches the registered contact, because that duty is not optional."],
      ["Isolated per tenant", "One deployment serves every customer, and the tenant comes from the session alone — never from a header, a body or a setting."],
    ],
  },
  {
    key: "hospitals", label: "Hospitals", eyebrow: "USE CASE · HOSPITALS", h1a: "For hospitals.", h1b: "Your desk stops being the help line.",
    lead: "Gooclaim OS is bought by the TPA or the insurer, not by you. But your front desk is where the patient asks — so what it changes is worth knowing, and worth asking your TPA for.",
    cta: "Talk to us for Hospitals", chips: ["Nothing to install", "Bought by your TPA or insurer", "Every message on the record"],
    num: "3 hours", numLabel: "from your request to final authorisation on discharge", numText: "That window belongs to the insurer, but the patient is in your bed asking your staff. Today the only way to know where the request stands is to call — so your billing desk spends the three hours on hold.",
    source: "INDIA · IRDAI CIRCULAR, 5 SEPTEMBER 2024 — CLAUSE 3(III)", whatK: "WHAT GOOCLAIM OS DOES FOR HOSPITALS", whatH: "Fewer questions at your counter. A record you can point at.",
    items: [
      ["The patient is told directly", "Status, what is still needed and what a decision means go to the member on messaging tools or email, in their own language."],
      ["Documents stop going through you", "The TPA asks, the member gets an upload link, the file is checked on arrival and lands in the TPA’s folder. Your desk is not the courier."],
      ["The clock is counted, not guessed", "Every claim carries its legal windows — in India, 1 hour, 3 hours and 15 days — with the time left on each."],
      ["Nobody has to remember", "Reminders go on day 7 and 14 and a final notice on day 21. Discharge paperwork stops depending on who was on shift."],
      ["A record you can point at", "What the member was asked, when, and what they were told is on the claim with timestamps. “TPA said / hospital said” has an answer."],
      ["Nothing to install", "No hospital system to roll out, no portal to learn and no integration on your side."],
    ],
  },
  {
    key: "health", label: "Health", eyebrow: "USE CASE · HEALTH INSURANCE", h1a: "For health.", h1b: "Where we started. Running today.",
    lead: "Health is where the clock is strictest, which is why Gooclaim OS runs there first: claim status, document collection, the reason behind a decision and the complaint that follows — all on the record, all in the member’s language.",
    cta: "Talk to us for Health", chips: ["Regulator clocks per claim", "Consent at step zero", "10-year audit ledger"],
    num: "39.57 lakh", numLabel: "PM-JAY claims over the 12-hour pre-auth limit", numText: "A government audit counted claims that waited more than twelve hours for a pre-auth answer. Waiting is where claims stall — and the 2024 circular made that waiting expensive.",
    source: "INDIA · CAG REPORT NO. 11 OF 2023 · AUDIT OF PM-JAY · IRDAI CIRCULAR, 5 SEPTEMBER 2024", whatK: "WHAT GOOCLAIM OS DOES FOR HEALTH", whatH: "Every moment of a health claim — on the record, in the member’s language.",
    items: [
      ["Claim status, answered from the record", "On messaging tools and email, in English, Hindi or Hinglish — with the source and the date the record was read."],
      ["Document collection that survives days", "A durable workflow that waits, reminds, accepts the file, checks it and puts it where the TPA’s system expects it."],
      ["Why a claim was decided that way", "The reason in the record, explained in approved wording, with the next step the member can actually take."],
      ["Every clock the circular sets", "1 hour for cashless authorisation, 3 hours at discharge and 15 days from submission — with interest estimated as it runs."],
      ["A complaint is its own thing", "Its own deadline, the member’s own words, and the decision sent back to them — not folded into the claim."],
      ["Nothing free-text, ever", "Templates only, every value matched to the record, and the whole message checked before it leaves."],
    ],
  },
];
