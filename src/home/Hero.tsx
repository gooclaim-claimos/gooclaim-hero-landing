import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { CompactSystem, heroSystemCss, WideSystem } from "./HeroSystem";
import { mono, t } from "./theme";

const BUILT_FOR = [
  { label: "TPAs", to: "/solutions/tpas" },
  { label: "Insurers", to: "/solutions/insurers" },
  { label: "Hospitals", to: "/solutions/hospitals" },
];

const glassPill: CSSProperties = { border: `1px solid ${t.border}`, background: t.osGlass, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" };

export default function Hero() {
  return (
    <section id="top" className="gc-os" style={{ position: "relative", overflow: "hidden", borderBottom: `1px solid ${t.border}` }}>
      <style>{heroSystemCss}</style>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${t.osDot} 1px, transparent 1px)`, backgroundSize: "32px 32px", WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 78%, #000 10%, transparent 100%)", maskImage: "radial-gradient(ellipse 60% 50% at 50% 78%, #000 10%, transparent 100%)" }} />
      <WideSystem />

      <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "clamp(48px, 5vw, 72px) clamp(16px, 4vw, 40px) 0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <Link to="/call" style={{ ...glassPill, display: "inline-flex", alignItems: "center", gap: 12, minHeight: 44, padding: "5px 6px 5px 18px", borderRadius: 999, fontSize: 14.5, color: t.text2 }}>
          <span className="gc-wide-text">The Claim OS for TPAs, insurers &amp; hospitals</span>
          <span className="gc-narrow-text" style={{ whiteSpace: "nowrap" }}>The Claim OS</span>
          <span style={{ padding: "6px 12px", borderRadius: 999, background: t.btnBg, color: t.btnText, fontSize: 13, fontWeight: 500, whiteSpace: "nowrap" }}>New · Voice agent →</span>
        </Link>
        <h1 style={{ margin: "28px 0 0", fontSize: "clamp(40px, 6.1vw, 88px)", lineHeight: 1.04, fontWeight: 500, letterSpacing: "-0.045em" }}>
          Built for every claim.
          <br />
          <span style={{ backgroundImage: t.osGrad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Every channel. Every CMS.</span>
        </h1>
        <p style={{ margin: "24px 0 0", maxWidth: 640, fontSize: "clamp(17px, 1.4vw, 19px)", color: t.text2 }}>Claims don’t get stuck at the decision. They get stuck between the steps. Gooclaim OS keeps every claim moving — and every clock in sight.</p>
        <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <a href="#walkthrough" style={{ display: "inline-flex", alignItems: "center", height: 56, padding: "0 28px", borderRadius: 999, background: t.btnBg, color: t.btnText, fontSize: 17, fontWeight: 500 }}>Book a walkthrough</a>
          <Link to="/call" style={{ ...glassPill, display: "inline-flex", alignItems: "center", gap: 12, height: 56, padding: "0 26px 0 12px", borderRadius: 999, color: t.text, fontSize: 17, fontWeight: 500 }}>
            <span style={{ width: 32, height: 32, borderRadius: 999, background: t.osPlay, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true">
                <path d="M7 4l14 8-14 8z" />
              </svg>
            </span>
            Try a 30-second call
          </Link>
        </div>
        <Link to="/try" style={{ marginTop: 16, minHeight: 44, display: "inline-flex", alignItems: "center", fontSize: 15, color: t.text2 }}>or message the claims desk →</Link>
        <div style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center", fontSize: 13, color: t.text3 }}>
          <span style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: ".1em" }}>BUILT FOR</span>
          {BUILT_FOR.map((s) => (
            <Link key={s.to} to={s.to} style={{ ...glassPill, display: "inline-flex", alignItems: "center", minHeight: 32, padding: "0 12px", borderRadius: 999, color: t.text2, fontWeight: 500 }}>{s.label}</Link>
          ))}
        </div>
      </div>

      <CompactSystem />
    </section>
  );
}
