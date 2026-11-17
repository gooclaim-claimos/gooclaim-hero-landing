import { makeTheme } from "@/theme/theme";

export const tryTheme = makeTheme("try", {
  bg: ["#FAFAF9", "#07090F"],
  surface: ["#FFFFFF", "#0F131C"],
  surface2: ["#F2F1EF", "#151A25"],
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
  dot: ["rgba(12,10,9,.13)", "rgba(255,255,255,.10)"],
  chatBg: ["#F7F6F4", "#0B0F17"],
  callBg: ["#0C0F16", "#0B0F17"],
  cardShadow: ["0 24px 64px rgba(30,58,138,.14)", "0 30px 80px rgba(0,0,0,.55)"],
  meBg: ["#0C0A09", "#F5F5F4"],
  meText: ["#FAFAF9", "#0C0A09"],
  tabShadow: ["0 1px 2px rgba(0,0,0,.06), 0 4px 14px rgba(0,0,0,.06)", "0 6px 18px rgba(0,0,0,.4)"],
  panel: [
    "radial-gradient(70% 80% at 15% 10%, #DBE6FE 0%, rgba(0,0,0,0) 60%), radial-gradient(60% 70% at 90% 95%, #CFF5FB 0%, rgba(0,0,0,0) 60%), #EEF2F7",
    "radial-gradient(70% 80% at 15% 10%, rgba(59,130,246,.30) 0%, rgba(0,0,0,0) 60%), radial-gradient(60% 70% at 90% 95%, rgba(34,211,238,.18) 0%, rgba(0,0,0,0) 60%), #0B0F19",
  ],
});

export const TRY_CSS = `${tryTheme.css}
@keyframes gcwave{0%,100%{transform:scaleY(.22)}50%{transform:scaleY(1)}}
@keyframes gcpulse{0%{box-shadow:0 0 0 0 rgba(37,99,235,.35)}100%{box-shadow:0 0 0 22px rgba(37,99,235,0)}}`;

export const mono = "'JetBrains Mono', monospace";

/** A segmented-control option: raised when on. */
export function segment(on: boolean) {
  const t = tryTheme.t;
  return { background: on ? t.surface : "transparent", color: on ? t.text : t.text2, boxShadow: on ? t.tabShadow : "none" };
}

export const PHONE_PATH = "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z";
