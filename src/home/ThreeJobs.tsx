import { type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { SAMPLE_CLAIM, SAMPLE_QUEUE } from "@/data/sampleClaim";
import { eyebrow, h2 } from "./Problem";
import { mono, t } from "./theme";
import { useSampleDates } from "./useSampleDates";

const PULSE = [
  { id: SAMPLE_QUEUE[1], what: "Discharge summary pending", clock: "IRDAI 3-hour", bg: t.amberBg, c: t.amber },
  { id: SAMPLE_QUEUE[0], what: "Document from member", clock: "15-day", bg: t.greenSoft, c: t.green },
  { id: SAMPLE_QUEUE[2], what: "Cashless pre-auth waiting", clock: "IRDAI 1-hour", bg: t.redBg, c: t.red },
];

const LEDGER = [
  { ev: "consent.granted", hash: "9f2c…a71e" },
  { ev: "identity.verified", hash: "41bd…0c93" },
  { ev: "message.sent · approved", hash: "c07a…5f12" },
  { ev: "document.received", hash: "7e19…b4d8" },
];

const h3: CSSProperties = { margin: "12px 0 0", fontSize: 36, lineHeight: 1.1, fontWeight: 500, letterSpacing: "-0.03em" };
const lead: CSSProperties = { margin: "14px 0 0", color: t.text2, fontSize: 17 };
const pill: CSSProperties = { display: "inline-block", marginTop: 26, padding: "11px 20px", borderRadius: 999, background: t.btnBg, color: t.btnText, fontSize: 14, fontWeight: 500 };
const card: CSSProperties = { margin: "0 auto", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 22, boxShadow: "0 24px 60px rgba(15,23,42,.14)" };
const sample = <span style={{ fontFamily: mono, fontSize: 11, color: t.text3 }}>SAMPLE</span>;

function Copy({ label, color, title, body, points, cta }: { label: string; color: string; title: string; body: string; points: string[]; cta: ReactNode }) {
  return (
    <div style={{ flex: "1 1 360px", minWidth: 0 }}>
      <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: ".08em", color }}>{label}</div>
      <h3 style={h3}>{title}</h3>
      <p style={lead}>{body}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 22, fontSize: 15 }}>
        {points.map((p) => (
          <span key={p}>✓&nbsp; {p}</span>
        ))}
      </div>
      {cta}
    </div>
  );
}

const panel = (background: string): CSSProperties => ({ flex: "1.3 1 460px", minWidth: 0, borderRadius: 28, padding: "40px clamp(16px, 4vw, 48px)", background });

