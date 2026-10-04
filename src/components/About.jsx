import { motion } from "framer-motion";
import { Briefcase, Lightning } from "@phosphor-icons/react";
import { profile, stats } from "../data/profile";
import { stackLayers } from "../data/skills";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import portrait from "../assets/arpit.webp";

function monthsSince(iso) {
  const start = new Date(iso);
  const now = new Date();
  return Math.max(1, (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth());
}

function tenureLabel(iso) {
  const months = monthsSince(iso);
  if (months < 12) return `${months} months`;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return rest ? `${years} yr ${rest} mo` : `${years} yr`;
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="shell py-24 md:py-36">
      <SectionHeading index="01" eyebrow="About" id="about-title" title="Backend engineer who designs for the failure path first.">
        I studied computer science and AI at PSIT Kanpur, then went straight into production integrations. Most of my work lives
        where many partner APIs and upstream sources meet, so retries, timeouts and flaky upstreams are normal inputs, not edge cases.
      </SectionHeading>

      <div className="mt-16 grid gap-6 lg:grid-cols-12">
        {/* Portrait and current role */}
        <Reveal className="panel group relative overflow-hidden lg:col-span-4 lg:row-span-2">
          <img
            src={portrait}
            alt="Portrait of Arpit Krishna"
            width="500"
            height="499"
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.02] group-hover:grayscale-0 lg:h-full lg:aspect-auto"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950 via-ink-950/80 to-transparent p-6 pt-24">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              <Briefcase size={14} aria-hidden="true" />
              Currently
            </p>
            <p className="mt-2 text-lg font-medium text-zinc-50">
              {profile.current.role} at {profile.current.company}
            </p>
            <p className="mt-1 font-mono text-xs text-zinc-500">
              Since Aug 2025, {tenureLabel(profile.current.since)} in production
            </p>
          </div>
        </Reveal>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-white/[0.07] lg:col-span-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="bg-ink-900 p-6 md:p-8">
              <p className="font-mono text-3xl tracking-tight text-zinc-50 md:text-4xl">
                <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} display={s.display} />
              </p>
              <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-zinc-500">{s.label}</p>
            </Reveal>
          ))}
        </div>

        {/* Stack visualisation */}
        <Reveal delay={0.1} className="panel p-6 md:p-8 lg:col-span-8">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-lg font-medium text-zinc-100">How my stack fits together</h3>
            <span className="font-mono text-[11px] text-zinc-600">request path, top to bottom</span>
          </div>
          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="relative mt-6 space-y-2.5"
          >
            {stackLayers.map((row, i) => (
              <motion.li
                key={row.layer}
                variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                className="grid grid-cols-[88px_1fr] items-center gap-3 sm:grid-cols-[110px_1fr]"
              >
                <span className="font-mono text-xs text-zinc-500">
                  <span className="text-accent/70">L{i + 1}</span> {row.layer}
                </span>
                <div className="flex flex-wrap gap-1.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-2">
                  {row.items.map((it) => (
                    <span key={it} className="rounded-lg bg-white/[0.04] px-2.5 py-1 text-[13px] text-zinc-300">
                      {it}
                    </span>
                  ))}
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </Reveal>

        {/* Personal touch */}
        <Reveal delay={0.15} className="rounded-[1.75rem] border border-accent/20 bg-accent/[0.05] p-6 md:p-8 lg:col-span-12">
          <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-center md:gap-8">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent">
              <Lightning size={22} weight="fill" aria-hidden="true" />
            </span>
            <p className="max-w-[80ch] text-base leading-relaxed text-zinc-300">
              <span className="text-zinc-50">Off the clock:</span> I solve LeetCode for fun, prepare for GATE, and build side
              projects to try ideas that do not fit a production roadmap. At work I mentor interns and read every line an AI
              assistant writes before it ships.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
