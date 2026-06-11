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

export const VOLUME_OPTIONS = [
  "< 1k",
  "1k – 10k",
  "10k – 50k",
  "50k – 200k",
  "200k+",
] as const;

export type VolumeOption = (typeof VOLUME_OPTIONS)[number];
