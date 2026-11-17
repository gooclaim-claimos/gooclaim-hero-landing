import { Link } from "react-router-dom";
import { makeTheme } from "@/theme/theme";
import { ThemeStyle } from "@/theme/ThemeProvider";
import Logo from "./Logo";

const { t, css } = makeTheme("foot", {
  bg: ["#FAFAF9", "#07090F"],
  border: ["#E7E5E4", "#232A38"],
  text: ["#0C0A09", "#F5F5F4"],
  text2: ["#57534E", "#A8A29E"],
  text3: ["#78716C", "#8C8783"],
  btnBg: ["#0C0A09", "#F5F5F4"],
  btnText: ["#FAFAF9", "#0C0A09"],
});

const LINKEDIN = "https://www.linkedin.com/in/kumar-mayank-392381168/";

interface FooterLink {
  label: string;
  href: string;
}

const COLS: { title: string; links: FooterLink[] }[] = [
  { title: "PRODUCT", links: [{ label: "Platform overview", href: "/platform" }, { label: "Orion", href: "/orion" }, { label: "Try it live", href: "/try" }, { label: "Audit Ledger", href: "/platform/audit-ledger" }] },
  { title: "SOLUTIONS", links: [{ label: "TPAs", href: "/solutions/tpas" }, { label: "Insurers", href: "/solutions/insurers" }, { label: "Hospitals", href: "/solutions/hospitals" }, { label: "Health", href: "/solutions/health" }] },
  { title: "RESOURCES", links: [{ label: "Security", href: "/security" }, { label: "Pricing", href: "/pricing" }, { label: "Gooclaim OS in India", href: "/in" }, { label: "Compliance in India", href: "/compliance" }] },
  { title: "CONTACT", links: [{ label: "contact@gooclaim.com", href: "mailto:contact@gooclaim.com" }, { label: "security@gooclaim.com", href: "mailto:security@gooclaim.com" }, { label: "LinkedIn", href: LINKEDIN }] },
];

const mono = "'JetBrains Mono', monospace";

function FooterAnchor({ link }: { link: FooterLink }) {
  const style = { color: t.text2, textDecoration: "none" };
  if (link.href.startsWith("/")) return <Link to={link.href} style={style}>{link.label}</Link>;
  const external = link.href.startsWith("http");
  return (
    <a href={link.href} style={style} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {link.label}
    </a>
  );
}

export default function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${t.border}`, background: t.bg, color: t.text, fontFamily: "Inter, system-ui, sans-serif" }}>
      <ThemeStyle css={css} />
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "64px 24px 32px", display: "flex", flexWrap: "wrap", gap: 48 }}>
        <div style={{ flex: "1 1 260px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600, fontSize: 18, letterSpacing: "-0.02em" }}>
            <Logo size={24} />
            Gooclaim OS
          </div>
          <div style={{ marginTop: 10, fontSize: 14, color: t.text2 }}>The Claim OS for TPAs and insurers.</div>
          <div style={{ marginTop: 16, fontFamily: mono, fontSize: 12, color: t.text3 }}>BENGALURU · INDIA</div>
          <Link to="/try" style={{ display: "inline-block", marginTop: 20, padding: "10px 18px", borderRadius: 999, background: t.btnBg, color: t.btnText, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
            Try it live
          </Link>
        </div>
        {COLS.map((c) => (
          <div key={c.title} style={{ flex: "0 1 170px", display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", color: t.text3, marginBottom: 4 }}>{c.title}</div>
            {c.links.map((l) => (
              <FooterAnchor key={l.label} link={l} />
            ))}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "20px 24px 36px", borderTop: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", fontSize: 13, color: t.text3 }}>
        <span>
          © 2026 Gooclaim. All rights reserved. ·{" "}
          <Link to="/privacy" style={{ color: t.text3 }}>Privacy</Link> ·{" "}
          <Link to="/terms" style={{ color: t.text3 }}>Terms</Link>
        </span>
        <span>Regulator clocks on every claim · Consent before a word · Immutable audit ledger</span>
        <span>Agentic brain. Compliant mouth. Made in India.</span>
      </div>
    </footer>
  );
}
