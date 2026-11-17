import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

/** True once the element has been on screen (and stays true). */
export function useSeen<T extends Element>(ref: RefObject<T>, threshold = 0.35): boolean {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (!("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, seen, threshold]);
  return seen;
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface Autoplay {
  /** The step on show. */
  step: number;
  /** Still advancing by itself. */
  playing: boolean;
  /** The visitor picked a step: stop the tour and show that one. */
  pick: (i: number) => void;
  /** Start the tour again from the first step. */
  replay: () => void;
}

/**
 * Walks `count` steps, `stepMs` apart, starting the first time `start` is
 * true (usually: the card scrolled into view). A click on a step hands
 * control to the visitor. `loop` starts over after the last step; otherwise
 * the tour rests on the last step. Reduced motion: no tour, the `rest` step
 * is shown at once.
 */
export function useAutoplay({ count, stepMs, start, loop = false, initial = 0, rest = count - 1 }: { count: number; stepMs: number; start: boolean; loop?: boolean; initial?: number; rest?: number }): Autoplay {
  const [step, setStep] = useState(initial);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<number | null>(null);

  const stop = () => {
    if (timer.current !== null) window.clearInterval(timer.current);
    timer.current = null;
  };

  const play = useCallback(
    (from: number) => {
      stop();
      setStep(from);
      setPlaying(true);
      timer.current = window.setInterval(() => {
        setStep((s) => {
          if (s + 1 < count) return s + 1;
          if (loop) return 0;
          stop();
          setPlaying(false);
          return s;
        });
      }, stepMs);
    },
    [count, stepMs, loop],
  );

  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setStep(rest);
      return;
    }
    play(initial);
    return stop;
  }, [start, play, initial, rest]);

  useEffect(() => stop, []);

  return {
    step,
    playing,
    pick: (i: number) => {
      stop();
      setPlaying(false);
      setStep(i);
    },
    replay: () => (prefersReducedMotion() ? setStep(rest) : play(initial)),
  };
}
