import SEOHead from "@/components/SEOHead";
import { SEO_ORION } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured";
import SiteLayout from "@/site/SiteLayout";
import { ThemeStyle } from "@/theme/ThemeProvider";
import CtaBand from "@/platform/CtaBand";
import ClaimRoom from "@/orion/ClaimRoom";
import { Features, OrionHero, WhereTheLineIs } from "@/orion/Sections";
import { css, t } from "@/orion/theme";

export default function Orion() {
  return (
    <SiteLayout>
      <SEOHead
        seo={SEO_ORION}
        path="/orion"
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Orion", path: "/orion" },
        ])}
      />
      <ThemeStyle css={css} />
      <div style={{ background: t.bg, color: t.text }}>
        <OrionHero />
        <Features />
        <ClaimRoom />
        <WhereTheLineIs />
        <CtaBand bg={t.ctaBg} title="See Orion on your own claims." sub="A 20-minute walkthrough — your workflow first. No slides." source="orion-close" secondary={{ label: "Explore the platform", to: "/platform" }} />
      </div>
    </SiteLayout>
  );
}
