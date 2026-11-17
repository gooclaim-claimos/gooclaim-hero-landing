import { makeTheme } from "@/theme/theme";

export const { t, css } = makeTheme("orion", {
  bg: ["#FAFAF9", "#07090F"],
  surface: ["#FFFFFF", "#0F131C"],
  surface2: ["#F4F3F1", "#151A25"],
  border: ["#E7E5E4", "#232A38"],
  text: ["#0C0A09", "#F5F5F4"],
  text2: ["#57534E", "#A8A29E"],
  text3: ["#78716C", "#8C8783"],
  btnBg: ["#0C0A09", "#F5F5F4"],
  btnText: ["#FAFAF9", "#0C0A09"],
  acc: ["#047857", "#34D399"],
  accOn: ["#FFFFFF", "#04140E"],
  accSoft: ["#ECFDF5", "rgba(52,211,153,.10)"],
  accLine: ["#A7F3D0", "rgba(52,211,153,.35)"],
  accGrad: ["linear-gradient(90deg, #047857 0%, #1D4ED8 100%)", "linear-gradient(90deg, #34D399 0%, #60A5FA 100%)"],
  amber: ["#B45309", "#FCD34D"],
  red: ["#B91C1C", "#FCA5A5"],
  ctaBg: ["#0C0A09", "#0F131C"],
  glow: [
    "radial-gradient(circle, rgba(16,185,129,.14) 0%, rgba(59,130,246,.07) 40%, rgba(0,0,0,0) 70%)",
    "radial-gradient(circle, rgba(16,185,129,.20) 0%, rgba(59,130,246,.10) 40%, rgba(0,0,0,0) 70%)",
  ],
  cardShadow: ["0 24px 64px rgba(6,78,59,.12)", "0 30px 80px rgba(0,0,0,.5)"],
  panel: [
    "radial-gradient(70% 80% at 10% 10%, #A7F3D0 0%, rgba(0,0,0,0) 60%), radial-gradient(60% 70% at 95% 95%, #BFDBFE 0%, rgba(0,0,0,0) 60%), #ECF7F2",
    "radial-gradient(70% 80% at 10% 10%, rgba(16,185,129,.28) 0%, rgba(0,0,0,0) 60%), radial-gradient(60% 70% at 95% 95%, rgba(59,130,246,.18) 0%, rgba(0,0,0,0) 60%), #0A1311",
  ],
  redSoft: ["#FEF2F2", "rgba(239,68,68,.15)"],
  amberSoft: ["#FFFBEB", "rgba(245,158,11,.15)"],
  alsoBg: ["#F4F3F1", "rgba(255,255,255,.06)"],
  neverBg: ["#FEF7F7", "rgba(239,68,68,.06)"],
  neverLine: ["#FECACA", "rgba(239,68,68,.3)"],
});

export const mono = "'JetBrains Mono', monospace";
