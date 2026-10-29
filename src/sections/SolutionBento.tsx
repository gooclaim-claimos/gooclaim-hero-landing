import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { openWaitlist } from "@/lib/waitlist";
import { READ_ONLY, SERVED, type ReadLanguage, type ServedLanguage } from "./demoLanguages";

/**
 * "An OS, not a chatbot" — shown happening to one message, not argued in cards.
 *
 * This section used to be five bento cards, each with a heading, a sub-label, a
 * paragraph of what Gooclaim does and a struck-out line of what others do. Five
 * of the same shape in a row reads as a wall, and every word of it was a claim
 * the reader had to take on trust.
 *
 * The content is the same five pillars. What changed is that they are now the
 * five things that happen to ONE member message on its way through the core,
 * and the message collects a stamp at each one — so by the end the reader has
 * watched the difference instead of being told it. A chatbot would have replied
 * at station one.
 *
 * The claim is CLM-2487, the same claim the home page follows.
 */

interface Station {
  key: string;
  /** The pillar, kept from the bento it replaces. */
  title: string;
  /** The sources or surfaces behind this step. */
  reach: string;
  /** What happens to THIS message here. */
  does: string;
  /** The line it leaves on the message — accumulates as you scroll. */
  stamp: string;
  /** What a chatbot does at this point instead. */
  chatbot: string;
  hue: string;
}

const STATIONS: Station[] = [
  {
    key: "data",
    title: "Any data source",
    reach: "REST · SOAP · SFTP · Webhook · batch file",
    does: "Opens the claim in your own claims system and reads where it actually stands — read-only, with its own encrypted credentials, and the call itself on the record.",
    stamp: "Read from your claims system · read-only",
    chatbot: "A chatbot answers from a FAQ. It has never seen this claim.",
    hue: "#0d99ff",
  },
  {
    key: "knowledge",
    title: "Any knowledge layer",
    reach: "Notion · Drive · SharePoint · SQL · S3 · Slack · policy PDFs",
    does: "Finds what the answer has to rest on — the policy wording, the query letter already sent, the way this was handled last time.",
    stamp: "Query letter sent on day 6 · one document still open",
    chatbot: "One FAQ database, written once, already behind the policy.",
    hue: "#7dc4ff",
  },
  {
    key: "workflow",
    title: "Any workflow",
    reach: "Declared once · versioned · switched on per tenant",
    does: "Runs the workflow your team switched on in the Console. It is declared once and versioned — not rebuilt for each customer, and not edited in a hurry on a Friday.",
    stamp: "Claim status · your switched-on workflow",
    chatbot: "Fixed product flows. Anything different is a new build.",
    hue: "#10b981",
  },
  {
    key: "gate",
    title: "Every word checked",
    reach: "The Policy Gate · on every outbound message",
    does: "Every value in the draft is matched back to the record it came from, and the wording is one your team approved. No match, nothing leaves.",
    stamp: "4 of 4 values matched to the record",
    chatbot: "A chatbot writes a sentence and sends it.",
    hue: "#f59e0b",
  },
  {
    key: "channel",
    title: "Any channel, any interaction",
    reach: "WhatsApp and email today · voice, SMS and web next",
    does: "Leaves on the channel it arrived on, in the language it arrived in. If the member calls next, it is the same thread and the same agent — nothing is explained twice.",
    stamp: "Sent on WhatsApp",
    chatbot: "WhatsApp only, or voice only. Two bots, two threads.",
    hue: "#7c3aed",
  },
];

const PROOF_CHIPS = [
  { label: "Every output through the Policy Gate", hue: "#10b981" },
  { label: "Templates only — no free text", hue: "#0d99ff" },
  { label: "Immutable audit ledger · 10-yr", hue: "#f59e0b" },
  { label: "Built around the claim", hue: "#7c3aed" },
];

/** Which station is crossing the middle of the screen right now. */
function useActiveStation(count: number) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const nodes = refs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = nodes.indexOf(e.target as HTMLElement);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [count]);

  return { active, refs };
}

/**
 * True when the stations cannot pace anything — below `lg` nothing is pinned,
 * and with reduced motion a scroll-paced reveal is exactly what the reader
 * asked not to have. Both cases show the finished message instead.
 */
function useShowAll() {
  const [all, setAll] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const apply = () => setAll(!mq.matches || reduce);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return all;
}

/**
 * The language control.
 *
 * Two rows, not one, because the two groups behave differently and the
 * difference is the honest part: three languages the platform answers in, and
 * nine it can read but will not pretend to answer in. The groups are told
 * apart by their own heading, never by colour alone.
 */
