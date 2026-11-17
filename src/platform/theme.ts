import type { CSSProperties } from "react";
import { makeTheme } from "@/theme/theme";

export const { t, css } = makeTheme("plat", {
  bg: ["#FAFAF9", "#07090F"],
  surface: ["#FFFFFF", "#0F131C"],
  surface2: ["#F4F3F1", "#0C1018"],
  border: ["#E7E5E4", "#232A38"],
  text: ["#0C0A09", "#F5F5F4"],
  text2: ["#57534E", "#A8A29E"],
  text3: ["#78716C", "#8C8783"],
  btnBg: ["#0C0A09", "#F5F5F4"],
  btnText: ["#FAFAF9", "#0C0A09"],
  brand: ["#1D4ED8", "#60A5FA"],
  brandSoft: ["#EEF3FF", "rgba(96,165,250,.13)"],
  brandLine: ["#C7D7FE", "rgba(96,165,250,.35)"],
  brandGrad: ["linear-gradient(90deg, #1D4ED8 0%, #0891B2 100%)", "linear-gradient(90deg, #60A5FA 0%, #22D3EE 100%)"],
  green: ["#047857", "#34D399"],
  amber: ["#B45309", "#FCD34D"],
  red: ["#B91C1C", "#FCA5A5"],
  dot: ["rgba(12,10,9,.13)", "rgba(255,255,255,.10)"],
  ctaBg: ["#0C0A09", "#0F131C"],
  cardShadow: ["0 24px 64px rgba(30,58,138,.12)", "0 30px 80px rgba(0,0,0,.5)"],
  track: ["#E2E0DD", "#262D3B"],
  numOn: ["#fff", "#07090F"],
  doneDot: ["#059669", "#10B981"],
  panel: [
    "radial-gradient(70% 80% at 15% 10%, #DBE6FE 0%, rgba(0,0,0,0) 60%), radial-gradient(60% 70% at 90% 95%, #CFF5FB 0%, rgba(0,0,0,0) 60%), #EEF2F7",
    "radial-gradient(70% 80% at 15% 10%, rgba(59,130,246,.30) 0%, rgba(0,0,0,0) 60%), radial-gradient(60% 70% at 90% 95%, rgba(34,211,238,.18) 0%, rgba(0,0,0,0) 60%), #0B0F19",
  ],
  panelAmber: [
    "radial-gradient(70% 80% at 10% 10%, #FED7AA 0%, rgba(0,0,0,0) 60%), radial-gradient(60% 70% at 95% 95%, #FECACA 0%, rgba(0,0,0,0) 60%), #FBF3EA",
    "radial-gradient(70% 80% at 10% 10%, rgba(249,115,22,.30) 0%, rgba(0,0,0,0) 60%), radial-gradient(60% 70% at 95% 95%, rgba(239,68,68,.16) 0%, rgba(0,0,0,0) 60%), #140F0B",
  ],
});

export const mono = "'JetBrains Mono', monospace";

/** The small mono section label ("01 · AN OS, NOT A CHATBOT"). */
export const eyebrow: CSSProperties = { fontFamily: mono, fontSize: 12, letterSpacing: ".08em", color: t.text3 };

export const h2Big: CSSProperties = { margin: "14px 0 0", fontSize: "clamp(32px, 4.2vw, 54px)", lineHeight: 1.06, fontWeight: 600, letterSpacing: "-0.04em" };
