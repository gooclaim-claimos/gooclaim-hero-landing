import { motion } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { openWaitlist } from "@/lib/waitlist";

// Every claim has these moments. Shown for health — where Gooclaim OS started —
// with the clock read from the regulator's own text (IRDAI circular, 5 Sep 2024).
const MOMENTS: { label: string; health: string; hue: string }[] = [
  { label: "Who it waits on", health: "The hospital, the TPA and the insurer", hue: "#7c3aed" },
  { label: "A status to tell", health: "Pre-auth, query, approval, settlement", hue: "#10b981" },
  { label: "Documents to collect", health: "Discharge summary, final bill, investigation reports", hue: "#0d99ff" },
  { label: "A reason to explain", health: "Each deduction, and the policy clause behind a rejection", hue: "#7dc4ff" },
  { label: "A clock to beat", health: "1 hour for pre-auth · 3 hours for discharge · 15 days to settle", hue: "#f59e0b" },
];

/** Platform page: the moments every claim shares, shown for health — where we started. */
export default function LinesOfBusiness({ eyebrow = "Every line of business" }: { eyebrow?: string } = {}) {
  return (
    <SectionShell
      id="verticals"
      eyebrow={eyebrow}
      title={
        <>
          Built around the claim.{" "}
          <span className="text-white/55">Started with health.</span>
        </>
      }
      intro="Every claim — health, motor or life — has the same moments: a status to tell, documents to collect, a reason to explain and a clock to beat. This is what they look like in health, where the clock is strictest."
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-clip rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.04] p-5 sm:p-8"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl"
        />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="font-display text-[22px] font-semibold text-white sm:text-[26px]">Health insurance</div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] px-3 py-1 font-display text-[10.5px] uppercase tracking-wider2 text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Where we started
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr] lg:gap-6">
            <motion.ul
              variants={stagger(0.05, 0.06)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="divide-y divide-white/[0.07] rounded-xl border border-white/10 bg-black/20"
            >
              {MOMENTS.map((m) => (
                <motion.li
                  key={m.label}
                  variants={fadeUp}
                  className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[180px_1fr] sm:items-baseline sm:gap-4"
                >
                  <span className="flex items-center gap-2 font-display text-[10.5px] uppercase tracking-wider2" style={{ color: m.hue }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: m.hue }} />
                    {m.label}
                  </span>
                  <span className="text-[14.5px] leading-relaxed text-white/85">{m.health}</span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="flex flex-col justify-between gap-6 rounded-xl border border-white/10 bg-black/20 p-6">
              <div>
                <div className="font-display text-[10.5px] uppercase tracking-wider2 text-white/45">Health in India, in one number</div>
                <div className="mt-4 font-display text-[40px] font-semibold leading-none tracking-tightest text-white sm:text-[48px]">
                  ₹15,100 crore
                </div>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/65">cut from approved health claims in FY24.</p>
              </div>
              <div className="inline-flex items-center gap-2 font-display text-[10px] uppercase tracking-wider2 text-white/35">
                <span className="h-px w-5 bg-white/20" /> India · IRDAI data, FY24 · Business Standard
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Same moments, other parties */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="mt-4 flex flex-col gap-4 rounded-2xl glass p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7"
      >
        <p className="max-w-2xl text-[15px] leading-relaxed text-white/70">
          <span className="font-semibold text-white">Motor and life have the same moments</span> — a surveyor or a
          nominee’s papers instead of a hospital, and a regulator clock on every claim.
        </p>
        <button
          type="button"
          onClick={() => openWaitlist("other-line-of-insurance")}
          className="group inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start rounded-full px-5 py-2.5 text-[14px] font-semibold text-white/90 glass transition-all hover:-translate-y-0.5 hover:text-white sm:self-auto"
        >
          Running another line? Talk to us
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
        </button>
      </motion.div>
    </SectionShell>
  );
}
