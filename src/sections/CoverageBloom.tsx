import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { prefersReducedMotion } from "@/lib/gsap";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

interface Capability {
  id: string;
  name: string;
}

const CAPABILITIES: Capability[] = [
  { id: "multichannel", name: "Multi-channel, day one" },
  { id: "cms", name: "Talks to any CMS" },
  { id: "agents", name: "Multi-agent reasoning" },
  { id: "compliance", name: "IRDAI + DPDP compliance pack" },
  { id: "templates", name: "Templates-only output" },
  { id: "time", name: "Time to production" },
  { id: "vertical", name: "Health / Life / Motor" },
];

interface Ring {
  id: string;
  hue: string;
  label: string;
  radiusPct: number; // % of container half-width
  start: number; // p where ring begins growing
  end: number; // p where ring is fully grown
  covers: number; // number of capabilities (by index) this ring covers
}

const RINGS: Ring[] = [
  {
    id: "diy",
    hue: "#ef4444",
    label: "DIY",
    radiusPct: 0.18,
    start: 0.0,
    end: 0.3,
    covers: 2,
  },
  {
    id: "point",
    hue: "#f59e0b",
    label: "Point Solutions",
    radiusPct: 0.3,
    start: 0.3,
    end: 0.55,
    covers: 4,
  },
  {
    id: "goo",
    hue: "#10b981",
    label: "Gooclaim OS",
    radiusPct: 0.42,
    start: 0.55,
    end: 0.95,
    covers: 7,
  },
];

const ORBIT_RADIUS_PCT = 0.4;
const LOOP_MS = 9000;

const lerpRange = (v: number, a: number, b: number) =>
  v <= a ? 0 : v >= b ? 1 : (v - a) / (b - a);
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

