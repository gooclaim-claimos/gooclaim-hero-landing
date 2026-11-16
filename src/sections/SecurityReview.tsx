import { motion } from "framer-motion";
import CTA from "@/components/CTA";
import { openWaitlist } from "@/lib/waitlist";
import { viewportOnce } from "@/lib/motion";

/**
 * For a buyer's security review — insurers and TPAs review security before a
 * demo. The request lands with the team through the same form as a
 * walkthrough (source `security-details`); the team replies with the details.
 * Overview wording only: no certifications are claimed here.
 */
export default function SecurityReview() {
  return (
    <section className="relative w-full px-6 pb-16 sm:px-10 sm:pb-20 lg:px-14">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto flex max-w-[1280px] flex-col items-start gap-6 overflow-clip rounded-3xl p-8 glass sm:p-10 md:flex-row md:items-center md:justify-between"
      >
        <div className="max-w-2xl">
          <span className="font-display text-[11px] uppercase tracking-wider2 text-accent-cyan">Security review</span>
          <h2 className="mt-2 text-balance font-display text-[24px] font-semibold leading-tight tracking-tight text-white sm:text-[30px]">
            Running a security review?
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/60">
            Ask for our security details — how data is protected, where it is hosted and who can reach it. We send them to your team directly.
          </p>
        </div>
        <CTA
          onClick={() =>
            openWaitlist("security-details", {
              eyebrow: "Security review",
              headline: "Request our security details",
              subhead: "Tell us who you are and we will send the details to your team.",
            })
          }
        >
          Request security details
        </CTA>
      </motion.div>
    </section>
  );
}