function LanguageBar({
  served,
  onServed,
  asked,
  onAsk,
}: {
  served: ServedLanguage;
  onServed: (l: ServedLanguage) => void;
  asked: ReadLanguage | null;
  onAsk: (l: ReadLanguage | null) => void;
}) {
  return (
    <div>
      <div className="font-display text-[10px] uppercase tracking-wider2 text-white/35">
        Answers in
      </div>
      <div role="group" aria-label="Languages Gooclaim OS answers in" className="mt-2 flex flex-wrap gap-2">
        {SERVED.map((l) => {
          const on = l.code === served.code && !asked;
          return (
            <button
              key={l.code}
              type="button"
              aria-pressed={on}
              onClick={() => {
                onServed(l);
                onAsk(null);
              }}
              className="inline-flex min-h-[40px] items-center rounded-full border px-3.5 text-[13px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50 sm:min-h-[34px]"
              style={
                on
                  ? {
                      borderColor: "rgba(13,153,255,0.5)",
                      background: "rgba(13,153,255,0.12)",
                      color: "#fff",
                    }
                  : {
                      borderColor: "rgba(255,255,255,0.1)",
                      background: "transparent",
                      color: "rgba(255,255,255,0.6)",
                    }
              }
            >
              {l.native}
              {l.native !== l.name ? (
                <span className="ml-1.5 text-[11px] text-white/40">{l.name}</span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="font-display text-[10px] uppercase tracking-wider2 text-white/35">
          Coming next
        </span>
        <span className="text-[11.5px] text-white/30">
          — already read today. Tap the one you need, and we'll talk it through.
        </span>
      </div>
      <div
        role="group"
        aria-label="Languages coming next — tap one to ask for it"
        className="mt-2 flex flex-wrap gap-1.5"
      >
        {READ_ONLY.map((l) => {
          const on = asked?.code === l.code;
          return (
            <button
              key={l.code}
              type="button"
              aria-pressed={on}
              aria-label={`${l.name} — coming next. Ask us for it.`}
              onClick={() => onAsk(on ? null : l)}
              dir={l.rtl ? "rtl" : undefined}
              className="inline-flex min-h-[40px] items-center rounded-full border border-dashed px-3 text-[12.5px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50 sm:min-h-[32px]"
              style={
                on
                  ? {
                      borderColor: "rgba(245,158,11,0.55)",
                      background: "rgba(245,158,11,0.1)",
                      color: "#fff",
                    }
                  : {
                      borderColor: "rgba(255,255,255,0.14)",
                      color: "rgba(255,255,255,0.45)",
                    }
              }
            >
              {l.native}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * What the card shows when one of the nine is picked.
 *
 * Framed as next in line rather than missing — which is the honest reading:
 * the detector already separates these nine today, so switching one on is a
 * config entry plus approved wording, not new engineering. It promises no
 * date, because a date depends on the customer's own template sign-off.
 */
function NotYetPanel({ lang }: { lang: ReadLanguage }) {
  return (
    <div className="mt-5 rounded-2xl border border-amber-500/25 bg-amber-500/[0.05] p-4">
      <div className="flex items-start gap-2.5">
        <svg
          className="mt-[2px] shrink-0"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 7 12 12 15.5 14" />
        </svg>
        <div>
          <p className="text-[13.5px] leading-relaxed text-white/85">
            <span dir={lang.rtl ? "rtl" : undefined}>{lang.native}</span> ({lang.name}) is{" "}
            <span className="font-semibold text-white">next in line</span> — Gooclaim OS
            already reads it today.
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-white/55">
            Switching it on is a config entry and your approved wording — not a rebuild.
            Until it is on, a member writing in {lang.name} is told so in {lang.name}, never
            answered in a language they did not write in, and the claim keeps moving.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          openWaitlist(`language-request-${lang.code}`, {
            eyebrow: "Language request",
            headline: `Should ${lang.name} go live next?`,
            subhead:
              "Tell us your claim volume and which channels, and we'll talk through what it would take for this language.",
          })
        }
        className="group mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-amber-500/35 bg-amber-500/[0.08] px-4 text-[13.5px] font-semibold text-white transition-colors hover:bg-amber-500/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50"
      >
        Put {lang.name} on the roadmap — tell the team
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
          &rarr;
        </span>
      </button>
    </div>
  );
}

/** The member's message, collecting a stamp at each station. */
function TravellingMessage({
  done,
  total,
  lang,
}: {
  done: number;
  total: number;
  lang: ServedLanguage;
}) {
  const finished = done >= total;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-7">
      <div className="flex items-baseline justify-between">
        <span className="font-display text-[10.5px] uppercase tracking-wider2 text-white/40">
          Inbound · WhatsApp
        </span>
        <span className="font-mono text-[11px] text-white/35">CLM-2487</span>
      </div>

      {/* what the member actually sent */}
      <motion.div
        key={lang.code}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 rounded-2xl rounded-tl-md border border-white/[0.08] bg-white/[0.04] p-4"
      >
        <p className="text-[14.5px] leading-relaxed text-white/85">“{lang.inbound}”</p>
        <div className="mt-2 font-display text-[10px] uppercase tracking-wider2 text-white/30">
          {lang.name} · registered number
        </div>
      </motion.div>

      <div className="mt-6 font-display text-[10px] uppercase tracking-wider2 text-white/35">
        What the OS did with it
      </div>

      <ol className="mt-3 space-y-2.5">
        {STATIONS.map((s, i) => {
          const on = i < done;
          // The last stamp names the language the reply went out in.
          const text = i === STATIONS.length - 1 ? lang.sentStamp : s.stamp;
          return (
            <li key={s.key} className="flex items-start gap-3">
              <motion.span
                animate={{ opacity: on ? 1 : 0.22, scale: on ? 1 : 0.75 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-[3px] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                style={{
                  border: `1px solid ${on ? s.hue : "rgba(255,255,255,0.2)"}`,
                  background: on ? `${s.hue}22` : "transparent",
                  boxShadow: on ? `0 0 12px ${s.hue}55` : undefined,
                }}
              >
                {on ? (
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={s.hue}
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : null}
              </motion.span>
              <motion.span
                animate={{ opacity: on ? 1 : 0.3 }}
                transition={{ duration: 0.35 }}
                className={`text-[13px] leading-snug ${on ? "text-white/80" : "text-white/35"}`}
              >
                {text}
              </motion.span>
            </li>
          );
        })}
      </ol>

      {/* the reply, only once every station has stamped it */}
      <motion.div
        animate={{ opacity: finished ? 1 : 0.18 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 border-t border-white/[0.08] pt-5"
      >
        <div className="font-display text-[10px] uppercase tracking-wider2 text-white/35">
          Outbound · approved wording
        </div>
        <div
          className="mt-3 rounded-2xl rounded-tr-md border p-4"
          style={{
            borderColor: finished ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.08)",
            background: finished ? "rgba(16,185,129,0.06)" : "transparent",
          }}
        >
          <p className="text-[14px] leading-relaxed text-white/85">{lang.outbound}</p>
        </div>
      </motion.div>
    </div>
  );
}

function StationBlock({
  station,
  index,
  active,
  innerRef,
}: {
  station: Station;
  index: number;
  active: boolean;
  innerRef: (el: HTMLElement | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section
      ref={(el) => {
        innerRef(el);
        (ref as React.MutableRefObject<HTMLDivElement | null>).current =
          el as HTMLDivElement | null;
      }}
      // No runway below `lg` — nothing is pinned there, so the tall block the
      // desktop needs to pace a step is just dead space on a phone.
      className="relative flex flex-col justify-center py-8 lg:min-h-[62vh] lg:py-10"
      aria-label={station.title}
    >
      {/* the number, sitting behind the words */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-2 top-2 select-none font-display text-[104px] font-bold leading-none tracking-tighter transition-colors duration-500 lg:text-[128px]"
        style={{ color: active ? `${station.hue}1f` : "rgba(255,255,255,0.035)" }}
      >
        {index + 1}
      </span>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={seen ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <div className="flex items-center gap-2.5">
          <motion.span
            animate={{ scale: active ? 1 : 0.6, opacity: active ? 1 : 0.35 }}
            transition={{ duration: 0.4 }}
            className="h-2 w-2 rounded-full"
            style={{ background: station.hue, boxShadow: `0 0 12px ${station.hue}` }}
          />
          <span className="font-display text-[10.5px] uppercase tracking-wider2 text-white/40">
            Step {index + 1} of {STATIONS.length}
          </span>
        </div>

        <h3 className="mt-3 text-balance font-display text-[28px] font-semibold leading-[1.1] tracking-tighter text-white sm:text-[36px]">
          {station.title}
        </h3>

        <div className="mt-3 font-display text-[11.5px] tracking-tight text-white/45">
          {station.reach}
        </div>

        <div className="mt-6 max-w-[48ch] border-l-2 pl-5" style={{ borderColor: station.hue }}>
          <p className="text-[15.5px] leading-relaxed text-white/90">{station.does}</p>
        </div>

        {/* the quiet half — what the thing they are being sold instead does here */}
        <p className="mt-5 flex max-w-[46ch] items-start gap-2 text-[13.5px] leading-relaxed text-white/40">
          <svg
            className="mt-[5px] shrink-0"
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2.4"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
          {station.chatbot}
        </p>
      </motion.div>
    </section>
  );
}

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

export default function SolutionBento({ eyebrow = "03 · Solution" }: { eyebrow?: string } = {}) {
  const { active, refs } = useActiveStation(STATIONS.length);
  const showAll = useShowAll();
  const done = showAll ? STATIONS.length : active + 1;
  const current = STATIONS[active] ?? STATIONS[0];

  // English leads, because that is the language this page is read in.
  const [lang, setLang] = useState<ServedLanguage>(SERVED[0]);
  // A language we only read, when the visitor has picked one to ask about.
  const [asked, setAsked] = useState<ReadLanguage | null>(null);

  return (
    <SectionShell
      id="solution"
      eyebrow={eyebrow}
      title={
        <>
          An OS.{" "}
          <span className="text-white/55">Not a chatbot.</span>
        </>
      }
      intro="One agentic core, one audit ledger, one runtime — across every channel, every CMS, every workflow."
    >
      {/* The thesis line, stated once */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-clip rounded-3xl glass-strong p-7 sm:p-10 lg:p-12"
      >
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
            background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[auto_1fr] lg:gap-14">
          <div className="flex items-center gap-5 lg:flex-col lg:items-start lg:gap-6">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-full opacity-60 blur-2xl"
                style={{
                  background: "radial-gradient(circle, rgba(0,187,255,0.45) 0%, transparent 70%)",
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
              <div className="mt-1 font-display text-[10.5px] uppercase tracking-wider2 text-white/45">
                v1.0 · multi-agent core
              </div>
            </div>
          </div>

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
                  background: "linear-gradient(135deg, #7dc4ff 0%, #0d99ff 100%)",
                  boxShadow: "0 6px 20px -6px rgba(13,153,255,0.55)",
                }}
              >
                An OS.
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* The difference, happening to one message */}
      <div className="mt-20">
        <h3 className="text-balance font-display text-[26px] font-semibold leading-tight tracking-tighter text-white sm:text-[34px]">
          One message, on a Sunday.{" "}
          <span className="text-white/55">Five things happen before it is answered.</span>
        </h3>
        <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-white/55">
          Switch the language the member writes in. Gooclaim OS answers in English, Hindi
          and Hinglish today, and nine more are next in line — already read, waiting only on
          a customer who needs them. Tap one to tell us it is yours.
        </p>

        {/* The language control, full width so nine scripts sit on one line */}
        <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
          <LanguageBar served={lang} onServed={setLang} asked={asked} onAsk={setAsked} />
          {asked ? <NotYetPanel lang={asked} /> : null}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:gap-14">
          <div className="relative order-2 lg:order-1">
            {/* the spine, filling as you go */}
            <div
              aria-hidden
              className="absolute -left-6 top-0 hidden h-full w-px bg-white/[0.07] lg:block"
            >
              <motion.div
                className="w-px"
                animate={{
                  height: `${((active + 1) / STATIONS.length) * 100}%`,
                  backgroundColor: current.hue,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {STATIONS.map((s, i) => (
              <StationBlock
                key={s.key}
                station={s}
                index={i}
                active={!showAll && i === active}
                innerRef={(el) => {
                  refs.current[i] = el;
                }}
              />
            ))}
          </div>

          {/* The message, held still while the stations pass it.
              On a phone it sits above the stations with every stamp already on
              it — nothing is pinned there, so a reveal paced by scroll would
              simply never finish. */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-[11vh] lg:h-fit lg:self-start">
            <TravellingMessage done={done} total={STATIONS.length} lang={lang} />
            <p className="mt-4 text-[12px] leading-relaxed text-white/35">
              Each of those five lines is a row in the audit ledger, with the
              claim it belongs to and the time it happened.
            </p>
          </div>
        </div>
      </div>

      {/* Proof chips strip */}
      <motion.div
        variants={stagger(0.05, 0.06)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
      >
        {PROOF_CHIPS.map((chip) => (
          <motion.div
            key={chip.label}
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[12px] text-white/75 glass"
          >
            <span
              className="inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: chip.hue, boxShadow: `0 0 10px ${chip.hue}cc` }}
            />
            {chip.label}
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  );
}
