import { useState } from "react";
import { Link } from "react-router-dom";
import { CLAIM, LAYERS, STEPS } from "./data";
import { eyebrow, h2Big, mono, t } from "./theme";

const card = { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18, padding: "16px 18px" } as const;

/** 01 · One message, five things before it is answered. */
export function FiveThings() {
  const [step, setStep] = useState(0);

  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "112px 24px 40px" }}>
      <div style={eyebrow}>01 · AN OS, NOT A CHATBOT</div>
      <h2 style={{ ...h2Big, maxWidth: 900 }}>
        One message, on a Sunday. <span style={{ color: t.text3 }}>Five things happen before it is answered.</span>
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginTop: 44 }}>
        <div role="tablist" aria-label="Five steps" style={{ flex: "1 1 380px", minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {STEPS.map((s, i) => {
            const open = i === step;
            const reached = i <= step;
            return (
              <button key={s.title} type="button" role="tab" aria-selected={open} onClick={() => setStep(i)} style={{ textAlign: "left", display: "flex", gap: 14, padding: "16px 18px", borderRadius: 16, border: `1px solid ${open ? t.border : "transparent"}`, background: open ? t.surface : "transparent", color: t.text, font: "inherit", cursor: "pointer" }}>
                <span style={{ flex: "none", width: 30, height: 30, borderRadius: 999, background: reached ? t.brand : t.track, color: reached ? t.numOn : t.text3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600 }}>{i + 1}</span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontWeight: 600, fontSize: 16 }}>{s.title}</span>
                  <span style={{ display: "block", fontFamily: mono, fontSize: 11, color: t.text3, marginTop: 2 }}>{s.tech}</span>
                  {open && (
                    <>
                      <span style={{ display: "block", fontSize: 14, color: t.text2, marginTop: 8 }}>{s.desc}</span>
                      <span style={{ display: "block", fontSize: 13, color: t.red, marginTop: 8 }}>Chatbot: {s.bot}</span>
                    </>
                  )}
                </span>
              </button>
            );
          })}
        </div>
        <div style={{ flex: "1 1 420px", minWidth: 0, borderRadius: 26, padding: "clamp(16px, 3vw, 32px)", background: t.panel, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={card}>
            <div style={{ fontFamily: mono, fontSize: 11, color: t.text3 }}>INBOUND · WHATSAPP · ENGLISH · REGISTERED NUMBER</div>
            <div style={{ fontSize: 16, marginTop: 6 }}>“What is happening with claim {CLAIM}? It has been 9 days.”</div>
          </div>
          <div style={card}>
            <div style={{ fontFamily: mono, fontSize: 11, color: t.text3 }}>WHAT THE OS DID WITH IT</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 8 }}>
              {STEPS.map((s, i) => {
                const reached = i <= step;
                return (
                  <div key={s.title} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 0", fontSize: 14, color: i === step ? t.text : t.text2, opacity: reached ? 1 : 0.4, transition: "opacity .3s" }}>
                    <span style={{ flex: "none", width: 18, height: 18, borderRadius: 999, background: reached ? t.doneDot : t.track, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>{reached ? "✓" : i + 1}</span>
                    {s.did}
                  </div>
                );
              })}
            </div>
          </div>
          {step === 4 && (
            <div style={{ background: t.btnBg, color: t.btnText, borderRadius: 18, padding: "16px 18px" }}>
              <div style={{ fontFamily: mono, fontSize: 11, opacity: 0.7 }}>OUTBOUND · APPROVED WORDING</div>
              <div style={{ fontSize: 15, marginTop: 6 }}>Your claim {CLAIM} is with the medical team. We are still waiting on the discharge summary — please send it using this link.</div>
            </div>
          )}
          <div style={{ fontSize: 13, color: t.text2 }}>Each line is a row in the audit ledger, with its claim and time.</div>
        </div>
      </div>
    </section>
  );
}

/** 02 · Seven layers, one OS. */
export function SevenLayers() {
  const [sel, setSel] = useState(0);
  const layer = LAYERS[sel];

  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "112px 24px 40px" }}>
      <div style={eyebrow}>02 · INSIDE THE OS</div>
      <h2 style={h2Big}>
        Seven layers. <span style={{ color: t.text3 }}>One OS.</span>
      </h2>
      <p style={{ margin: "14px 0 0", fontSize: 17, color: t.text2, maxWidth: 640 }}>Each layer does one job well. Every layer is multi-tenant, audit-instrumented and platform-agnostic.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginTop: 40 }}>
        <div style={{ flex: "1 1 420px", minWidth: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 190px), 1fr))", gap: 10, alignContent: "start" }}>
          {LAYERS.map((l, i) => {
            const on = i === sel;
            return (
              <button key={l.name} type="button" onClick={() => setSel(i)} aria-pressed={on} style={{ textAlign: "left", padding: 18, borderRadius: 16, border: `1px solid ${on ? t.brandLine : t.border}`, background: on ? t.brandSoft : t.surface, color: t.text, font: "inherit", cursor: "pointer" }}>
                <span style={{ display: "block", fontFamily: mono, fontSize: 11, color: on ? t.brand : t.text3 }}>0{i + 1}</span>
                <span style={{ display: "block", fontWeight: 600, marginTop: 6 }}>{l.name}</span>
                <span style={{ display: "block", fontSize: 13, color: t.text2, marginTop: 2 }}>{l.tag}</span>
              </button>
            );
          })}
        </div>
        <div style={{ flex: "1 1 380px", minWidth: 0, padding: 28, borderRadius: 22, border: `1px solid ${t.border}`, background: t.surface, alignSelf: "start" }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", color: t.brand }}>LAYER 0{sel + 1} · MULTI-TENANT · AUDIT-INSTRUMENTED</div>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.03em", marginTop: 10 }}>{layer.name}</div>
          <div style={{ fontSize: 16, color: t.text2, marginTop: 8 }}>{layer.desc}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
            {layer.points.map((p) => (
              <span key={p} style={{ padding: "6px 12px", borderRadius: 999, background: t.brandSoft, color: t.brand, fontSize: 13, fontWeight: 500 }}>{p}</span>
            ))}
          </div>
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${t.border}`, fontSize: 14, color: t.text2 }}>
            <b style={{ color: t.text, fontWeight: 600 }}>Solves:</b> {layer.solves}
          </div>
          {layer.slug && (
            <Link to={`/platform/${layer.slug}`} style={{ display: "inline-block", marginTop: 16, fontSize: 14, fontWeight: 500, color: t.brand, textDecoration: "none" }}>
              More on the {layer.name} →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
