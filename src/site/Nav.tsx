import { Link, useLocation } from "react-router-dom";
import { makeTheme } from "@/theme/theme";
import { ThemeStyle, useTheme } from "@/theme/ThemeProvider";
import { openWaitlist } from "@/lib/waitlist";
import Logo from "./Logo";

const { t, css } = makeTheme("nav", {
  navBg: ["rgba(250,250,249,.85)", "rgba(7,9,15,.8)"],
  border: ["#E7E5E4", "#232A38"],
  surface: ["#FFFFFF", "#0F131C"],
  text: ["#0C0A09", "#F5F5F4"],
  text2: ["#57534E", "#A8A29E"],
  text3: ["#78716C", "#8C8783"],
  btnBg: ["#0C0A09", "#F5F5F4"],
  btnText: ["#FAFAF9", "#0C0A09"],
  brand: ["#1D4ED8", "#60A5FA"],
  brandSoft: ["#EEF3FF", "rgba(96,165,250,.12)"],
  brandLine: ["#C7D7FE", "rgba(96,165,250,.35)"],
  activeBg: ["#F0EFED", "#151A25"],
});

const LINKS = [
  { label: "Platform", to: "/platform" },
  { label: "Orion", to: "/orion" },
  { label: "Solutions", to: "/solutions/tpas", match: "/solutions" },
  { label: "Security", to: "/security" },
  { label: "Pricing", to: "/pricing" },
];

export default function Nav() {
  const { pathname } = useLocation();
  const { dark, toggle } = useTheme();

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 30, background: t.navBg, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: `1px solid ${t.border}`, color: t.text, fontFamily: "Inter, system-ui, sans-serif" }}>
      <ThemeStyle css={css} />
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600, fontSize: 18, letterSpacing: "-0.02em", color: t.text, textDecoration: "none" }}>
          <Logo size={26} />
          <span>
            Gooclaim<span style={{ color: t.text3, fontWeight: 500 }}> OS</span>
          </span>
        </Link>
        <nav aria-label="Main" style={{ display: "flex", gap: 4, fontSize: 14, flex: 1, flexWrap: "wrap" }}>
          {LINKS.map((l) => {
            const active = pathname.startsWith(l.match ?? l.to);
            return (
              <Link key={l.to} to={l.to} aria-current={active ? "page" : undefined} style={{ padding: "8px 12px", borderRadius: 999, textDecoration: "none", color: active ? t.text : t.text2, background: active ? t.activeBg : "transparent", fontWeight: active ? 600 : 500 }}>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <Link to="/try" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 14px", borderRadius: 999, border: `1px solid ${t.brandLine}`, background: t.brandSoft, color: t.brand, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: t.brand }} />
            Try it live
          </Link>
          <button type="button" onClick={toggle} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} style={{ width: 40, height: 40, borderRadius: 999, border: `1px solid ${t.border}`, background: t.surface, color: t.text, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg className="only-dark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
            <svg className="only-light" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
            </svg>
          </button>
          <button type="button" onClick={() => openWaitlist("nav-walkthrough")} style={{ padding: "10px 16px", borderRadius: 999, border: "none", background: t.btnBg, color: t.btnText, font: "inherit", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
            Book a walkthrough
          </button>
        </div>
      </div>
    </header>
  );
}
