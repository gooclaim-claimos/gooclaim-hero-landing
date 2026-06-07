import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import SEOHead from "@/components/SEOHead";
import { SEO_PRICING } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

interface Mode {
  badge: string;
  name: string;
  hue: string;
  blurb: string;
  includes: string[];
  fit: string;
}

const MODES: Mode[] = [
  {
    badge: "Mode 01",
    name: "Pilot",
    hue: "#0d99ff",
    blurb:
      "A bounded 4–8 week proof-of-value with one workflow on one channel. We co-design success metrics with your team before kick-off.",
    includes: [
      "1 workflow · 1 channel · 1 tenant",
      "Truth-layer connector to your CMS",
      "WhatsApp HSM or voice agent",
      "Per-tenant audit ledger",
      "Weekly success readout",
    ],
    fit: "TPAs and insurers evaluating Gooclaim OS against a specific operational pain.",
  },
  {
    badge: "Mode 02",
    name: "Production",
    hue: "#10b981",
    blurb:
      "Annual engagement covering multiple workflows, all live channels, IRDAI-grade SLAs, and 24×7 support. Pricing scales with tenant volume.",
    includes: [
      "Unlimited workflows + channels",
      "Production SLAs · 1hr / 3hr cashless mandate tracking",
      "Per-tenant dashboards + IRDAI export",
      "Dedicated solutions engineer",
      "Quarterly architecture review",
    ],
    fit: "TPAs and insurers running cashless ops at scale and ready to standardize on Gooclaim OS.",
  },
  {
    badge: "Mode 03",
    name: "Enterprise",
    hue: "#7c3aed",
    blurb:
      "Multi-vertical, multi-tenant deployment with custom security posture, dedicated infra and named architects. For groups operating across Health, Life, Motor and more.",
    includes: [
      "Multi-vertical workflow suite",
      "Dedicated cluster · custom region",
      "Custom security review · DPO sync",
      "Named architects + on-call",
      "Roadmap influence",
    ],
    fit: "Insurance groups, large TPAs and multi-line carriers.",
  },
];

