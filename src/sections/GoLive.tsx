import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import CTA from "@/components/CTA";
import { openWaitlist } from "@/lib/waitlist";

/**
 * How a customer starts — and the answer to the objection behind the question.
 *
 * The fear this section exists to settle is "this will be an eighteen-month
 * project, and something will reach my members before I have seen it". So the
 * path draws itself across in one go — short, and over — and every step names
 * the thing the customer's own team holds.
 *
 * Deliberately NOT scroll-scrubbed: this sits beside the call to action, and a
 * section that makes a reader work to finish it is a section they leave.
 */

const STEPS = [
  {
    title: "Connect your claims system",
    body: "By API, a secure file drop, or a batch upload. Your knowledge library joins the same way.",
    /** What stays with the customer at this step — not a promise, a constraint. */
    yours: "Read-only. Nothing is ever written back.",
    hue: "#0d99ff",
  },
  {
    title: "Approve your messages",
    body: "Every member message, in each language, in your own words.",
    yours: "Not one can be sent until your team approves it.",
    hue: "#7dc4ff",
  },
  {
    title: "Test on your own claims",
    body: "A testing stage with sample claims, on every channel and language, with the evidence.",
    yours: "You sign it off before anything goes live.",
    hue: "#f59e0b",
  },
  {
    title: "Go live, watched",
    body: "One workflow at a time. The first days are monitored closely.",
    yours: "Any workflow pauses in a click.",
    hue: "#10b981",
  },
];

function Step({
  step,
  index,
  run,
}: {
  step: (typeof STEPS)[number];
  index: number;
  run: boolean;
}) {
  const delay = 0.15 + index * 0.22;

  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      animate={run ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-4 lg:block"
    >
      {/* the marker — ticks once the path reaches it */}
      <div className="relative z-10 shrink-0">
        <motion.span
          initial={{ scale: 0.4 }}
          animate={run ? { scale: 1 } : {}}
          transition={{ duration: 0.45, delay: delay + 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink-950"
          style={{ border: `1px solid ${step.hue}66`, boxShadow: `0 0 20px ${step.hue}2e` }}
        >
          <motion.svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke={step.hue}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <motion.polyline
              points="20 6 9 17 4 12"
              initial={{ pathLength: 0 }}
              animate={run ? { pathLength: 1 } : {}}
              transition={{ duration: 0.4, delay: delay + 0.25, ease: "easeOut" }}
            />
          </motion.svg>
        </motion.span>
      </div>

      <div className="pb-8 lg:pb-0 lg:pt-6">
        <div
          className="font-display text-[10px] uppercase tracking-wider2"
          style={{ color: `${step.hue}cc` }}
        >
          Step {index + 1}
        </div>
        <h3 className="mt-1.5 font-display text-[18px] font-semibold leading-snug tracking-tight text-white">
          {step.title}
        </h3>
        <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">{step.body}</p>

        {/* the control the customer keeps — the reassurance, not the feature */}
        <div className="mt-3.5 border-l pl-3" style={{ borderColor: `${step.hue}55` }}>
          <div className="font-display text-[9.5px] uppercase tracking-wider2 text-white/35">
            Yours
          </div>
          <p className="mt-0.5 text-[13px] leading-snug text-white/80">{step.yours}</p>
        </div>
      </div>
    </motion.li>
  );
}

export default function GoLive({ eyebrow = "10 · Going live" }: { eyebrow?: string } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const run = useInView(ref, { once: true, amount: 0.25 });

  return (
    <SectionShell
      id="go-live"
      eyebrow={eyebrow}
      title={
        <>
          From first call to first member reply.{" "}
          <span className="text-white/55">Four steps.</span>
        </>
      }
      intro="No rip-and-replace. Gooclaim OS sits on top of the systems you already run, and nothing reaches a member until your team has approved it."
    >
      <div ref={ref} className="relative">
        {/* The path, drawing itself across once — the point is that it is short. */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-[18px] top-4 bottom-4 w-px overflow-hidden bg-white/[0.07] lg:left-0 lg:right-0 lg:top-[18px] lg:bottom-auto lg:h-px lg:w-auto"
        >
          <motion.span
            className="block h-full w-full origin-top bg-gradient-to-b from-accent-blue via-white/40 to-emerald-500 lg:origin-left lg:bg-gradient-to-r"
            initial={{ scaleY: 0, scaleX: 1 }}
            animate={run ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top" }}
          />
        </span>

        <ol className="relative grid grid-cols-1 gap-0 lg:grid-cols-4 lg:gap-7">
          {STEPS.map((s, i) => (
            <Step key={s.title} step={s} index={i} run={run} />
          ))}
        </ol>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={run ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 flex flex-col items-center gap-3 text-center"
      >
        <CTA onClick={() => openWaitlist("go-live")}>Start with a walkthrough</CTA>
        <p className="text-[13px] text-white/45">
          30 minutes · real workflows on a sample claims system · no slides
        </p>
      </motion.div>
    </SectionShell>
  );
}
