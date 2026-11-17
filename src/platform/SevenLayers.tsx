import { useRef } from "react";
import { Link } from "react-router-dom";
import { CHANNEL_CONNECTORS, SOURCE_CONNECTORS } from "@/data/connectors";
import ConnectorIcon from "@/site/ConnectorIcon";
import { useAutoplay, useSeen } from "@/site/useAutoplay";
import { LAYERS } from "./data";
import { eyebrow, h2Big, mono, t } from "./theme";

const LAYER_MS = 3200;
/** Fixed plate geometry, so the travelling dot can be placed by arithmetic. */
const PLATE_H = 64;
const GAP = 8;

/** The real marks a layer works through, where it has any. */
const MARKS: Record<string, typeof SOURCE_CONNECTORS> = {
  "channel-gateway": CHANNEL_CONNECTORS,
  "knowledge-layer": SOURCE_CONNECTORS.slice(0, 8),
};

/** 02 · Seven layers stacked as one OS; a message travels down through them. */
export function SevenLayers() {
  const ref = useRef<HTMLDivElement>(null);
  const tour = useAutoplay({ count: LAYERS.length, stepMs: LAYER_MS, start: useSeen(ref), loop: true, rest: 0 });
  const sel = tour.step;
  const layer = LAYERS[sel];
  const marks = layer.slug ? MARKS[layer.slug] : undefined;
  const more = layer.slug === "knowledge-layer" ? SOURCE_CONNECTORS.length - 8 : 0;

  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "112px 24px 40px" }}>
      <div style={eyebrow}>02 · INSIDE THE OS</div>
      <h2 style={h2Big}>
        Seven layers. <span style={{ color: t.text3 }}>One OS.</span>
      </h2>
      <p style={{ margin: "14px 0 0", fontSize: 17, color: t.text2, maxWidth: 640 }}>Each layer does one job well. Every layer is multi-tenant, audit-instrumented and platform-agnostic.</p>

      <div ref={ref} style={{ display: "flex", flexWrap: "wrap", gap: 24, marginTop: 40, alignItems: "flex-start" }}>
        <div style={{ flex: "1.1 1 440px", minWidth: 0, borderRadius: 26, padding: "clamp(18px, 3vw, 28px)", background: t.panel }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: mono, fontSize: 11, letterSpacing: ".06em", color: t.text3, marginBottom: 14 }}>
            <span>MESSAGE IN</span>
            {CHANNEL_CONNECTORS.map((c) => (
              <ConnectorIcon key={c.id} c={c} size={14} />
            ))}
          </div>

          <div role="tablist" aria-label="Seven layers" style={{ position: "relative", paddingLeft: 34 }}>
            {/* The rail and the message travelling down it. */}
            <span aria-hidden="true" style={{ position: "absolute", left: 11, top: PLATE_H / 2, bottom: PLATE_H / 2, width: 2, borderRadius: 2, background: t.track }} />
            <span aria-hidden="true" style={{ position: "absolute", left: 11, top: PLATE_H / 2, width: 2, height: sel * (PLATE_H + GAP), borderRadius: 2, background: t.brandGrad, transition: "height .9s var(--gc-ease)" }} />
            <span aria-hidden="true" style={{ position: "absolute", left: 5, top: PLATE_H / 2 - 7 + sel * (PLATE_H + GAP), width: 14, height: 14, borderRadius: 999, background: t.brand, boxShadow: `0 0 0 5px ${t.brandSoft}, 0 0 18px 2px ${t.brand}`, transition: "top .9s var(--gc-ease)" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: GAP }}>
              {LAYERS.map((l, i) => {
                const on = i === sel;
                return (
                  <button key={l.name} type="button" role="tab" aria-selected={on} onClick={() => tour.pick(i)} style={{ position: "relative", overflow: "hidden", height: PLATE_H, display: "flex", alignItems: "center", gap: 14, padding: "0 18px", borderRadius: 14, border: `1px solid ${on ? t.brandLine : t.border}`, background: t.surface, color: t.text, font: "inherit", textAlign: "left", cursor: "pointer", opacity: on ? 1 : 0.78, transform: on ? "translateX(8px)" : "none", boxShadow: on ? `0 14px 34px -14px ${t.brand}` : `0 3px 0 -1px ${t.border}`, transition: "transform .6s var(--gc-ease), box-shadow .6s var(--gc-ease), border-color .4s, opacity .4s" }}>
                    <span style={{ flex: "none", fontFamily: mono, fontSize: 11, color: on ? t.brand : t.text3 }}>0{i + 1}</span>
                    <span style={{ flex: "none", fontWeight: 600, fontSize: 16, letterSpacing: "-0.01em" }}>{l.name}</span>
                    <span style={{ flex: 1, minWidth: 0, fontSize: 13, color: t.text3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "right" }}>{l.tag}</span>
                    {on && tour.playing && <span key={`bar-${i}`} aria-hidden="true" className="gc-bar" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, background: t.brandGrad, ["--gc-dur" as string]: `${LAYER_MS}ms` }} />}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".06em", color: t.text3, marginTop: 14 }}>ON THE RECORD · AUDIT LEDGER</div>
        </div>

        <div key={sel} className="gc-row-in" style={{ flex: "1 1 360px", minWidth: 0, padding: 28, borderRadius: 22, border: `1px solid ${t.border}`, background: t.surface, boxShadow: t.cardShadow }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", color: t.brand }}>LAYER 0{sel + 1} · MULTI-TENANT · AUDIT-INSTRUMENTED</div>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.03em", marginTop: 10 }}>{layer.name}</div>
          <div style={{ fontSize: 16, color: t.text2, marginTop: 8 }}>{layer.desc}</div>
          {marks && (
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginTop: 18 }}>
              {marks.map((c) => (
                <span key={c.id} title={c.name} style={{ minWidth: 40, height: 40, padding: "0 10px", borderRadius: 12, border: `1px solid ${t.border}`, background: t.surface2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ConnectorIcon c={c} size={20} />
                </span>
              ))}
              {more > 0 && <span style={{ fontSize: 13, color: t.text3 }}>+{more} more</span>}
            </div>
          )}
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
