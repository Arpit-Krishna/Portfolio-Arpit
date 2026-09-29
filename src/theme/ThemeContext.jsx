import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { themes, defaultTheme } from "../data/themes";

const STORAGE_KEY = "arpit-theme";
const ThemeContext = createContext(null);

function readInitial() {
  const fromDom = document.documentElement.dataset.theme;
  return themes.some((t) => t.id === fromDom) ? fromDom : defaultTheme;
}

function apply(id) {
  document.documentElement.dataset.theme = id;
  const meta = document.querySelector('meta[name="theme-color"]');
  const theme = themes.find((t) => t.id === id);
  if (meta && theme) meta.setAttribute("content", theme.meta);
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // Storage can be blocked; the theme still applies for this visit.
  }
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readInitial);

  useEffect(() => apply(theme), [theme]);

  // Switch theme with a circular reveal from `origin` ({x, y} in viewport px) when supported.
  const setTheme = useCallback((id, origin) => {
    if (!themes.some((t) => t.id === id)) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      setThemeState(id);
      return;
    }
    const x = origin?.x ?? window.innerWidth - 40;
    const y = origin?.y ?? 40;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = document.startViewTransition(() => {
      apply(id);
      setThemeState(id);
    });
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" }
        );
      })
      .catch(() => {});
  }, []);

  const cycleTheme = useCallback(
    (origin) => {
      const i = themes.findIndex((t) => t.id === theme);
      setTheme(themes[(i + 1) % themes.length].id, origin);
    },
    [theme, setTheme]
  );

  const value = useMemo(() => ({ theme, themes, setTheme, cycleTheme }), [theme, setTheme, cycleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
