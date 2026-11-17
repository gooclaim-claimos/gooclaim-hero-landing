import { forwardRef, type HTMLAttributes } from "react";
import { BOOKING_URL, bookingLink } from "@/lib/booking";
import { t } from "./tokens";

export interface WaitlistForm {
  name: string;
  work_email: string;
  company: string;
  role: string;
  monthly_claim_volume: string;
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { id, label, value, onChange, type = "text", placeholder, autoComplete, inputMode, required, optional, error, hint },
  ref,
) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div>
      <label htmlFor={id} style={{ marginBottom: 6, display: "flex", alignItems: "baseline", gap: 8, fontSize: 13, fontWeight: 500, color: t.text }}>
        {label}
        {optional ? <span style={{ fontSize: 11.5, fontWeight: 400, color: t.text3 }}>Optional</span> : null}
      </label>
      <input
        ref={ref}
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="lg-field"
      />
      {error ? (
        <p id={`${id}-error`} style={{ margin: "6px 0 0", fontSize: 12, color: t.red }}>
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} style={{ margin: "6px 0 0", fontSize: 12, color: t.amber }}>
          {hint}
        </p>
      ) : null}
    </div>
  );
});

export function SuccessPanel({ form, onClose }: { form: WaitlistForm; onClose: () => void }) {
  const name = form.name;
  return (
    <div style={{ minHeight: 420, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 0", textAlign: "center" }}>
      <div style={{ marginBottom: 22, display: "inline-flex", width: 64, height: 64, borderRadius: 999, alignItems: "center", justifyContent: "center", background: t.greenSoft, color: t.green }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3 style={{ margin: 0, fontSize: 26, fontWeight: 600, letterSpacing: "-0.03em", color: t.text }}>Thank you{name ? `, ${name.split(" ")[0]}` : ""}.</h3>
      {BOOKING_URL ? (
        <p style={{ margin: "12px auto 0", maxWidth: 380, fontSize: 14, color: t.text2 }}>
          We&rsquo;ve got your details. Pick a 20-minute slot now — or close this, and someone from the team will write to you to fix one.
        </p>
      ) : (
        <p style={{ margin: "12px auto 0", maxWidth: 380, fontSize: 14, color: t.text2 }}>
          We&rsquo;ve got your details. Someone from the team will write to you personally to fix a time — usually within a week.
        </p>
      )}
      <div style={{ marginTop: 8, fontSize: 12.5, color: t.text3 }}>A confirmation email is on its way.</div>
      <div style={{ marginTop: 26, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
        {BOOKING_URL && (
          <a href={bookingLink(form)} target="_blank" rel="noreferrer" style={{ display: "inline-flex", minHeight: 44, alignItems: "center", gap: 8, padding: "0 22px", borderRadius: 999, background: t.btnBg, color: t.btnText, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            Pick a time now <span aria-hidden="true">&rarr;</span>
          </a>
        )}
        <button type="button" onClick={onClose} style={{ display: "inline-flex", minHeight: 44, alignItems: "center", padding: "0 22px", borderRadius: 999, border: `1px solid ${t.border}`, background: t.surface, color: t.text, font: "inherit", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
          Close
        </button>
      </div>
    </div>
  );
}

export function Spinner() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" className="animate-spin" aria-hidden="true">
      <path d="M12 2a10 10 0 0 1 10 10" opacity="0.85" />
      <path d="M22 12a10 10 0 0 1-10 10" opacity="0.25" />
    </svg>
  );
}
