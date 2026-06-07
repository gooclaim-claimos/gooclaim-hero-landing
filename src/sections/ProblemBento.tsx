import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

interface Vertical {
  key: string;
  label: string;
  hue: string;
  Icon: () => JSX.Element;
  big: string; // headline number (string, supports symbols)
  bigPrefix?: string;
  bigSuffix?: string;
  bigNumeric?: number; // numeric for count-up; if absent, just render string
  bigDecimals?: number;
  line: string;
  source: string;
}

const HERO = {
  value: 257790,
  label: "grievances on Bima Bharosa in FY25.",
  sub: "Health insurance alone is 75–80% of them — but the same broken layer repeats across every line of business.",
  source: "IRDAI Annual Report 2024-25 · Bima Bharosa portal",
  hue: "#0d99ff",
};

function Cross() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="3" width="6" height="18" rx="1" />
      <rect x="3" y="9" width="18" height="6" rx="1" />
    </svg>
  );
}
function Family() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="3" />
      <circle cx="17" cy="9" r="2.2" />
      <path d="M3 21v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" />
      <path d="M15 21v-.5a3 3 0 0 1 3-3h.5a3 3 0 0 1 3 3V21" />
    </svg>
  );
}
function Car() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12l2-5a2 2 0 0 1 2-1.4h10a2 2 0 0 1 2 1.4l2 5" />
      <path d="M3 12h18v5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5z" />
      <circle cx="7" cy="16" r="0.8" fill="currentColor" />
      <circle cx="17" cy="16" r="0.8" fill="currentColor" />
    </svg>
  );
}
function Crop() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V8" />
      <path d="M12 12c-3 0-5-2-5-5 3 0 5 2 5 5z" />
      <path d="M12 12c3 0 5-2 5-5-3 0-5 2-5 5z" />
      <path d="M12 16c-3 0-5-2-5-5 3 0 5 2 5 5z" />
      <path d="M12 16c3 0 5-2 5-5-3 0-5 2-5 5z" />
    </svg>
  );
}
function Plane() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 13l8 2 5 6 2-1-3-7 8-3 1-2-3-1-7 3-7-3-2 1 3 5z" />
    </svg>
  );
}
function Building() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="7" height="13" rx="1" />
      <rect x="13" y="3" width="8" height="18" rx="1" />
      <path d="M6 12h1M6 15h1M6 18h1M16 6h2M16 9h2M16 12h2M16 15h2M16 18h2" />
    </svg>
  );
}
const VERTICALS: Vertical[] = [
  {
    key: "health",
    label: "Health",
    hue: "#ef4444",
    Icon: Cross,
    big: "₹26,037 Cr",
    line: "of health claims were rejected in FY24 — money patients paid out-of-pocket.",
    source: "Moneylife · IRDAI govt data",
  },
  {
    key: "life",
    label: "Life",
    hue: "#f59e0b",
    Icon: Family,
    big: "22.14%",
    bigNumeric: 22.14,
    bigDecimals: 2,
    bigSuffix: "%",
    line: "of all life insurance complaints are mis-selling — agent promise vs. policy fine print.",
    source: "Outlook Business · FY25",
  },
  {
    key: "motor",
    label: "Motor",
    hue: "#0d99ff",
    Icon: Car,
    big: "24.8%",
    bigNumeric: 24.8,
    bigDecimals: 1,
    bigSuffix: "%",
    line: "of all general-insurance complaints are motor — surveyor lag + garage disputes.",
    source: "Business Standard · IRDAI FY25",
  },
  {
    key: "crop",
    label: "Crop (PMFBY)",
    hue: "#10b981",
    Icon: Crop,
    big: "ZERO",
    line: "Kharif 2024 claims settled by Feb 2025 — 4.19 Cr farmers waiting in silence.",
    source: "Ground Report · PIB",
  },
  {
    key: "travel",
    label: "Travel",
    hue: "#7c3aed",
    Icon: Plane,
    big: "#1 reason",
    line: "non-disclosure tops travel-claim rejections — IST hours + foreign hospitals + no agent reachable.",
    source: "Upstox · eIndia Insurance",
  },
  {
    key: "sme",
    label: "SME / MSME",
    hue: "#7dc4ff",
    Icon: Building,
    big: "3%",
    bigNumeric: 3,
    bigSuffix: "%",
    line: "of 60M+ Indian MSMEs are insured — denial horror stories blocked the other 97%.",
    source: "IRDAI · Tata AIA",
  },
];

const TPA = {
  big: "6–8 months",
  line: "hospital dues delayed by TPAs — yet IRDAI's new mandate is 1 hr admission · 3 hr discharge. Without automation, the penalty is bank rate + 2% daily.",
  source: "Moneylife (TPA admission) · IRDAI Master Circular 29 May 2024 · PPHI Circular Sept 2024",
  hue: "#f59e0b",
};

