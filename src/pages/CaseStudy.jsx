import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, GithubLogo, LockSimple } from "@phosphor-icons/react";
import { projects } from "../data/projects";
import ProjectVisual from "../components/ProjectVisual";
import ArchitectureDiagram from "../components/ArchitectureDiagram";
import CaseStudyPreview from "../components/CaseStudyPreview";
import RepoStars from "../components/RepoStars";
import Reveal from "../components/Reveal";
import NotFound from "./NotFound";
import usePageMeta from "../hooks/usePageMeta";

function Block({ index, title, wide = false, children }) {
  return (
    <Reveal as="section" className="grid gap-6 border-t border-white/[0.06] py-14 md:grid-cols-12 md:py-20">
      <div className={wide ? "md:col-span-12" : "md:col-span-4"}>
        <p className="eyebrow">
          <span className="text-accent">{index}</span> / {title}
        </p>
      </div>
      <div className={`min-w-0 ${wide ? "md:col-span-12" : "md:col-span-8"}`}>{children}</div>
    </Reveal>
  );
}

const fade = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

export default function CaseStudy() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  usePageMeta(project ? `${project.title} case study` : undefined, project?.tagline);

  if (!project)
    return <NotFound title="Case study not found" message="There is no case study at this address. The four featured projects are listed on the home page." />;

  const next = projects[(index + 1) % projects.length];
  const cs = project.caseStudy;

  return (
    <article className="pb-24">
      <header className="shell pt-32 md:pt-40">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
          <motion.div variants={fade}>
            <Link to="/#projects" className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-100">
              <ArrowLeft size={14} aria-hidden="true" />
              All work
            </Link>
          </motion.div>
          <motion.p variants={fade} className="eyebrow mt-10">
            Case study / {project.org} / {project.period}
          </motion.p>
          <motion.h1 variants={fade} className="mt-4 max-w-4xl text-4xl font-medium leading-none tracking-tighter text-zinc-50 md:text-6xl">
            {project.title}
          </motion.h1>
          <motion.p variants={fade} className="mt-6 max-w-[60ch] text-lg leading-relaxed text-zinc-400">
            {project.tagline}
          </motion.p>

          <motion.div variants={fade} className="mt-8 flex flex-wrap items-center gap-3">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-ink-950 active:scale-[0.98]"
              >
                <GithubLogo size={16} aria-hidden="true" />
                {project.githubSecondary ? "API repository" : "View repository"}
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-zinc-400">
                <LockSimple size={16} aria-hidden="true" />
                Private code, {project.visibility.toLowerCase()}
              </span>
            )}
            {project.githubSecondary && (
              <a
                href={project.githubSecondary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-zinc-200 hover:border-white/20"
              >
                <GithubLogo size={16} aria-hidden="true" />
                {project.githubSecondary.label} repository
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-zinc-200 hover:border-white/20"
              >
                Live demo
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
            <RepoStars repo={project.repo} />
          </motion.div>
        </motion.div>

        <Reveal delay={0.2} className="mt-14">
          <ProjectVisual project={project} showMetrics={false} className="aspect-[16/9] rounded-[1.75rem] border border-white/[0.07] md:aspect-[21/9]" />
        </Reveal>

        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-white/[0.07] md:grid-cols-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="flex flex-col bg-ink-900 p-5 md:p-6">
              <dt className="order-2 mt-2 text-sm text-zinc-500">{m.label}</dt>
              <dd className="font-mono text-2xl tracking-tight text-zinc-50 md:text-3xl">{m.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="shell mt-16">
        <Block index="01" title="Problem and users">
          <p className="max-w-[65ch] text-lg leading-relaxed text-zinc-200">{cs.problem}</p>
          <p className="mt-6 max-w-[65ch] leading-relaxed text-zinc-400">
            <span className="text-zinc-200">Who it serves: </span>
            {cs.users}
          </p>
        </Block>

        <Block index="02" title="Constraints and trade-offs">
          <ul className="space-y-3">
            {cs.constraints.map((c) => (
              <li key={c} className="flex gap-3 leading-relaxed text-zinc-300">
                <span className="mt-2.5 h-px w-3 shrink-0 bg-accent/60" aria-hidden="true" />
                <span className="max-w-[65ch]">{c}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {cs.tradeoffs.map((t) => (
              <div key={t.chose} className="grid gap-2 py-5 md:grid-cols-[1fr_1.4fr] md:gap-8">
                <p className="text-zinc-100">
                  {t.chose}
                  <span className="mt-1 block font-mono text-xs text-zinc-600">over {t.over.toLowerCase()}</span>
                </p>
                <p className="text-[15px] leading-relaxed text-zinc-400">{t.why}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block index="03" title="Architecture" wide>
          <ArchitectureDiagram architecture={cs.architecture} />
        </Block>

        <Block index="04" title="UI and system states">
          <ul className="grid gap-3 sm:grid-cols-2">
            {cs.states.map((s, i) => (
              <li key={s.label} className="rounded-2xl border border-white/[0.07] bg-ink-900 p-5">
                <p className="flex items-center gap-2 font-mono text-xs text-zinc-500">
                  <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "animate-breathe bg-accent" : "bg-zinc-600"}`} aria-hidden="true" />
                  state.{s.label.toLowerCase().replace(/\s+/g, "_")}
                </p>
                <p className="mt-3 text-zinc-100">{s.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500">{s.note}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block index="05" title="Results">
          <ul className="space-y-4">
            {cs.results.map((r) => (
              <li key={r} className="flex gap-3 text-lg leading-relaxed text-zinc-200">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span className="max-w-[60ch]">{r}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block index="06" title="Lessons">
          <div className="space-y-6">
            {cs.lessons.map((l) => (
              <blockquote key={l} className="max-w-[62ch] border-l border-accent/40 pl-5 leading-relaxed text-zinc-300">
                {l}
              </blockquote>
            ))}
          </div>
        </Block>

        <div className="mt-8">
          <CaseStudyPreview project={next} />
        </div>
      </div>
    </article>
  );
}
