import { useEffect, useRef, useState } from "react";
import { Card, Eyebrow, Grid, Section } from "../ui";
import { mono, t } from "../tokens";
import { CLAIM_RUPEES, DAYS, JOB_HUE, JOB_LABEL, LIMIT, RATE, STEP_MS, inr, type Job } from "./indiaData";

/**
 * This claim runs past its 15-day limit, so it is not SAMPLE_CLAIM (that one is
 * 9 days into its clock on Try it) — one claim number, one story.
 */
const TIMELINE_CLAIM = "30524693";

/** What a system of record does — accurate, and not enough — and what Gooclaim OS does instead. */
const GAPS: { key: Job; issue: string; theirs: string; ours: string }[] = [
  { key: "clock", issue: "The legal clock", theirs: "Stores dates. Runs no countdown and cannot say what a late claim is costing.", ours: "Runs the 1-hour, 3-hour and 15-day clocks on every claim, with the interest at stake." },
  { key: "chase", issue: "Missing documents", theirs: "Marks the claim “deficient”. Nothing asks, reminds or escalates.", ours: "Asks for what is owed, reminds on a schedule, and hands it to a person when nobody answers." },
  { key: "queue", issue: "Your team’s work list", theirs: "A list sorted by date. No way to see which claim is closest to its limit.", ours: "Orion puts the claim nearest its limit on top, with the next safe step and its evidence." },
  { key: "member", issue: "The member", theirs: "A row in a table. No channel, no language, no thread.", ours: "Answered on WhatsApp or email, in their language, with the source and date." },
  { key: "gate", issue: "What goes out", theirs: "No check on a message before it reaches a member.", ours: "Approved templates only. Every value is checked against your record before sending." },
  { key: "record", issue: "What was said", theirs: "Logs decisions and field changes — not the words sent to the member.", ours: "Every message on a tamper-evident ledger, with its source and date." },
];

function JobChip({ job }: { job: Job }) {
  const hue = JOB_HUE[job];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: 999, border: `1px solid ${hue}55`, background: `${hue}14`, color: hue, fontFamily: mono, fontSize: 9.5, letterSpacing: ".06em", textTransform: "uppercase" }}>
      {JOB_LABEL[job]}
    </span>
  );
}

function Row({ k, v, muted }: { k: string; v: string; muted?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, padding: "10px 0", borderBottom: `1px solid ${t.border}` }}>
      <span style={{ fontSize: 12, color: t.text3 }}>{k}</span>
      <span style={{ fontSize: 13, textAlign: "right", color: muted ? t.text3 : t.text }}>{v}</span>
    </div>
  );
}

