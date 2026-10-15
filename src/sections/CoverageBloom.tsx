import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import SectionShell from "@/components/SectionShell";

/**
 * Why one operating system beats five tools — told with the buyer's own stack.
 *
 * 🔴 What this replaces: a growing ring on a dashed orbit, a "T = 32% ·
 * auto-loop" counter that measured the animation and nothing else, and a
 * scorecard giving DIY 2/7, point solutions 4/7 and Gooclaim OS 7/7. Those
 * denominators were invented. A vendor marking its own competitors out of
 * seven is the first thing a buyer discounts, and the chips underneath
 * repeated section 02's proof strip word for word.
 *
 * So this section rates nobody. It describes what a TPA already runs — five
 * systems, each holding a piece of one member's answer — and then shows the
 * same five facts as one record. The claim is CLM-2487, the claim this site
 * follows throughout.
 */

interface Piece {
  key: string;
  /** The system a TPA already runs. */
  system: string;
  /** The fragment of the answer it holds. */
  holds: string;
  /** Why that fragment never reaches the member. */
  gap: string;
  hue: string;
  /**
   * Where it starts, measured from the middle of the stage — the point the
   * five converge on. Viewport units so the spread tracks the screen and the
   * cards stay clear of the record forming between them.
   */
  x: string;
  y: string;
}

const PIECES: Piece[] = [
  {
    key: "whatsapp",
    system: "WhatsApp tool",
    holds: "“Thanks, we will get back to you.”",
    gap: "Never read the claim",
    hue: "#7c3aed",
    x: "-32vw",
    y: "-18vh",
  },
  {
    key: "cms",
    system: "Your claims system",
    holds: "Query raised on day 6",
    gap: "Nobody asked it",
    hue: "#0d99ff",
    x: "32vw",
    y: "-21vh",
  },
  {
    key: "email",
    system: "Email",
    holds: "Query letter sent on day 6",
    gap: "A separate thread, a separate history",
    hue: "#7dc4ff",
    x: "-30vw",
    y: "15vh",
  },
  {
    key: "sheet",
    system: "A spreadsheet",
    holds: "Chased? Someone thinks so",
    gap: "Kept by hand, true until it is not",
    hue: "#f59e0b",
    x: "31vw",
    y: "18vh",
  },
  {
    key: "clock",
    system: "The IRDAI clock",
    holds: "15 days from submission",
    gap: "Lives in no system at all",
    hue: "#F26D6D",
    x: "0vw",
    y: "26vh",
  },
];

/** The same five facts, once they are rows on one claim. */
const RECORD: { day: string; what: string; from: string }[] = [
  { day: "Day 6", what: "Query raised", from: "read from your claims system" },
  { day: "Day 6", what: "Query letter sent", from: "on the claim, not in an inbox" },
  { day: "Day 9", what: "Member told, in their language", from: "WhatsApp · approved wording" },
  { day: "Day 11", what: "Document received", from: "upload link · checked on arrival" },
  { day: "Now", what: "4 days left of 15", from: "IRDAI clock, from submission" },
];

/** Below `lg`, or with reduced motion, nothing is pinned and nothing is paced. */
function useStatic() {
  const [flat, setFlat] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const apply = () => setFlat(!mq.matches || reduce);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return flat;
}

/** One system a TPA already runs, drifting in toward the record. */
function ScatterCard({
  piece,
  progress,
  flat,
}: {
  piece: Piece;
  progress: MotionValue<number>;
  flat: boolean;
}) {
  // Scattered at the start, pulled to the middle and faded as the record forms.
  // The fade starts well before the convergence ends: five cards arriving at
  // the same point at full opacity is a pile of overlapping text, not a
  // merge. They dissolve INTO the record rather than landing on top of it.
  const x = useTransform(progress, [0.06, 0.56], [piece.x, "0vw"]);
  const y = useTransform(progress, [0.06, 0.56], [piece.y, "0vh"]);
  const opacity = useTransform(progress, [0, 0.2, 0.5], [1, 1, 0]);
  const scale = useTransform(progress, [0.06, 0.56], [1, 0.72]);

  const body = (
    <div
      className="w-full rounded-2xl border bg-ink-950/90 p-4 backdrop-blur-sm"
      style={{ borderColor: `${piece.hue}3d` }}
    >
      <div
        className="font-display text-[10px] uppercase tracking-wider2"
        style={{ color: piece.hue }}
      >
        {piece.system}
      </div>
      <p className="mt-2 text-[13.5px] leading-snug text-white/85">{piece.holds}</p>
      <div className="mt-3 flex items-start gap-1.5 text-[11.5px] leading-snug text-white/40">
        <svg
          className="mt-[3px] shrink-0"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2.6"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
        {piece.gap}
      </div>
    </div>
  );

  if (flat) return body;

  // Every card is anchored on the stage's centre — the place they converge on
  // — and held apart only by its own transform, so "come together" is a single
  // transform running to zero rather than five layout positions being redone.
  return (
    <motion.div
      style={{ x, y, opacity, scale }}
      className="absolute left-1/2 top-1/2 -ml-[min(115px,9vw)] w-[clamp(165px,18vw,230px)] -translate-y-1/2 will-change-transform"
    >
      {body}
    </motion.div>
  );
}

