import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { MailIcon, TelegramIcon, WhatsAppIcon } from "@/components/BrandIcons";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import type { Market } from "@/lib/market";
import { CONVERSATIONS, LANGS, type Channel, type Lang, type Message } from "@/data/memberConversations";
import MemberVoiceCall, { PhoneIcon } from "./MemberVoiceCall";

function SmsIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 10h.01M12 10h.01M16 10h.01" />
    </svg>
  );
}
// Voice has its own tab now (early access); there is no web chat channel.
const SOON = [
  { label: "SMS", Icon: SmsIcon },
  { label: "Telegram", Icon: TelegramIcon },
];

const CHANNELS: {
  key: Channel;
  label: string;
  line: string;
  Icon: (p: { size?: number; className?: string }) => JSX.Element;
  ring: string;
  /** Built, offered to early customers, not yet run by any — never "live". */
  early?: boolean;
}[] = [
  { key: "whatsapp", label: "WhatsApp", line: "WhatsApp · Claims desk", Icon: WhatsAppIcon, ring: "#25D366" },
  { key: "email", label: "Email", line: "Email · Claims desk", Icon: MailIcon, ring: "#0d99ff" },
  { key: "voice", label: "Voice", line: "Voice agent · Claims line", Icon: PhoneIcon, ring: "#a78bfa", early: true },
];

const POINTS = [
  { label: "Consent first", body: "Consent before a single claim detail.", hue: "#10b981" },
  { label: "Verified", body: "On WhatsApp, the registered number. On email and calls, a code sent to it first.", hue: "#0d99ff" },
  { label: "Source & date", body: "Every answer names whose record it read, and when.", hue: "#7dc4ff" },
  { label: "Never free text", body: "Messages use approved wording only, in the member's language.", hue: "#f59e0b" },
];

// On a call the agent speaks from the claim rather than a template, so the
// fourth promise is a different one there (gooclaim-voice turn/prompt.py).
const VOICE_POINT = {
  label: "Facts only",
  body: "On a call, the agent answers only from the member's own claim — and says so when it cannot see an answer.",
  hue: "#f59e0b",
};


