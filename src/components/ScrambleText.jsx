import { memo, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

// Decodes text from random glyphs when it scrolls into view, and again on hover.
// Writes straight to the DOM so it never re-renders React.
function ScrambleText({ text, className = "", as: Tag = "span", duration = 700, hover = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const frame = useRef(0);

  const play = () => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const revealed = Math.floor(p * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        out += i < revealed || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      node.textContent = out;
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (inView) play();
    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, text]);

  return (
    <Tag className={className} aria-label={text}>
      <span ref={ref} aria-hidden="true" onMouseEnter={hover ? play : undefined}>
        {text}
      </span>
    </Tag>
  );
}

export default memo(ScrambleText);
