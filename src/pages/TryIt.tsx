import { useState } from "react";
import SiteLayout from "@/site/SiteLayout";
import SEOHead from "@/components/SEOHead";
import { ThemeStyle } from "@/theme/ThemeProvider";
import type { PageSEO } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured";
import { SAMPLE_CLAIM } from "@/data/sampleClaim";
import TryChat from "@/demo/TryChat";
import TrySide from "@/demo/TrySide";
import LiveVoice from "@/demo/LiveVoice";
import { CALL_CSS } from "@/demo/callTheme";
import { mono, PHONE_PATH, segment, TRY_CSS, tryTheme } from "@/demo/tryTheme";
import { useChatDemo, type UiLang } from "@/demo/useChatDemo";
import { useEventLog } from "@/demo/useEventLog";

const SEO_TRY: PageSEO = {
  title: "Try it live · Gooclaim OS",
  description:
    "Be the member: ask about a sample health claim on a messaging channel or a 30-second voice call, in English, Hindi or Hinglish — consent first, messages checked against the record before they are sent, calls that answer only from the claim, every step on the audit ledger.",
  keywords: "Gooclaim OS demo, claims chatbot demo, insurance voice agent demo, Hindi claims assistant",
};

const { t } = tryTheme;

const RULES = [
  { k: "CONSENT FIRST", title: "Consent before a word", desc: "No claim detail is shared until the member says yes. On a call, a one-time code comes first." },
  { k: "SOURCE & DATE", title: "Every answer names its record", desc: "Whose record was read, and when it was last updated — on every channel." },
  { k: "POLICY GATE", title: "Checked before it leaves", desc: "Messages: every value matched to the record, wording pre-approved — no match, nothing is sent. Calls: answers only from the caller’s claim." },
  { k: "ON THE RECORD", title: "One ledger, every channel", desc: "Messages, calls, consent and uploads land as rows on the same claim — append-only." },
];

const LANGS: [UiLang, string][] = [["en", "English"], ["hi", "हिन्दी · Hinglish"]];

const gradText = { backgroundImage: t.brandGrad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" } as const;

export default function TryIt() {
  const [mode, setMode] = useState<"chat" | "voice">("chat");
  const [lang, setLang] = useState<UiLang>("en");
  const { log, add } = useEventLog();
  const chat = useChatDemo(lang, setLang, add);
  const isChat = mode === "chat";

  return (
    <SiteLayout>
      <SEOHead seo={SEO_TRY} path="/try" jsonLd={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Try it live", path: "/try" }])} />
      <ThemeStyle css={`${TRY_CSS}\n${CALL_CSS}`} />
      <div className="call-page" style={{ background: t.bg, color: t.text, fontFamily: "Inter, 'Noto Sans Devanagari', system-ui, sans-serif", lineHeight: 1.5 }}>
        <section style={{ position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${t.dot} 1px, transparent 1.4px)`, backgroundSize: "22px 22px", WebkitMaskImage: "radial-gradient(60% 80% at 50% 0%, #000 20%, transparent 75%)", maskImage: "radial-gradient(60% 80% at 50% 0%, #000 20%, transparent 75%)" }} />
          <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "clamp(32px, 4.44vw, 64px) 24px 24px", textAlign: "center" }}>
            <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: ".1em", color: t.brand }}>TRY GOOCLAIM OS · SAMPLE CLAIM</div>
            <h1 style={{ margin: "14px auto 0", fontSize: "clamp(36px, 4.8vw, 64px)", lineHeight: 1.04, fontWeight: 600, letterSpacing: "-0.045em", maxWidth: 900 }}>
              Message it. Call it. <span style={gradText}>One system of record.</span>
            </h1>
            <p style={{ margin: "16px auto 0", fontSize: 18, color: t.text2, maxWidth: 640 }}>
              {isChat
                ? `Be the member. Ask about claim ${SAMPLE_CLAIM.number} on a messaging channel — in English, Hindi or Hinglish. Every message is checked before it is sent, and every step lands on the record.`
                : "Call the real voice agent as a test member, for 30 seconds — in English, Hindi or Hinglish. It answers only from the claim, and the call is recorded as a test."}
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 30 }}>
              <div role="tablist" aria-label="Channel" style={{ display: "inline-flex", padding: 5, borderRadius: 14, background: t.surface2, border: `1px solid ${t.border}` }}>
                {(["chat", "voice"] as const).map((m) => (
                  <button key={m} type="button" role="tab" aria-selected={mode === m} onClick={() => setMode(m)} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 10, border: "none", ...segment(mode === m), font: "inherit", fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
                    {m === "chat" ? (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg>
                    ) : (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={PHONE_PATH} /></svg>
                    )}
                    {m === "chat" ? "Messaging" : "30-sec voice call"}
                  </button>
                ))}
              </div>
              {isChat && (
                <div role="radiogroup" aria-label="Language" style={{ display: "inline-flex", padding: 5, borderRadius: 14, background: t.surface2, border: `1px solid ${t.border}` }}>
                  {LANGS.map(([k, label]) => (
                    <button key={k} type="button" role="radio" aria-checked={lang === k} onClick={() => setLang(k)} style={{ padding: "10px 16px", borderRadius: 10, border: "none", ...segment(lang === k), font: "inherit", fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {isChat ? (
          <section style={{ maxWidth: 1240, margin: "0 auto", padding: "24px 24px clamp(48px, 6.67vw, 96px)", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "stretch" }}>
            <div style={{ flex: "1.5 1 560px", minWidth: 0, borderRadius: 28, padding: "clamp(14px, 3vw, 32px)", background: t.panel }}>
              <TryChat chat={chat} />
            </div>
            <TrySide uploaded={chat.uploaded} log={log} />
          </section>
        ) : (
          <div style={{ paddingTop: 16 }}>
            <LiveVoice lang={lang} setLang={setLang} />
          </div>
        )}

        <section style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 96px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 16 }}>
            {RULES.map((r) => (
              <div key={r.k} style={{ padding: 24, borderRadius: 20, border: `1px solid ${t.border}`, background: t.surface }}>
                <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", color: t.brand }}>{r.k}</div>
                <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 8 }}>{r.title}</div>
                <div style={{ fontSize: 14, color: t.text2, marginTop: 6 }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
