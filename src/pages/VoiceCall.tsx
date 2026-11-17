import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "@/site/SiteLayout";
import SEOHead from "@/components/SEOHead";
import { ThemeStyle } from "@/theme/ThemeProvider";
import type { PageSEO } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured";
import { openWaitlist } from "@/lib/waitlist";
import CallStage from "@/demo/CallStage";
import { CALL_CSS, callTheme } from "@/demo/callTheme";
import { callIntent } from "@/demo/intents";
import type { CallLang } from "@/demo/speech";
import { mono } from "@/demo/tryTheme";
import { useEventLog } from "@/demo/useEventLog";
import { useVoiceAgent, type VoiceLogText } from "@/demo/useVoiceAgent";

const SEO_CALL: PageSEO = {
  title: "Call the voice agent · Gooclaim OS",
  description:
    "A one-minute trial call with the Gooclaim OS voice agent, in early access: a one-time code before any claim detail, answers read from the claim record, and English, Hindi or Hinglish — switch mid-call and it follows.",
  keywords: "insurance voice agent, claims helpline AI, Hindi voice agent, voice AI for TPAs",
};

const { t } = callTheme;

const VOICE_LOG: VoiceLogText = {
  started: "Recording on · consent notice played",
  otpSent: "Code sent to registered mobile",
  verified: "One-time code matched",
  retry: "Code did not match · nothing shared",
  toHindi: "Caller moved to Hindi · agent follows",
  toEnglish: "Caller moved to English",
  status: "Claim read from record · read-only",
  docs: "Sent to registered mobile",
  payment: "Payments · read-only",
  human: "Sent to claims team with reason",
  ended: "Recording kept on the claim",
  trialEnded: "1-minute limit reached",
};

const MIC_NOTES = {
  unsupported: "Voice input isn’t available in this browser — tap a line below to say it. The agent still answers out loud.",
  blocked: "Microphone is blocked here — tap a line below to say it. The agent still answers out loud.",
  failed: "Microphone could not start — tap a line below to say it.",
};

const TRAITS = [
  { n: "01", title: "Knows who is calling", desc: "A one-time code to the registered mobile comes before a single claim detail." },
  { n: "02", title: "Answers from the claim", desc: "Status, pending documents and payments — read from your claims system, never guessed." },
  { n: "03", title: "Follows the caller", desc: "English, Hindi or Hinglish. Switch mid-call and the next answer switches too." },
  { n: "04", title: "On the record", desc: "Every call recorded, every check logged. When it needs a person, it says so." },
];

const LANG_TAG = { hi: " · HI", hing: " · HING", en: " · EN" } as const;

