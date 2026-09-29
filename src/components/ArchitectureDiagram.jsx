import { memo } from "react";
import { motion } from "framer-motion";

// Renders a left-to-right pipeline on desktop and a top-to-bottom one on mobile.
// A dot travels along each connector to show direction of data flow.
function Connector({ index }) {
  return (
    <div className="relative flex items-center justify-center py-1 lg:px-1 lg:py-0" aria-hidden="true">
      <div className="relative h-6 w-px overflow-hidden bg-white/10 lg:h-px lg:w-8">
        <motion.span
          className="absolute left-0 top-0 hidden h-px w-3 bg-accent lg:block"
          animate={{ x: [-12, 32] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: index * 0.25 }}
        />
        <motion.span
          className="absolute left-0 top-0 block h-3 w-px bg-accent lg:hidden"
          animate={{ y: [-12, 24] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.25 }}
        />
      </div>
    </div>
  );
}

function ArchitectureDiagram({ architecture }) {
  const { nodes, caption } = architecture;
  return (
    <figure>
      <div className="panel overflow-x-auto p-5 md:p-8">
        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-col items-stretch lg:flex-row lg:items-center lg:justify-between"
          aria-label="Data flow, in order"
        >
          {nodes.map((n, i) => (
            <li key={n.label} className="flex flex-col lg:flex-row lg:items-center">
              <motion.div
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                className={`rounded-2xl border px-4 py-3 lg:min-w-[112px] ${
                  i === 0 || i === nodes.length - 1
                    ? "border-accent/30 bg-accent/[0.06]"
                    : "border-white/[0.08] bg-white/[0.02]"
                }`}
              >
                <p className="font-mono text-[10px] text-zinc-600">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-1 text-sm font-medium text-zinc-100">{n.label}</p>
                <p className="font-mono text-[11px] text-zinc-500">{n.sub}</p>
              </motion.div>
              {i < nodes.length - 1 && <Connector index={i} />}
            </li>
          ))}
        </motion.ol>
      </div>
      {caption && <figcaption className="mt-3 font-mono text-xs text-zinc-600">{caption}</figcaption>}
    </figure>
  );
}

export default memo(ArchitectureDiagram);
