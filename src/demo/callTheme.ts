import { makeTheme } from "@/theme/theme";

export const callTheme = makeTheme("call", {
  bg: ["#FAFAF9", "#07090F"],
  surface: ["#FFFFFF", "#0F131C"],
  border: ["#E7E5E4", "#232A38"],
  text: ["#0C0A09", "#F5F5F4"],
  text2: ["#57534E", "#A8A29E"],
  text3: ["#78716C", "#8C8783"],
  btnBg: ["#0C0A09", "#F5F5F4"],
  btnText: ["#FAFAF9", "#0C0A09"],
  brand: ["#1D4ED8", "#60A5FA"],
  green: ["#047857", "#34D399"],
  warn: ["#B45309", "#FCD34D"],
  ctaBg: ["#0C0A09", "#0F131C"],
  brandGrad: ["linear-gradient(90deg, #1D4ED8 0%, #0891B2 100%)", "linear-gradient(90deg, #93C5FD 0%, #22D3EE 100%)"],
  stageBase: ["#F4F6FB", "#0A0E17"],
  stageLine: ["#E4E8F2", "#1E2533"],
  stageShadow: ["0 1px 2px rgba(12,10,9,.04), 0 40px 100px rgba(30,58,138,.12)", "0 40px 120px rgba(0,0,0,.6)"],
  meshA: ["radial-gradient(circle, rgba(147,197,253,.75) 0%, rgba(147,197,253,0) 65%)", "radial-gradient(circle, rgba(59,130,246,.45) 0%, rgba(59,130,246,0) 65%)"],
  meshB: ["radial-gradient(circle, rgba(165,243,252,.70) 0%, rgba(165,243,252,0) 65%)", "radial-gradient(circle, rgba(34,211,238,.30) 0%, rgba(34,211,238,0) 65%)"],
  meshC: ["radial-gradient(circle, rgba(221,214,254,.75) 0%, rgba(221,214,254,0) 65%)", "radial-gradient(circle, rgba(167,139,250,.22) 0%, rgba(167,139,250,0) 65%)"],
  glass: ["rgba(255,255,255,.62)", "rgba(255,255,255,.06)"],
  glassLine: ["rgba(12,10,9,.08)", "rgba(255,255,255,.10)"],
  ringTrack: ["rgba(12,10,9,.07)", "rgba(255,255,255,.08)"],
  ringInner: ["rgba(250,251,255,.92)", "#0B101A"],
  /** The countdown ring's colour while more than ten seconds are left. */
  ringBrand: ["#1D4ED8", "#60A5FA"],
  segOn: ["#0C0A09", "#F5F5F4"],
  segOnText: ["#FAFAF9", "#0C0A09"],
});

export const CALL_CSS = `${callTheme.css}
.call-page a{text-decoration:none;color:inherit}
@keyframes gcRing{0%{transform:scale(1);opacity:.55}100%{transform:scale(1.55);opacity:0}}
@keyframes gcBreathe{0%,100%{transform:scale(1)}50%{transform:scale(1.045)}}
@keyframes gcBar{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}
@keyframes gcDrift{0%{transform:translate(0,0)}50%{transform:translate(30px,-20px)}100%{transform:translate(0,0)}}`;
