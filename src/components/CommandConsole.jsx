import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { profile, stats, navLinks } from "../data/profile";
import { projects } from "../data/projects";
import { skillGroups } from "../data/skills";
import { experience } from "../data/experience";
import { useTheme } from "../theme/ThemeContext";

const COMMANDS = [
  ["help", "list commands"],
  ["whoami", "who is this"],
  ["about", "short intro"],
  ["skills", "tools by category"],
  ["projects", "featured work"],
  ["open <project>", "open a case study"],
  ["cd <section>", "jump to a section"],
  ["experience", "where I've worked"],
  ["theme [name]", "list or switch themes"],
  ["contact", "how to reach me"],
  ["resume", "download my resume"],
  ["github | linkedin | leetcode", "open a profile"],
  ["clear", "clear the screen"],
  ["exit", "close the terminal"],
];

const sectionIds = navLinks.map((l) => l.id);
const completions = [
  ...COMMANDS.map(([c]) => c.split(" ")[0]),
  "sudo",
  "date",
  "echo",
  ...projects.map((p) => `open ${p.slug}`),
  ...sectionIds.map((s) => `cd ${s}`),
];

const Prompt = () => (
  <span className="shrink-0">
    <span className="text-accent">guest@arpit</span>
    <span className="text-zinc-500">:~$</span>
  </span>
);

function Row({ label, children }) {
  return (
    <p className="grid grid-cols-[minmax(0,11rem)_1fr] gap-3">
      <span className="text-accent">{label}</span>
      <span className="text-zinc-400">{children}</span>
    </p>
  );
}

const welcome = () => [
  {
    id: 0,
    out: (
      <div className="text-zinc-400">
        <p className="text-zinc-100">arpit.dev shell, v2026.09</p>
        <p>
          Type <span className="text-accent">help</span> to see what I can do. Tab completes, arrow keys walk history.
        </p>
      </div>
    ),
  },
];

