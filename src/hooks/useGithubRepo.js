import { useEffect, useState } from "react";

const cache = new Map();

function readSession(key) {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in private windows. The in-memory cache still works.
  }
}

// Fetches public repo metadata (stars, language) from the GitHub REST API.
// Returns { status: "idle" | "loading" | "ready" | "error", data }.
export default function useGithubRepo(fullName) {
  const key = fullName ? `gh:${fullName}` : null;
  const initial = key ? cache.get(key) || readSession(key) : null;
  const [state, setState] = useState(
    !key ? { status: "idle", data: null } : initial ? { status: "ready", data: initial } : { status: "loading", data: null }
  );

  useEffect(() => {
    if (!key || state.status === "ready") return;
    const controller = new AbortController();
    fetch(`https://api.github.com/repos/${fullName}`, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
        return res.json();
      })
      .then((json) => {
        const data = { stars: json.stargazers_count, forks: json.forks_count, language: json.language };
        cache.set(key, data);
        writeSession(key, data);
        setState({ status: "ready", data });
      })
      .catch((err) => {
        if (err.name !== "AbortError") setState({ status: "error", data: null });
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}
