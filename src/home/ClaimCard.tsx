import { useState } from "react";
import { SAMPLE_QUEUE } from "@/data/sampleClaim";
import { mono, t } from "./theme";

interface StageDef {
  who: string;
  status: string;
  clock: string;
  left: string;
  leftSub: string;
  deg: number;
  channel: string;
  action: string;
}

const STAGES: StageDef[] = [
  { who: "Hospital", status: "Documents pending", clock: "IRDAI 3-HOUR CLOCK", left: "2h 40m", leftSub: "left", deg: 40, channel: "EMAIL", action: "Asks the hospital for the discharge summary and final bill, and reminds them before the clock runs out." },
  { who: "TPA", status: "Under review", clock: "IRDAI 3-HOUR CLOCK", left: "1h 12m", leftSub: "left", deg: 216, channel: "ORION", action: "Orion reads the claim for your team and suggests the next safe step, with its evidence. A person says yes." },
  { who: "Insurer", status: "Awaiting decision", clock: "IRDAI 3-HOUR CLOCK", left: "38m", leftSub: "left", deg: 284, channel: "WORK PULSE", action: "Watches the decision on the record and flags it before the deadline. It never decides the claim." },
  { who: "Member", status: "Member updated", clock: "CLOSED WITHIN THE CLOCK", left: "Done", leftSub: "on time", deg: 360, channel: "WHATSAPP", action: "Tells the member in their own language — with the source and date — and logs it on the audit ledger." },
];

/** The live claim in the hero: click a step, the clock and the action follow. */
export default function ClaimCard() {
  const [tab, setTab] = useState(1);
  const stage = STAGES[tab];
  const ring = tab === 3 ? t.done : t.brand;

  return (
    <div style={{ flex: "0 1 520px", minWidth: 0, background: t.glassStrong, border: `1px solid ${t.glassLine}`, borderRadius: 26, boxShadow: t.cardShadow, padding: 24, textAlign: "left", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ position: "relative", width: 10, height: 10, borderRadius: 999, background: ring, boxShadow: `0 0 0 4px ${t.brandSoft}` }} />
          <span style={{ fontWeight: 600, fontSize: 15 }}>{SAMPLE_QUEUE[1]}</span>
          <span style={{ fontSize: 13, color: t.text2 }}>Health · Cashless</span>
        </div>
        <span style={{ fontFamily: mono, fontSize: 11, color: t.text3 }}>SAMPLE · CLICK A STEP</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 22, padding: 18, borderRadius: 18, background: t.surface2 }}>
        <div style={{ flex: "none", width: 116, height: 116, borderRadius: 999, background: `conic-gradient(${ring} ${stage.deg}deg, ${t.track} 0deg)`, display: "flex", alignItems: "center", justifyContent: "center", transition: "background .4s" }}>
          <div style={{ width: 94, height: 94, borderRadius: 999, background: t.surface2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <span style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em" }}>{stage.left}</span>
            <span style={{ fontSize: 11, color: t.text2 }}>{stage.leftSub}</span>
          </div>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".06em", color: t.text3 }}>{stage.clock}</div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 4 }}>{stage.status}</div>
          <div style={{ fontSize: 13, color: t.text2, marginTop: 2 }}>With: {stage.who}</div>
        </div>
      </div>

      <div style={{ position: "relative", marginTop: 24 }}>
        <div aria-hidden="true" style={{ position: "absolute", left: "12.5%", right: "12.5%", top: 17, height: 2, background: t.track }} />
        <div aria-hidden="true" style={{ position: "absolute", left: "12.5%", top: 17, height: 2, width: `${(tab / 3) * 75}%`, background: t.brandGrad, transition: "width .4s" }} />
        <div role="tablist" aria-label="Claim steps" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
          {STAGES.map((s, i) => {
            const done = i < tab || tab === 3;
            const cur = i === tab && tab !== 3;
            const fill = tab === 3 ? t.done : t.brand;
            return (
              <button key={s.who} type="button" role="tab" aria-selected={i === tab} onClick={() => setTab(i)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, background: "none", border: "none", padding: "0 2px 4px", color: i <= tab ? t.text : t.text3 }}>
                <span style={{ width: 36, height: 36, borderRadius: 999, background: done ? fill : t.surface, color: done ? t.doneFg : cur ? t.brand : t.text3, border: `2px solid ${done ? fill : cur ? t.brand : t.track}`, boxShadow: cur ? `0 0 0 5px ${t.brandSoft}` : "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, transition: "all .3s" }}>
                  {done ? "✓" : String(i + 1)}
                </span>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{s.who}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: 18, padding: "16px 18px", borderRadius: 16, border: `1px solid ${t.border}`, display: "flex", gap: 14, alignItems: "flex-start" }}>
        <span style={{ flex: "none", width: 34, height: 34, borderRadius: 10, background: t.brandSoft, color: t.brand, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3l7 3v6c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" />
            <path d="M8.8 12.2l2.2 2.2 4.2-4.4" />
          </svg>
        </span>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <b style={{ fontWeight: 600, fontSize: 14 }}>What Gooclaim OS does here</b>
            <span style={{ fontFamily: mono, fontSize: 10, padding: "3px 8px", borderRadius: 999, background: t.brandSoft, color: t.brand }}>{stage.channel}</span>
          </div>
          <div style={{ fontSize: 14, color: t.text2, marginTop: 4 }}>{stage.action}</div>
        </div>
      </div>
    </div>
  );
}
