import { makeTheme } from "@/theme/theme";

export const { t, css } = makeTheme("sec", {
  bg: ["#FAFAF9", "#07090F"],
  surface: ["#FFFFFF", "#0F131C"],
  surface2: ["#F4F3F1", "#151A25"],
  border: ["#E7E5E4", "#232A38"],
  text: ["#0C0A09", "#F5F5F4"],
  text2: ["#57534E", "#A8A29E"],
  text3: ["#78716C", "#8C8783"],
  btnBg: ["#0C0A09", "#F5F5F4"],
  btnText: ["#FAFAF9", "#0C0A09"],
  brand: ["#1D4ED8", "#60A5FA"],
  brandSoft: ["#EEF3FF", "rgba(96,165,250,.13)"],
  amber: ["#B45309", "#FCD34D"],
  amberSoft: ["#FEF3C7", "rgba(252,211,77,.12)"],
  green: ["#047857", "#34D399"],
  greenSoft: ["#ECFDF5", "rgba(52,211,153,.12)"],
  red: ["#B91C1C", "#FCA5A5"],
  redSoft: ["#FEF2F2", "rgba(239,68,68,.14)"],
  violet: ["#6D28D9", "#C4B5FD"],
  violetSoft: ["#F3EEFF", "rgba(139,92,246,.15)"],
  secGrad: ["linear-gradient(90deg, #B45309 0%, #C2410C 100%)", "linear-gradient(90deg, #FCD34D 0%, #FB923C 100%)"],
  dot: ["rgba(12,10,9,.13)", "rgba(255,255,255,.10)"],
  track: ["#E7E5E4", "#262D3B"],
  ctaBg: ["#0C0A09", "#0F131C"],
  // The clock bar's fill: on time, getting close, late.
  fillOk: ["#059669", "#34D399"],
  fillNear: ["#D97706", "#FCD34D"],
  fillLate: ["#DC2626", "#F87171"],
});

export const mono = "'JetBrains Mono', monospace";
