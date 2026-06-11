import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import Wordmark from "@/components/Wordmark";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/sections/Footer";
import { openWaitlist } from "@/lib/waitlist";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Pricing", to: "/pricing" },
  { label: "Use cases — TPAs", to: "/use-cases/tpas" },
  { label: "Use cases — Insurers", to: "/use-cases/insurers" },
  { label: "Compliance", to: "/compliance" },
];

interface Props {
  children: ReactNode;
}

export default function PageShell({ children }: Props) {
  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-ink-950 text-white">
      {/* Top bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(13,153,255,0.22) 0%, rgba(124,58,237,0.1) 45%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.25] [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_55%)]"
      />

      {/* Nav */}
      <header className="relative z-20 mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-5 sm:px-10 sm:py-6 lg:px-14">
        <Link to="/">
          <Wordmark size={22} />
        </Link>
        <nav className="hidden items-center gap-6 text-[13.5px] text-white/65 md:flex">
          <Link to="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <Link to="/pricing" className="transition-colors hover:text-white">
            Pricing
          </Link>
          <button
            type="button"
            onClick={() => openWaitlist("page-nav")}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-12px_rgba(13,153,255,0.55)]"
          >
            Join the waitlist
          </button>
        </nav>
        <MobileMenu items={NAV_ITEMS} />
      </header>

      {children}

      <Footer />
    </main>
  );
}
