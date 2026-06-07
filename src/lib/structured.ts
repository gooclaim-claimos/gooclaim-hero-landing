import { SITE } from "./seo";

export const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.brand,
  legalName: "Gooclaim Technologies Private Limited",
  url: SITE.url,
  logo: `${SITE.url}/logo-gooclaim.png`,
  sameAs: ["https://www.linkedin.com/in/kumar-mayank-392381168/"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "contact@gooclaim.com",
      availableLanguage: ["English", "Hindi"],
      areaServed: "IN",
    },
    {
      "@type": "ContactPoint",
      contactType: "security",
      email: "security@gooclaim.com",
    },
  ],
};

export const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE.name,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Insurance · Claims · Operating System",
  operatingSystem: "Cloud",
  description:
    "Multi-agent AI operating system for India's TPAs and insurers — built for every claim, every channel, every CMS, every vertical.",
  url: SITE.url,
  brand: { "@type": "Brand", name: SITE.brand },
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    price: "0",
    description:
      "Pricing follows the shape of your operation — book a 30-minute call for a custom quote.",
    url: `${SITE.url}/pricing`,
  },
  audience: {
    "@type": "BusinessAudience",
    audienceType: "TPAs · Insurers · Hospitals",
  },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
};

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}
