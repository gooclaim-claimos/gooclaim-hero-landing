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
import ProblemJourney from "@/sections/ProblemJourney";
import ThreeJobs from "@/sections/ThreeJobs";
import MemberExperience from "@/sections/MemberExperience";
import GoLive from "@/sections/GoLive";
import Faq from "@/sections/Faq";
import Footer from "@/sections/Footer";

/** The short story: the hook, the pain, the three jobs, the most convincing
 *  demo, how to start. Depth lives on /platform, /orion and /security. */
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
        <ProblemJourney eyebrow="01 · The problem" />
        <ThreeJobs eyebrow="02 · What it does" />
        <MemberExperience eyebrow="03 · What your member sees" />
        <GoLive eyebrow="04 · Going live" />
        <Faq eyebrow="Questions" limit={4} moreHref="/platform#faq" />
        <Footer />
      </main>
    </>
  );
}
