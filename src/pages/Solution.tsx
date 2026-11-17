import { Link, Navigate, useParams } from "react-router-dom";
import SiteLayout from "@/site/SiteLayout";
import SEOHead from "@/components/SEOHead";
import { ThemeStyle } from "@/theme/ThemeProvider";
import { buildUseCaseSEO } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured";
import { openWaitlist } from "@/lib/waitlist";
import { SEGMENTS, type Segment } from "@/solutions/segments";
import { css, mono, palette, t } from "@/solutions/theme";

const pill = { padding: "14px 26px", borderRadius: 999, fontWeight: 500, textDecoration: "none", font: "inherit", fontSize: 16, cursor: "pointer" } as const;

function SegmentBody({ seg }: { seg: Segment }) {
  const p = palette(seg.key);
  const talk = () => openWaitlist(`use-case-${seg.key}`);
  return (
    <div style={{ background: t.bg, color: t.text }}>
      <div style={{ borderBottom: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "10px 24px", display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", color: t.text3, marginRight: 8 }}>SOLUTIONS</span>
          {SEGMENTS.map((g) => {
            const on = g.key === seg.key;
            return (
              <Link key={g.key} to={`/solutions/${g.key}`} aria-current={on ? "page" : undefined} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 999, background: on ? t.activeBg : "transparent", color: on ? t.text : t.text2, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
                <span style={{ width: 7, height: 7, borderRadius: 999, background: palette(g.key).acc }} />
                {g.label}
              </Link>
            );
          })}
        </div>
      </div>

      <section style={{ position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", width: 680, height: 680, right: -200, top: -200, borderRadius: 999, background: p.glow }} />
        <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "clamp(40px, 5.56vw, 80px) 24px 56px", display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center" }}>
          <div style={{ flex: "1.3 1 520px", minWidth: 0 }}>
            <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: ".1em", color: p.acc }}>{seg.eyebrow}</div>
            <h1 style={{ margin: "14px 0 0", fontSize: "clamp(38px, 5vw, 66px)", lineHeight: 1.04, fontWeight: 600, letterSpacing: "-0.045em" }}>
              {seg.h1a} <span style={{ backgroundImage: p.grad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{seg.h1b}</span>
            </h1>
            <p style={{ margin: "20px 0 0", fontSize: 18, color: t.text2, maxWidth: 600 }}>{seg.lead}</p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <button type="button" onClick={talk} style={{ ...pill, border: "none", background: t.btnBg, color: t.btnText }}>{seg.cta}</button>
              <Link to="/try" style={{ ...pill, border: `1px solid ${t.border}`, background: t.surface, color: t.text }}>Try it live</Link>
            </div>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginTop: 26, fontSize: 13, color: t.text2 }}>
              {seg.chips.map((c) => (
                <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={p.acc} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div style={{ flex: "1 1 380px", minWidth: 0, padding: 30, borderRadius: 26, background: p.panel }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", color: p.acc }}>THE PROBLEM · IN ONE NUMBER</div>
            <div style={{ fontSize: "clamp(56px, 7vw, 92px)", fontWeight: 600, letterSpacing: "-0.05em", lineHeight: 1, marginTop: 14 }}>{seg.num}</div>
            <div style={{ fontSize: 17, fontWeight: 500, marginTop: 10 }}>{seg.numLabel}</div>
            <div style={{ fontSize: 14, color: t.text2, marginTop: 12 }}>{seg.numText}</div>
            <div style={{ fontFamily: mono, fontSize: 10, color: t.text3, marginTop: 16 }}>{seg.source}</div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(36px, 5.0vw, 72px) 24px 40px" }}>
        <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: ".08em", color: t.text3 }}>{seg.whatK}</div>
        <h2 style={{ margin: "14px 0 0", fontSize: "clamp(30px, 4vw, 50px)", lineHeight: 1.06, fontWeight: 600, letterSpacing: "-0.04em", maxWidth: 880 }}>{seg.whatH}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 14, marginTop: 40 }}>
          {seg.items.map(([title, desc], i) => (
            <div key={title} style={{ padding: 26, borderRadius: 20, border: `1px solid ${t.border}`, background: t.surface }}>
              <span style={{ display: "inline-flex", width: 36, height: 36, borderRadius: 10, background: p.soft, color: p.acc, alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 12 }}>{`0${i + 1}`}</span>
              <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 14 }}>{title}</div>
              <div style={{ fontSize: 14, color: t.text2, marginTop: 6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(36px, 5.0vw, 72px) 24px 40px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 24, padding: "28px 32px", borderRadius: 22, border: `1px solid ${t.border}`, background: t.surface }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ flex: "none", width: 48, height: 48, borderRadius: 14, background: p.soft, color: p.acc, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
              </svg>
            </span>
            <div>
              <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em" }}>See what your members see.</div>
              <div style={{ fontSize: 14, color: t.text2 }}>Message the claims desk or call the voice agent — in English, Hindi or Hinglish.</div>
            </div>
          </div>
          <Link to="/try" style={{ padding: "12px 22px", borderRadius: 999, background: t.btnBg, color: t.btnText, fontWeight: 500, textDecoration: "none" }}>Try it live</Link>
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(36px, 5.0vw, 72px) 24px clamp(56px, 7.78vw, 112px)" }}>
        <div style={{ borderRadius: 28, padding: "clamp(36px, 6vw, 72px)", background: t.ctaBg, color: "#FAFAF9", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "clamp(28px, 3.6vw, 44px)", fontWeight: 600, letterSpacing: "-0.04em" }}>See Gooclaim OS on a real claim.</h2>
            <p style={{ margin: "10px 0 0", color: "#D6D3D1" }}>A 20-minute walkthrough — your workflow first, on a sample claims system. No slides.</p>
          </div>
          <button type="button" onClick={talk} style={{ ...pill, border: "none", background: "#FAFAF9", color: "#0C0A09" }}>{seg.cta}</button>
        </div>
      </section>
    </div>
  );
}

export default function Solution() {
  const { slug } = useParams<{ slug: string }>();
  const seg = SEGMENTS.find((s) => s.key === slug);
  if (!seg) return <Navigate to="/" replace />;

  return (
    <SiteLayout>
      <SEOHead
        seo={buildUseCaseSEO(seg.key, seg.label)}
        path={`/solutions/${seg.key}`}
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions/tpas" },
          { name: seg.label, path: `/solutions/${seg.key}` },
        ])}
      />
      <ThemeStyle css={css} />
      <SegmentBody seg={seg} />
    </SiteLayout>
  );
}
