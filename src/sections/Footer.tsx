import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Wordmark from "@/components/Wordmark";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      "Channel Gateway",
      "Workflow Engine",
      "Truth Layer",
      "Knowledge Layer",
      "Policy Gate",
      "Audit Ledger",
    ],
  },
  {
    title: "Use cases",
    links: ["TPAs", "Insurers", "Hospitals", "Health", "Life", "Motor"],
  },
  {
    title: "Resources",
    links: ["How it works", "Architecture", "Compliance", "Pricing"],
  },
  {
    title: "Contact",
    links: [
      "contact@gooclaim.com",
      "security@gooclaim.com",
      "Book a demo",
      "LinkedIn",
    ],
  },
];

const LINK_ROUTES: Record<string, string> = {
  Compliance: "/compliance",
  Privacy: "/privacy",
  Terms: "/terms",
  Pricing: "/pricing",
  "Book a demo": "/demo",
  TPAs: "/use-cases/tpas",
  Insurers: "/use-cases/insurers",
  Hospitals: "/use-cases/hospitals",
  Health: "/use-cases/health",
  Life: "/use-cases/life",
  Motor: "/use-cases/motor",
  "Channel Gateway": "/platform/channel-gateway",
  "Workflow Engine": "/platform/workflow-engine",
  "Truth Layer": "/platform/truth-layer",
  "Knowledge Layer": "/platform/knowledge-layer",
  "Policy Gate": "/platform/policy-gate",
  "Audit Ledger": "/platform/audit-ledger",
};

const LINK_MAILTOS: Record<string, string> = {
  "contact@gooclaim.com": "mailto:contact@gooclaim.com",
  "security@gooclaim.com": "mailto:security@gooclaim.com",
};

const LINK_EXTERNAL: Record<string, string> = {
  LinkedIn: "https://www.linkedin.com/in/kumar-mayank-392381168/",
};

const BADGES = [
  { label: "IRDAI 3-hour TAT", hue: "#0d99ff" },
  { label: "DPDP consent gate", hue: "#10b981" },
  { label: "Immutable audit ledger · SHA-256", hue: "#f59e0b" },
];

function Shield({ color }: { color: string }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink-950">
      {/* Top hairline */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(125,196,255,0.25) 50%, transparent 100%)",
        }}
      />
      {/* Bottom bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -bottom-44 h-[360px] w-[1100px] max-w-[120vw] -translate-x-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 100%, rgba(13,153,255,0.12) 0%, rgba(124,58,237,0.06) 50%, transparent 75%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1280px] px-6 pb-12 pt-20 sm:px-10 sm:pb-14 sm:pt-24 lg:px-14">
        <motion.div
          variants={stagger(0.05, 0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.2fr] lg:gap-10"
        >
          {/* Brand block */}
          <motion.div variants={fadeUp} className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Wordmark size={24} />
            <p className="mt-5 max-w-[300px] text-[14px] leading-relaxed text-white/60">
              India&rsquo;s first fully agentic Claims Operating System — for TPAs
              and Insurers.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              <a
                href="https://www.linkedin.com/in/kumar-mayank-392381168/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="glass flex h-9 w-9 items-center justify-center rounded-lg text-white/75 transition-colors hover:text-white hover:border-white/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.45 20.45h-3.55v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
                </svg>
              </a>
              <a
                href="mailto:contact@gooclaim.com"
                aria-label="Email"
                className="glass flex h-9 w-9 items-center justify-center rounded-lg text-white/75 transition-colors hover:text-white hover:border-white/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </a>
            </div>
            <div className="mt-5 font-mono text-[11px] uppercase tracking-wider2 text-white/45">
              Bengaluru · India
            </div>
          </motion.div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <motion.div key={col.title} variants={fadeUp}>
              <div className="mb-4 font-mono text-[11px] uppercase tracking-wider2 text-white/45">
                {col.title}
              </div>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => {
                  const route = LINK_ROUTES[link];
                  const mailto = LINK_MAILTOS[link];
                  const external = LINK_EXTERNAL[link];
                  const cls =
                    "text-[13.5px] text-white/65 transition-colors hover:text-white";
                  return (
                    <li key={link}>
                      {route ? (
                        <Link to={route} className={cls}>
                          {link}
                        </Link>
                      ) : mailto ? (
                        <a href={mailto} className={cls}>
                          {link}
                        </a>
                      ) : external ? (
                        <a
                          href={external}
                          target="_blank"
                          rel="noreferrer"
                          className={cls}
                        >
                          {link}
                        </a>
                      ) : (
                        <a href="#" className={cls}>
                          {link}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Compliance badge row */}
        <motion.div
          variants={stagger(0.08, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 flex flex-wrap items-center gap-2.5"
        >
          {BADGES.map((b) => (
            <motion.div
              key={b.label}
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[12px] text-white/70 glass"
            >
              <Shield color={b.hue} /> {b.label}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/8 pt-7 text-[13px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Gooclaim. All rights reserved.</div>
          <div className="font-display text-[14px] font-medium tracking-tight text-white/70">
            Agentic brain. Compliant mouth.{" "}
            <span className="text-white">Made in India.</span>
          </div>
          <div className="flex gap-5 text-[12.5px]">
            <Link to="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
