import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionShell from "@/components/SectionShell";

/**
 * Where Orion stops — the question every buyer actually asks.
 *
 * The page said "Orion never decides a claim" in its intro and then showed five
 * features. A reader cannot tell from a feature list whether this thing will
 * message their members at two in the morning, and that is the fear that keeps
 * an AI coworker out of a claims floor.
 *
 * 🔴 Every line below is taken from the service, not written for the page:
 *   - `gooclaim-orion-api/CLAUDE.md` hard rule 4 — "Orion never decides a claim
 *     and never stores it — it reads the record each time."
 *   - `schemas.py` `NextStep` — "A rule over the brief's own facts — never a
 *     model's guess; never approve, reject or pay."
 *   - `proposals.py` — "the agent only PROPOSES; staff accept."
 *   - B14 — Orion suggests who takes or is escalated work, a lead decides;
 *     "ask the member again" signals the claim's own pending-docs run, which
 *     sends its own approved reminder — Orion never writes the member's message.
 *   - `documents.py` — an opening is recorded BEFORE the file is shown.
 *   - hard rule 3 — every AI answer passes L6 first; no policy URL = held.
 *
 * Three bands, not two, because the truth has three states: reading is free,
 * anything that changes work waits for a person, and some things are not a
 * permission anyone can grant.
 */

interface Band {
  key: string;
  /** The band's name — the distinction is carried by words, never by colour. */
  label: string;
  /** The rule that decides what lands in this band. */
  rule: string;
  items: { what: string; note?: string }[];
  hue: string;
  mark: "tick" | "pause" | "cross";
}

const BANDS: Band[] = [
  {
    key: "alone",
    label: "On its own",
    rule: "Reading. Nothing a member or your team sees changes.",
    hue: "#10b981",
    mark: "tick",
    items: [
      {
        what: "Reads the claim fresh, every time",
        note: "Never from a stored copy — and every read is on the audit ledger.",
      },
      { what: "Watches the IRDAI clock on each claim" },
      {
        what: "Opens the member’s uploaded documents",
        note: "The opening is recorded before the file is shown.",
      },
      {
        what: "Answers from your own library",
        note: "Every cited sentence quoted word for word, opened at its page.",
      },
      {
        what: "Works out the next safe step",
        note: "From rules over the claim’s own facts — not a model’s guess.",
      },
    ],
  },
  {
    key: "proposes",
    label: "Proposes · you press",
    rule: "Anything that changes work, or reaches a member.",
    hue: "#f59e0b",
    mark: "pause",
    items: [
      {
        what: "Who should take this claim",
        note: "Orion suggests from your own staff list. A lead decides.",
      },
      { what: "Escalating it" },
      {
        what: "Asking the member again",
        note: "Even then Orion does not write the message — the claim’s own approved reminder goes out.",
      },
      {
        what: "Every suggestion arrives with its evidence",
        note: "The facts it rests on, and where in the claim each one came from.",
      },
    ],
  },
  {
    key: "never",
    label: "Never",
    rule: "Not a permission you can switch on.",
    hue: "#F26D6D",
    mark: "cross",
    items: [
      { what: "Deciding the claim" },
      { what: "Approving, rejecting or paying" },
      {
        what: "Talking to your members",
        note: "Orion is for your staff. Members are answered by the platform, on their own channels.",
      },
    ],
  },
];

function Mark({ kind, hue }: { kind: Band["mark"]; hue: string }) {
  const common = {
    width: 11,
    height: 11,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: hue,
    strokeWidth: 3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (kind === "tick") return <svg {...common}><polyline points="20 6 9 17 4 12" /></svg>;
  if (kind === "pause")
    return (
      <svg {...common}>
        <line x1="9" y1="5" x2="9" y2="19" />
        <line x1="15" y1="5" x2="15" y2="19" />
      </svg>
    );
  return (
    <svg {...common}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

function BandColumn({ band, index }: { band: Band; index: number }) {
  // 🔴 The ref goes on a plain element, never on the `motion.div`. framer-motion
  // forwards a ref a tick late, so `useInView`'s effect — whose deps never
  // change — runs against a null node, observes nothing, and the column sits at
  // opacity 0 for ever with no error anywhere. Every other section on this site
  // attaches it to a plain DOM node for the same reason.
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.25 });

  return (
    <div ref={ref} className="flex">
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={seen ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex w-full flex-col rounded-2xl border bg-white/[0.02] p-6 sm:p-7"
      style={{ borderColor: `${band.hue}2e` }}
    >
      {/* the band's own colour, as a rule along the top rather than a wash */}
      <span
        aria-hidden
        className="absolute left-6 right-6 top-0 h-px sm:left-7 sm:right-7"
        style={{ background: `linear-gradient(90deg, ${band.hue} 0%, transparent 85%)` }}
      />

      <div className="flex items-center gap-2.5">
        <span
          className="inline-flex h-6 w-6 items-center justify-center rounded-full"
          style={{ background: `${band.hue}1f`, border: `1px solid ${band.hue}55` }}
        >
          <Mark kind={band.mark} hue={band.hue} />
        </span>
        <h3
          className="font-display text-[11px] uppercase tracking-wider2"
          style={{ color: band.hue }}
        >
          {band.label}
        </h3>
      </div>

      <p className="mt-3 text-[14px] leading-relaxed text-white/75">{band.rule}</p>

      <ul className="mt-6 space-y-4">
        {band.items.map((it, i) => (
          <motion.li
            key={it.what}
            initial={{ opacity: 0, y: 10 }}
            animate={seen ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.45,
              delay: index * 0.12 + 0.2 + i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-start gap-3"
          >
            <span className="mt-[5px] shrink-0">
              <Mark kind={band.mark} hue={`${band.hue}cc`} />
            </span>
            <span>
              <span className="block text-[14px] leading-snug text-white/90">{it.what}</span>
              {it.note ? (
                <span className="mt-1 block text-[12.5px] leading-relaxed text-white/45">
                  {it.note}
                </span>
              ) : null}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
    </div>
  );
}

export default function OrionLine({ eyebrow = "Where the line is" }: { eyebrow?: string } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.3 });

  return (
    <SectionShell
      id="the-line"
      eyebrow={eyebrow}
      title={
        <>
          Orion never decides a claim.{" "}
          <span className="text-white/55">Here is exactly where it stops.</span>
        </>
      }
      intro="An AI that can act on a claims floor is only useful if everyone knows what it will not do. These are not settings — they are how Orion is built, and the third column is not a permission anyone can grant."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        {BANDS.map((b, i) => (
          <BandColumn key={b.key} band={b} index={i} />
        ))}
      </div>

      {/* The gate that sits over all three, and what it does when it cannot be reached. */}
      <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={seen ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-7"
      >
        <div className="flex items-center gap-3 sm:shrink-0">
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ background: "rgba(13,153,255,0.14)", border: "1px solid rgba(13,153,255,0.35)" }}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0d99ff"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </span>
          <span className="font-display text-[11px] uppercase tracking-wider2 text-white/45">
            Over all three
          </span>
        </div>
        <p className="text-[14.5px] leading-relaxed text-white/75">
          <span className="font-semibold text-white">
            Every Orion answer passes the Policy Gate before a word reaches your staff.
          </span>{" "}
          If the gate cannot be reached, the answer is held — not shown anyway.
        </p>
      </motion.div>
      </div>
    </SectionShell>
  );
}
