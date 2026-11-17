import { useState, type ChangeEvent } from "react";
import { SAMPLE_CLAIM } from "@/data/sampleClaim";
import { mono, t } from "./theme";

const card = { padding: 26, borderRadius: 22, border: `1px solid ${t.border}`, background: t.surface } as const;
const kicker = (color: string) => ({ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", color });
const cardTitle = { fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 6 } as const;

const DOC_STEPS = [
  { day: "Day 0", what: "Secure upload link that can’t be forwarded" },
  { day: "Day 7", what: "First reminder · every file scanned and checked" },
  { day: "Day 14", what: "Second reminder" },
  { day: "Day 21", what: "Final notice and a ticket for your team" },
];

function SourceAndDate() {
  const [withGc, setWithGc] = useState(true);
  const tabs = [
    { label: "Without Gooclaim", on: !withGc, pick: () => setWithGc(false) },
    { label: "With Gooclaim", on: withGc, pick: () => setWithGc(true) },
  ];
  return (
    <div style={{ ...card, flex: "1 1 440px", minWidth: 0 }}>
      <div style={kicker(t.brand)}>EVERY ANSWER</div>
      <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 6 }}>Names its source and date.</div>
      <div role="tablist" aria-label="Compare" style={{ display: "inline-flex", padding: 4, marginTop: 18, borderRadius: 12, background: t.surface2 }}>
        {tabs.map((c) => (
          <button key={c.label} type="button" role="tab" aria-selected={c.on} onClick={c.pick} style={{ padding: "8px 14px", borderRadius: 9, border: "none", background: c.on ? t.surface : "transparent", color: c.on ? t.text : t.text2, font: "inherit", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
            {c.label}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: "16px 18px", borderRadius: 16, background: t.surface2, fontSize: 16 }}>
        {withGc
          ? `“The latest status of your claim ${SAMPLE_CLAIM.number} (as per your insurer’s records, updated yesterday): Under review.”`
          : "“Your claim is under process. We will get back to you.”"}
      </div>
      <div style={{ marginTop: 10, fontFamily: mono, fontSize: 11, color: withGc ? t.green : t.red }}>
        {withGc ? "WHOSE RECORD · AS OF WHEN · CHECKED BEFORE IT IS SENT" : "NO SOURCE · NO DATE · NEVER CHECKED"}
      </div>
    </div>
  );
}

function ReimbursementClock() {
  const [days, setDays] = useState(17);
  const late = days > 15;
  const near = days > 12;
  // Illustrative: ₹1,00,000 at bank rate 5.75% + 2% a year.
  const interest = Math.round((100000 * 0.0775 * days) / 365);
  const plural = (n: number) => `${n} day${n === 1 ? "" : "s"}`;
  const clockColor = late ? t.red : near ? t.amber : t.green;
  const clockText = late
    ? `Past 15 days · ${plural(days - 15)} late · ₹${interest.toLocaleString("en-IN")} interest (est.)`
    : `${plural(15 - days)} left on the 15-day clock · no interest yet`;

  return (
    <div style={{ ...card, flex: "1 1 440px", minWidth: 0 }}>
      <div style={kicker(t.amber)}>LEGAL CLOCKS · 1 H · 3 H · 15 D</div>
      <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 6 }}>Slide to run the reimbursement clock.</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 18 }}>
        <span style={{ fontSize: 52, fontWeight: 600, letterSpacing: "-0.04em", color: clockColor }}>{days}</span>
        <span style={{ color: t.text2 }}>days since the claim was submitted</span>
      </div>
      <div style={{ position: "relative", height: 10, borderRadius: 999, background: t.track, marginTop: 8, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${(days / 25) * 100}%`, background: late ? t.fillLate : near ? t.fillNear : t.fillOk, transition: "width .2s" }} />
        <div aria-hidden="true" style={{ position: "absolute", left: "60%", top: -2, bottom: -2, width: 2, background: t.text }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 10, color: t.text3, marginTop: 6 }}>
        <span>0</span>
        <span style={{ marginLeft: "55%" }}>15 DAYS</span>
        <span>25</span>
      </div>
      <label htmlFor="gc-days" style={{ display: "block", fontSize: 13, color: t.text2, marginTop: 14 }}>Days since the claim was submitted</label>
      <input id="gc-days" type="range" min={0} max={25} step={1} value={days} onChange={(e: ChangeEvent<HTMLInputElement>) => setDays(Number(e.target.value))} style={{ width: "100%", accentColor: t.amber, height: 28 }} />
      <div style={{ marginTop: 10, padding: "12px 14px", borderRadius: 12, background: late ? t.redSoft : near ? t.amberSoft : t.greenSoft, color: clockColor, fontSize: 14, fontWeight: 500 }}>{clockText}</div>
      <div style={{ marginTop: 8, fontFamily: mono, fontSize: 10, color: t.text3 }}>SAMPLE · INDIA · ₹1,00,000 CLAIM · RBI BANK RATE 5.75% + 2% · ILLUSTRATIVE</div>
    </div>
  );
}

export default function OnEveryClaim() {
  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(48px, 6.67vw, 96px) 24px 40px" }}>
      <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: ".08em", color: t.text3 }}>02 · ON EVERY CLAIM</div>
      <h2 style={{ margin: "14px 0 0", fontSize: "clamp(32px, 4.2vw, 54px)", lineHeight: 1.06, fontWeight: 600, letterSpacing: "-0.04em", maxWidth: 880 }}>
        Every answer, on the record. <span style={{ color: t.text3 }}>Every clock, running.</span>
      </h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 40 }}>
        <SourceAndDate />
        <ReimbursementClock />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 16, marginTop: 16 }}>
        <div style={card}>
          <div style={kicker(t.violet)}>PENDING DOCUMENTS</div>
          <div style={cardTitle}>Asked, collected, checked.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
            {DOC_STEPS.map((d) => (
              <div key={d.day} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ flex: "none", width: 54, fontFamily: mono, fontSize: 11, padding: "4px 0", textAlign: "center", borderRadius: 8, background: t.surface2, color: t.text2 }}>{d.day}</span>
                <span style={{ fontSize: 14 }}>{d.what}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: t.text2, marginTop: 14 }}>Cashless members are never asked.</div>
        </div>
        <div style={card}>
          <div style={kicker(t.red)}>COMPLAINTS</div>
          <div style={cardTitle}>Each with its own clock.</div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <div style={{ flex: 1, padding: 14, borderRadius: 14, background: t.surface2 }}>
              <div style={{ fontSize: 26, fontWeight: 600 }}>3</div>
              <div style={{ fontSize: 12, color: t.text2 }}>working days to acknowledge</div>
            </div>
            <div style={{ flex: 1, padding: 14, borderRadius: 14, background: t.surface2 }}>
              <div style={{ fontSize: 26, fontWeight: 600 }}>14</div>
              <div style={{ fontSize: 12, color: t.text2 }}>days to resolve (India)</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: t.text2, marginTop: 14 }}>The decision goes back to the member, in their language.</div>
        </div>
        <div style={card}>
          <div style={kicker(t.green)}>TURNAROUND REPORT</div>
          <div style={cardTitle}>Built from the record.</div>
          <div style={{ fontSize: 14, color: t.text2, marginTop: 10 }}>In India, the quarterly NL-48 turnaround report — hour bands, month bands, ageing, complaints — straight from your claims.</div>
          <div style={{ marginTop: 14, padding: "12px 14px", borderRadius: 12, background: t.surface2, fontFamily: mono, fontSize: 12 }}>
            NL-48 · Q2 · FILED
            <br />
            <span style={{ color: t.text3 }}>sha256 · 3be1…9c04 · frozen</span>
          </div>
        </div>
      </div>
    </section>
  );
}
