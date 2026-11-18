import { SAMPLE_CLAIM } from "@/data/sampleClaim";
import { mono, tryTheme } from "./tryTheme";
import type { LogRow } from "./useEventLog";

const { t } = tryTheme;

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
      <span style={{ color: t.text2 }}>{k}</span>
      <b style={{ fontWeight: 600 }}>{v}</b>
    </div>
  );
}

/** Beside the demo: who the visitor is playing, and the ledger rows as they land. */
export default function TrySide({ uploaded, log }: { uploaded: boolean; log: LogRow[] }) {
  return (
    <div style={{ flex: "1 1 320px", minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ padding: 22, borderRadius: 22, border: `1px solid ${t.border}`, background: t.surface }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", color: t.text3 }}>YOU ARE THE MEMBER</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14, fontSize: 14 }}>
          <Row k="Claim" v={`${SAMPLE_CLAIM.number} · Health`} />
          <Row k="Claim type" v={SAMPLE_CLAIM.type} />
          <Row k="Registered mobile" v="•••• 4821" />
          <Row k="Status in record" v={uploaded ? "Under review" : "Documents pending"} />
        </div>
      </div>
      <div style={{ flex: 1, padding: 22, borderRadius: 22, border: `1px solid ${t.border}`, background: t.surface, display: "flex", flexDirection: "column", minHeight: 320 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".08em", color: t.text3 }}>WHAT THE OS DID · LIVE</div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: t.green }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: t.green }} />
            Audit ledger
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 10, overflowY: "auto", maxHeight: 470 }}>
          {log.length === 0 && (
            <div style={{ padding: "24px 0", fontSize: 14, color: t.text3 }}>Send a message. Each check appears here as a ledger row.</div>
          )}
          {log
            .slice()
            .reverse()
            .map((lg, i) => (
              <div key={log.length - i} style={{ display: "flex", gap: 12, padding: "11px 0", borderBottom: `1px solid ${t.border}` }}>
                <span style={{ flex: "none", width: 8, height: 8, marginTop: 7, borderRadius: 999, background: lg.c }} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ fontFamily: mono, fontSize: 12 }}>{lg.ev}</span>
                    <span style={{ fontFamily: mono, fontSize: 11, color: t.text3 }}>{lg.time}</span>
                  </div>
                  <div style={{ fontSize: 13, color: t.text2 }}>{lg.detail}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