function Bubble({ m, lang }: { m: Message; lang: string }) {
  const mine = m.from === "member";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${mine ? "items-end" : "items-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
          mine ? "rounded-br-md bg-[#0d99ff] text-paper" : "rounded-bl-md border border-white/10 bg-white/[0.06] text-white/90"
        }`}
        lang={lang}
      >
        {m.text}
        {m.link && (
          <span className="mt-2 flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2 text-[12.5px] font-semibold text-accent-cyan">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M17 8l-5-5-5 5" /><path d="M12 3v12" />
            </svg>
            {m.link}
          </span>
        )}
      </div>
      {m.note && (
        <span className="mt-1 px-1 font-display text-[10px] uppercase tracking-wider2 text-white/40">{m.note}</span>
      )}
    </motion.div>
  );
}

function Mail({ m, lang }: { m: Message; lang: string }) {
  const mine = m.from === "member";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col"
    >
      <div
        className={`rounded-xl border px-3.5 py-3 ${
          mine ? "border-[#0d99ff]/25 bg-[#0d99ff]/[0.08]" : "border-white/10 bg-white/[0.05]"
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
              mine ? "bg-[#0d99ff] text-paper" : "bg-white/10 text-white/80"
            }`}
            aria-hidden
          >
            {mine ? "M" : "C"}
          </span>
          <span className="truncate text-[12px] font-semibold text-white/90">
            {mine ? "Member" : "Your insurer · Claims"}
          </span>
          <span className="ml-auto shrink-0 text-[10.5px] text-white/35">Re: My claim</span>
        </div>
        <p lang={lang} className="mt-2 text-[12.5px] leading-relaxed text-white/80">{m.text}</p>
        {m.link && (
          <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[12px] font-semibold text-accent-cyan">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M17 8l-5-5-5 5" /><path d="M12 3v12" />
            </svg>
            <span lang={lang}>{m.link}</span>
          </span>
        )}
      </div>
      {m.note && (
        <span className="mt-1 px-1 font-display text-[10px] uppercase tracking-wider2 text-white/40">{m.note}</span>
      )}
    </motion.div>
  );
}

/** A row of choices with a sliding highlight — the channel and the language. */
function Segmented<K extends string>({
  label,
  options,
  value,
  onChange,
  id,
}: {
  label: string;
  options: { key: K; node: ReactNode; lang?: string }[];
  value: K;
  onChange: (k: K) => void;
  id: string;
}) {
  return (
    <div role="group" aria-label={label} className="relative z-10 mx-auto flex w-fit max-w-full gap-1 rounded-full p-1 glass">
      {options.map((o) => {
        const on = o.key === value;
        return (
          <button
            key={o.key}
            type="button"
            lang={o.lang}
            aria-pressed={on}
            onClick={() => onChange(o.key)}
            className={`relative inline-flex min-h-[40px] cursor-pointer touch-manipulation items-center gap-1.5 rounded-full px-3 text-[12.5px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70 sm:gap-2 sm:px-4 ${
              on ? "text-white" : "text-white/60 hover:text-white"
            }`}
          >
            {on && (
              <motion.span
                layoutId={`${id}-on`}
                aria-hidden
                className="absolute inset-0 rounded-full bg-white/[0.12] ring-1 ring-white/15"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative z-10 inline-flex items-center gap-1.5 sm:gap-2">{o.node}</span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * The conversation is paced by the reader, not by a clock.
 *
 * It used to run on a timer once in view: a visitor who looked away missed
 * messages, and a fast reader waited. Scroll position drives it instead, so
 * the thread moves exactly as far as the reader has come — and stopping
 * stops it. Switching the channel or the language keeps the reader's place.
 */
function Phone({
  channel,
  setChannel,
  lang,
  setLang,
  shown,
}: {
  channel: Channel;
  setChannel: (c: Channel) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  shown: number;
}) {
  const conversation = CONVERSATIONS[channel][lang];
  const meta = CHANNELS.find((c) => c.key === channel) ?? CHANNELS[0];
  const language = LANGS.find((l) => l.key === lang) ?? LANGS[0];
  const thread = `${channel}-${lang}`;
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Keep the newest message in view, inside the phone only.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [shown, thread]);
  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      <div className="relative z-10 mb-4 space-y-2">
        <Segmented
          id="channel"
          label="Choose a channel"
          value={channel}
          onChange={setChannel}
          options={CHANNELS.map((c) => ({ key: c.key, node: <><c.Icon size={15} />{c.label}</> }))}
        />
        <Segmented
          id="language"
          label="Choose a language"
          value={lang}
          onChange={setLang}
          options={LANGS.map((l) => ({ key: l.key, node: l.label, lang: l.htmlLang }))}
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(13,153,255,0.22) 0%, rgba(124,58,237,0.12) 50%, transparent 75%)" }}
      />
      <div className="relative rounded-[2.4rem] border border-white/15 bg-ink-900 p-2.5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]">
        <div className="overflow-clip rounded-[1.9rem] border border-white/10 bg-ink-950">
          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <span
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1"
              style={{ background: `${meta.ring}26`, ["--tw-ring-color" as string]: `${meta.ring}4d` }}
            >
              <meta.Icon size={18} />
            </span>
            <div className="min-w-0">
              <div className="truncate text-[13.5px] font-semibold text-white">Your insurer · Claims</div>
              <div className="truncate text-[11px] text-white/50">{meta.line}</div>
            </div>
            {meta.early ? (
              <span className="ml-auto shrink-0 whitespace-nowrap rounded-full border border-[#a78bfa]/40 bg-[#a78bfa]/10 px-2 py-0.5 font-display text-[9.5px] uppercase tracking-wider2 text-[#c4b5fd]">
                Early access
              </span>
            ) : (
              <span className="ml-auto shrink-0 font-display text-[10px] uppercase tracking-wider2 text-white/40">Sample</span>
            )}
          </div>
          {channel === "voice" ? (
            <MemberVoiceCall
              key={channel}
              lines={conversation.slice(0, shown)}
              language={language.spoken}
              htmlLang={language.htmlLang}
              thread={thread}
            />
          ) : (
            <div
              ref={scrollRef}
              className="h-[460px] space-y-3 overflow-y-auto overscroll-contain px-3.5 py-4"
              data-lenis-prevent
              aria-live="polite"
              aria-label={`Sample ${meta.label} conversation in ${language.spoken} between a member and their insurer`}
            >
              <AnimatePresence initial={false}>
                {conversation.slice(0, shown).map((m, i) =>
                  channel === "email" ? (
                    <Mail key={`${thread}-${i}`} m={m} lang={language.htmlLang} />
                  ) : (
                    <Bubble key={`${thread}-${i}`} m={m} lang={language.htmlLang} />
                  ),
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
      <p className="mt-4 text-center text-[12px] leading-relaxed text-white/50">
        {channel === "voice"
          ? "Sample call. The agent answers in the caller's language — and switches when the caller does."
          : "Sample data. The same checks and the same answer, in the member's own language."}
      </p>
      {/* No replay button: scrolling back up is the replay. */}
    </div>
  );
}

export default function MemberExperience({
  eyebrow = "05 · For members",
  market = "global",
}: { eyebrow?: string; market?: Market } = {}) {
  const runway = useRef<HTMLDivElement | null>(null);
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [lang, setLang] = useState<Lang>("en");
  const [shown, setShown] = useState(1);

  // India's law is named on the India page; the home page speaks to every country.
  const points = POINTS.map((p) => {
    if (p.label === "Never free text" && channel === "voice") return VOICE_POINT;
    if (p.label === "Consent first" && market === "in") return { ...p, body: "DPDP consent before a single claim detail." };
    return p;
  });

  // Progress through the runway, from the stage pinning to it releasing.
  const { scrollYProgress } = useScroll({
    target: runway,
    offset: ["start start", "end end"],
  });
  const total = CONVERSATIONS[channel][lang].length;

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Below `lg` there is no runway and nothing is pinned, so scroll cannot
    // pace the thread. Show it whole and let the phone's own scroll carry it —
    // a second scroll region fighting the page is worse than no reveal.
    const mq = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let stop: (() => void) | undefined;
    // The last stretch is left to read the final reply rather than to reveal.
    const at = (v: number) => Math.max(1, Math.min(total, Math.ceil(Math.min(1, v / 0.82) * total)));

    const apply = () => {
      stop?.();
      stop = undefined;
      if (!mq.matches || reduce) {
        setShown(total);
        return;
      }
      // Start from where the reader already is — a switch mid-thread keeps the place.
      setShown(at(scrollYProgress.get()));
      stop = scrollYProgress.on("change", (v) => setShown(at(v)));
    };

    apply();
    mq.addEventListener("change", apply);
    return () => {
      stop?.();
      mq.removeEventListener("change", apply);
    };
  }, [scrollYProgress, total]);

  // Which guarantees the thread has demonstrated so far.
  const reached = new Set(
    CONVERSATIONS[channel][lang]
      .slice(0, shown)
      .flatMap((m) => m.points ?? [])
  );

  return (
    <SectionShell
      id="members"
      eyebrow={eyebrow}
      title={
        <>
          What your member sees.{" "}
          <span className="text-white/55">An answer, not a helpline number.</span>
        </>
      }
      intro="A member asks on a messaging tool, by email or on a call — in English, Hindi or Hinglish, in their own words. The OS checks who they are, reads your claims system and answers with the source and date, and the next thing they need to do."
    >
      {/* A runway tall enough to read the thread through. The stage pins to it,
          so the conversation advances with the reader rather than a timer. */}
      <div ref={runway} className="relative lg:h-[260vh]">
      <div className="lg:sticky lg:top-[10vh] grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="order-2 lg:order-1">
        <motion.ul
          variants={stagger(0.06, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {points.map((p) => (
            <motion.li
              key={p.label}
              variants={fadeUp}
              data-lit={reached.has(p.label) || undefined}
              className="group relative overflow-clip rounded-2xl glass p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/15 data-[lit]:border-white/25 data-[lit]:bg-white/[0.06]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full blur-3xl transition-opacity duration-700"
                style={{ background: `${p.hue}33`, opacity: reached.has(p.label) ? 0.9 : 0.25 }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full"
                    animate={{ scale: reached.has(p.label) ? 1 : 0.6, opacity: reached.has(p.label) ? 1 : 0.4 }}
                    transition={{ duration: 0.35 }}
                    style={{ background: p.hue, boxShadow: `0 0 10px ${p.hue}` }}
                  />
                  <span className="font-display text-[11px] uppercase tracking-wider2" style={{ color: p.hue }}>
                    {p.label}
                  </span>
                </div>
                <p className="mt-2.5 text-[14px] leading-relaxed text-white/70">{p.body}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-3 rounded-2xl border border-[#a78bfa]/25 bg-[#a78bfa]/[0.05] p-5"
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#a78bfa] motion-reduce:animate-none" />
            <span className="font-display text-[11px] uppercase tracking-wider2 text-[#c4b5fd]">More channels · coming soon</span>
          </div>
          <p className="mt-2.5 text-[14px] leading-relaxed text-white/70">
            The same checks on every new channel — consent, verification, approved wording and the record.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {SOON.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12.5px] text-white/80"
              >
                <c.Icon size={14} />
                {c.label}
              </span>
            ))}
          </div>
        </motion.div>
        </div>
        <div className="order-1 lg:order-2">
          <Phone channel={channel} setChannel={setChannel} lang={lang} setLang={setLang} shown={shown} />
        </div>
      </div>
      </div>
    </SectionShell>
  );
}
