import { type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { openWaitlist } from "@/lib/waitlist";
import { eyebrow, h2 } from "./Problem";
import { mono, t } from "./theme";

const STEPS = [
  { n: "1", title: "Connect your claims system", desc: "By API, a secure file drop or a batch upload. Your knowledge library joins the same way.", note: "Read-only. Nothing is ever written back.", bg: "#6366F1" },
  { n: "2", title: "Approve your messages", desc: "Every member message, in each language, in your own words.", note: "Not one can be sent until your team approves it.", bg: "#8B5CF6" },
  { n: "3", title: "Test on your own claims", desc: "A testing stage with sample claims, on every channel and language, with the evidence.", note: "You sign it off before anything goes live.", bg: "#10B981" },
  { n: "4", title: "Go live, watched", desc: "One workflow at a time. The first days are monitored closely.", note: "Any workflow pauses in a click.", bg: "#F97316" },
];

const chip: CSSProperties = { padding: "6px 12px", borderRadius: 999, background: t.surface, border: `1px solid ${t.border}`, fontSize: 13 };
const bubble: CSSProperties = { alignSelf: "flex-start", padding: "12px 16px", borderRadius: 18, background: t.surface, border: `1px solid ${t.border}` };
const who: CSSProperties = { fontFamily: mono, fontSize: 10, color: t.text3, marginBottom: 4 };

export function Voice() {
  return (
    <section id="voice" style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 40px" }}>
      <div style={{ borderRadius: 32, padding: "clamp(28px, 5vw, 64px)", background: t.panelVoice, display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center" }}>
        <div style={{ flex: "1 1 340px", minWidth: 0 }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: ".08em", color: t.violet }}>03 · VOICE CALLS · EARLY ACCESS</div>
          <h2 style={{ margin: "16px 0 0", fontSize: "clamp(32px, 3.8vw, 48px)", lineHeight: 1.08, fontWeight: 500, letterSpacing: "-0.035em" }}>A voice agent that knows the claim.</h2>
          <p style={{ margin: "16px 0 0", fontSize: 17, color: t.text2 }}>The agent confirms who is calling, reads the claim from your system and answers in the caller's language — even when they switch mid-call.</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 22 }}>
            <span style={chip}>English</span>
            <span style={chip} lang="hi">हिन्दी</span>
            <span style={chip}>Hinglish</span>
          </div>
          <Link to="/call" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 24, padding: "12px 20px", borderRadius: 999, background: t.btnBg, color: t.btnText, fontSize: 15, fontWeight: 500 }}>Try a 1-minute call</Link>
        </div>
        <div style={{ flex: "1.2 1 420px", minWidth: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
          <div style={{ ...bubble, maxWidth: "88%" }}>
            <div style={who}>AGENT · ENGLISH</div>
            Thank you, that's confirmed. How can I help today?
          </div>
          <div style={{ alignSelf: "flex-end", maxWidth: "80%", padding: "12px 16px", borderRadius: 18, background: t.btnBg, color: t.btnText }}>
            <div style={{ fontFamily: mono, fontSize: 10, opacity: 0.7, marginBottom: 4 }}>CALLER · HINGLISH</div>
            My father's claim… kya aap Hindi mein bata sakte hain?
          </div>
          <div style={{ alignSelf: "center", fontFamily: mono, fontSize: 10, letterSpacing: ".08em", color: t.violet, padding: "4px 0" }}>CALLER SWITCHES · THE AGENT FOLLOWS</div>
          <div style={{ ...bubble, maxWidth: "92%" }}>
            <div style={who}>AGENT · HINDI</div>
            <span lang="hi">ज़रूर। आपके पिताजी का क्लेम अभी जाँच में है। दो दस्तावेज़ बाकी हैं — डिस्चार्ज समरी और फ़ाइनल बिल।</span>
          </div>
          <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999, background: t.surface, border: `1px solid ${t.border}`, fontSize: 13 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "#10B981" }} />
            Upload link sent to registered mobile
          </div>
        </div>
      </div>
    </section>
  );
}

export function GoingLive() {
  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 40px" }}>
      <div style={eyebrow}>04 · GOING LIVE</div>
      <h2 style={{ ...h2, maxWidth: 820 }}>
        From first call to first member reply. <span style={{ color: t.text3 }}>Four steps.</span>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: 16, marginTop: 48 }}>
        {STEPS.map((s) => (
          <div key={s.n} style={{ position: "relative", overflow: "hidden", padding: "30px 28px 28px", borderRadius: 26, border: `1px solid ${t.border}`, background: t.surface, boxShadow: t.softShadow, display: "flex", flexDirection: "column", gap: 10 }}>
            <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, top: 0, height: 3, background: s.bg }} />
            <div aria-hidden="true" style={{ position: "absolute", width: 180, height: 180, right: -70, top: -90, borderRadius: 999, background: s.bg, opacity: 0.12, filter: "blur(20px)" }} />
            <div style={{ position: "relative", width: 40, height: 40, borderRadius: 999, background: s.bg, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>{s.n}</div>
            <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em", marginTop: 8 }}>{s.title}</div>
            <div style={{ fontSize: 15, color: t.text2 }}>{s.desc}</div>
            <div style={{ marginTop: "auto", paddingTop: 14, borderTop: `1px solid ${t.border}`, fontSize: 13, color: t.text2 }}>{s.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Walkthrough() {
  const glow = (style: CSSProperties): CSSProperties => ({ position: "absolute", borderRadius: 999, ...style });
  return (
    <section id="walkthrough" style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 120px" }}>
      <div style={{ position: "relative", overflow: "hidden", borderRadius: 32, padding: "clamp(40px, 7vw, 96px) clamp(24px, 5vw, 64px)", background: t.ctaBg, color: "#FAFAF9", textAlign: "center" }}>
        <div aria-hidden="true" style={glow({ width: 520, height: 520, left: -160, top: -240, background: "radial-gradient(circle, rgba(59,130,246,.55), rgba(59,130,246,0) 65%)", animation: "gcDrift 16s ease-in-out infinite" })} />
        <div aria-hidden="true" style={glow({ width: 480, height: 480, right: -140, bottom: -260, background: "radial-gradient(circle, rgba(34,211,238,.42), rgba(34,211,238,0) 65%)", animation: "gcDrift 20s ease-in-out infinite reverse" })} />
        <div aria-hidden="true" style={glow({ width: 360, height: 360, left: "42%", top: "40%", background: "radial-gradient(circle, rgba(167,139,250,.30), rgba(167,139,250,0) 65%)" })} />
        <div style={{ position: "relative" }}>
          <h2 style={{ margin: 0, fontSize: "clamp(34px, 4.6vw, 60px)", lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.035em" }}>Start with a walkthrough.</h2>
          <p style={{ margin: "16px auto 0", fontSize: 18, color: "#D6D3D1", maxWidth: 540 }}>20 minutes. Your workflow first, on a sample claims system. No slides.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 32 }}>
            <button type="button" onClick={() => openWaitlist("home-walkthrough")} style={{ padding: "14px 26px", borderRadius: 999, border: "none", background: "#FAFAF9", color: "#0C0A09", fontWeight: 500 }}>Book a walkthrough</button>
            <Link to="/call" style={{ padding: "14px 26px", borderRadius: 999, border: "1px solid rgba(250,250,249,.35)", fontWeight: 500 }}>Try a 1-minute call</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
