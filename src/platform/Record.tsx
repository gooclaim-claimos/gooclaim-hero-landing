import { Link } from "react-router-dom";
import { CLAIM, LEDGER_ROWS, LEDGER_TAGS, TODAY, WITH_GC } from "./data";
import { eyebrow, mono, t } from "./theme";

/** Beside the seven layers: the audit ledger. */
export function AuditLedger() {
  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "96px 24px 40px" }}>
      <div style={{ borderRadius: 28, padding: "clamp(28px, 5vw, 56px)", background: t.panelAmber, display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center" }}>
        <div style={{ flex: "1 1 360px", minWidth: 0 }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: ".08em", color: t.amber }}>BESIDE THE 7 LAYERS · AUDIT LEDGER</div>
          <h2 style={{ margin: "14px 0 0", fontSize: "clamp(30px, 3.6vw, 46px)", lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.04em" }}>
            If the regulator asks what happened on claim X at time Y — you have the receipt.
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
            {LEDGER_TAGS.map((g) => (
              <span key={g} style={{ padding: "7px 12px", borderRadius: 999, background: t.surface, border: `1px solid ${t.border}`, fontSize: 13 }}>{g}</span>
            ))}
          </div>
          <Link to="/platform/audit-ledger" style={{ display: "inline-block", marginTop: 18, fontSize: 14, fontWeight: 500, color: t.text, textDecoration: "none" }}>
            More on the Audit Ledger →
          </Link>
        </div>
        <div style={{ flex: "1 1 380px", minWidth: 0, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, padding: 22, fontFamily: mono, fontSize: 13, boxShadow: t.cardShadow }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: t.text3, fontSize: 11 }}>
            <span>AUDIT RECORD</span>
            <span>#9F3A…B842</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: "10px 14px", marginTop: 16 }}>
            {LEDGER_ROWS.map(([k, v]) => (
              <span key={k} style={{ display: "contents" }}>
                <span style={{ color: t.text3 }}>{k}</span>
                <span>{v}</span>
              </span>
            ))}
          </div>
          <div style={{ marginTop: 16, paddingTop: 12, borderTop: `1px dashed ${t.border}`, color: t.green, fontSize: 11 }}>SEALED · CHAINED TO PREVIOUS RECORD</div>
        </div>
      </div>
    </section>
  );
}

/** 03 · Five systems hold a piece of the answer. */
export function Coverage() {
  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "96px 24px 40px" }}>
      <div style={eyebrow}>03 · COVERAGE</div>
      <h2 style={{ margin: "14px 0 0", fontSize: "clamp(30px, 3.8vw, 48px)", lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.04em", maxWidth: 900 }}>
        Five systems hold a piece of the answer. <span style={{ color: t.text3 }}>None of them holds the answer.</span>
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 40 }}>
        <div style={{ flex: "1 1 420px", minWidth: 0, padding: 24, borderRadius: 22, border: `1px solid ${t.border}`, background: t.surface }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", color: t.red }}>TODAY · ONE MEMBER QUESTION</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
            {TODAY.map((x) => (
              <div key={x.where} style={{ padding: "14px 16px", borderRadius: 14, background: t.surface2 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <span style={{ fontFamily: mono, fontSize: 11, color: t.text3 }}>{x.where}</span>
                  <span style={{ fontSize: 12, color: t.red }}>{x.gap}</span>
                </div>
                <div style={{ fontSize: 15, marginTop: 4 }}>{x.what}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: "1 1 420px", minWidth: 0, padding: 24, borderRadius: 22, border: `1px solid ${t.brandLine}`, background: t.surface }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", color: t.brand }}>WITH GOOCLAIM OS · ONE RECORD · {CLAIM}</div>
          <div style={{ position: "relative", marginTop: 18, paddingLeft: 26 }}>
            <div aria-hidden="true" style={{ position: "absolute", left: 7, top: 6, bottom: 6, width: 2, background: t.brandGrad }} />
            {WITH_GC.map((w) => (
              <div key={w.what} style={{ position: "relative", paddingBottom: 18 }}>
                <span style={{ position: "absolute", left: -24, top: 5, width: 12, height: 12, borderRadius: 999, background: t.surface, border: `3px solid ${t.brand}` }} />
                <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: mono, fontSize: 12, color: t.brand }}>{w.when}</span>
                  <b style={{ fontWeight: 600 }}>{w.what}</b>
                </div>
                <div style={{ fontSize: 13, color: t.text2 }}>{w.how}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
