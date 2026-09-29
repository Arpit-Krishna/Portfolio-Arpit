import { motion, useScroll, useSpring } from "framer-motion";

// Thin accent bar across the top that tracks page scroll.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.2 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, originX: 0 }}
      className="fixed inset-x-0 top-0 z-[55] h-[2px] bg-accent"
    />
  );
}
