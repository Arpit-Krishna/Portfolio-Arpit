import { useEffect, useState } from "react";
import { ArrowUpRight, GithubLogo, WarningCircle } from "@phosphor-icons/react";
import { profile } from "../data/profile";
import { publicRepos } from "../data/projects";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import RepoStars from "./RepoStars";
import MagneticButton from "./MagneticButton";

const languageColor = {
  JavaScript: "bg-amber-300/80",
  Python: "bg-sky-400/80",
  Solidity: "bg-zinc-400",
  Go: "bg-cyan-400/80",
  Java: "bg-orange-400/80",
};

// Public profile numbers for the stats row. Loading shows skeletons; errors hide the row.
function useGithubUser(user) {
  const [state, setState] = useState({ status: "loading", data: null });
  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${user}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((json) =>
        setState({
          status: "ready",
          data: { repos: json.public_repos, followers: json.followers, since: new Date(json.created_at).getFullYear() },
        })
      )
      .catch((err) => err.name !== "AbortError" && setState({ status: "error", data: null }));
    return () => controller.abort();
  }, [user]);
  return state;
}

function ProfileStats() {
  const { status, data } = useGithubUser(profile.githubUser);
  if (status === "error") return null;
  const items = data
    ? [
        { value: data.repos, label: "public repositories" },
        { value: data.followers, label: "followers" },
        { value: data.since, label: "on GitHub since" },
      ]
    : [0, 1, 2].map((i) => ({ value: null, label: String(i) }));
  return (
    <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06]">
      {items.map((it) => (
        <div key={it.label} className="flex flex-col bg-ink-900 p-4">
          {it.value === null ? (
            <div className="skeleton h-7 w-12 rounded-md" aria-hidden="true" />
          ) : (
            <>
              <dt className="order-2 mt-1 text-xs text-zinc-500">{it.label}</dt>
              <dd className="font-mono text-2xl tabular-nums text-zinc-50">{it.value}</dd>
            </>
          )}
        </div>
      ))}
    </dl>
  );
}

function ContributionGraph() {
  const [status, setStatus] = useState("loading");
  const user = profile.githubUser;
  return (
    <div className="relative">
      {status === "loading" && <div className="skeleton h-[112px] w-full rounded-xl" aria-hidden="true" />}
      {status === "error" ? (
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] p-5 text-sm text-zinc-400">
          <WarningCircle size={18} className="text-amber-300/80" aria-hidden="true" />
          The contribution graph could not load. It is still on the GitHub profile.
        </div>
      ) : (
        <img
          src={`https://ghchart.rshah.org/5fd4a0/${user}`}
          alt={`GitHub contribution graph for ${user} over the last year`}
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus("ready")}
          onError={() => setStatus("error")}
          className={`w-full rounded-lg [filter:invert(0.92)_hue-rotate(180deg)] ${status === "ready" ? "block" : "hidden"}`}
        />
      )}
    </div>
  );
}

export default function OpenSource() {
  return (
    <section id="open-source" aria-labelledby="oss-title" className="shell py-24 md:py-36">
      <SectionHeading index="04" eyebrow="Open source" id="oss-title" title="Public repositories and a year of commits.">
        Most of my production code is private, so this is where the side projects, experiments and learning builds live.
      </SectionHeading>

      <div className="mt-14 grid gap-6 lg:grid-cols-12">
        <Reveal className="panel flex min-w-0 flex-col p-6 md:p-8 lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-medium text-zinc-100">Contribution activity</h3>
            <span className="font-mono text-[11px] text-zinc-600">github.com/{profile.githubUser}</span>
          </div>
          <div className="mt-6 overflow-x-auto">
            <div className="min-w-[640px]">
              <ContributionGraph />
            </div>
          </div>
          <ProfileStats />
          <div className="mt-auto pt-8">
            <MagneticButton href={`https://github.com/${profile.githubUser}`} variant="ghost" target="_blank" rel="noopener noreferrer">
              <GithubLogo size={16} aria-hidden="true" />
              View GitHub profile
              <ArrowUpRight size={14} aria-hidden="true" />
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="min-w-0 lg:col-span-5">
          <h3 className="eyebrow">More repositories</h3>
          <ul className="mt-4 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {publicRepos.map((r) => (
              <li key={r.repo}>
                <a
                  href={`https://github.com/${r.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-4 py-4 transition-colors"
                >
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 font-mono text-sm text-zinc-200 group-hover:text-accent">
                      {r.name}
                      <ArrowUpRight
                        size={13}
                        className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-zinc-500">{r.description}</span>
                  </span>
                  <span className="flex shrink-0 flex-col items-end gap-1.5 pt-0.5">
                    <RepoStars repo={r.repo} />
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-600">
                      <span className={`h-2 w-2 rounded-full ${languageColor[r.language] || "bg-zinc-500"}`} aria-hidden="true" />
                      {r.language}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
