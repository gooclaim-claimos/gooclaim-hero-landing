import { Link, Navigate, useParams } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { buildModuleSEO } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured";
import { MODULES, type ModuleData } from "@/data/platform";
import { openWaitlist } from "@/lib/waitlist";
import { Arrow, Card, Check, Chip, ClosingPanel, Eyebrow, Grid, LegacyPage, Pill, Section } from "@/legacy/ui";
import { mono, t } from "@/legacy/tokens";

export default function Module() {
  const { slug } = useParams<{ slug: string }>();
  const data = MODULES.find((m) => m.slug === slug);

  if (!data) return <Navigate to="/" replace />;

  return (
    <LegacyPage>
      <SEOHead
        seo={buildModuleSEO(data.slug, data.label)}
        path={`/platform/${data.slug}`}
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform" },
          { name: data.label, path: `/platform/${data.slug}` },
        ])}
      />
      <ModuleBody data={data} />
    </LegacyPage>
  );
}

function ModuleBody({ data }: { data: ModuleData }) {
  return (
    <>
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", width: 700, height: 700, left: "30%", top: -420, marginLeft: -350, borderRadius: 999, background: t.glow, pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "88px 24px 40px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 48 }}>
          <div style={{ flex: "1 1 520px", minWidth: 0 }}>
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <h1 style={{ margin: "14px 0 0", fontSize: "clamp(40px, 5.4vw, 72px)", lineHeight: 1.03, fontWeight: 600, letterSpacing: "-0.045em" }}>{data.heroTitle}</h1>
            <p style={{ margin: "18px 0 0", fontSize: 18, color: t.text2, maxWidth: 600 }}>{data.heroIntro}</p>
            <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Pill onClick={() => openWaitlist(`module-${data.slug}`)}>Talk to us about {data.label}</Pill>
              <Pill variant="secondary" to="/demo">Or see a live demo</Pill>
            </div>
            <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {data.trustChips.map((c) => (
                <Chip key={c.label} dot={c.hue}>{c.label}</Chip>
              ))}
            </div>
          </div>

          <Card style={{ flex: "1 1 340px", minWidth: 0, padding: 36, borderRadius: 24, boxShadow: t.shadow, position: "relative", overflow: "hidden" }}>
            <div aria-hidden="true" style={{ position: "absolute", left: 0, top: 40, width: 3, height: 64, borderRadius: "0 3px 3px 0", background: data.accent }} />
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: data.accent }}>{data.label}</div>
            <h2 style={{ margin: "16px 0 0", fontSize: "clamp(26px, 2.6vw, 34px)", lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.035em" }}>{data.tagline}</h2>
            <div style={{ marginTop: 24, display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 999, background: t.surface2, fontFamily: mono, fontSize: 10, letterSpacing: ".08em", color: t.text2 }}>
              <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: 999, background: data.accent }} />
              BUILT IN · MULTI-TENANT · AUDITED
            </div>
          </Card>
        </div>
      </section>

      <Section eyebrow={`What ${data.label} actually does`}>
        <Grid min={300}>
          {data.capabilities.map((c) => (
            <Card key={c.title} style={{ position: "relative", overflow: "hidden" }}>
              <div aria-hidden="true" style={{ position: "absolute", left: 0, top: 28, width: 3, height: 40, borderRadius: "0 3px 3px 0", background: c.hue }} />
              <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em" }}>{c.title}</h3>
              <p style={{ margin: "10px 0 0", fontSize: 14, color: t.text2 }}>{c.body}</p>
            </Card>
          ))}
        </Grid>
      </Section>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "32px 24px 40px", display: "flex", flexWrap: "wrap", gap: 40 }}>
        <div style={{ flex: "1 1 340px", minWidth: 0 }}>
          <Eyebrow color={t.text3}>Why it matters</Eyebrow>
          <h2 style={{ margin: "12px 0 0", fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.04em" }}>The outcomes you actually see.</h2>
          <p style={{ margin: "14px 0 0", fontSize: 16, color: t.text2, maxWidth: 460 }}>
            {data.label} earns its place when you can point to what changed for the operation, the customer and the regulator.
          </p>
        </div>
        <div style={{ flex: "1.3 1 420px", minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {data.outcomes.map((o) => (
            <Card key={o.title} style={{ padding: 20, display: "flex", gap: 12 }}>
              <Check color={data.accent} />
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>{o.title}</div>
                <p style={{ margin: "6px 0 0", fontSize: 14, color: t.text2 }}>{o.body}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <ClosingPanel title={data.closingTitle} body={data.closingBody}>
        <Pill onClick={() => openWaitlist(`module-${data.slug}`)}>Talk to us about {data.label}</Pill>
        <Pill variant="secondary" href="mailto:contact@gooclaim.com">contact@gooclaim.com</Pill>
      </ClosingPanel>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 96px" }}>
        <Eyebrow color={t.text3} style={{ marginBottom: 14 }}>Other modules</Eyebrow>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {MODULES.filter((m) => m.slug !== data.slug).map((m) => (
            <Link key={m.slug} to={`/platform/${m.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 16px", borderRadius: 999, border: `1px solid ${t.border}`, background: t.surface, color: t.text2, fontSize: 13, textDecoration: "none" }}>
              {m.label}
              <Arrow size={12} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
