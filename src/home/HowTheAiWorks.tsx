import { eyebrow, h2 } from "./Problem";
import { t } from "./theme";

/**
 * 03 · How the AI works — an overview for buyers, never the internals
 * (founder 2026-11-16: "internal cheeze nahi batana, bus overview"). Each line
 * is true in code: answers name their record and date, messages are checked
 * before they are sent and a call speaks only from the caller's claim, the OS
 * never changes a decision, and what it cannot answer goes to a person.
 */
const POINTS: { title: string; body: string; icon: string; color: string; soft: string }[] = [
  {
    title: "From your records, with the date",
    body: "Every answer comes from your own claims system, and says whose record it read and when.",
    icon: "M4 4h12l4 4v12H4zM8 12h8M8 16h5M16 4v4h4",
    color: t.blue,
    soft: t.blueSoft,
  },
  {
    title: "Checked before it is sent",
    body: "A written reply goes out only after it is checked against the claim. On a call, the agent speaks only from the caller’s own claim.",
    icon: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5",
    color: t.green,
    soft: t.greenSoft,
  },
  {
    title: "It never decides a claim",
    body: "Approvals, rejections and amounts stay with your team and your claims system. Gooclaim OS reads them — it never changes them.",
    icon: "M12 3v18M5 7h14M7 7l-3 7h6zM17 7l-3 7h6M8 21h8",
    color: t.amber,
    soft: t.amberSoft,
  },
  {
    title: "A person when it matters",
    body: "When the AI cannot answer, it says so and hands the case to your team with the reason. It never guesses.",
    icon: "M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 11l2 2 4-4",
    color: t.violet,
    soft: t.violetSoft,
  },
];

export default function HowTheAiWorks() {
  return (
    <section style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(48px, 6.67vw, 96px) 24px 40px" }}>
      <div style={eyebrow}>03 · HOW THE AI WORKS</div>
      <h2 style={{ ...h2, maxWidth: 880 }}>
        Trustworthy before it is clever. <span style={{ color: t.text3 }}>And it never decides a claim.</span>
      </h2>
      <p style={{ margin: "20px 0 0", fontSize: 18, color: t.text2, maxWidth: 680 }}>
        An AI that speaks to your members has to earn that first. Every answer Gooclaim OS gives can be traced to your records, and anything it cannot answer goes to a person.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 16, marginTop: 40 }}>
        {POINTS.map((p) => (
          <div key={p.title} style={{ padding: 24, borderRadius: 22, border: `1px solid ${t.border}`, background: t.surface, boxShadow: t.softShadow }}>
            <span style={{ width: 44, height: 44, borderRadius: 14, background: p.soft, color: p.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={p.icon} />
              </svg>
            </span>
            <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 18 }}>{p.title}</div>
            <div style={{ fontSize: 15, color: t.text2, marginTop: 8, lineHeight: 1.55 }}>{p.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
