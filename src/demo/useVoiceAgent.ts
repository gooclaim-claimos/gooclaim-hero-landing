import { useCallback, useEffect, useReducer, useRef } from "react";
import type { Intent } from "./intents";
import { cancelSpeech, hasDevanagari, recognitionCtor, speakText, speechLocale, spokenDigits, type CallLang, type Recognition } from "./speech";
import { OTP_MATCH, voiceLines } from "./voiceScript";

export type CallPhase = "idle" | "speaking" | "listening" | "thinking" | "waiting" | "ended";
export type LineLang = "en" | "hi" | "hing";

export interface CallLine {
  who: "agent" | "caller";
  text: string;
  lang: LineLang;
}

export interface VoiceState {
  call: CallPhase;
  vstep: "otp" | "ready";
  vlang: CallLang;
  lines: CallLine[];
  interim: string;
  callStart: number;
  /** Updated by the call timer; render reads time from here, never from Date. */
  now: number;
  micBlocked: boolean;
  micNote: string;
  wrapping: boolean;
  trialEnded: boolean;
}

/** The ledger detail each page writes for the agent's checks. */
export interface VoiceLogText {
  started: string;
  otpSent: string;
  verified: string;
  retry: string;
  toHindi: string;
  toEnglish: string;
  status: string;
  docs: string;
  payment: string;
  human: string;
  ended: string;
  trialEnded: string;
}

export interface VoiceAgentOptions {
  intent: (text: string) => Intent;
  log: (ev: string, detail: string, color: string) => void;
  logText: VoiceLogText;
  micNotes: { unsupported: string; blocked: string; failed: string };
  /** Whether the member has already uploaded the pending document (Try it page). */
  uploaded?: boolean;
  /** Called as a new call starts, before its first ledger rows (Voice call page starts a fresh ledger). */
  onStart?: () => void;
}

export const TRIAL_MS = 60000;

const INITIAL: VoiceState = {
  call: "idle", vstep: "otp", vlang: "en", lines: [], interim: "", callStart: 0, now: 0,
  micBlocked: false, micNote: "", wrapping: false, trialEnded: false,
};

/**
 * One scripted voice call: the agent speaks with the browser's voice, listens
 * with its speech recognition, asks for the one-time code first, follows the
 * caller's language, and closes itself after one minute.
 */
