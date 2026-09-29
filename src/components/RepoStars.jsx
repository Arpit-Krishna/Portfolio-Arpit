import { Star } from "@phosphor-icons/react";
import useGithubRepo from "../hooks/useGithubRepo";

// Live star count for a public repo, with a skeleton while loading and a quiet fallback on error.
export default function RepoStars({ repo }) {
  const { status, data } = useGithubRepo(repo);
  if (!repo) return null;
  if (status === "loading")
    return <span className="skeleton inline-block h-4 w-10 rounded-full align-middle" aria-label="Loading star count" />;
  if (status === "error" || !data || !data.stars) return null;
  return (
    <span className="inline-flex items-center gap-1 font-mono text-xs text-zinc-500" title="GitHub stars">
      <Star size={13} weight="fill" className="text-amber-300/70" aria-hidden="true" />
      <span className="tabular-nums">{data.stars}</span>
      <span className="sr-only">stars on GitHub</span>
    </span>
  );
}
