import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import Wordmark from "@/components/Wordmark";
import MobileMenu from "@/components/MobileMenu";

const LEGAL_NAV = [
  { label: "Home", to: "/" },
  { label: "Pricing", to: "/pricing" },
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Compliance", to: "/compliance" },
];

interface Props {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}

export default function LegalShell({ eyebrow, title, updated, children }: Props) {
  return (
    <main className="relative min-h-screen bg-ink-950 text-white">
      {/* Background bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(13,153,255,0.18) 0%, rgba(124,58,237,0.08) 45%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.25] [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_55%)]"
      />

      {/* Nav */}
      <header className="relative z-20 mx-auto flex w-full max-w-[960px] items-center justify-between px-5 py-5 sm:px-10 sm:py-6">
        <Link to="/">
          <Wordmark size={22} />
        </Link>
        <nav className="hidden items-center gap-5 text-[13px] text-white/65 md:flex">
          <Link to="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <Link to="/privacy" className="transition-colors hover:text-white">
            Privacy
          </Link>
          <Link to="/terms" className="transition-colors hover:text-white">
            Terms
          </Link>
          <Link to="/compliance" className="transition-colors hover:text-white">
            Compliance
          </Link>
        </nav>
        <MobileMenu items={LEGAL_NAV} />
      </header>

      {/* Article */}
      <article className="relative z-10 mx-auto w-full max-w-[760px] px-5 pb-24 pt-10 sm:px-10 sm:pb-32 sm:pt-20">
        <div className="mb-3 font-mono text-[10.5px] uppercase tracking-wider text-white/45 sm:text-[11px] sm:tracking-wider2">
          {eyebrow}
        </div>
        <h1 className="font-display text-[32px] font-semibold leading-[1.05] tracking-tightest text-white sm:text-[56px]">
          {title}
        </h1>
        <p className="mt-4 font-mono text-[11.5px] uppercase tracking-wider2 text-white/40">
          Last updated · {updated}
        </p>

        <div className="prose-legal mt-14 text-white/75">
          {children}
        </div>

        <div className="mt-20 border-t border-white/8 pt-8 text-[13px] text-white/50">
          <p>
            Questions? Reach us at{" "}
            <a
              href="mailto:contact@gooclaim.com"
              className="text-white/80 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
            >
              contact@gooclaim.com
            </a>
            . Security disclosures →{" "}
            <a
              href="mailto:security@gooclaim.com"
              className="text-white/80 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
            >
              security@gooclaim.com
            </a>
            .
          </p>
        </div>
      </article>
    </main>
  );
}
