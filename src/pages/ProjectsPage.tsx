import { useState, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/BrandIcons";
import { PROJECTS, type ProjectItem } from "@/data/projects";
import { SITE } from "@/data/site";
import { AppWindow } from "@/shell/AppWindow";

type Tab = "discover" | "oss";

function AppTile({ project, size = 56 }: { project: ProjectItem; size?: number }) {
  const Icon = project.icon;
  return (
    <span
      className="app-tile"
      style={{ width: size, height: size, background: `linear-gradient(145deg, ${project.tile[0]}, ${project.tile[1]})` }}
      aria-hidden="true"
    >
      <Icon size={size * 0.48} strokeWidth={1.9} />
    </span>
  );
}

function GetButtons({ project }: { project: ProjectItem }) {
  return (
    <div className="get-buttons">
      {project.url ? (
        <a className="get-pill" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live site`}>
          GET
        </a>
      ) : null}
      <a className="view-link" href={project.repo} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source on GitHub`}>
        {project.url ? "Source" : "VIEW"}
      </a>
    </div>
  );
}

function FeaturedCard({ project, large = false }: { project: ProjectItem; large?: boolean }) {
  return (
    <article
      className={`store-feature${large ? " is-large" : ""}`}
      style={{ "--f1": project.tile[0], "--f2": project.tile[1] } as CSSProperties}
    >
      <div className="store-feature-banner">
        <span className="store-eyebrow">{large ? "Projects I love" : project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.tagline}</p>
        {large ? <p className="store-feature-desc">{project.description}</p> : null}
      </div>
      <div className="store-feature-foot">
        <AppTile project={project} size={44} />
        <div className="store-feature-meta">
          <span className="store-feature-name">{project.title}</span>
          <span className="store-chips">
            {project.status.map((s) => (
              <span key={s} className={`chip chip-${s === "Live" ? "live" : "oss"}`}>
                {s}
              </span>
            ))}
          </span>
        </div>
        <GetButtons project={project} />
      </div>
    </article>
  );
}

export function ProjectsPage() {
  const [tab, setTab] = useState<Tab>("discover");
  const list = tab === "oss" ? PROJECTS.filter((p) => p.status.includes("Open source")) : PROJECTS;
  const featured = PROJECTS.find((p) => p.featured) ?? PROJECTS[0];
  const sidePicks = PROJECTS.filter((p) => p !== featured).slice(0, 2);

  return (
    <AppWindow
      title="App Store"
      className="window-store"
      toolbar={
        <div className="segmented" role="tablist" aria-label="Project filter">
          <button type="button" role="tab" aria-selected={tab === "discover"} onClick={() => setTab("discover")}>
            Discover
          </button>
          <button type="button" role="tab" aria-selected={tab === "oss"} onClick={() => setTab("oss")}>
            Open Source
          </button>
        </div>
      }
    >
      <div className="store">
        <header className="store-head">
          <p className="store-date">Things I&apos;ve built</p>
          <h2>{tab === "oss" ? "Open Source" : "Discover"}</h2>
        </header>

        {tab === "discover" ? (
          <div className="store-features">
            <FeaturedCard project={featured} large />
            <div className="store-side">
              {sidePicks.map((p) => (
                <FeaturedCard key={p.title} project={p} />
              ))}
            </div>
          </div>
        ) : null}

        <section className="store-section">
          <div className="store-section-head">
            <h3>{tab === "oss" ? "Open-source projects" : "All my projects"}</h3>
            <a href={`${SITE.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">
              See All <ArrowUpRight size={14} />
            </a>
          </div>

          <ul className="store-list">
            {list.map((p) => (
              <li key={p.title}>
                <details className="store-row">
                  <summary>
                    <AppTile project={p} />
                    <span className="store-row-text">
                      <span className="store-row-title">{p.title}</span>
                      <span className="store-row-tagline">{p.tagline}</span>
                      <span className="store-row-cat">{p.category}</span>
                    </span>
                    <GetButtons project={p} />
                  </summary>
                  <div className="store-row-details">
                    <p>{p.description}</p>
                    <div className="store-row-stack">
                      {p.stack.map((s) => (
                        <span key={s} className="chip">
                          {s}
                        </span>
                      ))}
                      <a className="store-repo" href={p.repo} target="_blank" rel="noopener noreferrer">
                        <GitHubIcon size={13} /> Repository
                      </a>
                    </div>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppWindow>
  );
}
