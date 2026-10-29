import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * What Orion does before it says anything.
 *
 * Most AI products show the answer and hide the work, so a reader has to take
 * the answer on trust. Orion already streams its work — `coworker.py` wraps
 * every tool in `run.step(label, …)` and emits it twice, `running` then `done`
 * — so the honest thing is to show that, not a finished paragraph.
 *
 * 🔴 The step labels are the service's own strings, not copy written here:
 *   - "Read claim CLM-24817"        `coworker.py` — `f"Read claim {claim_id}"`
 *   - "(from this conversation)"     the suffix when the read is still warm
 *   - "Checked the next safe steps"  `coworker.py` read_next_steps
 *   - "Searched your library"        `tool_gateway.py` ALLOWLIST search_knowledge
 *   - "Prepared a card"              `coworker.py` propose
 *   - running → done | failed        `schemas.py` Step.status
 *   - "Hand this to Ravi"            `schemas.py` Proposal.title's own example
 *
 * `Step`'s docstring says these are "shown live, then folded" — so they fold
 * here too once the answer lands, and the reader can open them again.
 */

interface WorkStep {
  label: string;
  /** What that step actually touched — shown under the folded list. */
  detail: string;
}

const STEPS: WorkStep[] = [
  {
    label: "Read claim CLM-24817",
    detail: "Your claims system, just now — never a stored copy.",
  },
  {
    label: "Checked the next safe steps",
    detail: "Rules over the claim's own facts, not a guess.",
  },
  {
    label: "Searched your library",
    detail: "Your documents only — quoted, never paraphrased.",
  },
  {
    label: "Prepared a card",
    detail: "Nothing has happened yet.",
  },
];

const QUESTION = "Why is CLM-24817 still open, and who should take it?";

/** How long each step runs before it turns from running to done. */
const RUN_MS = 620;
const GAP_MS = 240;

type Phase = "idle" | "working" | "answered";

function Spinner({ hue }: { hue: string }) {
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      className="inline-flex"
      aria-hidden
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke={`${hue}33`} strokeWidth="3" />
        <path d="M21 12a9 9 0 0 0-9-9" stroke={hue} strokeWidth="3" strokeLinecap="round" />
      </svg>
    </motion.span>
  );
}

