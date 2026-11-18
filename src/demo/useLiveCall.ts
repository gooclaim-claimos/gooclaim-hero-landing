import { useCallback, useEffect, useRef, useState } from "react";
import { hasDevanagari, type CallLang } from "./speech";

/**
 * A real call with the Gooclaim voice agent from the website — the same
 * agent the Portal's "Test" tab calls, on the tenant's labelled test member.
 *
 *   /api/voice-call (Turnstile-checked) → a one-call token + session id
 *   @elevenlabs/client over WebRTC, the session id as `test_session` (the
 *   browser names no caller; the server's session does)
 *
 * The end is graceful, never a cut mid-sentence: when the countdown is done
 * the page waits for the agent to finish what it is saying, then sends the
 * voice service's time-up signal; the agent says goodbye in the call's
 * language and hangs up itself (no AI call after the limit). Only if that
 * never happens does the page end the session, at limit + BACKSTOP_S.
 */
export interface CallLine {
  who: "agent" | "caller";
  text: string;
  lang: "en" | "hi" | "hing";
}

export type LivePhase = "idle" | "connecting" | "live" | "ended";
export type LiveProblem = "" | "verification" | "daily_limit" | "ip_limit" | "unavailable" | "not_configured" | "microphone" | "dropped";

export interface LiveEvent {
  ev: string;
  detail: string;
  time: string;
}

interface Opened {
  session_id: string;
  conversation_token: string;
  limit_s: number;
  test_code: string;
}

/** Minimal shape of the provider's session we use. */
interface Session {
  endSession(): Promise<void>;
  sendUserMessage(text: string): void;
}

/** gooclaim-voice app/time_limit.TIME_UP — the page's own end-of-trial word. */
const TIME_UP = "[trial time up]";
/** The page's hard stop, only if the agent's goodbye never comes. */
const BACKSTOP_S = 25;

function clock(): string {
  return new Date().toTimeString().slice(0, 8);
}

