import { motion } from "framer-motion";

// Fades and lifts children into view once. Use `delay` to cascade siblings.
export default function Reveal({ as = "div", delay = 0, y = 24, className, children, ...rest }) {
  const Component = motion[as];
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
