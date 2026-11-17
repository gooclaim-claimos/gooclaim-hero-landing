import { Link } from "react-router-dom";
import { openWaitlist } from "@/lib/waitlist";

interface Props {
  /** The band's background token (dark in both themes). */
  bg: string;
  title: string;
  sub: string;
  source: string;
  secondary: { label: string; to: string };
}

/** The closing band on Platform and Orion: always dark, light text. */
export default function CtaBand({ bg, title, sub, source, secondary }: Props) {
  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(48px, 6.67vw, 96px) 24px clamp(56px, 7.78vw, 112px)" }}>
      <div style={{ borderRadius: 28, padding: "clamp(36px, 6vw, 72px)", background: bg, color: "#FAFAF9", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "clamp(28px, 3.6vw, 44px)", fontWeight: 600, letterSpacing: "-0.04em" }}>{title}</h2>
          <p style={{ margin: "10px 0 0", color: "#D6D3D1" }}>{sub}</p>
        </div>
        <div className="gc-cta-row" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button type="button" onClick={() => openWaitlist(source)} style={{ padding: "14px 26px", borderRadius: 999, border: "none", background: "#FAFAF9", color: "#0C0A09", font: "inherit", fontWeight: 500, cursor: "pointer" }}>
            Book a walkthrough
          </button>
          <Link to={secondary.to} style={{ padding: "14px 26px", borderRadius: 999, border: "1px solid rgba(250,250,249,.3)", fontWeight: 500, color: "inherit", textDecoration: "none" }}>
            {secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
