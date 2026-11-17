import { useRef, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useAutoplay, useSeen } from "@/site/useAutoplay";
import ClaimCard, { STAGE_COUNT } from "./ClaimCard";
import { LeftCards, RightCards } from "./HeroCards";
import { t } from "./theme";

const STAGE_MS = 2800;

const TRUST = ["Regulator clocks on every claim", "Consent before a word", "Immutable audit ledger"];

const blob = (style: CSSProperties): CSSProperties => ({ position: "absolute", borderRadius: 999, ...style });

function Check({ size, stroke, width }: { size: number; stroke: string; width: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export default function Hero() {
  const stage = useRef<HTMLDivElement>(null);
  // One tour for the whole stage: the claim card and the cards around it move together.
  const tour = useAutoplay({ count: STAGE_COUNT, stepMs: STAGE_MS, start: useSeen(stage), loop: true, initial: 0, rest: STAGE_COUNT - 1 });

  return (
    <section id="top" style={{ position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={blob({ width: 720, height: 720, left: -260, top: -320, background: t.meshA, animation: "gcDrift 16s ease-in-out infinite" })} />
      <div aria-hidden="true" style={blob({ width: 640, height: 640, right: -240, top: -200, background: t.meshC, animation: "gcDrift 20s ease-in-out infinite reverse" })} />

      <div style={{ position: "relative", maxWidth: 1080, margin: "0 auto", padding: "clamp(52px, 7.22vw, 104px) 24px 56px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 6px 6px 14px", border: `1px solid ${t.glassLine}`, borderRadius: 999, background: t.glass, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", fontSize: 13, color: t.text2 }}>
          <span>The Claim OS for TPAs &amp; insurers</span>
          <Link to="/call" style={{ padding: "3px 10px", borderRadius: 999, background: t.btnBg, color: t.btnText, fontSize: 12, fontWeight: 500 }}>New · Voice agent →</Link>
        </div>
        <h1 style={{ margin: "28px auto 0", fontSize: "clamp(46px, 6.8vw, 96px)", lineHeight: 0.98, fontWeight: 500, letterSpacing: "-0.055em" }}>
          Built for every claim.
          <br />
          <span style={{ backgroundImage: t.brandGrad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Every channel. Every CMS.</span>
        </h1>
        <p style={{ margin: "26px auto 0", fontSize: 19, color: t.text2, maxWidth: 600 }}>Claims don’t get stuck at the decision. They get stuck between the steps. Gooclaim OS keeps every claim moving — and every clock in sight.</p>
        <div style={{ display: "flex", gap: 12, marginTop: 34, flexWrap: "wrap", justifyContent: "center" }}>
          <a href="#walkthrough" style={{ display: "inline-flex", alignItems: "center", height: 52, padding: "0 26px", borderRadius: 999, background: t.btnBg, color: t.btnText, fontWeight: 500, boxShadow: "0 10px 30px rgba(12,10,9,.16)" }}>Book a walkthrough</a>
          <Link to="/call" style={{ display: "inline-flex", alignItems: "center", gap: 10, height: 52, padding: "0 22px", borderRadius: 999, border: `1px solid ${t.glassLine}`, background: t.glassStrong, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", fontWeight: 500 }}>
            <span style={{ width: 26, height: 26, borderRadius: 999, background: "linear-gradient(135deg, #2563EB, #0891B2)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 5v14l12-7z" />
              </svg>
            </span>
            Try a 30-second call
          </Link>
        </div>
        <Link to="/try" style={{ display: "inline-block", marginTop: 16, fontSize: 14, color: t.text2 }}>or message the claims desk →</Link>
      </div>

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 24px 24px" }}>
        <div style={{ position: "relative", overflow: "hidden", borderRadius: 36, border: `1px solid ${t.stageLine}`, background: t.stageBase, boxShadow: t.stageShadow, padding: "clamp(24px, 5vw, 64px) clamp(16px, 4vw, 48px)" }}>
          <div aria-hidden="true" style={blob({ width: 560, height: 560, left: -120, bottom: -260, background: t.meshA, animation: "gcDrift 14s ease-in-out infinite" })} />
          <div aria-hidden="true" style={blob({ width: 520, height: 520, right: -140, top: -220, background: t.meshB, animation: "gcDrift 18s ease-in-out infinite reverse" })} />
          <div aria-hidden="true" style={blob({ width: 360, height: 360, left: "40%", top: "30%", background: t.meshC })} />
          <div ref={stage} style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "center" }}>
            <LeftCards step={tour.step} playing={tour.playing} />
            <ClaimCard tour={tour} />
            <RightCards step={tour.step} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "20px 24px 8px", display: "flex", gap: 22, flexWrap: "wrap", justifyContent: "center", fontSize: 13, color: t.text2 }}>
        {TRUST.map((label) => (
          <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
            <Check size={14} stroke={t.brand} width="2.4" />
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
