import { forwardRef, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Wordmark from "@/components/Wordmark";
import { VOLUME_OPTIONS, WAITLIST_OPEN_EVENT, type WaitlistOpenDetail, sourceWithUtm } from "@/lib/waitlist";

type SubmitState =
  | { phase: "idle" }
  | { phase: "submitting" }
  | { phase: "success" }
  | { phase: "error"; message: string };

interface FormState {
  name: string;
  work_email: string;
  company: string;
  role: string;
  monthly_claim_volume: string;
}

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
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-ink-950/80 backdrop-blur-md"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 m-0 flex max-h-[94dvh] w-full max-w-[960px] flex-col overflow-clip rounded-t-3xl glass-strong shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)] sm:m-4 sm:rounded-3xl lg:grid lg:min-h-[600px] lg:grid-cols-[0.82fr_1.18fr]"
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full text-white/65 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>

            {/* Left: what happens next — desktop only */}
            <aside className="relative hidden overflow-clip border-r border-white/10 p-9 lg:flex lg:flex-col">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-24 -top-28 h-[380px] w-[380px] rounded-full opacity-70 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(13,153,255,0.30) 0%, rgba(124,58,237,0.16) 55%, transparent 80%)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:linear-gradient(180deg,black,transparent_70%)]"
              />
              <div className="relative z-10 flex h-full flex-col">
                <Wordmark size={20} />
                <div className="mt-10 font-display text-[10.5px] uppercase tracking-wider2 text-white/45">
                  What happens next
                </div>
                <ol className="relative mt-5 space-y-6">
                  <span aria-hidden className="absolute bottom-3 left-[13px] top-3 w-px bg-gradient-to-b from-accent-cyan/50 via-white/15 to-transparent" />
                  {NEXT_STEPS.map((s, i) => (
                    <li key={s.title} className="relative flex gap-4">
                      <span className="relative z-10 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-ink-950 font-display text-[11px] font-semibold text-accent-cyan">
                        {i + 1}
                      </span>
                      <div>
                        <div className="text-[14.5px] font-semibold text-white">{s.title}</div>
                        <p className="mt-1 text-[13px] leading-relaxed text-white/55">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <ul className="mt-auto space-y-2.5 border-t border-white/10 pt-6">
                  {TRUST.map((t) => (
                    <li key={t} className="flex items-center gap-2.5 text-[12.5px] text-white/60">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Right: the form — scrolls inside the sheet on a short phone */}
            <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain" data-lenis-prevent>
              <div
                aria-hidden
                className="pointer-events-none absolute -right-28 -top-28 h-[320px] w-[320px] rounded-full opacity-50 blur-3xl lg:opacity-30"
                style={{
                  background:
                    "radial-gradient(circle, rgba(13,153,255,0.32) 0%, rgba(124,58,237,0.16) 50%, transparent 80%)",
                }}
              />
              <div className="relative z-10 px-6 pb-7 pt-7 sm:px-9 sm:pb-9 sm:pt-9">
                {state.phase === "success" ? (
                  <SuccessPanel name={form.name} onClose={() => setOpen(false)} />
                ) : (
                  <>
                    <div className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 font-display text-[10.5px] uppercase tracking-wider2 text-white/60 glass">
                      <span className="relative inline-flex h-1.5 w-1.5">
                        <span className="absolute inset-0 rounded-full bg-accent-cyan opacity-70 blur-[2px] animate-pulse-soft" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                      </span>
                      {copy.eyebrow}
                    </div>
                    <h2
                      id="waitlist-title"
                      className="mt-4 pr-10 font-display text-[26px] font-semibold leading-[1.08] tracking-tighter text-white sm:text-[30px]"
                    >
                      {copy.headline}
                    </h2>
                    <p className="mt-2.5 max-w-[46ch] text-[14px] leading-relaxed text-white/60">
                      {copy.subhead}
                    </p>

                    <form onSubmit={onSubmit} noValidate className="mt-7 space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field
                          ref={nameRef}
                          id="wl-name"
                          label="Full name"
                          value={form.name}
                          onChange={(v) => update("name", v)}
                          placeholder="Your name"
                          autoComplete="name"
                          required
                          error={errors.name}
                        />
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
                        <Field
                          ref={companyRef}
                          id="wl-company"
                          label="Company"
                          value={form.company}
                          onChange={(v) => update("company", v)}
                          placeholder="TPA, insurer or hospital"
                          autoComplete="organization"
                          required
                          error={errors.company}
                        />
                        <Field
                          id="wl-role"
                          label="Role"
                          value={form.role}
                          onChange={(v) => update("role", v)}
                          placeholder="Head of Claims, COO…"
                          autoComplete="organization-title"
                          optional
                        />
                      </div>

                      <fieldset>
                        <legend className="mb-2 flex items-baseline gap-2 text-[13px] font-medium text-white/75">
                          Monthly claim volume
                          <span className="text-[11.5px] font-normal text-white/35">Optional</span>
                        </legend>
                        <div className="flex flex-wrap gap-2">
                          {VOLUME_OPTIONS.map((opt) => (
                            <label key={opt} className="cursor-pointer">
                              <input
                                type="radio"
                                name="wl-volume"
                                value={opt}
                                checked={form.monthly_claim_volume === opt}
                                onChange={() => update("monthly_claim_volume", opt)}
                                className="peer sr-only"
                              />
                              <span className="inline-flex min-h-[40px] items-center rounded-full border border-white/10 bg-white/[0.03] px-3.5 text-[13px] font-medium text-white/70 transition-all duration-200 hover:border-white/20 hover:text-white peer-checked:border-accent-cyan/60 peer-checked:bg-accent-cyan/[0.12] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-accent-cyan/40">
                                {opt}
                              </span>
                            </label>
                          ))}
                        </div>
                      </fieldset>

                      {state.phase === "error" && (
                        <div
                          role="alert"
                          className="rounded-xl border border-rose-400/25 bg-rose-500/[0.06] px-3.5 py-2.5 text-[13px] text-rose-200/90"
                        >
                          {state.message}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={state.phase === "submitting"}
                        className="group !mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(13,153,255,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
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

                      <p className="flex items-start justify-center gap-2 pt-1 text-center text-[12px] leading-relaxed text-white/45">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-[3px] shrink-0" aria-hidden>
                          <rect x="4" y="11" width="16" height="10" rx="2" />
                          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                        </svg>
                        <span>
                          Only used to reach out about the pilot — no drip emails.{" "}
                          <a href="/privacy" className="text-white/70 underline decoration-white/25 underline-offset-4 hover:text-white">
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

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
}

const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { id, label, value, onChange, type = "text", placeholder, autoComplete, inputMode, required, optional, error, hint },
  ref,
) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline gap-2 text-[13px] font-medium text-white/75">
        {label}
        {optional ? <span className="text-[11.5px] font-normal text-white/35">Optional</span> : null}
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
        className={`h-12 w-full rounded-xl border bg-white/[0.035] px-3.5 text-[14.5px] text-white placeholder:text-white/30 outline-none transition-all duration-200 focus:bg-white/[0.06] focus:ring-4 ${
          error
            ? "border-rose-400/50 focus:border-rose-400/70 focus:ring-rose-500/10"
            : "border-white/10 hover:border-white/20 focus:border-accent-cyan/60 focus:ring-accent-cyan/10"
        }`}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[12px] text-rose-300/90">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[12px] text-amber-300/80">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

function SuccessPanel({ name, onClose }: { name: string; onClose: () => void }) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center py-6 text-center sm:py-10">
      <div
        className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.32) 0%, rgba(13,153,255,0.16) 60%, transparent 80%)",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3 className="font-display text-[26px] font-semibold leading-tight tracking-tight text-white">
        Thank you{name ? `, ${name.split(" ")[0]}` : ""}.
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-white/65">
        We&rsquo;ve got your details. Someone from the team will write to you personally to fix a time — usually within a week.
      </p>
      <div className="mt-2 text-[12.5px] text-white/45">A confirmation email is on its way.</div>
      <button
        type="button"
        onClick={onClose}
        className="mt-7 inline-flex min-h-[44px] items-center gap-2 rounded-full px-6 text-[13.5px] font-medium text-white/85 glass transition-all hover:border-white/20 hover:text-white"
      >
        Close
      </button>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      className="animate-spin"
      aria-hidden
    >
      <path d="M12 2a10 10 0 0 1 10 10" opacity="0.85" />
      <path d="M22 12a10 10 0 0 1-10 10" opacity="0.25" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-300 group-hover:translate-x-0.5"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}
