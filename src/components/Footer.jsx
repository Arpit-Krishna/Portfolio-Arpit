import { ArrowUp } from "@phosphor-icons/react";
import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="shell flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-sm text-zinc-300">
            arpit<span className="text-accent">.</span>dev
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            {new Date().getFullYear()} {profile.name}. Built with React, Tailwind and Framer Motion.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-5 text-sm text-zinc-500">
          {profile.socials.map((s) => (
            <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-zinc-100">
              {s.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-zinc-400 transition-colors hover:text-zinc-100"
          >
            <ArrowUp size={14} aria-hidden="true" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
