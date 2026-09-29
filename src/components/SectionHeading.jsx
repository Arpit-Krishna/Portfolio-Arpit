import Reveal from "./Reveal";

export default function SectionHeading({ index, eyebrow, title, children, id }) {
  return (
    <div className="grid gap-6 md:grid-cols-12 md:items-end">
      <Reveal className="md:col-span-7">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-white/15" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 id={id} className="mt-4 text-3xl font-medium leading-[1.05] tracking-tighter text-zinc-50 md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {children && (
        <Reveal delay={0.08} className="max-w-[46ch] text-base leading-relaxed text-zinc-400 md:col-span-5">
          {children}
        </Reveal>
      )}
    </div>
  );
}
