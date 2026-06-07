import { useEffect, useRef } from "react";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

interface Connector {
  name: string;
  file: string;
}

const RING_CHANNELS: Connector[] = [
  { name: "WhatsApp", file: "whatsapp.svg" },
  { name: "Slack", file: "slack.svg" },
  { name: "MS Teams", file: "teams.svg" },
  { name: "Gmail", file: "gmail.svg" },
  { name: "Outlook", file: "outlook_mail.svg" },
  { name: "Intercom", file: "intercom.svg" },
  { name: "Zoom", file: "zoom.svg" },
];

const RING_CMS: Connector[] = [
  { name: "ServiceNow", file: "servicenow.svg" },
  { name: "Salesforce", file: "salesforce.svg" },
  { name: "HubSpot", file: "hubspot.svg" },
  { name: "Zendesk", file: "zendesk.svg" },
  { name: "Freshdesk", file: "freshdesk.svg" },
  { name: "Zoho CRM", file: "zoho_crm.svg" },
  { name: "Jira", file: "jira.svg" },
  { name: "Linear", file: "linear.svg" },
  { name: "Monday", file: "monday.svg" },
  { name: "Asana", file: "asana.svg" },
  { name: "Calendly", file: "calendly.svg" },
  { name: "Stripe", file: "stripe.svg" },
];

const RING_KNOWLEDGE: Connector[] = [
  { name: "SharePoint", file: "sharepoint.svg" },
  { name: "Google Drive", file: "google_drive.svg" },
  { name: "Dropbox", file: "dropbox.svg" },
  { name: "Box", file: "box.svg" },
  { name: "OneDrive", file: "onedrive.svg" },
  { name: "Notion", file: "notion.svg" },
  { name: "Confluence", file: "confluence.svg" },
  { name: "Document360", file: "document360.svg" },
  { name: "Google Docs", file: "google_docs.svg" },
  { name: "Word", file: "word.svg" },
  { name: "GitHub", file: "github.svg" },
  { name: "Oracle", file: "oracle.svg" },
  { name: "MySQL", file: "mysql.svg" },
  { name: "Elastic", file: "elasticsearch.svg" },
  { name: "Mailchimp", file: "mailchimp.svg" },
  { name: "Shopify", file: "shopify.svg" },
  { name: "Facebook", file: "facebook.svg" },
];

function polar(angleDeg: number, radiusPct: number) {
  const a = (angleDeg - 90) * (Math.PI / 180);
  return {
    left: `${50 + Math.cos(a) * radiusPct}%`,
    top: `${50 + Math.sin(a) * radiusPct}%`,
  };
}

