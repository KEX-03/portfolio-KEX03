import { OPEN_SOURCE } from "@/data/experience";

export function OpenSourceSection() {
  return (
    <section className="oss" id="open-source">
      <div className="projects-head oss-head">
        <div className="label">
          <span>Open Source</span>
        </div>
        <div className="oss-stat">
          <span className="oss-stat-n" aria-hidden="true">♡</span>
          <span className="oss-stat-l">
            some favourite
            <br />
            rabbit holes ↓
          </span>
        </div>
      </div>

      {OPEN_SOURCE.map((repo) => (
        <div className="oss-repo" key={repo.repo}>
          <div className="oss-repo-head">
            <a href={repo.url} target="_blank" rel="noopener noreferrer" data-cursor="hover">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.7.2 2.9.1 3.2.7.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z" />
              </svg>
              <span className="oss-owner">{repo.repo.split("/")[0]}/</span>
              <span className="oss-name">{repo.name}</span>
            </a>
            <p>{repo.blurb}</p>
          </div>

          <div className="oss-grid">
            {repo.contributions.map((c) => (
              <article className="oss-card" key={c.title}>
                <h5>{c.title}</h5>
                <p>{c.detail}</p>
                <div className="oss-prs">
                  {c.prs.map((pr) => (
                    <a key={pr.number} href={pr.url} target="_blank" rel="noopener noreferrer" data-cursor="hover" className={c.merged ? "is-merged" : ""}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="6" cy="6" r="2.5" />
                        <circle cx="6" cy="18" r="2.5" />
                        <circle cx="18" cy="18" r="2.5" />
                        <path d="M6 8.5v7M18 15.5V11a4 4 0 0 0-4-4h-4" />
                      </svg>
                      #{pr.number}
                    </a>
                  ))}
                  <span className="oss-state">{c.merged ? "merged" : "PR"}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
