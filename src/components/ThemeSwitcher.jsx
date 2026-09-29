import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Palette, Check } from "@phosphor-icons/react";
import { useTheme } from "../theme/ThemeContext";

// Nav button that opens a small theme picker. Switching uses a circular reveal
// that grows from the swatch you clicked.
export default function ThemeSwitcher() {
  const { theme, themes, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (id, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTheme(id, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Change theme"
        className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-zinc-300 transition-colors hover:border-accent/40 hover:text-accent active:scale-[0.96]"
      >
        <Palette size={18} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            style={{ originX: 1, originY: 0 }}
            className="absolute right-0 top-12 w-64 rounded-3xl border border-white/[0.08] bg-ink-900/95 p-2 shadow-[inset_0_1px_0_rgb(var(--overlay)/0.06),0_30px_60px_-20px_rgb(0_0_0/0.5)] backdrop-blur-xl"
          >
            <p className="px-3 pb-2 pt-2 font-mono text-[11px] text-zinc-500">
              <span className="text-accent">$</span> theme --set
            </p>
            <ul role="radiogroup" aria-label="Theme">
              {themes.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={theme === t.id}
                    onClick={(e) => pick(t.id, e)}
                    className="relative flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-white/[0.04]"
                  >
                    {theme === t.id && (
                      <motion.span
                        layoutId="theme-active"
                        className="absolute inset-0 rounded-2xl bg-white/[0.06]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span
                      className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full ring-1 ring-white/15"
                      style={{ background: t.swatch[0] }}
                      aria-hidden="true"
                    >
                      <span className="h-3 w-3 rounded-full" style={{ background: t.swatch[1] }} />
                    </span>
                    <span className="relative min-w-0 flex-1">
                      <span className="block text-sm text-zinc-100">{t.label}</span>
                      <span className="block truncate text-xs text-zinc-500">{t.note}</span>
                    </span>
                    {theme === t.id && <Check size={14} className="relative text-accent" aria-hidden="true" />}
                  </button>
                </li>
              ))}
            </ul>
            <p className="px-3 pb-1 pt-2 font-mono text-[10px] text-zinc-600">tip: press T to cycle</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