export default function CoverageBloom() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [p, setP] = useState(0);
  const [visible, setVisible] = useState(false);

  // Trigger animation when section enters viewport
  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Auto-loop progress
  useEffect(() => {
    if (!visible) return;
    if (prefersReducedMotion()) {
      setP(0.96); // show full coverage immediately
      return;
    }
    let raf = 0;
    let lastTs = 0;
    let cancelled = false;
    const tick = (ts: number) => {
      if (cancelled) return;
      if (!lastTs) lastTs = ts;
      const dt = ts - lastTs;
      lastTs = ts;
      setP((prev) => {
        const next = prev + dt / LOOP_MS;
        return next >= 1.25 ? 0 : next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  // Compute capability coverage state
  const capCoverage = CAPABILITIES.map((_, i) => {
    for (let r = RINGS.length - 1; r >= 0; r--) {
      const ring = RINGS[r];
      const grow = easeOutCubic(lerpRange(p, ring.start, ring.end));
      if (i < ring.covers && grow > 0.4) {
        return { ringIdx: r, on: grow };
      }
    }
    return { ringIdx: -1, on: 0 };
  });

  return (
    <SectionShell
      id="coverage"
      eyebrow="05 · Coverage"
      title={
        <>
          Coverage <span className="text-white/55">is a circle.</span>
        </>
      }
      intro="Watch what each path can actually cover. The closer the ring reaches the orbit, the more of your claims operation it owns."
    >
      <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(320px,400px)_1fr] xl:gap-14">
        {/* Left column: legend + advantage callout */}
        <div className="flex flex-col gap-5">
          <motion.div
            variants={stagger(0.08, 0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex flex-col gap-3"
          >
            {RINGS.map((r) => {
              const grow = easeOutCubic(lerpRange(p, r.start, r.end));
              const active = grow > 0.05;
              const fillPct = Math.round((r.covers / 7) * grow * 100);
              return (
                <motion.div
                  key={r.id}
                  variants={fadeUp}
                  className="relative overflow-hidden rounded-xl px-5 py-4 transition-all duration-300"
                  style={{
                    background: active
                      ? `linear-gradient(160deg, ${r.hue}1f 0%, rgba(255,255,255,0.02) 100%)`
                      : "rgba(255,255,255,0.025)",
                    border: `1px solid ${active ? `${r.hue}55` : "rgba(255,255,255,0.07)"}`,
                    boxShadow: active
                      ? `0 0 30px ${r.hue}22 inset, 0 10px 28px rgba(0,0,0,0.35)`
                      : "0 6px 18px rgba(0,0,0,0.25)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{
                          background: r.hue,
                          boxShadow: `0 0 10px ${r.hue}`,
                        }}
                      />
                      <span className="font-display text-[16px] font-semibold tracking-tight text-white sm:text-[17px]">
                        {r.label}
                      </span>
                    </div>
                    <span
                      className="font-mono text-[10.5px] uppercase tracking-wider2 transition-colors duration-300"
                      style={{
                        color: active ? r.hue : "rgba(255,255,255,0.45)",
                      }}
                    >
                      {r.covers}/7
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="relative mt-2.5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-300"
                      style={{
                        width: `${fillPct}%`,
                        background: r.hue,
                        boxShadow: `0 0 8px ${r.hue}aa`,
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Advantage callout */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative overflow-hidden rounded-2xl glass-strong p-6"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-40 blur-3xl"
              style={{ background: "rgba(16,185,129,0.35)" }}
            />
            <div className="relative z-10">
              <h3 className="font-display text-[20px] font-semibold leading-[1.2] tracking-tight text-white sm:text-[22px]">
                Everything in the circle{" "}
                <span className="text-white/55">— built in, not bolted on.</span>
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/60">
                No vendor sprawl. No integration backlog. One operating system
                that already does the whole job.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Any channel",
                  "Any CMS",
                  "Multi-agent",
                  "IRDAI + DPDP",
                  "Templates-only",
                  "Every vertical",
                ].map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-2.5 py-1 text-[12px] text-white/85"
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"
                      style={{ boxShadow: "0 0 8px #10b981" }}
                    />
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right column: animated coverage canvas */}
        <div className="relative">
          <div
            ref={stageRef}
            className="relative mx-auto aspect-square w-full max-w-[560px]"
          >
            {/* Outer bloom */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(13,153,255,0.15) 0%, rgba(124,58,237,0.06) 40%, transparent 70%)",
                filter: "blur(14px)",
              }}
            />

            <svg
              viewBox="0 0 640 640"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              <defs>
                <filter id="cov-ring-glow">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
              </defs>

              {/* Orbit baseline (dashed circle where capabilities live) */}
              <circle
                cx="320"
                cy="320"
                r={ORBIT_RADIUS_PCT * 640}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                strokeDasharray="4 7"
              />

              {/* Rings — small-to-large so largest renders last on top */}
              {RINGS.slice()
                .reverse()
                .map((r) => {
                  const grow = easeOutCubic(lerpRange(p, r.start, r.end));
                  if (grow < 0.02) return null;
                  const radius = r.radiusPct * 640 * grow;
                  return (
                    <g key={r.id}>
                      <circle
                        cx="320"
                        cy="320"
                        r={radius}
                        fill={`${r.hue}0e`}
                        stroke={`${r.hue}cc`}
                        strokeWidth="1.6"
                        filter="url(#cov-ring-glow)"
                      />
                      <circle
                        cx="320"
                        cy="320"
                        r={radius}
                        fill="none"
                        stroke={r.hue}
                        strokeWidth="1"
                        opacity="0.6"
                      />
                    </g>
                  );
                })}

              {/* Capability nodes on the orbit */}
              {CAPABILITIES.map((cap, i) => {
                const angle = (i / CAPABILITIES.length) * Math.PI * 2 - Math.PI / 2;
                const x = 320 + Math.cos(angle) * ORBIT_RADIUS_PCT * 640;
                const y = 320 + Math.sin(angle) * ORBIT_RADIUS_PCT * 640;
                const cov = capCoverage[i];
                const ring = cov.ringIdx >= 0 ? RINGS[cov.ringIdx] : null;
                const hue = ring ? ring.hue : "rgba(255,255,255,0.18)";
                return (
                  <g key={cap.id}>
                    <circle
                      cx={x}
                      cy={y}
                      r="7"
                      fill={ring ? hue : "rgba(7,10,18,0.9)"}
                      stroke={hue}
                      strokeWidth="1.6"
                    />
                    {ring && (
                      <circle
                        cx={x}
                        cy={y}
                        r="13"
                        fill="none"
                        stroke={ring.hue}
                        strokeWidth="1"
                        opacity="0.5"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Capability labels positioned outside their orbit dots */}
            {CAPABILITIES.map((cap, i) => {
              const angle = (i / CAPABILITIES.length) * Math.PI * 2 - Math.PI / 2;
              const labelRadius = ORBIT_RADIUS_PCT + 0.04;
              const left = 50 + Math.cos(angle) * labelRadius * 100;
              const top = 50 + Math.sin(angle) * labelRadius * 100;
              const cov = capCoverage[i];
              const ring = cov.ringIdx >= 0 ? RINGS[cov.ringIdx] : null;
              const rightSide = Math.cos(angle) > 0.15;
              const leftSide = Math.cos(angle) < -0.15;
              const padX = "6px";
              return (
                <div
                  key={cap.id}
                  className="pointer-events-none absolute transition-all duration-300"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    transform: rightSide
                      ? `translate(${padX}, -50%)`
                      : leftSide
                        ? `translate(calc(-100% - ${padX}), -50%)`
                        : "translate(-50%, -50%)",
                    color: ring ? "#fff" : "rgba(255,255,255,0.55)",
                    opacity: 0.55 + (ring ? 0.45 : 0),
                  }}
                >
                  <div className="flex items-center gap-1.5 whitespace-nowrap text-[10.5px] sm:text-[11px]">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                      0{i + 1}
                    </span>
                    <span className="font-medium">{cap.name}</span>
                  </div>
                </div>
              );
            })}

            {/* Progress timeline at the bottom */}
            <div className="absolute -bottom-4 left-4 right-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider2 text-white/45 sm:left-0 sm:right-0">
              <span>T = {Math.round(p * 100)}%</span>
              <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/8">
                <span
                  className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-100"
                  style={{
                    width: `${Math.min(100, p * 100)}%`,
                    background:
                      "linear-gradient(90deg, #ef4444 0%, #f59e0b 50%, #10b981 100%)",
                    boxShadow: "0 0 12px rgba(16,185,129,0.45)",
                  }}
                />
              </span>
              <span className="hidden text-white/35 sm:inline">
                Coverage · auto-loop
              </span>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
