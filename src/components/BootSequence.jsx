import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STEPS = [
  { t: "booting arpit.dev v2026.09", s: "" },
  { t: "loading go runtime", s: "ok" },
  { t: "warming caches (valkey)", s: "ok" },
  { t: "spawning virtual threads", s: "ok" },
  { t: "arming circuit breakers", s: "ok" },
  { t: "mounting portfolio", s: "ready" },
];
const KEY = "arpit-booted";

function alreadyBooted() {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

// A short terminal boot screen on the first visit of a session. Any key or click skips it.
export default function BootSequence() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return window.location.pathname === "/" && !alreadyBooted();
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      // Without storage the boot screen simply shows again next visit.
    }
    const finish = () => setVisible(false);
    const timers = STEPS.map((_, i) => setTimeout(() => setCount(i + 1), 120 + i * 170));
    timers.push(setTimeout(finish, 120 + STEPS.length * 170 + 420));
    window.addEventListener("keydown", finish);
    window.addEventListener("pointerdown", finish);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", finish);
      window.removeEventListener("pointerdown", finish);
    };
  }, [visible]);

  const pct = Math.round((count / STEPS.length) * 100);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end bg-ink-950 p-6 sm:items-center sm:justify-center"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="w-full max-w-md font-mono text-xs text-zinc-500 sm:text-sm">
            {STEPS.slice(0, count).map((step, i) => (
              <motion.p key={step.t} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="flex justify-between gap-4 py-0.5">
                <span className={i === 0 ? "text-zinc-200" : ""}>
                  <span className="text-accent">&gt;</span> {step.t}
                </span>
                {step.s && <span className="text-accent">[{step.s}]</span>}
              </motion.p>
            ))}
            <div className="mt-5 h-px w-full overflow-hidden bg-white/10">
              <motion.div className="h-full bg-accent" animate={{ width: `${pct}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
            </div>
            <p className="mt-3 flex justify-between text-[11px] text-zinc-600">
              <span>press any key to skip</span>
              <span className="tabular-nums">{pct}%</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
