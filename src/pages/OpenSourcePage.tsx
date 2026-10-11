import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { OPEN_SOURCE } from "@/data/experience";
import { SITE } from "@/data/site";
import { AppWindow } from "@/shell/AppWindow";

const COMMAND = `git log --author=${SITE.githubUser} --upstream`;

function useTyped(text: string, enabled: boolean) {
  const [count, setCount] = useState(enabled ? 0 : text.length);

  useEffect(() => {
    if (!enabled) return;
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) window.clearInterval(timer);
    }, 38);
    return () => window.clearInterval(timer);
  }, [text, enabled]);

  return { typed: text.slice(0, count), done: count >= text.length };
}

function Prompt() {
  return (
    <span className="term-prompt">
      <span className="term-user">vivek@macbook</span> <span className="term-path">~/open-source</span> <span className="term-sigil">%</span>{" "}
    </span>
  );
}

export function OpenSourcePage() {
  const reduce = useReducedMotion();
  const { typed, done } = useTyped(COMMAND, !reduce);

  return (
    <AppWindow title="Terminal — zsh" className="window-terminal">
      <div className="term" role="log" aria-label="Open-source contributions">
        <p className="term-line term-dim">Last login: {new Date().toDateString()} on ttys003</p>
        <p className="term-line">
          <Prompt />
          <span className="term-cmd">{typed}</span>
          {!done ? <span className="term-caret" aria-hidden="true" /> : null}
        </p>

        {done ? (
          <div className="term-output">
            <p className="term-line term-comment"># some favourite rabbit holes ↓</p>

            {OPEN_SOURCE.map((repo) => (
              <section className="term-repo" key={repo.repo}>
                <p className="term-line">
                  <a className="term-repo-name" href={repo.url} target="_blank" rel="noopener noreferrer">
                    {repo.repo}
                  </a>
                </p>
                <p className="term-line term-dim term-wrap">{repo.blurb}</p>

                <ul className="term-commits">
                  {repo.contributions.map((c) => (
                    <li key={c.title}>
                      <span className={`term-state${c.merged ? " is-merged" : ""}`}>{c.merged ? "● merged" : "○ PR    "}</span>
                      <span className="term-prs">
                        {c.prs.map((pr) => (
                          <a key={pr.number} href={pr.url} target="_blank" rel="noopener noreferrer">
                            #{pr.number}
                          </a>
                        ))}
                      </span>
                      <span className="term-commit">
                        <span className="term-title">{c.title}</span>
                        <span className="term-detail">{c.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <p className="term-line">
              <Prompt />
              <span className="term-caret" aria-hidden="true" />
            </p>
          </div>
        ) : null}
      </div>
    </AppWindow>
  );
}
