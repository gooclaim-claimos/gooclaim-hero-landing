import { useRef, useState, type FormEvent } from "react";
import { sourceWithUtm } from "@/lib/waitlist";
import { BOOKING_URL, bookingLink } from "@/lib/booking";
import { t } from "./theme";

/**
 * The Pricing page's "Book a 20-minute call". A real lead: it posts to
 * /api/waitlist exactly as the walkthrough modal does. The design's two extra
 * questions ride on fields the API already has — "Claims a year" in
 * `monthly_claim_volume` (with its unit written out, so nobody reads it as a
 * month) and "Interested in" in `source`, next to the button that sent it.
 */
const VOLUMES = ["Under 50,000", "50,000 – 5 lakh", "5 lakh+"] as const;
const INTERESTS = ["Pilot", "Production", "Enterprise", "Voice early access"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Phase = { phase: "idle" } | { phase: "submitting" } | { phase: "sent" } | { phase: "error"; message: string };
type Field = "name" | "work_email" | "company";

const input = { width: "100%", height: 44, padding: "0 14px", borderRadius: 10, border: `1px solid ${t.border}`, background: t.surface2, color: t.text, font: "inherit", fontSize: 15 } as const;
const labelStyle = { display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 } as const;

function FieldError({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return <div id={id} style={{ marginTop: 6, fontSize: 12, color: t.red }}>{text}</div>;
}

export default function ConnectForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [volume, setVolume] = useState<string>(VOLUMES[0]);
  const [picks, setPicks] = useState<Record<string, boolean>>({ Pilot: true });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [state, setState] = useState<Phase>({ phase: "idle" });
  const refs = { name: useRef<HTMLInputElement>(null), work_email: useRef<HTMLInputElement>(null), company: useRef<HTMLInputElement>(null) };

  async function send(e: FormEvent) {
    e.preventDefault();
    if (state.phase === "submitting") return;
    const next: Partial<Record<Field, string>> = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(email.trim())) next.work_email = "Please enter a valid email address.";
    if (!org.trim()) next.company = "Please enter your organisation.";
    setErrors(next);
    const first = (["name", "work_email", "company"] as const).find((k) => next[k]);
    if (first) return refs[first].current?.focus();

    const interests = INTERESTS.filter((i) => picks[i]);
    const source = interests.length ? `pricing-connect · ${interests.join(", ")}` : "pricing-connect";
    setState({ phase: "submitting" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, work_email: email, company: org, role: "", monthly_claim_volume: `${volume} claims a year`, source: sourceWithUtm(source) }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        if (data?.error === "invalid_email") {
          setErrors({ work_email: "That email doesn't look right. Try again?" });
          setState({ phase: "idle" });
          refs.work_email.current?.focus();
          return;
        }
        setState({ phase: "error", message: "Something went wrong. Please try again or email contact@gooclaim.com." });
        return;
      }
      setState({ phase: "sent" });
    } catch {
      setState({ phase: "error", message: "Network error. Please check your connection and try again." });
    }
  }

  function reset() {
    setName("");
    setEmail("");
    setOrg("");
    setErrors({});
    setState({ phase: "idle" });
  }

  if (state.phase === "sent") {
    return (
      <div style={{ textAlign: "center", padding: "40px 10px" }}>
        <div style={{ display: "inline-flex", width: 56, height: 56, borderRadius: 999, background: t.greenSoft, color: t.green, alignItems: "center", justifyContent: "center" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        <div role="status" style={{ fontSize: 22, fontWeight: 600, marginTop: 14 }}>Thanks — we’ll be in touch.</div>
        <div style={{ fontSize: 14, color: t.text2, marginTop: 6 }}>
          {BOOKING_URL ? "We’ve got your details. Pick a 20-minute slot now — or we’ll write to you to fix one." : "We’ve got your details. Someone from the team will write to you to fix a time."}
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 16 }}>
          {BOOKING_URL && (
            <a href={bookingLink({ name, work_email: email, company: org })} target="_blank" rel="noreferrer" style={{ padding: "9px 16px", borderRadius: 10, background: t.btnBg, color: t.btnText, fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
              Pick a time now
            </a>
          )}
          <button type="button" onClick={reset} style={{ padding: "9px 14px", borderRadius: 10, border: `1px solid ${t.border}`, background: t.surface, color: t.text2, font: "inherit", fontSize: 13, cursor: "pointer" }}>Back to form</button>
        </div>
      </div>
    );
  }

  const busy = state.phase === "submitting";
  return (
    <form onSubmit={send} noValidate>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: 14 }}>
        <div>
          <label htmlFor="f-name" style={labelStyle}>Full name</label>
          <input id="f-name" ref={refs.name} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Your name" aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? "f-name-err" : undefined} style={input} />
          <FieldError id="f-name-err" text={errors.name} />
        </div>
        <div>
          <label htmlFor="f-email" style={labelStyle}>Work email</label>
          <input id="f-email" ref={refs.work_email} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@company.com" aria-invalid={errors.work_email ? true : undefined} aria-describedby={errors.work_email ? "f-email-err" : undefined} style={input} />
          <FieldError id="f-email-err" text={errors.work_email} />
        </div>
        <div>
          <label htmlFor="f-org" style={labelStyle}>Organisation</label>
          <input id="f-org" ref={refs.company} value={org} onChange={(e) => setOrg(e.target.value)} autoComplete="organization" placeholder="TPA or insurer" aria-invalid={errors.company ? true : undefined} aria-describedby={errors.company ? "f-org-err" : undefined} style={input} />
          <FieldError id="f-org-err" text={errors.company} />
        </div>
        <div>
          <label htmlFor="f-vol" style={labelStyle}>Claims a year</label>
          <select id="f-vol" value={volume} onChange={(e) => setVolume(e.target.value)} style={{ ...input, padding: "0 12px" }}>
            {VOLUMES.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ marginTop: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Interested in</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {INTERESTS.map((label) => {
            const on = !!picks[label];
            return (
              <button key={label} type="button" onClick={() => setPicks((p) => ({ ...p, [label]: !on }))} aria-pressed={on} style={{ padding: "8px 14px", borderRadius: 999, border: `1px solid ${on ? t.brandLine : t.border}`, background: on ? t.brandSoft : t.surface, color: on ? t.brand : t.text2, font: "inherit", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                {label}
              </button>
            );
          })}
        </div>
      </div>
      {state.phase === "error" && (
        <div role="alert" style={{ marginTop: 14, fontSize: 13, color: t.red }}>{state.message}</div>
      )}
      <button type="submit" disabled={busy} style={{ marginTop: 20, width: "100%", height: 50, borderRadius: 999, border: "none", background: t.btnBg, color: t.btnText, font: "inherit", fontSize: 15, fontWeight: 600, cursor: busy ? "wait" : "pointer", opacity: busy ? 0.7 : 1 }}>
        {busy ? "Sending…" : "Book a 20-minute call"}
      </button>
    </form>
  );
}
