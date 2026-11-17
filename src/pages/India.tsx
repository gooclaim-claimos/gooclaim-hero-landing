import SEOHead from "@/components/SEOHead";
import { COUNTRY_ALTERNATES, SEO_INDIA } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured";
import { LegacyPage } from "@/legacy/ui";
import { IndiaHero, IndiaProblem, ProofBand } from "@/legacy/india/IndiaTop";
import IndiaSystemGap from "@/legacy/india/IndiaClaimTimeline";
import { IndiaFaq, IndiaGoLive, IndiaMember, IndiaThreeJobs } from "@/legacy/india/IndiaRest";

/** Gooclaim OS in India: IRDAI's clocks and circulars, DPDP, rupees and India's own numbers — each with its
 *  public source — and the day-by-day claim run under those rules. */
export default function India() {
  return (
    <LegacyPage>
      <SEOHead
        seo={SEO_INDIA}
        path="/in"
        alternates={COUNTRY_ALTERNATES}
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "India", path: "/in" },
        ])}
      />
      <IndiaHero />
      <ProofBand />
      <IndiaProblem />
      <IndiaSystemGap />
      <IndiaThreeJobs />
      <IndiaMember />
      <IndiaGoLive />
      <IndiaFaq />
    </LegacyPage>
  );
}