// Keyboard-first terminal overlay. Opens with Ctrl/Cmd+K, "/" or the nav button.
export default function CommandConsole({ open, onClose }) {
  const navigate = useNavigate();
  const { theme, themes, setTheme } = useTheme();
  const [lines, setLines] = useState(welcome);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const idRef = useRef(1);
  const returnFocus = useRef(null);

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
      return () => {
        document.body.style.overflow = "";
        returnFocus.current?.focus?.();
      };
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const go = useCallback(
    (to) => {
      onClose();
      setTimeout(() => navigate(to), 180);
    },
    [navigate, onClose]
  );

  const run = (raw) => {
    const cmdline = raw.trim();
    const [cmd = "", ...args] = cmdline.split(/\s+/);
    const arg = args.join(" ").toLowerCase();
    const say = (out) => ({ id: idRef.current++, cmd: cmdline, out });

    switch (cmd.toLowerCase()) {
      case "":
        return say(null);
      case "help":
        return say(
          <div className="space-y-0.5">
            {COMMANDS.map(([c, d]) => (
              <Row key={c} label={c}>
                {d}
              </Row>
            ))}
          </div>
        );
      case "whoami":
        return say(
          <p className="text-zinc-300">
            {profile.name}, {profile.current.role} at {profile.current.company}. {profile.location}.
          </p>
        );
      case "about":
        return say(
          <div className="space-y-2 text-zinc-300">
            <p>{profile.intro}</p>
            {stats.map((s) => (
              <Row key={s.label} label={s.display ?? `${s.prefix}${s.value}${s.suffix}`}>
                {s.label}
              </Row>
            ))}
          </div>
        );
      case "skills":
        return say(
          <div className="space-y-0.5">
            {skillGroups.map((g) => (
              <Row key={g.id} label={g.label.toLowerCase()}>
                {g.items.map((i) => i.name).join(", ")}
              </Row>
            ))}
          </div>
        );
      case "ls":
      case "projects":
        return say(
          <div className="space-y-0.5">
            {projects.map((p) => (
              <Row key={p.slug} label={p.slug}>
                {p.title}: {p.outcome}
              </Row>
            ))}
            <p className="pt-1 text-zinc-500">
              Run <span className="text-accent">open {projects[0].slug}</span> to read a case study.
            </p>
          </div>
        );
      case "open": {
        const hit = projects.find((p) => p.slug === arg || p.title.toLowerCase() === arg);
        if (!hit) return say(<p className="text-danger">open: no project called "{arg || "?"}". Try projects.</p>);
        go(`/work/${hit.slug}`);
        return say(<p className="text-zinc-400">Opening {hit.title}...</p>);
      }
      case "cd": {
        const target = arg.replace(/^[~/#.]+/, "") || "top";
        if (target === "top" || target === "home") {
          go("/");
          return say(<p className="text-zinc-400">Back to the top.</p>);
        }
        const match = navLinks.find((l) => l.id === target || l.label.toLowerCase() === target);
        if (!match) return say(<p className="text-danger">cd: no such section: {target}. Try {sectionIds.join(", ")}.</p>);
        go(`/#${match.id}`);
        return say(<p className="text-zinc-400">Jumping to {match.label}...</p>);
      }
      case "experience":
        return say(
          <div className="space-y-0.5">
            {experience.map((e) => (
              <Row key={e.company} label={`${e.start} ${e.end}`.trim()}>
                {e.role}, {e.company}
              </Row>
            ))}
          </div>
        );
      case "theme": {
        if (!arg)
          return say(
            <div className="space-y-0.5">
              {themes.map((t) => (
                <Row key={t.id} label={`${t.id === theme ? "* " : "  "}${t.id}`}>
                  {t.label}, {t.note.toLowerCase()}
                </Row>
              ))}
              <p className="pt-1 text-zinc-500">
                Run <span className="text-accent">theme amber</span> to switch.
              </p>
            </div>
          );
        const t = themes.find((x) => x.id === arg || x.label.toLowerCase() === arg);
        if (!t) return say(<p className="text-danger">theme: unknown theme "{arg}".</p>);
        setTheme(t.id);
        return say(<p className="text-zinc-400">Theme set to {t.label}.</p>);
      }
      case "contact":
      case "email":
        navigator.clipboard?.writeText(profile.email).catch(() => {});
        return say(
          <div className="text-zinc-300">
            <p>
              <a href={`mailto:${profile.email}`} className="text-accent underline underline-offset-4">
                {profile.email}
              </a>{" "}
              <span className="text-zinc-500">(copied to clipboard)</span>
            </p>
            <p className="text-zinc-500">{profile.responseTime}</p>
          </div>
        );
      case "resume": {
        const a = document.createElement("a");
        a.href = profile.resume;
        a.download = "";
        a.click();
        return say(<p className="text-zinc-400">Downloading resume...</p>);
      }
      case "github":
      case "linkedin":
      case "leetcode": {
        const s = profile.socials.find((x) => x.id === cmd.toLowerCase());
        window.open(s.href, "_blank", "noopener,noreferrer");
        return say(<p className="text-zinc-400">Opening {s.label} in a new tab...</p>);
      }
      case "date":
        return say(<p className="text-zinc-300">{new Date().toString()}</p>);
      case "echo":
        return say(<p className="text-zinc-300">{args.join(" ")}</p>);
      case "sudo":
        if (arg.startsWith("hire")) {
          go("/#contact");
          return say(<p className="text-accent">[sudo] permission granted. Taking you to the contact form...</p>);
        }
        return say(<p className="text-danger">guest is not in the sudoers file. This incident will be reported. (Try sudo hire-arpit.)</p>);
      case "rm":
        return say(<p className="text-danger">Nice try. This portfolio is idempotent.</p>);
      case "exit":
        onClose();
        return say(null);
      default:
        return say(
          <p className="text-danger">
            command not found: {cmd}. Type <span className="text-accent">help</span>.
          </p>
        );
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === "clear") {
      setLines([]);
    } else {
      const line = run(input);
      setLines((prev) => [...prev, line]);
    }
    if (input.trim()) setHistory((h) => [...h, input.trim()]);
    setCursor(-1);
    setInput("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cursor === -1) return;
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setInput("");
      } else {
        setCursor(next);
        setInput(history[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const value = input.toLowerCase();
      const matches = completions.filter((c) => c.startsWith(value));
      if (matches.length === 1) setInput(matches[0] + " ");
      else if (matches.length > 1 && value)
        setLines((prev) => [...prev, { id: idRef.current++, cmd: input, out: <p className="text-zinc-500">{matches.join("   ")}</p> }]);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-ink-950/60 px-3 pt-[12vh] backdrop-blur-sm sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onPointerDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Interactive terminal"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="flex max-h-[70vh] w-full max-w-2xl flex-col overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-ink-900 shadow-[inset_0_1px_0_rgb(var(--overlay)/0.06),0_40px_80px_-30px_rgb(0_0_0/0.6)]"
          >
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
              <button type="button" onClick={onClose} aria-label="Close terminal" className="h-3 w-3 rounded-full bg-danger/80" />
              <span className="h-3 w-3 rounded-full bg-warn/70" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-accent/80" aria-hidden="true" />
              <span className="ml-3 font-mono text-[11px] text-zinc-500">guest@arpit: ~</span>
              <kbd className="ml-auto rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">esc</kbd>
            </div>
            <div
              ref={scrollRef}
              onClick={() => inputRef.current?.focus()}
              className="flex-1 space-y-3 overflow-y-auto p-4 font-mono text-[12.5px] leading-relaxed sm:p-5 sm:text-[13px]"
              aria-live="polite"
            >
              {lines.map((l) => (
                <div key={l.id} className="space-y-1">
                  {l.cmd !== undefined && (
                    <p className="flex gap-2">
                      <Prompt />
                      <span className="break-all text-zinc-100">{l.cmd}</span>
                    </p>
                  )}
                  {l.out}
                </div>
              ))}
              <form onSubmit={onSubmit} className="flex items-center gap-2">
                <label htmlFor="console-input" className="flex">
                  <Prompt />
                  <span className="sr-only">Command</span>
                </label>
                <input
                  id="console-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  className="min-w-0 flex-1 bg-transparent text-zinc-100 caret-accent outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </form>
            </div>
            <div className="flex flex-wrap gap-1.5 border-t border-white/[0.06] px-4 py-2.5">
              {["help", "projects", "theme", "sudo hire-arpit"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setLines((prev) => [...prev, run(c)]);
                    setHistory((h) => [...h, c]);
                    inputRef.current?.focus();
                  }}
                  className="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[11px] text-zinc-400 transition-colors hover:border-accent/40 hover:text-accent"
                >
                  {c}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
