import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Message } from "@/data/memberConversations";

/** The phone glyph used by the Voice tab and the call screen. */
export function PhoneIcon({ size = 22 }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

const BARS = 28;

/**
 * A sample call on the phone screen: the call timer, who is speaking, the
 * language of the call and the live transcript. The transcript is the
 * sample conversation — nothing here is a recording.
 */
export default function MemberVoiceCall({
  lines,
  language,
  htmlLang,
  thread,
}: {
  lines: Message[];
  /** The call's language, in English ("Hindi") — the badge is for the visitor. */
  language: string;
  htmlLang: string;
  /** Changes when the channel or language changes, so lines animate in afresh. */
  thread: string;
}) {
  const [secs, setSecs] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const id = window.setInterval(() => setSecs((x) => x + 1), 1000);
    return () => window.clearInterval(id);
  }, []);
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [lines.length, thread]);
  const speaking = lines.length > 0 ? lines[lines.length - 1].from : "os";
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  return (
    <div className="flex h-[460px] flex-col">
      <div className="flex flex-col items-center px-4 pb-3 pt-5">
        <div className="relative">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#a78bfa]/25 motion-reduce:animate-none" />
          <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#a78bfa]/15 ring-1 ring-[#a78bfa]/40">
            <PhoneIcon size={22} />
          </span>
        </div>
        <div className="mt-3 text-[14px] font-semibold text-white">Your insurer · Claims line</div>
        <div className="mt-1 flex items-center gap-2 text-[11.5px] tabular-nums text-white/55">
          <span>
            {mm}:{ss} · {speaking === "os" ? "Agent speaking" : "Member speaking"}
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={language}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-full border border-[#a78bfa]/35 bg-[#a78bfa]/10 px-2 py-px font-display text-[9.5px] uppercase tracking-wider2 text-[#c4b5fd]"
            >
              {language}
            </motion.span>
          </AnimatePresence>
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
        aria-live="polite"
        aria-label="Transcript of a sample call between a member and their insurer"
      >
        <div className="font-display text-[9.5px] uppercase tracking-wider2 text-white/40">Live transcript</div>
        <AnimatePresence initial={false}>
          {lines.map((m, i) => (
            <motion.div
              key={`${thread}-${i}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[12.5px] leading-relaxed"
            >
              <span className={`mr-1.5 font-semibold ${m.from === "os" ? "text-[#c4b5fd]" : "text-accent-cyan"}`}>
                {m.from === "os" ? "Agent" : "Member"}
              </span>
              <span lang={htmlLang} className="text-white/80">
                {m.text}
              </span>
              {m.note && (
                <span className="ml-1.5 font-display text-[9.5px] uppercase tracking-wider2 text-white/40">· {m.note}</span>
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
