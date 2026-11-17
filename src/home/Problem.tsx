import { Link } from "react-router-dom";
import { mono, t } from "./theme";

const PARTIES = [
  { who: "HOSPITAL", quote: "We sent the bill.", holds: "The documents and the bill" },
  { who: "TPA", quote: "The insurer decides.", holds: "The claim record and the workflow" },
  { who: "INSURER", quote: "The TPA holds the data.", holds: "The decision and the money" },
  { who: "MEMBER", quote: "Nobody tells me anything.", holds: "Nothing but the wait", hot: true },
];

export const eyebrow = { fontFamily: mono, fontSize: 12, letterSpacing: ".08em", color: t.text3 } as const;
export const h2 = { margin: "16px 0 0", fontSize: "clamp(34px, 4.4vw, 56px)", lineHeight: 1.06, fontWeight: 500, letterSpacing: "-0.035em" } as const;

export function TrustStrip() {
  return (
    <section style={{ maxWidth: 1200, margin: "56px auto 0", padding: "0 24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap", padding: "28px 36px", borderRadius: 999, border: `1px solid ${t.glassLine}`, background: t.glass, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
        <div style={{ fontSize: 14, color: t.text2, maxWidth: 260 }}>Built in India, for the strictest claim clocks in the world.</div>
        <div style={{ display: "flex", gap: 36, flexWrap: "wrap", fontSize: 19, fontWeight: 500, letterSpacing: "-0.02em", color: t.text3 }}>
          <span>IRDAI clocks</span>
          <span>DPDP consent</span>
          <span>SHA-256 ledger</span>
          <span>
            EN · <span lang="hi">हिन्दी</span> · Hinglish
          </span>
        </div>
      </div>
    </section>
  );
}

export default function Problem() {
  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 40px" }}>
      <div style={eyebrow}>01 · THE PROBLEM</div>
      <h2 style={{ ...h2, maxWidth: 880 }}>
        A claim is decided by a system. <span style={{ color: t.text3 }}>It’s moved by people — and there aren’t enough of them.</span>
      </h2>
      <p style={{ margin: "20px 0 0", fontSize: 18, color: t.text2, maxWidth: 640 }}>The decision is rarely the problem. Claims stop between the steps — waiting on a document, a reply or a person — while the clock the law sets keeps running.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: 16, marginTop: 48 }}>
        {PARTIES.map((p) => (
          <div key={p.who} style={{ padding: 30, borderRadius: 26, border: `1px solid ${p.hot ? t.hotBorder : t.border}`, background: p.hot ? t.hotBg : t.surface, boxShadow: t.softShadow }}>
            <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: ".08em", color: p.hot ? t.red : t.text3 }}>{p.who}</div>
            <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-0.02em", marginTop: 10 }}>“{p.quote}”</div>
            <div style={{ fontSize: 14, color: t.text2, marginTop: 8 }}>Holds: {p.holds}</div>
          </div>
        ))}
      </div>
      <div style={{ position: "relative", overflow: "hidden", marginTop: 16, padding: "32px 36px", borderRadius: 26, background: "#0B0F19", color: "#F5F5F4", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <div aria-hidden="true" style={{ position: "absolute", width: 420, height: 420, left: -140, top: -220, borderRadius: 999, background: "radial-gradient(circle, rgba(59,130,246,.5) 0%, rgba(59,130,246,0) 65%)", animation: "gcDrift 14s ease-in-out infinite" }} />
        <div aria-hidden="true" style={{ position: "absolute", width: 380, height: 380, right: -120, bottom: -220, borderRadius: 999, background: "radial-gradient(circle, rgba(34,211,238,.35) 0%, rgba(34,211,238,0) 65%)" }} />
        <div style={{ position: "relative", fontSize: 19, maxWidth: 760 }}>
          <b style={{ fontWeight: 600 }}>Gooclaim OS moves the claim.</b> <span style={{ color: "#D6D3D1" }}>It chases what is owed, watches every clock and tells the member — all on the record, without replacing the system that decides.</span>
        </div>
        <Link to="/platform" style={{ position: "relative", padding: "12px 22px", borderRadius: 999, background: "#F5F5F4", color: "#0C0A09", fontSize: 14, fontWeight: 500 }}>How it works →</Link>
      </div>
    </section>
  );
}
