import { openWaitlist } from "@/lib/waitlist";
import { COLS, FEATURES, PULSE } from "./data";
import { mono, t } from "./theme";

const eyebrow = { fontFamily: mono, fontSize: 12, letterSpacing: ".08em", color: t.text3 } as const;
const h2Big = { margin: "14px 0 0", fontSize: "clamp(32px, 4.2vw, 54px)", lineHeight: 1.06, fontWeight: 600, letterSpacing: "-0.04em", maxWidth: 880 } as const;

export function OrionHero() {
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", width: 640, height: 640, right: -180, top: -140, borderRadius: 999, background: t.glow }} />
      <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "clamp(40px, 5.56vw, 80px) 24px clamp(32px, 4.44vw, 64px)", display: "flex", flexWrap: "wrap", gap: 56, alignItems: "center" }}>
        <div style={{ flex: "1 1 460px", minWidth: 0 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, border: `1px solid ${t.border}`, background: t.surface, fontSize: 13, color: t.text2 }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: t.acc }} />
            Orion · for your claims team
          </div>
          <h1 style={{ margin: "20px 0 0", fontSize: "clamp(42px, 5.6vw, 76px)", lineHeight: 1.02, fontWeight: 600, letterSpacing: "-0.045em" }}>
            Less chasing.
            <br />
            <span style={{ backgroundImage: t.accGrad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>More deciding.</span>
          </h1>
          <p style={{ margin: "20px 0 0", fontSize: 18, color: t.text2, maxWidth: 540 }}>
            Orion works beside your claims staff. It reads every claim, shows what needs a person and why, and prepares the next safe step with its evidence. Your team decides — Orion never does.
          </p>
          <div className="gc-cta-row" style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <button type="button" onClick={() => openWaitlist("orion-hero")} style={{ padding: "14px 26px", borderRadius: 999, border: "none", background: t.btnBg, color: t.btnText, font: "inherit", fontWeight: 500, cursor: "pointer" }}>
              Book a walkthrough
            </button>
            <a href="#claim-room" style={{ padding: "14px 26px", borderRadius: 999, border: `1px solid ${t.border}`, background: t.surface, fontWeight: 500, color: "inherit", textDecoration: "none" }}>
              Watch it work
            </a>
          </div>
        </div>
        <div style={{ flex: "1 1 460px", minWidth: 0, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 24, padding: 22, boxShadow: t.cardShadow }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <b style={{ fontWeight: 600 }}>Orion · Work Pulse</b>
            <span style={{ fontFamily: mono, fontSize: 11, color: t.text3 }}>SAMPLE DATA</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
            {PULSE.map((p) => (
              <div key={p.title} style={{ padding: "14px 16px", borderRadius: 16, background: t.surface2, border: `1px solid ${t.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  <b style={{ fontWeight: 600, fontSize: 15 }}>{p.title}</b>
                  <span style={{ fontFamily: mono, fontSize: 11, padding: "4px 10px", borderRadius: 999, background: p.bg, color: p.c }}>{p.clock}</span>
                </div>
                <div style={{ fontSize: 13, color: t.text2, marginTop: 4 }}>{p.sub}</div>
                <div style={{ fontSize: 12, color: p.c, marginTop: 6 }}>{p.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Features() {
  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(44px, 6.11vw, 88px) 24px 40px" }}>
      <div style={eyebrow}>01 · INSIDE ORION</div>
      <h2 style={h2Big}>
        Your team’s AI claims coworker. <span style={{ color: t.text3 }}>It acts only when a person says yes.</span>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 14, marginTop: 40 }}>
        {FEATURES.map((f) => (
          <div key={f.title} style={{ padding: 24, borderRadius: 20, border: `1px solid ${t.border}`, background: f.bg }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", color: f.kc }}>{f.k}</div>
            <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 8 }}>{f.title}</div>
            <div style={{ fontSize: 14, color: t.text2, marginTop: 6 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function WhereTheLineIs() {
  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(48px, 6.67vw, 96px) 24px 40px" }}>
      <div style={eyebrow}>03 · WHERE THE LINE IS</div>
      <h2 style={h2Big}>
        Orion never decides a claim. <span style={{ color: t.text3 }}>Here is exactly where it stops.</span>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 14, marginTop: 40 }}>
        {COLS.map((c) => (
          <div key={c.k} style={{ padding: 24, borderRadius: 22, border: `1px solid ${c.border}`, background: c.bg }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 9, height: 9, borderRadius: 999, background: c.dot }} />
              <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: ".08em", color: c.dot }}>{c.k}</span>
            </div>
            <div style={{ fontSize: 14, color: t.text2, marginTop: 8 }}>{c.sub}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 18 }}>
              {c.items.map((i) => (
                <div key={i.a} style={{ paddingTop: 12, borderTop: `1px solid ${t.border}` }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{i.a}</div>
                  <div style={{ fontSize: 13, color: t.text2 }}>{i.b}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, padding: "20px 24px", borderRadius: 18, background: t.btnBg, color: t.btnText, fontSize: 15 }}>
        <b style={{ fontWeight: 600 }}>Over all three:</b> every Orion answer passes the Policy Gate before a word reaches your staff. If the gate cannot be reached, the answer is held — not shown anyway.
      </div>
    </section>
  );
}
