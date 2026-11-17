import { type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ThemeStyle } from "@/theme/ThemeProvider";
import SiteLayout from "@/site/SiteLayout";
import { css, mono, t } from "./tokens";

/** SiteLayout plus this palette's variables, on the canvas ground. */
export function LegacyPage({ children }: { children: ReactNode }) {
  return (
    <SiteLayout>
      <ThemeStyle css={css} />
      <div className="lg-scope" style={{ background: t.bg, color: t.text }}>{children}</div>
    </SiteLayout>
  );
}

export function Eyebrow({ children, color, style }: { children: ReactNode; color?: string; style?: CSSProperties }) {
  return (
    <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: color ?? t.brand, ...style }}>
      {children}
    </div>
  );
}

/** The canvas hero: mono eyebrow, big tight heading, glow behind. `accent` takes the brand gradient. */
export function Hero({ eyebrow, title, accent, intro, children, align = "center" }: { eyebrow: ReactNode; title: ReactNode; accent?: ReactNode; intro?: ReactNode; children?: ReactNode; align?: "center" | "left" }) {
  const center = align === "center";
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", width: 700, height: 700, left: "50%", top: -420, marginLeft: -350, borderRadius: 999, background: t.glow, pointerEvents: "none" }} />
      <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "clamp(44px, 6.11vw, 88px) 24px 40px", textAlign: center ? "center" : "left" }}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 style={{ margin: center ? "14px auto 0" : "14px 0 0", fontSize: "clamp(40px, 5.4vw, 72px)", lineHeight: 1.03, fontWeight: 600, letterSpacing: "-0.045em", maxWidth: 920 }}>
          {title}
          {accent ? (
            <>
              {" "}
              <GradientText>{accent}</GradientText>
            </>
          ) : null}
        </h1>
        {intro ? <p style={{ margin: center ? "18px auto 0" : "18px 0 0", fontSize: 18, color: t.text2, maxWidth: 640 }}>{intro}</p> : null}
        {children}
      </div>
    </section>
  );
}

export function GradientText({ children }: { children: ReactNode }) {
  return <span style={{ backgroundImage: t.brandGrad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{children}</span>;
}

/** A page section with an optional eyebrow, a two-tone heading and an intro line. */
export function Section({ id, eyebrow, title, muted, intro, children, narrow }: { id?: string; eyebrow?: ReactNode; title?: ReactNode; muted?: ReactNode; intro?: ReactNode; children?: ReactNode; narrow?: boolean }) {
  return (
    <section id={id} style={{ maxWidth: narrow ? 880 : 1240, margin: "0 auto", padding: "clamp(32px, 4.44vw, 64px) 24px", scrollMarginTop: 80 }}>
      {eyebrow ? <Eyebrow style={{ marginBottom: 12 }}>{eyebrow}</Eyebrow> : null}
      {title ? (
        <h2 style={{ margin: 0, fontSize: "clamp(28px, 3.4vw, 42px)", lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.04em", maxWidth: 900 }}>
          {title}
          {muted ? (
            <>
              {" "}
              <span style={{ color: t.text3 }}>{muted}</span>
            </>
          ) : null}
        </h2>
      ) : null}
      {intro ? <p style={{ margin: "14px 0 0", fontSize: 16, color: t.text2, maxWidth: 680 }}>{intro}</p> : null}
      {children ? <div style={{ marginTop: title || intro ? 32 : 0 }}>{children}</div> : null}
    </section>
  );
}

export function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div style={{ padding: 24, borderRadius: 20, border: `1px solid ${t.border}`, background: t.surface, boxShadow: t.softShadow, ...style }}>{children}</div>;
}

type ButtonProps = { children: ReactNode; variant?: "primary" | "secondary"; style?: CSSProperties } & ({ onClick: () => void; to?: never; href?: never } | { to: string; onClick?: never; href?: never } | { href: string; onClick?: never; to?: never });

/** Pill button: dark-on-light primary, quiet outline secondary. Renders a button, a route link or an anchor. */
export function Pill(props: ButtonProps) {
  const primary = (props.variant ?? "primary") === "primary";
  const style: CSSProperties = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 46, padding: "0 20px", borderRadius: 999,
    border: primary ? "none" : `1px solid ${t.border}`, background: primary ? t.btnBg : t.surface, color: primary ? t.btnText : t.text,
    font: "inherit", fontSize: 15, fontWeight: primary ? 600 : 500, textDecoration: "none", cursor: "pointer", ...props.style,
  };
  const inner = (
    <>
      {props.children}
      <Arrow />
    </>
  );
  if (props.to !== undefined) return <Link to={props.to} style={style}>{inner}</Link>;
  if (props.href !== undefined) return <a href={props.href} style={style}>{inner}</a>;
  return <button type="button" onClick={props.onClick} style={style}>{inner}</button>;
}

export function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}

export function Check({ color, size = 16 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? t.brand} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", marginTop: 3 }}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/** A small chip with a coloured dot (trust lines, module chips). */
export function Chip({ children, dot }: { children: ReactNode; dot?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 999, border: `1px solid ${t.border}`, background: t.surface, fontSize: 13, color: t.text2 }}>
      <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: 999, background: dot ?? t.brand, flex: "none" }} />
      {children}
    </span>
  );
}

/** Responsive card grid: as many columns of at least `min` px as fit. */
export function Grid({ min, gap = 16, children }: { min: number; gap?: number; children: ReactNode }) {
  return <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}px), 1fr))`, gap }}>{children}</div>;
}

/** The closing panel from the canvas (Pricing "Connect with us"). */
export function ClosingPanel({ title, muted, body, children }: { title: ReactNode; muted?: ReactNode; body: ReactNode; children: ReactNode }) {
  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "40px 24px clamp(56px, 7.78vw, 112px)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 32, padding: "clamp(24px, 4vw, 48px)", borderRadius: 28, background: t.panel }}>
        <div style={{ flex: "1 1 380px", minWidth: 0 }}>
          <h2 style={{ margin: 0, fontSize: "clamp(30px, 3.6vw, 46px)", lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.04em" }}>
            {title}
            {muted ? (
              <>
                {" "}
                <span style={{ color: t.text3 }}>{muted}</span>
              </>
            ) : null}
          </h2>
          <p style={{ margin: "14px 0 0", color: t.text2, fontSize: 16, maxWidth: 520 }}>{body}</p>
        </div>
        <div style={{ flex: "0 1 auto", display: "flex", flexWrap: "wrap", gap: 12 }}>{children}</div>
      </div>
    </section>
  );
}