function IconNode({
  c,
  pos,
  sizeClass,
  hue,
  counterAnim,
}: {
  c: Connector;
  pos: { left: string; top: string };
  sizeClass: string;
  hue: string;
  counterAnim: string;
}) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={pos}
    >
      <div data-node>
        <div style={{ animation: counterAnim }} className="motion-reduce:!animate-none">
          <div
            className={`group relative flex items-center justify-center rounded-full bg-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/[0.08] ${sizeClass}`}
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: `0 4px 16px -4px ${hue}33`,
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle, ${hue}55 0%, transparent 70%)`,
                filter: "blur(8px)",
              }}
            />
            <img
              src={`/connectors/${c.file}`}
              alt={c.name}
              loading="lazy"
              decoding="async"
              className="relative h-[60%] w-[60%] object-contain"
            />
            <div className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/15 bg-ink-950/90 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white opacity-0 shadow-lg backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
              {c.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Ring rotation timings — noticeable but calm, opposing directions for depth
const ANIM_INNER_RING = "gc-orbit 30s linear infinite";
const ANIM_INNER_COUNTER = "gc-orbit 30s linear infinite reverse";
const ANIM_MIDDLE_RING = "gc-orbit 45s linear infinite reverse";
const ANIM_MIDDLE_COUNTER = "gc-orbit 45s linear infinite";
const ANIM_OUTER_RING = "gc-orbit 60s linear infinite";
const ANIM_OUTER_COUNTER = "gc-orbit 60s linear infinite reverse";

export default function ConnectorConstellation() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      const nodes = root.querySelectorAll<HTMLElement>("[data-node]");
      gsap.from(nodes, {
        opacity: 0,
        scale: 0.4,
        duration: 0.8,
        ease: "back.out(1.6)",
        stagger: { each: 0.012, from: "center" },
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative mx-auto aspect-square w-full max-w-[760px]"
      style={{
        perspective: "1400px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* 3D tilted disc — wraps everything below */}
      <div
        className="absolute inset-0"
        style={{
          transform: "rotateX(14deg)",
          transformStyle: "preserve-3d",
        }}
      >
      {/* Radial lines + center bloom under everything */}
      <svg
        viewBox="0 0 760 760"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <radialGradient id="ring-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(13,153,255,0.5)" />
            <stop offset="40%" stopColor="rgba(124,58,237,0.2)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <linearGradient id="radial-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(125,196,255,0.9)" />
            <stop offset="100%" stopColor="rgba(125,196,255,0)" />
          </linearGradient>
          {/* Pulse particle gradient */}
          <radialGradient id="pulse-dot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7dc4ff" />
            <stop offset="60%" stopColor="rgba(125,196,255,0.5)" />
            <stop offset="100%" stopColor="rgba(125,196,255,0)" />
          </radialGradient>
        </defs>
        {/* Center bloom */}
        <circle cx="380" cy="380" r="320" fill="url(#ring-glow)" opacity="0.85" />
        {/* Concentric guide rings — brighter */}
        {[
          { r: 140, opacity: 0.18, dash: "0" },
          { r: 240, opacity: 0.14, dash: "3 7" },
          { r: 340, opacity: 0.1, dash: "0" },
        ].map((ring, i) => (
          <circle
            key={i}
            cx="380"
            cy="380"
            r={ring.r}
            fill="none"
            stroke={`rgba(125,196,255,${ring.opacity})`}
            strokeWidth="1.2"
            strokeDasharray={ring.dash}
          />
        ))}
        {/* Traveling pulse particles — invisible paths, dots stream outward like data signals */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const x = 380 + Math.cos(angle) * 360;
          const y = 380 + Math.sin(angle) * 360;
          const spokePath = `M 380 380 L ${x} ${y}`;
          return (
            <circle key={`pulse-${i}`} r="3.5" fill="url(#pulse-dot)">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                begin={`${(i * 0.33) % 4}s`}
                path={spokePath}
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.2;0.8;1"
                dur="4s"
                repeatCount="indefinite"
                begin={`${(i * 0.33) % 4}s`}
              />
            </circle>
          );
        })}
      </svg>

      {/* Ring 1 — channels, rotates clockwise slow */}
      <div
        className="absolute inset-0 motion-reduce:!animate-none"
        style={{ animation: ANIM_INNER_RING }}
      >
        <div className="h-full w-full">
          {RING_CHANNELS.map((c, i) => {
            const angle = (i / RING_CHANNELS.length) * 360;
            return (
              <IconNode
                key={`ch-${c.name}`}
                c={c}
                pos={polar(angle, 24)}
                sizeClass="h-9 w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12"
                hue="#0d99ff"
                counterAnim={ANIM_INNER_COUNTER}
              />
            );
          })}
        </div>
      </div>

      {/* Ring 2 — cms, rotates counter-clockwise slower */}
      <div
        className="absolute inset-0 motion-reduce:!animate-none"
        style={{ animation: ANIM_MIDDLE_RING }}
      >
        <div className="h-full w-full">
          {RING_CMS.map((c, i) => {
            const angle = (i / RING_CMS.length) * 360 + 15;
            return (
              <IconNode
                key={`cms-${c.name}`}
                c={c}
                pos={polar(angle, 35.5)}
                sizeClass="h-8 w-8 sm:h-10 sm:w-10 lg:h-[42px] lg:w-[42px]"
                hue="#7c3aed"
                counterAnim={ANIM_MIDDLE_COUNTER}
              />
            );
          })}
        </div>
      </div>

      {/* Ring 3 — knowledge, rotates clockwise slowest */}
      <div
        className="absolute inset-0 motion-reduce:!animate-none"
        style={{ animation: ANIM_OUTER_RING }}
      >
        <div className="h-full w-full">
          {RING_KNOWLEDGE.map((c, i) => {
            const angle = (i / RING_KNOWLEDGE.length) * 360 + 11;
            return (
              <IconNode
                key={`kn-${c.name}`}
                c={c}
                pos={polar(angle, 46)}
                sizeClass="h-7 w-7 sm:h-9 sm:w-9 lg:h-[38px] lg:w-[38px]"
                hue="#10b981"
                counterAnim={ANIM_OUTER_COUNTER}
              />
            );
          })}
        </div>
      </div>

      </div>{/* /tilted-disc wrapper */}

      {/* Center: Gooclaim OS — sits flat above the tilted disc */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div
          className="relative flex h-[100px] w-[100px] flex-col items-center justify-center rounded-full sm:h-[140px] sm:w-[140px] lg:h-[180px] lg:w-[180px]"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(13,153,255,0.28) 0%, rgba(124,58,237,0.14) 50%, rgba(7,10,18,0.7) 100%)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow:
              "0 0 0 1px rgba(125,196,255,0.18), 0 18px 80px -10px rgba(13,153,255,0.55)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-3 rounded-full border border-white/8 animate-pulse-soft"
          />
          <div
            aria-hidden
            className="absolute inset-6 rounded-full border border-white/[0.06]"
          />
          {/* Logo */}
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative h-9 w-9 drop-shadow-[0_4px_18px_rgba(13,153,255,0.55)] sm:h-12 sm:w-12 lg:h-[58px] lg:w-[58px]"
            aria-hidden
          >
            <path
              d="M24.1475 3.93139C16.8544 3.36 9.71321 6.55027 7.05426 8.21683V24.8484C6.80653 28.8788 9.7 38.3884 23.2557 44.1839C27.2524 42.7384 35.979 37.7353 38.9121 29.2869L33.1636 28.4706C30.9926 33.5505 26.1424 36.5937 23.2557 37.7557C14.3771 33.756 12.3226 27.2462 12.4052 24.4913V11.5329C17.0427 9.69632 22.1657 9.27118 24.1475 9.28819V3.93139Z"
              fill="url(#gc-core-grad)"
            />
            <path
              d="M22.412 28.7601L34.5341 15.3426V20V23.0972H38.6135L38.9603 15.3426L39.0005 9C36.979 7.2042 30.6264 5.47616 28.0005 5L28.0107 9.37362C29.6953 9.73074 32.668 10.7001 33.0148 10.8531C33.2923 10.9756 33.2956 11.0742 33.2626 11.1082C29.943 14.5604 23.2444 21.5565 23.0066 21.9238C22.7688 22.2912 22.5111 22.2469 22.412 22.1789C21.3386 21.0055 19.1024 18.5771 18.7457 18.2506C18.3889 17.9241 18.0355 18.0805 17.9034 18.1996C17.2758 18.8458 15.9315 20.2403 15.5747 20.6484C15.218 21.0565 15.3931 21.5327 15.5252 21.7198L22.2139 28.7601H22.412Z"
              fill="#00BBFF"
              stroke="#00BBFF"
              strokeWidth="0.6"
            />
            <defs>
              <linearGradient
                id="gc-core-grad"
                x1="22.9761"
                y1="3.86377"
                x2="22.9761"
                y2="44.1839"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#00BBFF" />
                <stop offset="1" stopColor="#3F9CF4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
