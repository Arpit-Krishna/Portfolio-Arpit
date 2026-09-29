import { memo, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Scripted terminal session. Each block is revealed line by line, then loops.
const script = [
  { kind: "cmd", text: "curl -s arpit.dev/api/whoami | jq" },
  { kind: "out", text: "{" },
  { kind: "json", k: "name", v: '"Arpit Krishna"' },
  { kind: "json", k: "role", v: '"Backend Engineer @ Cars24"' },
  { kind: "json", k: "stack", v: '["Go", "Spring Boot", "React"]' },
  { kind: "json", k: "open_to", v: '["full-time", "freelance"]', last: true },
  { kind: "out", text: "}" },
  { kind: "cmd", text: "ls ~/projects" },
  { kind: "out", text: "expensify/  hal-jivi/  medium-clone/" },
  { kind: "cmd", text: "cat ~/.badges" },
  { kind: "ok", text: "ok   leetcode     knight, top 5%" },
  { kind: "ok", text: "ok   gate_2025    AIR 1852" },
  { kind: "ok", text: "ok   hackerrank   6 star problem solving" },
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
  if (line.kind === "ok")
    return (
      <p className="whitespace-pre">
        <span className="text-accent">ok</span>
        <span className="text-zinc-400">{line.text.slice(2)}</span>
      </p>
    );
  return <p className="whitespace-pre text-zinc-500">{line.text}</p>;
}

function TerminalCard() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCount(script.length);
      return;
    }
    const done = count >= script.length;
    const next = script[count];
    const delay = done ? 4200 : next?.kind === "cmd" ? 900 : 140;
    const t = setTimeout(() => setCount(done ? 0 : count + 1), delay);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <div className="panel relative overflow-hidden" role="img" aria-label="Terminal showing Arpit's profile as JSON, personal projects and badges">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="ml-3 font-mono text-[11px] text-zinc-500">zsh / ~/arpit</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-zinc-500">
          <span className="h-1.5 w-1.5 animate-breathe rounded-full bg-accent" />
          live
        </span>
      </div>
      <div className="min-h-[340px] space-y-1 p-5 pb-12 font-mono text-[12.5px] leading-relaxed sm:text-[13px]" aria-hidden="true">
        <AnimatePresence initial={false}>
          {script.slice(0, count).map((line, i) => (
            <motion.div
              key={`${i}-${line.text || line.k}`}
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
