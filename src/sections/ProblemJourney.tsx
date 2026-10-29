import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionShell from "@/components/SectionShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { openWaitlist } from "@/lib/waitlist";

interface Stage {
  key: string;
  label: string;
  /** The claim stops here in practice. */
  stops: boolean;
  rule: string;
  reality: string;
  source: string;
}

// Public facts only, each with its public source. The rules are read from the
// IRDAI circular of 5 September 2024 itself — not the repealed 30/45-day rule
// still quoted on insurer websites.
const STAGES: Stage[] = [
  {
    key: "intimation",
    label: "Intimation",
    stops: false,
    rule: "From this day, interest at bank rate + 2% a year runs until the claim is paid — and the insurer must pay it without being asked.",
    reality: "The meter starts here, whichever step the claim later gets stuck at.",
    source: "IRDAI Master Circular, 5 Sep 2024 · para 2.ii",
  },
  {
    key: "eligibility",
    label: "Eligibility",
    stops: false,
    rule: "The policy and the member are checked against the record.",
    reality: "This step works. The claims system holds the record and does it well.",
    source: "Your claims system",
  },
  {
    key: "preauth",
    label: "Pre-auth",
    stops: true,
    rule: "1 hour to approve a cashless request. 3 hours to authorise a discharge.",
    reality: "In India's own government health scheme, 39.57 lakh claims took longer than 12 hours to approve.",
    source: "CAG Report No. 11 of 2023 · audit of PM-JAY",
  },
  {
    key: "documents",
    label: "Documents",
    stops: true,
    rule: "The TPA must collect documents from the hospital — not the member. No claim may be closed for want of them.",
    reality: "About 1 in 5 rejections were never medical — an unanswered query or a missing document. Since 2024 those claims cannot be rejected, so they stay open, with interest running.",
    source: "IRDAI circular 2024 · paras 1.ii, 3(iii)3 · industry-reported FY24 ranges",
  },
  {
    key: "adjudication",
    label: "Adjudication",
    stops: true,
    rule: "Every deduction explained. A rejection must cite the policy clause and clear a review committee.",
    reality: "₹15,100 crore was cut from approved claims in FY24. In December 2025 IRDAI fined an insurer ₹1 crore — partly for never explaining deductions.",
    source: "IRDAI data, FY24 · IRDAI order, 15 Dec 2025",
  },
  {
    key: "settlement",
    label: "Settlement",
    stops: true,
    rule: "15 days from submission of the claim.",
    reality: "Hospitals report waiting 6–8 months. One bank transfer can cover 40–80 claims, so nobody can tell which claim was paid.",
    source: "Industry-reported",
  },
];

const PARTIES = [
  { who: "Hospital", holds: "The documents and the bill", says: "We sent the bill." },
  { who: "TPA", holds: "The claim record and the workflow", says: "The insurer decides." },
  { who: "Insurer", holds: "The decision and the money", says: "The TPA holds the data." },
  { who: "Member", holds: "Nothing but the wait", says: "Nobody tells me anything.", member: true },
];

const MOMENTS = ["A status to tell", "Documents to collect", "A reason to explain", "A clock to beat"];

const HEALTH_WORKFLOWS = [
  "Claim status, with the source and date",
  "Pending documents, asked and reminded",
  "Query reasons, in the insurer's own words",
  "Insurance questions, from your knowledge library",
  "Complaints, on the IRDAI clock",
];

const STOP = "#ef4444";
const METER = "#f59e0b";

