import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { SEO_DEMO } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured";
import { openWaitlist } from "@/lib/waitlist";
import { Card, Chip, ClosingPanel, Eyebrow, GradientText, Grid, LegacyPage, Pill, Section } from "@/legacy/ui";
import { mono, t } from "@/legacy/tokens";

const AGENDA = [
  {
    n: "01",
    t: "Your workflow first",
    b: "Tell us the workflow that costs your team the most. If it is one of our five, we run it on a sample claim; if not, we run the closest one and show how yours would work.",
    hue: "#1D4ED8",
  },
  {
    n: "02",
    t: "The rest of the claim path",
    b: "Claim status with the source and date, pending documents through a secure upload link, and the reason for a decision — live on email, wired into a sample claims system. No slides.",
    hue: "#0891B2",
  },
  {
    n: "03",
    t: "The staff side",
    b: "Orion, the AI claims coworker: a claim brief, and an answer that cites the page it came from.",
    hue: "#10B981",
  },
  {
    n: "04",
    t: "How you would start",
    b: "How we connect to your claims system, read-only, and what a 90-day pilot on one workflow and one channel looks like.",
    hue: "#F97316",
  },
];

const PREP = [
  "Your current claim communication channels (WhatsApp, voice, email, portal).",
  "Approximate monthly claim volume.",
  "Which CMS / TPA platform you operate on.",
  "One workflow you'd most want to automate first.",
];

const TIMELINE = [
  { time: "0 – 2 min", label: "Who we are" },
  { time: "2 – 8 min", label: "Your workflow, first" },
  { time: "8 – 14 min", label: "The rest of the claim path" },
  { time: "14 – 17 min", label: "The staff side" },
  { time: "17 – 20 min", label: "Connecting, the pilot, next step" },
];

export default function Demo() {
  useEffect(() => {
    document.title = "Book a demo · Gooclaim OS";
  }, []);

  return (
    <LegacyPage>
      <SEOHead
        seo={SEO_DEMO}
        path="/demo"
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Book a demo", path: "/demo" },
        ])}
      />

      <section style={{ position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", width: 700, height: 700, left: "30%", top: -420, marginLeft: -350, borderRadius: 999, background: t.glow, pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "clamp(44px, 6.11vw, 88px) 24px 40px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 48 }}>
          <div style={{ flex: "1 1 480px", minWidth: 0 }}>
            <Eyebrow>20-minute walkthrough · live demo</Eyebrow>
            <h1 style={{ margin: "14px 0 0", fontSize: "clamp(40px, 5.4vw, 72px)", lineHeight: 1.03, fontWeight: 600, letterSpacing: "-0.045em" }}>
              See Gooclaim OS <GradientText>in your shoes.</GradientText>
            </h1>
            <p style={{ margin: "18px 0 0", fontSize: 18, color: t.text2, maxWidth: 580 }}>
              No deck. Tell us the workflow that costs your team the most, and we&rsquo;ll run it first, on a sample claims system — then show how a 90-day pilot on your own claims would work.
            </p>
            <div className="gc-cta-row" style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Pill onClick={() => openWaitlist("demo-hero")}>Book a walkthrough</Pill>
              <Pill variant="secondary" href="mailto:contact@gooclaim.com">contact@gooclaim.com</Pill>
            </div>
            <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Chip dot="#6366F1">Regulator clocks on every claim</Chip>
              <Chip dot="#10B981">Consent before a word</Chip>
              <Chip dot="#F97316">Audit ledger · SHA-256</Chip>
            </div>
          </div>

          <Card style={{ flex: "1 1 360px", minWidth: 0, padding: 32, borderRadius: 24, boxShadow: t.shadow }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontFamily: mono, fontSize: 11, letterSpacing: ".08em" }}>
              <span style={{ color: t.brand }}>LIVE DEMO · WHAT YOU&rsquo;LL SEE</span>
              <span style={{ color: t.text3 }}>~20 MIN</span>
            </div>
            <h2 style={{ margin: "16px 0 0", fontSize: 26, lineHeight: 1.12, fontWeight: 600, letterSpacing: "-0.03em" }}>Real workflows. Real channels. Sample CMS.</h2>
            <p style={{ margin: "10px 0 0", fontSize: 14, color: t.text2 }}>
              You&rsquo;ll see the OS handling claim queries end-to-end — CMS lookup, knowledge retrieval, template rendering, policy gate, audit event. All live.
            </p>
            <ol style={{ listStyle: "none", margin: "24px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 14, borderLeft: `2px solid ${t.brandLine}`, paddingLeft: 18 }}>
              {TIMELINE.map((step) => (
                <li key={step.time} style={{ position: "relative" }}>
                  <span aria-hidden="true" style={{ position: "absolute", left: -25, top: 4, width: 12, height: 12, borderRadius: 999, background: t.surface, border: `2px solid ${t.brand}` }} />
                  <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", color: t.brand }}>{step.time}</div>
                  <div style={{ marginTop: 2, fontSize: 14, fontWeight: 500 }}>{step.label}</div>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </section>

      <Section eyebrow="What we’ll cover">
        <Grid min={240}>
          {AGENDA.map((a) => (
            <Card key={a.n}>
              <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: ".08em", color: a.hue }}>{a.n}</div>
              <h3 style={{ margin: "12px 0 0", fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em" }}>{a.t}</h3>
              <p style={{ margin: "10px 0 0", fontSize: 14, color: t.text2 }}>{a.b}</p>
            </Card>
          ))}
        </Grid>
      </Section>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "32px 24px 40px", display: "flex", flexWrap: "wrap", gap: 40 }}>
        <div style={{ flex: "1 1 360px", minWidth: 0 }}>
          <Eyebrow color={t.text3}>Optional · helps us prep</Eyebrow>
          <h2 style={{ margin: "12px 0 0", fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.04em" }}>A few things to have handy.</h2>
          <p style={{ margin: "14px 0 0", fontSize: 16, color: t.text2, maxWidth: 460 }}>
            Nothing required — we can run a great demo with zero prep. But if you can share these in the booking email, we&rsquo;ll arrive already tuned to your operation.
          </p>
        </div>
        <ul style={{ flex: "1 1 360px", minWidth: 0, listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          {PREP.map((line) => (
            <li key={line} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 16px", borderRadius: 14, border: `1px solid ${t.border}`, background: t.surface, fontSize: 15, color: t.text2 }}>
              <span aria-hidden="true" style={{ marginTop: 9, width: 6, height: 6, borderRadius: 999, background: t.brand, flex: "none" }} />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <ClosingPanel title="Book 20 minutes." muted="We’ll take it from there." body="Drop your details and someone from the team will write to you personally to fix a time — usually within a week.">
        <Pill onClick={() => openWaitlist("demo-footer")}>Book a walkthrough</Pill>
        <Pill variant="secondary" href="mailto:contact@gooclaim.com">contact@gooclaim.com</Pill>
      </ClosingPanel>
    </LegacyPage>
  );
}
