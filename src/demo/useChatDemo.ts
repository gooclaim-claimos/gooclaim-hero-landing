import { useCallback, useEffect, useRef, useState } from "react";
import { chatLines, type ChatLang } from "./chatScript";
import { tryIntent } from "./intents";
import { hasDevanagari } from "./speech";

export type UiLang = "en" | "hi";

export interface ChatMsg {
  from: "member" | "os";
  text: string;
  tag?: string;
  hasUpload?: boolean;
  lang: ChatLang;
}

type Step = "start" | "consent" | "ready";
type Log = (ev: string, detail: string, c?: string) => void;

/**
 * The messaging demo: consent first, verified by the registered number, then
 * status / documents / payment / a person, and a secure upload — each step
 * written to the ledger beside it.
 */
export function useChatDemo(lang: UiLang, setLang: (l: UiLang) => void, log: Log) {
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [step, setStep] = useState<Step>("start");
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  // Hindi in Devanagari or in Latin letters (Hinglish), whichever the member writes.
  const script = useRef<ChatLang>("hing");
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

  const effLang = (msg: string): ChatLang => {
    if (lang === "en") return "en";
    script.current = hasDevanagari(msg) ? "hi" : "hing";
    return script.current;
  };

  const osReply = useCallback((text: string, tag: string, msgLang: ChatLang, hasUpload = false) => {
    setTyping(true);
    const id = window.setTimeout(() => {
      timers.current = timers.current.filter((x) => x !== id);
      setTyping(false);
      setMsgs((m) => m.concat([{ from: "os", text, tag, hasUpload, lang: msgLang }]));
    }, 650);
    timers.current.push(id);
  }, []);

  const send = (text: string) => {
    const msg = (text || "").trim();
    if (!msg) return;
    const l = effLang(msg);
    const T = chatLines(l, new Date());
    setMsgs((m) => m.concat([{ from: "member", text: msg, lang: hasDevanagari(msg) ? "hi" : l === "hi" ? "hing" : l }]));
    setDraft("");
    const it = tryIntent(msg);
    log("message.received", "Messaging · registered number", "#64748B");
    if (step === "start") {
      setStep("consent");
      log("consent.requested", "No claim detail shared before consent", "#F59E0B");
      return osReply(T.consent, "CONSENT FIRST · APPROVED TEMPLATE", l);
    }
    if (step === "consent") {
      if (it === "yes") {
        setStep("ready");
        log("consent.granted", "Stored with time and channel", "#10B981");
        log("identity.verified", "Registered number matched", "#10B981");
        return osReply(T.ready, "VERIFIED · APPROVED TEMPLATE", l);
      }
      if (it === "no") {
        log("consent.declined", "Workflow stopped", "#EF4444");
        return osReply(T.declined, "APPROVED TEMPLATE", l);
      }
      return osReply(T.reask, "CONSENT FIRST", l);
    }
    if (it === "status") {
      log("cms.read", "Claims system · read-only", "#2563EB");
      log("policy_gate.passed", "3 of 3 values matched to the record", "#10B981");
      return osReply(uploaded ? T.statusDone : T.status, "SOURCE & DATE · CHECKED", l);
    }
    if (it === "docs" || it === "upload") {
      log("cms.read", "Pending documents · read-only", "#2563EB");
      if (uploaded) return osReply(T.docsDone, "SOURCE & DATE", l);
      log("upload_link.issued", "Single-use, cannot be forwarded", "#8B5CF6");
      return osReply(T.docs, "APPROVED TEMPLATE · SECURE LINK", l, true);
    }
    if (it === "payment") {
      log("cms.read", "Payments · read-only", "#2563EB");
      return osReply(uploaded ? T.paymentDone : T.payment, "SOURCE & DATE · CHECKED", l);
    }
    if (it === "human") {
      log("handoff.flagged", "Sent to claims team with reason", "#F59E0B");
      return osReply(T.human, "APPROVED TEMPLATE", l);
    }
    if (it === "hindi") {
      setLang("hi");
      return osReply(chatLines("hi", new Date()).ready, "LANGUAGE · HINDI", "hi");
    }
    if (it === "english") {
      setLang("en");
      return osReply(chatLines("en", new Date()).ready, "LANGUAGE · ENGLISH", "en");
    }
    return osReply(T.fallback, "APPROVED TEMPLATE", l);
  };

  const upload = () => {
    if (uploaded) return;
    const l: ChatLang = lang === "en" ? "en" : script.current;
    setUploaded(true);
    setMsgs((m) => m.concat([{ from: "member", text: "Uploaded · discharge_summary.pdf", lang: "en" }]));
    log("document.received", "discharge_summary.pdf · scanned", "#8B5CF6");
    log("document.checked", "Readable · right type · this member", "#10B981");
    osReply(chatLines(l, new Date()).received, "CHECKED ON ARRIVAL", l);
  };

  const reset = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    setMsgs([]);
    setStep("start");
    setUploaded(false);
    setDraft("");
    setTyping(false);
  };

  // The quick replies under the chat: in Hindi mode, a mix of Devanagari and Hinglish.
  let chips: string[];
  if (lang === "hi") {
    const H = chatLines("hi");
    const G = chatLines("hing");
    chips = step === "start" ? [H.chips0[0], G.chips0[0]] : step === "consent" ? H.chipsC : [H.chips1[0], G.chips1[1], G.chips1[2], H.chips1[3]];
  } else {
    const T = chatLines("en");
    chips = step === "start" ? T.chips0 : step === "consent" ? T.chipsC : T.chips1;
  }

  return {
    msgs, typing, draft, setDraft, uploaded, chips,
    placeholder: chatLines(lang === "hi" ? "hi" : "en").ph,
    send, upload, reset,
  };
}
