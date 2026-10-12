import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import SectorStatusBadge from "@/components/SectorStatusBadge";
import { sectorByKey } from "@/data/sectors";

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
const VERTICALS: Vertical[] = [
  {
    key: "health",
    label: "Health",
    hue: "#ef4444",
    Icon: Cross,
    big: "₹26,037 Cr",
    line: "of health claims were cut or rejected in FY24 — money patients paid out-of-pocket.",
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
];

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

/** Platform page: the same gap, line by line of business. Home tells the problem as one claim (ProblemJourney). */
export default function ProblemBento({ eyebrow = "Every line of business" }: { eyebrow?: string } = {}) {
  return (
    <SectionShell
      id="verticals"
      eyebrow={eyebrow}
      title={
        <>
          One broken layer.{" "}
          <span className="text-white/55">Every line of business.</span>
        </>
      }
      intro="Health is where it is measured first — but claims stop between the steps in life and motor cover too."
    >
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
                    <span className="font-display text-[11px] uppercase tracking-wider2 text-white/55">
                      {v.label}
                    </span>
                    {sectorByKey(v.key) && (
                      <SectorStatusBadge status={sectorByKey(v.key)!.status} className="ml-auto" />
                    )}
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
                <div className="inline-flex items-center gap-2 font-display text-[10px] uppercase tracking-wider2 text-white/35">
                  <span className="h-px w-5 bg-white/20" /> {v.source}
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      {/* Cross-vertical reinforcement */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="mt-10 flex flex-col items-center gap-3 text-center"
      >
        <div className="flex items-center gap-3 font-display text-[10.5px] uppercase tracking-wider2 text-white/45">
          <span className="h-px w-10 bg-white/20" /> Same root cause in every line{" "}
          <span className="h-px w-10 bg-white/20" />
        </div>
        <p className="max-w-2xl text-balance text-[14.5px] leading-relaxed text-white/55 sm:text-[15.5px]">
          Systems that decide a claim well — and nothing that moves it between
          the steps.
        </p>
      </motion.div>
    </SectionShell>
  );
}
