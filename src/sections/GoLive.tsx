import { motion } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import CTA from "@/components/CTA";
import { openWaitlist } from "@/lib/waitlist";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const STEPS = [
  {
    title: "Connect your claims system",
    body: "By API, a secure file drop, or a batch upload — read-only. Your knowledge library joins the same way.",
    hue: "#0d99ff",
  },
  {
    title: "Approve your messages",
    body: "Your team reviews every member message, in each language, before a single one can be sent.",
    hue: "#7dc4ff",
  },
  {
    title: "Test on your own claims",
    body: "A testing stage with sample claims on every channel and language — with the evidence — signed off by you.",
    hue: "#f59e0b",
  },
  {
    title: "Go live, watched",
    body: "Switch on one workflow at a time. The first days are monitored closely, and any workflow can be paused in a click.",
    hue: "#10b981",
  },
];

export default function GoLive({ eyebrow = "10 · Going live" }: { eyebrow?: string } = {}) {
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
      <motion.ol
        variants={stagger(0.06, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5"
      >
        {/* The line the steps sit on (desktop) */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-6 right-6 top-[38px] hidden h-px bg-gradient-to-r from-accent-blue/60 via-white/15 to-emerald-500/50 lg:block"
        />
        {STEPS.map((s, i) => (
          <motion.li
            key={s.title}
            variants={fadeUp}
            className="group relative overflow-clip rounded-2xl glass p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/15"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-80"
              style={{ background: `${s.hue}33` }}
            />
            <div className="relative z-10">
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink-950 font-display text-[13px] font-semibold"
                style={{ color: s.hue, border: `1px solid ${s.hue}66`, boxShadow: `0 0 18px ${s.hue}33` }}
              >
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-[18px] font-semibold leading-snug tracking-tight text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">{s.body}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="mt-10 flex flex-col items-center gap-3 text-center"
      >
        <CTA onClick={() => openWaitlist("go-live")}>Start with a walkthrough</CTA>
        <p className="text-[13px] text-white/45">30 minutes · real workflows on a sample claims system · no slides</p>
      </motion.div>
    </SectionShell>
  );
}
