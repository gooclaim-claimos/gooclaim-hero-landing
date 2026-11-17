import { useEffect } from "react";

/**
 * Each top-level section of a page fades up the first time it scrolls into
 * view — the way elevenlabs.io moves (ease cubic-bezier(0.16,1,0.3,1), native
 * scroll, no scroll hijack). One hook for every page, so no page has to opt in.
 *
 * Sections are only hidden from script, after hydration: the prerendered HTML
 * shows everything, so a visitor without JavaScript, a crawler or a slow
 * script never sees an empty page. Anyone who asked for reduced motion gets no
 * movement at all.
 */
// The page the visitor landed on is prerendered and already painted (main's
// CSS fade covers it); hiding its on-screen sections after hydration would make
// them blink. Keyed on the path, not a run count, so StrictMode's second run
// in development agrees with the first.
const LANDING = typeof window === "undefined" ? "" : window.location.pathname;
let navigated = false;

export function useReveal(pathname: string): void {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section")).filter(
      (s) => !s.parentElement?.closest("main section"),
    );
    const fold = window.innerHeight;
    if (pathname !== LANDING) navigated = true;
    const initial = !navigated;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("gc-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    for (const s of sections) {
      const onScreen = s.getBoundingClientRect().top < fold;
      if (initial && onScreen) continue;
      s.classList.add("gc-reveal");
      // On screen after a page change: soft entrance, no wait for a scroll.
      if (onScreen) s.classList.add("gc-reveal-now");
    }
    // Commit the hidden state before any section can be shown, or the browser
    // folds both into one frame and the fade never plays.
    void document.body.offsetHeight;
    for (const s of sections) if (s.classList.contains("gc-reveal")) io.observe(s);
    return () => {
      io.disconnect();
      for (const s of sections) s.classList.remove("gc-reveal", "gc-reveal-now", "gc-in");
    };
  }, [pathname]);
}
