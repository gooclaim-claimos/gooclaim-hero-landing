import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import JobsSequence from "./JobsSequence";
import {
  CLAIM_RUPEES,
  DAYS,
  HUE,
  JOBS,
  LABEL,
  LIMIT,
  RATE,
  STEP_MS,
  inr,
  type Job,
} from "./systemGapData";

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
  const [focus] = useState<Job | null>(null);
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

      <JobsSequence jobs={JOBS} days={DAYS} />

    </SectionShell>
  );
}
