import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

/** The six things a claims system was never built to do — each one a job Gooclaim OS takes on. */
type Job = "clock" | "chase" | "queue" | "member" | "gate" | "record";

const JOBS: { key: Job; issue: string; theirs: string; ours: string; hue: string }[] = [
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
const HUE = Object.fromEntries(JOBS.map((j) => [j.key, j.hue])) as Record<Job, string>;
const LABEL: Record<Job, string> = {
  clock: "Clock",
  chase: "Chasing",
  queue: "Work queue",
  member: "Member",
  gate: "Checked",
  record: "On record",
};

interface Day {
  day: number;
  /** What the claims system shows — accurate, and the same for weeks. */
  status: string;
  deficiency?: string;
  /** What Gooclaim OS did that day. */
  event: string;
  jobs: Job[];
}

// A sample reimbursement claim — sample number, never real data.
const DAYS: Day[] = [
  { day: 0, status: "Under process", event: "Claim intimated. The 15-day clock starts, and so does the interest meter.", jobs: ["clock", "record"] },
  {
    day: 2,
    status: "On hold — deficient",
    deficiency: "Discharge summary",
    event: "Discharge summary requested through a secure upload link — approved wording, checked before sending.",
    jobs: ["chase", "gate", "record"],
  },
  {
    day: 5,
    status: "On hold — deficient",
    deficiency: "Discharge summary",
    event: "Member asks on WhatsApp. Answered: which document is pending, the upload link, the source and date.",
    jobs: ["member", "gate", "record"],
  },
  { day: 7, status: "On hold — deficient", deficiency: "Discharge summary", event: "First reminder sent.", jobs: ["chase", "record"] },
  {
    day: 12,
    status: "On hold — deficient",
    deficiency: "Discharge summary",
    event: "Three days to the limit. Orion moves the claim to the top of your team’s queue, with the next step.",
    jobs: ["queue", "clock"],
  },
  { day: 14, status: "On hold — deficient", deficiency: "Discharge summary", event: "Second reminder sent. A person is told it is still open.", jobs: ["chase", "queue", "record"] },
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
    event: "Final notice sent and a ticket opened for your team. The claim stays open — the law does not allow closing it.",
    jobs: ["chase", "queue", "record"],
  },
];

const LIMIT = 15;
const CLAIM_RUPEES = 100_000;
const RATE = (5.75 + 2) / 100; // RBI bank rate 5.75% (from 7 Oct 2026) + IRDAI's 2%, a year
const STEP_MS = 2600;

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

function Chip({ job, dim }: { job: Job; dim: boolean }) {
  const hue = HUE[job];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-display text-[9.5px] uppercase tracking-wider2 transition-opacity duration-300"
      style={{ color: hue, borderColor: `${hue}55`, background: `${hue}14`, opacity: dim ? 0.3 : 1 }}
    >
      {LABEL[job]}
    </span>
  );
}

function Row({ k, v, muted }: { k: string; v: string; muted?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-white/[0.06] py-2.5 last:border-0">
      <span className="text-[12px] text-white/45">{k}</span>
      <span className={`text-right text-[12.5px] ${muted ? "text-white/30" : "text-white/80"}`}>{v}</span>
    </div>
  );
}

