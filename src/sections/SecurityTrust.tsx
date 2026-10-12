import { motion } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

interface Item {
  title: string;
  body: string;
  hue: string;
  Icon: () => JSX.Element;
}

const ico = "h-[16px] w-[16px]";
const svg = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function IconRead() {
  return (
    <svg viewBox="0 0 24 24" className={ico} {...svg}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function IconKey() {
  return (
    <svg viewBox="0 0 24 24" className={ico} {...svg}>
      <circle cx="8" cy="15" r="4" /><path d="M10.8 12.2L20 3M16 7l3 3M14 9l2 2" />
    </svg>
  );
}
function IconMask() {
  return (
    <svg viewBox="0 0 24 24" className={ico} {...svg}>
      <rect x="3" y="6" width="18" height="12" rx="2" /><path d="M7 12h.01M11 12h.01M15 12h2" />
    </svg>
  );
}
function IconConsent() {
  return (
    <svg viewBox="0 0 24 24" className={ico} {...svg}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function IconRole() {
  return (
    <svg viewBox="0 0 24 24" className={ico} {...svg}>
      <circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
    </svg>
  );
}
function IconLedger() {
  return (
    <svg viewBox="0 0 24 24" className={ico} {...svg}>
      <rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h4" />
    </svg>
  );
}

const ITEMS: Item[] = [
  {
    title: "Read-only to your claims system",
    body: "Gooclaim reads your record to answer — it never writes back to it. Your system stays the source of truth.",
    hue: "#0d99ff",
    Icon: IconRead,
  },
  {
    title: "Your data, your own key",
    body: "Each customer's data is kept apart and encrypted with its own key. No customer can reach another's.",
    hue: "#7c3aed",
    Icon: IconKey,
  },
  {
    title: "Personal numbers masked",
    body: "Aadhaar, PAN, card and bank numbers are masked before anything is stored. Contact details never reach a log.",
    hue: "#f59e0b",
    Icon: IconMask,
  },
  {
    title: "Consent, then verification",
    body: "DPDP consent before any claim detail, and a one-time code to the registered mobile before anything personal.",
    hue: "#10b981",
    Icon: IconConsent,
  },
  {
    title: "Access by role",
    body: "Your team signs in with multi-factor authentication, and each person sees only what their role allows.",
    hue: "#7dc4ff",
    Icon: IconRole,
  },
  {
    title: "Every action on the record",
    body: "Every message, decision and consent in an append-only, tamper-evident ledger — kept for as long as the regulator requires.",
    hue: "#ef4444",
    Icon: IconLedger,
  },
];

export default function SecurityTrust({ eyebrow = "09 · Security & data" }: { eyebrow?: string } = {}) {
  return (
    <SectionShell
      id="security"
      eyebrow={eyebrow}
      title={
        <>
          Built for regulated data.{" "}
          <span className="text-white/55">From the first message.</span>
        </>
      }
      intro="Claims data is health data. Every layer of the OS is designed around what IRDAI and the DPDP Act expect — not bolted on after."
    >
      <motion.div
        variants={stagger(0.06, 0.07)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
      >
        {ITEMS.map((it) => (
          <motion.article
            key={it.title}
            variants={fadeUp}
            className="group relative overflow-clip rounded-2xl glass p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/15"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-80"
              style={{ background: `${it.hue}33` }}
            />
            <div className="relative z-10">
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg"
                style={{ background: `${it.hue}22`, color: it.hue, border: `1px solid ${it.hue}44` }}
              >
                <it.Icon />
              </span>
              <h3 className="mt-4 font-display text-[18px] font-semibold leading-snug tracking-tight text-white">
                {it.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">{it.body}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  );
}