/** The five facts as one claim. */
function OneRecord({ progress, flat }: { progress: MotionValue<number>; flat: boolean }) {
  const opacity = useTransform(progress, [0.42, 0.68], [0, 1]);
  const y = useTransform(progress, [0.42, 0.68], [26, 0]);

  const body = (
    <div className="w-full max-w-[380px] rounded-3xl border border-emerald-500/25 bg-ink-950/95 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] sm:p-7">
      <div className="flex items-baseline justify-between">
        <span className="font-display text-[10.5px] uppercase tracking-wider2 text-emerald-400">
          One record
        </span>
        <span className="font-mono text-[11px] text-white/35">CLM-2487</span>
      </div>

      <ol className="mt-5 space-y-3.5">
        {RECORD.map((r) => (
          <li key={r.what} className="flex items-start gap-3">
            <span className="mt-[2px] w-[52px] shrink-0 font-mono text-[11px] text-white/40">
              {r.day}
            </span>
            <span>
              <span className="block text-[13.5px] leading-snug text-white/90">{r.what}</span>
              <span className="mt-0.5 block text-[11.5px] leading-snug text-white/40">
                {r.from}
              </span>
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-6 border-t border-white/[0.08] pt-4 text-[12.5px] leading-relaxed text-white/55">
        Every line above is a row in one audit ledger, on this claim — not a
        message in someone’s inbox.
      </div>
    </div>
  );

  if (flat) return body;

  return (
    <motion.div style={{ opacity, y }} className="flex w-full justify-center">
      {body}
    </motion.div>
  );
}

export default function CoverageBloom({ eyebrow = "04 · One record" }: { eyebrow?: string } = {}) {
  const flat = useStatic();
  const runway = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: runway,
    offset: ["start start", "end end"],
  });

  return (
    <SectionShell
      id="coverage"
      eyebrow={eyebrow}
      title={
        <>
          Five systems hold a piece of the answer.{" "}
          <span className="text-white/55">None of them holds the answer.</span>
        </>
      }
      intro="“Has my claim moved?” is one question. Answering it today means a person opening five things, none of which can tell the member anything on its own — and none of which records what the member was finally told."
    >
      {flat ? (
        /* No runway on a phone, and none under reduced motion: both halves are
           shown in full, in order, rather than waiting for a scroll that
           cannot pace them. */
        <div>
          <div className="font-display text-[10.5px] uppercase tracking-wider2 text-white/40">
            Today · one member question
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PIECES.map((p) => (
              <ScatterCard key={p.key} piece={p} progress={scrollYProgress} flat />
            ))}
          </div>

          <p className="mt-6 text-[14px] leading-relaxed text-white/50">
            Five places. No single record of what the member was told, or when.
          </p>

          <div className="mt-12 font-display text-[10.5px] uppercase tracking-wider2 text-emerald-400/80">
            With Gooclaim OS
          </div>
          <div className="mt-4">
            <OneRecord progress={scrollYProgress} flat />
          </div>
        </div>
      ) : (
        /* The runway is the scroll distance the five take to come together. */
        <div ref={runway} className="relative h-[200vh]">
          <div className="sticky top-0 flex h-screen flex-col items-center justify-center">
            <ScatterStage progress={scrollYProgress} />
          </div>
        </div>
      )}
    </SectionShell>
  );
}

/** The pinned stage: five cards drifting in, one record forming behind them. */
function ScatterStage({ progress }: { progress: MotionValue<number> }) {
  const labelOpacity = useTransform(progress, [0, 0.18, 0.36], [1, 1, 0]);
  const noteOpacity = useTransform(progress, [0.06, 0.18, 0.36], [0, 1, 0]);
  const closeOpacity = useTransform(progress, [0.72, 0.88], [0, 1]);

  return (
    <div className="relative w-full">
      <motion.div
        style={{ opacity: labelOpacity }}
        className="absolute -top-2 left-0 font-display text-[10.5px] uppercase tracking-wider2 text-white/40"
      >
        Today · one member question
      </motion.div>

      <motion.div
        style={{ opacity: closeOpacity }}
        className="absolute -top-2 left-0 font-display text-[10.5px] uppercase tracking-wider2 text-emerald-400/80"
      >
        With Gooclaim OS
      </motion.div>

      {/* The five, spread around the middle and pulled in as you scroll. */}
      <div className="relative flex min-h-[72vh] items-center justify-center">
        {PIECES.map((p) => (
          <ScatterCard key={p.key} piece={p} progress={progress} flat={false} />
        ))}

        {/* The record forms in the same place the five converge on. */}
        <div className="relative z-10 flex w-full justify-center">
          <OneRecord progress={progress} flat={false} />
        </div>
      </div>

      <motion.p
        style={{ opacity: noteOpacity }}
        className="absolute -bottom-12 left-0 right-0 text-center text-[13.5px] text-white/45"
      >
        Five places. No single record of what the member was told, or when.
      </motion.p>

      <motion.p
        style={{ opacity: closeOpacity }}
        className="absolute -bottom-12 left-0 right-0 text-center text-[13.5px] text-white/45"
      >
        The same five facts. One place to read them, and one place they are kept.
      </motion.p>
    </div>
  );
}
