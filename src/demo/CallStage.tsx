import type { RefObject } from "react";
import { openWaitlist } from "@/lib/waitlist";
import Logo from "@/site/Logo";
import { callTheme } from "./callTheme";
import type { CallLang } from "./speech";
import { mono, PHONE_PATH } from "./tryTheme";
import type { LiveCall, LiveProblem } from "./useLiveCall";

const { t } = callTheme;

const LANGS: [CallLang, string][] = [["en", "English"], ["hi", "हिन्दी · Hinglish"]];
const BARS = [22, 38, 52, 30, 46, 26, 40].map((h, i) => ({ h: `${h}px`, d: `${(-i * 0.12).toFixed(2)}s` }));
type Look = "idle" | "speaking" | "listening" | "thinking" | "ended";
const CORES: Partial<Record<Look, string>> = {
  speaking: "radial-gradient(circle at 30% 25%, #BFDBFE 0%, #3B82F6 45%, #1E3A8A 100%)",
  listening: "radial-gradient(circle at 30% 25%, #A7F3D0 0%, #10B981 45%, #065F46 100%)",
  thinking: "radial-gradient(circle at 30% 25%, #FDE68A 0%, #F59E0B 45%, #92400E 100%)",
};
const CORE_BASE = "radial-gradient(circle at 30% 25%, #C7D2FE 0%, #2563EB 42%, #0E7490 100%)";
const glass = { background: t.glass, border: `1px solid ${t.glassLine}`, backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" } as const;

const PROBLEMS: Record<Exclude<LiveProblem, "">, string> = {
  verification: "We could not confirm you are a person — reload the page and try again.",
  daily_limit: "Today’s trial calls are used up. Come back tomorrow — or book a walkthrough.",
  ip_limit: "You have used your trial calls for today. Come back tomorrow — or book a walkthrough.",
  unavailable: "The agent could not be reached just now — try again in a minute.",
  not_configured: "Live calls are not switched on here yet.",
  microphone: "Allow the microphone for this page to talk to the agent.",
  dropped: "The call dropped — try again.",
};

const ASK: Record<CallLang, [string, string][]> = {
  en: [["STATUS", "Where is my claim?"], ["SWITCH LANGUAGE", "Kya aap Hindi mein bata sakte hain?"], ["DOCUMENTS", "Which documents are pending?"], ["PAYMENT", "Has it been paid?"]],
  hi: [["STATUS", "Mera claim kahan tak pahuncha?"], ["DOCUMENTS", "कौन से दस्तावेज़ बाकी हैं?"], ["PAYMENT", "Payment hua kya?"], ["WRAP UP", "धन्यवाद, बस इतना ही"]],
};

interface Props {
  live: LiveCall;
  lang: CallLang;
  setLang: (l: CallLang) => void;
  /** Where the Turnstile check renders (only visible when Cloudflare asks). */
  checkBox: RefObject<HTMLDivElement>;
  /** A person has been confirmed: the call may start. */
  ready: boolean;
  onStart: () => void;
}

/** The call itself: countdown ring, breathing core, captions, controls and lines to try. */
export default function CallStage({ live, lang, setLang, checkBox, ready, onStart }: Props) {
  const { phase, inCall, remaining, limitS } = live;
  const look: Look = phase === "connecting" ? "thinking" : phase === "live" ? (live.speaking ? "speaking" : "listening") : phase;
  const active = look === "speaking" || look === "listening";
  const rs = Math.ceil(remaining);
  const status: Record<Look, [string, string]> = {
    idle: [ready ? "Ready to call" : "Checking you are a person…", t.text2],
    thinking: ["Connecting…", t.warn],
    speaking: [live.wrapping ? "Wrapping up…" : "Agent speaking", t.brand],
    listening: [live.wrapping ? "Wrapping up…" : "Listening — speak now", t.green],
    ended: [live.trialEnded ? "Thanks for calling · recorded as a test" : "Call ended", t.text2],
  };
  const [statusText, statusColor] = status[look];

  const lastAgent = [...live.lines].reverse().find((l) => l.who === "agent");
  const lastYou = [...live.lines].reverse().find((l) => l.who === "caller");
  const agentLine = lastAgent ? lastAgent.text : lang === "hi" ? "कॉल शुरू करें — एजेंट पहले आपका कोड माँगेगा।" : "Start the call — the agent will first ask for your code.";
  const glowC = look === "listening" ? "16,185,129" : look === "thinking" ? "245,158,11" : "37,99,235";

  return (
    <section style={{ maxWidth: 1080, margin: "0 auto", padding: "8px 24px 40px" }}>
      <div style={{ position: "relative", overflow: "hidden", borderRadius: 36, border: `1px solid ${t.stageLine}`, background: t.stageBase, boxShadow: t.stageShadow }}>
        <div aria-hidden="true" style={{ position: "absolute", width: 560, height: 560, left: -140, top: -200, borderRadius: 999, background: t.meshA, animation: "gcDrift 14s ease-in-out infinite" }} />
        <div aria-hidden="true" style={{ position: "absolute", width: 520, height: 520, right: -160, bottom: -220, borderRadius: 999, background: t.meshB, animation: "gcDrift 18s ease-in-out infinite reverse" }} />
        <div aria-hidden="true" style={{ position: "absolute", width: 380, height: 380, right: "18%", top: -160, borderRadius: 999, background: t.meshC }} />

        <div style={{ position: "relative", padding: "clamp(20px, 4vw, 40px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 34, height: 34, borderRadius: 10, background: t.glass, border: `1px solid ${t.glassLine}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Logo size={20} />
              </span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Claims helpline · live agent</div>
                <div style={{ fontSize: 12, color: t.text2 }}>Test member · sample data · recorded as a test</div>
              </div>
            </div>
            <div role="radiogroup" aria-label="Call language" style={{ display: "inline-flex", padding: 4, borderRadius: 999, ...glass, opacity: inCall ? 0.5 : 1 }}>
              {LANGS.map(([k, label]) => (
                <button key={k} type="button" role="radio" aria-checked={lang === k} onClick={() => { if (!inCall) setLang(k); }} style={{ padding: "8px 16px", borderRadius: 999, border: "none", background: lang === k ? t.segOn : "transparent", color: lang === k ? t.segOnText : t.text2, boxShadow: lang === k ? "0 2px 8px rgba(0,0,0,.12)" : "none", font: "inherit", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "36px 0 8px" }}>
            <div style={{ position: "relative", width: 280, height: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: 999, background: `conic-gradient(${rs <= 10 && phase === "live" ? "#F59E0B" : t.ringBrand} ${((remaining / limitS) * 360).toFixed(1)}deg, ${t.ringTrack} 0deg)`, transition: "background .5s linear" }} />
              <div aria-hidden="true" style={{ position: "absolute", inset: 5, borderRadius: 999, background: t.ringInner }} />
              {[0, -1.1].map((delay) => (
                <div key={delay} aria-hidden="true" style={{ position: "absolute", width: 196, height: 196, borderRadius: 999, border: `1.5px solid ${look === "listening" ? "rgba(16,185,129,.6)" : "rgba(37,99,235,.55)"}`, animation: "gcRing 2.2s ease-out infinite", animationDelay: `${delay}s`, animationPlayState: active ? "running" : "paused", opacity: active ? 1 : 0 }} />
              ))}
              <div style={{ position: "relative", width: 196, height: 196, borderRadius: 999, background: CORES[look] ?? CORE_BASE, boxShadow: `0 30px 80px rgba(${glowC},${inCall ? ".45" : ".28"}), inset 0 -10px 30px rgba(0,0,0,.18)`, display: "flex", alignItems: "center", justifyContent: "center", animation: "gcBreathe 3.6s ease-in-out infinite", transition: "background .6s, box-shadow .6s" }}>
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: 999, background: "radial-gradient(60% 50% at 32% 24%, rgba(255,255,255,.55) 0%, rgba(255,255,255,0) 70%)" }} />
                {look === "speaking" ? (
                  <div aria-hidden="true" style={{ position: "relative", display: "flex", alignItems: "center", gap: 5, height: 56 }}>
                    {BARS.map((b, i) => (
                      <span key={i} style={{ width: 5, height: b.h, borderRadius: 6, background: "rgba(255,255,255,.95)", transformOrigin: "center", animation: "gcBar .9s ease-in-out infinite", animationDelay: b.d }} />
                    ))}
                  </div>
                ) : (
                  <span style={{ position: "relative", width: 84, height: 84, borderRadius: 999, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 20px rgba(15,23,42,.18)" }}><Logo size={52} /></span>
                )}
              </div>
            </div>
            <div style={{ marginTop: 18, fontFamily: mono, fontSize: 13, letterSpacing: ".04em", color: t.text2 }}>
              {phase === "live" ? (live.wrapping ? "Time’s up · saying goodbye" : rs <= 10 ? `${rs} seconds left` : `0:${String(rs).padStart(2, "0")} remaining`) : live.trialEnded ? "0:00 · trial used" : `0:${String(limitS).padStart(2, "0")} free trial`}
            </div>
            <div aria-live="polite" style={{ marginTop: 4, fontSize: 14, fontWeight: 500, color: statusColor }}>{statusText}</div>
          </div>

          <div style={{ minHeight: 112, maxWidth: 720, margin: "8px auto 0", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
            {lastYou && phase === "live" && <div lang={lastYou.lang === "hi" ? "hi" : undefined} style={{ fontSize: 15, color: t.text2, fontStyle: "italic" }}>“{lastYou.text}”</div>}
            <div lang={(lastAgent ? lastAgent.lang : lang) === "hi" ? "hi" : undefined} style={{ fontSize: "clamp(20px, 2.4vw, 26px)", lineHeight: 1.35, fontWeight: 400, letterSpacing: "-0.015em", color: t.text }}>{agentLine}</div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            {!inCall ? (
              <button type="button" onClick={onStart} disabled={!ready} style={{ display: "inline-flex", alignItems: "center", gap: 12, height: 56, padding: "0 30px", borderRadius: 999, border: "none", background: t.btnBg, color: t.btnText, font: "inherit", fontSize: 16, fontWeight: 500, cursor: ready ? "pointer" : "wait", opacity: ready ? 1 : 0.6, boxShadow: "0 10px 30px rgba(12,10,9,.18)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={PHONE_PATH} /></svg>
                {phase === "ended" ? "Call again" : `Start ${limitS}-second call`}
              </button>
            ) : (
              <button type="button" onClick={() => void live.end()} style={{ display: "inline-flex", alignItems: "center", gap: 10, height: 56, padding: "0 28px", borderRadius: 999, border: "none", background: "#DC2626", color: "#fff", font: "inherit", fontSize: 16, fontWeight: 500, cursor: "pointer" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M3 15c5-5 13-5 18 0l-2.5 2.5-3-1.5v-2.5a10 10 0 0 0-7 0V16l-3 1.5z" /></svg>
                End call
              </button>
            )}
          </div>
          <div ref={checkBox} style={{ display: "flex", justifyContent: "center", marginTop: 12 }} />
          {live.code && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 14px", borderRadius: 999, background: t.glass, border: `1px solid ${t.glassLine}`, fontSize: 13, color: t.text2 }}>
                When asked, read this test code <b style={{ fontFamily: mono, fontSize: 14, letterSpacing: ".14em", color: t.text }}>{live.code}</b>
              </span>
            </div>
          )}
          {live.problem && <div role="alert" style={{ textAlign: "center", marginTop: 12, fontSize: 14, color: t.warn }}>{PROBLEMS[live.problem]}</div>}

          <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${t.glassLine}` }}>
            <div style={{ textAlign: "center", fontFamily: mono, fontSize: 11, letterSpacing: ".1em", color: t.text3 }}>THINGS YOU CAN ASK</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 10, marginTop: 14 }}>
              {ASK[lang].map(([k, label]) => (
                <div key={k} style={{ textAlign: "left", padding: "14px 16px", borderRadius: 16, ...glass, color: t.text, fontSize: 14 }}>
                  <span style={{ display: "block", fontFamily: mono, fontSize: 10, letterSpacing: ".06em", color: t.text3 }}>{k}</span>
                  <span lang={/[ऀ-ॿ]/.test(label) ? "hi" : undefined} style={{ display: "block", marginTop: 4 }}>“{label}”</span>
                </div>
              ))}
            </div>
          </div>

          {live.trialEnded && (
            <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", padding: "18px 22px", borderRadius: 20, background: t.btnBg, color: t.btnText }}>
              <div>
                <div style={{ fontWeight: 600 }}>That was your {limitS} seconds.</div>
                <div style={{ fontSize: 14, opacity: 0.75 }}>Hear the agent on your own claims, in your members’ languages.</div>
              </div>
              <button type="button" onClick={() => openWaitlist("call-trial-ended")} style={{ padding: "11px 18px", borderRadius: 999, border: "none", background: t.btnText, color: t.btnBg, font: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Book a walkthrough
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
