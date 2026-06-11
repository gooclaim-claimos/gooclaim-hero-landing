import { useEffect } from "react";
import { motion } from "framer-motion";
import PageShell from "@/components/PageShell";
import SEOHead from "@/components/SEOHead";
import { SEO_DEMO } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { openWaitlist } from "@/lib/waitlist";

const AGENDA = [
  {
    n: "01",
    t: "Your operation, mapped",
    b: "We talk through your claim volume, channels, CMS, and the moments your team is spending the most time on.",
    hue: "#0d99ff",
  },
  {
    n: "02",
    t: "Live walkthrough of Gooclaim OS",
    b: "Real workflows on real channels — WhatsApp, voice, email — wired into a sample CMS. No slides.",
    hue: "#7dc4ff",
  },
  {
    n: "03",
    t: "Compliance + audit posture",
    b: "How the policy gate, audit ledger, IRDAI exports and DPDP consent flows work in practice.",
    hue: "#10b981",
  },
  {
    n: "04",
    t: "What a pilot looks like for you",
    b: "Bounded 4–8 week pilot proposal — workflows, channels, success metrics — co-designed live.",
    hue: "#f59e0b",
  },
];

const PREP = [
  "Your current claim communication channels (WhatsApp, voice, email, portal).",
  "Approximate monthly claim volume.",
  "Which CMS / TPA platform you operate on.",
  "One workflow you'd most want to automate first.",
];

const TIMELINE = [
  { time: "0 – 5 min", label: "Your operation, mapped" },
  { time: "5 – 20 min", label: "Live walkthrough of Gooclaim OS" },
  { time: "20 – 25 min", label: "Compliance + audit posture" },
  { time: "25 – 30 min", label: "Pilot proposal for your team" },
];

