import SiteLayout from "@/site/SiteLayout";
import SEOHead from "@/components/SEOHead";
import { ThemeStyle } from "@/theme/ThemeProvider";
import { SEO_SECURITY } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured";
import { openWaitlist } from "@/lib/waitlist";
import OnEveryClaim from "@/security/OnEveryClaim";
import { css, mono, t } from "@/security/theme";

/** A buyer's security review lands with the team through the walkthrough form; the team replies with the details. */
function requestSecurityDetails() {
  openWaitlist("security-details", {
    eyebrow: "Security review",
    headline: "Request our security details",
    subhead: "Tell us who you are and we will send the details to your team.",
  });
}

const CONTROLS: { n: string; title: string; desc: string; color: string; soft: string }[] = [
  { n: "01", title: "Read-only to your claims system", desc: "Gooclaim reads your record to answer — it never writes back. Your system stays the source of truth.", color: t.brand, soft: t.brandSoft },
  { n: "02", title: "One tenant can never reach another", desc: "Your tenant comes from the signed-in session alone. A cross-tenant request is refused, logged, and the session ends.", color: t.violet, soft: t.violetSoft },
  { n: "03", title: "Personal numbers masked", desc: "ID, card and bank numbers — in India, Aadhaar and PAN too — are masked before anything is stored. Contact details never reach a log.", color: t.amber, soft: t.amberSoft },
  { n: "04", title: "Encrypted with a vault key", desc: "What must be recoverable is encrypted at rest with a key in a managed vault — the service refuses to start without one.", color: t.green, soft: t.greenSoft },
  { n: "05", title: "Consent, then verification", desc: "Consent before any claim detail. The registered number proves who is writing; on email and calls, a one-time code does.", color: t.brand, soft: t.brandSoft },
  { n: "06", title: "Access by role, every request", desc: "Multi-factor sign-in. Roles decide what each person sees, checked on every request — never assumed from the screen.", color: t.red, soft: t.redSoft },
];

const pill = { padding: "14px 26px", borderRadius: 999, font: "inherit", fontSize: 16, fontWeight: 500, cursor: "pointer" } as const;

export default function Security() {
  return (
    <SiteLayout>
      <SEOHead
        seo={SEO_SECURITY}
        path="/security"
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Security & compliance", path: "/security" },
        ])}
      />
      <ThemeStyle css={css} />
      <div style={{ background: t.bg, color: t.text }}>
        <section style={{ position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${t.dot} 1px, transparent 1.4px)`, backgroundSize: "22px 22px", WebkitMaskImage: "radial-gradient(55% 70% at 50% 0%, #000 20%, transparent 75%)", maskImage: "radial-gradient(55% 70% at 50% 0%, #000 20%, transparent 75%)" }} />
          <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "88px 24px 56px", textAlign: "center" }}>
            <div style={{ display: "inline-flex", width: 64, height: 64, borderRadius: 18, background: t.amberSoft, color: t.amber, alignItems: "center", justifyContent: "center" }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l7 3v6c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" />
                <path d="M8.8 12.2l2.2 2.2 4.2-4.4" />
              </svg>
            </div>
            <h1 style={{ margin: "22px auto 0", fontSize: "clamp(40px, 5.4vw, 72px)", lineHeight: 1.03, fontWeight: 600, letterSpacing: "-0.045em", maxWidth: 900 }}>
              Claims data is health data.{" "}
              <span style={{ background: t.secGrad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>We built for that.</span>
            </h1>
            <p style={{ margin: "20px auto 0", fontSize: 18, color: t.text2, maxWidth: 680 }}>
              Consent, verification, encryption, masking and an audit trail on every claim — designed around what insurance regulators and data-protection law expect, not bolted on after.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap", justifyContent: "center" }}>
              <button type="button" onClick={requestSecurityDetails} style={{ ...pill, border: "none", background: t.btnBg, color: t.btnText }}>Request security details</button>
              <button type="button" onClick={() => openWaitlist("security-hero")} style={{ ...pill, border: `1px solid ${t.border}`, background: t.surface, color: t.text }}>Book a walkthrough</button>
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 1240, margin: "0 auto", padding: "40px 24px 40px" }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: ".08em", color: t.text3 }}>01 · SECURITY &amp; DATA</div>
          <h2 style={{ margin: "14px 0 0", fontSize: "clamp(32px, 4.2vw, 54px)", lineHeight: 1.06, fontWeight: 600, letterSpacing: "-0.04em" }}>
            Built for regulated data. <span style={{ color: t.text3 }}>From the first message.</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 14, marginTop: 40 }}>
            {CONTROLS.map((c) => (
              <div key={c.n} style={{ padding: 26, borderRadius: 20, border: `1px solid ${t.border}`, background: t.surface }}>
                <span style={{ display: "inline-flex", width: 40, height: 40, borderRadius: 12, background: c.soft, color: c.color, alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 13, fontWeight: 500 }}>{c.n}</span>
                <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 16 }}>{c.title}</div>
                <div style={{ fontSize: 14, color: t.text2, marginTop: 6 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <OnEveryClaim />

        <section style={{ maxWidth: 1240, margin: "0 auto", padding: "96px 24px 112px" }}>
          <div style={{ borderRadius: 28, padding: "clamp(36px, 6vw, 72px)", background: t.ctaBg, color: "#FAFAF9", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
            <div style={{ maxWidth: 640 }}>
              <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: ".08em", color: "#FCD34D" }}>SECURITY REVIEW</div>
              <h2 style={{ margin: "10px 0 0", fontSize: "clamp(28px, 3.6vw, 44px)", fontWeight: 600, letterSpacing: "-0.04em" }}>Running a security review?</h2>
              <p style={{ margin: "10px 0 0", color: "#D6D3D1" }}>Ask for our security details — how data is protected, where it is hosted and who can reach it. We send them to your team directly.</p>
            </div>
            <button type="button" onClick={requestSecurityDetails} style={{ ...pill, border: "none", background: "#FAFAF9", color: "#0C0A09" }}>Request security details</button>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
