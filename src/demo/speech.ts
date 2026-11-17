/**
 * The browser's own speech: text-to-speech for the agent, speech-to-text for
 * the caller. Both are optional — every caller of these helpers has a path for
 * a browser that has neither, and nothing here runs during prerender.
 */

/** The parts of the Web Speech recognition API the demo uses. */
interface RecognitionAlternative {
  transcript: string;
}
interface RecognitionResult {
  readonly isFinal: boolean;
  readonly [index: number]: RecognitionAlternative;
}
interface RecognitionResultList {
  readonly length: number;
  readonly [index: number]: RecognitionResult;
}
export interface RecognitionEvent {
  readonly resultIndex: number;
  readonly results: RecognitionResultList;
}
export interface RecognitionErrorEvent {
  readonly error: string;
}
export interface Recognition {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  onresult: ((e: RecognitionEvent) => void) | null;
  onerror: ((e: RecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  abort(): void;
}
type RecognitionCtor = new () => Recognition;

interface SpeechWindow {
  SpeechRecognition?: RecognitionCtor;
  webkitSpeechRecognition?: RecognitionCtor;
}

export type CallLang = "en" | "hi";

export function speechLocale(lang: CallLang): string {
  return lang === "hi" ? "hi-IN" : "en-IN";
}

export function recognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & SpeechWindow;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function cancelSpeech(): void {
  try {
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
  } catch {
    // Nothing to stop.
  }
}

/**
 * Says `text` in the call's language and calls `done` when it finishes — or
 * after `fallbackMs` when this browser cannot speak, so the call still moves.
 */
export function speakText(text: string, lang: CallLang, done: () => void, fallbackMs: number): void {
  try {
    const ss = typeof window !== "undefined" ? window.speechSynthesis : undefined;
    if (!ss || typeof SpeechSynthesisUtterance === "undefined") throw new Error("no tts");
    ss.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = speechLocale(lang);
    const voices = ss.getVoices() || [];
    const v = voices.find((x) => x.lang === u.lang) || voices.find((x) => x.lang && x.lang.slice(0, 2) === u.lang.slice(0, 2));
    if (v) u.voice = v;
    u.rate = 1;
    u.onend = done;
    u.onerror = done;
    ss.speak(u);
  } catch {
    window.setTimeout(done, fallbackMs);
  }
}

const WORD_DIGITS: Record<string, number> = {
  zero: 0, oh: 0, one: 1, two: 2, to: 2, three: 3, four: 4, for: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
  ek: 1, do: 2, teen: 3, char: 4, chaar: 4, paanch: 5, panch: 5, chhe: 6, che: 6, saat: 7, aath: 8, nau: 9,
  "एक": 1, "दो": 2, "तीन": 3, "चार": 4, "पांच": 5, "पाँच": 5, "छह": 6, "सात": 7, "आठ": 8, "नौ": 9, "शून्य": 0,
};
const DEVANAGARI_DIGITS = "०१२३४५६७८९";

/** The digits a caller said: "4 8 2", "four eight two", "चार आठ दो" or "४८२". */
export function spokenDigits(s: string): string {
  return s
    .toLowerCase()
    .split(/[\s,.-]+/)
    .map((tok) => {
      if (/^[0-9]+$/.test(tok)) return tok;
      if (tok && [...tok].every((ch) => DEVANAGARI_DIGITS.includes(ch))) return [...tok].map((ch) => DEVANAGARI_DIGITS.indexOf(ch)).join("");
      return WORD_DIGITS[tok] !== undefined ? String(WORD_DIGITS[tok]) : "";
    })
    .join("");
}

export function hasDevanagari(s: string): boolean {
  return /[ऀ-ॿ]/.test(s);
}

/** Wall-clock time for a ledger row, e.g. "14:03:27". Only called from handlers. */
export function clockTime(): string {
  return new Date().toTimeString().slice(0, 8);
}
