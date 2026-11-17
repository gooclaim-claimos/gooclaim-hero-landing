import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VOLUME_OPTIONS, WAITLIST_OPEN_EVENT, type WaitlistOpenDetail, sourceWithUtm } from "@/lib/waitlist";
import { ThemeStyle } from "@/theme/ThemeProvider";
import { css, mono, t } from "@/legacy/tokens";
import { Arrow } from "@/legacy/ui";
import { Field, Spinner, SuccessPanel, type WaitlistForm } from "@/legacy/waitlistParts";
import { ShieldMark } from "@/site/Nav";

type SubmitState =
  | { phase: "idle" }
  | { phase: "submitting" }
  | { phase: "success" }
  | { phase: "error"; message: string };

type FormState = WaitlistForm;

type FieldErrors = Partial<Record<"name" | "work_email" | "company", string>>;

const EMPTY_FORM: FormState = {
  name: "",
  work_email: "",
  company: "",
  role: "",
  monthly_claim_volume: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Personal mail providers: allowed, with a gentle nudge toward a work address. */
const PERSONAL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.in",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "icloud.com",
  "rediffmail.com",
  "proton.me",
  "protonmail.com",
]);

const DEFAULT_COPY = {
  eyebrow: "20-minute walkthrough",
  headline: "Book a walkthrough.",
  subhead:
    "Leave your details and we'll fix a time. On the call, we show the workflow that costs your team the most first — on a sample claims system, in 20 minutes.",
};

const NEXT_STEPS = [
  {
    title: "A person reads it",
    body: "Your note goes to the founding team — not a drip sequence.",
  },
  {
    title: "A 20-minute walkthrough",
    body: "Your workflow first, on a sample claims system. No slides.",
  },
  {
    title: "A 90-day pilot on your claims",
    body: "One workflow, one channel, your own record — then we grow it together.",
  },
];

const TRUST = ["Regulator clocks on every claim", "Consent before a word", "Append-only audit ledger"];

