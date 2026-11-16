import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";
import Wordmark from "@/components/Wordmark";
import ComplianceBadge from "@/components/ComplianceBadge";
import CTA from "@/components/CTA";
import MobileMenu from "@/components/MobileMenu";
import { openWaitlist } from "@/lib/waitlist";
import { scrollToSection } from "@/lib/lenis";
import type { Market } from "@/lib/market";
import { Link } from "react-router-dom";
import SiteNav, { SITE_NAV } from "@/components/SiteNav";

/**
 * Background loop, served from Gooclaim's own CDN (assets.gooclaim.com =
 * CloudFront in front of S3 `gooclaim-nprd-assets`, key under `gooclaim/site/`)
 * — never a third-party stream: the old Mux one started answering 403 in
 * November 2026 and left the hero empty. 1080p, 12 s, no sound, ~1 MB,
 * `moov` at the front so it starts before it has fully downloaded.
 *
 * 🔴 The name is versioned and cached for a year: a new video is a NEW key
 * (hero-loop-v2.mp4), never new bytes behind this one. The video is the whole
 * background (founder, November 2026: the canvas perspective grid and the
 * square grid overlay were removed); it fades in once frames are playing.
 */
const HERO_VIDEO = "https://assets.gooclaim.com/gooclaim/site/hero-loop-v1.mp4";

export default function HeroMeshGrid({ market = "global" }: { market?: Market } = {}) {
  const india = market === "in";
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Background loop: started after the first paint, skipped for reduced motion.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;
    const onPlaying = () => {
      if (!cancelled) setVideoReady(true);
    };
    video.addEventListener("playing", onPlaying);
    // React sets `muted` as a property only; iOS Safari wants the attribute
    // before it will autoplay inline.
    video.muted = true;
    video.setAttribute("muted", "");
    // A tab opened in the background cannot autoplay; start when it is seen.
    const onVisible = () => {
      if (document.visibilityState === "visible" && video.paused && video.readyState > 0) {
        video.play().catch(() => undefined);
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    const id = window.setTimeout(() => {
      if (cancelled) return;
      video.src = HERO_VIDEO;
      video.play().catch(() => undefined);
    }, 400);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
      video.removeEventListener("playing", onPlaying);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  // GSAP scroll-pinned parallax on hero text
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.to("[data-hero-parallax]", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero-root]",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      gsap.to("[data-hero-fade]", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero-root]",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    });
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      data-hero-root
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink-950"
    >
      {/* Background loop (self-hosted, lazy) */}
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        preload="none"
        aria-hidden
        tabIndex={-1}
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out ${
          videoReady ? "opacity-90" : "opacity-0"
        }`}
      />

      {/* Top deep gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,10,18,0.95) 0%, rgba(7,10,18,0) 100%)",
        }}
      />
      {/* Bottom fade to next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,10,18,0) 0%, rgba(7,10,18,1) 100%)",
        }}
      />

      {/* Top nav */}
      <header className="relative z-20 mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-5 sm:px-10 sm:py-6 lg:px-14">
        <Link to="/" aria-label="Gooclaim OS home">
          <Wordmark size={22} />
        </Link>
        <SiteNav />
        <div className="flex items-center gap-3">
          <CTA
            variant="ghost"
            className="hidden sm:inline-flex"
            onClick={() => openWaitlist("hero-header")}
          >
            Book a walkthrough
          </CTA>
          <MobileMenu items={SITE_NAV} />
        </div>
      </header>

      {/* Hero copy */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col items-center justify-center px-5 pb-24 pt-6 text-center sm:px-10 sm:pb-32 sm:pt-12 lg:px-14">
        <div data-hero-parallax>
          {india && (
            // Which country this page is, and the way back to the others.
            <div className="flex justify-center">
              <Link
                to="/"
                className="mb-4 inline-flex min-h-[44px] items-center gap-2 rounded-full px-3 font-display text-[11px] uppercase tracking-wider2 text-white/55 transition-colors hover:text-white sm:min-h-0 sm:py-1.5"
              >
                <span className="text-emerald-400">IN</span> India
                <span aria-hidden className="h-3 w-px bg-white/20" />
                <span className="normal-case tracking-normal text-white/45">Change country</span>
              </Link>
            </div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex max-w-full flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full px-4 py-2 text-center font-display text-[13px] tracking-tight glass sm:mb-7 sm:text-[15px]"
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-accent-cyan opacity-70 blur-[2px] animate-pulse-soft" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-cyan" />
            </span>
            <span className="font-medium text-white/90">Gooclaim OS is a Claim OS</span>
            <span aria-hidden className="h-3.5 w-px bg-white/20" />
            <span className="text-white/50">{india ? "for India’s TPAs & insurers" : "for TPAs & insurers"}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="text-balance font-display text-[34px] font-semibold leading-[1.05] tracking-tightest text-white sm:text-[58px] sm:leading-[1.02] lg:text-[88px]"
          >
            Built for every claim.
            <br />
            <span className="text-gradient-cyan">
              Every channel. Every CMS. Every workflow.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mt-6 text-[14px] text-white/55 sm:text-[15px]"
          >
            Messaging tools and email today. Voice calls in early access.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <CTA onClick={() => openWaitlist(india ? "india-hero-primary" : "hero-primary")}>
              Book a walkthrough
            </CTA>
            {india ? (
              <CTA
                variant="ghost"
                // The day-by-day claim demo on this page; it starts playing once in view.
                onClick={() => scrollToSection("system-gap", 96)}
              >
                See how it works
              </CTA>
            ) : (
              <CTA variant="ghost" onClick={() => scrollToSection("what-it-does", 96)}>
                See what it does
              </CTA>
            )}
          </motion.div>

          {/* Hospitals are not a buyer today (the hospital tenant is not built), so
              they get a way in, not a place in the headline. The page says plainly
              that the TPA or insurer buys Gooclaim OS. When a hospital becomes a
              tenant, this line and that page change together. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="mt-4 flex justify-center"
          >
            <Link
              to="/use-cases/hospitals"
              className="group inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3 text-[13px] text-white/55 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70"
            >
              <span>
                Hospitals: <span className="text-white/75 group-hover:text-white">see what changes for your desk</span>
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Compliance badges row */}
        <div
          data-hero-fade
          className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:mt-20 sm:gap-3"
        >
          <ComplianceBadge
            label={india ? "IRDAI clocks · 1 h · 3 h · 15 days" : "Regulator clocks on every claim"}
            hue="#0d99ff"
            delay={0.45}
          />
          <ComplianceBadge
            label={india ? "DPDP consent gate" : "Consent before a word"}
            hue="#10b981"
            delay={0.55}
          />
          <ComplianceBadge
            label="Immutable audit ledger"
            hue="#f59e0b"
            delay={0.65}
          />
        </div>

        {/* Scroll cue */}
        <div
          data-hero-fade
          className="absolute bottom-7 left-1/2 -translate-x-1/2 font-display text-[10.5px] uppercase tracking-wider2 text-white/35"
        >
          <span className="inline-flex items-center gap-2">
            scroll <span className="h-px w-9 bg-white/25" />
          </span>
        </div>
      </div>
    </section>
  );
}
