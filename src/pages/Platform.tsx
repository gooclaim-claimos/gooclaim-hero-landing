import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import SEOHead from "@/components/SEOHead";
import { SEO_PLATFORM } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured";
import OneCoreIntegrations from "@/sections/OneCoreIntegrations";
import SolutionBento from "@/sections/SolutionBento";
import ModulesSplit from "@/sections/ModulesSplit";
import CoverageBloom from "@/sections/CoverageBloom";
import LinesOfBusiness from "@/sections/LinesOfBusiness";
import Faq, { faqJsonLd } from "@/sections/Faq";

export default function Platform() {
  return (
    <PageShell>
      <SEOHead
        seo={SEO_PLATFORM}
        path="/platform"
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Platform", path: "/platform" },
          ]),
          faqJsonLd,
        ]}
      />
      <PageHero
        eyebrow="The platform"
        title={
          <>
            One agentic core.{" "}
            <span className="text-gradient-cyan">Every channel. Every CMS.</span>
          </>
        }
        intro="Gooclaim OS is a Claim OS — a multi-agent system that reads any claims system, answers on any channel, and checks every word against your record before it leaves. Everything it does is on the record."
        source="platform-hero"
        secondary={{ label: "Meet Orion", to: "/orion" }}
      />
      <OneCoreIntegrations eyebrow="01 · One core" />
      <SolutionBento eyebrow="02 · An OS, not a chatbot" />
      <ModulesSplit eyebrow="03 · Inside the OS" />
      <CoverageBloom eyebrow="04 · Coverage" />
      <LinesOfBusiness eyebrow="05 · Every line of business" />
      <Faq eyebrow="Questions" />
      <CtaBand source="platform-close" next={{ label: "Security & compliance", to: "/security" }} />
    </PageShell>
  );
}
