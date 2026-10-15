/**
 * The claim and the six jobs, in one place.
 *
 * Both the timeline and the scrolling sequence read from here, so the days a
 * job lights up can never drift from the days the claim actually shows.
 */

export type Job = "clock" | "chase" | "queue" | "member" | "gate" | "record";

export interface JobSpec {
  key: Job;
  issue: string;
  /** What a system of record does — accurate, and not enough. */
  theirs: string;
  /** What Gooclaim OS does instead. */
  ours: string;
  hue: string;
}

export interface DaySpec {
  day: number;
  /** What the claims system shows — accurate, and the same for weeks. */
  status: string;
  deficiency?: string;
  /** What Gooclaim OS did that day. */
  event: string;
  jobs: Job[];
}

export const JOBS: JobSpec[] = [
  {
    key: "clock",
    issue: "The legal clock",
    theirs: "Stores dates. Runs no countdown and cannot say what a late claim is costing.",
    ours: "Runs the 1-hour, 3-hour and 15-day clocks on every claim, with the interest at stake.",
    hue: "#f59e0b",
  },
  {
    key: "chase",
    issue: "Missing documents",
    theirs: "Marks the claim “deficient”. Nothing asks, reminds or escalates.",
    ours: "Asks for what is owed, reminds on a schedule, and hands it to a person when nobody answers.",
    hue: "#0d99ff",
  },
  {
    key: "queue",
    issue: "Your team’s work list",
    theirs: "A list sorted by date. No way to see which claim is closest to its limit.",
    ours: "Orion puts the claim nearest its limit on top, with the next safe step and its evidence.",
    hue: "#7c3aed",
  },
  {
    key: "member",
    issue: "The member",
    theirs: "A row in a table. No channel, no language, no thread.",
    ours: "Answered on WhatsApp or email, in their language, with the source and date.",
    hue: "#10b981",
  },
  {
    key: "gate",
    issue: "What goes out",
    theirs: "No check on a message before it reaches a member.",
    ours: "Approved templates only. Every value is checked against your record before sending.",
    hue: "#7dc4ff",
  },
  {
    key: "record",
    issue: "What was said",
    theirs: "Logs decisions and field changes — not the words sent to the member.",
    ours: "Every message on a tamper-evident ledger, with its source and date.",
    hue: "#e879f9",
  },
];

export const HUE = Object.fromEntries(JOBS.map((j) => [j.key, j.hue])) as Record<Job, string>;

export const LABEL: Record<Job, string> = {
  clock: "Clock",
  chase: "Chasing",
  queue: "Work queue",
  member: "Member",
  gate: "Checked",
  record: "On record",
};

// A sample reimbursement claim — sample number, never real data.
export const DAYS: DaySpec[] = [
  {
    day: 0,
    status: "Under process",
    event: "Claim intimated. The 15-day clock starts, and so does the interest meter.",
    jobs: ["clock", "record"],
  },
  {
    day: 2,
    status: "On hold — deficient",
    deficiency: "Discharge summary",
    event:
      "Discharge summary requested through a secure upload link — approved wording, checked before sending.",
    jobs: ["chase", "gate", "record"],
  },
  {
    day: 5,
    status: "On hold — deficient",
    deficiency: "Discharge summary",
    event:
      "Member asks on WhatsApp. Answered: which document is pending, the upload link, the source and date.",
    jobs: ["member", "gate", "record"],
  },
  {
    day: 7,
    status: "On hold — deficient",
    deficiency: "Discharge summary",
    event: "First reminder sent.",
    jobs: ["chase", "record"],
  },
  {
    day: 12,
    status: "On hold — deficient",
    deficiency: "Discharge summary",
    event:
      "Three days to the limit. Orion moves the claim to the top of your team’s queue, with the next step.",
    jobs: ["queue", "clock"],
  },
  {
    day: 14,
    status: "On hold — deficient",
    deficiency: "Discharge summary",
    event: "Second reminder sent. A person is told it is still open.",
    jobs: ["chase", "queue", "record"],
  },
  {
    day: 16,
    status: "On hold — deficient",
    deficiency: "Discharge summary",
    event: "Past 15 days. The claim shows overdue, with the interest owed since day 0.",
    jobs: ["clock", "queue"],
  },
  {
    day: 21,
    status: "On hold — deficient",
    deficiency: "Discharge summary",
    event:
      "Final notice sent and a ticket opened for your team. The claim stays open — the law does not allow closing it.",
    jobs: ["chase", "queue", "record"],
  },
];

export const LIMIT = 15;
export const CLAIM_RUPEES = 100_000;
/** RBI bank rate 5.75% (from 7 Oct 2026) + IRDAI's 2%, a year. */
export const RATE = (5.75 + 2) / 100;

/** How long each day holds before the timeline steps on. */
export const STEP_MS = 2600;

export const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
