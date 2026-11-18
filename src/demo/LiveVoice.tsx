import { useEffect, useRef } from "react";
import CallStage from "./CallStage";
import { callTheme } from "./callTheme";
import type { CallLang } from "./speech";
import { useTurnstile } from "./turnstile";
import { mono } from "./tryTheme";
import { useLiveCall } from "./useLiveCall";

const { t } = callTheme;

const LANG_TAG = { hi: " · HI", hing: " · HING", en: " · EN" } as const;

/**
 * The one voice call on the website: the real agent, with its transcript and
 * call log. /call and the voice tab of /try both show this, so a visitor never
 * meets two different "voice agents". The page adds CALL_CSS.
 */
export default function LiveVoice({ lang, setLang }: { lang: CallLang; setLang: (l: CallLang) => void }) {
  const live = useLiveCall();
  const checkBox = useRef<HTMLDivElement>(null);
  const check = useTurnstile(checkBox);
  const lines = live.lines;
  const log = live.events;
  const startCall = () => {
    void live.start(lang, check.token);
    // A token is single-use: the next call needs a fresh one.
    check.reset();
  };
  const transcript = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (transcript.current) transcript.current.scrollTop = transcript.current.scrollHeight;
  }, [lines]);

  const card = { flex: "1 1 300px", minWidth: 0, padding: 24, borderRadius: 24, border: `1px solid ${t.border}`, background: t.surface } as const;

  return (
    <>
      <CallStage live={live} lang={lang} setLang={setLang} checkBox={checkBox} ready={!!check.token} onStart={startCall} />

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
              <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", color: t.text3 }}>THIS CALL</span>
              <span style={{ fontSize: 12, color: t.green }}>● Recorded as a test</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 10, maxHeight: 320, overflowY: "auto" }}>
              {log.length === 0 && <div style={{ fontSize: 14, color: t.text3, padding: "8px 0" }}>The call’s start and end land here. In Gooclaim OS every check is a row on the claim’s audit ledger.</div>}
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
    </>
  );
}
