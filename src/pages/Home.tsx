import { useEffect } from "react";
import { initLenis } from "@/lib/lenis";
import SEOHead from "@/components/SEOHead";
import { SEO_HOME } from "@/lib/seo";
import {
  orgJsonLd,
  softwareJsonLd,
  websiteJsonLd,
} from "@/lib/structured";
import HeroMeshGrid from "@/sections/HeroMeshGrid";
import OneCoreIntegrations from "@/sections/OneCoreIntegrations";
import ProblemBento from "@/sections/ProblemBento";
import SolutionBento from "@/sections/SolutionBento";
import ModulesSplit from "@/sections/ModulesSplit";
import CoverageBloom from "@/sections/CoverageBloom";
import Footer from "@/sections/Footer";

export default function Home() {
  useEffect(() => {
    const teardown = initLenis();
    return teardown;
  }, []);

  return (
    <>
      <SEOHead
        seo={SEO_HOME}
        path="/"
        jsonLd={[orgJsonLd, softwareJsonLd, websiteJsonLd]}
      />
      <main className="relative isolate overflow-x-hidden bg-ink-950 text-white">
        <HeroMeshGrid />
        <OneCoreIntegrations />
        <ProblemBento />
        <SolutionBento />
        <ModulesSplit />
        <CoverageBloom />
        <Footer />
      </main>
    </>
  );
}
