import { forwardRef, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  VOLUME_OPTIONS,
  WAITLIST_OPEN_EVENT,
  type WaitlistOpenDetail,
} from "@/lib/waitlist";

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

const EMPTY_FORM: FormState = {
  name: "",
  work_email: "",
  company: "",
  role: "",
  monthly_claim_volume: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DEFAULT_COPY = {
  eyebrow: "Early access · rolling out now",
  headline: "Join the waitlist.",
  subhead:
    "We're onboarding our first TPAs and insurers. Drop your details and we'll reach out personally when we're ready for your operation.",
};

export default function WaitlistModal() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("hero-landing");
  const [copy, setCopy] = useState(DEFAULT_COPY);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [state, setState] = useState<SubmitState>({ phase: "idle" });
  const firstFieldRef = useRef<HTMLInputElement>(null);

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
      const t = setTimeout(() => firstFieldRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [open, state.phase]);

  // Reset form a moment after closing
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setForm(EMPTY_FORM);
        setState({ phase: "idle" });
      }, 400);
      return () => clearTimeout(t);
    }
  }, [open]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state.phase === "submitting") return;

    if (!form.name.trim()) {
      setState({ phase: "error", message: "Please enter your name." });
      return;
    }
    if (!EMAIL_RE.test(form.work_email.trim())) {
      setState({ phase: "error", message: "Please enter a valid work email." });
      return;
    }
    if (!form.company.trim()) {
      setState({ phase: "error", message: "Please enter your company." });
      return;
    }

    setState({ phase: "submitting" });

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        setState({
          phase: "error",
          message:
            data?.error === "invalid_email"
              ? "That email doesn't look right. Try again?"
              : "Something went wrong. Please try again or email contact@gooclaim.com.",
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
            aria-label="Close waitlist"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-ink-950/80 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 m-3 w-full max-w-[520px] overflow-hidden rounded-3xl glass-strong"
          >
            {/* Bloom */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-28 -top-28 h-[360px] w-[360px] rounded-full opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(13,153,255,0.35) 0%, rgba(124,58,237,0.18) 50%, transparent 80%)",
              }}
            />

            {/* Close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full text-white/65 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>

            <div className="relative z-10 px-6 pb-7 pt-7 sm:px-8 sm:pb-8 sm:pt-8">
              {state.phase === "success" ? (
                <SuccessPanel name={form.name} onClose={() => setOpen(false)} />
              ) : (
                <>
                  <div className="mb-1 inline-flex items-center gap-2 rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider2 text-white/60 glass">
                    <span className="relative inline-flex h-1.5 w-1.5">
                      <span className="absolute inset-0 rounded-full bg-accent-cyan opacity-70 blur-[2px] animate-pulse-soft" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                    </span>
                    {copy.eyebrow}
                  </div>
                  <h2
                    id="waitlist-title"
                    className="mt-3 font-display text-[24px] font-semibold leading-[1.1] tracking-tight text-white sm:text-[26px]"
                  >
                    {copy.headline}
                  </h2>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-white/60 sm:text-[14px]">
                    {copy.subhead}
                  </p>

                  <form onSubmit={onSubmit} className="mt-6 space-y-3.5">
                    <Field
                      ref={firstFieldRef}
                      label="Full name"
                      value={form.name}
                      onChange={(v) => update("name", v)}
                      autoComplete="name"
                      required
                    />
                    <Field
                      label="Work email"
                      type="email"
                      value={form.work_email}
                      onChange={(v) => update("work_email", v)}
                      autoComplete="email"
                      required
                    />
                    <Field
                      label="Company / Organization"
                      value={form.company}
                      onChange={(v) => update("company", v)}
                      autoComplete="organization"
                      required
                    />
                    <Field
                      label="Role"
                      value={form.role}
                      onChange={(v) => update("role", v)}
                      placeholder="e.g. Head of Claims, COO"
                      autoComplete="organization-title"
                    />
                    <SelectField
                      label="Approx. monthly claim volume"
                      value={form.monthly_claim_volume}
                      onChange={(v) => update("monthly_claim_volume", v)}
                      options={VOLUME_OPTIONS as readonly string[]}
                      placeholder="Select a range"
                    />

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
                      className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14.5px] font-semibold text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(13,153,255,0.55)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                      {state.phase === "submitting" ? (
                        <>
                          <Spinner />
                          Submitting…
                        </>
                      ) : (
                        <>
                          Join the waitlist
                          <Arrow />
                        </>
                      )}
                    </button>

                    <p className="pt-1 text-center text-[11.5px] leading-relaxed text-white/40">
                      We&rsquo;ll only use this to reach out about the pilot. No drip emails.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}

const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, value, onChange, type = "text", placeholder, autoComplete, required },
  ref,
) {
  return (
    <label className="block">
      <span className="mb-1.5 inline-block font-mono text-[10.5px] uppercase tracking-wider2 text-white/55">
        {label}
        {required ? <span className="ml-0.5 text-accent-cyan">*</span> : null}
      </span>
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-xl border border-white/[0.09] bg-white/[0.03] px-3.5 py-2.5 text-[14px] text-white placeholder:text-white/30 outline-none transition-colors focus:border-accent-cyan/50 focus:bg-white/[0.05]"
      />
    </label>
  );
});

function SelectField(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 inline-block font-mono text-[10.5px] uppercase tracking-wider2 text-white/55">
        {props.label}
      </span>
      <div className="relative">
        <select
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-white/[0.09] bg-white/[0.03] px-3.5 py-2.5 pr-9 text-[14px] text-white outline-none transition-colors focus:border-accent-cyan/50 focus:bg-white/[0.05]"
        >
          <option value="" disabled className="bg-ink-950">
            {props.placeholder || "Select…"}
          </option>
          {props.options.map((opt) => (
            <option key={opt} value={opt} className="bg-ink-950">
              {opt}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </label>
  );
}

function SuccessPanel({ name, onClose }: { name: string; onClose: () => void }) {
  return (
    <div className="py-2 text-center">
      <div
        className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.32) 0%, rgba(13,153,255,0.16) 60%, transparent 80%)",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3 className="font-display text-[22px] font-semibold leading-tight tracking-tight text-white">
        You&rsquo;re on the list{name ? `, ${name.split(" ")[0]}` : ""}.
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-white/65">
        We&rsquo;ve got your details. Someone from the team will reach out personally when we&rsquo;re ready for your operation — usually within a week.
      </p>
      <div className="mt-2 text-[12.5px] text-white/45">
        A confirmation email is on its way.
      </div>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-medium text-white/85 glass transition-all hover:border-white/20 hover:text-white"
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
