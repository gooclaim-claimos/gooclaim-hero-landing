import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

interface Module {
  code: string;
  name: string;
  line: string;
  body: string;
  capabilities: string[];
  solves: string;
  hue: string;
}

const MODULES: Module[] = [
  {
    code: "L0",
    name: "Channel Gateway",
    line: "Every claimant message starts here.",
    body: "One inbound layer for every channel a customer actually uses — secure, tenant-scoped, ready out of the box.",
    capabilities: [
      "WhatsApp",
      "Voice agents",
      "SMS · Email · Web",
      "Per-tenant routing",
    ],
    solves: "Channel fragmentation — customer on WhatsApp, agent on portal, no unified view.",
    hue: "#0d99ff",
  },
  {
    code: "L1",
    name: "Workflow Engine",
    line: "Multi-agent claim reasoning.",
    body: "Decides what happens for every claim — which flow runs, when to escalate, how to retry. Built for the multi-day workflows insurance actually needs.",
    capabilities: [
      "Multi-agent reasoning",
      "Multi-day flow durability",
      "Custom flows per tenant",
      "Per-tenant kill-switch",
    ],
    solves: "Workflow chaos — every insurer wants custom logic, no platform supports it.",
    hue: "#7dc4ff",
  },
  {
    code: "L2",
    name: "Truth Layer",
    line: "Read your CMS, never write.",
    body: "Reads from any claims system — modern or legacy — without writing back. Safe by design, audited on every call.",
    capabilities: [
      "Modern + legacy CMS support",
      "Per-tenant encrypted credentials",
      "Per-tenant safety net",
      "Audited on every call",
    ],
    solves: "CMS lock-in — every TPA uses a different system; we connect to all.",
    hue: "#0d99ff",
  },
  {
    code: "L3",
    name: "Knowledge Layer",
    line: "Your policy library, AI-searchable.",
    body: "Connects to wherever your knowledge already lives — and makes all of it searchable in plain language.",
    capabilities: [
      "50+ source connectors",
      "AI-powered semantic search",
      "Hybrid retrieval",
      "Continuously improving",
    ],
    solves: "Knowledge silos — past cases, policy docs, FAQs scattered everywhere.",
    hue: "#7c3aed",
  },
  {
    code: "L4",
    name: "Outbound Engine",
    line: "WhatsApp · Voice · SMS — pre-approved.",
    body: "Sends only pre-approved messages on the channel your customer prefers. One template, every channel — rollback in a click.",
    capabilities: [
      "Channel-aware templates",
      "Built-in approval workflow",
      "Multi-lingual — Hindi · English · Hinglish + regional",
      "One-click rollback",
    ],
    solves: "Outbound chaos — wrong template, wrong language, wrong channel.",
    hue: "#f59e0b",
  },
  {
    code: "L5",
    name: "Policy Gate",
    line: "Compliant by architecture.",
    body: "Every outbound passes a 4-tier safety check before it leaves the platform. Free text never reaches a customer.",
    capabilities: [
      "Exact-template match",
      "Semantic safety check",
      "Personal data redaction",
      "Source verification",
    ],
    solves: "Compliance risk — one wrong message = IRDAI penalty + ombudsman case.",
    hue: "#10b981",
  },
  {
    code: "L6",
    name: "Observability",
    line: "Metrics · Traces · IRDAI exports.",
    body: "Per-tenant dashboards, audit-ready logs, IRDAI export — and SLA tracking for the new 1 hr / 3 hr cashless mandate.",
    capabilities: [
      "Per-tenant dashboards",
      "End-to-end traceability",
      "Audit-ready logs",
      "IRDAI export · DPDP-compliant",
    ],
    solves: "Black box — when something breaks, no one knows why.",
    hue: "#7dc4ff",
  },
];

