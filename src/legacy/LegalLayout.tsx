import { type ReactNode } from "react";
import { LegacyPage, Eyebrow } from "./ui";
import { mono, t } from "./tokens";

interface Props {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}

/** Privacy, Terms and Compliance: one readable column in the canvas look. The text itself is styled by `.prose-legal`. */
export default function LegalLayout({ eyebrow, title, updated, children }: Props) {
  return (
    <LegacyPage>
      <article style={{ position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", width: 700, height: 700, left: "50%", top: -460, marginLeft: -350, borderRadius: 999, background: t.glow, pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto", padding: "88px 24px 112px" }}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 style={{ margin: "14px 0 0", fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.04, fontWeight: 600, letterSpacing: "-0.045em" }}>{title}</h1>
          <p style={{ margin: "16px 0 0", fontFamily: mono, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: t.text3 }}>Last updated · {updated}</p>

          <div className="prose-legal" style={{ marginTop: 48 }}>
            {children}
          </div>

          <div style={{ marginTop: 72, paddingTop: 28, borderTop: `1px solid ${t.border}`, fontSize: 14, color: t.text2 }}>
            <p style={{ margin: 0 }}>
              Questions? Reach us at{" "}
              <a href="mailto:contact@gooclaim.com" style={{ color: t.text, textUnderlineOffset: 4 }}>
                contact@gooclaim.com
              </a>
              . Security disclosures →{" "}
              <a href="mailto:security@gooclaim.com" style={{ color: t.text, textUnderlineOffset: 4 }}>
                security@gooclaim.com
              </a>
              .
            </p>
          </div>
        </div>
      </article>
    </LegacyPage>
  );
}
