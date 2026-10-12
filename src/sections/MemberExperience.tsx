import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { MailIcon, TelegramIcon, WhatsAppIcon } from "@/components/BrandIcons";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

interface Message {
  from: "member" | "os";
  text: string;
  /** What the OS did before it could send this — shown under the bubble. */
  note?: string;
  link?: string;
}

type Channel = "whatsapp" | "email" | "voice";

// Sample conversations — sample claim, sample member, never real data. Each
// follows its channel's real check: WhatsApp's number is verified by the
// platform, so consent is enough; an email address proves nothing, so email
// also asks for the registered mobile and sends a code to it.
const CONVERSATIONS: Record<Channel, Message[]> = {
  whatsapp: [
    { from: "member", text: "Hi, what's the status of my claim?" },
    {
      from: "os",
      text: "Hello! Before we look at your claim, may we use your details to help you with it? Reply YES to continue.",
      note: "Consent first",
    },
    { from: "member", text: "Yes" },
    {
      from: "os",
      text: "The latest status of your claim CLM-24817 (as per your insurer's records, updated 3 Oct 2026): Documents pending. We still need your discharge summary — upload it securely here:",
      link: "Upload documents",
      note: "Registered number · source and date",
    },
    { from: "member", text: "Uploaded ✓ discharge_summary.pdf" },
    {
      from: "os",
      text: "Received, thank you. We'll pass it to your claims team and let you know when it's checked.",
      note: "Approved template",
    },
  ],
  email: [
    { from: "member", text: "Hello, could you tell me the status of my hospital claim?" },
    {
      from: "os",
      text: "Dear member, before we look at your claim, may we use your details to help you with it? Please reply YES along with your registered mobile number.",
      note: "Consent first",
    },
    { from: "member", text: "YES — my mobile is 98•••••21." },
    {
      from: "os",
      text: "Thank you. Your claim details are private, so we've sent a 6-digit code to your registered mobile ending ••21. Please reply with the code.",
      note: "Verified before any detail",
    },
    { from: "member", text: "The code is 482913." },
    {
      from: "os",
      text: "The latest status of your claim CLM-24817 (as per your insurer's records, updated 3 Oct 2026): Documents pending. We still need your discharge summary — upload it securely here:",
      link: "Upload documents",
      note: "Source and date · checked before sending",
    },
  ],
  // Not live yet — a preview of the voice agent. A caller ID proves less than a
  // WhatsApp number, so the call asks for the code, as email does.
  voice: [
    { from: "member", text: "Hi, I want to know the status of my claim." },
    {
      from: "os",
      text: "Sure. Before I look at your claim, may I use your details to help you with it? Please say yes to continue.",
      note: "Consent first",
    },
    { from: "member", text: "Yes." },
    {
      from: "os",
      text: "Thank you. I've sent a 6-digit code to your registered mobile ending 21. Please read it out.",
      note: "Verified before any detail",
    },
    { from: "member", text: "Four, eight, two, nine, one, three." },
    {
      from: "os",
      text: "As per your insurer's records, updated 3 October: claim CLM-24817 is waiting for one document — the discharge summary. I'll send a secure upload link to your registered mobile.",
      note: "Source and date",
    },
  ],
};

function PhoneIcon({ size = 22 }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}
function SmsIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 10h.01M12 10h.01M16 10h.01" />
    </svg>
  );
}
function WebChatIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#7dc4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

const SOON = [
  { label: "Voice agent", Icon: PhoneIcon },
  { label: "SMS", Icon: SmsIcon },
  { label: "Telegram", Icon: TelegramIcon },
  { label: "Web chat", Icon: WebChatIcon },
];

const CHANNELS: {
  key: Channel;
  label: string;
  line: string;
  Icon: (p: { size?: number; className?: string }) => JSX.Element;
  ring: string;
  soon?: boolean;
}[] = [
  { key: "whatsapp", label: "WhatsApp", line: "WhatsApp · Claims desk", Icon: WhatsAppIcon, ring: "#25D366" },
  { key: "email", label: "Email", line: "Email · Claims desk", Icon: MailIcon, ring: "#0d99ff" },
  { key: "voice", label: "Voice", line: "Voice agent · Claims line", Icon: PhoneIcon, ring: "#a78bfa", soon: true },
];