export default function WaitlistModal() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("hero-landing");
  const [copy, setCopy] = useState(DEFAULT_COPY);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<SubmitState>({ phase: "idle" });
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);

  // Listen for open events
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<WaitlistOpenDetail>).detail;
      setSource(detail?.source || "hero-landing");
      setCopy({
        eyebrow: detail?.eyebrow || DEFAULT_COPY.eyebrow,
        headline: detail?.headline || DEFAULT_COPY.headline,
        subhead: detail?.subhead || DEFAULT_COPY.subhead,
      });
      setState({ phase: "idle" });
      setOpen(true);
    };
    window.addEventListener(WAITLIST_OPEN_EVENT, handler);
    return () => window.removeEventListener(WAITLIST_OPEN_EVENT, handler);
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus first field on open
  useEffect(() => {
    if (open && state.phase === "idle") {
      const t = setTimeout(() => nameRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [open, state.phase]);

  // Reset form a moment after closing
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setForm(EMPTY_FORM);
        setErrors({});
        setState({ phase: "idle" });
      }, 400);
      return () => clearTimeout(t);
    }
  }, [open]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  const emailDomain = form.work_email.trim().toLowerCase().split("@")[1] || "";
  const personalEmail = EMAIL_RE.test(form.work_email.trim()) && PERSONAL_DOMAINS.has(emailDomain);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state.phase === "submitting") return;

    // Every problem at once, each under its own field; focus the first.
    const next: FieldErrors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(form.work_email.trim())) next.work_email = "Please enter a valid email address.";
    if (!form.company.trim()) next.company = "Please enter your company.";
    setErrors(next);
    if (next.name) return nameRef.current?.focus();
    if (next.work_email) return emailRef.current?.focus();
    if (next.company) return companyRef.current?.focus();

    setState({ phase: "submitting" });

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: sourceWithUtm(source) }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        if (data?.error === "invalid_email") {
          setErrors({ work_email: "That email doesn't look right. Try again?" });
          setState({ phase: "idle" });
          emailRef.current?.focus();
          return;
        }
        setState({
          phase: "error",
          message: "Something went wrong. Please try again or email contact@gooclaim.com.",
        });
        return;
      }
      setState({ phase: "success" });
    } catch {
      setState({
        phase: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="waitlist-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
          aria-modal="true"
          role="dialog"
          aria-labelledby="waitlist-title"
          style={{ fontFamily: "Inter, system-ui, sans-serif", lineHeight: 1.5 }}
        >
          <ThemeStyle css={css} />
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default"
            style={{ border: "none", background: t.overlay, backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 m-0 flex max-h-[94dvh] w-full max-w-[960px] flex-col overflow-clip rounded-t-[28px] sm:m-4 sm:rounded-[28px] lg:grid lg:min-h-[600px] lg:grid-cols-[0.82fr_1.18fr]"
            style={{ background: t.surface, color: t.text, border: `1px solid ${t.border}`, boxShadow: t.shadow }}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full"
              style={{ border: `1px solid ${t.border}`, background: t.surface, color: t.text2, cursor: "pointer" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>

            {/* Left: what happens next — desktop only */}
            <aside className="relative hidden overflow-clip p-9 lg:flex lg:flex-col" style={{ background: t.panel, borderRight: `1px solid ${t.border}` }}>
              <div className="relative z-10 flex h-full flex-col">
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600, fontSize: 17, letterSpacing: "-0.02em" }}>
                  <ShieldMark size={22} />
                  <span>
                    Gooclaim<span style={{ color: t.text3, fontWeight: 500 }}> OS</span>
                  </span>
                </div>
                <div style={{ marginTop: 40, fontFamily: mono, fontSize: 11, letterSpacing: ".08em", color: t.text3 }}>WHAT HAPPENS NEXT</div>
                <ol style={{ listStyle: "none", margin: "20px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 22 }}>
                  {NEXT_STEPS.map((s, i) => (
                    <li key={s.title} style={{ display: "flex", gap: 14 }}>
                      <span style={{ display: "inline-flex", width: 28, height: 28, flex: "none", alignItems: "center", justifyContent: "center", borderRadius: 999, background: t.surface, border: `1px solid ${t.brandLine}`, color: t.brand, fontSize: 12, fontWeight: 600 }}>
                        {i + 1}
                      </span>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600 }}>{s.title}</div>
                        <p style={{ margin: "4px 0 0", fontSize: 13, color: t.text2 }}>{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <ul style={{ listStyle: "none", margin: "auto 0 0", padding: "24px 0 0", borderTop: `1px solid ${t.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
                  {TRUST.map((line) => (
                    <li key={line} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: t.text2 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: t.green, flex: "none" }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Right: the form — scrolls inside the sheet on a short phone */}
            <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain" data-lenis-prevent>
              <div className="relative z-10 px-6 pb-7 pt-7 sm:px-9 sm:pb-9 sm:pt-9">
                {state.phase === "success" ? (
                  <SuccessPanel form={form} onClose={() => setOpen(false)} />
                ) : (
                  <>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px", borderRadius: 999, border: `1px solid ${t.brandLine}`, background: t.brandSoft, color: t.brand, fontFamily: mono, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase" }}>
                      <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: 999, background: t.brand }} />
                      {copy.eyebrow}
                    </div>
                    <h2 id="waitlist-title" style={{ margin: "16px 0 0", paddingRight: 40, fontSize: "clamp(26px, 3vw, 32px)", lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.035em" }}>
                      {copy.headline}
                    </h2>
                    <p style={{ margin: "10px 0 0", maxWidth: "46ch", fontSize: 14, color: t.text2 }}>{copy.subhead}</p>

                    <form onSubmit={onSubmit} noValidate style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 16 }}>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field ref={nameRef} id="wl-name" label="Full name" value={form.name} onChange={(v) => update("name", v)} placeholder="Your name" autoComplete="name" required error={errors.name} />
                        <Field
                          ref={emailRef}
                          id="wl-email"
                          label="Work email"
                          type="email"
                          value={form.work_email}
                          onChange={(v) => update("work_email", v)}
                          placeholder="name@company.com"
                          autoComplete="email"
                          inputMode="email"
                          required
                          error={errors.work_email}
                          hint={personalEmail ? "A work email helps us find your team faster." : undefined}
                        />
                        <Field ref={companyRef} id="wl-company" label="Company" value={form.company} onChange={(v) => update("company", v)} placeholder="TPA, insurer or hospital" autoComplete="organization" required error={errors.company} />
                        <Field id="wl-role" label="Role" value={form.role} onChange={(v) => update("role", v)} placeholder="Head of Claims, COO…" autoComplete="organization-title" optional />
                      </div>

                      <fieldset style={{ margin: 0, padding: 0, border: "none" }}>
                        <legend style={{ marginBottom: 8, display: "flex", alignItems: "baseline", gap: 8, fontSize: 13, fontWeight: 500 }}>
                          Monthly claim volume
                          <span style={{ fontSize: 11.5, fontWeight: 400, color: t.text3 }}>Optional</span>
                        </legend>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {VOLUME_OPTIONS.map((opt) => (
                            <label key={opt} style={{ cursor: "pointer" }}>
                              <input type="radio" name="wl-volume" value={opt} checked={form.monthly_claim_volume === opt} onChange={() => update("monthly_claim_volume", opt)} className="sr-only" />
                              <span className="lg-chip">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </fieldset>

                      {state.phase === "error" && (
                        <div role="alert" style={{ padding: "10px 14px", borderRadius: 12, border: `1px solid ${t.redLine}`, background: t.redSoft, fontSize: 13, color: t.red }}>
                          {state.message}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={state.phase === "submitting"}
                        style={{ marginTop: 8, display: "inline-flex", minHeight: 52, width: "100%", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 999, border: "none", background: t.btnBg, color: t.btnText, font: "inherit", fontSize: 15, fontWeight: 600, cursor: state.phase === "submitting" ? "not-allowed" : "pointer", opacity: state.phase === "submitting" ? 0.6 : 1 }}
                      >
                        {state.phase === "submitting" ? (
                          <>
                            <Spinner />
                            Submitting…
                          </>
                        ) : (
                          <>
                            Book a walkthrough
                            <Arrow />
                          </>
                        )}
                      </button>

                      <p style={{ margin: 0, display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 8, textAlign: "center", fontSize: 12, color: t.text3 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginTop: 3, flex: "none" }}>
                          <rect x="4" y="11" width="16" height="10" rx="2" />
                          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                        </svg>
                        <span>
                          Only used to reach out about the pilot — no drip emails.{" "}
                          <a href="/privacy" style={{ color: t.text2, textUnderlineOffset: 4 }}>
                            Privacy notice
                          </a>
                        </span>
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
