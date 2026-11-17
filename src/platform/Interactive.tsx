import { useRef } from "react";
import { useAutoplay, useSeen } from "@/site/useAutoplay";
import { Link } from "react-router-dom";
import { LAYERS } from "./data";
import { eyebrow, h2Big, mono, t } from "./theme";

/** 02 · Seven layers, one OS. */
const LAYER_MS = 3600;

export function SevenLayers() {
  const ref = useRef<HTMLDivElement>(null);
  const tour = useAutoplay({ count: LAYERS.length, stepMs: LAYER_MS, start: useSeen(ref), loop: true, rest: 0 });
  const sel = tour.step;
  const layer = LAYERS[sel];

  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "112px 24px 40px" }}>
      <div style={eyebrow}>02 · INSIDE THE OS</div>
      <h2 style={h2Big}>
        Seven layers. <span style={{ color: t.text3 }}>One OS.</span>
      </h2>
      <p style={{ margin: "14px 0 0", fontSize: 17, color: t.text2, maxWidth: 640 }}>Each layer does one job well. Every layer is multi-tenant, audit-instrumented and platform-agnostic.</p>
      <div ref={ref} style={{ display: "flex", flexWrap: "wrap", gap: 24, marginTop: 40 }}>
        <div style={{ flex: "1 1 420px", minWidth: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 190px), 1fr))", gap: 10, alignContent: "start" }}>
          {LAYERS.map((l, i) => {
            const on = i === sel;
            return (
              <button key={l.name} type="button" onClick={() => tour.pick(i)} aria-pressed={on} style={{ position: "relative", overflow: "hidden", textAlign: "left", padding: 18, borderRadius: 16, border: `1px solid ${on ? t.brandLine : t.border}`, background: on ? t.brandSoft : t.surface, color: t.text, font: "inherit", cursor: "pointer" }}>
                <span style={{ display: "block", fontFamily: mono, fontSize: 11, color: on ? t.brand : t.text3 }}>0{i + 1}</span>
                <span style={{ display: "block", fontWeight: 600, marginTop: 6 }}>{l.name}</span>
                <span style={{ display: "block", fontSize: 13, color: t.text2, marginTop: 2 }}>{l.tag}</span>
                {on && tour.playing && <span key={`bar-${i}`} aria-hidden="true" className="gc-bar" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, background: t.brandGrad, ["--gc-dur" as string]: `${LAYER_MS}ms` }} />}
              </button>
            );
          })}
        </div>
        <div key={sel} className="gc-row-in" style={{ flex: "1 1 380px", minWidth: 0, padding: 28, borderRadius: 22, border: `1px solid ${t.border}`, background: t.surface, alignSelf: "start" }}>
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
