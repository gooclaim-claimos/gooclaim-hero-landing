import { motion } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

interface Pillar {
  num: string;
  title: string;
  subtitle: string;
  layer: string;
  gooclaim: string;
  others: string;
  hue: string;
}

const PILLARS: Pillar[] = [
  {
    num: "01",
    title: "Any data source",
    subtitle: "Truth Layer · L2",
    layer: "REST · SOAP · SFTP · Webhook",
    gooclaim:
      "Per-tenant encrypted credentials, circuit-broken, audit on every call.",
    others: "Hardcoded to 1-2 CMS via API.",
    hue: "#0d99ff",
  },
  {
    num: "02",
    title: "Any knowledge layer",
    subtitle: "Sources · L3",
    layer: "50+ connectors built-in",
    gooclaim:
      "Notion, Drive, SharePoint, SQL, S3, Slack, Confluence, past cases, policy PDFs.",
    others: "Single FAQ DB.",
    hue: "#7dc4ff",
  },
  {
    num: "03",
    title: "Any channel",
    subtitle: "L0 + L5",
    layer: "WhatsApp · Voice · SMS · Web · IVR",
    gooclaim:
      "Same conversation thread across channels. Hand-off without losing context.",
    others: "WhatsApp only — or voice only.",
    hue: "#7c3aed",
  },
  {
    num: "04",
    title: "Any workflow",
    subtitle: "L1 + registry.yml",
    layer: "Versioned, hot-swappable",
    gooclaim:
      "Versioned config per tenant — custom flows ship as YAML, not as a new build.",
    others: "Fixed product flows. Custom = new build.",
    hue: "#10b981",
  },
  {
    num: "05",
    title: "Any interaction",
    subtitle: "L0 + Voice agents",
    layer: "Text + Voice + Hybrid",
    gooclaim:
      "Bilingual by default — Hindi · English · Hinglish + regional. Same agent talks AND types.",
    others: "Text-only chatbot — or voice-only IVR.",
    hue: "#f59e0b",
  },
];

const PROOF_CHIPS = [
  { label: "Every output L6-gated", hue: "#10b981" },
  { label: "Templates only — no free text", hue: "#0d99ff" },
  { label: "Immutable audit ledger · 7-yr", hue: "#f59e0b" },
  { label: "Multi-vertical by design", hue: "#7c3aed" },
];

