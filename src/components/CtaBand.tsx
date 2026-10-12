import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CTA from "@/components/CTA";
import { openWaitlist } from "@/lib/waitlist";
import { viewportOnce } from "@/lib/motion";

/** The close of a product page: one ask, one place to go next. */
export default function CtaBand({
  source,
  next,
}: {
  source: string;
  next?: { label: string; to: string };
}) {
  return (
    <section className="relative w-full px-6 pb-24 sm:px-10 sm:pb-32 lg:px-14">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-[1280px] overflow-clip rounded-3xl p-10 text-center glass-strong sm:p-14"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(13,153,255,0.35) 0%, rgba(124,58,237,0.15) 50%, transparent 75%)" }}
        />
        <div className="relative z-10">
          <h2 className="mx-auto max-w-2xl text-balance font-display text-[30px] font-semibold leading-[1.08] tracking-tighter text-white sm:text-[44px]">
            See Gooclaim OS on a real claim.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-relaxed text-white/60">
            A 30-minute walkthrough — real workflows on real channels, wired to a sample claims system. No slides.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <CTA onClick={() => openWaitlist(source)}>Join the waitlist</CTA>
            {next && (
              <Link
                to={next.to}
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold text-white/85 glass transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:text-white"
              >
                {next.label}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
