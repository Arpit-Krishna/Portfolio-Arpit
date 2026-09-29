import { motion } from "framer-motion";
import { ArrowDown, DownloadSimple, MapPin } from "@phosphor-icons/react";
import { profile } from "../data/profile";
import TypingRoles from "./TypingRoles";
import TerminalCard from "./TerminalCard";
import MagneticButton from "./MagneticButton";
import SocialIcon from "./SocialIcon";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-40 top-10 -z-10 h-[520px] w-[520px] rounded-full bg-accent/[0.07] blur-[120px]"
        aria-hidden="true"
      />

      <div className="shell grid min-h-[100dvh] items-center gap-12 pb-16 pt-32 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-28">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl">
          <motion.p variants={item} className="chip w-fit !text-xs">
            <span className="h-1.5 w-1.5 animate-breathe rounded-full bg-accent" aria-hidden="true" />
            {profile.current.role.split(",")[0]} at {profile.current.company}
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={item}
            className="mt-7 text-4xl font-medium leading-none tracking-tighter text-zinc-50 md:text-6xl"
          >
            Hi, I&apos;m {profile.name}.
          </motion.h1>

          <motion.div variants={item} className="mt-5 h-7">
            <TypingRoles roles={profile.roles} />
          </motion.div>

          <motion.p variants={item} className="mt-7 max-w-[56ch] text-base leading-relaxed text-zinc-400 md:text-lg">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton href="#projects">
              View projects
              <ArrowDown size={16} weight="bold" aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href={profile.resume} variant="ghost" download>
              <DownloadSimple size={16} aria-hidden="true" />
              Download resume
            </MagneticButton>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ul className="flex items-center gap-2" aria-label="Social profiles">
              {profile.socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-zinc-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent active:translate-y-0"
                  >
                    <SocialIcon id={s.id} />
                  </a>
                </li>
              ))}
            </ul>
            <p className="flex items-center gap-1.5 font-mono text-xs text-zinc-500">
              <MapPin size={14} aria-hidden="true" />
              {profile.location}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.35 }}
          className="relative lg:translate-y-6"
        >
          <TerminalCard />
          <div className="absolute -bottom-6 right-6 hidden rounded-2xl border border-white/[0.08] bg-ink-850/90 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_40px_-20px_rgba(0,0,0,0.7)] backdrop-blur sm:block">
            <p className="font-mono text-[11px] text-zinc-500">acko_integration.success_rate</p>
            <p className="mt-1 font-mono text-sm text-zinc-200">
              <span className="text-zinc-500 line-through">50-60%</span>
              <span className="mx-2 text-zinc-600">to</span>
              <span className="text-accent">90%+</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
