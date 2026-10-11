import { Link, NavLink, useLocation } from "react-router-dom";
import { Mail, Moon, Sun } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";
import { SITE } from "@/data/site";
import { useClock } from "@/hooks/useClock";
import { useTheme } from "@/hooks/useTheme";
import { APP_ROUTES, appForPath } from "./apps";

export function MenuBar() {
  const { pathname } = useLocation();
  const { time, day } = useClock();
  const { theme, toggle } = useTheme();
  const app = appForPath(pathname);

  return (
    <header className="menubar">
      <nav className="menubar-left" aria-label="Primary">
        <Link to="/" className="menubar-logo" aria-label="Home">
          <span className="menubar-mono" aria-hidden="true">
            vs
          </span>
        </Link>
        <span className="menubar-app">{app.appName}</span>
        <ul className="menubar-links">
          {APP_ROUTES.slice(1).map((r) => (
            <li key={r.path}>
              <NavLink to={r.path}>{r.label}</NavLink>
            </li>
          ))}
          <li>
            <a href={SITE.resume} target="_blank" rel="noopener noreferrer">
              Résumé
            </a>
          </li>
        </ul>
      </nav>

      <div className="menubar-right">
        <a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="menubar-icon">
          <GitHubIcon size={14} />
        </a>
        <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="menubar-icon">
          <LinkedInIcon size={14} />
        </a>
        <a href={`mailto:${SITE.email}`} aria-label="Email" className="menubar-icon">
          <Mail size={15} strokeWidth={2} />
        </a>
        <button type="button" className="menubar-icon" onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
          {theme === "dark" ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
        </button>
        <span className="menubar-clock" aria-label={`${day}, ${time} India Standard Time`}>
          <span className="menubar-day">{day}</span> {time}
        </span>
      </div>
    </header>
  );
}
