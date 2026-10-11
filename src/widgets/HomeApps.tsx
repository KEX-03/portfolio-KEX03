import type { CSSProperties, ReactNode } from "react";
import { FileText, Settings } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";
import { useTheme } from "@/hooks/useTheme";

type AppProps = { label: string; tile: string; icon: ReactNode; style?: CSSProperties };

function AppIcon({ label, tile, icon, style }: AppProps) {
  return (
    <>
      <span className={`ios-icon ${tile}`} style={style}>
        {icon}
      </span>
      <span className="ios-app-label">{label}</span>
    </>
  );
}

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

// Projects, Experience and Open Source live in the dock, so the grid holds links and live projects.
const PROJECT_APPS = PROJECTS.filter((p) => p.url).slice(0, 4);

/** iOS home-screen app grid. Only shown on phone-sized screens. */
export function HomeApps() {
  const { theme, toggle } = useTheme();

  return (
    <nav className="ios-apps" aria-label="Apps">
      <a className="ios-app" href={SITE.resume} {...external}>
        <AppIcon label="Résumé" tile="t-resume" icon={<FileText strokeWidth={1.8} />} />
      </a>
      <a className="ios-app" href={SITE.github} {...external}>
        <AppIcon label="GitHub" tile="t-github" icon={<GitHubIcon size={30} />} />
      </a>
      <a className="ios-app" href={SITE.linkedin} {...external}>
        <AppIcon label="LinkedIn" tile="t-linkedin" icon={<LinkedInIcon size={28} />} />
      </a>
      <button type="button" className="ios-app" onClick={toggle} aria-label={`Settings: switch to ${theme === "dark" ? "light" : "dark"} mode`}>
        <AppIcon label={theme === "dark" ? "Light Mode" : "Dark Mode"} tile="t-settings" icon={<Settings strokeWidth={1.7} />} />
      </button>
      {PROJECT_APPS.map((p) => {
        const Icon = p.icon;
        return (
          <a key={p.title} className="ios-app" href={p.url} {...external}>
            <AppIcon
              label={p.title}
              tile="t-project"
              icon={<Icon strokeWidth={1.9} />}
              style={{ background: `linear-gradient(145deg, ${p.tile[0]}, ${p.tile[1]})` }}
            />
          </a>
        );
      })}
    </nav>
  );
}