export default function Demo() {
  useEffect(() => {
    document.title = "Book a demo · Gooclaim OS";
  }, []);

  return (
    <PageShell>
      <SEOHead
        seo={SEO_DEMO}
        path="/demo"
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Book a demo", path: "/demo" },
        ])}
      />
      <section className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-16 pt-10 sm:px-10 sm:pb-24 sm:pt-20 lg:px-14">
        {/* Hero */}
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider2 text-white/60 glass">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-accent-cyan opacity-70 blur-[2px] animate-pulse-soft" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-cyan" />
              </span>
              30-minute walkthrough · live demo
            </div>
            <h1 className="text-balance font-display text-[34px] font-semibold leading-[1.05] tracking-tightest text-white sm:text-[56px] sm:leading-[1] lg:text-[80px]">
              See Gooclaim OS{" "}
              <span className="text-gradient-cyan">in your shoes.</span>
            </h1>
            <p className="mt-6 max-w-xl text-balance text-[16px] leading-relaxed text-white/65 sm:text-[18px]">
              No deck. We&rsquo;ll wire a sample workflow against a sample CMS,
              walk through how your team would use it, and end with a pilot
              proposal scoped to your operation.
            </p>

            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
              <button
                type="button"
                onClick={() => openWaitlist("demo-hero")}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14.5px] font-semibold text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(13,153,255,0.55)]"
              >
                Join the waitlist
                <ArrowRight />
              </button>
              <a
                href="mailto:contact@gooclaim.com"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium text-white/85 glass transition-all duration-300 hover:text-white hover:border-white/20"
              >
                contact@gooclaim.com
              </a>
            </div>

            {/* Trust strip */}
            <div className="mt-10 flex flex-wrap items-center gap-2.5 sm:gap-3">
              {[
                "IRDAI 3-hour TAT",
                "DPDP consent gate",
                "Audit ledger · SHA-256",
              ].map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11.5px] text-white/70 glass"
                >
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full bg-accent-cyan"
                  />
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Premium showcase card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl glass-strong p-7 sm:p-9"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(13,153,255,0.35) 0%, rgba(124,58,237,0.18) 50%, transparent 80%)",
              }}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10.5px] uppercase tracking-wider2 text-accent-cyan">
                  Live demo · what you&rsquo;ll see
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider2 text-white/40">
                  ~30 min
                </span>
              </div>
              <h3 className="mt-4 font-display text-[26px] font-semibold leading-[1.1] tracking-tight text-white sm:text-[28px]">
                Real workflows. Real channels. Sample CMS.
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/60 sm:text-[14.5px]">
                You&rsquo;ll see the OS handling claim queries end-to-end —
                CMS lookup, knowledge retrieval, template rendering, policy
                gate, audit event. All live.
              </p>

              <ol className="relative mt-6 space-y-3 pl-6">
                {/* Timeline rail */}
                <span
                  aria-hidden
                  className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(125,196,255,0.5) 0%, rgba(13,153,255,0.35) 50%, rgba(124,58,237,0.3) 100%)",
                  }}
                />
                {TIMELINE.map((t, i) => (
                  <li key={t.time} className="relative">
                    <span
                      aria-hidden
                      className="absolute left-[-22px] top-1.5 inline-block h-3 w-3 rounded-full bg-ink-950"
                      style={{
                        border: "2px solid #7dc4ff",
                        boxShadow: "0 0 10px rgba(125,196,255,0.7)",
                      }}
                    />
                    <div className="font-mono text-[10.5px] uppercase tracking-wider2 text-accent-cyan">
                      {t.time}
                    </div>
                    <div className="mt-0.5 text-[13.5px] font-medium leading-snug text-white/85">
                      {t.label}
                    </div>
                    {i < TIMELINE.length - 1 && (
                      <span className="sr-only"> · then</span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>

        {/* Agenda — what we'll cover */}
        <div className="mt-24 sm:mt-28">
          <div className="mb-10 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <div className="font-mono text-[10.5px] uppercase tracking-wider2 text-white/45">
              What we&rsquo;ll cover
            </div>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <motion.div
            variants={stagger(0.06, 0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          >
            {AGENDA.map((a) => (
              <motion.article
                key={a.n}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/15"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-50 blur-3xl transition-opacity duration-700 group-hover:opacity-90"
                  style={{ background: `${a.hue}33` }}
                />
                <div className="relative z-10">
                  <div
                    className="font-mono text-[11px] uppercase tracking-wider2"
                    style={{ color: a.hue }}
                  >
                    {a.n}
                  </div>
                  <h4 className="mt-3 font-display text-[18px] font-semibold leading-tight tracking-tight text-white sm:text-[19px]">
                    {a.t}
                  </h4>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-white/60 sm:text-[13.5px]">
                    {a.b}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* What to have ready */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16"
        >
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-wider2 text-white/45">
              Optional · helps us prep
            </div>
            <h2 className="mt-3 font-display text-[28px] font-semibold leading-[1.1] tracking-tighter text-white sm:text-[36px]">
              A few things to have handy.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
              Nothing required — we can run a great demo with zero prep. But
              if you can share these in the booking email, we&rsquo;ll arrive
              already tuned to your operation.
            </p>
          </div>
          <ul className="space-y-3 text-[14.5px] leading-relaxed text-white/70">
            {PREP.map((line) => (
              <li
                key={line}
                className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3"
              >
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan"
                  style={{ boxShadow: "0 0 8px rgba(125,196,255,0.7)" }}
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-24 overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-12 lg:p-16"
          style={{
            background:
              "linear-gradient(135deg, rgba(13,153,255,0.10) 0%, rgba(124,58,237,0.06) 60%, rgba(7,10,18,0.4) 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 -bottom-32 h-[420px] w-[420px] rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(13,153,255,0.4) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
            <div>
              <h3 className="text-balance font-display text-[30px] font-semibold leading-[1] tracking-tightest text-white sm:text-[44px]">
                Get on the list.{" "}
                <span className="text-white/55">We&rsquo;ll take it from there.</span>
              </h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/65 sm:text-[16px]">
                Drop your details and we&rsquo;ll reach out personally when
                we&rsquo;re ready for your operation — usually within a week.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col">
              <button
                type="button"
                onClick={() => openWaitlist("demo-footer")}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14.5px] font-semibold text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(13,153,255,0.55)]"
              >
                Join the waitlist
                <ArrowRight />
              </button>
              <a
                href="mailto:contact@gooclaim.com"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium text-white/80 glass transition-all duration-300 hover:text-white hover:border-white/20"
              >
                contact@gooclaim.com
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </PageShell>
  );
}

function ArrowRight() {
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
    >
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}
