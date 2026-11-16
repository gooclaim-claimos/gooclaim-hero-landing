import { motion } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

/**
 * How the AI works — an OVERVIEW for buyers, never the internals (founder,
 * November 2026: "internal cheeze nahi batana, bus overview"). No layer names,
 * no model or tool names, no tiers.
 *
 * Each line is true in the code today:
 * - answers come from the customer's claims system with the record and date
 *   (messages carry "as per your insurer's records, updated …"; voice cites
 *   the claim it read — gooclaim-voice turn/prompt.py);
 * - written replies are checked against the claim before sending; on a call
 *   the agent speaks only from the caller's own claim (voice does not go
 *   through the written-reply check, so the copy does not say it does);
 * - the engine is read-only towards claims data (engine docs/00-overview.md),
 *   and the voice agent may never say a claim will be approved or rejected;
 * - an unanswerable case goes to a person with the reason (engine
 *   escalation_agent; voice "ticket" / "handover").
 */

const POINTS = [
  {
    title: "From your records, with the date",
    body: "Every answer comes from your own claims system, and says whose record it read and when.",
    hue: "#0d99ff",
    icon: <path d="M4 4h12l4 4v12H4zM8 12h8M8 16h5M16 4v4h4" />,
  },
  {
    title: "Checked before it is sent",
    body: "A written reply goes out only after it is checked against the claim. On a call, the agent speaks only from the caller’s own claim.",
    hue: "#10b981",
    icon: <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5" />,
  },
  {
    title: "Never decides a claim",
    body: "Approvals, rejections and amounts stay with your team and your claims system. Gooclaim OS reads them — it never changes them.",
    hue: "#f59e0b",
    icon: <path d="M12 3v18M5 7h14M7 7l-3 7h6zM17 7l-3 7h6M8 21h8" />,
  },
  {
    title: "A person when it matters",
    body: "When the AI cannot answer, it says so and hands the case to your team with the reason. It never guesses.",
    hue: "#a78bfa",
    icon: <path d="M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 11l2 2 4-4" />,
  },
];

export default function HowTheAiWorks({ eyebrow = "How the AI works" }: { eyebrow?: string } = {}) {
  return (
    <SectionShell
      id="how-the-ai-works"
      eyebrow={eyebrow}
      title={
        <>
          AI you can check.{" "}
          <span className="text-white/55">And it never decides a claim.</span>
        </>
      }
      intro="An AI that speaks to your members has to be trustworthy before it is clever. Every answer Gooclaim OS gives can be traced to your records, and anything it cannot answer goes to a person."
    >
      <motion.ul
        variants={stagger(0.06, 0.07)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {POINTS.map((p) => (
          <motion.li key={p.title} variants={fadeUp} className="relative flex gap-4 overflow-clip rounded-2xl p-5 glass sm:p-6">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-50 blur-3xl"
              style={{ background: `${p.hue}33` }}
            />
            <span
              aria-hidden
              className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1"
              style={{ background: `${p.hue}1a`, ["--tw-ring-color" as string]: `${p.hue}40` }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={p.hue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {p.icon}
              </svg>
            </span>
            <span className="relative z-10 block">
              <span className="block font-display text-[17px] font-semibold tracking-tight text-white">{p.title}</span>
              <span className="mt-1 block text-[14px] leading-relaxed text-white/65">{p.body}</span>
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </SectionShell>
  );
}