function CountUp({
  target,
  decimals = 0,
  prefix,
  suffix,
}: {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(eased * target);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  const formatted =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString("en-IN");

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default function ProblemBento() {
  return (
    <SectionShell
      id="problem"
      eyebrow="02 · Problem"
      title={
        <>
          It&rsquo;s not a health problem.{" "}
          <span className="text-white/55">It&rsquo;s a communication problem.</span>
        </>
      }
      intro="Indian insurance has world-class actuaries and pricing — but stone-age communication and coordination. The same broken layer surfaces across seven verticals."
    >
      {/* Hero stat */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl glass p-7 sm:p-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
          style={{ background: `${HERO.hue}40` }}
        />
        <div className="relative z-10 grid items-end gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div>
            <div
              className="font-mono text-[10.5px] uppercase tracking-wider2"
              style={{ color: HERO.hue }}
            >
              Hero stat · all-vertical
            </div>
            <div className="mt-4 font-display text-[64px] font-semibold leading-[0.95] tracking-tightest text-white sm:text-[96px] lg:text-[136px]">
              <CountUp target={HERO.value} />
            </div>
            <div className="mt-3 max-w-md text-[15.5px] leading-relaxed text-white/70">
              {HERO.label}
            </div>
          </div>
          <div className="lg:pb-3">
            <p className="text-balance text-[15px] leading-relaxed text-white/65 sm:text-[16px]">
              {HERO.sub}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-wider2 text-white/40">
              <span className="h-px w-7 bg-white/25" /> {HERO.source}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 6 vertical cards */}
      <motion.div
        variants={stagger(0.06, 0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
      >
        {VERTICALS.map((v) => {
          const Icon = v.Icon;
          return (
            <motion.article
              key={v.key}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/15"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-50 blur-3xl transition-opacity duration-700 group-hover:opacity-90"
                style={{ background: `${v.hue}33` }}
              />
              <div className="relative z-10 flex h-full flex-col justify-between gap-5">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md"
                      style={{
                        background: `${v.hue}22`,
                        color: v.hue,
                        border: `1px solid ${v.hue}44`,
                      }}
                    >
                      <Icon />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider2 text-white/55">
                      {v.label}
                    </span>
                  </div>
                  <div
                    className="mt-5 font-display text-[36px] font-semibold leading-[1] tracking-tightest text-white sm:text-[44px]"
                    style={{ color: v.hue }}
                  >
                    {v.bigNumeric !== undefined ? (
                      <CountUp
                        target={v.bigNumeric}
                        decimals={v.bigDecimals ?? 0}
                        prefix={v.bigPrefix}
                        suffix={v.bigSuffix}
                      />
                    ) : (
                      v.big
                    )}
                  </div>
                  <p className="mt-4 text-[13.5px] leading-relaxed text-white/65 sm:text-[14px]">
                    {v.line}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider2 text-white/35">
                  <span className="h-px w-5 bg-white/20" /> {v.source}
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      {/* TPA callout — the wedge */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-5 overflow-hidden rounded-2xl border border-amber-500/20 p-7 sm:p-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(124,58,237,0.04) 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-60 blur-3xl"
          style={{ background: `${TPA.hue}33` }}
        />
        <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-10">
          <div>
            <div
              className="font-mono text-[10.5px] uppercase tracking-wider2"
              style={{ color: TPA.hue }}
            >
              The hidden bottleneck · TPA
            </div>
            <div
              className="mt-4 font-display text-[44px] font-semibold leading-[0.95] tracking-tightest sm:text-[64px]"
              style={{ color: TPA.hue }}
            >
              {TPA.big}
            </div>
          </div>
          <div>
            <p className="text-balance text-[15px] leading-relaxed text-white/70 sm:text-[16.5px]">
              {TPA.line}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-wider2 text-white/40">
              <span className="h-px w-7 bg-white/25" /> {TPA.source}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cross-vertical reinforcement */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="mt-10 flex flex-col items-center gap-3 text-center"
      >
        <div className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-wider2 text-white/45">
          <span className="h-px w-10 bg-white/20" /> Same root cause across all 7 verticals{" "}
          <span className="h-px w-10 bg-white/20" />
        </div>
        <p className="max-w-2xl text-balance text-[14.5px] leading-relaxed text-white/55 sm:text-[15.5px]">
          World-class actuarial, policy, and pricing systems — sitting on top of
          stone-age communication and coordination infrastructure.
        </p>
      </motion.div>
    </SectionShell>
  );
}
