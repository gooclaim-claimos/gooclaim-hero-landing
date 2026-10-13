import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";

/** One menu for every page — the desktop links. Phones use MobileMenu with SITE_NAV. */
export const SOLUTIONS = [
  { label: "TPAs", to: "/use-cases/tpas", line: "Member questions answered, staff freed up" },
  { label: "Insurers", to: "/use-cases/insurers", line: "One OS across every TPA and channel" },
  { label: "Hospitals", to: "/use-cases/hospitals", line: "Cashless status without the phone-tag" },
  { label: "Health", to: "/use-cases/health", line: "Pre-auth, discharge and reimbursement" },
];

/** The phone menu's list — the same destinations, flat. */
export const SITE_NAV = [
  { label: "Home", to: "/" },
  { label: "Platform", to: "/platform" },
  { label: "Orion", to: "/orion" },
  { label: "Security", to: "/security" },
  { label: "Pricing", to: "/pricing" },
  ...SOLUTIONS.map((s) => ({ label: `Solutions — ${s.label}`, to: s.to })),
];

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-3 py-2 transition-colors ${isActive ? "text-white" : "text-white/65 hover:text-white"}`;

function SolutionsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();
  const active = pathname.startsWith("/use-cases");

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        // Hover already opened it; a click must not close it again. Escape,
        // a click outside, or leaving the menu closes it.
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-1 rounded-full px-3 py-2 transition-colors ${
          active || open ? "text-white" : "text-white/65 hover:text-white"
        }`}
      >
        Solutions
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-full z-50 w-[420px] -translate-x-1/2 pt-3"
          >
            <div className="grid grid-cols-2 gap-1 rounded-2xl p-2 glass-strong shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
              {SOLUTIONS.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  className="rounded-xl px-3.5 py-3 transition-colors hover:bg-white/[0.05] focus-visible:bg-white/[0.06] focus-visible:outline-none"
                >
                  <div className="text-[14px] font-semibold text-white">{s.label}</div>
                  <div className="mt-0.5 text-[12px] leading-snug text-white/50">{s.line}</div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SiteNav() {
  return (
    <nav aria-label="Main" className="hidden items-center gap-1 font-display text-[14px] lg:flex">
      <NavLink to="/platform" className={linkCls} end>
        Platform
      </NavLink>
      <NavLink to="/orion" className={linkCls}>
        Orion
      </NavLink>
      <SolutionsMenu />
      <NavLink to="/security" className={linkCls}>
        Security
      </NavLink>
      <NavLink to="/pricing" className={linkCls}>
        Pricing
      </NavLink>
    </nav>
  );
}
