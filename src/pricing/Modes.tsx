import { mono, t } from "./theme";

const FACTORS = [
  { k: "VOLUME", v: "Claims a year, not seats" },
  { k: "CHANNELS", v: "Messaging · email · voice" },
  { k: "LINES", v: "Started with health" },
  { k: "SLA", v: "1 hour · 3 hours · 15 days" },
];

interface Mode {
  k: string;
  name: string;
  desc: string;
  items: string[];
  fit: string;
  featured?: boolean;
}

const MODES: Mode[] = [
  { k: "MODE 01", name: "Pilot", desc: "A 90-day pilot with one workflow on one channel, on your own claims. Success measures agreed on day one, checked every three weeks.", items: ["1 workflow · 1 channel · 1 tenant", "Truth-layer connector to your CMS", "Approved messaging templates, or email", "Per-tenant audit ledger", "Weekly success readout"], fit: "TPAs and insurers evaluating Gooclaim OS against a specific operational pain." },
  { k: "MODE 02", name: "Production", featured: true, desc: "Annual engagement covering multiple workflows, all live channels, regulator-grade SLAs and support hours agreed in the contract.", items: ["Every live workflow and channel", "Production SLAs · regulator clock tracking", "Per-tenant dashboards + regulator reports", "A named contact on our team", "Quarterly architecture review"], fit: "Teams running claims ops at scale and ready to standardise on Gooclaim OS." },
  { k: "MODE 03", name: "Enterprise", desc: "Multi-tenant deployment with a custom security review and, on request, dedicated infrastructure and named architects.", items: ["Multi-tenant across TPAs or lines", "Custom security review", "Dedicated infrastructure on request", "Named architects"], fit: "Groups running claims across several TPAs or lines of business." },
];

const PLAIN = { bg: t.surface, fg: t.text, border: t.border, line: t.border, check: t.brand, btnBg: t.surface2, btnFg: t.text, shadow: "none" };
const FEAT = { bg: t.featBg, fg: t.featFg, border: "transparent", line: t.featLine, check: t.featCheck, btnBg: t.featBtnBg, btnFg: t.featBtnFg, shadow: "0 30px 80px rgba(30,58,138,.25)" };

function ModeCard({ m }: { m: Mode }) {
  const c = m.featured ? FEAT : PLAIN;
  return (
    <div style={{ position: "relative", padding: 28, borderRadius: 24, border: `1px solid ${c.border}`, background: c.bg, color: c.fg, display: "flex", flexDirection: "column", boxShadow: c.shadow }}>
      {m.featured && (
        <span style={{ position: "absolute", top: 20, right: 20, fontFamily: mono, fontSize: 10, letterSpacing: ".08em", padding: "4px 10px", borderRadius: 999, background: t.brandGrad, color: "#fff" }}>FULL ROLLOUT</span>
      )}
      <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", opacity: 0.7 }}>{m.k}</div>
      <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.03em", marginTop: 6 }}>{m.name}</div>
      <div style={{ fontSize: 14, marginTop: 2, opacity: 0.75 }}>Custom · quote on request</div>
      <div style={{ fontSize: 15, marginTop: 16, opacity: 0.9 }}>{m.desc}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20, paddingTop: 18, borderTop: `1px solid ${c.line}`, fontSize: 14 }}>
        {m.items.map((i) => (
          <div key={i} style={{ display: "flex", gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.check} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: 3 }} aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
            <span>{i}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, fontSize: 13, opacity: 0.75 }}>
        <b style={{ fontWeight: 600 }}>Best fit:</b> {m.fit}
      </div>
      <a href="#connect" style={{ marginTop: "auto", paddingTop: 22, textDecoration: "none", color: "inherit" }}>
        <span style={{ display: "block", textAlign: "center", padding: "13px 18px", borderRadius: 999, background: c.btnBg, color: c.btnFg, fontWeight: 500 }}>Talk about {m.name}</span>
      </a>
    </div>
  );
}

export default function Modes() {
  return (
    <>
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "16px 24px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", gap: 12 }}>
          {FACTORS.map((f) => (
            <div key={f.k} style={{ padding: 20, borderRadius: 18, border: `1px solid ${t.border}`, background: t.surface }}>
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", color: t.text3 }}>{f.k}</div>
              <div style={{ fontSize: 17, fontWeight: 600, marginTop: 6 }}>{f.v}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", fontSize: 14, color: t.text2, marginTop: 16 }}>No price card, because no two of these are the same. A real number after one call — not a quote-form runaround.</div>
      </section>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "32px 24px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 16, alignItems: "stretch" }}>
          {MODES.map((m) => (
            <ModeCard key={m.name} m={m} />
          ))}
        </div>
      </section>
    </>
  );
}
