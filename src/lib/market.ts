/**
 * Which market a page speaks to. The home page serves every country, so it names
 * no country's regulator, clock or currency; a country page (`/in`) carries them.
 * `/us` and `/ae` join when the product runs there — not before.
 */
export type Market = "global" | "in";

/** The country pages that exist. The "Where it runs" switcher lists them and the home page's
 *  location banner points to them; a country is added here together with its page. */
export const COUNTRY_PAGES = [{ code: "IN", name: "India", to: "/in" }] as const;

export type CountryPage = (typeof COUNTRY_PAGES)[number];
