import { makeTheme } from "@/theme/theme";

/**
 * The canvas palette for the pages the canvas did not draw (legal, India,
 * module pages, demo, the booking modal). Values are the canvas's own: the
 * Pricing and Security artboards.
 */
export const { t, css } = makeTheme("lg", {
  bg: ["#FAFAF9", "#07090F"],
  surface: ["#FFFFFF", "#0F131C"],
  surface2: ["#F4F3F1", "#151A25"],
  border: ["#E7E5E4", "#232A38"],
  borderStrong: ["#D6D3D1", "#334155"],
  text: ["#0C0A09", "#F5F5F4"],
  text2: ["#57534E", "#A8A29E"],
  text3: ["#78716C", "#8C8783"],
  btnBg: ["#0C0A09", "#F5F5F4"],
  btnText: ["#FAFAF9", "#0C0A09"],
  brand: ["#1D4ED8", "#60A5FA"],
  brandSoft: ["#EEF3FF", "rgba(96,165,250,.13)"],
  brandLine: ["#C7D7FE", "rgba(96,165,250,.35)"],
  brandGrad: ["linear-gradient(90deg, #1D4ED8 0%, #0891B2 100%)", "linear-gradient(90deg, #60A5FA 0%, #22D3EE 100%)"],
  glow: ["radial-gradient(circle, rgba(37,99,235,.16) 0%, rgba(0,0,0,0) 65%)", "radial-gradient(circle, rgba(59,130,246,.28) 0%, rgba(0,0,0,0) 65%)"],
  panel: [
    "radial-gradient(70% 80% at 10% 10%, #DBE6FE 0%, rgba(0,0,0,0) 60%), radial-gradient(60% 70% at 95% 95%, #CFF5FB 0%, rgba(0,0,0,0) 60%), #EEF2F7",
    "radial-gradient(70% 80% at 10% 10%, rgba(59,130,246,.26) 0%, rgba(0,0,0,0) 60%), radial-gradient(60% 70% at 95% 95%, rgba(34,211,238,.16) 0%, rgba(0,0,0,0) 60%), #0B0F19",
  ],
  green: ["#047857", "#34D399"],
  greenSoft: ["#ECFDF5", "rgba(52,211,153,.12)"],
  amber: ["#B45309", "#FCD34D"],
  amberSoft: ["#FFFBEB", "rgba(245,158,11,.14)"],
  red: ["#B91C1C", "#FCA5A5"],
  redSoft: ["#FEF2F2", "rgba(239,68,68,.10)"],
  redLine: ["#FECACA", "rgba(239,68,68,.35)"],
  overlay: ["rgba(12,10,9,.45)", "rgba(0,0,0,.66)"],
  shadow: ["0 1px 2px rgba(12,10,9,.04), 0 30px 80px rgba(30,58,138,.16)", "0 0 0 1px rgba(255,255,255,.02), 0 30px 80px rgba(0,0,0,.55)"],
  softShadow: ["0 1px 2px rgba(12,10,9,.03), 0 12px 32px rgba(30,58,138,.06)", "none"],
});

export const mono = "'JetBrains Mono', monospace";
