import { makeTheme } from "@/theme/theme";

const wash = (a: string, b: string, base: string) =>
  `radial-gradient(80% 90% at 12% 15%, ${a} 0%, rgba(0,0,0,0) 60%), radial-gradient(70% 80% at 92% 88%, ${b} 0%, rgba(0,0,0,0) 60%), ${base}`;

/** The homepage's own token pairs, as the design tunes them. */
const theme = makeTheme("home", {
  bg: ["#FAFAF9", "#07090F"],
  surface: ["#FFFFFF", "#0F131C"],
  surface2: ["#F2F1EF", "#151A25"],
  border: ["#E7E5E4", "#232A38"],
  text: ["#0C0A09", "#F5F5F4"],
  text2: ["#57534E", "#A8A29E"],
  text3: ["#78716C", "#8C8783"],
  btnBg: ["#0C0A09", "#F5F5F4"],
  btnText: ["#FAFAF9", "#0C0A09"],
  annBg: ["#0C0A09", "#151A25"],
  annText: ["#E7E5E4", "#D6D3D1"],
  annBtnBg: ["#FAFAF9", "#F5F5F4"],
  annBtnText: ["#0C0A09", "#0C0A09"],
  ctaBg: ["#0C0A09", "#0F131C"],
  blue: ["#4338CA", "#A5B4FC"],
  blueSoft: ["#EEF2FF", "rgba(99,102,241,.16)"],
  green: ["#047857", "#6EE7B7"],
  greenSoft: ["#ECFDF5", "rgba(16,185,129,.14)"],
  amber: ["#B45309", "#FCD34D"],
  violet: ["#6D28D9", "#C4B5FD"],
  red: ["#B91C1C", "#FCA5A5"],
  brand: ["#1D4ED8", "#60A5FA"],
  brandSoft: ["#E8EEFE", "rgba(96,165,250,.14)"],
  brandGrad: ["linear-gradient(90deg, #1D4ED8 0%, #0891B2 100%)", "linear-gradient(90deg, #60A5FA 0%, #22D3EE 100%)"],
  track: ["#E2E0DD", "#262D3B"],
  cardShadow: ["0 1px 2px rgba(12,10,9,.04), 0 30px 80px rgba(30,58,138,.16)", "0 0 0 1px rgba(255,255,255,.02), 0 30px 80px rgba(0,0,0,.55)"],
  stageBase: ["#F3F5FA", "#0A0E17"],
  stageLine: ["#E4E8F1", "#1E2533"],
  stageShadow: ["0 1px 2px rgba(12,10,9,.04), 0 40px 120px rgba(30,58,138,.10)", "0 40px 120px rgba(0,0,0,.6)"],
  meshA: ["radial-gradient(circle, rgba(147,197,253,.70) 0%, rgba(147,197,253,0) 65%)", "radial-gradient(circle, rgba(59,130,246,.42) 0%, rgba(59,130,246,0) 65%)"],
  meshB: ["radial-gradient(circle, rgba(165,243,252,.70) 0%, rgba(165,243,252,0) 65%)", "radial-gradient(circle, rgba(34,211,238,.26) 0%, rgba(34,211,238,0) 65%)"],
  meshC: ["radial-gradient(circle, rgba(221,214,254,.70) 0%, rgba(221,214,254,0) 65%)", "radial-gradient(circle, rgba(167,139,250,.24) 0%, rgba(167,139,250,0) 65%)"],
  glass: ["rgba(255,255,255,.55)", "rgba(255,255,255,.05)"],
  glassStrong: ["rgba(255,255,255,.82)", "rgba(15,19,28,.78)"],
  glassLine: ["rgba(12,10,9,.08)", "rgba(255,255,255,.10)"],
  floatShadow: ["0 20px 50px rgba(30,58,138,.12)", "0 20px 50px rgba(0,0,0,.45)"],
  softShadow: ["0 1px 2px rgba(12,10,9,.03), 0 12px 32px rgba(30,58,138,.06)", "none"],
  // Inline `dark ? a : b` values in the design, made tokens.
  done: ["#059669", "#34D399"],
  doneFg: ["#FFFFFF", "#07090F"],
  hotBg: ["#FEF2F2", "rgba(239,68,68,.08)"],
  hotBorder: ["#FECACA", "rgba(239,68,68,.35)"],
  amberBg: ["#FFFBEB", "rgba(245,158,11,.16)"],
  redBg: ["#FEF2F2", "rgba(239,68,68,.16)"],
  panelMembers: [wash("#C7D2FE", "#FBCFE8", "#EEF0FB"), wash("rgba(99,102,241,.45)", "rgba(236,72,153,.26)", "#0D111E")],
  panelOrion: [wash("#A7F3D0", "#BFDBFE", "#ECF7F2"), wash("rgba(16,185,129,.40)", "rgba(59,130,246,.24)", "#0A1411")],
  panelCompliance: [wash("#FED7AA", "#FECACA", "#FBF3EA"), wash("rgba(249,115,22,.38)", "rgba(239,68,68,.22)", "#160F0A")],
  panelVoice: [wash("#DDD6FE", "#BAE6FD", "#F1EEF9"), wash("rgba(139,92,246,.42)", "rgba(14,165,233,.24)", "#0E0C19")],
});

export const t = theme.t;

export const homeCss =
  theme.css +
  `.gc-home a{color:inherit;text-decoration:none}` +
  `.gc-home a:hover{opacity:.75}` +
  `.gc-home button{font:inherit;cursor:pointer}` +
  `@media (max-width:860px){.gc-home .gc-hide-sm{display:none}}` +
  `@keyframes gcDrift{0%{transform:translate(0,0)}50%{transform:translate(40px,-24px)}100%{transform:translate(0,0)}}` +
  `@keyframes gcBar{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}`;

export const mono = "'JetBrains Mono', monospace";
