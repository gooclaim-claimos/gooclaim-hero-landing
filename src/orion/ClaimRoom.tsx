import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useSeen } from "@/site/useAutoplay";
import { ROOM_CLAIM, WORK } from "./data";
import { mono, t } from "./theme";

type Phase = "idle" | "working" | "card";
type Decision = "accepted" | "held" | null;

const STEP_MS = 850;

/** 02 · Orion shows its working, then asks. */
export default function ClaimRoom() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [shown, setShown] = useState(0);
  const [decision, setDecision] = useState<Decision>(null);
  const timers = useRef<number[]>([]);
  const roomRef = useRef<HTMLDivElement>(null);
  const seen = useSeen(roomRef);

  const clear = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };
  useEffect(() => clear, []);

  const run = () => {
    clear();
    setPhase("working");
    setShown(0);
    setDecision(null);
    for (let i = 1; i <= WORK.length; i++) timers.current.push(window.setTimeout(() => setShown(i), i * STEP_MS));
    timers.current.push(window.setTimeout(() => setPhase("card"), (WORK.length + 1) * STEP_MS));
  };
  // Plays once by itself when the room scrolls into view; the visitor can
  // run it again. Reduced motion: it waits for the button.
  useEffect(() => {
    if (seen && !prefersReducedMotion()) run();
    // Only on first sight: `run` is recreated each render on purpose.
  }, [seen]);

  const reset = () => {
    clear();
    setPhase("idle");
    setShown(0);
    setDecision(null);
  };

  return (
    <section id="claim-room" style={{ maxWidth: 1240, margin: "0 auto", padding: "96px 24px 40px" }}>
      <div style={{ borderRadius: 28, padding: "clamp(20px, 4vw, 48px)", background: t.panel, display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center" }}>
        <div style={{ flex: "1 1 340px", minWidth: 0 }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: ".08em", color: t.acc }}>02 · WATCH IT WORK</div>
          <h2 style={{ margin: "14px 0 0", fontSize: "clamp(30px, 3.6vw, 46px)", lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.04em" }}>Orion shows its working. Then asks.</h2>
          <p style={{ margin: "14px 0 0", color: t.text2, fontSize: 16 }}>
            Every claim it opens and every search it runs appears as it happens. The action it prepares sits there until a person presses it — and the ledger records who did.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20, fontSize: 14 }}>
            <span>✓&nbsp; You can check the work, not just the answer</span>
            <span>✓&nbsp; The action waits, visibly</span>
            <span>✓&nbsp; Accepting runs your own hand-over path</span>
          </div>
        </div>
        <div ref={roomRef} style={{ flex: "1.2 1 440px", minWidth: 0, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 22, padding: 20, boxShadow: t.cardShadow }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <b style={{ fontWeight: 600 }}>Orion · Claim room</b>
            <span style={{ fontFamily: mono, fontSize: 11, color: t.text3 }}>SAMPLE DATA</span>
          </div>
          <div style={{ marginTop: 14, padding: "12px 14px", borderRadius: 14, background: t.btnBg, color: t.btnText, fontSize: 14 }}>Why is {ROOM_CLAIM} still open, and who should take it?</div>
          {phase === "idle" && (
            <button type="button" onClick={run} style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 20px", borderRadius: 999, border: "none", background: t.acc, color: t.accOn, font: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 5v14l12-7z" />
              </svg>
              Ask Orion
            </button>
          )}
          <div aria-live="polite" style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 12 }}>
            {WORK.slice(0, shown).map((w, i) => {
              const live = phase === "working" && i === shown - 1;
              return (
                <div key={w.k} className="gc-row-in" style={{ display: "flex", gap: 10, alignItems: "center", padding: "7px 0", fontSize: 13 }}>
                  <span style={{ flex: "none", width: 14, display: "flex", justifyContent: "center", color: live ? t.acc : t.text3 }}>
                    {live ? <span className="gc-spin" style={{ width: 12, height: 12 }} /> : <span className="gc-pop">✓</span>}
                  </span>
                  <span style={{ flex: "none", fontFamily: mono, fontSize: 10, padding: "3px 7px", borderRadius: 6, background: t.surface2, color: t.text2 }}>{w.k}</span>
                  <span style={{ color: t.text }}>{w.text}</span>
                </div>
              );
            })}
          </div>
          {phase === "working" && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: t.acc, padding: "6px 0" }}>
              <span className="gc-typing"><i /><i /><i /></span>
              Working
            </div>
          )}
          {phase === "card" && (
            <div className="gc-row-in" style={{ marginTop: 10, padding: 16, borderRadius: 16, border: `1px solid ${t.accLine}`, background: t.accSoft }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: t.acc }}>NEXT SAFE STEP · PREPARED, NOT DONE</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginTop: 6 }}>Hand {ROOM_CLAIM} to Priya (documents desk) and send the claim’s approved day-14 reminder.</div>
              <div style={{ fontSize: 13, color: t.text2, marginTop: 4 }}>Evidence: discharge summary missing since day 6 · reminder 2 sent on day 14 · 15-day clock passed · Priya owns the documents queue.</div>
              {decision === null ? (
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button type="button" onClick={() => setDecision("accepted")} style={{ padding: "10px 16px", borderRadius: 10, border: "none", background: t.btnBg, color: t.btnText, font: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                    Accept
                  </button>
                  <button type="button" onClick={() => setDecision("held")} style={{ padding: "10px 16px", borderRadius: 10, border: `1px solid ${t.border}`, background: t.surface, color: t.text, font: "inherit", fontSize: 14, cursor: "pointer" }}>
                    Not now
                  </button>
                </div>
              ) : (
                <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: decision === "accepted" ? t.acc : t.text2 }}>
                    {decision === "accepted" ? "✓ Accepted by you · hand-over ran · recorded on the ledger" : "Held · nothing changed · noted on the ledger"}
                  </span>
                  <button type="button" onClick={reset} style={{ padding: "7px 12px", borderRadius: 9, border: `1px solid ${t.border}`, background: t.surface, color: t.text2, font: "inherit", fontSize: 12, cursor: "pointer" }}>
                    Run again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
