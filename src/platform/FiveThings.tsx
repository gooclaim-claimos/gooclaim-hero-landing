import { useEffect, useRef, useState } from "react";
import { SOURCE_CONNECTORS } from "@/data/connectors";
import ConnectorIcon from "@/site/ConnectorIcon";
import { useAutoplay, useSeen } from "@/site/useAutoplay";
import { CLAIM, STEPS } from "./data";
import { eyebrow, h2Big, mono, t } from "./theme";

const card = { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18, padding: "16px 18px" } as const;

/** Each beat of the tour: the member's message types, then the five steps. */
const STEP_MS = 2300;
/** How long a step "works" (spinner) before its line is done. */
const WORK_MS = 1000;

/** The ledger row each step writes. Fixed values: this is a picture, not a clock. */
const LEDGER = [
  { ev: "cms.read", hash: "9f2c…a71e" },
  { ev: "knowledge.search", hash: "41bd…0c93" },
  { ev: "workflow.run · claim_status", hash: "c07a…5f12" },
  { ev: "policy.check · 4/4", hash: "7e19…b4d8" },
  { ev: "message.sent · whatsapp", hash: "2a6f…e830" },
];

const KNOWLEDGE_MARKS = ["notion", "google_drive", "sharepoint", "s3"].map((id) => SOURCE_CONNECTORS.find((c) => c.id === id)).filter((c): c is NonNullable<typeof c> => !!c);

