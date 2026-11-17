import { useState } from "react";
import { Link } from "react-router-dom";
import { openWaitlist } from "@/lib/waitlist";
import { Arrow, Card, Check, Grid, Pill, Section } from "../ui";
import { mono, t } from "../tokens";
import { FAQS, PILLARS, STEPS, THREE_JOBS } from "./indiaData";

export function IndiaThreeJobs() {
  return (
    <Section id="what-it-does" eyebrow="03 · What it does" title="One OS." muted="Three jobs done." intro="Gooclaim OS is a Claim OS: one agentic core that talks to your members, works beside your team, and keeps every claim on the record.">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {THREE_JOBS.map((j, i) => (
          <Link key={j.to} to={j.to} style={{ position: "relative", overflow: "hidden", display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", padding: "clamp(24px, 3vw, 36px)", borderRadius: 26, border: `1px solid ${t.border}`, background: t.surface, boxShadow: t.softShadow, color: t.text, textDecoration: "none" }}>
            <span aria-hidden="true" style={{ position: "absolute", right: 20, bottom: -36, fontSize: 170, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.05em", color: `${j.hue}14`, pointerEvents: "none" }}>{i + 1}</span>
            <div style={{ position: "relative", flex: "1.15 1 380px", minWidth: 0 }}>
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: j.hue }}>{j.who}</div>
              <h3 style={{ margin: "12px 0 0", fontSize: "clamp(24px, 2.8vw, 34px)", lineHeight: 1.12, fontWeight: 600, letterSpacing: "-0.035em" }}>{j.title}</h3>
              <p style={{ margin: "12px 0 0", fontSize: 15, color: t.text2, maxWidth: 560 }}>{j.body}</p>
              <span style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 15, fontWeight: 600 }}>
                {j.cta} <Arrow />
              </span>
            </div>
            <ul style={{ position: "relative", flex: "0.85 1 260px", minWidth: 0, listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {j.points.map((pt) => (
                <li key={pt} style={{ display: "flex", gap: 10, fontSize: 15, color: t.text2 }}>
                  <Check color={j.hue} size={15} />
                  {pt}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/** What the member sees: the four checks every answer passes, and the live demos to see them. */
export function IndiaMember() {
  return (
    <Section id="members" eyebrow="04 · What your member sees" title="What your member sees." muted="An answer, not a helpline number." intro="A member asks on a messaging tool, by email or on a call — in English, Hindi or Hinglish, in their own words. The OS checks who they are, reads your claims system and answers with the source and date, and the next thing they need to do.">
      <Grid min={240} gap={12}>
        {PILLARS.map((p) => (
          <Card key={p.label} style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 600 }}>
              <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: 999, background: p.hue }} />
              {p.label}
            </div>
            <p style={{ margin: "8px 0 0", fontSize: 14, color: t.text2 }}>{p.body}</p>
          </Card>
        ))}
      </Grid>
      <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 12 }}>
        <Pill to="/try">Try the member chat</Pill>
        <Pill variant="secondary" to="/call">Try a voice call</Pill>
      </div>
    </Section>
  );
}

export function IndiaGoLive() {
  return (
    <Section id="go-live" eyebrow="05 · Going live" title="From first call to first member reply." muted="Four steps." intro="No rip-and-replace. Gooclaim OS sits on top of the systems you already run, and nothing reaches a member until your team has approved it.">
      <Grid min={240} gap={12}>
        {STEPS.map((s, i) => (
          <Card key={s.title}>
            <span style={{ display: "inline-flex", width: 32, height: 32, borderRadius: 999, alignItems: "center", justifyContent: "center", background: s.hue, color: "#FFFFFF", fontSize: 14, fontWeight: 600 }}>{i + 1}</span>
            <h3 style={{ margin: "14px 0 0", fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em" }}>{s.title}</h3>
            <p style={{ margin: "8px 0 0", fontSize: 14, color: t.text2 }}>{s.body}</p>
            <p style={{ margin: "12px 0 0", paddingTop: 12, borderTop: `1px solid ${t.border}`, fontSize: 13, fontWeight: 500 }}>{s.yours}</p>
          </Card>
        ))}
      </Grid>
      <div style={{ marginTop: 24 }}>
        <Pill onClick={() => openWaitlist("go-live")}>Start with a walkthrough</Pill>
      </div>
    </Section>
  );
}

export function IndiaFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" narrow eyebrow="Questions" title="The questions TPAs ask." muted="Answered plainly.">
      <div style={{ borderTop: `1px solid ${t.border}` }}>
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} style={{ borderBottom: `1px solid ${t.border}` }}>
              <h3 style={{ margin: 0 }}>
                <button type="button" aria-expanded={isOpen} aria-controls={`india-faq-${i}`} onClick={() => setOpen(isOpen ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "20px 4px", border: "none", background: "none", color: t.text, font: "inherit", fontSize: 17, fontWeight: 500, textAlign: "left", cursor: "pointer" }}>
                  <span>{f.q}</span>
                  <span aria-hidden="true" style={{ flex: "none", fontSize: 22, color: t.text3 }}>{isOpen ? "−" : "+"}</span>
                </button>
              </h3>
              {isOpen ? (
                <div id={`india-faq-${i}`} style={{ padding: "0 4px 20px", fontSize: 15, color: t.text2 }}>
                  {f.a}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 20 }}>
        <Link to="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: t.brand, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
          More questions <Arrow size={13} />
        </Link>
      </div>
    </Section>
  );
}
