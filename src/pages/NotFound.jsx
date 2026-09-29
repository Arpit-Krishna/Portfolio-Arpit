import { Link } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import usePageMeta from "../hooks/usePageMeta";

export default function NotFound({ title = "Page not found", message = "That route does not exist. It may have moved when the site was rebuilt." }) {
  usePageMeta(title);
  return (
    <section className="shell flex min-h-[80dvh] flex-col justify-center pt-28">
      <p className="font-mono text-sm text-zinc-500">
        <span className="text-accent">$</span> curl -I {typeof window !== "undefined" ? window.location.pathname : ""}
      </p>
      <p className="mt-2 font-mono text-sm text-rose-300">HTTP/2 404</p>
      <h1 className="mt-8 text-4xl font-medium tracking-tighter text-zinc-50 md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-[52ch] leading-relaxed text-zinc-400">{message}</p>
      <Link
        to="/"
        className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-ink-950 active:scale-[0.98]"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to home
      </Link>
    </section>
  );
}
