import { makeTheme } from "@/theme/theme";

export const { t, css } = makeTheme("price", {
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
  brandLine: ["#C7D7FE", "rgba(96,165,250,.35)"],
  brandGrad: ["linear-gradient(90deg, #1D4ED8 0%, #0891B2 100%)", "linear-gradient(90deg, #3B82F6 0%, #0891B2 100%)"],
  green: ["#047857", "#34D399"],
  greenSoft: ["#ECFDF5", "rgba(52,211,153,.12)"],
  red: ["#B91C1C", "#FCA5A5"],
  glow: ["radial-gradient(circle, rgba(37,99,235,.16) 0%, rgba(0,0,0,0) 65%)", "radial-gradient(circle, rgba(59,130,246,.28) 0%, rgba(0,0,0,0) 65%)"],
  panel: [
    "radial-gradient(70% 80% at 10% 10%, #DBE6FE 0%, rgba(0,0,0,0) 60%), radial-gradient(60% 70% at 95% 95%, #CFF5FB 0%, rgba(0,0,0,0) 60%), #EEF2F7",
    "radial-gradient(70% 80% at 10% 10%, rgba(59,130,246,.26) 0%, rgba(0,0,0,0) 60%), radial-gradient(60% 70% at 95% 95%, rgba(34,211,238,.16) 0%, rgba(0,0,0,0) 60%), #0B0F19",
  ],
  // The featured (Production) card is inverted against the page.
  featBg: ["#0C0A09", "#F5F5F4"],
  featFg: ["#FAFAF9", "#0C0A09"],
  featLine: ["rgba(250,250,249,.15)", "rgba(12,10,9,.15)"],
  featCheck: ["#60A5FA", "#1D4ED8"],
  featBtnBg: ["#FAFAF9", "#0C0A09"],
  featBtnFg: ["#0C0A09", "#FAFAF9"],
});

export const mono = "'JetBrains Mono', monospace";
