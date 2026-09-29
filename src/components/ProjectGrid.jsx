import { projects } from "../data/projects";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";

// Asymmetric 6-column grid. Three projects: one wide on top, two halves below.
// Four or more: wide, narrow / narrow, wide. Collapses to one column on mobile.
const layouts = {
  3: ["lg:col-span-6 md:col-span-2", "lg:col-span-3", "lg:col-span-3"],
  default: ["lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-4"],
};

export default function ProjectGrid() {
  const spans = layouts[projects.length] ?? layouts.default;
  return (
    <section id="projects" aria-labelledby="projects-title" className="shell py-24 md:py-36">
      <SectionHeading index="03" eyebrow="Selected work" id="projects-title" title="Things I have built on my own time.">
        Personal and academic builds, shipped end to end. Each card links to a case study with the problem, trade-offs,
        architecture and results. My work at Cars24 is under Experience.
      </SectionHeading>

      {projects.length === 0 ? (
        <div className="mt-14 rounded-[1.75rem] border border-dashed border-white/10 p-10 text-center">
          <p className="text-zinc-300">No projects yet.</p>
          <p className="mt-1 text-sm text-zinc-500">Add entries to src/data/projects.js to fill this grid.</p>
        </div>
      ) : (
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
          {projects.map((p, i) => (
            <div key={p.slug} className={spans[i % spans.length]}>
              <ProjectCard project={p} index={i} featured={i === 0} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
