import { memo, useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

// Counts from 0 to `to` when scrolled into view. Writes straight to the DOM node
// so the animation never re-renders React.
function CountUp({ to, prefix = "", suffix = "", display }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !ref.current || display) return;
    const node = ref.current;
    const finalText = `${prefix}${to.toLocaleString("en-IN")}${suffix}`;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.textContent = finalText;
      return;
    }
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${prefix}${Math.round(v).toLocaleString("en-IN")}${suffix}`;
      },
      onComplete: () => {
        node.textContent = finalText;
      },
    });
    return () => controls.stop();
  }, [inView, to, prefix, suffix, display]);

  return (
    <span ref={ref} className="tabular-nums">
      {display ?? `${prefix}${to}${suffix}`}
    </span>
  );
}

export default memo(CountUp);
