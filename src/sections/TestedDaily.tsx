import { motion } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

/**
 * Tested every day — checked against gooclaim-tenant-config (November 2026):
 * `services/scheduled_tests.py` starts the customer's test suite twice a day on
 * a schedule and again after every release; `services/messaging_test.py` plays
 * each test on the voice path and on every active messaging channel, and a
 * channel that cannot be tested yet is shown as such, never faked. Tests run
 * after a change, they do not block it — so the copy says failures are shown to
 * the team, not that nothing broken can ever reach a member.
 */

const POINTS = [
  {
    title: "Twice a day",
    body: "A set of test conversations runs on a schedule, on every active channel — voice and each messaging tool.",
    hue: "#0d99ff",
  },
  {
    title: "After every release",
    body: "Each new version of Gooclaim OS replays the same tests on your own setup as soon as it goes out.",
    hue: "#10b981",
  },
  {
    title: "Every failure, explained",
    body: "A failed test shows your team what was asked, what the agent answered and what it should have said.",
    hue: "#f59e0b",
  },
];

export default function TestedDaily({ eyebrow = "Quality" }: { eyebrow?: string } = {}) {
  return (
    <SectionShell
      id="tested"
      eyebrow={eyebrow}
      title={
        <>
          Tested every day.{" "}
          <span className="text-white/55">On every channel.</span>
        </>
      }
      intro="An AI agent that talks to members has to be checked all the time, not once at launch. Gooclaim OS tests itself on your own claims, so a change that breaks an answer shows up in your test results the same day."
    >
      <motion.ul
        variants={stagger(0.06, 0.07)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-3 md:grid-cols-3"
      >
        {POINTS.map((p) => (
          <motion.li key={p.title} variants={fadeUp} className="relative overflow-clip rounded-2xl p-5 glass">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-50 blur-3xl"
              style={{ background: `${p.hue}33` }}
            />
            <span className="relative z-10 block font-display text-[17px] font-semibold tracking-tight text-white">
              {p.title}
            </span>
            <span className="relative z-10 mt-1 block text-[13.5px] leading-relaxed text-white/60">{p.body}</span>
          </motion.li>
        ))}
      </motion.ul>
    </SectionShell>
  );
}
