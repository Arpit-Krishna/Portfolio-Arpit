import { memo, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";

const words = [
  "Go", "Virtual threads", "Spring Boot", "Circuit breakers", "FastAPI", "Kafka", "PostgreSQL",
  "Valkey", "React", "Docker", "Resilience4j", "Cloudflare Workers", "Design docs", "Staged rollouts",
];

// Endless ticker that speeds up with scroll velocity and flips direction when you scroll up.
function Row({ baseVelocity, outline = false }) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const direction = useRef(1);
  const reduce = useRef(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const translate = useTransform(x, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce.current) return;
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    const move = direction.current * baseVelocity * (delta / 1000) * (1 + Math.abs(f));
    x.set(x.get() + move);
  });

  const row = [...words, ...words];
  return (
    <motion.div style={{ x: translate }} className="flex w-max gap-10">
      {row.map((w, i) => (
        <span
          key={i}
          className={`flex items-center gap-10 whitespace-nowrap ${
            outline ? "text-outline text-3xl font-medium tracking-tight md:text-5xl" : "font-mono text-sm text-zinc-500"
          }`}
        >
          {w}
          <span className={outline ? "h-2 w-2 rounded-full bg-accent/70" : "h-1 w-1 rounded-full bg-accent/60"} />
        </span>
      ))}
    </motion.div>
  );
}

function Marquee() {
  return (
    <div
      className="relative space-y-4 overflow-hidden border-y border-white/[0.06] py-6 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
      aria-hidden="true"
    >
      <Row baseVelocity={-2} outline />
      <Row baseVelocity={1.4} />
    </div>
  );
}

export default memo(Marquee);