export function useLiveCall() {
  const [phase, setPhase] = useState<LivePhase>("idle");
  const [speaking, setSpeaking] = useState(false);
  const [lines, setLines] = useState<CallLine[]>([]);
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [problem, setProblem] = useState<LiveProblem>("");
  // Which step failed, shown small under the message so a report can name it.
  const [problemRef, setProblemRef] = useState("");
  const [limitS, setLimitS] = useState(30);
  const [code, setCode] = useState("");
  const [startedAt, setStartedAt] = useState(0);
  const [now, setNow] = useState(0);
  // The limit was reached: by the agent closing the call at it, or by our cut.
  const [cut, setCut] = useState(false);
  // The countdown is done; the agent is finishing and saying goodbye.
  const [wrapping, setWrapping] = useState(false);
  const signalled = useRef(false);
  const session = useRef<Session | null>(null);
  const began = useRef(0);
  const limit = useRef(30);

  const log = useCallback((ev: string, detail: string) => setEvents((e) => e.concat({ ev, detail, time: clock() })), []);

  const end = useCallback(async () => {
    const s = session.current;
    session.current = null;
    await s?.endSession().catch(() => undefined);
    setSpeaking(false);
    setPhase((p) => (p === "idle" ? p : "ended"));
  }, []);

  const start = useCallback(
    async (lang: CallLang, turnstileToken: string) => {
      setProblem("");
      setProblemRef("");
      setLines([]);
      setEvents([]);
      setCut(false);
      setWrapping(false);
      signalled.current = false;
      setPhase("connecting");
      let opened: Opened;
      try {
        const r = await fetch("/api/voice-call", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ turnstile_token: turnstileToken, language: lang }),
        });
        const out = (await r.json().catch(() => ({}))) as Partial<Opened> & { error?: string };
        if (!r.ok || !out.conversation_token || !out.session_id) {
          const e = out.error;
          setProblemRef(`${r.status} ${e ?? "no_detail"}`);
          setProblem(
            e === "daily_limit" || e === "ip_limit" || e === "not_configured"
              ? e
              : e === "verification_failed" || e === "verification_required"
                ? "verification"
                : "unavailable",
          );
          setPhase("idle");
          return;
        }
        opened = { session_id: out.session_id, conversation_token: out.conversation_token, limit_s: out.limit_s ?? 30, test_code: out.test_code ?? "" };
      } catch {
        setProblemRef("network");
        setProblem("unavailable");
        setPhase("idle");
        return;
      }
      setLimitS(opened.limit_s);
      limit.current = opened.limit_s;
      setCode(opened.test_code);
      try {
        // Loaded on first use: the call's audio code is only for people who place a call.
        const { VoiceConversation } = await import("@elevenlabs/client");
        session.current = await VoiceConversation.startSession({
          conversationToken: opened.conversation_token,
          connectionType: "webrtc",
          dynamicVariables: { test_session: opened.session_id },
          overrides: { agent: { language: lang } },
          onConnect: () => {
            const t = Date.now();
            began.current = t;
            setStartedAt(t);
            setNow(t);
            setPhase("live");
            log("call.started", "Test member · sample data · recorded as a test");
          },
          onDisconnect: (d) => {
            session.current = null;
            setSpeaking(false);
            setPhase("ended");
            if (d.reason === "agent" || (began.current && (Date.now() - began.current) / 1000 >= limit.current - 1)) setCut(true);
            log("call.ended", d.reason === "agent" ? "The agent closed the call" : d.reason === "user" ? "You ended the call" : "The line dropped");
            if (d.reason === "error") setProblem("dropped");
          },
          onError: () => { setProblemRef("call error"); setProblem("dropped"); },
          onModeChange: ({ mode }) => setSpeaking(mode === "speaking"),
          onMessage: (m) => {
            if (m.message.trim() === TIME_UP) return; // our own signal, not the caller
            const who: CallLine["who"] = m.source === "ai" ? "agent" : "caller";
            setLines((l) => l.concat({ who, text: m.message, lang: hasDevanagari(m.message) ? "hi" : "en" }));
          },
        });
      } catch (e) {
        session.current = null;
        setProblemRef(`start ${e instanceof Error ? e.name : "error"}`);
        setProblem(e instanceof DOMException && e.name === "NotAllowedError" ? "microphone" : "unavailable");
        setPhase("idle");
      }
    },
    [log],
  );

  // The clock; at the limit, a graceful goodbye; the backstop only if it never comes.
  useEffect(() => {
    if (phase !== "live") return;
    const id = window.setInterval(() => {
      const t = Date.now();
      setNow(t);
      const secs = (t - startedAt) / 1000;
      if (secs >= limitS) setWrapping(true);
      if (secs >= limitS + BACKSTOP_S) {
        setCut(true);
        void end();
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [phase, startedAt, limitS, end]);

  // Once the agent is not mid-sentence, ask for the goodbye — once.
  useEffect(() => {
    if (!wrapping || speaking || signalled.current || phase !== "live") return;
    signalled.current = true;
    setCut(true);
    try {
      session.current?.sendUserMessage(TIME_UP);
    } catch {
      void end();
    }
  }, [wrapping, speaking, phase, end]);

  // Leaving the page hangs up: a call never runs unseen.
  useEffect(() => () => void session.current?.endSession().catch(() => undefined), []);

  const elapsed = phase === "live" && startedAt ? Math.max(0, (now - startedAt) / 1000) : 0;
  return {
    phase,
    speaking,
    wrapping,
    lines,
    events,
    problem,
    problemRef,
    code,
    limitS,
    /** The limit was reached (by the agent or by our cut). */
    trialEnded: phase === "ended" && cut,
    remaining: phase === "live" ? Math.max(0, limitS - elapsed) : phase === "ended" ? 0 : limitS,
    inCall: phase === "connecting" || phase === "live",
    start,
    end,
  };
}

export type LiveCall = ReturnType<typeof useLiveCall>;
