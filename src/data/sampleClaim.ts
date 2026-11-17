/**
 * The one sample claim every demo on the site talks about (Try it, Voice call,
 * Home). Shaped on how an Indian health reimbursement claim really runs:
 *
 * - A REIMBURSEMENT claim: the member paid the hospital and claims it back, so
 *   the member is the one who sends documents. (On a cashless claim IRDAI's
 *   2024 master circular has the insurer/TPA collect them from the hospital.)
 * - The document set insurer and TPA checklists ask for: claim form, itemised
 *   final bill, payment receipts, pharmacy bills with prescriptions,
 *   investigation reports, and the original discharge summary.
 * - The claim number is the TPA's own intimation number (TPAs issue their own,
 *   commonly 8 digits); voice reads only its last four.
 * - Settlement clock: 15 days from submission of the claim (IRDAI 2024).
 *
 * Dates are relative to today so the sample never reads stale. They are only
 * rendered after the visitor starts a demo, never in the prerendered HTML, so
 * the server and browser cannot disagree.
 */
export const SAMPLE_CLAIM = {
  number: "30524817",
  lastFour: "4817",
  type: "Reimbursement",
  pending: "discharge summary",
  received: ["claim form", "itemised final bill", "payment receipts", "pharmacy bills", "investigation reports"],
} as const;

/** Other claims on the sample work queue (Home hero and pulse). */
export const SAMPLE_QUEUE = ["30524817", "30524790", "30524755"] as const;

/**
 * Orion's own claims. Kept apart from SAMPLE_QUEUE so no claim number tells
 * two stories: 30524817 is 9 days into its clock on Try it, so it can never be
 * Orion's overdue one.
 */
export const ORION_QUEUE = { overdue: "30524702", complaint: "30524668", held: "30524731" } as const;

const DAY = 24 * 60 * 60 * 1000;

function fmt(d: Date, locale: "en" | "hi"): string {
  return d.toLocaleDateString(locale === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** The sample claim's timeline as of `now`. */
export function sampleDates(now: Date = new Date(), locale: "en" | "hi" = "en") {
  const at = (daysAgo: number) => new Date(now.getTime() - daysAgo * DAY);
  const submitted = at(6);
  return {
    admitted: fmt(at(12), locale),
    discharged: fmt(at(9), locale),
    submitted: fmt(submitted, locale),
    updated: fmt(at(1), locale),
    /** Days left on the 15-day settlement clock. */
    clockDaysLeft: 15 - 6,
  };
}
