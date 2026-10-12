import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionShell from "@/components/SectionShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

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
      <motion.div
        variants={stagger(0.06, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5"
      >
        {JOBS.map((j) => (
          <motion.div key={j.to} variants={fadeUp} className="h-full">
            <Link
              to={j.to}
              className="group relative flex h-full flex-col overflow-clip rounded-2xl glass p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-50 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: `${j.hue}33` }}
              />
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: `${j.hue}22`, color: j.hue, border: `1px solid ${j.hue}44` }}
                  >
                    <j.Icon />
                  </span>
                  <span className="font-display text-[11px] uppercase tracking-wider2" style={{ color: j.hue }}>
                    {j.who}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[22px] font-semibold leading-tight tracking-tight text-white sm:text-[24px]">
                  {j.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/60">{j.body}</p>
                <ul className="mt-5 space-y-2">
                  {j.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 text-[13.5px] text-white/70">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={j.hue} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {pt}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-2 pt-7 text-[14px] font-semibold text-white">
                  {j.cta}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  );
}