function GooclaimLogo({ size = 88 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className="drop-shadow-[0_8px_28px_rgba(13,153,255,0.55)]"
      aria-hidden
    >
      <path
        d="M24.1475 3.93139C16.8544 3.36 9.71321 6.55027 7.05426 8.21683V24.8484C6.80653 28.8788 9.7 38.3884 23.2557 44.1839C27.2524 42.7384 35.979 37.7353 38.9121 29.2869L33.1636 28.4706C30.9926 33.5505 26.1424 36.5937 23.2557 37.7557C14.3771 33.756 12.3226 27.2462 12.4052 24.4913V11.5329C17.0427 9.69632 22.1657 9.27118 24.1475 9.28819V3.93139Z"
        fill="url(#gc-sol-grad)"
      />
      <path
        d="M22.412 28.7601L34.5341 15.3426V20V23.0972H38.6135L38.9603 15.3426L39.0005 9C36.979 7.2042 30.6264 5.47616 28.0005 5L28.0107 9.37362C29.6953 9.73074 32.668 10.7001 33.0148 10.8531C33.2923 10.9756 33.2956 11.0742 33.2626 11.1082C29.943 14.5604 23.2444 21.5565 23.0066 21.9238C22.7688 22.2912 22.5111 22.2469 22.412 22.1789C21.3386 21.0055 19.1024 18.5771 18.7457 18.2506C18.3889 17.9241 18.0355 18.0805 17.9034 18.1996C17.2758 18.8458 15.9315 20.2403 15.5747 20.6484C15.218 21.0565 15.3931 21.5327 15.5252 21.7198L22.2139 28.7601H22.412Z"
        fill="#00BBFF"
        stroke="#00BBFF"
        strokeWidth="0.6"
      />
      <defs>
        <linearGradient
          id="gc-sol-grad"
          x1="22.9761"
          y1="3.86377"
          x2="22.9761"
          y2="44.1839"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00BBFF" />
          <stop offset="1" stopColor="#3F9CF4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function SolutionBento() {
  return (
    <SectionShell
      id="solution"
      eyebrow="03 · Solution"
      title={
        <>
          An OS.{" "}
          <span className="text-white/55">Not a chatbot.</span>
        </>
      }
      intro="One agentic core, one audit ledger, one runtime — across every channel, every CMS, every workflow."
    >
      {/* Hero block — Logo + One-liner */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl glass-strong p-7 sm:p-10 lg:p-14"
      >
        {/* Background bloom */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(13,153,255,0.35) 0%, rgba(124,58,237,0.18) 50%, transparent 80%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-32 h-[360px] w-[360px] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[auto_1fr] lg:gap-14">
          {/* Logo column */}
          <div className="flex items-center gap-5 lg:flex-col lg:items-start lg:gap-6">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-full opacity-60 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,187,255,0.45) 0%, transparent 70%)",
                }}
              />
              <div className="relative">
                <GooclaimLogo size={88} />
              </div>
            </div>
            <div>
              <div className="font-display text-[24px] font-semibold tracking-tightest text-white sm:text-[28px]">
                Gooclaim <span className="text-white/55">OS</span>
              </div>
              <div className="mt-1 font-mono text-[10.5px] uppercase tracking-wider2 text-white/45">
                v1.0 · multi-agent core
              </div>
            </div>
          </div>

          {/* Tagline column */}
          <div>
            <p className="text-balance font-display text-[22px] font-medium leading-[1.25] tracking-tight text-white sm:text-[28px] lg:text-[32px]">
              <span className="text-gradient-cyan">Any data</span>
              <span className="text-white/30"> · </span>
              <span className="text-gradient-cyan">Any knowledge</span>
              <span className="text-white/30"> · </span>
              <span className="text-gradient-cyan">Any channel</span>
              <span className="text-white/30"> · </span>
              <span className="text-gradient-cyan">Any workflow</span>
              <span className="text-white/30"> · </span>
              <span className="text-gradient-cyan">Any interaction</span>
              <span className="text-white/55">
                {" "}
                — connected into a single audit-grade agent mesh.
              </span>
            </p>

            {/* "Not / Is" chips */}
            <div className="mt-7 flex flex-wrap gap-2">
              {["Not a chatbot", "Not RPA", "Not a CRM"].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.02] px-3 py-1.5 text-[12px] text-white/45 line-through decoration-white/30"
                >
                  {label}
                </span>
              ))}
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold text-ink-950"
                style={{
                  background:
                    "linear-gradient(135deg, #7dc4ff 0%, #0d99ff 100%)",
                  boxShadow: "0 6px 20px -6px rgba(13,153,255,0.55)",
                }}
              >
                An OS.
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 5 Pillars */}
      <motion.div
        variants={stagger(0.05, 0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5"
      >
        {PILLARS.map((p, i) => (
          <motion.article
            key={p.num}
            variants={fadeUp}
            className={`group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/15 sm:p-7 ${
              i < 3 ? "lg:col-span-2" : "lg:col-span-3"
            }`}
          >
            {/* Gradient accent corner */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full opacity-50 blur-3xl transition-opacity duration-700 group-hover:opacity-90"
              style={{ background: `${p.hue}40` }}
            />

            {/* Left vertical accent bar */}
            <div
              aria-hidden
              className="absolute left-0 top-7 h-12 w-[3px] rounded-r"
              style={{
                background: p.hue,
                boxShadow: `0 0 18px ${p.hue}88`,
              }}
            />

            <div className="relative z-10 flex h-full flex-col gap-5">
              {/* Header */}
              <div>
                <div className="flex items-baseline justify-between gap-3">
                  <span
                    className="font-mono text-[11px] uppercase tracking-wider2"
                    style={{ color: p.hue }}
                  >
                    Pillar {p.num}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/35">
                    {p.subtitle}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-[24px] font-semibold leading-[1.1] tracking-tighter text-white sm:text-[28px]">
                  {p.title}
                </h3>
                <div className="mt-2.5 font-mono text-[11.5px] tracking-tight text-white/55">
                  {p.layer}
                </div>
              </div>

              {/* Gooclaim does (positive) */}
              <div className="rounded-lg border border-white/8 bg-white/[0.02] p-3.5">
                <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider2" style={{ color: p.hue }}>
                  <CheckGlyph color={p.hue} /> Gooclaim
                </div>
                <p className="text-[13px] leading-relaxed text-white/75 sm:text-[13.5px]">
                  {p.gooclaim}
                </p>
              </div>

              {/* Others (negative) */}
              <div className="mt-auto flex items-center gap-2 text-[12px] text-white/35">
                <XGlyph />
                <span className="line-through decoration-white/25">{p.others}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* Proof chips strip */}
      <motion.div
        variants={stagger(0.05, 0.06)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
      >
        {PROOF_CHIPS.map((chip) => (
          <motion.div
            key={chip.label}
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[12px] text-white/75 glass"
          >
            <span
              className="inline-flex h-1.5 w-1.5 rounded-full"
              style={{
                background: chip.hue,
                boxShadow: `0 0 10px ${chip.hue}cc`,
              }}
            />
            {chip.label}
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  );
}

function CheckGlyph({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XGlyph() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round">
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}
