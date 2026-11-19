import type { CSSProperties, ReactNode } from "react";
import { mono, t } from "./theme";

/**
 * The hero's Claim OS diagram: the channels people reach a tenant on, flowing
 * into Gooclaim OS, which works with the tenant's own side, while one claim
 * moves along its steps underneath. Wide screens get the full picture behind
 * the copy; tablets and phones get the same parts stacked below it.
 *
 * App marks are the real files in public/connectors/ (see data/connectors.ts);
 * a part with no app behind it (voice, the claim system, the ledger) keeps a
 * line icon.
 */

const ICON = {
  voice: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  cms: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6",
  ledger: "M9 4h6v3H9zM7 5.5H5V21h14V5.5h-2M8.5 13.5l2.5 2.5 4.5-5",
  sms: "M5 5h14v10H10l-5 4z",
  bell: "M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20a2 2 0 0 0 4 0",
  plus: "M12 5v14M5 12h14",
};

const Icon = ({ d, size }: { d: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const Mark = ({ src, size }: { src: string; size: number }) => <img src={src} alt="" width={size} height={size} loading="lazy" decoding="async" style={{ width: size, height: size, flex: "none" }} />;
const app = (id: string, size: number) => <Mark src={`/connectors/${id}.svg`} size={size} />;
const GOOCLAIM = "/logo-gooclaim.svg";

interface Part {
  label: string;
  sub?: string;
  tint: string;
  soft: string;
  mark: ReactNode;
}

const REACH: Part[] = [
  { label: "Email", tint: t.osBlue, soft: t.osBlueSoft, mark: <span style={{ display: "flex", gap: 2 }}>{app("gmail", 17)}{app("outlook_mail", 17)}</span> },
  { label: "WhatsApp", tint: t.osGreen, soft: t.greenSoft, mark: app("whatsapp", 22) },
  { label: "Voice calls", tint: t.violet, soft: t.violetSoft, mark: <Icon d={ICON.voice} size={19} /> },
];

const YOUR_SIDE: Part[] = [
  { label: "Your claim system", sub: "Answers from your records", tint: t.osCyan, soft: t.osCyanSoft, mark: <Icon d={ICON.cms} size={19} /> },
  { label: "Orion", sub: "Your team’s AI coworker", tint: t.osBlue, soft: t.osBlueSoft, mark: <Mark src={GOOCLAIM} size={24} /> },
  { label: "Audit ledger", sub: "Every step on record", tint: t.osGreen, soft: t.greenSoft, mark: <Icon d={ICON.ledger} size={19} /> },
];

/** Wide screens only: the tools around the edges, [x, y] on the 1440 × 1040 stage. */
const FLOATS: { x: number; y: number; label: string; mark: ReactNode; faint?: boolean }[] = [
  { x: 150, y: 150, label: "Slack", mark: app("slack", 16) },
  { x: 100, y: 262, label: "SMS · next", mark: <Icon d={ICON.sms} size={15} />, faint: true },
  { x: 196, y: 366, label: "Microsoft Teams", mark: app("teams", 16) },
  { x: 1290, y: 150, label: "Email alerts", mark: <Icon d={ICON.bell} size={15} /> },
  { x: 1326, y: 262, label: "SharePoint", mark: app("sharepoint", 16), faint: true },
  { x: 1244, y: 366, label: "More connectors", mark: <Icon d={ICON.plus} size={15} /> },
];

const STEPS = ["Claim opened", "Documents", "Approval", "Payment", "Closed"];

const SUMMARY = "Email, WhatsApp and voice calls come into Gooclaim OS, which works with your claim system, Orion and the audit ledger while each claim moves from opened to closed.";

// Stage geometry, in the 1440 × 1040 viewBox the wires are drawn in.
const LX = 290;
const RX = 1130;
const ROWS = [530, 614, 698];
const CORE_Y = 850;
const pct = (x: number) => `${((x / 1440) * 100).toFixed(2)}%`;

// One beam at a time: a channel comes in, then something goes out to the tenant's side.
const WIRES = [
  ...ROWS.map((y, i) => ({ d: `M${LX},${y} C520,${y} 580,${770 + i * 26} 664,${CORE_Y}`, c: REACH[i].tint, delay: `${i * 4}s` })),
  ...ROWS.map((y, i) => ({ d: `M776,${CORE_Y} C860,${770 + i * 26} 920,${y} ${RX},${y}`, c: YOUR_SIDE[i].tint, delay: `${i * 4 + 1.7}s` })),
];

export const heroSystemCss =
  `@keyframes gcOsBeam{0%{stroke-dashoffset:16;opacity:0}1.5%{opacity:1}12%{stroke-dashoffset:-86;opacity:1}14%{stroke-dashoffset:-90;opacity:0}100%{stroke-dashoffset:-90;opacity:0}}` +
  `@keyframes gcOsSpin{to{transform:translate(-50%,-50%) rotate(360deg)}}` +
  `@keyframes gcOsBreathe{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.035)}}` +
  `@keyframes gcOsTravel{0%{transform:translateX(0)}14%,22%{transform:translateX(25%)}36%,44%{transform:translateX(50%)}58%,66%{transform:translateX(75%)}80%,100%{transform:translateX(100%)}}` +
  `@keyframes gcOsFill{0%{transform:scaleX(0)}14%,22%{transform:scaleX(.25)}36%,44%{transform:scaleX(.5)}58%,66%{transform:scaleX(.75)}80%,100%{transform:scaleX(1)}}` +
  `@keyframes gcOsDrift{0%,100%{transform:translate(-50%,-50%)}50%{transform:translate(-50%,calc(-50% - 8px))}}` +
  `@keyframes gcOsDown{0%{top:-14px;opacity:0}20%,80%{opacity:1}100%{top:100%;opacity:0}}` +
  `.gc-os-beam{animation:gcOsBeam 12s cubic-bezier(.4,0,.2,1) infinite;opacity:0}` +
  `.gc-os-aura{animation:gcOsSpin 18s linear infinite}` +
  `.gc-os-core{animation:gcOsBreathe 4s cubic-bezier(.4,0,.2,1) infinite}` +
  `.gc-os-travel{animation:gcOsTravel 16s cubic-bezier(.4,0,.2,1) infinite}` +
  `.gc-os-fill{animation:gcOsFill 16s cubic-bezier(.4,0,.2,1) infinite;transform-origin:left center}` +
  `.gc-os-drift{animation:gcOsDrift 7s cubic-bezier(.4,0,.2,1) infinite}` +
  `.gc-os-down{animation:gcOsDown 2.4s cubic-bezier(.4,0,.2,1) infinite}` +
  `@media (min-width:1180px){.gc-os{height:1040px}.gc-os-compact{display:none!important}}` +
  `@media (max-width:1179px){.gc-os-wide{display:none!important}.gc-os-label{white-space:normal!important;width:76px;text-align:center;font-size:12px!important;line-height:1.3}}` +
  `@media (prefers-reduced-motion:reduce){.gc-os-beam,.gc-os-aura,.gc-os-core,.gc-os-travel,.gc-os-fill,.gc-os-drift,.gc-os-down{animation:none!important}.gc-os-fill{transform:scaleX(1)}.gc-os-travel{transform:translateX(100%)}}`;

const caption: CSSProperties = { fontFamily: mono, fontSize: 10.5, letterSpacing: ".1em", color: t.text3 };

function Chip({ part, style }: { part: Part; style?: CSSProperties }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, minHeight: 58, padding: "8px 18px 8px 10px", borderRadius: 18, background: t.surface, border: `1px solid ${t.border}`, boxShadow: t.osFloat, whiteSpace: "nowrap", textAlign: "left", ...style }}>
      <span style={{ flex: "none", width: 40, height: 40, borderRadius: 12, background: part.soft, color: part.tint, display: "flex", alignItems: "center", justifyContent: "center" }}>{part.mark}</span>
      <span style={{ lineHeight: 1.3 }}>
        <span style={{ display: "block", fontSize: 15, fontWeight: 600 }}>{part.label}</span>
        {part.sub && <span style={{ display: "block", fontSize: 12.5, color: t.text2 }}>{part.sub}</span>}
      </span>
    </div>
  );
}

