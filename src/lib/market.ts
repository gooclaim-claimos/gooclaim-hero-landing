/**
 * Which market a page speaks to. The home page serves every country, so it names
 * no country's regulator, clock or currency; a country page (`/in`) carries them.
 * `/us` and `/ae` join when the product runs there — not before.
 */
export type Market = "global" | "in";
