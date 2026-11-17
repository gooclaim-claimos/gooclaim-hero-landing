import SEOHead from "@/components/SEOHead";
import { SEO_PLATFORM } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured";
import SiteLayout from "@/site/SiteLayout";
import { ThemeStyle } from "@/theme/ThemeProvider";
import CtaBand from "@/platform/CtaBand";
import { Connectors, PlatformHero } from "@/platform/Hero";
import { FiveThings } from "@/platform/FiveThings";
import { SevenLayers } from "@/platform/SevenLayers";
import { AuditLedger, Coverage } from "@/platform/Record";
import { css, t } from "@/platform/theme";

export default function Platform() {
  return (
    <SiteLayout>
      <SEOHead
        seo={SEO_PLATFORM}
        path="/platform"
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform" },
        ])}
      />
      <ThemeStyle css={css} />
      <div style={{ background: t.bg, color: t.text }}>
        <PlatformHero />
        <Connectors />
        <FiveThings />
        <SevenLayers />
        <AuditLedger />
        <Coverage />
        <CtaBand bg={t.ctaBg} title="See Gooclaim OS on a real claim." sub="A 20-minute walkthrough — your workflow first, on a sample claims system. No slides." source="platform-close" secondary={{ label: "Try it live", to: "/try" }} />
      </div>
    </SiteLayout>
  );
}
