import { memo, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

// Scripted terminal. The whoami block always plays, then one of the short
// sessions below, a different one on each loop.
const whoami = [
  { kind: "cmd", text: "curl -s arpit.dev/api/whoami | jq" },
  { kind: "out", text: "{" },
  { kind: "json", k: "name", v: '"Arpit Krishna"' },
  { kind: "json", k: "role", v: '"Backend Engineer @ Cars24"' },
  { kind: "json", k: "stack", v: '["Go", "Spring Boot", "React"]' },
  { kind: "json", k: "open_to", v: '["full-time", "freelance"]', last: true },
  { kind: "out", text: "}" },
];

const sessions = [
  [
    { kind: "cmd", text: "git log --oneline ~/life" },
    { kind: "git", hash: "e4a1f09", text: "feat: expensify, bills post exactly once" },
    { kind: "git", hash: "b7c2d31", text: "feat: hal-jivi, MSP pricing on-chain" },
    { kind: "git", hash: "91f0ae4", text: "chore: cleared GATE, twice" },
    { kind: "git", hash: "0000001", text: "init: hello, world" },
  ],
  [
    { kind: "cmd", text: "sudo rm -rf ~/bugs" },
    { kind: "out", text: "[sudo] password for arpit: ********" },
    { kind: "err", text: "rm: cannot remove '~/bugs': they keep coming back" },
    { kind: "cmd", text: "git blame ~/bugs" },
    { kind: "out", text: "arpit  (yesterday)  // TODO: handle this later" },
  ],
  [
    { kind: "cmd", text: "ls ~/projects" },
    { kind: "out", text: "expensify/  hal-jivi/  medium-clone/" },
    { kind: "cmd", text: "cat ~/.badges" },
    { kind: "ok", text: "ok   leetcode    knight, top 5%" },
    { kind: "ok", text: "ok   gate_2025   AIR 1852" },
  ],
  [
    { kind: "cmd", text: "coffee --brew --strength=deploy" },
    { kind: "out", text: "grinding beans      [##########] 100%" },
    { kind: "out", text: "running tests       [##########] 100%" },
    { kind: "ok", text: "ok   deploy ready. just not on a friday." },
  ],
];


function Line({ line }) {
  if (line.kind === "cmd")
    return (
      <p>
        <span className="text-accent">$</span> <span className="text-zinc-100">{line.text}</span>
      </p>
    );
  if (line.kind === "json")
    return (
      <p className="pl-4">
        <span className="text-info/80">"{line.k}"</span>
        <span className="text-zinc-500">: </span>
        <span className={line.v.startsWith('"') || line.v.startsWith("[") ? "text-warn/80" : "text-accent"}>{line.v}</span>
        {!line.last && <span className="text-zinc-500">,</span>}
      </p>
    );
  if (line.kind === "git")
    return (
      <p className="whitespace-pre-wrap">
        <span className="text-warn/80">{line.hash}</span> <span className="text-zinc-300">{line.text}</span>
      </p>
    );
  if (line.kind === "err") return <p className="text-danger/90">{line.text}</p>;
  if (line.kind === "ok")
    return (
      <p className="whitespace-pre-wrap">
        <span className="text-accent">ok</span>
        <span className="text-zinc-400">{line.text.slice(2)}</span>
      </p>
    );
  return <p className="whitespace-pre-wrap text-zinc-500">{line.text}</p>;
}

// Pacing: commands wait long enough to read the previous output, and a
// finished session stays on screen for HOLD ms before the next one types in.
const CMD_DELAY = 1400;
const LINE_DELAY = 450;
const HOLD = 10000;

function TerminalCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [paused, setPaused] = useState(false);
  const [count, setCount] = useState(0);
  const [round, setRound] = useState(0);
  const script = useMemo(() => [...whoami, ...sessions[round % sessions.length]], [round]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCount(script.length);
      return;
    }
    if (paused || !inView) return;
    const done = count >= script.length;
    const next = script[count];
    const delay = done ? HOLD : next?.kind === "cmd" ? CMD_DELAY : count < whoami.length ? 160 : LINE_DELAY;
    const t = setTimeout(() => {
      if (done) {
        // whoami stays put; only the session below it is swapped.
        setRound((r) => r + 1);
        setCount(whoami.length);
      } else setCount(count + 1);
    }, delay);
    return () => clearTimeout(t);
  }, [count, script, paused, inView]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="panel relative overflow-hidden"
      role="img" aria-label="Terminal showing Arpit's profile as JSON followed by a short playful session">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="ml-3 font-mono text-[11px] text-zinc-500">zsh / ~/arpit</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-zinc-500">
          <span className={`h-1.5 w-1.5 rounded-full ${paused ? "bg-warn" : "animate-breathe bg-accent"}`} />
          {paused ? "paused" : `session ${(round % sessions.length) + 1}/${sessions.length}`}
        </span>
      </div>
      <div className="min-h-[340px] space-y-1 p-5 pb-12 font-mono text-[12.5px] leading-relaxed sm:text-[13px]" aria-hidden="true">
        <AnimatePresence initial={false}>
          {script.slice(0, count).map((line, i) => (
            <motion.div
              key={i < whoami.length ? `w-${i}` : `${round}-${i}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Line line={line} />
            </motion.div>
          ))}
        </AnimatePresence>
        <p>
          <span className="text-accent">$</span>{" "}
          <span className="inline-block h-[1em] w-[0.5em] translate-y-[2px] animate-blink bg-zinc-300" />
        </p>
      </div>
    </div>
  );
}

export default memo(TerminalCard);
