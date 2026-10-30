import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { prefersReducedMotion } from "@/lib/gsap";
import LiveClaimTicker from "@/components/LiveClaimTicker";

/**
 * Four numbers, each with the document it came from.
 *
 * The source line is the point. Every competitor's landing page carries
 * figures like "90% faster" that are the vendor's own claim; these are the
 * regulator's, the government auditor's, and a published penalty order — so
 * naming where each one comes from is the differentiator, not a footnote.
 */

type Stat = {
  /** Counted up to this. */
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  source: string;
  hue: string;
};

const STATS: Stat[] = [
  {
    value: 3.26,
    decimals: 2,
    suffix: " cr",
    label: "health claims settled in a year",
    source: "IRDAI Annual Report 2024-25",
    hue: "#0d99ff",
  },
  {
    value: 39.57,
    decimals: 2,
    suffix: " lakh",
    label: "PM-JAY claims over the 12-hour pre-auth limit",
    source: "CAG Report No. 11 of 2023 · audit of PM-JAY",
    hue: "#F26D6D",
  },
  {
    value: 15,
    suffix: " days",
    label: "to settle, from submission",
    source: "IRDAI circular, 5 September 2024",
    hue: "#f59e0b",
  },
  {
    value: 1,
    prefix: "₹",
    suffix: " crore",
    label: "penalty, for exactly these failures",
    source: "IRDAI order, 15 December 2025",
    hue: "#10b981",
  },
];

function useCountUp(to: number, run: boolean, decimals = 0) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (prefersReducedMotion()) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const DURATION = 1100;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // ease-out cubic: fast first, settles on the number
      setN(to * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run, decimals]);

  return decimals > 0 ? n.toFixed(decimals) : String(Math.round(n));
}

function StatCard({ stat, index, run }: { stat: Stat; index: number; run: boolean }) {
  const shown = useCountUp(stat.value, run, stat.decimals);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={run ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7"
    >
      <span
        aria-hidden
        className="absolute left-6 top-0 h-px w-10 sm:left-7"
        style={{ background: stat.hue }}
      />

      <div>
        <div
          className="font-mono text-[38px] font-bold leading-none tracking-tight sm:text-[46px]"
          style={{ color: stat.hue }}
        >
          {stat.prefix}
          {shown}
          <span className="text-[0.52em] font-semibold">{stat.suffix}</span>
        </div>
        <p className="mt-3 text-[14px] leading-snug text-white/75">{stat.label}</p>
      </div>

      {/* the half that matters */}
      <div className="mt-6 border-t border-white/[0.07] pt-3">
        <div className="font-display text-[9.5px] uppercase tracking-wider2 text-white/30">
          Source
        </div>
        <div className="mt-1 text-[11.5px] leading-snug text-white/45">{stat.source}</div>
      </div>
    </motion.div>
  );
}

export default function ProofBand() {
  const ref = useRef<HTMLDivElement>(null);
  const run = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      aria-label="The published numbers behind this"
      className="relative border-y border-white/[0.06] bg-ink-950 py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* The thesis, happening rather than stated: this claim keeps counting
            while the visitor reads it, and its status never changes. */}
        <div className="mb-16 grid items-center gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <h2 className="text-balance font-display text-[26px] font-semibold leading-[1.12] tracking-tighter text-white sm:text-[36px]">
              A claim is decided by a system.{" "}
              <span className="text-white/50">It is moved by people.</span>
            </h2>
            <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-white/55">
              Watch this one. The record stays correct the whole time — and
              nothing in it can ask anyone for the document it is waiting on.
            </p>
          </div>
          <LiveClaimTicker />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-balance font-display text-[22px] font-semibold leading-tight tracking-tighter text-white sm:text-[27px]">
            Not our numbers.{" "}
            <span className="text-white/50">The regulator’s, and the auditor’s.</span>
          </h2>
          <span className="font-display text-[10px] uppercase tracking-wider2 text-white/30">
            India · health insurance
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
}