const POINTS = [
  { label: "Consent first", body: "DPDP consent before a single claim detail.", hue: "#10b981" },
  { label: "Verified", body: "On WhatsApp, the registered number. On email, a code sent to it first.", hue: "#0d99ff" },
  { label: "Source & date", body: "Every answer names whose record it read, and when.", hue: "#7dc4ff" },
  { label: "Never free text", body: "Approved templates only, in the member's language.", hue: "#f59e0b" },
];

const STEP_MS = 1100;

function Bubble({ m }: { m: Message }) {
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

function Mail({ m }: { m: Message }) {
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
        <p className="mt-2 text-[12.5px] leading-relaxed text-white/80">{m.text}</p>
        {m.link && (
          <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[12px] font-semibold text-accent-cyan">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

const BARS = 28;

function VoiceCall({ lines, run }: { lines: Message[]; run: number }) {
  const [secs, setSecs] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setSecs(0);
    const id = window.setInterval(() => setSecs((x) => x + 1), 1000);
    return () => window.clearInterval(id);
  }, [run]);
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [lines.length]);
  const speaking = lines.length > 0 ? lines[lines.length - 1].from : "os";
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  return (
    <div className="flex h-[460px] flex-col">
      <div className="flex flex-col items-center px-4 pb-3 pt-5">
        <div className="relative">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#a78bfa]/25" />
          <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#a78bfa]/15 ring-1 ring-[#a78bfa]/40">
            <PhoneIcon size={22} />
          </span>
        </div>
        <div className="mt-3 text-[14px] font-semibold text-white">Your insurer · Claims line</div>
        <div className="mt-0.5 text-[11.5px] tabular-nums text-white/45">
          {mm}:{ss} · {speaking === "os" ? "Agent speaking" : "Member speaking"}
        </div>
        <div className="mt-3 flex h-8 items-center gap-[3px]" aria-hidden>
          {Array.from({ length: BARS }, (_, i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full"
              style={{ background: speaking === "os" ? "#a78bfa" : "#0d99ff", height: 28 }}
              animate={{ scaleY: [0.15, 0.35 + ((i * 37) % 60) / 100, 0.2] }}
              transition={{ duration: 0.9 + (i % 5) * 0.12, repeat: Infinity, ease: "easeInOut", delay: (i % 7) * 0.06 }}
            />
          ))}
        </div>
      </div>
      <div
        ref={listRef}
        className="flex-1 space-y-2 overflow-y-auto overscroll-contain border-t border-white/10 px-3.5 py-3"
        data-lenis-prevent
      >
        <div className="font-display text-[9.5px] uppercase tracking-wider2 text-white/35">Live transcript</div>
        <AnimatePresence initial={false}>
          {lines.map((m, i) => (
            <motion.div
              key={`${run}-${i}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[12.5px] leading-relaxed"
            >
              <span className={`mr-1.5 font-semibold ${m.from === "os" ? "text-[#c4b5fd]" : "text-accent-cyan"}`}>
                {m.from === "os" ? "Agent" : "Member"}
              </span>
              <span className="text-white/80">{m.text}</span>
              {m.note && (
                <span className="ml-1.5 font-display text-[9.5px] uppercase tracking-wider2 text-white/35">· {m.note}</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-center gap-5 border-t border-white/10 py-3" aria-hidden>
        <span className="h-9 w-9 rounded-full bg-white/[0.07]" />
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#ef4444]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14" /></svg>
        </span>
        <span className="h-9 w-9 rounded-full bg-white/[0.07]" />
      </div>
    </div>
  );
}

function Phone() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [shown, setShown] = useState(0);
  const [run, setRun] = useState(0);
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const conversation = CONVERSATIONS[channel];
  const meta = CHANNELS.find((c) => c.key === channel) ?? CHANNELS[0];
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!inView) return;
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(conversation.length);
      return;
    }
    setShown(1);
    const id = window.setInterval(() => {
      setShown((n) => {
        if (n >= conversation.length) {
          window.clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, channel === "voice" ? STEP_MS * 1.7 : STEP_MS); // speech is slower than text
    return () => window.clearInterval(id);
  }, [inView, run, conversation.length, channel]);

  // Keep the newest message in view, inside the phone only.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [shown]);

  const done = shown >= conversation.length;
  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[360px]">
      <div
        role="group"
        aria-label="Choose a channel"
        className="relative z-10 mx-auto mb-4 flex w-fit gap-1 rounded-full p-1 glass"
      >
        {CHANNELS.map((c) => {
          const on = c.key === channel;
          return (
            <button
              key={c.key}
              type="button"
              aria-pressed={on}
              onClick={() => {
                if (on) return;
                setChannel(c.key);
                setShown(0);
                setRun((r) => r + 1);
              }}
              className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-3 text-[12.5px] font-semibold transition-colors sm:gap-2 sm:px-4 ${
                on ? "bg-white/[0.12] text-white" : "text-white/55 hover:text-white"
              }`}
            >
              <c.Icon size={15} />
              {c.label}
              {c.soon && (
                <span className="rounded-full bg-[#a78bfa]/20 px-1.5 py-px font-display text-[9px] uppercase tracking-wider2 text-[#c4b5fd]">
                  Soon
                </span>
              )}
            </button>
          );
        })}
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
              className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1"
              style={{ background: `${meta.ring}26`, ["--tw-ring-color" as string]: `${meta.ring}4d` }}
            >
              <meta.Icon size={18} />
            </span>
            <div className="min-w-0">
              <div className="truncate text-[13.5px] font-semibold text-white">Your insurer · Claims</div>
              <div className="truncate text-[11px] text-white/45">{meta.line}</div>
            </div>
            {meta.soon ? (
              <span className="ml-auto shrink-0 whitespace-nowrap rounded-full border border-[#a78bfa]/40 bg-[#a78bfa]/10 px-2 py-0.5 font-display text-[9.5px] uppercase tracking-wider2 text-[#c4b5fd]">
                Soon
              </span>
            ) : (
              <span className="ml-auto font-display text-[10px] uppercase tracking-wider2 text-white/35">Sample</span>
            )}
          </div>
          {channel === "voice" ? (
            <VoiceCall lines={conversation.slice(0, shown)} run={run} />
          ) : (
          <div
            ref={scrollRef}
            className="h-[460px] space-y-3 overflow-y-auto overscroll-contain px-3.5 py-4"
            data-lenis-prevent
            aria-live="polite"
            aria-label={`Sample ${meta.label} conversation between a member and their insurer`}
          >
            <AnimatePresence initial={false}>
              {conversation.slice(0, shown).map((m, i) =>
                channel === "email" ? <Mail key={`${run}-${i}`} m={m} /> : <Bubble key={`${run}-${i}`} m={m} />,
              )}
            </AnimatePresence>
          </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={() => {
            setShown(0);
            setRun((r) => r + 1);
          }}
          disabled={!done}
          className="inline-flex min-h-[40px] items-center gap-2 rounded-full px-4 text-[12.5px] font-medium text-white/70 glass transition-all hover:text-white disabled:opacity-0"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" />
          </svg>
          Replay conversation
        </button>
      </div>
    </div>
  );
}

export default function MemberExperience({ eyebrow = "05 · For members" }: { eyebrow?: string } = {}) {
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
      intro="A member asks on WhatsApp or email, in their own words. The OS checks who they are, reads your claims system, and replies in an approved message — with the source and date, and the next thing they need to do."
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="order-2 lg:order-1">
        <motion.ul
          variants={stagger(0.06, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {POINTS.map((p) => (
            <motion.li
              key={p.label}
              variants={fadeUp}
              className="group relative overflow-clip rounded-2xl glass p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/15"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-80"
                style={{ background: `${p.hue}33` }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.hue, boxShadow: `0 0 10px ${p.hue}` }} />
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
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#a78bfa]" />
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
          <Phone />
        </div>
      </div>
    </SectionShell>
  );
}
