import { memo, useEffect, useState } from "react";

// Types and deletes each role in turn. Isolated so its ticks never re-render the hero.
function TypingRoles({ roles }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const full = roles[index % roles.length];
    if (reduce) {
      setText(full);
      const t = setTimeout(() => setIndex((i) => i + 1), 2600);
      return () => clearTimeout(t);
    }
    let delay = deleting ? 38 : 72;
    if (!deleting && text === full) delay = 1800;
    if (deleting && text === "") delay = 320;

    const t = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else setText(full.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, roles]);

  return (
    <p className="font-mono text-base text-zinc-300 md:text-lg">
      <span className="text-accent" aria-hidden="true">
        ~/arpit ${" "}
      </span>
      <span className="sr-only">Roles: {roles.join(", ")}</span>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true" className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[3px] animate-blink bg-accent" />
    </p>
  );
}

export default memo(TypingRoles);
