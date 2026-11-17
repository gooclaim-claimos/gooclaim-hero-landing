import { useEffect, useRef } from "react";
import Logo from "@/site/Logo";
import { mono, tryTheme } from "./tryTheme";
import type { useChatDemo } from "./useChatDemo";

const { t } = tryTheme;

type Chat = ReturnType<typeof useChatDemo>;

/** The messaging phone: a claims desk chat on the sample claim. */
export default function TryChat({ chat }: { chat: Chat }) {
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [chat.msgs, chat.typing]);

  return (
    <div className="gc-chat-box" style={{ maxWidth: 560, margin: "0 auto", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 24, boxShadow: t.cardShadow, overflow: "hidden", display: "flex", flexDirection: "column", height: 640 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderBottom: `1px solid ${t.border}` }}>
        <span style={{ width: 38, height: 38, borderRadius: 999, background: t.brandSoft, color: t.brand, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Logo size={22} />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>Your insurer · Claims desk</div>
          <div style={{ fontSize: 12, color: t.green }}>Messaging · verified business</div>
        </div>
        <button type="button" onClick={chat.reset} style={{ padding: "7px 12px", borderRadius: 9, border: `1px solid ${t.border}`, background: t.surface, color: t.text2, font: "inherit", fontSize: 13, cursor: "pointer" }}>
          Restart
        </button>
      </div>
      <div ref={scroller} style={{ flex: 1, overflowY: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 10, background: t.chatBg }}>
        <div style={{ alignSelf: "center", fontFamily: mono, fontSize: 10, letterSpacing: ".06em", color: t.text3, padding: "4px 10px", borderRadius: 999, background: t.surface, border: `1px solid ${t.border}` }}>
          SAMPLE DATA · NOTHING HERE IS REAL
        </div>
        {chat.msgs.map((m, i) => {
          const me = m.from === "member";
          const align = me ? "flex-end" : "flex-start";
          return (
            <div key={i} style={{ alignSelf: align, maxWidth: "82%", display: "flex", flexDirection: "column", gap: 4, alignItems: align }}>
              <div lang={m.lang === "hi" ? "hi" : undefined} style={{ padding: "10px 14px", borderRadius: me ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: me ? t.meBg : t.surface, color: me ? t.meText : t.text, border: `1px solid ${me ? "transparent" : t.border}`, fontSize: 14.5, whiteSpace: "pre-line" }}>
                {m.text}
              </div>
              {m.hasUpload && !chat.uploaded && (
                <button type="button" onClick={chat.upload} style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 14px", borderRadius: 10, border: `1px solid ${t.brandLine}`, background: t.brandSoft, color: t.brand, font: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 16V4M6 10l6-6 6 6M4 20h16" /></svg>
                  Upload securely
                </button>
              )}
              {m.tag && <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: ".05em", color: t.brand }}>{m.tag}</span>}
            </div>
          );
        })}
        {chat.typing && (
          <div style={{ alignSelf: "flex-start", padding: "10px 14px", borderRadius: 16, background: t.surface, border: `1px solid ${t.border}`, fontSize: 13, color: t.text3 }}>Checking your claim…</div>
        )}
      </div>
      <div style={{ padding: "10px 14px 0", display: "flex", gap: 8, flexWrap: "wrap" }}>
        {chat.chips.map((label) => (
          <button key={label} type="button" onClick={() => chat.send(label)} style={{ padding: "7px 12px", borderRadius: 999, border: `1px solid ${t.border}`, background: t.surface2, color: t.text, font: "inherit", fontSize: 13, cursor: "pointer" }}>
            {label}
          </button>
        ))}
      </div>
      <div style={{ padding: "12px 14px 14px", display: "flex", gap: 8 }}>
        <label htmlFor="gc-chat-input" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Message</label>
        <input
          id="gc-chat-input"
          value={chat.draft}
          onChange={(e) => chat.setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              chat.send(chat.draft);
            }
          }}
          placeholder={chat.placeholder}
          style={{ flex: 1, minWidth: 0, height: 46, padding: "0 16px", borderRadius: 12, border: `1px solid ${t.border}`, background: t.surface2, color: t.text, font: "inherit", fontSize: 16, outline: "none" }}
        />
        <button type="button" onClick={() => chat.send(chat.draft)} aria-label="Send" style={{ width: 46, height: 46, borderRadius: 12, border: "none", background: t.btnBg, color: t.btnText, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      </div>
    </div>
  );
}
