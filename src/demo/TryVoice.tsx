import { useEffect, useRef } from "react";
import { openWaitlist } from "@/lib/waitlist";
import { mono, PHONE_PATH, SHIELD_PATHS, tryTheme } from "./tryTheme";
import type { UiLang } from "./useChatDemo";
import type { CallPhase, useVoiceAgent } from "./useVoiceAgent";

const { t } = tryTheme;

type Voice = ReturnType<typeof useVoiceAgent>;

const LANGS: [UiLang, string][] = [["en", "English"], ["hi", "हिन्दी · Hinglish"]];
const BARS = Array.from({ length: 24 }, (_, i) => ({ h: `${14 + ((i * 37) % 30)}px`, d: `${(-(i * 0.09)).toFixed(2)}s` }));
const LINE_LABEL = { hi: "HINDI", hing: "HINGLISH", en: "ENGLISH" } as const;

/** The 1-minute call tab of the Try it demo. */
export default function TryVoice({ voice, lang, setLang }: { voice: Voice; lang: UiLang; setLang: (l: UiLang) => void }) {
  const s = voice.state;
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [s.lines, s.interim, s.trialEnded]);

  const call = s.call;
  const inCall = voice.inCall;
  const remaining = inCall ? Math.max(0, 60 - Math.floor(60 - voice.remaining)) : 0;
  const callTime = inCall ? `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, "0")} left` : call === "ended" ? (s.trialEnded ? "Trial ended" : "Call ended") : "1:00 trial";
  const trialPct = inCall ? `${(remaining / 60) * 100}%` : s.trialEnded ? "0%" : "100%";
  const statusMap: Record<CallPhase, [string, string]> = {
    idle: ["Ready when you are", "#A8A29E"],
    speaking: ["Speaking…", "#93C5FD"],
    listening: [s.micBlocked ? "Your turn — tap a line below" : "Listening… speak now", "#6EE7B7"],
    thinking: ["Checking your claim…", "#FCD34D"],
    waiting: ["Didn’t catch that — tap the mic to speak", "#FCD34D"],
    ended: ["Call ended · on the record", "#A8A29E"],
  };
  const [statusText, statusColor] = statusMap[call];
  const active = voice.active;
  const chips = s.vstep === "otp"
    ? ["4 8 2 9 1 3"]
    : s.vlang === "hi"
      ? ["मेरा क्लेम कहाँ तक पहुँचा?", "कौन से दस्तावेज़ बाकी हैं?", "भुगतान हुआ?", "धन्यवाद, बस इतना ही"]
      : ["Where is my claim?", "Kya aap Hindi mein bata sakte hain?", "Which documents are pending?", "Has it been paid?", "Thanks, bye"];
  const showFallback = inCall && (s.micBlocked || call === "waiting");

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", background: t.callBg, color: "#F5F5F4", borderRadius: 28, boxShadow: t.cardShadow, overflow: "hidden", display: "flex", flexDirection: "column", height: 640 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", fontSize: 13, color: "#A8A29E" }}>
        <span>Claims helpline · 1-minute trial</span>
        <span style={{ fontFamily: mono }}>{callTime}</span>
      </div>
      <div aria-hidden="true" style={{ height: 3, margin: "0 20px", borderRadius: 999, background: "rgba(245,245,244,.1)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: trialPct, background: "linear-gradient(90deg, #60A5FA, #22D3EE)", transition: "width .5s linear" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 20px 0" }}>
        <div style={{ width: 92, height: 92, borderRadius: 999, background: "linear-gradient(135deg, #1D4ED8, #0891B2)", display: "flex", alignItems: "center", justifyContent: "center", animation: active ? "gcpulse 1.4s ease-out infinite" : "none" }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {SHIELD_PATHS.map((d) => <path key={d} d={d} />)}
          </svg>
        </div>
        <div style={{ marginTop: 12, fontWeight: 600, fontSize: 17 }}>Gooclaim voice agent</div>
        <div style={{ fontSize: 13, color: statusColor }} aria-live="polite">{statusText}</div>
        <div aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: 4, height: 44, marginTop: 12 }}>
          {BARS.map((b, i) => (
            <span key={i} style={{ width: 4, height: b.h, borderRadius: 4, background: call === "listening" ? "#34D399" : "#60A5FA", transformOrigin: "center", animation: "gcwave 1s ease-in-out infinite", animationDelay: b.d, animationPlayState: active ? "running" : "paused", opacity: active ? 1 : 0.35 }} />
          ))}
        </div>
      </div>
      <div ref={scroller} style={{ flex: 1, overflowY: "auto", margin: "12px 16px 0", padding: 4, display: "flex", flexDirection: "column", gap: 8 }}>
        {s.lines.length === 0 && (
          <div style={{ margin: "auto", textAlign: "center", color: "#A8A29E", fontSize: 14, maxWidth: 380 }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", color: "#D6D3D1" }}>CHOOSE A LANGUAGE</div>
            <div role="radiogroup" aria-label="Call language" style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 10 }}>
              {LANGS.map(([k, label]) => (
                <button key={k} type="button" role="radio" aria-checked={lang === k} onClick={() => setLang(k)} style={{ padding: "9px 16px", borderRadius: 999, border: "1px solid rgba(245,245,244,.2)", background: lang === k ? "#F5F5F4" : "rgba(245,245,244,.06)", color: lang === k ? "#0C0A09" : "#F5F5F4", font: "inherit", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                  {label}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              Press <b style={{ color: "#F5F5F4" }}>Start 1-minute call</b> and allow your microphone. Speak Hindi, English or a mix — the agent follows you. It will first ask for the 6-digit code shown on the right.
            </div>
          </div>
        )}
        {s.lines.map((v, i) => {
          const agent = v.who === "agent";
          return (
            <div key={i} lang={v.lang === "hi" ? "hi" : undefined} style={{ alignSelf: agent ? "flex-start" : "flex-end", maxWidth: "86%", padding: "10px 14px", borderRadius: 16, background: agent ? "rgba(245,245,244,.08)" : "#F5F5F4", color: agent ? "#F5F5F4" : "#0C0A09", fontSize: 14 }}>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".05em", opacity: 0.7, marginBottom: 3 }}>{`${agent ? "AGENT" : "YOU"} · ${LINE_LABEL[v.lang]}`}</div>
              {v.text}
            </div>
          );
        })}
        {s.interim && (
          <div style={{ alignSelf: "flex-end", maxWidth: "86%", padding: "10px 14px", borderRadius: 16, border: "1px dashed rgba(245,245,244,.3)", color: "#D6D3D1", fontSize: 14, fontStyle: "italic" }}>{s.interim}</div>
        )}
        {s.trialEnded && (
          <div style={{ marginTop: 8, padding: 16, borderRadius: 16, background: "linear-gradient(135deg, rgba(29,78,216,.35), rgba(8,145,178,.25))", border: "1px solid rgba(96,165,250,.35)" }}>
            <div style={{ fontWeight: 600, fontSize: 15 }}>Your 1-minute trial is over.</div>
            <div style={{ fontSize: 13, color: "#D6D3D1", marginTop: 4 }}>Hear the agent on your own claims, in your members’ languages.</div>
            <button type="button" onClick={() => openWaitlist("try-voice-trial-ended")} style={{ display: "inline-block", marginTop: 12, padding: "9px 14px", borderRadius: 10, border: "none", background: "#F5F5F4", color: "#0C0A09", font: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Book a walkthrough
            </button>
          </div>
        )}
      </div>
      {showFallback && (
        <div style={{ padding: "10px 16px 0" }}>
          <div style={{ fontSize: 12, color: "#FCD34D", marginBottom: 8 }}>{s.micNote || "Tap the mic to speak again, or tap a line."}</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {chips.map((label) => (
              <button key={label} type="button" onClick={() => voice.sayLine(label)} style={{ padding: "7px 12px", borderRadius: 999, border: "1px solid rgba(245,245,244,.2)", background: "rgba(245,245,244,.06)", color: "#F5F5F4", font: "inherit", fontSize: 13, cursor: "pointer" }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "center", gap: 12, padding: 18 }}>
        {!inCall && (
          <button type="button" onClick={() => voice.startCall(lang === "hi" ? "hi" : "en")} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 26px", borderRadius: 999, border: "none", background: "#16A34A", color: "#fff", font: "inherit", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={PHONE_PATH} /></svg>
            {call === "ended" ? "Try another 1-minute call" : "Start 1-minute call"}
          </button>
        )}
        {inCall && (
          <>
            <button type="button" onClick={voice.tapMic} aria-label="Speak now" style={{ width: 54, height: 54, borderRadius: 999, border: "1px solid rgba(245,245,244,.25)", background: "rgba(245,245,244,.08)", color: "#F5F5F4", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
            </button>
            <button type="button" onClick={voice.endCall} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 26px", borderRadius: 999, border: "none", background: "#DC2626", color: "#fff", font: "inherit", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              End call
            </button>
          </>
        )}
      </div>
    </div>
  );
}
