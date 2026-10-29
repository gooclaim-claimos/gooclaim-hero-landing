import { useEffect } from "react";
import { initLenis } from "@/lib/lenis";
import SEOHead from "@/components/SEOHead";
import { COUNTRY_ALTERNATES, SEO_INDIA } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured";
import HeroMeshGrid from "@/sections/HeroMeshGrid";
import ProofBand from "@/sections/ProofBand";
import ProblemJourney from "@/sections/ProblemJourney";
import SystemGap from "@/sections/SystemGap";
import ThreeJobs from "@/sections/ThreeJobs";
import MemberExperience from "@/sections/MemberExperience";
import GoLive from "@/sections/GoLive";
import Faq from "@/sections/Faq";
import Footer from "@/sections/Footer";

/** Gooclaim OS in India: IRDAI's clocks and circulars, DPDP, rupees and India's own numbers — each with its
 *  public source — and the day-by-day claim run under those rules. */
export default function India() {
  useEffect(() => {
    const teardown = initLenis();
    return teardown;
  }, []);

  return (
    <>
      <SEOHead
        seo={SEO_INDIA}
        path="/in"
        alternates={COUNTRY_ALTERNATES}
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "India", path: "/in" },
        ])}
      />
      <main className="relative isolate overflow-x-clip bg-ink-950 text-white">
        <HeroMeshGrid market="in" />
        <ProofBand />
        <ProblemJourney eyebrow="01 · The problem" market="in" />
        <SystemGap eyebrow="02 · Why your system can’t fix it" />
        <ThreeJobs eyebrow="03 · What it does" market="in" />
        <MemberExperience eyebrow="04 · What your member sees" market="in" />
        <GoLive eyebrow="05 · Going live" />
        <Faq eyebrow="Questions" limit={4} moreHref="/platform#faq" />
        <Footer />
      </main>
    </>
  );
}
