import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionShell from "@/components/SectionShell";
import { COUNTRY_PAGES, type CountryPage } from "@/lib/market";
import { viewportOnce } from "@/lib/motion";

/**
 * The country switcher. Each country is its own page with its own URL — `/in` —
 * so search engines index it and a prospect can be sent straight to it; a tab
 * that only swapped this section's text would leave every country but one
 * invisible to search. A country joins this list when the product runs under its
 * rules, never as a promise: `/us` and `/ae` are added with their pages, in
 * `COUNTRY_PAGES`.
 */
const POINTS: Record<CountryPage["code"], string[]> = {
  IN: [
    "IRDAI's 1-hour, 3-hour and 15-day clocks on every claim",
    "DPDP consent before a single claim detail",
    "Members answered in English, Hindi and Hinglish",
    "Amounts in rupees, interest at bank rate + 2%",
  ],
};

const COUNTRIES = COUNTRY_PAGES.map((c) => ({ ...c, points: POINTS[c.code] }));

export default function WhereWeRun({ eyebrow = "Where it runs" }: { eyebrow?: string } = {}) {
  return (
    <SectionShell
      id="where-it-runs"
      eyebrow={eyebrow}
      title={
        <>
          One core.{" "}
          <span className="text-white/55">Each country&rsquo;s rules.</span>
        </>
      }
      intro="The OS is the same everywhere. The legal clocks, the consent law, the languages and the currency come from the country your claims are in."
    >
      <div role="list" aria-label="Countries" className="flex flex-wrap gap-2">
        {COUNTRIES.map((c) => (
          <Link
            key={c.code}
            role="listitem"
            to={c.to}
            className="inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-emerald-500/40 bg-emerald-500/[0.08] px-4 text-[14px] font-semibold text-white transition-colors hover:bg-emerald-500/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50"
          >
            <span className="font-display text-[11px] tracking-wider2 text-emerald-400">{c.code}</span>
            {c.name}
          </Link>
        ))}
      </div>

      {COUNTRIES.map((c) => (
        <motion.div
          key={c.code}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6"
        >
          <Link
            to={c.to}
            className="group relative block overflow-clip rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/50 sm:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-500/20 blur-3xl"
            />
            <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-center">
              <div>
                <div className="flex items-center gap-2 font-display text-[10.5px] uppercase tracking-wider2 text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Live
                </div>
                <div className="mt-3 font-display text-[28px] font-semibold text-white">Gooclaim OS in {c.name}</div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-white/80 group-hover:text-white">
                  See a claim run under {c.name}&rsquo;s rules
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
                </div>
              </div>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[14px] text-white/75">
                    <svg className="mt-[3px] shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        </motion.div>
      ))}

      <p className="mt-5 text-[13px] text-white/45">More countries join this list when the product runs under their rules.</p>
    </SectionShell>
  );
}