/** The sample claim, day by day. Plays once when it comes into view; a tap on a day takes over. */
function ClaimTimeline() {
  const ref = useRef<HTMLDivElement | null>(null);
  const touched = useRef(false);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || touched.current) return;
        io.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setStep(DAYS.length - 1);
        else setPlaying(true);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setStep((s) => {
        if (s >= DAYS.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [playing]);

  const d = DAYS[step];
  const late = d.day > LIMIT;
  const left = LIMIT - d.day;
  const clockHue = late ? t.red : left <= 5 ? t.amber : t.green;
  const interest = late ? (CLAIM_RUPEES * RATE * d.day) / 365 : 0;
  const shown = DAYS.slice(0, step + 1).reverse();
  const go = (i: number) => {
    touched.current = true;
    setPlaying(false);
    setStep(i);
  };

  return (
    <div ref={ref}>
      <Card style={{ padding: "clamp(20px, 3vw, 32px)", borderRadius: 24 }}>
        <div role="tablist" aria-label="Days of the sample claim" style={{ display: "flex", justifyContent: "space-between", gap: 4, position: "relative" }}>
          {DAYS.map((x, i) => {
            const on = i === step;
            const past = i <= step;
            return (
              <button key={x.day} type="button" role="tab" aria-selected={on} onClick={() => go(i)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "6px 0", border: "none", background: "none", color: t.text, font: "inherit", cursor: "pointer" }}>
                <span style={{ width: on ? 14 : 10, height: on ? 14 : 10, borderRadius: 999, background: past ? (x.day > LIMIT ? t.red : t.brand) : t.border, boxShadow: on ? `0 0 0 5px ${t.brandSoft}` : "none", transition: "all .3s" }} />
                <span style={{ fontSize: 11, color: on ? t.text : t.text3 }}>Day {x.day}</span>
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 24 }}>
          <Grid min={300} gap={16}>
            <div style={{ padding: 20, borderRadius: 18, border: `1px solid ${t.border}`, background: t.surface2 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <Eyebrow color={t.text3} style={{ fontSize: 11 }}>Your claims system</Eyebrow>
                <span style={{ fontSize: 11, color: t.text3 }}>Day {d.day}</span>
              </div>
              <div style={{ marginTop: 12 }}>
                <Row k="Claim" v={TIMELINE_CLAIM} />
                <Row k="Status" v={d.status} />
                <Row k="Deficiency" v={d.deficiency ?? "—"} muted={!d.deficiency} />
                <Row k="Next action" v="—" muted />
                <Row k="Member last told" v="—" muted />
                <Row k="Interest owed" v="Not computed" muted />
              </div>
              <p style={{ margin: "14px 0 0", fontSize: 13, color: t.text2 }}>
                {late ? "The claim is overdue. Nothing in the system says so." : d.day === 0 ? "Correct, and complete for what it was built to do." : "Every field is correct. Nothing in it moves the claim."}
              </p>
            </div>

            <div style={{ padding: 20, borderRadius: 18, border: `1px solid ${t.brandLine}`, background: t.brandSoft }}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                <Eyebrow style={{ fontSize: 11 }}>With Gooclaim OS</Eyebrow>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 999, background: t.surface, fontSize: 12, color: clockHue, fontWeight: 600 }}>
                    <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: 999, background: clockHue }} />
                    {late ? `Overdue by ${d.day - LIMIT} ${d.day - LIMIT === 1 ? "day" : "days"}` : `${left} days left of ${LIMIT}`}
                  </span>
                  <span style={{ padding: "4px 10px", borderRadius: 999, border: `1px solid ${t.border}`, background: t.surface, fontSize: 12, color: t.text2 }}>{late ? `${inr(interest)} interest owed` : "No interest if settled in time"}</span>
                </div>
              </div>
              <ul aria-label="What Gooclaim OS did, newest first" style={{ listStyle: "none", margin: "14px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 10, maxHeight: 280, overflowY: "auto" }}>
                {shown.map((x, i) => (
                  <li key={x.day} style={{ padding: "12px 14px", borderRadius: 14, background: t.surface, border: `1px solid ${t.border}`, opacity: i === 0 ? 1 : 0.72, animation: i === 0 ? "lg-in .4s ease-out" : undefined }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6 }}>
                      <span style={{ marginRight: 4, fontSize: 11, fontWeight: 600, color: t.text2 }}>Day {x.day}</span>
                      {x.jobs.map((j) => (
                        <JobChip key={j} job={j} />
                      ))}
                    </div>
                    <p style={{ margin: "6px 0 0", fontSize: 13 }}>{x.event}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
        </div>
        <div style={{ marginTop: 14, fontSize: 11, color: t.text3 }}>Sample reimbursement of ₹1,00,000 · interest at RBI bank rate 5.75% + 2% a year from intimation · illustrative</div>
      </Card>
      <style>{"@keyframes lg-in{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}"}</style>
    </div>
  );
}

export default function IndiaSystemGap() {
  return (
    <Section id="system-gap" eyebrow="02 · Why your system can’t fix it" title="Your claims system records the claim." muted="Gooclaim OS moves it." intro="Keep the system you have — it stays the source of truth. Gooclaim OS reads it and never writes to it. What it adds is everything that has to happen between the steps.">
      <ClaimTimeline />
      <div style={{ marginTop: 24 }}>
        <Grid min={340} gap={12}>
          {GAPS.map((g) => (
            <Card key={g.key} style={{ padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{g.issue}</div>
                <JobChip job={g.key} />
              </div>
              <p style={{ margin: "10px 0 0", fontSize: 13, color: t.text3 }}>
                <b style={{ fontWeight: 600 }}>Your system:</b> {g.theirs}
              </p>
              <p style={{ margin: "8px 0 0", fontSize: 14 }}>
                <b style={{ fontWeight: 600, color: t.brand }}>Gooclaim OS:</b> {g.ours}
              </p>
            </Card>
          ))}
        </Grid>
      </div>
    </Section>
  );
}
