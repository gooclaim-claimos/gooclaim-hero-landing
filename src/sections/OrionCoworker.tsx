import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

type Key = "pulse" | "brief" | "step" | "ask" | "docs";

interface Capability {
  key: Key;
  name: string;
  line: string;
  hue: string;
  Icon: () => JSX.Element;
}

const ico = "h-[15px] w-[15px]";
function IconPulse() {
  return (
    <svg viewBox="0 0 24 24" className={ico} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12h4l3-8 4 16 3-8h4" />
    </svg>
  );
}
function IconBrief() {
  return (
    <svg viewBox="0 0 24 24" className={ico} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}
function IconStep() {
  return (
    <svg viewBox="0 0 24 24" className={ico} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
    </svg>
  );
}
function IconAsk() {
  return (
    <svg viewBox="0 0 24 24" className={ico} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" />
    </svg>
  );
}
function IconDocs() {
  return (
    <svg viewBox="0 0 24 24" className={ico} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" />
    </svg>
  );
}

const CAPABILITIES: Capability[] = [
  {
    key: "pulse",
    name: "Work Pulse",
    line: "What needs a person, why, and how long the legal clock has left — not a queue of every claim.",
    hue: "#0d99ff",
    Icon: IconPulse,
  },
  {
    key: "brief",
    name: "Live Claim Brief",
    line: "One read of the claim from your record — documents, decision, complaints, what the member was told — each with its source and date.",
    hue: "#7dc4ff",
    Icon: IconBrief,
  },
  {
    key: "step",
    name: "Next Safe Step",
    line: "Rules decide the step, Orion explains it with the evidence. Hand over, escalate, ask the member again — a person says yes.",
    hue: "#10b981",
    Icon: IconStep,
  },
  {
    key: "ask",
    name: "Ask Orion",
    line: "Questions answered from your own policy library, every sentence quoted word for word and opened at the page.",
    hue: "#7c3aed",
    Icon: IconAsk,
  },
  {
    key: "docs",
    name: "Document Desk",
    line: "The member's uploaded files, opened where they are — every opening recorded.",
    hue: "#f59e0b",
    Icon: IconDocs,
  },
];

const PRINCIPLES = [
  { label: "Reads the record every time", hue: "#0d99ff" },
  { label: "Suggests with evidence", hue: "#10b981" },
  { label: "A person says yes", hue: "#f59e0b" },
  { label: "Every answer through the Policy Gate", hue: "#7c3aed" },
];

// ── The preview's views (sample data — never a real member) ─────────────────

function Chip({ text, tone }: { text: string; tone: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 font-display text-[10.5px] font-semibold uppercase tracking-wider"
      style={{ color: tone, background: `${tone}1a`, border: `1px solid ${tone}55` }}
    >
      {text}
    </span>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-white/10 bg-white/[0.025] p-3.5">
      {children}
    </div>
  );
}

function PulseView() {
  return (
    <div className="space-y-2.5">
      {[
        { claim: "CLM-24817", why: "Documents still outstanding", sub: "Reimbursement · 2 of 3 received · reminder 2 sent", clock: "Past 15 days", tone: "#ef4444", extra: "₹410 interest est. · India" },
        { claim: "CLM-24833", why: "Uploaded file held for checking", sub: "Reimbursement · final bill · awaiting review", clock: "13 days left", tone: "#10b981", extra: "Raised automatically" },
        { claim: "CLM-24790", why: "Open complaint after a decision", sub: "Rejected · complaint received · resolve by 28 Oct", clock: "12 days left", tone: "#f59e0b", extra: "Needs an owner" },
      ].map((r) => (
        <Row key={r.claim}>
          <div className="min-w-0">
            <div className="text-[14px] font-semibold leading-snug text-white">{r.claim} · {r.why}</div>
            <div className="mt-0.5 text-[12px] text-white/50">{r.sub}</div>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Chip text={r.clock} tone={r.tone} />
            <span className="text-[11.5px] text-white/45">{r.extra}</span>
          </div>
        </Row>
      ))}
    </div>
  );
}

function BriefView() {
  const facts = [
    { k: "Status", v: "Under review", src: "Your claims system · updated 3 Oct" },
    { k: "Hospital bill", v: "Received", src: "Your claims system · 30 Sep" },
    { k: "Discharge summary", v: "Still owed · sent by member 5 Oct", src: "Upload · scanned, accepted" },
    { k: "Legal clock", v: "Reimbursement · past 15 days", src: "India's IRDAI clock · from intimation" },
    { k: "Member was told", v: "Reminder 2 · email · 9 Oct", src: "Conversation record" },
  ];
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[14px] font-semibold text-white">CLM-24817 · Live Claim Brief</div>
        <span className="font-display text-[10px] uppercase tracking-wider2 text-white/40">Read just now</span>
      </div>
      <dl className="mt-3 divide-y divide-white/[0.06]">
        {facts.map((f) => (
          <div key={f.k} className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] gap-3 py-2.5">
            <dt className="text-[12px] text-white/45">{f.k}</dt>
            <dd className="min-w-0">
              <div className="text-[13px] font-medium text-white/90">{f.v}</div>
              <div className="mt-0.5 font-display text-[10px] uppercase tracking-wider text-white/35">{f.src}</div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function StepView() {
  const [answer, setAnswer] = useState<"none" | "yes" | "no">("none");
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: "linear-gradient(135deg, rgba(16,185,129,0.10) 0%, rgba(13,153,255,0.05) 100%)",
        border: "1px solid rgba(16,185,129,0.30)",
      }}
    >
      <div className="font-display text-[10px] uppercase tracking-wider2" style={{ color: "#10b981" }}>
        Next safe step · CLM-24817
      </div>
      <div className="mt-2 text-[15px] font-semibold leading-snug text-white">
        Ask the member again for the discharge summary
      </div>
      <div className="mt-1.5 text-[12.5px] leading-relaxed text-white/55">
        Two reminders sent, one document still owed, clock past its limit. Source: your claims system, updated 3 Oct.
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {answer === "none" ? (
          <motion.div
            key="ask"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mt-3.5 flex flex-wrap gap-2"
          >
            <button
              type="button"
              onClick={() => setAnswer("yes")}
              className="inline-flex min-h-[40px] items-center rounded-full bg-white px-4 text-[12.5px] font-semibold text-ink-950 transition-transform duration-200 hover:-translate-y-0.5"
            >
              Yes, ask again
            </button>
            <button
              type="button"
              onClick={() => setAnswer("no")}
              className="inline-flex min-h-[40px] items-center rounded-full px-4 text-[12.5px] font-medium text-white/75 glass transition-colors duration-200 hover:text-white"
            >
              Not now
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mt-3.5 rounded-lg border border-white/10 bg-white/[0.03] p-3"
            role="status"
          >
            <div className="text-[13px] font-semibold text-white">
              {answer === "yes" ? "Done — the member was asked again." : "Noted — Orion won't suggest it again today."}
            </div>
            <div className="mt-1 text-[12px] leading-relaxed text-white/55">
              {answer === "yes"
                ? "Sent through the claim's own approved reminder, after a fresh read of the record. Recorded in the audit ledger."
                : "Your answer is recorded. The claim stays on your Work Pulse with its clock."}
            </div>
            <button
              type="button"
              onClick={() => setAnswer("none")}
              className="mt-2 font-display text-[10.5px] uppercase tracking-wider2 text-white/45 underline decoration-white/20 underline-offset-4 hover:text-white/70"
            >
              Replay
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AskView() {
  return (
    <div className="space-y-3">
      <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[13px] text-white/85">
        Is a discharge summary required for a reimbursement claim?
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
        <div className="font-display text-[10px] uppercase tracking-wider2" style={{ color: "#7c3aed" }}>
          Orion · from your library
        </div>
        <p className="mt-2 text-[13.5px] leading-relaxed text-white/85">
          Yes. The policy lists the hospital&rsquo;s discharge summary among the documents a reimbursement claim needs{" "}
          <span className="rounded px-1 font-display text-[11px]" style={{ color: "#7c3aed", background: "rgba(124,58,237,0.15)" }}>
            [1]
          </span>
          .
        </p>
        <div className="mt-3 rounded-lg border-l-2 bg-white/[0.03] px-3 py-2.5" style={{ borderColor: "#7c3aed" }}>
          <div className="text-[12.5px] italic leading-relaxed text-white/70">
            &ldquo;&hellip;the discharge summary issued by the hospital, in original&hellip;&rdquo;
          </div>
          <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">
            <span className="font-display text-[10px] uppercase tracking-wider text-white/40">[1] Members&rsquo; policy library · page 4</span>
            <span className="font-display text-[10px] uppercase tracking-wider" style={{ color: "#7c3aed" }}>Open at page 4 →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocsView() {
  const files = [
    { name: "Discharge summary", meta: "PDF · 2 pages · 5 Oct", state: "Accepted · scanned", tone: "#10b981" },
    { name: "Final bill", meta: "JPG · 1 page · 5 Oct", state: "Held for checking", tone: "#f59e0b" },
    { name: "Hospital bill", meta: "PDF · 3 pages · 30 Sep", state: "With the TPA", tone: "#0d99ff" },
  ];
  return (
    <div className="space-y-2.5">
      {files.map((f) => (
        <Row key={f.name}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `${f.tone}1f`, color: f.tone, border: `1px solid ${f.tone}44` }}>
                <IconDocs />
              </span>
              <div className="min-w-0">
                <div className="text-[13.5px] font-semibold text-white">{f.name}</div>
                <div className="text-[11.5px] text-white/45">{f.meta}</div>
              </div>
            </div>
            <Chip text={f.state} tone={f.tone} />
          </div>
        </Row>
      ))}
      <div className="px-1 font-display text-[10px] uppercase tracking-wider2 text-white/35">
        Opened where it lives · every opening recorded
      </div>
    </div>
  );
}

const VIEWS: Record<Key, { title: string; View: () => JSX.Element }> = {
  pulse: { title: "Orion · Work Pulse", View: PulseView },
  brief: { title: "Orion · Claim Room", View: BriefView },
  step: { title: "Orion · Claim Room", View: StepView },
  ask: { title: "Orion · Ask Orion", View: AskView },
  docs: { title: "Orion · Document Desk", View: DocsView },
};

function OrionPreview({ active }: { active: Capability }) {
  const { title, View } = VIEWS[active.key];
  return (
    <div className="relative overflow-clip rounded-2xl glass-strong p-5 sm:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full opacity-60 blur-3xl transition-colors duration-700"
        style={{ background: `${active.hue}38` }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-display text-[10.5px] uppercase tracking-wider2" style={{ color: active.hue }}>
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full opacity-70 blur-[2px] animate-pulse-soft" style={{ background: active.hue }} />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: active.hue }} />
            </span>
            {title}
          </div>
          <span className="font-display text-[10px] uppercase tracking-wider2 text-white/35">Sample data</span>
        </div>
        <div className="mt-5" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <View />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function OrionCoworker({ eyebrow = "06 · Orion" }: { eyebrow?: string } = {}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = CAPABILITIES[activeIdx];

  return (
    <SectionShell
      id="orion"
      eyebrow={eyebrow}
      title={
        <>
          Orion.{" "}
          <span className="text-white/55">Your team&rsquo;s AI claims coworker.</span>
        </>
      }
      intro="Gooclaim OS answers your members. Orion works beside your staff — it reads the claim, prepares the next safe step with its evidence, and acts only when a person says yes. It never decides a claim."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14">
        <motion.ul
          variants={stagger(0.06, 0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="space-y-3"
        >
          {CAPABILITIES.map((c, i) => {
            const on = i === activeIdx;
            return (
              <motion.li key={c.key} variants={fadeUp}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActiveIdx(i)}
                  onMouseEnter={() => setActiveIdx(i)}
                  onFocus={() => setActiveIdx(i)}
                  className={`group relative flex w-full gap-4 overflow-clip rounded-2xl p-5 text-left transition-all duration-500 ${
                    on ? "glass-strong -translate-y-0.5" : "glass hover:-translate-y-0.5 hover:border-white/15"
                  }`}
                  style={on ? { borderColor: `${c.hue}66`, boxShadow: `0 0 30px ${c.hue}1f` } : undefined}
                >
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full blur-3xl transition-opacity duration-700 ${
                      on ? "opacity-90" : "opacity-40 group-hover:opacity-70"
                    }`}
                    style={{ background: `${c.hue}33` }}
                  />
                  <span
                    className="relative z-10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${c.hue}22`, color: c.hue, border: `1px solid ${c.hue}44` }}
                  >
                    <c.Icon />
                  </span>
                  <span className="relative z-10 block min-w-0">
                    <span className={`block font-display text-[17px] font-semibold tracking-tight ${on ? "text-white" : "text-white/80"}`}>
                      {c.name}
                    </span>
                    <span className={`mt-1 block text-[13.5px] leading-relaxed ${on ? "text-white/65" : "text-white/50"}`}>
                      {c.line}
                    </span>
                  </span>
                </button>
                {/* Phone: the preview opens under the chosen feature. */}
                {on && (
                  <div className="mt-3 lg:hidden">
                    <OrionPreview active={c} />
                  </div>
                )}
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:sticky lg:top-24 lg:block"
        >
          <OrionPreview active={active} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
      >
        {PRINCIPLES.map((p) => (
          <span
            key={p.label}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] text-white/70 glass"
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.hue }} />
            {p.label}
          </span>
        ))}
      </motion.div>
    </SectionShell>
  );
}
