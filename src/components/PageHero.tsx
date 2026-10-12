import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CTA from "@/components/CTA";
import { openWaitlist } from "@/lib/waitlist";

/** The opening of a product page (Platform, Orion, Security): the same
 *  type scale as the home hero, the same two calls to action. */
export default function PageHero({
  eyebrow,
  title,
  intro,
  source,
  secondary,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  /** The waitlist's `source`, so we know which page a lead came from. */
  source: string;
  secondary?: { label: string; to: string };
  children?: ReactNode;
}) {
  return (
    <section className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-10 pt-10 sm:px-10 sm:pb-16 sm:pt-20 lg:px-14">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-display text-[13px] text-white/70 glass">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-accent-cyan opacity-70 blur-[2px] animate-pulse-soft" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-cyan" />
          </span>
          {eyebrow}
        </div>
        <h1 className="text-balance font-display text-[38px] font-semibold leading-[1.04] tracking-tightest text-white sm:text-[56px] lg:text-[76px]">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/65 sm:text-[18px]">{intro}</p>
        <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
          <CTA onClick={() => openWaitlist(source)}>Join the waitlist</CTA>
          {secondary && (
            <Link
              to={secondary.to}
              className="group inline-flex min-h-[44px] items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold text-white/85 glass transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:text-white"
            >
              {secondary.label}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                &rarr;
              </span>
            </Link>
          )}
        </div>
        {children}
      </motion.div>
    </section>
  );
}