function Check() {
  return (
    <svg className="gc-pop" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/** 01 · One message, five things before it is answered — played out live. */
export function FiveThings() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useSeen(ref);
  // Beat 0 = the member typing; beats 1–5 = the five steps.
  const tour = useAutoplay({ count: STEPS.length + 1, stepMs: STEP_MS, start: seen, rest: STEPS.length });
  const cur = tour.step - 1;
  const [working, setWorking] = useState(false);
  const [matched, setMatched] = useState(4);

  useEffect(() => {
    if (!tour.playing || cur < 0) {
      setWorking(false);
      return;
    }
    setWorking(true);
    setMatched(0);
    const tick = cur === 3 ? window.setInterval(() => setMatched((m) => Math.min(4, m + 1)), WORK_MS / 5) : null;
    const done = window.setTimeout(() => {
      setWorking(false);
      setMatched(4);
    }, WORK_MS);
    return () => {
      window.clearTimeout(done);
      if (tick !== null) window.clearInterval(tick);
    };
  }, [cur, tour.playing]);

  const typed = tour.step > 0 || !tour.playing;
  const isDone = (i: number) => i < cur || (i === cur && !working);

  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(56px, 7.78vw, 112px) 24px 40px" }}>
      <div style={eyebrow}>01 · AN OS, NOT A CHATBOT</div>
      <h2 style={{ ...h2Big, maxWidth: 900 }}>
        One message, on a Sunday. <span style={{ color: t.text3 }}>Five things happen before it is answered.</span>
      </h2>
      <div ref={ref} style={{ display: "flex", flexWrap: "wrap", gap: 24, marginTop: 44 }}>
        <div role="tablist" aria-label="Five steps" style={{ flex: "1 1 380px", minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {STEPS.map((s, i) => {
            const open = i === cur;
            const reached = i <= cur;
            return (
              <button key={s.title} type="button" role="tab" aria-selected={open} onClick={() => tour.pick(i + 1)} style={{ position: "relative", overflow: "hidden", textAlign: "left", display: "flex", gap: 14, padding: "16px 18px", borderRadius: 16, border: `1px solid ${open ? t.border : "transparent"}`, background: open ? t.surface : "transparent", color: t.text, font: "inherit", cursor: "pointer" }}>
                <span style={{ flex: "none", width: 30, height: 30, borderRadius: 999, background: reached ? t.brand : t.track, color: reached ? t.numOn : t.text3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, transition: "background .4s var(--gc-ease), color .4s" }}>{i + 1}</span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontWeight: 600, fontSize: 16 }}>{s.title}</span>
                  <span style={{ display: "block", fontFamily: mono, fontSize: 11, color: t.text3, marginTop: 2 }}>{s.tech}</span>
                  {open && (
                    <span key={i} className="gc-row-in" style={{ display: "block" }}>
                      <span style={{ display: "block", fontSize: 14, color: t.text2, marginTop: 8 }}>{s.desc}</span>
                      {i === 1 && (
                        <span style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 10 }}>
                          {KNOWLEDGE_MARKS.map((c) => (
                            <ConnectorIcon key={c.id} c={c} size={20} />
                          ))}
                          <span style={{ fontSize: 12, color: t.text3 }}>+ policy PDFs</span>
                        </span>
                      )}
                    </span>
                  )}
                </span>
                {open && tour.playing && <span key={`bar-${i}`} aria-hidden="true" className="gc-bar" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, background: t.brandGrad, ["--gc-dur" as string]: `${STEP_MS}ms` }} />}
              </button>
            );
          })}
        </div>

        <div style={{ flex: "1 1 420px", minWidth: 0, borderRadius: 26, padding: "clamp(16px, 3vw, 32px)", background: t.panel, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <span style={{ fontFamily: mono, fontSize: 11, color: t.text3 }}>INBOUND · WHATSAPP · ENGLISH · REGISTERED NUMBER</span>
              {!tour.playing && seen && (
                <button type="button" onClick={tour.replay} style={{ flex: "none", border: "none", background: "none", padding: 0, fontFamily: mono, fontSize: 11, color: t.brand, cursor: "pointer" }}>
                  ↻ REPLAY
                </button>
              )}
            </div>
            {typed ? (
              <div className="gc-row-in" style={{ fontSize: 16, marginTop: 6 }}>“What is happening with claim {CLAIM}? It has been 9 days.”</div>
            ) : (
              <div style={{ marginTop: 10, color: t.text3 }} aria-label="Member is typing">
                <span className="gc-typing"><i /><i /><i /></span>
              </div>
            )}
          </div>

          <div style={card}>
            <div style={{ fontFamily: mono, fontSize: 11, color: t.text3 }}>WHAT THE OS DID WITH IT</div>
            <div aria-live="polite" style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 8 }}>
              {STEPS.map((s, i) => {
                const done = isDone(i);
                const busy = i === cur && working;
                const label = i === 3 && busy ? `${matched} of 4 values matched to the record` : s.did;
                return (
                  <div key={s.title} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 0", fontSize: 14, color: i === cur ? t.text : t.text2, opacity: done || busy ? 1 : 0.4, transition: "opacity .4s var(--gc-ease), color .4s" }}>
                    <span style={{ flex: "none", width: 18, height: 18, borderRadius: 999, background: done ? t.doneDot : busy ? "transparent" : t.track, color: done ? "#fff" : t.brand, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, transition: "background .3s" }}>
                      {done ? <Check key={`c-${i}-${tour.step}`} /> : busy ? <span className="gc-spin" style={{ width: 14, height: 14 }} /> : i + 1}
                    </span>
                    {label}
                  </div>
                );
              })}
            </div>
          </div>

          {isDone(4) && (
            <div className="gc-row-in" style={{ background: t.btnBg, color: t.btnText, borderRadius: 18, padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontFamily: mono, fontSize: 11, opacity: 0.7 }}>
                <span>OUTBOUND · APPROVED WORDING</span>
                <span>SENT ✓✓</span>
              </div>
              <div style={{ fontSize: 15, marginTop: 6 }}>Your claim {CLAIM} is with the medical team. We are still waiting on the discharge summary — please send it using this link.</div>
            </div>
          )}

          <div style={{ ...card, padding: "12px 16px", fontFamily: mono, fontSize: 11, color: t.text3, display: "flex", flexDirection: "column", gap: 4 }}>
            <span>AUDIT LEDGER · {CLAIM}</span>
            {LEDGER.map((l, i) =>
              isDone(i) ? (
                <span key={l.ev} className="gc-row-in" style={{ display: "flex", gap: 10, color: t.text2 }}>
                  <span>SUN 10:42:0{i + 1}</span>
                  <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.ev}</span>
                  <span style={{ color: t.text3 }}>{l.hash}</span>
                </span>
              ) : null,
            )}
          </div>
          <div style={{ fontSize: 13, color: t.text2 }}>Each line is a row in the audit ledger, with its claim and time.</div>
        </div>
      </div>
    </section>
  );
}
