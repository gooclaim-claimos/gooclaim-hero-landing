import { ORION_QUEUE } from "@/data/sampleClaim";
import { t } from "./theme";

const { overdue: OVERDUE, complaint: COMPLAINT, held: HELD } = ORION_QUEUE;

/** The claim the claim-room demo works on. */
export const ROOM_CLAIM = OVERDUE;

export const PULSE = [
  { title: `${OVERDUE} · Documents still outstanding`, sub: "Reimbursement · 2 of 3 received · reminder 2 sent", clock: "PAST 15 DAYS", note: "₹410 interest est. · India", bg: t.redSoft, c: t.red },
  { title: `${HELD} · Uploaded file held for checking`, sub: "Reimbursement · final bill · awaiting review", clock: "13 DAYS LEFT", note: "Raised automatically", bg: t.amberSoft, c: t.amber },
  { title: `${COMPLAINT} · Open complaint after a decision`, sub: "Rejected · complaint received · resolution due", clock: "12 DAYS LEFT", note: "Needs an owner", bg: t.accSoft, c: t.acc },
];

export const FEATURES = [
  { k: "CORE", title: "Work Pulse", desc: "What needs a person, why, and how long the legal clock has left — not a queue of every claim.", bg: t.surface, kc: t.acc },
  { k: "CORE", title: "Live Claim Brief", desc: "One read of the claim from your record — documents, decision, complaints, what the member was told — each with its source and date.", bg: t.surface, kc: t.acc },
  { k: "CORE", title: "Next Safe Step", desc: "Rules decide the step, Orion explains it with the evidence. Hand over, escalate, ask the member again — a person says yes.", bg: t.surface, kc: t.acc },
  { k: "CORE", title: "Ask Orion", desc: "Questions answered from your own policy library, every sentence quoted word for word and opened at the page.", bg: t.surface, kc: t.acc },
  { k: "CORE", title: "Document Desk", desc: "The member’s uploaded files, opened where they are — every opening recorded.", bg: t.surface, kc: t.acc },
  { k: "ALSO IN ORION", title: "Morning brief · Claim watch · Payment status", desc: "The claims that need your team today, the ones starting to slip, and every payment on a claim in one line.", bg: t.alsoBg, kc: t.text3 },
];

export const WORK = [
  { k: "OPENED", text: `${ROOM_CLAIM} in your claims system · read fresh, read-only` },
  { k: "FOUND", text: "Discharge summary outstanding since day 6 · 2 of 3 documents received" },
  { k: "CHECKED", text: "Reminders sent on day 7 and day 14 · no reply from member" },
  { k: "CLOCK", text: "Past the 15-day window · interest estimate running (India)" },
  { k: "SEARCHED", text: "Your staff list · documents queue owner: Priya" },
];

interface LineItem {
  a: string;
  b: string;
}

export const COLS: { k: string; sub: string; dot: string; bg: string; border: string; items: LineItem[] }[] = [
  {
    k: "ON ITS OWN", sub: "Reading. Nothing a member or your team sees changes.", dot: t.acc, bg: t.surface, border: t.border,
    items: [
      { a: "Reads the claim fresh, every time", b: "Never from a stored copy — every read is on the ledger." },
      { a: "Watches the legal clock", b: "On each claim, with time left." },
      { a: "Opens uploaded documents", b: "The opening is recorded before the file is shown." },
      { a: "Works out the next safe step", b: "From rules over the claim’s facts — not a model’s guess." },
    ],
  },
  {
    k: "PROPOSES · YOU PRESS", sub: "Anything that changes work, or reaches a member.", dot: t.amber, bg: t.surface, border: t.border,
    items: [
      { a: "Who should take this claim", b: "Suggested from your staff list. A lead decides." },
      { a: "Escalating it", b: "With the facts it rests on." },
      { a: "Asking the member again", b: "The claim’s own approved reminder goes out." },
      { a: "Every suggestion has evidence", b: "And where in the claim each fact came from." },
    ],
  },
  {
    k: "NEVER", sub: "Not a permission you can switch on.", dot: t.red, bg: t.neverBg, border: t.neverLine,
    items: [
      { a: "Deciding the claim", b: "That stays with your team and your claims system." },
      { a: "Approving, rejecting or paying", b: "Orion reads these — it never changes them." },
      { a: "Talking to your members", b: "Members are answered by the platform, on their own channels." },
    ],
  },
];
