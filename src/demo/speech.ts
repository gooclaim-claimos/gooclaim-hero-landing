/** Small helpers shared by the website's chat demo and voice call. */

export type CallLang = "en" | "hi";

export function hasDevanagari(s: string): boolean {
  return /[ऀ-ॿ]/.test(s);
}

/** Wall-clock time for a ledger row, e.g. "14:03:27". Only called from handlers. */
export function clockTime(): string {
  return new Date().toTimeString().slice(0, 8);
}
