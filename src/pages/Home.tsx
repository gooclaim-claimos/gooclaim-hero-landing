import { useEffect } from "react";
import { initLenis } from "@/lib/lenis";
import SEOHead from "@/components/SEOHead";
import CountryBanner from "@/components/CountryBanner";
import { COUNTRY_ALTERNATES, SEO_HOME } from "@/lib/seo";
import {
  orgJsonLd,
  softwareJsonLd,
  websiteJsonLd,
} from "@/lib/structured";
import HeroMeshGrid from "@/sections/HeroMeshGrid";
import ProblemJourney from "@/sections/ProblemJourney";
import WhereWeRun from "@/sections/WhereWeRun";
import ThreeJobs from "@/sections/ThreeJobs";
import MemberExperience from "@/sections/MemberExperience";
import GoLive from "@/sections/GoLive";
import Faq from "@/sections/Faq";
import Footer from "@/sections/Footer";

/** The short story for every country: the hook, the pain, where it runs, the three jobs, what the member
 *  sees, how to start. A country's rules, numbers and the day-by-day claim live on its own page (/in).
 *  Depth lives on /platform, /orion and /security. */
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
        alternates={COUNTRY_ALTERNATES}
        jsonLd={[orgJsonLd, softwareJsonLd, websiteJsonLd]}
      />
      <main className="relative isolate overflow-x-clip bg-ink-950 text-white">
        <HeroMeshGrid />
        <ProblemJourney eyebrow="01 · The problem" />
        <WhereWeRun eyebrow="02 · Where it runs" />
        <ThreeJobs eyebrow="03 · What it does" />
        <MemberExperience eyebrow="04 · What your member sees" />
        <GoLive eyebrow="05 · Going live" />
        <Faq eyebrow="Questions" limit={4} moreHref="/platform#faq" />
        <Footer />
      </main>
      <CountryBanner />
    </>
  );
}
