import { useState } from "react";
import SiteLayout from "@/site/SiteLayout";
import SEOHead from "@/components/SEOHead";
import { ThemeStyle } from "@/theme/ThemeProvider";
import { SEO_PRICING } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured";
import Modes from "@/pricing/Modes";
import ConnectForm from "@/pricing/ConnectForm";
import { css, mono, t } from "@/pricing/theme";

const FAQS: [string, string][] = [
  ["Do we have to replace our claims system?", "No. Gooclaim OS reads from the claims system you already run — by API, a secure file drop or a batch upload — and never writes back to it. Your system stays the source of truth."],
  ["Does the AI write messages to our members?", "Members only ever receive wording your team approved, in their language. Every value in a message is matched to your record before it leaves — free text never reaches a member."],
  ["What happens when the AI isn’t sure?", "It says so and hands the case to your team with the reason. It never guesses."],
  ["Which channels and languages work today?", "Messaging tools and email today, with voice calls in early access and SMS next. Members are answered in English, Hindi and Hinglish."],
  ["Is it only for health insurance?", "We started with health, where the clock is strictest. Motor and life have the same moments — talk to us if you run another line."],
];

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section style={{ maxWidth: 880, margin: "0 auto", padding: "80px 24px 112px" }}>
      <h2 style={{ margin: 0, fontSize: "clamp(28px, 3.4vw, 42px)", fontWeight: 600, letterSpacing: "-0.04em", textAlign: "center" }}>
        The questions TPAs ask. <span style={{ color: t.text3 }}>Answered plainly.</span>
      </h2>
      <div style={{ marginTop: 32, borderTop: `1px solid ${t.border}` }}>
        {FAQS.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <div key={q} style={{ borderBottom: `1px solid ${t.border}` }}>
              <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} aria-controls={`faq-${i}`} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "20px 4px", border: "none", background: "none", color: t.text, font: "inherit", fontSize: 17, fontWeight: 500, textAlign: "left", cursor: "pointer" }}>
                <span>{q}</span>
                <span aria-hidden="true" style={{ flex: "none", fontSize: 22, color: t.text3 }}>{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div id={`faq-${i}`} style={{ padding: "0 4px 20px", fontSize: 15, color: t.text2 }}>{a}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function Pricing() {
  return (
    <SiteLayout>
      <SEOHead
        seo={SEO_PRICING}
        path="/pricing"
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />
      <ThemeStyle css={css} />
      <div style={{ background: t.bg, color: t.text }}>
        <section style={{ position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", width: 700, height: 700, left: "50%", top: -420, marginLeft: -350, borderRadius: 999, background: t.glow }} />
          <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "88px 24px 40px", textAlign: "center" }}>
            <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: ".1em", color: t.brand }}>PRICING</div>
            <h1 style={{ margin: "14px auto 0", fontSize: "clamp(40px, 5.4vw, 72px)", lineHeight: 1.03, fontWeight: 600, letterSpacing: "-0.045em", maxWidth: 880 }}>
              A partnership, <span style={{ background: t.brandGrad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>not a SKU.</span>
            </h1>
            <p style={{ margin: "18px auto 0", fontSize: 18, color: t.text2, maxWidth: 620 }}>
              Pricing follows the shape of your operation. Three engagement modes — we’ll co-design the right one with you in a 20-minute call.
            </p>
          </div>
        </section>

        <Modes />

        <section id="connect" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 40px", scrollMarginTop: 80 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32, padding: "clamp(24px, 4vw, 48px)", borderRadius: 28, background: t.panel }}>
            <div style={{ flex: "1 1 340px", minWidth: 0 }}>
              <h2 style={{ margin: 0, fontSize: "clamp(30px, 3.6vw, 46px)", lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.04em" }}>Connect with us.</h2>
              <p style={{ margin: "14px 0 0", color: t.text2, fontSize: 16 }}>Tell us the shape of your operation. We come back with a real number after one call — your workflow first, on a sample claims system.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 22, fontSize: 14 }}>
                <span>✓&nbsp; 20 minutes · no slides</span>
                <span>✓&nbsp; Read-only on your claims system</span>
                <span>✓&nbsp; Nothing reaches a member until you approve it</span>
              </div>
            </div>
            <div style={{ flex: "1 1 400px", minWidth: 0, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 22, padding: 24 }}>
              <ConnectForm />
            </div>
          </div>
        </section>

        <Faq />
      </div>
    </SiteLayout>
  );
}
