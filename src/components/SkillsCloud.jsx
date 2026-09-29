import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { skillGroups, coreConcepts } from "../data/skills";
import SectionHeading from "./SectionHeading";
import SkillIcon from "./SkillIcon";
import Reveal from "./Reveal";

const tabs = [{ id: "all", label: "All" }, ...skillGroups.map((g) => ({ id: g.id, label: g.label }))];

export default function SkillsCloud() {
  const [filter, setFilter] = useState("all");

  const items = useMemo(() => {
    const groups = filter === "all" ? skillGroups : skillGroups.filter((g) => g.id === filter);
    return groups.flatMap((g) => g.items.map((it) => ({ ...it, group: g.label })));
  }, [filter]);

  const onKeyDown = (e) => {
    const i = tabs.findIndex((t) => t.id === filter);
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      setFilter(next.id);
      document.getElementById(`skill-tab-${next.id}`)?.focus();
    }
  };

  return (
    <section id="skills" aria-labelledby="skills-title" className="shell py-24 md:py-36">
      <SectionHeading index="02" eyebrow="Skills" id="skills-title" title="Tools I reach for, grouped by layer.">
        Everything here has shipped in a production service or a public project. No progress bars, just what I use.
      </SectionHeading>

      <Reveal className="mt-12">
        <LayoutGroup id="skills">
          <div
            role="tablist"
            aria-label="Filter skills by category"
            onKeyDown={onKeyDown}
            className="flex w-full gap-1 overflow-x-auto rounded-full border border-white/[0.07] bg-ink-900 p-1 [scrollbar-width:none] sm:w-fit"
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                id={`skill-tab-${t.id}`}
                role="tab"
                type="button"
                aria-selected={filter === t.id}
                aria-controls="skills-panel"
                tabIndex={filter === t.id ? 0 : -1}
                onClick={() => setFilter(t.id)}
                className={`relative shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
                  filter === t.id ? "text-ink-950" : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {filter === t.id && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>

          <motion.ul
            id="skills-panel"
            role="tabpanel"
            aria-labelledby={`skill-tab-${filter}`}
            layout
            className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {items.map((s, i) => (
                <motion.li
                  layout
                  key={s.name}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1, transition: { type: "spring", stiffness: 160, damping: 20, delay: i * 0.012 } }}
                  exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.15 } }}
                  className="group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-ink-900 px-4 py-3.5 transition-colors duration-300 hover:border-accent/30 hover:bg-ink-850"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.04] text-zinc-400 transition-colors duration-300 group-hover:text-accent">
                    <SkillIcon name={s.icon} size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-zinc-200">{s.name}</span>
                    <span className="block truncate font-mono text-[10px] uppercase tracking-wider text-zinc-600">{s.group}</span>
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 border-t border-white/[0.06] pt-8">
        <p className="eyebrow">Core concepts</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {coreConcepts.map((c) => (
            <li key={c} className="chip !text-xs !text-zinc-300">
              {c}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
