/**
 * Light and dark come from CSS variables, never from a `dark ? a : b` in
 * render. The prerendered HTML is the same for both themes; index.html sets
 * `data-theme` on <html> before the first paint, so a dark visitor never sees a
 * light flash and hydration never mismatches.
 *
 * Each page keeps its own token pairs (the design tunes them per page), scoped
 * by a prefix so two pages' `--bg` never collide.
 */
export type TokenPairs = Record<string, readonly [light: string, dark: string]>;

export interface Theme<K extends string> {
  /** `t.bg` → `var(--home-bg)`; use it anywhere a CSS value goes. */
  t: Record<K, string>;
  /** The variable declarations; render once with <ThemeStyle css={…} />. */
  css: string;
}

export function makeTheme<P extends TokenPairs>(scope: string, pairs: P): Theme<Extract<keyof P, string>> {
  const t = {} as Record<Extract<keyof P, string>, string>;
  let light = "";
  let dark = "";
  for (const key of Object.keys(pairs) as Extract<keyof P, string>[]) {
    const name = `--${scope}-${key}`;
    t[key] = `var(${name})`;
    light += `${name}:${pairs[key][0]};`;
    dark += `${name}:${pairs[key][1]};`;
  }
  return { t, css: `:root{${light}}:root[data-theme="dark"]{${dark}}` };
}

export const THEME_STORAGE_KEY = "gooclaim-theme";
