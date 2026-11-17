import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { COUNTRY_ALTERNATES, SEO_HOME } from "@/lib/seo";
import { orgJsonLd, softwareJsonLd, websiteJsonLd } from "@/lib/structured";
import Nav from "@/site/Nav";
import Footer from "@/site/Footer";
import { ThemeStyle } from "@/theme/ThemeProvider";
import Hero from "@/home/Hero";
import Problem, { TrustStrip } from "@/home/Problem";
import ThreeJobs from "@/home/ThreeJobs";
import { GoingLive, Voice, Walkthrough } from "@/home/VoiceAndLaunch";
import { homeCss, t } from "@/home/theme";

/**
 * The homepage. Not wrapped in SiteLayout: the design puts the voice
 * announcement ABOVE the shared header, so it composes Nav and Footer itself.
 */
export default function Home() {
  return (
    <>
      <SEOHead seo={SEO_HOME} path="/" alternates={COUNTRY_ALTERNATES} jsonLd={[orgJsonLd, softwareJsonLd, websiteJsonLd]} />
      <ThemeStyle css={homeCss} />
      <div className="gc-home" style={{ minHeight: "100vh", background: t.bg, color: t.text, fontFamily: "Inter, 'Noto Sans Devanagari', system-ui, sans-serif", fontSize: 16, lineHeight: 1.5, transition: "background .3s, color .3s" }}>
        <div style={{ background: t.annBg, color: t.annText, fontSize: 13, padding: "9px 16px", display: "flex", justifyContent: "center", alignItems: "center", gap: 12, flexWrap: "wrap", textAlign: "center" }}>
          <span>Voice calls are now in early access — English, Hindi and Hinglish.</span>
          <Link to="/call" style={{ background: t.annBtnBg, color: t.annBtnText, padding: "3px 12px", borderRadius: 999, fontWeight: 500 }}>Try a 30-second call</Link>
        </div>
        <Nav />
        <main>
          <Hero />
          <TrustStrip />
          <Problem />
          <ThreeJobs />
          <Voice />
          <GoingLive />
          <Walkthrough />
        </main>
        <Footer />
      </div>
    </>
  );
}
