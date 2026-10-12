/** Where each line of insurance stands — the one answer every page reads. */
export type SectorStatus = "live" | "next";

export const STATUS_LABEL: Record<SectorStatus, string> = {
  live: "Live now",
  next: "Coming next",
};

export const STATUS_HUE: Record<SectorStatus, string> = {
  live: "#10b981",
  next: "#0d99ff",
};

export interface Sector {
  key: string;
  label: string;
  status: SectorStatus;
  line: string;
  to?: string;
}

export const SECTORS: Sector[] = [
  {
    key: "health",
    label: "Health",
    status: "live",
    line: "Claim status, pending documents, query reasons and complaints — against the IRDAI clock.",
    to: "/use-cases/health",
  },
  {
    key: "motor",
    label: "Motor",
    status: "next",
    line: "Customer, surveyor and garage on one audited thread.",
    to: "/use-cases/motor",
  },
  {
    key: "life",
    label: "Life",
    status: "next",
    line: "Nominee claims and their document chain, handled with care.",
    to: "/use-cases/life",
  },
];

export const sectorByKey = (key: string) => SECTORS.find((s) => s.key === key);
export const sectorByPath = (path: string) => SECTORS.find((s) => s.to === path);
