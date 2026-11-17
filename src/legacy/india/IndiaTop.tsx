import { useState } from "react";
import { Link } from "react-router-dom";
import { openWaitlist } from "@/lib/waitlist";
import { Arrow, Card, Check, Chip, Eyebrow, Grid, Pill, Section } from "../ui";
import { mono, t } from "../tokens";
import { HEALTH_WORKFLOWS, MOMENTS, PARTIES, STAGES, STATS } from "./indiaData";

export function IndiaHero() {
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", width: 760, height: 760, left: "50%", top: -440, marginLeft: -380, borderRadius: 999, background: t.glow, pointerEvents: "none" }} />
      <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "clamp(44px, 6.11vw, 88px) 24px 48px", textAlign: "center" }}>
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 999, border: `1px solid ${t.brandLine}`, background: t.brandSoft, color: t.brand, fontFamily: mono, fontSize: 11, letterSpacing: ".08em", textDecoration: "none" }}>
          GOOCLAIM OS · INDIA
        </Link>
        <h1 style={{ margin: "18px auto 0", fontSize: "clamp(40px, 5.4vw, 72px)", lineHeight: 1.03, fontWeight: 600, letterSpacing: "-0.045em", maxWidth: 980 }}>
          Built for every claim.
          <br />
          <span style={{ color: t.text3 }}>Every channel. Every CMS. Every workflow.</span>
        </h1>
        <p style={{ margin: "18px auto 0", fontSize: 18, color: t.text2, maxWidth: 620 }}>Messaging tools and email today. Voice calls in early access.</p>
        <div style={{ marginTop: 28, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12 }}>
          <Pill onClick={() => openWaitlist("india-hero-primary")}>Book a walkthrough</Pill>
          <Pill variant="secondary" href="#system-gap">See how it works</Pill>
        </div>
        <div style={{ marginTop: 18 }}>
          <Link to="/solutions/hospitals" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: t.text2, textDecoration: "none" }}>
            Hospitals: <span style={{ color: t.text }}>see what changes for your desk</span>
            <Arrow size={13} />
          </Link>
        </div>
        <div style={{ marginTop: 28, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8 }}>
          <Chip dot="#6366F1">IRDAI clocks · 1 h · 3 h · 15 days</Chip>
          <Chip dot="#10B981">DPDP consent gate</Chip>
          <Chip dot="#F97316">Immutable audit ledger</Chip>
        </div>
      </div>
    </section>
  );
}

/** Four numbers, each with the document it came from — the regulator's, the auditor's, a penalty order. */
export function ProofBand() {
  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "16px 24px 32px" }}>
      <Grid min={240} gap={12}>
        {STATS.map((s) => (
          <Card key={s.label} style={{ padding: 22 }}>
            <div style={{ fontSize: "clamp(30px, 3vw, 38px)", fontWeight: 600, letterSpacing: "-0.04em", color: s.hue }}>{s.value}</div>
            <div style={{ marginTop: 4, fontSize: 15, fontWeight: 500 }}>{s.label}</div>
            <div style={{ marginTop: 10, fontFamily: mono, fontSize: 10.5, letterSpacing: ".06em", color: t.text3 }}>{s.source}</div>
          </Card>
        ))}
      </Grid>
    </section>
  );
}

function Journey() {
  const [active, setActive] = useState("documents");
  const stage = STAGES.find((s) => s.key === active) ?? STAGES[0];
  return (
    <Card style={{ padding: "clamp(20px, 3vw, 32px)", borderRadius: 24 }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <Eyebrow color={t.text3} style={{ fontSize: 11 }}>One health claim, six steps · tap a step</Eyebrow>
        <div style={{ display: "flex", gap: 16, fontSize: 12, color: t.text2 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: 999, background: t.red }} />
            Where it stops
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span aria-hidden="true" style={{ width: 16, height: 3, borderRadius: 999, background: t.amber }} />
            Interest meter
          </span>
        </div>
      </div>
      <div role="tablist" aria-label="Steps of a claim" style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 120px), 1fr))", gap: 8 }}>
        {STAGES.map((s, i) => {
          const on = s.key === active;
          return (
            <button key={s.key} type="button" role="tab" aria-selected={on} aria-controls="india-stage-panel" onClick={() => setActive(s.key)} onMouseEnter={() => setActive(s.key)} style={{ position: "relative", minHeight: 64, padding: "10px 12px", borderRadius: 14, border: `1px solid ${on ? t.brand : t.border}`, background: on ? t.brandSoft : t.surface, color: t.text, font: "inherit", textAlign: "left", cursor: "pointer" }}>
              <span style={{ display: "block", fontFamily: mono, fontSize: 10, color: t.text3 }}>0{i + 1}</span>
              <span style={{ display: "block", marginTop: 4, fontSize: 14, fontWeight: 600 }}>{s.label}</span>
              {s.stops ? <span aria-hidden="true" style={{ position: "absolute", top: 10, right: 10, width: 8, height: 8, borderRadius: 999, background: t.red }} /> : null}
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1, height: 3, borderRadius: 999, background: `linear-gradient(90deg, ${t.amber}, ${t.red})` }} />
        <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".06em", color: t.amber, flex: "none" }}>BANK RATE + 2%, FROM DAY ONE</span>
      </div>
      <div id="india-stage-panel" role="tabpanel" aria-live="polite" style={{ marginTop: 20 }}>
        <Grid min={280} gap={12}>
          <div style={{ padding: 20, borderRadius: 16, border: `1px solid ${t.border}`, background: t.surface2 }}>
            <Eyebrow style={{ fontSize: 11 }}>What the rule says</Eyebrow>
            <p style={{ margin: "10px 0 0", fontSize: 15 }}>{stage.rule}</p>
          </div>
          <div style={{ padding: 20, borderRadius: 16, border: `1px solid ${stage.stops ? t.redLine : t.border}`, background: stage.stops ? t.redSoft : t.surface2 }}>
            <Eyebrow color={stage.stops ? t.red : t.text3} style={{ fontSize: 11 }}>What actually happens</Eyebrow>
            <p style={{ margin: "10px 0 0", fontSize: 15 }}>{stage.reality}</p>
          </div>
        </Grid>
        <div style={{ marginTop: 12, fontFamily: mono, fontSize: 10.5, letterSpacing: ".06em", color: t.text3 }}>— {stage.source}</div>
      </div>
    </Card>
  );
}

