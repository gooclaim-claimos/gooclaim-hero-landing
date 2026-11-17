import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { THEME_STORAGE_KEY } from "./theme";

interface ThemeState {
  dark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeState>({ dark: false, toggle: () => {} });

/**
 * Holds the visitor's choice. The colours themselves never read this — they
 * follow `data-theme` through CSS variables — so it is only for the toggle's
 * label and anything that genuinely needs to know in script.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Prerender is always light; the real value is read after hydration.
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  const toggle = useCallback(() => {
    setDark((was) => {
      const next = !was;
      document.documentElement.dataset.theme = next ? "dark" : "light";
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
      } catch {
        // Private mode or blocked storage: the choice lasts for this page only.
      }
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ dark, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeState {
  return useContext(ThemeContext);
}

/** A page's token declarations. Safe to render more than once. */
export function ThemeStyle({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
