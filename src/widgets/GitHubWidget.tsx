import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/BrandIcons";
import { FALLBACK, type GitHubSnapshot } from "@/data/github";
import { SITE } from "@/data/site";

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  CSS: "#8f5bd6",
  HTML: "#e34c26",
  Astro: "#ff5a03",
};

const RELATIVE = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

function timeAgo(iso: string) {
  const diffMs = new Date(iso).getTime() - Date.now();
  const days = Math.round(diffMs / 86_400_000);
  if (Math.abs(days) >= 30) return RELATIVE.format(Math.round(days / 30), "month");
  if (Math.abs(days) >= 1) return RELATIVE.format(days, "day");
  const hours = Math.round(diffMs / 3_600_000);
  return hours === 0 ? "just now" : RELATIVE.format(hours, "hour");
}

type ApiRepo = { name: string; language: string | null; pushed_at: string; html_url: string; fork: boolean };

async function fetchSnapshot(signal: AbortSignal): Promise<GitHubSnapshot> {
  const base = `https://api.github.com/users/${SITE.githubUser}`;
  const [userRes, reposRes] = await Promise.all([fetch(base, { signal }), fetch(`${base}/repos?sort=pushed&per_page=8`, { signal })]);
  if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API unavailable");

  const user = (await userRes.json()) as { public_repos: number };
  const repos = (await reposRes.json()) as ApiRepo[];

  return {
    publicRepos: user.public_repos,
    live: true,
    repos: repos
      // The profile README repo isn't interesting activity.
      .filter((r) => r.name !== SITE.githubUser)
      .slice(0, 4)
      .map((r) => ({ name: r.name, language: r.language, pushedAt: r.pushed_at, url: r.html_url, fork: r.fork })),
  };
}

export function GitHubWidget() {
  const [data, setData] = useState<GitHubSnapshot>(FALLBACK);

  useEffect(() => {
    const controller = new AbortController();
    fetchSnapshot(controller.signal)
      .then(setData)
      .catch(() => {
        // Keep the fallback snapshot.
      });
    return () => controller.abort();
  }, []);

  return (
    <article className="widget gh-widget" aria-label="Recent GitHub activity">
      <div className="gh-head">
        <span className="gh-icon">
          <GitHubIcon size={14} />
        </span>
        <p className="widget-kicker">Recently tinkering</p>
        <span className={`gh-live${data.live ? " is-live" : ""}`} title={data.live ? "Live from GitHub" : "Saved snapshot"} />
      </div>

      <ul className="gh-list">
        {data.repos.map((r) => (
          <li key={r.name}>
            <a href={r.url} target="_blank" rel="noopener noreferrer">
              <span className="gh-dot" style={{ background: (r.language && LANG_COLORS[r.language]) || "var(--muted)" }} aria-hidden="true" />
              <span className="gh-name">
                {r.name}
                {r.fork ? <span className="gh-fork">fork</span> : null}
              </span>
              <span className="gh-when">{timeAgo(r.pushedAt)}</span>
            </a>
          </li>
        ))}
      </ul>

      <a className="gh-foot" href={SITE.github} target="_blank" rel="noopener noreferrer">
        <span>
          <strong>{data.publicRepos}</strong> public repos
        </span>
        <span className="gh-foot-link">
          github.com/{SITE.githubUser} <ArrowUpRight size={13} />
        </span>
      </a>
    </article>
  );
}
