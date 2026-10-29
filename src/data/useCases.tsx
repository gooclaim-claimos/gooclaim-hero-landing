import { type ReactNode } from "react";

/**
 * The four use cases.
 *
 * 🔴 Rewritten 2026-10-15 because the previous copy sold things that are not
 * built and cited a circular that has been replaced. What was removed, and why:
 *
 *   - "Voice agent for reception", "Voice + WhatsApp + SMS", "WhatsApp, voice,
 *     SMS or web" — there is no voice and no SMS. `gooclaim-gateway/CLAUDE.md`:
 *     "Channels: WhatsApp WABA only (no voice, no SMS)". WhatsApp and email are
 *     what run.
 *   - "One inbox across every TPA", "Hospital sync — hospitals see the same
 *     real-time state" — there is no hospital-facing surface anywhere in the
 *     codebase. The hospitals page now says what actually changes for a
 *     hospital when its TPA runs this, which is a real and checkable thing.
 *   - "Cashless agent mesh — automated cashless authorisation … no human
 *     queue" — that is deciding a claim. The platform never decides one, and
 *     L2 is read-only with no write-back.
 *   - "IRDAI Master Circular (29 May 2024)" — superseded. The operative one is
 *     the Master Circular on Protection of Policyholders' Interests of
 *     5 September 2024 (IRDAI/PP&GR/CIR/MISC/117/9/2024).
 *   - "75–80% of grievances are health", "6–8 months", "₹26,037 Cr",
 *     "6–48 hrs" — sourced to a magazine, to "RTI Wiki", or to "pilot field
 *     interviews" we cannot show. Every number here is now the regulator's or
 *     the government auditor's, named with its document, the same standard the
 *     home page sets.
 *   - "zero modern multi-channel infrastructure", "stone-age communication
 *     layer" — sweeping claims about an industry, and an insult to the stack
 *     the buyer chose.
 *   - "Same actuarial. Different mouth." — the telling framing. The problem is
 *     the claim not moving, not the quality of the narration.
 *   - "7-year audit ledger" — `gooclaim_shared.contracts.retention`
 *     `CLAIM_RECORD_YEARS = 10`.
 */

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
          The claims that stop moving, and nobody is told.
        </span>
      </>
    ),
    heroIntro:
      "A claim waiting on one document can sit for weeks while the clock runs, because asking for it is somebody's manual job. Gooclaim OS reads your existing claims system, asks the member itself, and keeps every clock and every message on the claim.",
    problemStat: {
      big: "5%",
      caption: "of health claims were still open when the year ended",
      hue: "#f59e0b",
    },
    problemBody:
      "On every one of those days the 2024 circular runs interest at bank rate + 2% from the date of intimation, paid by the insurer of its own motion — and the same circular says a claim cannot be closed for want of documents. So an unanswered document request is not a backlog item. It is a meter.",
    problemSource:
      "IRDAI Annual Report 2024-25 · IRDAI circular, 5 September 2024",
    capabilities: [
      {
        title: "Reads the system you already run",
        body: "By API, a secure file drop or a batch upload — whichever your platform speaks. Read-only: nothing is ever written back.",
        hue: "#0d99ff",
      },
      {
        title: "Asks the member, and counts",
        body: "A document request becomes a message with an upload link, a reminder on day 7 and 14, and a final notice on day 21 with a ticket for your team. The claim is never closed for it.",
        hue: "#7dc4ff",
      },
      {
        title: "Checks the file before you see it",
        body: "Is it readable, is it the document it was sent as, is it this member's? A file seen on another claim or marked as AI-generated is flagged for a person — never refused on its own.",
        hue: "#10b981",
      },
      {
        title: "The clock on every claim",
        body: "1 hour, 3 hours and 15 days from submission, counted per claim with the interest already estimated, so a breach is visible before it is a payment.",
        hue: "#f59e0b",
      },
      {
        title: "Audit ledger per tenant",
        body: "Append-only, SHA-256 chained, 10-year retention — and the NL-48 TAT report built from the record itself, frozen with its checksum.",
        hue: "#7c3aed",
      },
      {
        title: "Your wording, approved first",
        body: "Templates only. Every value in a message is matched back to the record it came from, and nothing leaves until your team has signed the wording off.",
        hue: "#0d99ff",
      },
    ],
    personas: [
      {
        role: "Head of Claims Ops",
        why: "Owns the 1 hour and 3 hour windows, and the queue nobody can see the bottom of.",
      },
      {
        role: "COO",
        why: "Owns the interest that accrues on open claims, and the insurer relationships it costs.",
      },
      {
        role: "Compliance Officer",
        why: "Owns the IRDAI trail, the NL-48 return, and what the ombudsman is shown.",
      },
    ],
    trustChips: [
      { label: "Read-only on your CMS", hue: "#0d99ff" },
      { label: "IRDAI clocks per claim", hue: "#f59e0b" },
      { label: "One deployment, tenant from login", hue: "#10b981" },
    ],
    closingTitle: (
      <>
        The claim keeps moving{" "}
        <span className="text-white/55">while nobody is watching it.</span>
      </>
    ),
    closingBody:
      "Your people decide the claims. The chasing, the counting and the record of what the member was told stop being somebody's memory.",
  },
  {
    slug: "insurers",
    label: "Insurers",
    eyebrow: "Use case · Insurers",
    heroTitle: (
      <>
        For insurers.{" "}
        <span className="text-white/55">
          One record, across every TPA you work with.
        </span>
      </>
    ),
    heroIntro:
      "You carry the regulatory duty while the handling sits with your TPAs, each on a different system with a different trail. Gooclaim OS sits on top of them and keeps one audited record of what every member was told, and when.",
    problemStat: {
      big: "8%",
      caption: "of health claims repudiated in a year",
      hue: "#F26D6D",
    },
    problemBody:
      "Each one can become a complaint, and a complaint is answered with a record: what the member was asked for, when it was sent, what they were told about the decision. When that record lives in four systems and somebody's sent items, the answer takes weeks to assemble.",
    problemSource: "IRDAI Annual Report 2024-25",
    capabilities: [
      {
        title: "The same OS across every TPA",
        body: "One member-facing layer, whichever partner handles the claim. No project per TPA, and no second trail to reconcile.",
        hue: "#0d99ff",
      },
      {
        title: "The complaint has its own clock",
        body: "A complaint is tracked against its own deadline, separately from the claim it came from, with the member's own words kept on the record.",
        hue: "#F26D6D",
      },
      {
        title: "Nothing leaves unchecked",
        body: "Templates only, and a policy gate on every outbound message that matches each value to the record before it goes. Free text never reaches a member.",
        hue: "#10b981",
      },
      {
        title: "The NL-48 return, from the record",
        body: "Built from the claims themselves rather than typed up, frozen with a checksum so the file you filed is the file you can show.",
        hue: "#f59e0b",
      },
      {
        title: "Consent before anything",
        body: "DPDP consent is checked before a workflow runs. A document notice still reaches the registered contact, because that duty is not optional.",
        hue: "#7dc4ff",
      },
      {
        title: "Isolated per tenant",
        body: "One deployment serves every customer, and the tenant comes from the session alone — never from a header, a body or a setting.",
        hue: "#7c3aed",
      },
    ],
    personas: [
      {
        role: "Head of Customer Operations",
        why: "Owns turnaround, complaint volume, and what a member hears while they wait.",
      },
      {
        role: "Chief Risk / Compliance Officer",
        why: "Owns the IRDAI position, the audit posture and DPDP readiness.",
      },
      {
        role: "Chief Technology Officer",
        why: "Owns the claims systems, the channels, and the integration queue behind both.",
      },
    ],
    trustChips: [
      { label: "IRDAI + DPDP by design", hue: "#0d99ff" },
      { label: "Per-tenant audit ledger", hue: "#f59e0b" },
      { label: "Templates only — no free text", hue: "#10b981" },
    ],
    closingTitle: (
      <>
        The duty is yours.{" "}
        <span className="text-white/55">The record should be too.</span>
      </>
    ),
    closingBody:
      "Your underwriting and pricing are not the problem. What is missing is one place that holds what every member was told, across every partner, ready the day someone asks.",
  },
  {
    slug: "hospitals",
    label: "Hospitals",
    eyebrow: "Use case · Hospitals",
    heroTitle: (
      <>
        For hospitals.{" "}
        <span className="text-white/55">
          When your TPA runs this, your desk stops being the help line.
        </span>
      </>
    ),
    heroIntro:
      "Gooclaim OS is bought by the TPA or the insurer, not by you. But your front desk is where the patient asks, so what it changes is worth knowing — and worth asking your TPA for.",
    problemStat: {
      big: "3 hours",
      caption: "allowed from your request to the final authorisation on discharge",
      hue: "#7c3aed",
    },
    problemBody:
      "That window belongs to the insurer, but the patient is sitting in your bed and asking your staff. Today the only way to know where the request stands is to call, so your billing desk spends the three hours on hold and the patient blames the people in front of them.",
    problemSource: "IRDAI circular, 5 September 2024 — clause 3(iii)",
    capabilities: [
      {
        title: "The patient is told directly",
        body: "Status, what is still needed and what a decision means go to the member on WhatsApp or email, in their own language — so fewer of those questions arrive at your counter.",
        hue: "#0d99ff",
      },
      {
        title: "Documents stop going through you",
        body: "The TPA asks, the member gets an upload link, the file is checked on arrival and lands in the TPA's own folder. Your desk is not the courier.",
        hue: "#7dc4ff",
      },
      {
        title: "The clock is counted, not guessed",
        body: "Every claim carries its 1 hour, 3 hour and 15 day windows with the time left on each — so a request that is about to breach is visible to the TPA before you have to chase it.",
        hue: "#f59e0b",
      },
      {
        title: "Nobody has to remember",
        body: "Reminders go on day 7, day 14 and a final notice on day 21, and the claim is never closed for a missing document. Discharge paperwork stops depending on who was on shift.",
        hue: "#10b981",
      },
      {
        title: "A record you can point at",
        body: "What the member was asked, when, and what they were told is on the claim with its timestamps. The “TPA said / hospital said” argument has an answer.",
        hue: "#7c3aed",
      },
      {
        title: "Nothing to install",
        body: "There is no hospital system to roll out, no portal to learn and no integration on your side. It runs where your TPA runs it.",
        hue: "#0d99ff",
      },
    ],
    personas: [
      {
        role: "Hospital Administrator",
        why: "Owns bed turnover and how the wait feels to the patient.",
      },
      {
        role: "Billing / Insurance Desk",
        why: "Spends the day on hold with TPAs for statuses the patient has already asked for.",
      },
      {
        role: "Group IT Head",
        why: "Would rather not add a seventh portal to the four already on the desk.",
      },
    ],
    trustChips: [
      { label: "Nothing to install here", hue: "#0d99ff" },
      { label: "Bought by your TPA or insurer", hue: "#7dc4ff" },
      { label: "Every message on the record", hue: "#f59e0b" },
    ],
    closingTitle: (
      <>
        Ask your TPA whether they run this.{" "}
        <span className="text-white/55">Or tell us who they are.</span>
      </>
    ),
    closingBody:
      "A hospital-facing surface is not built yet, and we would rather say so than sell you one. If the wait at your desk is worth fixing, the fastest route is the TPA your network already works with — and we are happy to talk to them with you.",
  },
  {
    slug: "health",
    label: "Health",
    eyebrow: "Use case · Health insurance",
    heroTitle: (
      <>
        For health.{" "}
        <span className="text-white/55">Where we started. Running today.</span>
      </>
    ),
    heroIntro:
      "Health has the strictest clock in Indian insurance, which is why it is where Gooclaim OS runs first: claim status, document collection, the reason behind a decision and the complaint that follows — all on the record, all in the member's language.",
    problemStat: {
      big: "39.57 lakh",
      caption: "PM-JAY claims over the 12-hour pre-auth limit",
      hue: "#F26D6D",
    },
    problemBody:
      "A government audit counted them, in India's own health scheme: claims that waited more than twelve hours for a pre-auth answer. Waiting is where claims stall — on a document, a clarification or a reply that is nobody's job. The 2024 circular made that waiting expensive: interest runs from intimation, and the claim cannot be closed for want of documents.",
    problemSource:
      "CAG Report No. 11 of 2023 · audit of PM-JAY · IRDAI circular, 5 September 2024",
    capabilities: [
      {
        title: "Claim status, answered from the record",
        body: "On WhatsApp and email, in English, Hindi or Hinglish — with the source and the date the record was read.",
        hue: "#0d99ff",
      },
      {
        title: "Document collection that survives days",
        body: "A durable workflow that waits, reminds, accepts the file, checks it and puts it where the TPA's system expects it — without losing its place.",
        hue: "#7dc4ff",
      },
      {
        title: "Why a claim was decided that way",
        body: "The reason in the record, explained in approved wording, with the next step the member can actually take.",
        hue: "#7c3aed",
      },
      {
        title: "Every clock the circular sets",
        body: "1 hour for cashless authorisation, 3 hours at discharge, 15 days from submission — counted per claim, with the interest estimated as it runs.",
        hue: "#10b981",
      },
      {
        title: "A complaint is its own thing",
        body: "It gets its own deadline, the member's own words, and the decision sent back to them — not folded into the claim it came from.",
        hue: "#f59e0b",
      },
      {
        title: "Nothing free-text, ever",
        body: "Templates only, every value matched to the record, and the whole message checked before it leaves. On health data that is not a preference.",
        hue: "#0d99ff",
      },
    ],
    personas: [
      {
        role: "Health insurer, customer operations",
        why: "Owns what a member hears between intimation and settlement.",
      },
      {
        role: "TPA leadership",
        why: "Owns the cashless clock and the cost of every claim that stalls.",
      },
      {
        role: "Compliance",
        why: "Owns the NL-48 return, the ombudsman file and the DPDP position.",
      },
    ],
    trustChips: [
      { label: "IRDAI 1 hr / 3 hr / 15 days", hue: "#0d99ff" },
      { label: "DPDP consent at step zero", hue: "#10b981" },
      { label: "10-year audit ledger", hue: "#f59e0b" },
    ],
    closingTitle: (
      <>
        Health first.{" "}
        <span className="text-white/55">Because its clock is the strictest.</span>
      </>
    ),
    closingBody:
      "Gooclaim OS is built on what every claim shares — a status to tell, documents to collect, a reason to explain and a clock to beat. Motor and life are new workflows on the same core, not a rebuild.",
  },
];
