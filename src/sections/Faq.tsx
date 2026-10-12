import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionShell from "@/components/SectionShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Do we have to replace our claims system?",
    a: "No. Gooclaim OS reads from the claims system you already run — by API, a secure file drop or a batch upload — and never writes back to it. Your system stays the source of truth.",
  },
  {
    q: "Does the AI write messages to our members?",
    a: "No. Members only ever receive messages your team has approved. The AI decides which approved message fits, and every value in it is checked against your record before it is sent.",
  },
  {
    q: "What happens when the AI isn't sure?",
    a: "It hands the case to a person on your team, with the reason and what it already checked. It never guesses an answer to a member.",
  },
  {
    q: "Is it only for health insurance?",
    a: "No. Health is live today because its rules are the strictest and its clock the shortest. Motor and life are next, on the same OS — a new line of insurance is new workflows, not a rebuild.",
  },
  {
    q: "Which channels and languages work today?",
    a: "WhatsApp and email today, in English, Hindi and Hinglish. A member writes in their own words; the reply comes back in their language.",
  },
  {
    q: "Who can see our members' data?",
    a: "Only your team, by role, after signing in with multi-factor authentication. Each customer's data is kept apart and encrypted with its own key, and personal numbers are masked before anything is stored.",
  },
  {
    q: "How does Orion help our staff?",
    a: "Orion shows what needs a person and why, reads the claim for them, and suggests the next safe step with its evidence. A person always says yes — Orion never decides a claim.",
  },
  {
    q: "How do IRDAI timelines and reports work?",
    a: "Every claim carries its IRDAI clock — 1 hour for pre-auth, 3 hours for discharge, 15 days to settle a reimbursement — and complaints carry theirs. The quarterly NL-48 turnaround report is built from the same record.",
  },
  {
    q: "How do we get started?",
    a: "Join the waitlist and we'll set up a 30-minute walkthrough on a sample claims system. From there, a pilot runs one workflow on one channel, on your own claims.",
  },
];

/** schema.org FAQPage — the same questions, for search engines. */
export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq({
  eyebrow = "Questions",
  limit,
  moreHref,
}: {
  eyebrow?: string;
  /** Show only the first N questions (the home page shows the four buyers ask first). */
  limit?: number;
  /** Where the rest of the questions live. */
  moreHref?: string;
} = {}) {
  const [open, setOpen] = useState<number | null>(0);
  const items = limit ? FAQS.slice(0, limit) : FAQS;
  return (
    <SectionShell
      id="faq"
      eyebrow={eyebrow}
      title={
        <>
          The questions TPAs ask.{" "}
          <span className="text-white/55">Answered plainly.</span>
        </>
      }
    >
      <motion.div
        variants={stagger(0.04, 0.05)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto max-w-3xl divide-y divide-white/10 overflow-clip rounded-2xl glass"
      >
        {items.map((f, i) => {
          const isOpen = open === i;
          const panelId = `faq-panel-${i}`;
          return (
            <motion.div key={f.q} variants={fadeUp}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex min-h-[64px] w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-white/[0.02] focus-visible:bg-white/[0.03] focus-visible:outline-none"
                >
                  <span className={`font-display text-[16px] font-semibold tracking-tight sm:text-[17px] ${isOpen ? "text-white" : "text-white/80 group-hover:text-white"}`}>
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen ? "rotate-45 border-accent-cyan/50 text-accent-cyan" : "border-white/15 text-white/55"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-clip"
                  >
                    <p className="max-w-2xl px-6 pb-6 text-[14.5px] leading-relaxed text-white/60">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
      {moreHref && (
        <div className="mt-8 text-center">
          <Link
            to={moreHref}
            className="inline-flex min-h-[44px] items-center gap-2 text-[14px] font-medium text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/50"
          >
            More questions
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      )}
    </SectionShell>
  );
}
