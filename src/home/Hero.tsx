import { type CSSProperties } from "react";
import { Link } from "react-router-dom";
import ClaimCard from "./ClaimCard";
import { mono, t } from "./theme";
import { useSampleDates } from "./useSampleDates";

const BARS: [number, string][] = [[12, "0s"], [22, "-.2s"], [28, "-.4s"], [16, "-.6s"], [24, "-.8s"], [14, "-.3s"], [26, "-.5s"], [18, "-.7s"]];
const TRUST = ["Regulator clocks on every claim", "Consent before a word", "Immutable audit ledger"];

const floatCard = (rotate: string): CSSProperties => ({
  padding: 16,
  borderRadius: 20,
  background: t.glassStrong,
  border: `1px solid ${t.glassLine}`,
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  boxShadow: t.floatShadow,
  textAlign: "left",
  transform: `rotate(${rotate})`,
});

const blob = (style: CSSProperties): CSSProperties => ({ position: "absolute", borderRadius: 999, ...style });

function Check({ size, stroke, width }: { size: number; stroke: string; width: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function LeftCards() {
  const dates = useSampleDates();
  return (
    <div className="gc-hide-sm" style={{ flex: "0 1 250px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={floatCard("-2deg")}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 10, color: t.text3 }}>
          <span>WHATSAPP · MEMBER</span>
          <span>09:14</span>
        </div>
        <div style={{ marginTop: 10, padding: "9px 12px", borderRadius: "14px 14px 4px 14px", background: t.btnBg, color: t.btnText, fontSize: 13, marginLeft: 18 }}>Mera claim kahan tak pahuncha?</div>
        <div style={{ marginTop: 8, padding: "9px 12px", borderRadius: "14px 14px 14px 4px", background: t.surface2, fontSize: 13, marginRight: 18 }}>
          Documents pending — discharge summary. Source: insurer{dates ? `, ${dates.updated}` : ""}.
        </div>
      </div>
      <div style={floatCard("1.5deg")}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: mono, fontSize: 10, color: t.text3 }}>VOICE · HINDI</span>
          <span style={{ fontFamily: mono, fontSize: 10, color: t.green }}>● LIVE 0:42</span>
        </div>
        <div aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: 3, height: 30, marginTop: 10 }}>
          {BARS.map(([h, delay], i) => (
            <span key={i} style={{ width: 3, height: h, borderRadius: 3, background: t.brand, animation: "gcBar 1s ease-in-out infinite", animationDelay: delay }} />
          ))}
        </div>
        <div lang="hi" style={{ fontSize: 13, marginTop: 8 }}>“दो दस्तावेज़ बाकी हैं — डिस्चार्ज समरी और फ़ाइनल बिल।”</div>
      </div>
    </div>
  );
}

function RightCards() {
  return (
    <div className="gc-hide-sm" style={{ flex: "0 1 250px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={floatCard("2deg")}>
        <div style={{ fontFamily: mono, fontSize: 10, color: t.text3 }}>POLICY GATE</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
          <span style={{ width: 30, height: 30, borderRadius: 999, background: t.greenSoft, color: t.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Check size={15} stroke="currentColor" width="2.6" />
          </span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>4 of 4 values matched</div>
            <div style={{ fontSize: 12, color: t.text2 }}>Approved wording · sent</div>
          </div>
        </div>
      </div>
      <div style={floatCard("-1.5deg")}>
        <div style={{ fontFamily: mono, fontSize: 10, color: t.text3 }}>AUDIT LEDGER</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10, fontFamily: mono, fontSize: 11 }}>
          {[["consent.granted", "14:22:01"], ["cms.read", "14:22:04"], ["message.sent", "14:22:08"]].map(([ev, at]) => (
            <div key={ev} style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{ev}</span>
              <span style={{ color: t.text3 }}>{at}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: t.amber }}>Sealed · SHA-256 chained</div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" style={{ position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={blob({ width: 720, height: 720, left: -260, top: -320, background: t.meshA, animation: "gcDrift 16s ease-in-out infinite" })} />
      <div aria-hidden="true" style={blob({ width: 640, height: 640, right: -240, top: -200, background: t.meshC, animation: "gcDrift 20s ease-in-out infinite reverse" })} />

      <div style={{ position: "relative", maxWidth: 1080, margin: "0 auto", padding: "104px 24px 56px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 6px 6px 14px", border: `1px solid ${t.glassLine}`, borderRadius: 999, background: t.glass, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", fontSize: 13, color: t.text2 }}>
          <span>The Claim OS for TPAs &amp; insurers</span>
          <Link to="/call" style={{ padding: "3px 10px", borderRadius: 999, background: t.btnBg, color: t.btnText, fontSize: 12, fontWeight: 500 }}>New · Voice agent →</Link>
        </div>
        <h1 style={{ margin: "28px auto 0", fontSize: "clamp(46px, 6.8vw, 96px)", lineHeight: 0.98, fontWeight: 500, letterSpacing: "-0.055em" }}>
          Built for every claim.
          <br />
          <span style={{ background: t.brandGrad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Every channel. Every CMS.</span>
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
          <div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "center" }}>
            <LeftCards />
            <ClaimCard />
            <RightCards />
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
