import { motion } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

/**
 * Voice calls — built (gooclaim-voice) and offered in early access.
 *
 * 🔴 Say "early access", never "live": no customer runs voice yet. Every line
 * below describes what the voice agent actually does today on the development
 * system: it confirms the caller with a one-time code, reads the caller's own
 * claim, answers in the caller's language, records the call and logs each
 * check, and flags what needs a person. Pricing for voice is "talk to sales" —
 * no per-minute figure on the site (founder, November 2026).
 */

const POINTS = [
  {
    title: "Knows who is calling",
    body: "The caller confirms who they are with a one-time code before hearing a single claim detail.",
    hue: "#0d99ff",
  },
  {
    title: "Answers from the claim",
    body: "Where the claim stands, which documents are still needed, why less was paid — read from your claims system, never guessed.",
    hue: "#10b981",
  },
  {
    title: "Follows the caller's language",
    body: "English, Hindi or Hinglish. If the caller switches in the middle of the call, the next answer switches too.",
    hue: "#a78bfa",
  },
  {
    title: "On the record",
    body: "Every call is recorded and every check is logged. When a question needs a person, the agent says so and flags it for your team.",
    hue: "#f59e0b",
  },
];

type Line = { who: "agent" | "caller"; text: string; lang: "en" | "hi" | "hi-Latn"; switched?: string };

/** A sample call — made-up member and claim, shown as such. The caller switches to Hindi halfway. */
const CALL: Line[] = [
  { who: "agent", lang: "en", text: "Thank you for calling. To keep your details safe, I've sent a 6-digit code to your registered mobile. Could you read it out?" },
  { who: "caller", lang: "en", text: "Four, eight, two, nine, one, three." },
  { who: "agent", lang: "en", text: "Thank you, that's confirmed. How can I help today?" },
  { who: "caller", lang: "hi-Latn", text: "My father's claim… kya aap Hindi mein bata sakte hain?", switched: "Caller switches to Hindi" },
  { who: "agent", lang: "hi", text: "ज़रूर। आपके पिताजी का क्लेम, जिसके आख़िरी अंक चार, आठ, एक, सात हैं, अभी जाँच में है। दो दस्तावेज़ बाकी हैं — डिस्चार्ज समरी और फ़ाइनल बिल।" },
  { who: "caller", lang: "hi", text: "ठीक है। वो कहाँ भेजूँ?" },
  { who: "agent", lang: "hi", text: "आपके रजिस्टर्ड मोबाइल पर अपलोड लिंक भेज दिया गया है। दोनों दस्तावेज़ वहीं से अपलोड कर दीजिए।" },
];

const LANG_TAG: Record<Line["lang"], string> = { en: "English", hi: "Hindi", "hi-Latn": "Hinglish" };

export default function VoiceAgent({ eyebrow = "Voice calls" }: { eyebrow?: string } = {}) {
  return (
    <SectionShell
      id="voice"
      eyebrow={eyebrow}
      title={
        <>
          A voice agent that knows the claim.{" "}
          <span className="text-white/55">Now in early access.</span>
        </>
      }
      intro="Members call the way they always have. The agent confirms who they are, reads their claim from your system and answers in their own language, even when they switch mid-call — the same rules, the same record and the same consent as every other channel."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14">
        <motion.ul
          variants={stagger(0.06, 0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="space-y-3"
        >
          {POINTS.map((p) => (
            <motion.li key={p.title} variants={fadeUp} className="relative overflow-clip rounded-2xl p-5 glass">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-50 blur-3xl"
                style={{ background: `${p.hue}33` }}
              />
              <span className="relative z-10 block font-display text-[17px] font-semibold tracking-tight text-white">
                {p.title}
              </span>
              <span className="relative z-10 mt-1 block text-[13.5px] leading-relaxed text-white/60">{p.body}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-clip rounded-2xl glass-strong p-5 sm:p-6"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="font-display text-[10.5px] uppercase tracking-wider2 text-[#7dc4ff]">Sample call · one language to another</span>
            <span className="shrink-0 font-display text-[10px] uppercase tracking-wider2 text-white/40">Sample data</span>
          </div>
          <ol className="mt-5 space-y-3" aria-label="A sample call in which the caller switches from English to Hindi">
            {CALL.map((line, i) => (
              <li key={i}>
                {line.switched && (
                  <div className="my-4 flex items-center gap-3" role="note">
                    <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-transparent to-[#a78bfa]/50" />
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#a78bfa]/40 bg-[#a78bfa]/10 px-3 py-1 font-display text-[10px] uppercase tracking-wider2 text-[#c4b5fd]">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M17 3l4 4-4 4" /><path d="M3 7h18" /><path d="M7 21l-4-4 4-4" /><path d="M21 17H3" />
                      </svg>
                      {line.switched} · the agent follows
                    </span>
                    <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-transparent to-[#a78bfa]/50" />
                  </div>
                )}
                <div className={`flex ${line.who === "caller" ? "justify-end" : "justify-start"}`}>
                  <span
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ${
                      line.who === "caller" ? "bg-white/[0.08] text-white/80" : "bg-[#0d99ff]/15 text-white/85"
                    }`}
                  >
                    <span className="mb-0.5 flex items-center gap-2 font-display text-[10px] uppercase tracking-wider2 text-white/45">
                      {line.who === "caller" ? "Caller" : "Agent"}
                      <span className="text-white/30">· {LANG_TAG[line.lang]}</span>
                    </span>
                    <span lang={line.lang}>{line.text}</span>
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </SectionShell>
  );
}