function Tick({ hue }: { hue: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke={hue}
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function StepRow({ step, state }: { step: WorkStep; state: "running" | "done" }) {
  const hue = state === "done" ? "#10b981" : "#0d99ff";
  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-start gap-3"
    >
      <span className="mt-[3px] inline-flex h-4 w-4 shrink-0 items-center justify-center">
        {state === "running" ? <Spinner hue={hue} /> : <Tick hue={hue} />}
      </span>
      <span className="min-w-0">
        <span
          className={`block font-mono text-[12.5px] leading-snug ${
            state === "done" ? "text-white/70" : "text-white/90"
          }`}
        >
          {step.label}
        </span>
        <span className="mt-0.5 block text-[11.5px] leading-snug text-white/35">
          {step.detail}
        </span>
      </span>
    </motion.li>
  );
}

/** The answer Orion lands on, and the card that waits for a person. */
function Answer({ accepted, onAccept }: { accepted: boolean; onAccept: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mt-5"
    >
      <p className="text-[14px] leading-relaxed text-white/85">
        Two reminders have gone out and the discharge summary is still owed. India&rsquo;s
        15-day IRDAI clock ran out on 12 October
        <span
          className="ml-0.5 rounded px-1 font-display text-[10.5px]"
          style={{ color: "#7c3aed", background: "rgba(124,58,237,0.15)" }}
        >
          1
        </span>
        .
      </p>

      <div
        className="mt-4 rounded-2xl border p-4"
        style={{
          borderColor: accepted ? "rgba(16,185,129,0.35)" : "rgba(245,158,11,0.3)",
          background: accepted ? "rgba(16,185,129,0.06)" : "rgba(245,158,11,0.05)",
        }}
      >
        <div
          className="font-display text-[10px] uppercase tracking-wider2"
          style={{ color: accepted ? "#10b981" : "#f59e0b" }}
        >
          {accepted ? "Card accepted" : "Card prepared · waiting"}
        </div>
        <div className="mt-2 text-[14.5px] font-semibold leading-snug text-white">
          Hand this to Ravi
        </div>
        <p className="mt-1 text-[12.5px] leading-relaxed text-white/55">
          Ravi already has the two open reimbursement claims from this hospital.
        </p>

        <AnimatePresence mode="wait" initial={false}>
          {accepted ? (
            <motion.p
              key="done"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-3 text-[12.5px] leading-relaxed text-white/70"
              role="status"
            >
              Handed over through the same path your team uses by hand — and written to the
              audit ledger with your name on it.
            </motion.p>
          ) : (
            <motion.div
              key="ask"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-3.5 flex flex-wrap items-center gap-2"
            >
              <button
                type="button"
                onClick={onAccept}
                className="inline-flex min-h-[40px] items-center rounded-full bg-white px-4 text-[12.5px] font-semibold text-ink-950 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50"
              >
                Accept
              </button>
              <span className="text-[12px] text-white/40">
                Nothing happens until someone presses this.
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function OrionWorking({
  eyebrow = "Watch it work",
}: { eyebrow?: string } = {}) {
  // 🔴 The ref lives on a plain element — framer forwards a motion component's
  // ref a tick late and this hook's effect never re-runs, so a ref on a
  // `motion.div` observes nothing and the section stays hidden for ever.
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.3 });

  const [phase, setPhase] = useState<Phase>("idle");
  const [done, setDone] = useState(0);
  const [running, setRunning] = useState(false);
  const [accepted, setAccepted] = useState(false);
  // The real product folds the steps away once it answers. This page does not:
  // the reader has just watched them appear, and hiding them immediately is
  // the exact move — answer shown, work hidden — the section exists to argue
  // against. The fold control stays, so the product behaviour is still shown.
  const [folded, setFolded] = useState(false);
  const timers = useRef<number[]>([]);

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const play = useCallback(() => {
    clear();
    setAccepted(false);
    setFolded(false);

    // Reduced motion gets the finished state: the work is the information, and
    // animating it is not what makes it readable.
    if (prefersReducedMotion()) {
      setDone(STEPS.length);
      setRunning(false);
      setPhase("answered");
      setFolded(false);
      return;
    }

    setDone(0);
    setRunning(true);
    setPhase("working");

    let t = 0;
    STEPS.forEach((_, i) => {
      t += RUN_MS;
      timers.current.push(
        window.setTimeout(() => {
          setDone(i + 1);
          setRunning(i + 1 < STEPS.length);
        }, t),
      );
      t += GAP_MS;
    });
    timers.current.push(window.setTimeout(() => setPhase("answered"), t + 180));
  }, [clear]);

  // 🔴 The timers are cleaned up by the SAME effect that starts them, and the
  // guard is `seen` alone — never `phase === "idle"`.
  //
  // With a separate `useEffect(() => clear, [clear])`, StrictMode's double
  // invoke killed the run: effect one called play() and set phase to
  // "working", the cleanup cleared its timers, and effect two then saw a phase
  // that was no longer "idle" and declined to restart. The first step sat
  // spinning for ever, with nothing in the console. Tying the timers to their
  // own effect makes a remount simply start the run again.
  useEffect(() => {
    if (!seen) return;
    play();
    return clear;
  }, [seen, play, clear]);

  const shown = running ? done + 1 : done;

  return (
    <SectionShell
      id="watch-it-work"
      eyebrow={eyebrow}
      title={
        <>
          Orion shows its working.{" "}
          <span className="text-white/55">Then asks.</span>
        </>
      }
      intro="Most assistants hand you an answer and hide how they got there, which leaves you trusting a paragraph. Orion reads out loud: every claim it opens and every search it runs appears as it happens, and the action it prepares sits there until a person presses it."
    >
      <div ref={ref} className="grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:gap-14">
        {/* the run */}
        <div className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-7">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-display text-[10.5px] uppercase tracking-wider2 text-white/40">
              Orion · Claim Room
            </span>
            <span className="font-display text-[10px] uppercase tracking-wider2 text-white/30">
              Sample data
            </span>
          </div>

          {/* what a staff member asked */}
          <div className="ml-auto mt-5 max-w-[88%] rounded-2xl rounded-br-md border border-white/10 bg-white/[0.05] px-4 py-2.5 text-[13.5px] leading-snug text-white/85">
            {QUESTION}
          </div>

          <div className="mt-5" aria-live="polite">
            <div className="flex items-center justify-between gap-3">
              <span className="font-display text-[10px] uppercase tracking-wider2 text-white/35">
                {phase === "answered" ? `Did ${STEPS.length} things` : "Working"}
              </span>
              {phase === "answered" ? (
                <button
                  type="button"
                  onClick={() => setFolded((f) => !f)}
                  aria-expanded={!folded}
                  className="inline-flex min-h-[32px] items-center font-display text-[10px] uppercase tracking-wider2 text-white/45 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50"
                >
                  {folded ? "Open" : "Fold"}
                </button>
              ) : null}
            </div>

            <AnimatePresence initial={false}>
              {phase !== "answered" || !folded ? (
                <motion.ul
                  key="steps"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-3 space-y-3"
                >
                  {STEPS.slice(0, shown).map((s, i) => (
                    <StepRow key={s.label} step={s} state={i < done ? "done" : "running"} />
                  ))}
                </motion.ul>
              ) : null}
            </AnimatePresence>
          </div>

          {phase === "answered" ? (
            <Answer accepted={accepted} onAccept={() => setAccepted(true)} />
          ) : null}

          {phase === "answered" ? (
            <button
              type="button"
              onClick={play}
              className="mt-auto inline-flex min-h-[32px] items-center self-start pt-6 font-display text-[10px] uppercase tracking-wider2 text-white/40 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50"
            >
              Replay
            </button>
          ) : null}
        </div>

        {/* why it is built that way */}
        <div className="flex flex-col justify-center gap-7">
          {[
            {
              head: "You can check the work, not just the answer",
              body: "Each line names what Orion opened. If it read the wrong claim or searched the wrong library, you see that before you act on anything.",
              hue: "#0d99ff",
            },
            {
              head: "The action waits, visibly",
              body: "Orion prepares a card and stops. There is no quiet mode where it goes ahead because it was confident — the card simply sits there.",
              hue: "#f59e0b",
            },
            {
              head: "Accepting runs your own path",
              body: "Pressing Accept does not give Orion a new power. It runs the same hand-over your team runs by hand, and the ledger records who pressed it.",
              hue: "#10b981",
            },
          ].map((n) => (
            <div key={n.head} className="border-l-2 pl-5" style={{ borderColor: n.hue }}>
              <h3 className="font-display text-[16px] font-semibold leading-snug tracking-tight text-white">
                {n.head}
              </h3>
              <p className="mt-2 max-w-[46ch] text-[13.5px] leading-relaxed text-white/55">
                {n.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