function MembersChat() {
  const dates = useSampleDates();
  const me: CSSProperties = { alignSelf: "flex-end", padding: "10px 14px", borderRadius: "16px 16px 4px 16px", background: t.btnBg, color: t.btnText };
  const them: CSSProperties = { alignSelf: "flex-start", padding: "10px 14px", borderRadius: "16px 16px 16px 4px", background: t.surface2 };
  const tag: CSSProperties = { fontFamily: mono, fontSize: 10, padding: "4px 8px", borderRadius: 999, background: t.blueSoft, color: t.blue };
  return (
    <div style={{ ...card, maxWidth: 420, padding: 18, display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, borderBottom: `1px solid ${t.border}` }}>
        <b style={{ fontWeight: 600 }}>WhatsApp · Claims desk</b>
        {sample}
      </div>
      <div style={{ ...me, maxWidth: "80%" }}>Hi, what's the status of my claim?</div>
      <div style={{ ...them, maxWidth: "85%" }}>Before we look at your claim, may we use your details to help you? Reply YES to continue.</div>
      <div style={me}>Yes</div>
      <div style={{ ...them, maxWidth: "88%" }}>
        Claim {SAMPLE_CLAIM.number} (insurer's records{dates ? `, updated ${dates.updated}` : ""}): <b style={{ fontWeight: 600 }}>Documents pending.</b> We still need your discharge summary.
      </div>
      <div style={{ alignSelf: "flex-start", display: "flex", gap: 6, flexWrap: "wrap" }}>
        <span style={tag}>CONSENT FIRST</span>
        <span style={tag}>SOURCE &amp; DATE</span>
      </div>
    </div>
  );
}

export default function ThreeJobs() {
  return (
    <section id="platform" style={{ maxWidth: 1240, margin: "0 auto", padding: "120px 24px 40px" }}>
      <div style={eyebrow}>02 · WHAT IT DOES</div>
      <h2 style={h2}>
        One OS. <span style={{ color: t.text3 }}>Three jobs done.</span>
      </h2>

      <div style={{ marginTop: 56, display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center" }}>
        <Copy label="FOR YOUR MEMBERS" color={t.blue} title="Answers, not a helpline number." body="Status, pending documents and decisions on messaging tools and email, and by voice call in early access — in the member's language, with the source and date." points={["Consent and OTP first", "Approved messages only", "Secure document upload"]} cta={<Link to="/try" style={pill}>Try messaging</Link>} />
        <div style={panel(t.panelMembers)}>
          <MembersChat />
        </div>
      </div>

      <div id="orion" style={{ marginTop: 96, display: "flex", flexWrap: "wrap-reverse", gap: 48, alignItems: "center" }}>
        <div style={panel(t.panelOrion)}>
          <div style={{ ...card, maxWidth: 460, padding: 20, fontSize: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <b style={{ fontWeight: 600 }}>Work Pulse</b>
              {sample}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
              {PULSE.map((r) => (
                <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 14, border: `1px solid ${t.border}`, background: t.surface2 }}>
                  <div>
                    <div style={{ fontWeight: 500 }}>{r.id}</div>
                    <div style={{ fontSize: 13, color: t.text2 }}>{r.what}</div>
                  </div>
                  <span style={{ fontFamily: mono, fontSize: 11, padding: "4px 10px", borderRadius: 999, background: r.bg, color: r.c, whiteSpace: "nowrap" }}>{r.clock}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, padding: "12px 14px", borderRadius: 14, background: t.greenSoft, color: t.green, fontSize: 13 }}>
              <b style={{ fontWeight: 600 }}>Next safe step:</b> remind the hospital for the final bill — evidence attached. A person says yes.
            </div>
          </div>
        </div>
        <Copy label="FOR YOUR TEAM" color={t.green} title="Orion, the AI claims coworker." body="What needs a person and why, the claim read for them, and the next safe step with its evidence — a person says yes." points={["Work Pulse with regulator clocks", "Live Claim Brief", "Next Safe Step"]} cta={<Link to="/orion" style={pill}>Meet Orion</Link>} />
      </div>

      <div id="security" style={{ marginTop: 96, display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center" }}>
        <Copy label="FOR COMPLIANCE" color={t.amber} title="Every claim, on the record." body="The regulator's clocks on every claim, complaints with their own deadlines, turnaround reports from the record, and an append-only audit trail." points={["Consent and data protection by design", "Strict per-tenant isolation", "Tested every day, on every channel"]} cta={<Link to="/security" style={pill}>Security &amp; compliance</Link>} />
        <div style={panel(t.panelCompliance)}>
          <div style={{ ...card, maxWidth: 460, padding: 20, fontSize: 13 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14 }}>
              <b style={{ fontWeight: 600 }}>Audit ledger · {SAMPLE_CLAIM.number}</b>
              {sample}
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 12 }}>
              {LEDGER.map((l) => (
                <div key={l.ev} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "11px 0", borderBottom: `1px solid ${t.border}` }}>
                  <span style={{ fontFamily: mono }}>{l.ev}</span>
                  <span style={{ fontFamily: mono, color: t.text3 }}>{l.hash}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center", color: t.amber, fontSize: 13 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: t.amber }} />
              Append-only · chained with SHA-256
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