export function IndiaProblem() {
  return (
    <Section id="problem" eyebrow="01 · The problem" title="A claim is decided by a system." muted="It’s moved by people — and there aren’t enough of them." intro="India settles 3.26 crore health claims a year against a one-hour legal clock. The decision is rarely the problem. Claims stop between the steps — and since 2024, every day they wait costs money.">
      <Journey />

      <h3 style={{ margin: "56px 0 0", fontSize: "clamp(22px, 2.6vw, 30px)", fontWeight: 600, letterSpacing: "-0.03em" }}>
        The decision has an owner. <span style={{ color: t.text3 }}>The movement doesn’t.</span>
      </h3>
      <div style={{ marginTop: 20 }}>
        <Grid min={220} gap={12}>
          {PARTIES.map((p) => (
            <div key={p.who} style={{ padding: 20, borderRadius: 18, border: `1px solid ${p.member ? t.redLine : t.border}`, background: p.member ? t.redSoft : t.surface }}>
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: p.member ? t.red : t.text3 }}>{p.who}</div>
              <p style={{ margin: "10px 0 0", fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em" }}>&ldquo;{p.says}&rdquo;</p>
              <p style={{ margin: "6px 0 0", fontSize: 13, color: t.text2 }}>Holds: {p.holds}</p>
            </div>
          ))}
        </Grid>
      </div>
      <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <p style={{ margin: 0, maxWidth: 640, fontSize: 17, color: t.text2 }}>
          <b style={{ color: t.text, fontWeight: 600 }}>Gooclaim OS moves the claim.</b> It chases what is owed, watches every clock, and tells the member — all on the record, without replacing the system that decides.
        </p>
        <Pill variant="secondary" to="/platform">How it works</Pill>
      </div>

      <div style={{ marginTop: 56, display: "flex", flexWrap: "wrap", gap: 32, alignItems: "flex-start" }}>
        <div style={{ flex: "1.15 1 380px", minWidth: 0 }}>
          <h3 style={{ margin: 0, fontSize: "clamp(22px, 2.6vw, 30px)", fontWeight: 600, letterSpacing: "-0.03em" }}>
            Built around the claim, <span style={{ color: t.text3 }}>not one line of insurance.</span>
          </h3>
          <p style={{ margin: "12px 0 0", fontSize: 15, color: t.text2, maxWidth: 560 }}>
            Every claim — health, motor or life — has the same moments: a status to tell, documents to collect, a reason to explain and a clock to beat. Gooclaim OS is built on those. We started where the clock is strictest: health.
          </p>
          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {MOMENTS.map((m) => (
              <span key={m} style={{ padding: "6px 12px", borderRadius: 999, border: `1px solid ${t.border}`, background: t.surface, fontSize: 13, color: t.text2 }}>{m}</span>
            ))}
          </div>
          <button type="button" onClick={() => openWaitlist("other-line-of-insurance")} style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 6, padding: 0, border: "none", background: "none", color: t.brand, font: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Running another line of insurance? Talk to us <Arrow size={13} />
          </button>
        </div>
        <Link to="/solutions/health" style={{ flex: "1 1 340px", minWidth: 0, padding: 24, borderRadius: 22, border: `1px solid ${t.border}`, background: t.surface, boxShadow: t.shadow, color: t.text, textDecoration: "none" }}>
          <Eyebrow color={t.green} style={{ fontSize: 11 }}>Where we started</Eyebrow>
          <div style={{ marginTop: 10, fontSize: 24, fontWeight: 600, letterSpacing: "-0.03em" }}>Health insurance</div>
          <ul style={{ listStyle: "none", margin: "14px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {HEALTH_WORKFLOWS.map((w) => (
              <li key={w} style={{ display: "flex", gap: 10, fontSize: 14, color: t.text2 }}>
                <Check color={t.green} size={14} />
                {w}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600 }}>
            Gooclaim OS for health <Arrow size={13} />
          </div>
        </Link>
      </div>
    </Section>
  );
}
