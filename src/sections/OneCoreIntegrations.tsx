import { motion } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import ConnectorConstellation from "@/components/ConnectorConstellation";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const CATEGORIES = [
  {
    label: "Channels",
    count: "12+",
    examples: "WhatsApp · Slack · Teams · Gmail · Voice",
    hue: "#0d99ff",
  },
  {
    label: "CMS / Helpdesk",
    count: "14+",
    examples: "ServiceNow · Salesforce · Zendesk · Jira",
    hue: "#7c3aed",
  },
  {
    label: "Knowledge",
    count: "30+",
    examples: "SharePoint · GDrive · Notion · Confluence",
    hue: "#10b981",
  },
  {
    label: "Voice-ready",
    count: "1×",
    examples: "ASR · TTS · IVR · WebRTC",
    hue: "#f59e0b",
  },
];

const MODULES = [
  { name: "Workflow Engine", line: "Multi-agent reasoning per claim." },
  { name: "Truth Layer", line: "Reads any CMS — read-only." },
  { name: "Knowledge Layer", line: "Your policy library, searchable." },
  { name: "Policy Gate", line: "Every reply pre-approved." },
  { name: "Outbound Engine", line: "Templates-only on every channel." },
];

export default function OneCoreIntegrations() {
  return (
    <SectionShell
      id="platform"
      eyebrow="01 · One core"
      title={
        <>
          One agentic core.{" "}
          <span className="text-white/55">
            Any channel. Any CMS. Any source of truth.
          </span>
        </>
      }
      intro="50+ connectors out of the box — your stack, plugged in. A single multi-agent runtime reads every source and replies on every channel, without ever generating free text to a claimant."
    >
      {/* Constellation centerpiece */}
      <div className="relative -mx-2 sm:mx-0">
        <ConnectorConstellation />
      </div>

      {/* Categories legend */}
      <motion.div
        variants={stagger(0.08, 0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-16 grid grid-cols-2 gap-3 sm:mt-20 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-4"
      >
        {CATEGORIES.map((c) => (
          <motion.div
            key={c.label}
            variants={fadeUp}
            className="glass relative overflow-hidden rounded-xl p-4 transition-colors hover:border-white/15"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full opacity-50 blur-2xl"
              style={{ background: `${c.hue}33` }}
            />
            <div className="relative z-10 flex items-baseline justify-between gap-2">
              <div className="font-mono text-[10.5px] uppercase tracking-wider2 text-white/50">
                {c.label}
              </div>
              <div
                className="font-display text-[18px] font-semibold tracking-tight"
                style={{ color: c.hue }}
              >
                {c.count}
              </div>
            </div>
            <div className="relative z-10 mt-2 text-[12px] text-white/55">
              {c.examples}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* "And 30+ more" note */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 flex items-center justify-center gap-2 text-center font-mono text-[10.5px] uppercase tracking-wider2 text-white/40"
      >
        <span className="h-px w-12 bg-white/20" />
        and 50+ more sources via Connector Hub
        <span className="h-px w-12 bg-white/20" />
      </motion.div>

      {/* Bottom: 5 modules of the OS — without L-codes */}
      <div className="mt-16 sm:mt-20">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-white/8" />
          <div className="font-mono text-[10.5px] uppercase tracking-wider2 text-white/45">
            inside the OS
          </div>
          <span className="h-px flex-1 bg-white/8" />
        </div>
        <motion.div
          variants={stagger(0.06, 0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        >
          {MODULES.map((m) => (
            <motion.div
              key={m.name}
              variants={fadeUp}
              className="glass group rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15"
            >
              <div className="font-display text-[15px] font-semibold tracking-tight text-white">
                {m.name}
              </div>
              <div className="mt-1.5 text-[12px] leading-snug text-white/55">
                {m.line}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}
