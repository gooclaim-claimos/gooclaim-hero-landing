import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteLayout from "@/site/SiteLayout";
import { makeTheme } from "@/theme/theme";
import { ThemeStyle } from "@/theme/ThemeProvider";

const { t, css } = makeTheme("nf", {
  text: ["#0C0A09", "#F5F5F4"],
  text2: ["#57534E", "#A8A29E"],
  text3: ["#78716C", "#8C8783"],
  border: ["#E7E5E4", "#232A38"],
  surface: ["#FFFFFF", "#0F131C"],
  btnBg: ["#0C0A09", "#F5F5F4"],
  btnText: ["#FAFAF9", "#0C0A09"],
  brandGrad: ["linear-gradient(90deg, #1D4ED8 0%, #0891B2 100%)", "linear-gradient(90deg, #60A5FA 0%, #22D3EE 100%)"],
});

const WAYS = [
  { label: "Platform", to: "/platform" },
  { label: "Orion", to: "/orion" },
  { label: "Try it live", to: "/try" },
  { label: "Pricing", to: "/pricing" },
];

/** Any address the site does not have. Prerendered to dist/404.html, which Vercel serves with a 404 status. */
export default function NotFound() {
  return (
    <SiteLayout>
      <Helmet>
        <title>Page not found · Gooclaim OS</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <ThemeStyle css={css} />
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(60px, 8.33vw, 120px) 24px clamp(70px, 9.72vw, 140px)", textAlign: "center", color: t.text }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: ".1em", color: t.text3 }}>404 · PAGE NOT FOUND</div>
        <h1 style={{ margin: "16px 0 0", fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.05, fontWeight: 600, letterSpacing: "-0.045em" }}>
          This page has moved on. <span style={{ background: t.brandGrad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Your claims don’t have to.</span>
        </h1>
        <p style={{ margin: "18px auto 0", fontSize: 17, color: t.text2, maxWidth: 520 }}>The address may be old or mistyped. Here is where most people head next.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 30 }}>
          <Link to="/" style={{ padding: "12px 22px", borderRadius: 999, background: t.btnBg, color: t.btnText, fontWeight: 500, textDecoration: "none" }}>
            Back to home
          </Link>
          {WAYS.map((w) => (
            <Link key={w.to} to={w.to} style={{ padding: "12px 18px", borderRadius: 999, border: `1px solid ${t.border}`, background: t.surface, color: t.text, fontWeight: 500, textDecoration: "none" }}>
              {w.label}
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
