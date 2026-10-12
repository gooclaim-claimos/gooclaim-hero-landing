import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import SEOHead from "@/components/SEOHead";
import { SEO_ORION } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured";
import OrionCoworker from "@/sections/OrionCoworker";

export default function Orion() {
  return (
    <PageShell>
      <SEOHead
        seo={SEO_ORION}
        path="/orion"
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Orion", path: "/orion" },
        ])}
      />
      <PageHero
        eyebrow="Orion · for your claims team"
        title={
          <>
            Less chasing.{" "}
            <span className="text-gradient-cyan">More deciding.</span>
          </>
        }
        intro="Orion works beside your claims staff. It reads every claim, shows what needs a person and why, and prepares the next safe step with its evidence. Your team decides — Orion never does."
        source="orion-hero"
        secondary={{ label: "Explore the platform", to: "/platform" }}
      />
      <OrionCoworker eyebrow="Inside Orion" />
      <CtaBand source="orion-close" next={{ label: "Security & compliance", to: "/security" }} />
    </PageShell>
  );
}
