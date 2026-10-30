import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { COUNTRY_PAGES, type CountryPage } from "@/lib/market";

const DISMISSED = "gooclaim.country-banner.dismissed";

function remember() {
  try {
    localStorage.setItem(DISMISSED, "1");
  } catch {
    /* storage blocked: the banner simply comes back next visit */
  }
}

/**
 * Suggests the visitor's country page when one exists — never redirects. An automatic
 * redirect would hide the home page from search crawlers (they visit from the US), trap
 * anyone on a VPN or travelling, and change what a shared link opens. Closed once, or
 * followed once, it stays away.
 */
export default function CountryBanner() {
  const [page, setPage] = useState<CountryPage | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISSED)) return;
    } catch {
      /* storage blocked: still offer it */
    }
    const ctrl = new AbortController();
    fetch("/api/country", { signal: ctrl.signal })
      .then((r) => (r.ok ? (r.json() as Promise<{ country?: string | null }>) : null))
      .then((d) => setPage(COUNTRY_PAGES.find((c) => c.code === d?.country) ?? null))
      .catch(() => {
        /* no country, no banner */
      });
    return () => ctrl.abort();
  }, []);

  const close = () => {
    setPage(null);
    remember();
  };

  return (
    <AnimatePresence>
      {page && (
        <motion.aside
          aria-label="Your country"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-[90] mx-auto flex max-w-[520px] items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/90 py-2 pl-4 pr-2 text-[14px] text-white/75 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-md"
        >
          <span className="font-display text-[11px] tracking-wider2 text-emerald-400">{page.code}</span>
          <p className="flex-1 leading-snug">
            Looks like you&rsquo;re in {page.name}.{" "}
            <Link
              to={page.to}
              onClick={remember}
              className="whitespace-nowrap font-semibold text-white underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50"
            >
              See Gooclaim OS in {page.name} &rarr;
            </Link>
          </p>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