function Journey() {
  const [active, setActive] = useState("documents");
  const stage = STAGES.find((s) => s.key === active) ?? STAGES[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-clip rounded-2xl glass p-5 sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="font-display text-[10.5px] uppercase tracking-wider2 text-white/45">
          One health claim, six steps · tap a step
        </div>
        <div className="flex items-center gap-4 text-[11.5px] text-white/55">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: STOP, boxShadow: `0 0 8px ${STOP}` }} />
            Where it stops
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-[3px] w-4 rounded-full" style={{ background: METER }} />
            Interest meter
          </span>
        </div>
      </div>

      {/* The six steps */}
      <div role="tablist" aria-label="Steps of a claim" className="relative mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {STAGES.map((s, i) => {
          const on = s.key === active;
          return (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="problem-stage-panel"
              onClick={() => setActive(s.key)}
              onMouseEnter={() => setActive(s.key)}
              onFocus={() => setActive(s.key)}
              className={`group relative flex min-h-[64px] flex-col items-start justify-between rounded-xl border px-3 py-2.5 text-left transition-all duration-300 ${
                on ? "border-white/25 bg-white/[0.08]" : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <span className="font-display text-[10px] uppercase tracking-wider2 text-white/35">0{i + 1}</span>
              <span className={`mt-1 text-[13px] font-semibold ${on ? "text-white" : "text-white/70"}`}>{s.label}</span>
              {s.stops && (
                <span className="absolute right-2.5 top-2.5 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50" style={{ background: STOP }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: STOP }} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* The meter: from intimation to payment, whatever step the claim is on */}
      <div className="mt-3 flex items-center gap-3">
        <div className="relative h-[3px] flex-1 overflow-clip rounded-full bg-white/[0.06]">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="absolute inset-0 origin-left rounded-full"
            style={{ background: `linear-gradient(90deg, ${METER}, ${STOP})` }}
          />
        </div>
        <span className="shrink-0 font-display text-[10px] uppercase tracking-wider2" style={{ color: METER }}>
          Bank rate + 2%, from day one
        </span>
      </div>

      {/* The chosen step */}
      <div id="problem-stage-panel" role="tabpanel" aria-live="polite" className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 gap-3 md:grid-cols-2"
          >
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="font-display text-[10.5px] uppercase tracking-wider2 text-accent-cyan">What the rule says</div>
              <p className="mt-2.5 text-[15px] leading-relaxed text-white/85">{stage.rule}</p>
            </div>
            <div
              className="rounded-xl border p-5"
              style={{
                borderColor: stage.stops ? `${STOP}40` : "rgba(255,255,255,0.1)",
                background: stage.stops ? `${STOP}0f` : "rgba(255,255,255,0.03)",
              }}
            >
              <div
                className="font-display text-[10.5px] uppercase tracking-wider2"
                style={{ color: stage.stops ? STOP : "rgba(255,255,255,0.55)" }}
              >
                What actually happens
              </div>
              <p className="mt-2.5 text-[15px] leading-relaxed text-white/85">{stage.reality}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-3 inline-flex items-center gap-2 font-display text-[10px] uppercase tracking-wider2 text-white/35">
          <span className="h-px w-5 bg-white/20" /> {stage.source}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProblemJourney({ eyebrow = "01 · The problem" }: { eyebrow?: string } = {}) {
  return (
    <SectionShell
      id="problem"
      eyebrow={eyebrow}
      title={
        <>
          A claim is decided by a system.{" "}
          <span className="text-white/55">It&rsquo;s moved by people &mdash; and there aren&rsquo;t enough of them.</span>
        </>
      }
      intro="India settles 3.26 crore health claims a year against a one-hour legal clock. The decision is rarely the problem. Claims stop between the steps — and since 2024, every day they wait costs money."
    >
      <Journey />

      {/* Nobody owns the movement */}
      <div className="mt-14">
        <h3 className="text-balance font-display text-[24px] font-semibold leading-tight tracking-tighter text-white sm:text-[30px]">
          The decision has an owner. <span className="text-white/55">The movement doesn&rsquo;t.</span>
        </h3>
        <motion.div
          variants={stagger(0.06, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PARTIES.map((p) => (
            <motion.div
              key={p.who}
              variants={fadeUp}
              className={`rounded-2xl p-5 ${p.member ? "border" : "glass"}`}
              style={p.member ? { borderColor: `${STOP}40`, background: `${STOP}0d` } : undefined}
            >
              <div
                className="font-display text-[11px] uppercase tracking-wider2"
                style={{ color: p.member ? STOP : "rgba(255,255,255,0.55)" }}
              >
                {p.who}
              </div>
              <p className="mt-3 font-display text-[19px] font-semibold leading-snug text-white">&ldquo;{p.says}&rdquo;</p>
              <p className="mt-2 text-[13px] text-white/50">Holds: {p.holds}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 flex flex-col gap-4 rounded-2xl border border-[#0d99ff]/25 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7"
          style={{ background: "linear-gradient(135deg, rgba(13,153,255,0.10) 0%, rgba(124,58,237,0.05) 100%)" }}
        >
          <p className="max-w-2xl text-balance text-[16px] leading-relaxed text-white/85 sm:text-[17px]">
            <span className="font-semibold text-white">Gooclaim OS moves the claim.</span> It chases what is owed,
            watches every clock, and tells the member &mdash; all on the record, without replacing the system that decides.
          </p>
          <Link
            to="/platform"
            className="group inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start rounded-full px-5 py-2.5 text-[14px] font-semibold text-white/90 glass transition-all hover:-translate-y-0.5 hover:text-white sm:self-auto"
          >
            How it works
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
          </Link>
        </motion.div>
      </div>

      {/* Built around the claim — health is where we started */}
      <div className="mt-14 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <div>
          <h3 className="text-balance font-display text-[24px] font-semibold leading-tight tracking-tighter text-white sm:text-[30px]">
            Built around the claim, <span className="text-white/55">not one line of insurance.</span>
          </h3>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/60">
            Every claim — health, motor or life — has the same moments: a status to tell, documents to collect, a reason
            to explain and a clock to beat. Gooclaim OS is built on those. We started where the clock is strictest: health.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {MOMENTS.map((m) => (
              <span key={m} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12.5px] text-white/75">
                {m}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => openWaitlist("other-line-of-insurance")}
            className="group mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-accent-cyan transition-colors hover:text-white"
          >
            Running another line of insurance? Talk to us
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to="/use-cases/health"
            className="group relative block overflow-clip rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/50"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-500/20 blur-3xl"
            />
            <div className="relative z-10">
              <div className="flex items-center gap-2 font-display text-[10.5px] uppercase tracking-wider2 text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Where we started
              </div>
              <div className="mt-3 font-display text-[24px] font-semibold text-white">Health insurance</div>
              <ul className="mt-4 space-y-2">
                {HEALTH_WORKFLOWS.map((w) => (
                  <li key={w} className="flex items-start gap-2.5 text-[14px] text-white/75">
                    <svg className="mt-[3px] shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    {w}
                  </li>
                ))}
              </ul>
              <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/80 group-hover:text-white">
                Gooclaim OS for health
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </SectionShell>
  );
}