function ClaimTimeline({ focus }: { focus: Job | null }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const touched = useRef(false);

  // Play once when it first comes into view — unless someone already took over.
  useEffect(() => {
    if (!inView || touched.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) setStep(DAYS.length - 1);
    else setPlaying(true);
  }, [inView]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setStep((s) => {
        if (s >= DAYS.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [playing]);

  const d = DAYS[step];
  const late = d.day > LIMIT;
  const left = LIMIT - d.day;
  const clockHue = late ? "#ef4444" : left <= 5 ? "#f59e0b" : "#10b981";
  const interest = late ? (CLAIM_RUPEES * RATE * d.day) / 365 : 0;
  const shown = DAYS.slice(0, step + 1).reverse();

  const go = (i: number) => {
    touched.current = true;
    setPlaying(false);
    setStep(i);
  };

  return (
    <div ref={ref} className="relative overflow-clip rounded-2xl glass p-5 sm:p-8">
      {/* Day rail */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="font-display text-[10.5px] uppercase tracking-wider2 text-white/45">
          One claim, day by day · sample CLM-24817
        </div>
        <button
          type="button"
          onClick={() => {
            touched.current = true;
            if (playing) setPlaying(false);
            else {
              if (step >= DAYS.length - 1) setStep(0);
              setPlaying(true);
            }
          }}
          className="inline-flex min-h-[36px] items-center gap-2 rounded-full px-4 text-[12.5px] font-semibold text-white/80 glass transition-colors hover:text-white"
        >
          {playing ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="5" y="4" width="5" height="16" rx="1" /><rect x="14" y="4" width="5" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 4.5v15l13-7.5z" />
            </svg>
          )}
          {playing ? "Pause" : step >= DAYS.length - 1 ? "Replay" : "Play"}
        </button>
      </div>

      <div className="relative mt-6">
        <div className="absolute left-0 right-0 top-[13px] h-[2px] rounded-full bg-white/[0.08] sm:top-[15px]" />
        <motion.div
          className="absolute left-0 top-[13px] h-[2px] rounded-full sm:top-[15px]"
          style={{ background: `linear-gradient(90deg, #10b981, #f59e0b 60%, #ef4444)` }}
          animate={{ width: `${(step / (DAYS.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <div role="tablist" aria-label="Days of the sample claim" className="relative flex justify-between">
          {DAYS.map((x, i) => {
            const on = i === step;
            const past = i <= step;
            const over = x.day > LIMIT;
            return (
              <button
                key={x.day}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => go(i)}
                className="group flex flex-col items-center gap-1.5"
              >
                <span
                  className={`flex h-[28px] w-[28px] items-center justify-center rounded-full border text-[10.5px] font-semibold transition-all duration-300 sm:h-[32px] sm:w-[32px] sm:text-[11px] ${
                    on ? "scale-110" : ""
                  }`}
                  style={{
                    borderColor: past ? (over ? "#ef4444" : "rgba(255,255,255,0.35)") : "rgba(255,255,255,0.12)",
                    background: on ? (over ? "#ef4444" : "#fff") : past ? "rgba(255,255,255,0.08)" : "#0a0d14",
                    color: on ? (over ? "#fff" : "#05070c") : past ? "#fff" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {x.day}
                </span>
                <span className={`hidden text-[10px] sm:block ${on ? "text-white/80" : "text-white/35"}`}>Day {x.day}</span>
              </button>
            );
          })}
        </div>
        {/* The 15-day line */}
        <div
          className="pointer-events-none absolute -top-1 bottom-0 hidden w-px sm:block"
          style={{ left: `${((5.5) / (DAYS.length - 1)) * 100}%`, background: "repeating-linear-gradient(to bottom, rgba(239,68,68,0.6) 0 4px, transparent 4px 8px)" }}
          aria-hidden
        />
      </div>

      {/* Side by side */}
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.25fr]">
        {/* Your claims system */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="font-display text-[10.5px] uppercase tracking-wider2 text-white/50">Your claims system</div>
            <span className="text-[11px] text-white/35">Day {d.day}</span>
          </div>
          <div className="mt-4 rounded-lg border border-white/[0.08] bg-black/20 px-4 py-1.5">
            <Row k="Claim" v="CLM-24817" />
            <div className="flex items-baseline justify-between gap-3 border-b border-white/[0.06] py-2.5">
              <span className="text-[12px] text-white/45">Status</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={d.status}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-md bg-white/[0.07] px-2 py-0.5 text-[12px] font-semibold text-white/85"
                >
                  {d.status}
                </motion.span>
              </AnimatePresence>
            </div>
            <Row k="Deficiency" v={d.deficiency ?? "—"} muted={!d.deficiency} />
            <Row k="Next action" v="—" muted />
            <Row k="Member last told" v="—" muted />
            <Row k="Interest owed" v="Not computed" muted />
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-white/50">
            {late
              ? "The claim is overdue. Nothing in the system says so."
              : d.day === 0
                ? "Correct, and complete for what it was built to do."
                : "Every field is correct. Nothing in it moves the claim."}
          </p>
        </div>

        {/* Gooclaim OS */}
        <div className="rounded-xl border border-[#0d99ff]/25 bg-[#0d99ff]/[0.04] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="font-display text-[10.5px] uppercase tracking-wider2 text-accent-cyan">With Gooclaim OS</div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11.5px] font-semibold"
                style={{ color: clockHue, borderColor: `${clockHue}55`, background: `${clockHue}14` }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: clockHue }} />
                {late ? `Overdue by ${d.day - LIMIT} ${d.day - LIMIT === 1 ? "day" : "days"}` : `${left} days left of ${LIMIT}`}
              </span>
              <span className="whitespace-nowrap rounded-full border border-white/10 px-2.5 py-1 text-[11.5px] text-white/70">
                {late ? `${inr(interest)} interest owed` : "No interest if settled in time"}
              </span>
            </div>
          </div>
          <div className="relative mt-4">
            <ul
              className="h-[300px] space-y-2.5 overflow-y-auto overscroll-contain pb-12 sm:h-[280px]"
              data-lenis-prevent
              aria-label="What Gooclaim OS did, newest first"
            >
              <AnimatePresence initial={false}>
                {shown.map((x, i) => {
                  const dim = focus !== null && !x.jobs.includes(focus);
                  return (
                    <motion.li
                      key={x.day}
                      layout
                      initial={{ opacity: 0, y: -12 }}
                      animate={{ opacity: dim ? 0.35 : i === 0 ? 1 : 0.7, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={`rounded-lg border p-3 ${i === 0 ? "border-white/15 bg-white/[0.06]" : "border-white/[0.06] bg-white/[0.02]"}`}
                    >
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="mr-1 text-[11px] font-semibold text-white/60">Day {x.day}</span>
                        {x.jobs.map((j) => (
                          <Chip key={j} job={j} dim={focus !== null && focus !== j} />
                        ))}
                      </div>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-white/85">{x.event}</p>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#070b14] to-transparent" />
          </div>
        </div>
      </div>
      <div className="mt-4 text-[10.5px] text-white/35">
        Sample reimbursement of ₹1,00,000 · interest at RBI bank rate 5.75% + 2% a year from intimation · illustrative
      </div>
    </div>
  );
}

export default function SystemGap({ eyebrow = "02 · Why your system can’t fix it" }: { eyebrow?: string } = {}) {
  const [focus, setFocus] = useState<Job | null>(null);
  return (
    <SectionShell
      id="system-gap"
      eyebrow={eyebrow}
      title={
        <>
          Your claims system records the claim.{" "}
          <span className="text-white/55">Gooclaim OS moves it.</span>
        </>
      }
      intro="Keep the system you have — it stays the source of truth. Gooclaim OS reads it and never writes to it. What it adds is everything that has to happen between the steps."
    >
      <ClaimTimeline focus={focus} />

      {/* Issue → what happens today → what Gooclaim OS does */}
      <div className="mt-14">
        <h3 className="text-balance font-display text-[24px] font-semibold leading-tight tracking-tighter text-white sm:text-[30px]">
          Six things it was never built to do.{" "}
          <span className="text-white/55">Six jobs Gooclaim OS takes on.</span>
        </h3>
        <div className="mt-6 hidden grid-cols-[0.8fr_1fr_1.15fr] gap-4 px-5 font-display text-[10.5px] uppercase tracking-wider2 text-white/40 md:grid">
          <span>The issue</span>
          <span>Your claims system</span>
          <span className="text-accent-cyan">Gooclaim OS</span>
        </div>
        <motion.ul
          variants={stagger(0.04, 0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-3 space-y-2.5"
          onMouseLeave={() => setFocus(null)}
        >
          {JOBS.map((j) => {
            const on = focus === j.key;
            return (
              <motion.li key={j.key} variants={fadeUp}>
                <button
                  type="button"
                  onMouseEnter={() => setFocus(j.key)}
                  onFocus={() => setFocus(j.key)}
                  onBlur={() => setFocus(null)}
                  // Hover already lit it; a click (or a tap on a phone) must not unlight it.
                  onClick={() => setFocus(j.key)}
                  aria-pressed={on}
                  className={`grid w-full grid-cols-1 gap-3 rounded-2xl border p-5 text-left transition-all duration-300 md:grid-cols-[0.8fr_1fr_1.15fr] md:items-center md:gap-4 ${
                    on ? "border-white/20 bg-white/[0.06]" : "border-white/[0.08] bg-white/[0.02] hover:border-white/15"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: j.hue, boxShadow: `0 0 10px ${j.hue}` }} />
                    <span className="font-display text-[16px] font-semibold text-white">{j.issue}</span>
                  </span>
                  <span className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-white/50">
                    <svg className="mt-[3px] shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                      <path d="M5 12h14" />
                    </svg>
                    <span>
                      <span className="mr-1 font-semibold text-white/60 md:hidden">Your system:</span>
                      {j.theirs}
                    </span>
                  </span>
                  <span className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-white/85">
                    <svg className="mt-[3px] shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={j.hue} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    <span>
                      <span className="mr-1 font-semibold text-white md:hidden">Gooclaim OS:</span>
                      {j.ours}
                      <span className="mt-1.5 block font-display text-[10px] uppercase tracking-wider2" style={{ color: `${j.hue}cc` }}>
                        In the claim above: day {DAYS.filter((x) => x.jobs.includes(j.key)).map((x) => x.day).join(" · ")}
                      </span>
                    </span>
                  </span>
                </button>
              </motion.li>
            );
          })}
        </motion.ul>
        <p className="mt-4 text-[12.5px] text-white/40">Point at a row to light up where it happens in the claim above.</p>
      </div>
    </SectionShell>
  );
}
