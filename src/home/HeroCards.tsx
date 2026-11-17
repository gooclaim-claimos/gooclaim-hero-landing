import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { mono, t } from "./theme";
import { useSampleDates } from "./useSampleDates";

/**
 * The four cards around the hero's claim card. They follow the claim card's
 * step (0 Hospital · 1 TPA · 2 Insurer · 3 Member), so the stage reads as one
 * claim moving: the member asks, the OS works, the values are checked, the
 * reply goes out, and each move lands on the ledger.
 */
const BARS: [number, string][] = [[12, "0s"], [22, "-.2s"], [28, "-.4s"], [16, "-.6s"], [24, "-.8s"], [14, "-.3s"], [26, "-.5s"], [18, "-.7s"]];
/** Values matched by the policy gate at each step. */
const MATCHED = [0, 1, 3, 4];
const LEDGER: { ev: string; at: string; from: number }[] = [
  { ev: "consent.granted", at: "14:22:01", from: 0 },
  { ev: "cms.read", at: "14:22:04", from: 1 },
  { ev: "message.sent", at: "14:22:08", from: 3 },
];

const card: CSSProperties = {
  padding: 16,
  borderRadius: 20,
  background: t.glassStrong,
  border: `1px solid ${t.glassLine}`,
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  boxShadow: t.floatShadow,
  textAlign: "left",
};

/** A card that drifts gently, each on its own rhythm; the tilt stays on the inner box. */
function Floating({ rotate, seconds, delay, children }: { rotate: string; seconds: number; delay: string; children: ReactNode }) {
  return (
    <div style={{ animation: `gcFloat ${seconds}s ease-in-out ${delay} infinite` }}>
      <div style={{ ...card, transform: `rotate(${rotate})` }}>{children}</div>
    </div>
  );
}

function Check({ size, stroke, width }: { size: number; stroke: string; width: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/** The voice card's call clock: counts while the tour plays (render never reads time). */
function useCallClock(playing: boolean): string {
  const [s, setS] = useState(42);
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setS((v) => (v >= 59 ? 30 : v + 1)), 1000);
    return () => window.clearInterval(id);
  }, [playing]);
  return `0:${String(s).padStart(2, "0")}`;
}

export function LeftCards({ step, playing }: { step: number; playing: boolean }) {
  const dates = useSampleDates();
  const clock = useCallClock(playing);
  const answered = step >= 3;
  return (
    <div className="gc-hide-sm" style={{ flex: "0 1 250px", display: "flex", flexDirection: "column", gap: 16 }}>
      <Floating rotate="-2deg" seconds={7} delay="0s">
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 10, color: t.text3 }}>
          <span>WHATSAPP · MEMBER</span>
          <span>09:14</span>
        </div>
        <div key={`q-${step === 0}`} className={step === 0 ? "gc-row-in" : undefined} style={{ marginTop: 10, padding: "9px 12px", borderRadius: "14px 14px 4px 14px", background: t.btnBg, color: t.btnText, fontSize: 13, marginLeft: 18 }}>
          Mera claim kahan tak pahuncha?
        </div>
        {answered ? (
          <div className="gc-row-in" style={{ marginTop: 8, padding: "9px 12px", borderRadius: "14px 14px 14px 4px", background: t.surface2, fontSize: 13, marginRight: 18 }}>
            Documents pending — discharge summary. Source: insurer{dates ? `, ${dates.updated}` : ""}.
          </div>
        ) : (
          <div aria-label="Checking the claim" style={{ marginTop: 8, display: "inline-flex", padding: "10px 14px", borderRadius: "14px 14px 14px 4px", background: t.surface2, color: t.text3 }}>
            <span className="gc-typing"><i /><i /><i /></span>
          </div>
        )}
      </Floating>
      <Floating rotate="1.5deg" seconds={8} delay="-2s">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: mono, fontSize: 10, color: t.text3 }}>VOICE · HINDI</span>
          <span style={{ fontFamily: mono, fontSize: 10, color: t.green }}>● LIVE {clock}</span>
        </div>
        <div aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: 3, height: 30, marginTop: 10 }}>
          {BARS.map(([h, delay], i) => (
            <span key={i} style={{ width: 3, height: h, borderRadius: 3, background: t.brand, animation: "gcBar 1s ease-in-out infinite", animationDelay: delay }} />
          ))}
        </div>
        <div lang="hi" style={{ fontSize: 13, marginTop: 8 }}>“दो दस्तावेज़ बाकी हैं — डिस्चार्ज समरी और फ़ाइनल बिल।”</div>
      </Floating>
    </div>
  );
}

export function RightCards({ step }: { step: number }) {
  const matched = MATCHED[step] ?? 4;
  const passed = matched === 4;
  return (
    <div className="gc-hide-sm" style={{ flex: "0 1 250px", display: "flex", flexDirection: "column", gap: 16 }}>
      <Floating rotate="2deg" seconds={7.5} delay="-1s">
        <div style={{ fontFamily: mono, fontSize: 10, color: t.text3 }}>POLICY GATE</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
          <span style={{ width: 30, height: 30, borderRadius: 999, background: passed ? t.greenSoft : t.brandSoft, color: passed ? t.green : t.brand, display: "flex", alignItems: "center", justifyContent: "center", transition: "background .4s, color .4s" }}>
            {passed ? <span key="ok" className="gc-pop" style={{ display: "flex" }}><Check size={15} stroke="currentColor" width="2.6" /></span> : <span className="gc-spin" style={{ width: 14, height: 14 }} />}
          </span>
          <div>
            <div key={matched} className="gc-pop" style={{ fontSize: 14, fontWeight: 600 }}>{matched} of 4 values matched</div>
            <div style={{ fontSize: 12, color: t.text2 }}>{passed ? "Approved wording · sent" : "Checking against the record…"}</div>
          </div>
        </div>
      </Floating>
      <Floating rotate="-1.5deg" seconds={8.5} delay="-3s">
        <div style={{ fontFamily: mono, fontSize: 10, color: t.text3 }}>AUDIT LEDGER</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10, fontFamily: mono, fontSize: 11, minHeight: 58 }}>
          {LEDGER.filter((r) => step >= r.from).map((r) => (
            <div key={r.ev} className="gc-row-in" style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{r.ev}</span>
              <span style={{ color: t.text3 }}>{r.at}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: t.amber, opacity: step >= 3 ? 1 : 0.35, transition: "opacity .5s" }}>Sealed · SHA-256 chained</div>
      </Floating>
    </div>
  );
}
