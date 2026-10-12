import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import SEOHead from "@/components/SEOHead";
import { SEO_SECURITY } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured";
import SecurityTrust from "@/sections/SecurityTrust";
import OnEveryClaim from "@/sections/OnEveryClaim";

export default function Security() {
  return (
    <PageShell>
      <SEOHead
        seo={SEO_SECURITY}
        path="/security"
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Security & compliance", path: "/security" },
        ])}
      />
      <PageHero
        eyebrow="Security & compliance"
        title={
          <>
            Health data,{" "}
            <span className="text-gradient-cyan">handled like health data.</span>
          </>
        }
        intro="Claims data is health data. Gooclaim OS is designed around what IRDAI and the DPDP Act expect — consent, verification, encryption, masking and an audit trail on every claim."
        source="security-hero"
        secondary={{ label: "Read the full control map", to: "/compliance" }}
      />
      <SecurityTrust eyebrow="01 · Security & data" />
      <OnEveryClaim eyebrow="02 · On every claim" />
      <CtaBand source="security-close" next={{ label: "Explore the platform", to: "/platform" }} />
    </PageShell>
  );
}