export function useVoiceAgent(options: VoiceAgentOptions) {
  const [, rerender] = useReducer((n: number) => n + 1, 0);
  const st = useRef<VoiceState>(INITIAL);
  const opts = useRef(options);
  opts.current = options;
  const rec = useRef<Recognition | null>(null);
  const mounted = useRef(true);
  const timers = useRef<number[]>([]);

  const set = useCallback((patch: Partial<VoiceState>) => {
    st.current = { ...st.current, ...patch };
    if (mounted.current) rerender();
  }, []);

  const later = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      timers.current = timers.current.filter((x) => x !== id);
      if (mounted.current) fn();
    }, ms);
    timers.current.push(id);
  }, []);

  const live = () => {
    const s = st.current;
    return s.call !== "idle" && s.call !== "ended" && !s.wrapping;
  };

  const stopRec = useCallback(() => {
    try {
      if (rec.current) {
        rec.current.onend = null;
        rec.current.abort();
      }
    } catch {
      // Already stopped.
    }
    rec.current = null;
  }, []);

  // The engine's steps call each other; refs keep each one pointing at the latest.
  const listenRef = useRef<() => void>(() => {});
  const heardRef = useRef<(text: string) => void>(() => {});

  const speak = useCallback((text: string, after?: () => void) => {
    set({ lines: st.current.lines.concat([{ who: "agent", text, lang: st.current.vlang }]), call: "speaking" });
    const done = () => {
      if (!mounted.current) return;
      const c = st.current.call;
      if (c === "ended" || c === "idle") return;
      if (after) after();
      else listenRef.current();
    };
    speakText(text, st.current.vlang, done, 1500);
  }, [set]);

  const finish = useCallback((trial: boolean) => {
    stopRec();
    set({ call: "ended", interim: "", wrapping: false, trialEnded: trial });
  }, [set, stopRec]);

  listenRef.current = () => {
    if (!live()) return;
    set({ call: "listening", interim: "" });
    const SR = recognitionCtor();
    const notes = opts.current.micNotes;
    if (!SR || st.current.micBlocked) {
      if (!st.current.micBlocked) set({ micBlocked: true, micNote: notes.unsupported });
      return;
    }
    stopRec();
    let got = false;
    try {
      const r = new SR();
      r.lang = speechLocale(st.current.vlang);
      r.interimResults = true;
      r.maxAlternatives = 1;
      r.continuous = false;
      r.onresult = (e) => {
        let fin = "";
        let tmp = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const tx = e.results[i][0].transcript;
          if (e.results[i].isFinal) fin += tx;
          else tmp += tx;
        }
        if (tmp) set({ interim: tmp });
        if (fin) {
          got = true;
          set({ interim: "" });
          stopRec();
          heardRef.current(fin);
        }
      };
      r.onerror = (e) => {
        if (e.error === "not-allowed" || e.error === "service-not-allowed" || e.error === "audio-capture") {
          set({ micBlocked: true, micNote: notes.blocked });
        }
      };
      r.onend = () => {
        if (!got && st.current.call === "listening" && !st.current.micBlocked) set({ call: "waiting" });
      };
      rec.current = r;
      r.start();
    } catch {
      set({ micBlocked: true, micNote: notes.failed });
    }
  };

  heardRef.current = (text: string) => {
    if (!live()) return;
    const isDev = hasDevanagari(text);
    const lang: LineLang = isDev ? "hi" : st.current.vlang === "hi" ? "hing" : "en";
    set({ lines: st.current.lines.concat([{ who: "caller", text, lang }]), call: "thinking" });
    const { intent, log, logText: L } = opts.current;
    const it = intent(text);
    later(() => {
      if (!live()) return;
      if (st.current.vstep === "otp") {
        if (spokenDigits(text).indexOf(OTP_MATCH) !== -1) {
          set({ vstep: "ready" });
          log("identity.verified", L.verified, "#10B981");
          return speak(voiceLines(st.current.vlang).ok);
        }
        log("identity.retry", L.retry, "#F59E0B");
        return speak(voiceLines(st.current.vlang).bad);
      }
      if (it === "hindi" || (isDev && st.current.vlang !== "hi")) {
        set({ vlang: "hi" });
        log("language.switched", L.toHindi, "#8B5CF6");
        if (it === "hindi") return speak(voiceLines("hi").lang);
      }
      if (it === "english" && st.current.vlang !== "en") {
        set({ vlang: "en" });
        log("language.switched", L.toEnglish, "#8B5CF6");
        return speak(voiceLines("en").lang);
      }
      const V = voiceLines(st.current.vlang);
      if (it === "status") {
        log("cms.read", L.status, "#2563EB");
        return speak(opts.current.uploaded ? V.statusDone : V.status);
      }
      if (it === "docs" || it === "upload") {
        log("upload_link.issued", L.docs, "#8B5CF6");
        return speak(V.docs);
      }
      if (it === "payment") {
        log("cms.read", L.payment, "#2563EB");
        return speak(V.payment);
      }
      if (it === "human") {
        log("handoff.flagged", L.human, "#F59E0B");
        return speak(V.human);
      }
      if (it === "bye") {
        log("call.ended", L.ended, "#64748B");
        return speak(V.bye, () => finish(false));
      }
      return speak(V.other);
    }, 500);
  };

  const wrapTrial = useCallback(() => {
    stopRec();
    set({ wrapping: true, interim: "" });
    opts.current.log("trial.ended", opts.current.logText.trialEnded, "#64748B");
    speak(voiceLines(st.current.vlang).trialEnd, () => finish(true));
  }, [finish, set, speak, stopRec]);

  const startCall = useCallback((vlang: CallLang) => {
    stopRec();
    const t = Date.now();
    set({ call: "speaking", vstep: "otp", vlang, lines: [], interim: "", callStart: t, now: t, wrapping: false, trialEnded: false });
    const { log, logText, onStart } = opts.current;
    onStart?.();
    log("call.started", logText.started, "#64748B");
    log("otp.sent", logText.otpSent, "#F59E0B");
    later(() => speak(voiceLines(vlang).greet), 50);
  }, [later, set, speak, stopRec]);

  const endCall = useCallback(() => {
    stopRec();
    cancelSpeech();
    if (st.current.call !== "ended") opts.current.log("call.ended", opts.current.logText.ended, "#64748B");
    set({ call: "ended", interim: "", wrapping: false });
  }, [set, stopRec]);

  /** The mic button: stop the agent talking and listen now. */
  const tapMic = useCallback(() => {
    cancelSpeech();
    listenRef.current();
  }, []);

  /** A tapped line, said for the caller (no mic, or they prefer tapping). */
  const sayLine = useCallback((text: string) => {
    stopRec();
    cancelSpeech();
    heardRef.current(text);
  }, [stopRec]);

  // The one-minute clock.
  useEffect(() => {
    const id = window.setInterval(() => {
      const s = st.current;
      if (s.call === "idle" || s.call === "ended") return;
      const t = Date.now();
      if (!s.wrapping && s.callStart && t - s.callStart >= TRIAL_MS) wrapTrial();
      set({ now: t });
    }, 250);
    return () => window.clearInterval(id);
  }, [set, wrapTrial]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
      stopRec();
      cancelSpeech();
    };
  }, [stopRec]);

  const s = st.current;
  const inCall = s.call !== "idle" && s.call !== "ended";
  const elapsed = inCall && s.callStart ? Math.max(0, s.now - s.callStart) : 0;
  return {
    state: s,
    inCall,
    /** Seconds left on the trial (fractional). */
    remaining: inCall ? Math.max(0, (TRIAL_MS - elapsed) / 1000) : s.trialEnded ? 0 : 60,
    /** The agent is audibly talking, or the mic is open. */
    active: s.call === "speaking" || (s.call === "listening" && !s.micBlocked),
    startCall,
    endCall,
    tapMic,
    sayLine,
  };
}