export default function VoiceCall() {
  const [lang, setLang] = useState<CallLang>("en");
  const { log, add, clear } = useEventLog();
  const voice = useVoiceAgent({ intent: callIntent, log: add, logText: VOICE_LOG, micNotes: MIC_NOTES, onStart: clear });
  const lines = voice.state.lines;
  const transcript = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (transcript.current) transcript.current.scrollTop = transcript.current.scrollHeight;
  }, [lines]);

  const card = { flex: "1 1 300px", minWidth: 0, padding: 24, borderRadius: 24, border: `1px solid ${t.border}`, background: t.surface } as const;

  return (
    <SiteLayout>
      <SEOHead seo={SEO_CALL} path="/call" jsonLd={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Try it live", path: "/try" }, { name: "Voice call", path: "/call" }])} />
      <ThemeStyle css={CALL_CSS} />
      <div className="call-page" style={{ background: t.bg, color: t.text, fontFamily: "Inter, 'Noto Sans Devanagari', system-ui, sans-serif", lineHeight: 1.5 }}>
        <section style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 24px 36px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, border: `1px solid ${t.border}`, background: t.surface, fontSize: 13, color: t.text2 }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: "#10B981" }} />
            Voice agent · early access · 1-minute trial
          </div>
          <h1 style={{ margin: "22px auto 0", fontSize: "clamp(40px, 5.6vw, 76px)", lineHeight: 1.02, fontWeight: 500, letterSpacing: "-0.05em", maxWidth: 920 }}>
            Talk to a claims agent{" "}
            <span style={{ background: t.brandGrad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>that knows the claim.</span>
          </h1>
          <p style={{ margin: "20px auto 0", fontSize: 19, fontWeight: 400, color: t.text2, maxWidth: 600 }}>
            Call as a member. Ask where your claim stands, what is pending, or switch to Hindi mid-sentence. You have one minute.
          </p>
        </section>

        <CallStage voice={voice} lang={lang} setLang={setLang} />

        <section style={{ maxWidth: 1080, margin: "0 auto", padding: "8px 24px 40px", display: "flex", flexWrap: "wrap", gap: 16 }}>
          <div style={{ ...card, flex: "1.3 1 420px" }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", color: t.text3 }}>TRANSCRIPT</div>
            <div ref={transcript} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14, maxHeight: 320, overflowY: "auto" }}>
              {lines.length === 0 && <div style={{ fontSize: 14, color: t.text3 }}>The conversation appears here as you talk.</div>}
              {lines.map((ln, i) => (
                <div key={i} style={{ display: "flex", gap: 14 }}>
                  <span style={{ flex: "none", width: 72, fontFamily: mono, fontSize: 10, letterSpacing: ".05em", paddingTop: 4, color: ln.who === "agent" ? t.brand : t.text3 }}>
                    {(ln.who === "agent" ? "AGENT" : "YOU") + LANG_TAG[ln.lang]}
                  </span>
                  <span lang={ln.lang === "hi" ? "hi" : undefined} style={{ fontSize: 15, color: t.text }}>{ln.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", color: t.text3 }}>ON THE RECORD</span>
              <span style={{ fontSize: 12, color: t.green }}>● Audit ledger</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 10, maxHeight: 320, overflowY: "auto" }}>
              {log.length === 0 && <div style={{ fontSize: 14, color: t.text3, padding: "8px 0" }}>Every check the agent makes lands here.</div>}
              {log
                .slice()
                .reverse()
                .map((lg, i) => (
                  <div key={log.length - i} style={{ padding: "10px 0", borderBottom: `1px solid ${t.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <span style={{ fontFamily: mono, fontSize: 12 }}>{lg.ev}</span>
                      <span style={{ fontFamily: mono, fontSize: 11, color: t.text3 }}>{lg.time}</span>
                    </div>
                    <div style={{ fontSize: 13, color: t.text2 }}>{lg.detail}</div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 24px 40px" }}>
          <h2 style={{ margin: 0, textAlign: "center", fontSize: "clamp(30px, 3.6vw, 46px)", fontWeight: 500, letterSpacing: "-0.045em" }}>
            Same claim, same record. <span style={{ color: t.text3 }}>Now with a voice.</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", gap: 14, marginTop: 40 }}>
            {TRAITS.map((tr) => (
              <div key={tr.n} style={{ padding: 24, borderRadius: 22, border: `1px solid ${t.border}`, background: t.surface }}>
                <div style={{ fontFamily: mono, fontSize: 12, color: t.brand }}>{tr.n}</div>
                <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 10 }}>{tr.title}</div>
                <div style={{ fontSize: 14, color: t.text2, marginTop: 6 }}>{tr.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 24px 112px" }}>
          <div style={{ borderRadius: 32, padding: "clamp(36px, 6vw, 72px)", background: t.ctaBg, color: "#FAFAF9", textAlign: "center" }}>
            <h2 style={{ margin: 0, fontSize: "clamp(28px, 3.6vw, 46px)", fontWeight: 500, letterSpacing: "-0.045em" }}>Put this voice on your helpline.</h2>
            <p style={{ margin: "12px auto 0", color: "#D6D3D1", maxWidth: 520 }}>A 20-minute walkthrough — your workflow first, on a sample claims system. No slides.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 26 }}>
              <button type="button" onClick={() => openWaitlist("call-cta")} style={{ padding: "14px 26px", borderRadius: 999, border: "none", background: "#FAFAF9", color: "#0C0A09", font: "inherit", fontWeight: 500, cursor: "pointer" }}>
                Book a walkthrough
              </button>
              <Link to="/try" style={{ padding: "14px 26px", borderRadius: 999, border: "1px solid rgba(250,250,249,.3)", fontWeight: 500 }}>
                Try messaging instead
              </Link>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
