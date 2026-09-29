import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Word({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  );
}

// A large statement whose words light up one by one as you scroll through it.
export default function ScrollLitText({ text, accentWords = [] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <section aria-label="Statement" className="shell py-24 md:py-36">
      <p ref={ref} className="max-w-5xl text-3xl font-medium leading-[1.15] tracking-tighter text-zinc-50 md:text-5xl lg:text-6xl">
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          {words.map((w, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            const clean = w.replace(/[.,]/g, "");
            return (
              <span key={i} className={accentWords.includes(clean) ? "text-accent" : undefined}>
                <Word word={w} progress={scrollYProgress} range={[start, end]} />
              </span>
            );
          })}
        </span>
      </p>
    </section>
  );
}