/** Gooclaim OS itself. `style` places the zero-size anchor its layers centre on. */
function Core({ style }: { style: CSSProperties }) {
  const centred: CSSProperties = { position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" };
  return (
    <div style={style}>
      <span className="gc-os-aura" style={{ ...centred, width: 300, height: 300, borderRadius: 999, background: t.osAura, filter: "blur(46px)", opacity: t.osAuraOp }} />
      <div className="gc-os-core" style={{ ...centred, width: 120, height: 120, padding: 1.5, borderRadius: 32, background: t.osGrad, boxShadow: t.osCoreShadow }}>
        <div style={{ width: "100%", height: "100%", borderRadius: 30.5, background: t.surface, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Mark src={GOOCLAIM} size={50} />
          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".14em", color: t.text2 }}>CLAIM OS</span>
        </div>
      </div>
    </div>
  );
}

/** One claim moving through its steps; every clock watched along the way. */
function Track({ style }: { style: CSSProperties }) {
  return (
    <div style={style}>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 2, borderRadius: 2, background: t.osWire }} />
        <div className="gc-os-fill" style={{ position: "absolute", left: 0, right: 0, top: 0, height: 2, borderRadius: 2, background: t.osGrad }} />
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between" }}>
          {STEPS.map((label) => (
            <div key={label} style={{ width: 0, display: "flex", flexDirection: "column", alignItems: "center", whiteSpace: "nowrap" }}>
              <span style={{ marginTop: -4, width: 10, height: 10, borderRadius: 99, background: t.bg, border: `2px solid ${t.osNode}` }} />
              <span className="gc-os-label" style={{ marginTop: 10, fontSize: 13, fontWeight: 500, color: t.text2 }}>{label}</span>
            </div>
          ))}
        </div>
        <div className="gc-os-travel" style={{ position: "absolute", left: 0, right: 0, top: 0, height: 0 }}>
          <span style={{ position: "absolute", left: -8, top: -7, width: 16, height: 16, borderRadius: 99, background: t.osGrad, boxShadow: `0 0 0 5px ${t.osHalo}, 0 0 18px ${t.brand}` }} />
        </div>
      </div>
      <div style={{ ...caption, marginTop: 14, textAlign: "center" }}>EVERY CLOCK WATCHED · EVERY STEP ON RECORD</div>
    </div>
  );
}

