export const WAITLIST_OPEN_EVENT = "gooclaim:waitlist:open";

export interface WaitlistOpenDetail {
  source?: string;
  headline?: string;
  subhead?: string;
  eyebrow?: string;
}

export function openWaitlist(
  source = "hero-landing",
  opts: Omit<WaitlistOpenDetail, "source"> = {},
): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<WaitlistOpenDetail>(WAITLIST_OPEN_EVENT, {
      detail: { source, ...opts },
    }),
  );
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

function readUtm(search: string): string {
  const params = new URLSearchParams(search);
  return UTM_KEYS.flatMap((k) => {
    // Keep it a label, not free text: letters, digits and . _ - only, short.
    const v = (params.get(k) || "").replace(/[^\w.-]/g, "").slice(0, 40);
    return v ? [`${k}=${v}`] : [];
  }).join(", ");
}

// The campaign tags of the link that brought this visitor, read once when the
// site loads. Held in memory only — no cookie, no storage — so they survive a
// move between pages and are gone when the tab closes.
const LANDING_UTM = typeof window === "undefined" ? "" : readUtm(window.location.search);

/** The form's source, with the landing link's campaign tags when there were any. */
export function sourceWithUtm(source: string): string {
  return LANDING_UTM ? `${source} · ${LANDING_UTM}` : source;
}

export const VOLUME_OPTIONS = [
  "< 1k",
  "1k – 10k",
  "10k – 50k",
  "50k – 200k",
  "200k+",
] as const;

export type VolumeOption = (typeof VOLUME_OPTIONS)[number];
