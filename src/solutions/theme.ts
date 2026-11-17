import { makeTheme, type TokenPairs } from "@/theme/theme";

export type SegmentKey = "tpas" | "insurers" | "hospitals" | "health";

/** Per segment: accent, soft, panel wash A, wash B, panel base, gradient end. */
const PALETTES: Record<SegmentKey, { l: string[]; d: string[] }> = {
  tpas: { l: ["#1D4ED8", "#EEF3FF", "#DBE6FE", "#CFF5FB", "#EEF2F7", "#0891B2"], d: ["#60A5FA", "rgba(96,165,250,.13)", "rgba(59,130,246,.30)", "rgba(34,211,238,.16)", "#0B0F19", "#22D3EE"] },
  insurers: { l: ["#6D28D9", "#F3EEFF", "#DDD6FE", "#FBCFE8", "#F3F0FA", "#BE185D"], d: ["#C4B5FD", "rgba(139,92,246,.15)", "rgba(139,92,246,.32)", "rgba(236,72,153,.16)", "#0F0C19", "#F9A8D4"] },
  hospitals: { l: ["#047857", "#ECFDF5", "#A7F3D0", "#BFDBFE", "#ECF7F2", "#1D4ED8"], d: ["#34D399", "rgba(52,211,153,.12)", "rgba(16,185,129,.28)", "rgba(59,130,246,.16)", "#0A1311", "#60A5FA"] },
  health: { l: ["#B45309", "#FEF3C7", "#FED7AA", "#FECACA", "#FBF3EA", "#BE123C"], d: ["#FCD34D", "rgba(252,211,77,.12)", "rgba(249,115,22,.28)", "rgba(239,68,68,.16)", "#140F0B", "#FDA4AF"] },
};

const panel = (p: string[]) => `radial-gradient(80% 90% at 10% 10%, ${p[2]} 0%, rgba(0,0,0,0) 60%), radial-gradient(70% 80% at 95% 95%, ${p[3]} 0%, rgba(0,0,0,0) 60%), ${p[4]}`;
const grad = (p: string[]) => `linear-gradient(90deg, ${p[0]} 0%, ${p[5]} 100%)`;
const glow = (p: string[]) => `radial-gradient(circle, ${p[2]} 0%, rgba(0,0,0,0) 65%)`;

const pairs: TokenPairs = {
  bg: ["#FAFAF9", "#07090F"],
  surface: ["#FFFFFF", "#0F131C"],
  surface2: ["#F4F3F1", "#151A25"],
  border: ["#E7E5E4", "#232A38"],
  text: ["#0C0A09", "#F5F5F4"],
  text2: ["#57534E", "#A8A29E"],
  text3: ["#78716C", "#8C8783"],
  btnBg: ["#0C0A09", "#F5F5F4"],
  btnText: ["#FAFAF9", "#0C0A09"],
  ctaBg: ["#0C0A09", "#0F131C"],
  activeBg: ["#EFEEEC", "#151A25"],
};
for (const [k, { l, d }] of Object.entries(PALETTES)) {
  pairs[`${k}Acc`] = [l[0], d[0]];
  pairs[`${k}Soft`] = [l[1], d[1]];
  pairs[`${k}Panel`] = [panel(l), panel(d)];
  pairs[`${k}Grad`] = [grad(l), grad(d)];
  pairs[`${k}Glow`] = [glow(l), glow(d)];
}

export const { t, css } = makeTheme("sol", pairs);

/** One segment's palette, as CSS variables. */
export function palette(k: SegmentKey) {
  return { acc: t[`${k}Acc`], soft: t[`${k}Soft`], panel: t[`${k}Panel`], grad: t[`${k}Grad`], glow: t[`${k}Glow`] };
}

export const mono = "'JetBrains Mono', monospace";
