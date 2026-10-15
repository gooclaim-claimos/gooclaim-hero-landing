import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import SectionShell from "@/components/SectionShell";

interface Job {
  who: string;
  title: string;
  body: string;
  points: string[];
  cta: string;
  to: string;
  hue: string;
  Icon: () => JSX.Element;
}

const ico = "h-[18px] w-[18px]";
function IconMember() {
  return (
    <svg viewBox="0 0 24 24" className={ico} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
    </svg>
  );
}
function IconTeam() {
  return (
    <svg viewBox="0 0 24 24" className={ico} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3.2" /><path d="M3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" /><path d="M16 4.5a3 3 0 0 1 0 6M21 20v-1a4.5 4.5 0 0 0-3-4.2" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" className={ico} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" />
    </svg>
  );
}

const JOBS: Job[] = [
  {
    who: "For your members",
    title: "Answers, not a helpline number.",
    body: "Status, pending documents and decisions on WhatsApp and email — in the member's language, with the source and date.",
    points: ["Consent and OTP first", "Approved messages only", "Secure document upload"],
    cta: "How it works",
    to: "/platform",
    hue: "#0d99ff",
    Icon: IconMember,
  },
  {
    who: "For your team",
    title: "Orion, the AI claims coworker.",
    body: "What needs a person and why, the claim read for them, and the next safe step with its evidence — a person says yes.",
    points: ["Work Pulse with IRDAI clocks", "Live Claim Brief", "Next Safe Step"],
    cta: "Meet Orion",
    to: "/orion",
    hue: "#10b981",
    Icon: IconTeam,
  },
  {
    who: "For compliance",
    title: "Every claim, on the record.",
    body: "IRDAI clocks on every claim, complaints with their own deadlines, the NL-48 report from the record, and an append-only audit trail.",
    points: ["IRDAI + DPDP by design", "Per-customer encryption", "NL-48 TAT report"],
    cta: "Security & compliance",
    to: "/security",
    hue: "#f59e0b",
    Icon: IconShield,
  },
];

/**
 * The three jobs, dealt as a deck rather than laid out side by side.
 *
 * Three equal columns give the eye nowhere to start and squeeze each job into
 * a narrow card. Here each one takes the full width and pins while the next
 * slides over it, so a reader meets them in order and each has room to show
 * what it actually does.
 */
function StackCard({ job, index, total }: { job: Job; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // Progress of THIS card from pinned to covered by the next one.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 14vh", "end 14vh"],
  });
  const last = index === total - 1;
  // The card settles back and dims as the next one arrives — never the last.
  const scale = useTransform(scrollYProgress, [0, 1], [1, last ? 1 : 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, last ? 1 : 0.4]);

  return (
    <div
      ref={ref}
      className="lg:sticky"
      // Each card rests slightly lower than the one before, so the deck shows
      // its edges rather than hiding them.
      style={{ top: `calc(14vh + ${index * 14}px)` }}
    >
      <motion.div style={{ scale, opacity }} className="origin-top will-change-transform">
        <Link
          to={job.to}
          // Nearly opaque, unlike the usual `glass`: these cards sit on top of
          // each other, and a translucent one smears the card beneath through
          // its own blur.
          style={{ background: "rgba(7,10,18,0.97)" }}
          className="group relative flex overflow-clip rounded-3xl border border-white/[0.08] p-7 shadow-[0_-10px_40px_-12px_rgba(0,0,0,0.9)] transition-colors duration-500 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50 sm:p-9"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-50 blur-3xl transition-opacity duration-700 group-hover:opacity-90"
            style={{ background: `${job.hue}33` }}
          />

          {/* the number, behind the words */}
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-7 right-5 select-none font-display text-[150px] font-bold leading-none tracking-tighter sm:text-[190px]"
            style={{ color: `${job.hue}14` }}
          >
            {index + 1}
          </span>

          <div className="relative z-10 grid w-full gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${job.hue}22`, color: job.hue, border: `1px solid ${job.hue}44` }}
                >
                  <job.Icon />
                </span>
                <span
                  className="font-display text-[11px] uppercase tracking-wider2"
                  style={{ color: job.hue }}
                >
                  {job.who}
                </span>
              </div>

              <h3 className="mt-5 text-balance font-display text-[26px] font-semibold leading-[1.12] tracking-tighter text-white sm:text-[34px]">
                {job.title}
              </h3>
              <p className="mt-3.5 max-w-[52ch] text-[15px] leading-relaxed text-white/60">
                {job.body}
              </p>

              <span className="mt-7 inline-flex items-center gap-2 text-[14.5px] font-semibold text-white">
                {job.cta}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </div>

            <ul className="space-y-2.5 lg:border-l lg:border-white/[0.08] lg:pl-9">
              {job.points.map((pt) => (
                <li key={pt} className="flex items-start gap-3 text-[14.5px] leading-snug text-white/75">
                  <svg
                    className="mt-[3px] shrink-0"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={job.hue}
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

export default function ThreeJobs({ eyebrow = "02 · What it does" }: { eyebrow?: string } = {}) {
  return (
    <SectionShell
      id="what-it-does"
      eyebrow={eyebrow}
      title={
        <>
          One OS.{" "}
          <span className="text-white/55">Three jobs done.</span>
        </>
      }
      intro="Gooclaim OS is a Claim OS: one agentic core that talks to your members, works beside your team, and keeps every claim on the record."
    >
      {/* The gap between cards is the scroll distance each one holds for. */}
      <div className="flex flex-col gap-5 lg:gap-[46vh] lg:pb-[30vh]">
        {JOBS.map((j, i) => (
          <StackCard key={j.to} job={j} index={i} total={JOBS.length} />
        ))}
      </div>
    </SectionShell>
  );
}
