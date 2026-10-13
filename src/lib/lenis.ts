import Lenis from "lenis";
import { ensureGsap, prefersReducedMotion } from "./gsap";

function isTouchOnlyDevice(): boolean {
  if (typeof window === "undefined") return false;
  // hover:none + pointer:coarse = phones / basic tablets (touchscreen only)
  // Hybrids like Surface (mouse + touch) still get Lenis for trackpad smoothness.
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

// The running instance, so an in-page link scrolls with Lenis instead of
// fighting it. Null on touch devices and with reduced motion.
let active: Lenis | null = null;

/** Scroll to a section by id — Lenis when it runs, the browser otherwise. */
export function scrollToSection(id: string, offset = 0) {
  const el = document.getElementById(id);
  if (!el) return;
  if (active) {
    active.scrollTo(el, { offset });
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

export function initLenis() {
  if (prefersReducedMotion()) {
    return () => undefined;
  }
  // On touch-only devices, skip Lenis so native momentum scrolling works
  // with a single finger (no overflow:clip on body either).
  if (isTouchOnlyDevice()) {
    return () => undefined;
  }

  const { ScrollTrigger } = ensureGsap();

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.2,
  });

  lenis.on("scroll", ScrollTrigger.update);
  active = lenis;

  let rafId = 0;
  const raf = (time: number) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  return () => {
    cancelAnimationFrame(rafId);
    if (active === lenis) active = null;
    lenis.destroy();
  };
}
