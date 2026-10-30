import { Helmet } from "react-helmet-async";
import { SITE, type PageSEO } from "@/lib/seo";

interface Props {
  seo: PageSEO;
  path: string;
  jsonLd?: object | object[];
  /** The same page in other countries (`hreflang`), e.g. `COUNTRY_ALTERNATES`. */
  alternates?: { hreflang: string; path: string }[];
}

export default function SEOHead({ seo, path, jsonLd, alternates = [] }: Props) {
  const url = `${SITE.url}${path}`;
  const ogImage = `${SITE.url}${seo.ogImage ?? SITE.defaultOgImage}`;
  const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords && <meta name="keywords" content={seo.keywords} />}

      <link rel="canonical" href={url} />
      {alternates.map((a) => (
        <link key={a.hreflang} rel="alternate" hrefLang={a.hreflang} href={`${SITE.url}${a.path}`} />
      ))}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {seo.locale && <meta property="og:locale" content={seo.locale} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content={SITE.twitter} />

      {/* Crawl */}
      <meta name="robots" content="index, follow, max-image-preview:large" />

      {jsonLdArray.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
