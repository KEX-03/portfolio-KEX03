export type RepoActivity = {
  name: string;
  language: string | null;
  pushedAt: string;
  url: string;
  fork: boolean;
};

export type GitHubSnapshot = {
  publicRepos: number;
  repos: RepoActivity[];
  live: boolean;
};

/** Shown until the API responds, and kept if GitHub is rate-limited or offline. */
export const FALLBACK: GitHubSnapshot = {
  publicRepos: 28,
  live: false,
  repos: [
    { name: "taskflow", language: "JavaScript", pushedAt: "2026-10-11T00:00:00Z", url: "https://github.com/KEX-03/taskflow", fork: false },
    { name: "portfolio-KEX03", language: "TypeScript", pushedAt: "2026-10-11T00:00:00Z", url: "https://github.com/KEX-03/portfolio-KEX03", fork: false },
    { name: "react-big-schedule", language: "JavaScript", pushedAt: "2026-10-10T00:00:00Z", url: "https://github.com/KEX-03/react-big-schedule", fork: true },
    { name: "DSA_practice", language: "JavaScript", pushedAt: "2026-08-12T00:00:00Z", url: "https://github.com/KEX-03/DSA_practice", fork: false },
  ],
};
