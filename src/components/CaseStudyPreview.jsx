import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import ProjectVisual from "./ProjectVisual";

// Compact teaser linking to another case study. Used at the foot of each case study.
export default function CaseStudyPreview({ project, label = "Next case study" }) {
  if (!project) return null;
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group grid overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-ink-900 transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_30px_60px_-30px_rgba(95,212,160,0.25)] md:grid-cols-[1.2fr_1fr]"
    >
      <div className="flex flex-col justify-between gap-8 p-7 md:p-10">
        <p className="eyebrow">{label}</p>
        <div>
          <h2 className="text-3xl font-medium tracking-tighter text-zinc-50 md:text-4xl">{project.title}</h2>
          <p className="mt-3 max-w-[48ch] leading-relaxed text-zinc-400">{project.tagline}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm text-accent">
            Read the case study
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </div>
      <ProjectVisual project={project} className="aspect-[16/10] border-t border-white/[0.06] md:aspect-auto md:border-l md:border-t-0" />
    </Link>
  );
}
