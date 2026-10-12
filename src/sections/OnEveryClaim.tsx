import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

interface Tile {
  key: string;
  label: string;
  title: string;
  body: string;
  hue: string;
  big?: string;
  wide?: boolean;
  /** The whole row — the last tile, so the grid ends without a hole. */
  full?: boolean;
}

const TILES: Tile[] = [
  {
    key: "source",
    label: "Every answer",
    title: "Names its source and date.",
    body: "A member never gets a bare status. Each answer says whose record it read and when that record was last updated — and every value in it is checked against that record before it leaves.",
    hue: "#0d99ff",
    wide: true,
  },
  {
    key: "clocks",
    label: "IRDAI clocks",
    title: "On every claim.",
    big: "1 h · 3 h · 15 d",
    body: "Pre-auth, discharge, reimbursement. Slide to see the reimbursement clock run out.",
    hue: "#f59e0b",
  },
  {
    key: "documents",
    label: "Pending documents",
    title: "Asked, collected, checked.",
    body: "A secure upload link that can’t be forwarded, every file scanned and checked, reminders on day 7 and 14, a final notice and a ticket on day 21. Cashless members are never asked.",
    hue: "#7dc4ff",
  },
  {
    key: "complaints",
    label: "Complaints",
    title: "Each with its own clock.",
    body: "Acknowledged within 3 working days, resolved within 14 — and the decision goes back to the member, in their language.",
    hue: "#ef4444",
  },
  {
    key: "nl48",
    label: "NL-48 TAT report",
    title: "Built from the record.",
    body: "The quarterly turnaround report insurers publish — hour bands, month bands, ageing, complaints — straight from your claims. File it once and the copy is frozen with its SHA-256.",
    hue: "#7c3aed",
  },
  {
    key: "consent",
    label: "Consent & audit",
    title: "Before a word. After every word.",
    body: "DPDP consent before any claim detail, an OTP before anything personal, and every decision in an append-only, SHA-256-chained ledger.",
    hue: "#10b981",
    full: true,
  },
];

// ── Interactive tiles ───────────────────────────────────────────────────────

/** The same answer with and without its source — the difference a member feels. */
function SourceDemo() {
  const [withSource, setWithSource] = useState(true);
  const options = [
    { on: false, label: "Without Gooclaim" },
    { on: true, label: "With Gooclaim" },
  ];
  return (
    <div className="mt-auto space-y-3">
      <div role="group" aria-label="Compare an answer" className="inline-flex rounded-full p-1 glass">
        {options.map((o) => (
          <button
            key={o.label}
            type="button"
            aria-pressed={withSource === o.on}
            onClick={() => setWithSource(o.on)}
            className={`min-h-[36px] rounded-full px-3.5 text-[12px] font-semibold transition-all duration-300 ${
              withSource === o.on ? "bg-white text-ink-950" : "text-white/60 hover:text-white"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={withSource ? "with" : "without"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3"
          >
            <p className="text-[13.5px] leading-relaxed text-white/85">
              {withSource
                ? "“The latest status of your claim CLM-24817 (as per your insurer’s records, updated 3 Oct 2026): Under review.”"
                : "“Your claim is rejected.”"}
            </p>
            <p
              className="mt-2 font-display text-[10.5px] uppercase tracking-wider"
              style={{ color: withSource ? "#10b981" : "#ef4444" }}
            >
              {withSource
                ? "Whose record · as of when · checked before it is sent"
                : "No source · no date · the member calls the helpline"}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

const CLAIM_PAISE = 100_000 * 100;
const LATE_RATE = (5.5 + 2) / 100; // RBI bank rate 5.50% + IRDAI's 2%, a year
const LIMIT_DAYS = 15;

/** The reimbursement clock as the engine counts it: 15 days, amber from day 10,
 *  and once past, interest at bank rate + 2% a year from the day of intimation. */
function ClockDemo() {
  const [days, setDays] = useState(17);
  const late = days > LIMIT_DAYS;
  const tone = late ? "#ef4444" : days >= 10 ? "#f59e0b" : "#10b981";
  const state = late
    ? `Past 15 days · ${days - LIMIT_DAYS} ${days - LIMIT_DAYS === 1 ? "day" : "days"} late`
    : days === LIMIT_DAYS
      ? "Due today"
      : `${LIMIT_DAYS - days} ${LIMIT_DAYS - days === 1 ? "day" : "days"} left`;
  const interest = late ? Math.round((CLAIM_PAISE * LATE_RATE * days) / 365 / 100) : 0;
  return (
    <div className="mt-auto space-y-3">
      <label className="block">
        <span className="flex items-baseline justify-between gap-3 text-[12px] text-white/55">
          Days since intimation
          <span className="font-display text-[13px] font-semibold text-white">{days}</span>
        </span>
        <input
          type="range"
          min={0}
          max={30}
          step={1}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10"
          style={{ accentColor: tone }}
          aria-valuetext={`${days} days since intimation — ${state}`}
        />
      </label>
      <div className="flex flex-wrap items-center gap-2.5" aria-live="polite">
        <span
          className="inline-flex items-center rounded-full px-2.5 py-1 font-display text-[10.5px] font-semibold uppercase tracking-wider transition-colors duration-300"
          style={{ color: tone, background: `${tone}1a`, border: `1px solid ${tone}55` }}
        >
          {state}
        </span>
        <span className="text-[12px] text-white/60">
          {late
            ? `₹${interest.toLocaleString("en-IN")} interest on a ₹1,00,000 claim (est.)`
            : "No interest owed yet"}
        </span>
      </div>
      <p className="font-display text-[10px] uppercase tracking-wider text-white/35">
        Reimbursement · RBI bank rate 5.50% + 2% · illustrative
      </p>
    </div>
  );
}

export default function OnEveryClaim({ eyebrow = "07 · On every claim" }: { eyebrow?: string } = {}) {
  return (
    <SectionShell
      id="on-every-claim"
      eyebrow={eyebrow}
      title={
        <>
          Every answer, on the record.{" "}
          <span className="text-white/55">Every clock, running.</span>
        </>
      }
      intro="What the OS does on every claim today — for the member who asked, and for the compliance team that has to answer for it."
    >
      <motion.div
        variants={stagger(0.06, 0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
      >
        {TILES.map((t) => (
          <motion.article
            key={t.key}
            variants={fadeUp}
            className={`group relative overflow-clip rounded-2xl glass p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/15 sm:p-7 ${
              t.full ? "sm:col-span-2 lg:col-span-3" : t.wide ? "sm:col-span-2" : ""
            }`}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-50 blur-3xl transition-opacity duration-700 group-hover:opacity-90"
              style={{ background: `${t.hue}33` }}
            />
            <div className="relative z-10 flex h-full flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: t.hue, boxShadow: `0 0 10px ${t.hue}` }}
                />
                <span
                  className="font-display text-[11px] uppercase tracking-wider2"
                  style={{ color: t.hue }}
                >
                  {t.label}
                </span>
              </div>
              {t.big && (
                <div
                  className="font-display text-[36px] font-semibold leading-[1] tracking-tightest sm:text-[44px]"
                  style={{ color: t.hue }}
                >
                  {t.big}
                </div>
              )}
              <h3 className="font-display text-[21px] font-semibold leading-tight tracking-tight text-white sm:text-[23px]">
                {t.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-white/60 sm:text-[14px]">
                {t.body}
              </p>
              {t.key === "source" && <SourceDemo />}
              {t.key === "clocks" && <ClockDemo />}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  );
}
