import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Job, JobSpec, DaySpec } from "./systemGapData";

/**
 * The six jobs, told by scrolling rather than by hovering.
 *
 * The row-table this replaces showed all six at once and only came alive on
 * hover — so it read as a block of small text, and on a phone it read as
 * nothing at all. Here each job gets the screen to itself as it passes, and
 * the claim stays pinned beside it, lighting the days where that job happens.
 *
 * The content is unchanged: same six jobs, same claim, same days.
 */

/** Which step is centred in the viewport right now. */
function useActiveStep(count: number) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const nodes = refs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    // A band across the middle of the screen: a step is "active" while it
    // crosses it, so the pinned claim changes once per step, not per pixel.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = nodes.indexOf(e.target as HTMLElement);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [count]);

  return { active, refs };
}

/** The claim, held still while the jobs scroll past it. */
function PinnedClaim({ job, days }: { job: JobSpec; days: DaySpec[] }) {
  const lit = days.filter((d) => d.jobs.includes(job.key));
  const litDays = new Set(lit.map((d) => d.day));
  const first = lit[0];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-7">
      <div className="flex items-baseline justify-between">
        <span className="font-display text-[10.5px] uppercase tracking-wider2 text-white/40">
          One claim · 21 days
        </span>
        <span className="font-mono text-[11px] text-white/35">CLM-2487</span>
      </div>

      {/* the days, with this job's days lit */}
      <div className="mt-6 flex items-end justify-between gap-1">
        {days.map((d) => {
          const on = litDays.has(d.day);
          return (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
              <motion.div
                animate={{
                  height: on ? 34 : 12,
                  backgroundColor: on ? job.hue : "rgba(255,255,255,0.14)",
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-full rounded-full"
                style={on ? { boxShadow: `0 0 16px ${job.hue}66` } : undefined}
              />
              <span
                className={`font-mono text-[10px] transition-colors duration-300 ${
                  on ? "text-white/70" : "text-white/25"
                }`}
              >
                {d.day}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-5 h-px w-full bg-white/[0.08]" />

      {/* what actually happened on the first of those days */}
      <motion.div
        key={job.key}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5"
      >
        <div
          className="font-display text-[10.5px] uppercase tracking-wider2"
          style={{ color: `${job.hue}cc` }}
        >
          Day {first?.day} · what Gooclaim OS did
        </div>
        <p className="mt-2 text-[13.5px] leading-relaxed text-white/80">{first?.event}</p>
        <div className="mt-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="text-[12px] text-white/40">
            Your claims system still shows{" "}
            <span className="text-white/60">“{first?.status}”</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function Step({
  job,
  index,
  active,
  innerRef,
}: {
  job: JobSpec;
  index: number;
  active: boolean;
  innerRef: (el: HTMLElement | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      ref={(el) => {
        innerRef(el);
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el as HTMLDivElement | null;
      }}
      className="relative flex min-h-[58vh] flex-col justify-center py-10 md:min-h-[66vh]"
      aria-label={job.issue}
    >
      {/* the number, sitting behind the words */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-2 top-2 select-none font-display text-[108px] font-bold leading-none tracking-tighter transition-colors duration-500 md:text-[132px]"
        style={{ color: active ? `${job.hue}1f` : "rgba(255,255,255,0.035)" }}
      >
        {index + 1}
      </span>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={seen ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <div className="flex items-center gap-2.5">
          <motion.span
            animate={{ scale: active ? 1 : 0.6, opacity: active ? 1 : 0.35 }}
            transition={{ duration: 0.4 }}
            className="h-2 w-2 rounded-full"
            style={{ background: job.hue, boxShadow: `0 0 12px ${job.hue}` }}
          />
          <span className="font-display text-[10.5px] uppercase tracking-wider2 text-white/40">
            Job {index + 1} of 6
          </span>
        </div>

        <h3 className="mt-3 text-balance font-display text-[30px] font-semibold leading-[1.1] tracking-tighter text-white sm:text-[38px]">
          {job.issue}
        </h3>

        {/* what their system does — deliberately the quiet half */}
        <p className="mt-5 max-w-[46ch] text-[14.5px] leading-relaxed text-white/45">
          <span className="mr-1.5 font-display text-[10.5px] uppercase tracking-wider2 text-white/30">
            Your claims system
          </span>
          <br />
          {job.theirs}
        </p>

        {/* what we do — the loud half */}
        <div className="mt-6 max-w-[48ch] border-l-2 pl-5" style={{ borderColor: job.hue }}>
          <span
            className="font-display text-[10.5px] uppercase tracking-wider2"
            style={{ color: `${job.hue}cc` }}
          >
            Gooclaim OS
          </span>
          <p className="mt-1.5 text-[15.5px] leading-relaxed text-white/90">{job.ours}</p>
        </div>
      </motion.div>
    </section>
  );
}

export default function JobsSequence({ jobs, days }: { jobs: JobSpec[]; days: DaySpec[] }) {
  const { active, refs } = useActiveStep(jobs.length);
  const current = jobs[active] ?? jobs[0];

  return (
    <div className="mt-16">
      <h3 className="text-balance font-display text-[26px] font-semibold leading-tight tracking-tighter text-white sm:text-[34px]">
        Six things it was never built to do.{" "}
        <span className="text-white/55">Six jobs Gooclaim OS takes on.</span>
      </h3>

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_0.82fr] md:gap-14">
        {/* the steps */}
        <div className="relative">
          {/* the spine, filling as you go */}
          <div
            aria-hidden
            className="absolute -left-6 top-0 hidden h-full w-px bg-white/[0.07] md:block"
          >
            <motion.div
              className="w-px"
              animate={{
                height: `${((active + 1) / jobs.length) * 100}%`,
                backgroundColor: current.hue,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {jobs.map((j, i) => (
            <Step
              key={j.key}
              job={j}
              index={i}
              active={i === active}
              innerRef={(el) => {
                refs.current[i] = el;
              }}
            />
          ))}
        </div>

        {/* The claim, held still beside the steps.
            Hidden on a phone: without sticky it would land after all six jobs,
            showing one job's days with nothing to tie them to — and the
            timeline above has already shown the claim. */}
        <div className="hidden md:sticky md:top-[18vh] md:block md:h-fit md:self-start">
          <PinnedClaim job={current} days={days} />
          <p className="mt-4 text-[12px] text-white/35">
            The claim does not change. What happens to it does.
          </p>
        </div>
      </div>
    </div>
  );
}

export type { Job };
