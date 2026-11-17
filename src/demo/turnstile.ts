import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Cloudflare Turnstile for the /call page: proves a person is asking before
 * /api/voice-call opens a real call. Only shows a challenge when Cloudflare
 * is unsure (`interaction-only`). A token is single-use, so it is reset after
 * every attempt.
 *
 * The site key is public by design (it ships in every visitor's page): the
 * "Gooclaim website voice call" widget, hostnames www.gooclaim.com,
 * gooclaim.com and localhost. VITE_TURNSTILE_SITE_KEY overrides it. The
 * secret half lives only in Vercel (TURNSTILE_SECRET_KEY).
 */
interface TurnstileApi {
  render(el: HTMLElement, opts: Record<string, unknown>): string;
  reset(id: string): void;
  remove(id: string): void;
}
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const WEBSITE_KEY = "0x4AAAAAAGEqIkh9ddXIbkr0";
export const SITE_KEY: string = import.meta.env.VITE_TURNSTILE_SITE_KEY || WEBSITE_KEY;

let loading: Promise<TurnstileApi> | null = null;
function load(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loading ??= new Promise<TurnstileApi>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT;
    s.async = true;
    s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("turnstile")));
    s.onerror = () => {
      loading = null;
      reject(new Error("turnstile"));
    };
    document.head.appendChild(s);
  });
  return loading;
}

/** The current token (or "" while none), and `reset` for after each use. */
export function useTurnstile(box: RefObject<HTMLElement>): { token: string; reset: () => void; failed: boolean } {
  const [token, setToken] = useState("");
  const [failed, setFailed] = useState(false);
  const id = useRef<string | null>(null);

  useEffect(() => {
    if (!SITE_KEY || !box.current) return;
    let gone = false;
    load()
      .then((api) => {
        if (gone || !box.current) return;
        id.current = api.render(box.current, {
          sitekey: SITE_KEY,
          appearance: "interaction-only",
          theme: "auto",
          action: "voice-call",
          callback: (t: string) => setToken(t),
          "expired-callback": () => setToken(""),
          "error-callback": () => setFailed(true),
        });
      })
      .catch(() => setFailed(true));
    return () => {
      gone = true;
      if (id.current && window.turnstile) window.turnstile.remove(id.current);
      id.current = null;
    };
  }, [box]);

  return {
    token,
    failed,
    reset: () => {
      setToken("");
      if (id.current && window.turnstile) window.turnstile.reset(id.current);
    },
  };
}
