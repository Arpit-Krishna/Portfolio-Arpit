import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const variants = {
  primary:
    "bg-accent text-ink-950 shadow-[0_10px_30px_-12px_rgba(95,212,160,0.55)] hover:bg-[#6fdcab]",
  ghost:
    "border border-white/10 bg-white/[0.03] text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-white/20 hover:bg-white/[0.06]",
};

// A button or link that drifts toward the pointer. Motion values keep the effect
// outside React's render cycle, so it never triggers re-renders.
export default function MagneticButton({ href, variant = "primary", className = "", children, strength = 0.28, ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });

  const onPointerMove = (e) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? motion.a : motion.button;
  return (
    <Component
      ref={ref}
      href={href}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
