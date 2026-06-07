import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";
import Wordmark from "@/components/Wordmark";
import ComplianceBadge from "@/components/ComplianceBadge";
import CTA from "@/components/CTA";

const MUX_PLAYBACK =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export default function HeroMeshGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Animated Tron-style perspective grid on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let scrollOffset = 0;
    const reduced = prefersReducedMotion();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const drawFrame = (t: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // Horizon line
      const horizonY = h * 0.63;

      // Vanishing point
      const vx = w / 2;
      const vy = horizonY;

      ctx.lineWidth = 1;

      // Perspective lines (radiating from vanishing point downward)
      const lineCount = 28;
      for (let i = -lineCount; i <= lineCount; i++) {
        const angle = (i / lineCount) * Math.PI * 0.5;
        const reach = h * 0.8;
        const endX = vx + Math.tan(angle) * reach;
        const endY = vy + reach;

        // distance-based fade
        const dist = Math.abs(i) / lineCount;
        const alpha = 0.16 * (1 - dist * 0.85);
        ctx.strokeStyle = `rgba(125,196,255,${alpha})`;
        ctx.beginPath();
        ctx.moveTo(vx, vy);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // Horizontal grid lines (moving toward viewer)
      const rowCount = 14;
      for (let r = 0; r < rowCount; r++) {
        const phase = reduced ? r / rowCount : ((r + scrollOffset) % rowCount) / rowCount;
        const yScreen = vy + Math.pow(phase, 1.6) * (h * 0.5);
        const widthAtY = (yScreen - vy) * 4.5;
        const alpha = 0.34 * (1 - phase) ** 1.2;
        ctx.strokeStyle = `rgba(13,153,255,${alpha})`;
        ctx.lineWidth = 1 + (1 - phase) * 0.6;
        ctx.beginPath();
        ctx.moveTo(vx - widthAtY, yScreen);
        ctx.lineTo(vx + widthAtY, yScreen);
        ctx.stroke();
      }

      // Horizon glow
      const grad = ctx.createLinearGradient(0, vy - 60, 0, vy + 6);
      grad.addColorStop(0, "rgba(13,153,255,0)");
      grad.addColorStop(1, "rgba(125,196,255,0.55)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, vy - 60, w, 60);

      // Sun bloom on horizon
      const bloom = ctx.createRadialGradient(vx, vy, 0, vx, vy, w * 0.4);
      bloom.addColorStop(0, "rgba(13,153,255,0.35)");
      bloom.addColorStop(0.4, "rgba(124,58,237,0.12)");
      bloom.addColorStop(1, "rgba(124,58,237,0)");
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, w, h);

      if (!reduced) {
        scrollOffset += 0.018;
        raf = requestAnimationFrame(drawFrame);
      }
      void t;
    };

    if (reduced) {
      drawFrame(0);
    } else {
      raf = requestAnimationFrame(drawFrame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Mux HLS lazy load
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    const load = async () => {
      try {
        if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = MUX_PLAYBACK;
          await video.play().catch(() => undefined);
          if (!cancelled) setVideoReady(true);
          return;
        }
        const { default: Hls } = await import("hls.js");
        if (cancelled) return;
        if (Hls.isSupported()) {
          const hls = new Hls({ maxBufferLength: 12 });
          hls.loadSource(MUX_PLAYBACK);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().then(() => {
              if (!cancelled) setVideoReady(true);
            }).catch(() => undefined);
          });
        }
      } catch {
        /* ignore — canvas fallback already running */
      }
    };
    // Defer to next idle moment so the grid paints first
    const id = window.setTimeout(load, 400);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
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
      {/* Background video (lazy) */}
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        autoPlay
        preload="none"
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out ${
          videoReady ? "opacity-30" : "opacity-0"
        }`}
        aria-hidden
      />

      {/* Mesh grid + Tron perspective on canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* CSS grid overlay (subtle) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
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
      <header className="relative z-20 mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
        <Wordmark size={22} />
        <CTA href="/demo" variant="ghost" className="hidden sm:inline-flex">
          Book a demo
        </CTA>
      </header>

      {/* Hero copy */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col items-center justify-center px-6 pb-28 pt-10 text-center sm:px-10 sm:pb-32 sm:pt-12 lg:px-14">
        <div data-hero-parallax>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11.5px] font-mono uppercase tracking-wider2 text-white/60 glass"
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-accent-cyan opacity-70 blur-[2px] animate-pulse-soft" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-cyan" />
            </span>
            The operating system for India&rsquo;s claims industry
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="text-balance font-display text-[44px] font-semibold leading-[1.02] tracking-tightest text-white sm:text-[68px] lg:text-[88px]"
          >
            Built for every claim.
            <br />
            <span className="text-gradient-cyan">
              Every channel. Every CMS. Every vertical.
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <CTA href="/demo">Book a 30-min demo</CTA>
            <CTA href="#how" variant="ghost">
              See how it works
            </CTA>
          </motion.div>
        </div>

        {/* Compliance badges row */}
        <div
          data-hero-fade
          className="mt-16 flex flex-wrap items-center justify-center gap-2.5 sm:mt-20 sm:gap-3"
        >
          <ComplianceBadge label="IRDAI 3-hour TAT" hue="#0d99ff" delay={0.45} />
          <ComplianceBadge
            label="DPDP consent gate"
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
          className="absolute bottom-7 left-1/2 -translate-x-1/2 font-mono text-[10.5px] uppercase tracking-wider2 text-white/35"
        >
          <span className="inline-flex items-center gap-2">
            scroll <span className="h-px w-9 bg-white/25" />
          </span>
        </div>
      </div>
    </section>
  );
}