export default function Pricing() {
  useEffect(() => {
    document.title = "Pricing · Gooclaim OS";
  }, []);

  const CALENDLY = "https://calendly.com/contact-gooclaim/30min";

  return (
    <PageShell>
      <SEOHead
        seo={SEO_PRICING}
        path="/pricing"
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />
      <section className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-24 pt-16 sm:px-10 sm:pb-28 sm:pt-20 lg:px-14">
        {/* Hero */}
        <div className="mb-3 font-mono text-[11px] uppercase tracking-wider2 text-white/45">
          Pricing
        </div>
        <h1 className="max-w-3xl text-balance font-display text-[42px] font-semibold leading-[1.02] tracking-tightest text-white sm:text-[60px] lg:text-[72px]">
          Let&rsquo;s talk pricing.{" "}
          <span className="text-white/55">
            Built for India&rsquo;s TPAs and insurers.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/65 sm:text-[17px]">
          Gooclaim OS is sold as a partnership, not a SKU. Pricing follows the
          shape of your operation — volume, channels, verticals, SLA. Three
          engagement modes below; we&rsquo;ll co-design the right one with you
          in a 30-minute call.
        </p>

        {/* Primary CTAs */}
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
          <a
            href={CALENDLY}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(13,153,255,0.55)]"
          >
            Connect with us
            <ArrowRight />
          </a>
          <Link
            to="/demo"
            className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold text-white/85 glass transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:border-white/20"
          >
            Or book a demo first
            <ArrowRight />
          </Link>
        </div>

        {/* 3 engagement modes */}
        <motion.div
          variants={stagger(0.06, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-20 grid grid-cols-1 gap-5 lg:grid-cols-3"
        >
          {MODES.map((m) => (
            <motion.article
              key={m.badge}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl glass-strong p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/15 sm:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-80"
                style={{ background: `${m.hue}40` }}
              />
              <div
                aria-hidden
                className="absolute left-0 top-7 h-12 w-[3px] rounded-r"
                style={{
                  background: m.hue,
                  boxShadow: `0 0 18px ${m.hue}88`,
                }}
              />

              <div className="relative z-10 flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="font-mono text-[11px] uppercase tracking-wider2"
                    style={{ color: m.hue }}
                  >
                    {m.badge}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-[28px] font-semibold leading-[1.05] tracking-tighter text-white sm:text-[32px]">
                  {m.name}
                </h3>

                {/* Price-like row */}
                <div className="mt-4 flex items-baseline gap-2">
                  <span
                    className="font-display text-[22px] font-semibold tracking-tight"
                    style={{ color: m.hue }}
                  >
                    Custom
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-wider2 text-white/40">
                    quote on request
                  </span>
                </div>

                <p className="mt-5 text-[14px] leading-relaxed text-white/60 sm:text-[14.5px]">
                  {m.blurb}
                </p>

                {/* Includes */}
                <div className="mt-7">
                  <div className="mb-3 font-mono text-[10.5px] uppercase tracking-wider2 text-white/40">
                    What&rsquo;s included
                  </div>
                  <ul className="space-y-2">
                    {m.includes.map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-2.5 text-[13px] text-white/75 sm:text-[13.5px]"
                      >
                        <CheckGlyph color={m.hue} />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fit */}
                <div
                  className="mt-7 rounded-lg border p-3.5"
                  style={{
                    borderColor: `${m.hue}33`,
                    background: `linear-gradient(135deg, ${m.hue}10 0%, rgba(255,255,255,0.01) 100%)`,
                  }}
                >
                  <div
                    className="font-mono text-[10px] uppercase tracking-wider2"
                    style={{ color: m.hue }}
                  >
                    Best fit
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/70">
                    {m.fit}
                  </p>
                </div>

                {/* CTA */}
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-[13px] font-semibold text-white/90 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06]"
                >
                  Talk about {m.name}
                  <ArrowRight />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* "Why we don't publish a price card" */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid items-start gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14"
        >
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-wider2 text-white/45">
              Why no price card?
            </div>
            <h2 className="mt-3 font-display text-[26px] font-semibold leading-[1.15] tracking-tighter text-white sm:text-[32px]">
              Insurance ops aren&rsquo;t one-size.{" "}
              <span className="text-white/55">Neither is our pricing.</span>
            </h2>
          </div>
          <ul className="space-y-3 text-[14.5px] leading-relaxed text-white/65">
            {[
              "Per-tenant pricing — TPAs and insurers don't share economics, and pricing shouldn't pretend they do.",
              "Verticals matter — Health, Life, Motor and Crop each have different volume, SLA and audit profiles.",
              "Channels matter — voice agent + WhatsApp + email is a different cost profile than WhatsApp-only.",
              "Compliance scope matters — IRDAI ombudsman exports, custom DPO reviews and security posture add real engineering.",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan"
                  style={{ boxShadow: "0 0 8px rgba(125,196,255,0.7)" }}
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-20 overflow-hidden rounded-3xl glass-strong p-8 sm:p-12 lg:p-14"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(13,153,255,0.35) 0%, rgba(124,58,237,0.18) 50%, transparent 80%)",
            }}
          />
          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
            <div>
              <h3 className="text-balance font-display text-[28px] font-semibold leading-[1.05] tracking-tightest text-white sm:text-[40px]">
                One call. <span className="text-white/55">A real number.</span>
              </h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/65 sm:text-[16px]">
                Pick a 30-minute slot — tell us your volume, channels and
                target verticals. We&rsquo;ll come back with a real number,
                not a quote-form runaround.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(13,153,255,0.55)]"
              >
                Connect with us
                <ArrowRight />
              </a>
              <a
                href="mailto:contact@gooclaim.com"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium text-white/80 glass transition-all duration-300 hover:text-white hover:border-white/20"
              >
                contact@gooclaim.com
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </PageShell>
  );
}

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-300 group-hover:translate-x-0.5"
    >
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}

function CheckGlyph({ color }: { color: string }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-1 shrink-0"
      style={{ filter: `drop-shadow(0 0 6px ${color}66)` }}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
