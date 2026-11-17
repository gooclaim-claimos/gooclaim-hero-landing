/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Cloudflare Turnstile site key for /call (public; set in Vercel). */
  readonly VITE_TURNSTILE_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