export default function ModulesSplit() {
  const [active, setActive] = useState(0);
  const m = MODULES[active];

  return (
    <SectionShell
      id="modules"
      eyebrow="04 · Modules"
      title={
        <>
          Seven layers. <span className="text-white/55">One OS.</span>
        </>
      }
      intro="Each layer does one job well. Every layer is multi-tenant, audit-instrumented, and platform-agnostic. Add a new vertical without rewriting the platform."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.15fr] lg:gap-14">
        {/* Left: stack of layers with animated flow line */}
        <motion.div
          variants={stagger(0.06, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative"
        >
          {/* Vertical flow line */}
          <div
            aria-hidden
            className="absolute left-[19px] top-4 bottom-4 w-px"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(13,153,255,0.4) 8%, rgba(125,196,255,0.35) 25%, rgba(124,58,237,0.3) 50%, rgba(16,185,129,0.3) 75%, rgba(245,158,11,0.35) 92%, transparent 100%)",
            }}
          />
          {/* Animated pulse dot traveling down the line */}
          <div
            aria-hidden
            className="absolute left-[18px] h-1.5 w-1.5 rounded-full"
            style={{
              background: "#7dc4ff",
              boxShadow: "0 0 12px rgba(125,196,255,0.9)",
              animation: "gc-flow 6s linear infinite",
              top: 0,
            }}
          />

          <ul className="relative space-y-0.5">
            {MODULES.map((mod, i) => (
              <motion.li key={mod.code} variants={fadeUp}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`group relative flex w-full items-center gap-4 rounded-xl py-3 pl-2 pr-3 text-left transition-all duration-300 ${
                    active === i
                      ? "bg-white/[0.03]"
                      : "hover:bg-white/[0.015]"
                  }`}
                >
                  {/* Code badge */}
                  <span
                    className={`relative z-10 inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg font-mono text-[11px] font-semibold transition-all duration-300 ${
                      active === i ? "text-white" : "text-white/55"
                    }`}
                    style={{
                      background:
                        active === i
                          ? `linear-gradient(135deg, ${mod.hue}33, rgba(7,10,18,0.6))`
                          : "rgba(255,255,255,0.04)",
                      border:
                        active === i
                          ? `1px solid ${mod.hue}80`
                          : "1px solid rgba(255,255,255,0.08)",
                      boxShadow:
                        active === i ? `0 0 18px ${mod.hue}55` : "none",
                    }}
                  >
                    {mod.code}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`font-display text-[16px] font-semibold leading-tight tracking-tight transition-colors duration-300 sm:text-[17px] ${
                        active === i ? "text-white" : "text-white/70"
                      }`}
                    >
                      {mod.name}
                    </div>
                    <div
                      className={`mt-0.5 text-[12.5px] leading-snug transition-colors duration-300 ${
                        active === i ? "text-white/65" : "text-white/40"
                      }`}
                    >
                      {mod.line}
                    </div>
                  </div>
                  {/* Active arrow */}
                  <span
                    className={`ml-auto inline-flex h-5 w-5 shrink-0 items-center justify-center transition-all duration-300 ${
                      active === i ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ color: mod.hue }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right: sticky detail card */}
        <div className="relative">
          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={m.code}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-3xl glass-strong p-8 sm:p-10"
              >
                {/* Hue bloom */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
                  style={{ background: `${m.hue}33` }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-32 -left-32 h-[360px] w-[360px] rounded-full opacity-30 blur-3xl"
                  style={{ background: `${m.hue}22` }}
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex h-9 items-center rounded-lg px-3 font-mono text-[12px] font-semibold tracking-wider2"
                      style={{
                        background: `${m.hue}22`,
                        color: m.hue,
                        border: `1px solid ${m.hue}55`,
                        boxShadow: `0 0 22px ${m.hue}44`,
                      }}
                    >
                      Layer {m.code}
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-wider2 text-white/40">
                      multi-tenant · audit-instrumented
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-[32px] font-semibold leading-[1] tracking-tightest text-white sm:text-[42px]">
                    {m.name}
                  </h3>
                  <p className="mt-3 font-display text-[17px] font-medium leading-snug text-white/75 sm:text-[19px]">
                    {m.line}
                  </p>
                  <p className="mt-5 max-w-md text-[14px] leading-relaxed text-white/55 sm:text-[15px]">
                    {m.body}
                  </p>

                  {/* Capabilities */}
                  <ul className="mt-7 space-y-2.5">
                    {m.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex items-start gap-2.5 text-[13.5px] text-white/70 sm:text-[14px]"
                      >
                        <span
                          className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{
                            background: m.hue,
                            boxShadow: `0 0 8px ${m.hue}cc`,
                          }}
                        />
                        {cap}
                      </li>
                    ))}
                  </ul>

                  {/* Solves */}
                  <div
                    className="mt-8 rounded-xl border p-4 sm:p-5"
                    style={{
                      borderColor: `${m.hue}33`,
                      background: `linear-gradient(135deg, ${m.hue}10 0%, rgba(255,255,255,0.01) 100%)`,
                    }}
                  >
                    <div
                      className="font-mono text-[10.5px] uppercase tracking-wider2"
                      style={{ color: m.hue }}
                    >
                      Solves
                    </div>
                    <p className="mt-2 text-[14px] font-medium leading-relaxed text-white/85 sm:text-[15px]">
                      {m.solves}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Audit Ledger — separate, prominent */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-12 overflow-hidden rounded-3xl border border-amber-500/15 p-8 sm:p-10 lg:p-12"
        style={{
          background:
            "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(13,153,255,0.04) 60%, rgba(7,10,18,0.4) 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-50 blur-3xl"
          style={{ background: "rgba(245,158,11,0.25)" }}
        />

        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-[10.5px] uppercase tracking-wider2 text-amber-400">
              <Lock /> Beside the 7 layers
            </div>
            <h3 className="mt-5 font-display text-[34px] font-semibold leading-[1] tracking-tightest text-white sm:text-[46px]">
              Audit Ledger
            </h3>
            <p className="mt-3 font-display text-[17px] font-medium leading-snug text-white/75 sm:text-[19px]">
              Immutable event store. Every decision, every message, every
              consent.
            </p>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-white/55 sm:text-[15px]">
              If IRDAI asks what happened on claim X at time Y — you have the
              receipt. Append-only, SHA-256 chained, 7-year retention.
              DPDP-compliant.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {[
                "Append-only",
                "SHA-256 chained",
                "7-year retention",
                "IRDAI export",
                "DPDP-native",
              ].map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11.5px] text-white/75"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Right: stamp visualization */}
          <div className="relative">
            <div className="relative mx-auto max-w-[420px]">
              {/* Stack of "event" cards */}
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-2xl border border-white/10 bg-ink-900/60 backdrop-blur"
                  style={{
                    transform: `translateY(${i * 14}px) translateX(${i * 6}px) rotate(${i * 0.6}deg)`,
                    opacity: 1 - i * 0.25,
                    zIndex: 3 - i,
                  }}
                />
              ))}
              {/* Top event card */}
              <div
                className="relative rounded-2xl border border-amber-500/25 bg-ink-900/85 p-5 backdrop-blur"
                style={{
                  boxShadow:
                    "0 18px 60px -12px rgba(245,158,11,0.35), 0 0 0 1px rgba(245,158,11,0.15)",
                  zIndex: 4,
                }}
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider2">
                  <span className="text-amber-400">audit_event</span>
                  <span className="text-white/40">#0x9f3a…b842</span>
                </div>
                <div className="mt-3 space-y-1.5 font-mono text-[11.5px] text-white/70">
                  <div>
                    <span className="text-white/40">type</span>{" "}
                    <span className="text-accent-cyan">CLAIM_STATUS_FETCHED</span>
                  </div>
                  <div>
                    <span className="text-white/40">tenant</span>{" "}
                    <span>4f9d2a1c-8b73-4e6f-9a02-1c5e7d8b3a91</span>
                  </div>
                  <div>
                    <span className="text-white/40">claim_id</span>{" "}
                    <span>sha256:8c4f…e21a</span>
                  </div>
                  <div>
                    <span className="text-white/40">layer</span>{" "}
                    <span className="text-accent-cyan">truth-layer</span>
                  </div>
                  <div>
                    <span className="text-white/40">ts</span>{" "}
                    <span>2026-06-07T14:22:08.142Z</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 border-t border-white/8 pt-3 font-mono text-[10px] uppercase tracking-wider2 text-amber-400/85">
                  <Lock /> sealed · prev_hash 7c1f…
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}

function Lock() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
