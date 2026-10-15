import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * A claim that keeps counting while you read the headline.
 *
 * The page does not need a sentence saying claims stall — this one does it,
 * in front of the reader, for as long as they stay. The status never changes,
 * which is the whole point: the record is correct and nothing is moving.
 *
 * Deliberately a sample claim, never real data.
 */

/** Real time is far too slow to make a point, so a day passes every 1.6s. */
const DAY_MS = 1600;
const LIMIT = 15;      // IRDAI: settle within 15 days of submission
const STOP_AT = 23;    // past the limit, and still open — the law forbids closing it

export default function LiveClaimTicker() {
  const [day, setDay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Only start once it is actually on screen, so the number a visitor first
  // sees is 0 — not whatever it climbed to while they were elsewhere.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setStarted(true),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (prefersReducedMotion()) {
      setDay(STOP_AT); // show the end state rather than animate to it
      return;
    }
    const id = window.setInterval(() => {
      setDay((d) => (d >= STOP_AT ? d : d + 1));
    }, DAY_MS);
    return () => window.clearInterval(id);
  }, [started]);

  const late = day > LIMIT;

  return (
    <div ref={ref} className="mx-auto w-full max-w-[460px]">
      <div
        className="rounded-2xl border bg-ink-950/70 p-5 backdrop-blur-md transition-colors duration-700 sm:p-6"
        style={{
          borderColor: late ? "rgba(242,109,109,0.35)" : "rgba(255,255,255,0.10)",
          boxShadow: late ? "0 0 60px rgba(242,109,109,0.10)" : "none",
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="font-display text-[9.5px] uppercase tracking-wider2 text-white/35">
              Sample claim
            </div>
            <div className="mt-1 font-mono text-[17px] text-white/85">CLM-04821</div>
          </div>

          <div className="text-right">
            <div className="font-display text-[9.5px] uppercase tracking-wider2 text-white/35">
              Day
            </div>
            <motion.div
              key={day}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-[34px] font-bold leading-none tracking-tight"
              style={{ color: late ? "#F26D6D" : "#FFFFFF" }}
            >
              {day}
            </motion.div>
          </div>
        </div>

        <div className="mt-4 h-px w-full bg-white/[0.08]" />

        {/* The status the claims system shows. It never changes. */}
        <div className="mt-4 flex items-center gap-2.5">
          <span
            aria-hidden
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400"
            style={{ boxShadow: "0 0 10px #fbbf24" }}
          />
          <span className="text-[14px] font-semibold text-amber-300">
            On hold — documents awaited
          </span>
        </div>
        <div className="mt-1 pl-4 text-[12.5px] text-white/40">Discharge summary</div>

        {/* the limit, crossed in front of the reader */}
        <div className="mt-5">
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.07]">
            <motion.div
              className="h-full rounded-full"
              animate={{
                width: `${Math.min(100, (day / STOP_AT) * 100)}%`,
                backgroundColor: late ? "#F26D6D" : "#0d99ff",
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <div className="mt-2.5 flex items-center justify-between font-display text-[10px] uppercase tracking-wider2">
            <span className="text-white/30">Nobody asked for it</span>
            <motion.span
              animate={{ opacity: late ? 1 : 0.35, color: late ? "#F26D6D" : "#ffffff59" }}
              transition={{ duration: 0.4 }}
            >
              {late ? `${LIMIT}-day limit passed` : `${LIMIT}-day limit`}
            </motion.span>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-[11.5px] leading-relaxed text-white/35">
        Every field is correct. Nothing in it can ask anyone for the document.
      </p>
    </div>
  );
}
