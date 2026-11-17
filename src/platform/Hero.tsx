import { Link } from "react-router-dom";
import { openWaitlist } from "@/lib/waitlist";
import { CONNECTORS, STATS } from "./data";
import { mono, t } from "./theme";

const fade = "radial-gradient(60% 70% at 80% 30%, #000 20%, transparent 75%)";

export function PlatformHero() {
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${t.dot} 1px, transparent 1.4px)`, backgroundSize: "22px 22px", WebkitMaskImage: fade, maskImage: fade }} />
      <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "80px 24px 56px" }}>
        <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: ".1em", color: t.brand }}>THE PLATFORM</div>
        <h1 style={{ margin: "14px 0 0", fontSize: "clamp(40px, 5.4vw, 72px)", lineHeight: 1.03, fontWeight: 600, letterSpacing: "-0.045em", maxWidth: 960 }}>
          One agentic core.{" "}
          <span style={{ background: t.brandGrad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Every channel. Every CMS.</span>
        </h1>
        <p style={{ margin: "20px 0 0", fontSize: 18, color: t.text2, maxWidth: 640 }}>
          Gooclaim OS is a Claim OS — a multi-agent system that reads any claims system, answers on any channel, and checks every word against your record before it leaves.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
          <button type="button" onClick={() => openWaitlist("platform-hero")} style={{ padding: "14px 26px", borderRadius: 999, border: "none", background: t.btnBg, color: t.btnText, font: "inherit", fontWeight: 500, cursor: "pointer" }}>
            Book a walkthrough
          </button>
          <Link to="/try" style={{ padding: "14px 26px", borderRadius: 999, border: `1px solid ${t.border}`, background: t.surface, fontWeight: 500, color: "inherit", textDecoration: "none" }}>
            Try it live
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 12, marginTop: 56 }}>
          {STATS.map((s) => (
            <div key={s.k} style={{ padding: 20, borderRadius: 18, border: `1px solid ${t.border}`, background: t.surface }}>
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", color: t.text3 }}>{s.k}</div>
              <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.03em", marginTop: 6 }}>{s.v}</div>
              <div style={{ fontSize: 13, color: t.text2 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Connectors() {
  return (
    <section style={{ borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, background: t.surface2 }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "56px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
          <h2 style={{ margin: 0, fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 600, letterSpacing: "-0.035em", maxWidth: 620 }}>
            50+ connectors out of the box. <span style={{ color: t.text3 }}>Your stack, plugged in.</span>
          </h2>
          <span style={{ fontFamily: mono, fontSize: 12, color: t.text3 }}>AND MORE VIA CONNECTOR HUB</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28 }}>
          {CONNECTORS.map((c) => (
            <span key={c} style={{ padding: "8px 14px", borderRadius: 10, border: `1px solid ${t.border}`, background: t.surface, fontSize: 13, fontWeight: 500, color: t.text2 }}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
