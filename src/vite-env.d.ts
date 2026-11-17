/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Overrides the /call Turnstile site key (public; the default is in src/demo/turnstile.ts). */
  readonly VITE_TURNSTILE_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
