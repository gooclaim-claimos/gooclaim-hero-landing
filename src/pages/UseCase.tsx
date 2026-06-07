import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageShell from "@/components/PageShell";
import SEOHead from "@/components/SEOHead";
import { buildUseCaseSEO } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured";
import { viewportOnce, viewportItem } from "@/lib/motion";
import { USE_CASES, type UseCaseData } from "@/data/useCases";

const CALENDLY = "https://calendly.com/contact-gooclaim/30min";

export default function UseCase() {
  const { slug } = useParams<{ slug: string }>();
  const data = USE_CASES.find((u) => u.slug === slug);

  if (!data) return <Navigate to="/" replace />;

  return (
    <PageShell>
      <SEOHead
        seo={buildUseCaseSEO(data.slug, data.label)}
        path={`/use-cases/${data.slug}`}
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Use cases", path: "/" },
          { name: data.label, path: `/use-cases/${data.slug}` },
        ])}
      />
      <UseCaseBody data={data} />
    </PageShell>
  );
}

function UseCaseBody({ data }: { data: UseCaseData }) {
  return (
    <section className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-16 pt-10 sm:px-10 sm:pb-24 sm:pt-20 lg:px-14">
      {/* Hero */}
      <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <div>
          <div className="mb-3 font-mono text-[11px] uppercase tracking-wider2 text-white/45">
            {data.eyebrow}
          </div>
          <h1 className="text-balance font-display text-[34px] font-semibold leading-[1.05] tracking-tightest text-white sm:text-[56px] sm:leading-[1] lg:text-[76px]">
            {data.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-balance text-[16px] leading-relaxed text-white/65 sm:text-[17.5px]">
            {data.heroIntro}
          </p>

          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14.5px] font-semibold text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(13,153,255,0.55)]"
            >
              Talk to us for {data.label}
              <ArrowRight />
            </a>
            <Link
              to="/demo"
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold text-white/85 glass transition-all duration-300 hover:text-white hover:border-white/20"
            >
              Or see a live demo
              <ArrowRight />
            </Link>
          </div>

          {/* Trust chips */}
          <div className="mt-9 flex flex-wrap items-center gap-2.5 sm:gap-3">
            {data.trustChips.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11.5px] text-white/75 glass"
              >
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{
                    background: c.hue,
                    boxShadow: `0 0 8px ${c.hue}cc`,
                  }}
                />
                {c.label}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Problem stat card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl glass-strong p-7 sm:p-9"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
            style={{ background: `${data.problemStat.hue}40` }}
          />
          <div className="relative z-10">
            <div
              className="font-mono text-[10.5px] uppercase tracking-wider2"
              style={{ color: data.problemStat.hue }}
            >
              The problem · in one number
            </div>
            <div
              className="mt-4 font-display text-[58px] font-semibold leading-[0.95] tracking-tightest sm:text-[78px]"
              style={{ color: data.problemStat.hue }}
            >
              {data.problemStat.big}
            </div>
            <div className="mt-3 text-[14.5px] leading-relaxed text-white/65 sm:text-[15px]">
              {data.problemStat.caption}
            </div>
            <p className="mt-6 text-[13.5px] leading-relaxed text-white/55 sm:text-[14px]">
              {data.problemBody}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider2 text-white/40">
              <span className="h-px w-6 bg-white/20" /> {data.problemSource}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Capabilities — what Gooclaim OS does for this vertical */}
      <div className="mt-24 sm:mt-28">
        <div className="mb-10 flex items-center gap-3">
          <span className="h-px flex-1 bg-white/10" />
          <div className="font-mono text-[10.5px] uppercase tracking-wider2 text-white/45">
            What Gooclaim OS does for {data.label}
          </div>
          <span className="h-px flex-1 bg-white/10" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {data.capabilities.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportItem}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: (i % 3) * 0.06,
              }}
              className="group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/15 sm:p-7"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-50 blur-3xl transition-opacity duration-700 group-hover:opacity-90"
                style={{ background: `${c.hue}33` }}
              />
              <div
                aria-hidden
                className="absolute left-0 top-7 h-10 w-[3px] rounded-r"
                style={{
                  background: c.hue,
                  boxShadow: `0 0 16px ${c.hue}88`,
                }}
              />
              <div className="relative z-10">
                <h3 className="font-display text-[18px] font-semibold leading-tight tracking-tight text-white sm:text-[19px]">
                  {c.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-white/65 sm:text-[14px]">
                  {c.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Who it's for */}
      <div className="mt-24 sm:mt-28">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-wider2 text-white/45">
              Who this is for
            </div>
            <h2 className="mt-3 font-display text-[28px] font-semibold leading-[1.1] tracking-tighter text-white sm:text-[36px]">
              Three people own this in your org.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
              Gooclaim OS shows up first for these roles — but the platform
              serves the entire claim chain.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:gap-4">
            {data.personas.map((p, i) => (
              <motion.div
                key={p.role}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportItem}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.08,
                }}
                className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition-colors hover:border-white/15"
              >
                <div className="font-display text-[15.5px] font-semibold leading-tight tracking-tight text-white">
                  {p.role}
                </div>
                <p className="mt-2 text-[12.5px] leading-relaxed text-white/55">
                  {p.why}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

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
            <h3 className="text-balance font-display text-[30px] font-semibold leading-[1.05] tracking-tightest text-white sm:text-[44px]">
              {data.closingTitle}
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/65 sm:text-[16px]">
              {data.closingBody}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14.5px] font-semibold text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(13,153,255,0.55)]"
            >
              Talk to us for {data.label}
              <ArrowRight />
            </a>
            <a
              href="mailto:contact@gooclaim.com"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium text-white/80 glass transition-all duration-300 hover:text-white hover:border-white/20"
            >
              contact@gooclaim.com
            </a>
          </div>
        </div>
      </motion.div>

      {/* Sibling use cases */}
      <div className="mt-20">
        <div className="mb-5 font-mono text-[10.5px] uppercase tracking-wider2 text-white/45">
          Other use cases
        </div>
        <div className="flex flex-wrap gap-2.5">
          {USE_CASES.filter((u) => u.slug !== data.slug).map((u) => (
            <Link
              key={u.slug}
              to={`/use-cases/${u.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] px-4 py-2 text-[12.5px] text-white/65 transition-all duration-300 hover:border-white/20 hover:text-white"
            >
              {u.label}
              <ArrowRight />
            </Link>
          ))}
        </div>
      </div>
    </section>
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
