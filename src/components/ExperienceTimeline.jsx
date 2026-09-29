import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Certificate, Trophy } from "@phosphor-icons/react";
import { experience } from "../data/experience";
import { achievements, certifications } from "../data/profile";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function ExperienceTimeline() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="shell py-24 md:py-36">
      <SectionHeading index="05" eyebrow="Experience" id="experience-title" title="Where I have worked and studied.">
        The line fills as you scroll. Details below come straight from my resume.
      </SectionHeading>

      <div className="mt-16 grid gap-16 lg:grid-cols-12">
        <ol ref={listRef} className="relative space-y-14 lg:col-span-8">
          <span className="absolute bottom-2 left-[7px] top-2 w-px bg-white/[0.08]" aria-hidden="true" />
          <motion.span
            style={{ scaleY: progress, originY: 0 }}
            className="absolute bottom-2 left-[7px] top-2 w-px bg-accent"
            aria-hidden="true"
          />
          {experience.map((job) => (
            <Reveal as="li" key={job.company} className="relative pl-10">
              <span
                className={`absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border ${
                  job.current ? "border-accent bg-ink-950" : "border-white/20 bg-ink-950"
                }`}
                aria-hidden="true"
              >
                {job.current && <span className="h-[7px] w-[7px] animate-breathe rounded-full bg-accent" />}
              </span>

              <p className="font-mono text-xs text-zinc-500">
                {job.start} {job.end && <>- {job.end}</>}
                {job.current && <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-accent">now</span>}
              </p>
              <h3 className="mt-2 text-xl font-medium tracking-tight text-zinc-50 md:text-2xl">{job.role}</h3>
              <p className="mt-1 text-sm text-zinc-400">
                {job.company} <span className="text-zinc-600">/ {job.location}</span>
              </p>
              <p className="mt-4 max-w-[65ch] leading-relaxed text-zinc-300">{job.summary}</p>

              {job.highlights.length > 0 && (
                <ul className="mt-5 space-y-3">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-zinc-400">
                      <span className="mt-2.5 h-px w-3 shrink-0 bg-accent/60" aria-hidden="true" />
                      <span className="max-w-[65ch]">{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies used">
                {job.tech.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>

        <aside className="space-y-10 lg:col-span-4" aria-label="Achievements and certifications">
          <Reveal>
            <h3 className="eyebrow flex items-center gap-2">
              <Trophy size={14} className="text-accent" aria-hidden="true" />
              Achievements
            </h3>
            <ul className="mt-4 divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {achievements.map((a) => (
                <li key={a.title} className="py-4">
                  <p className="text-sm font-medium text-zinc-100">{a.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-500">{a.detail}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="eyebrow flex items-center gap-2">
              <Certificate size={14} className="text-accent" aria-hidden="true" />
              Certifications
            </h3>
            <ul className="mt-4 space-y-2.5">
              {certifications.map((c) => (
                <li key={c} className="text-sm leading-relaxed text-zinc-400">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}