/** Wide screens: the whole picture, laid out on the 1440 × 1040 stage behind the copy. */
export function WideSystem() {
  return (
    <div className="gc-os-wide" role="img" aria-label={SUMMARY} style={{ position: "absolute", inset: 0 }}>
      <svg viewBox="0 0 1440 1040" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {WIRES.map((w) => (
          <g key={w.d}>
            <path d={w.d} fill="none" style={{ stroke: t.osWire }} strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <path className="gc-os-beam" d={w.d} pathLength={100} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="14 86" vectorEffect="non-scaling-stroke" style={{ stroke: w.c, animationDelay: w.delay, filter: `drop-shadow(0 0 6px ${w.c})` }} />
          </g>
        ))}
      </svg>
      <div style={{ ...caption, position: "absolute", left: 0, width: pct(LX), top: 462, textAlign: "right" }}>PEOPLE REACH YOU ON</div>
      <div style={{ ...caption, position: "absolute", left: pct(RX), top: 462 }}>ON YOUR SIDE</div>
      {REACH.map((part, i) => <Chip key={part.label} part={part} style={{ position: "absolute", left: pct(LX), top: ROWS[i], transform: "translate(-100%, -50%)" }} />)}
      {YOUR_SIDE.map((part, i) => <Chip key={part.label} part={part} style={{ position: "absolute", left: pct(RX), top: ROWS[i], transform: "translate(0, -50%)" }} />)}
      {FLOATS.map((f, i) => (
        <div key={f.label} className="gc-os-drift" style={{ position: "absolute", left: pct(f.x), top: f.y, transform: "translate(-50%, -50%)", animationDelay: `${-i * 1.3}s`, display: "flex", alignItems: "center", gap: 8, height: 42, padding: "0 14px 0 6px", borderRadius: 999, background: t.osGlass, border: `1px solid ${t.border}`, boxShadow: t.osFloat, whiteSpace: "nowrap", opacity: f.faint ? 0.85 : 1 }}>
          <span style={{ width: 30, height: 30, borderRadius: 999, background: t.osTile, color: t.text2, display: "flex", alignItems: "center", justifyContent: "center" }}>{f.mark}</span>
          <span style={{ fontSize: 13.5, fontWeight: 500, color: t.text2 }}>{f.label}</span>
        </div>
      ))}
      <Core style={{ position: "absolute", left: "50%", top: CORE_Y, width: 0, height: 0 }} />
      <Track style={{ position: "absolute", left: "50%", top: 962, transform: "translateX(-50%)", width: "min(880px, 84%)" }} />
    </div>
  );
}

/** A short vertical wire with a beam running down it. */
const Drop = ({ tint }: { tint: string }) => (
  <div style={{ position: "relative", width: 2, height: 44, margin: "14px auto", borderRadius: 2, background: t.osWire, overflow: "hidden" }}>
    <span className="gc-os-down" style={{ position: "absolute", left: 0, width: 2, height: 14, borderRadius: 2, background: tint }} />
  </div>
);

// Above the core's glow, which spreads past its own box.
const Row = ({ title, parts }: { title: string; parts: Part[] }) => (
  <div style={{ position: "relative", zIndex: 1 }}>
    <div style={{ ...caption, textAlign: "center", marginBottom: 12 }}>{title}</div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
      {parts.map((part) => <Chip key={part.label} part={part} style={{ minHeight: 52 }} />)}
    </div>
  </div>
);

/** Tablets and phones: the same parts, stacked below the copy. */
export function CompactSystem() {
  return (
    <div className="gc-os-compact" role="img" aria-label={SUMMARY} style={{ position: "relative", maxWidth: 760, margin: "0 auto", padding: "56px 16px 48px" }}>
      <Row title="PEOPLE REACH YOU ON" parts={REACH} />
      <Drop tint={t.osBlue} />
      <Core style={{ position: "relative", width: 120, height: 120, margin: "0 auto" }} />
      <Drop tint={t.osGreen} />
      <Row title="ON YOUR SIDE" parts={YOUR_SIDE} />
      <Track style={{ width: "calc(100% - 64px)", maxWidth: 640, margin: "56px auto 0" }} />
    </div>
  );
}
