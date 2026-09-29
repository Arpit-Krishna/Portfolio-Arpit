import { memo, useState } from "react";
import { motion } from "framer-motion";
import { ImageBroken } from "@phosphor-icons/react";

function TerminalVisual({ visual, metrics = [] }) {
  return (
    <div className="flex h-full flex-col bg-ink-950 p-4 font-mono text-[11px] leading-relaxed sm:p-5 sm:text-xs">
      <p className="mb-3 flex items-center gap-2 text-zinc-600">

        <span className="h-1.5 w-1.5 animate-breathe rounded-full bg-accent" />
        {visual.title}
      </p>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: { staggerChildren: 0.18 } } }}
        className="space-y-1"
      >
        {visual.lines.map((l) => (
          <motion.p
            key={l.v}
            variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
            className={`truncate ${l.t === "ok" ? "text-accent" : l.t === "warn" ? "text-amber-300/80" : "text-zinc-500"}`}
          >
            {l.v}
          </motion.p>
        ))}
      </motion.div>
      {metrics.length > 0 && (
        <dl className="mt-auto hidden grid-cols-4 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.06] pt-0 sm:grid">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col bg-ink-900 px-3 py-2.5">
              <dt className="order-2 text-[10px] text-zinc-600">{m.label}</dt>
              <dd className="text-sm text-zinc-200">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

const budgets = [
  { name: "Rent", spent: 18000, limit: 18000 },
  { name: "Food", spent: 7420, limit: 8000 },
  { name: "Travel", spent: 3190, limit: 2500 },
  { name: "Bills", spent: 2265, limit: 4000 },
];

function BudgetVisual() {
  return (
    <div className="flex h-full flex-col justify-between bg-ink-950 p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-400">September budgets</p>
        <span className="rounded-full bg-amber-300/10 px-2 py-0.5 font-mono text-[10px] text-amber-200">1 over limit</span>
      </div>
      <div className="mt-4 space-y-3">
        {budgets.map((b, i) => {
          const pct = Math.min(1, b.spent / b.limit);
          const over = b.spent > b.limit;
          return (
            <div key={b.name}>
              <div className="flex justify-between font-mono text-[10px] text-zinc-500">
                <span>{b.name}</span>
                <span className={over ? "text-amber-200" : ""}>
                  {b.spent.toLocaleString("en-IN")} / {b.limit.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: pct }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.1 + i * 0.08 }}
                  style={{ originX: 0 }}
                  className={`h-full rounded-full ${over ? "bg-amber-300/80" : "bg-accent/80"}`}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2 font-mono text-[10px] text-zinc-400">
        <span className="h-1.5 w-1.5 animate-breathe rounded-full bg-accent" />
        recurring: rent posted once, 2 retries skipped
      </p>
    </div>
  );
}

function ImageVisual({ visual }) {
  const [status, setStatus] = useState("loading");
  return (
    <div className="relative h-full bg-ink-950">
      {status === "loading" && <div className="skeleton absolute inset-0" aria-hidden="true" />}
      {status === "error" ? (
        <div className="grid h-full place-items-center text-center text-zinc-600">
          <div>
            <ImageBroken size={28} className="mx-auto" aria-hidden="true" />
            <p className="mt-2 font-mono text-[11px]">Screenshot unavailable</p>
          </div>
        </div>
      ) : (
        <img
          src={visual.src}
          alt={visual.alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus("ready")}
          onError={() => setStatus("error")}
          className={`h-full w-full object-cover object-top transition-all duration-700 group-hover:scale-[1.03] ${
            status === "ready" ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
    </div>
  );
}

// Picks the right visual for a project: a real screenshot, a log terminal, or a UI mock.
function ProjectVisual({ project, className = "", showMetrics = true }) {
  const { visual } = project;
  return (
    <div className={`overflow-hidden ${className}`}>
      {visual.kind === "image" && <ImageVisual visual={visual} />}
      {visual.kind === "terminal" && <TerminalVisual visual={visual} metrics={showMetrics ? project.metrics : []} />}
      {visual.kind === "budget" && <BudgetVisual />}
    </div>
  );
}

export default memo(ProjectVisual);
