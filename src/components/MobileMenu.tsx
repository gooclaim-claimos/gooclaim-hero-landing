import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Wordmark from "@/components/Wordmark";
import { openWaitlist } from "@/lib/waitlist";

interface NavItem {
  label: string;
  to?: string;
  href?: string;
}

interface Props {
  items: NavItem[];
  /** Optional className for the trigger button (the burger icon). */
  triggerClassName?: string;
}

export default function MobileMenu({ items, triggerClassName }: Props) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/85 transition-colors hover:text-white glass ${triggerClassName ?? ""}`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          <line x1="3" y1="7" x2="21" y2="7" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="17" x2="21" y2="17" />
        </svg>
      </button>

      {/* Backdrop */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 z-40 bg-ink-950/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`md:hidden fixed inset-y-0 right-0 z-50 flex w-full max-w-[320px] flex-col bg-ink-950 border-l border-white/10 transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          boxShadow: "0 0 60px -10px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-5">
          <Link to="/" onClick={() => setOpen(false)}>
            <Wordmark size={20} />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/75 transition-colors hover:text-white"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-5">
          {items.map((item) => {
            if (item.to) {
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="rounded-lg px-3 py-3 text-[15px] font-medium text-white/85 transition-colors hover:bg-white/[0.04] hover:text-white"
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <a
                key={item.label}
                href={item.href}
                className="rounded-lg px-3 py-3 text-[15px] font-medium text-white/85 transition-colors hover:bg-white/[0.04] hover:text-white"
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Bottom CTA */}
        <div className="border-t border-white/8 p-5">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openWaitlist("mobile-menu");
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-ink-950 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-12px_rgba(13,153,255,0.55)]"
          >
            Join the waitlist
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M5 12h14" />
              <path d="M13 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  );
}
