import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, GithubLogo, LockSimple } from "@phosphor-icons/react";
import ProjectVisual from "./ProjectVisual";
import RepoStars from "./RepoStars";

// Image on top, content below. Lifts on hover with a tinted shadow and a cursor-tracking border.
export default function ProjectCard({ project, featured = false, index = 0 }) {
  const ref = useRef(null);

  const onPointerMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.article
      ref={ref}
      onPointerMove={onPointerMove}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: (index % 2) * 0.08 }}
      whileHover={{ y: -6 }}
      aria-labelledby={`project-${project.slug}`}
      className="spotlight group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-ink-900 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(95,212,160,0.25)]"
    >
      <ProjectVisual project={project} className={`border-b border-white/[0.06] ${featured ? "aspect-[16/9]" : "aspect-[4/3]"}`} />

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-center justify-between gap-3 font-mono text-[11px] text-zinc-500">
          <span>
            {project.org} / {project.period}
          </span>
          {project.repo ? (
            <RepoStars repo={project.repo} />
          ) : (
            <span className="inline-flex items-center gap-1">
              <LockSimple size={12} aria-hidden="true" />
              {project.visibility}
            </span>
          )}
        </div>

        <h3 id={`project-${project.slug}`} className="mt-3 text-2xl font-medium tracking-tight text-zinc-50">
          {project.title}
        </h3>
        <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-zinc-400">{project.description}</p>

        <p className="mt-4 flex gap-2 text-sm text-zinc-200">
          <ArrowRight size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
          <span>{project.outcome}</span>
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.stack.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          <Link
            to={`/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-4 py-2 text-sm text-zinc-100 transition-colors hover:bg-accent hover:text-ink-950 active:scale-[0.98]"
          >
            Read case study
            <span className="sr-only"> for {project.title}</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              <GithubLogo size={16} aria-hidden="true" />
              Code
              <span className="sr-only"> for {project.title} on GitHub (opens in a new tab)</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              Live demo
              <ArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only"> of {project.title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
