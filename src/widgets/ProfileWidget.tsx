import { MapPin } from "lucide-react";
import portrait from "@/assets/images/IMG_1897.jpeg";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";
import { SITE } from "@/data/site";

const TAGS = ["Fyn Mobility", "Open Source", "BCA '26"];

export function ProfileWidget() {
  return (
    <article className="widget profile-widget">
      <div className="profile-photo">
        <img src={portrait} alt="Vivek Sharma" />
      </div>
      <div className="profile-info">
        <h2>{SITE.name}</h2>
        <p className="profile-title">{SITE.title}</p>
        <p className="profile-loc">
          <MapPin size={12} strokeWidth={2.2} /> {SITE.location}
        </p>
        <ul className="profile-tags">
          {TAGS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="profile-actions">
          <a className="btn-blue" href={`mailto:${SITE.email}`}>
            Say hi
          </a>
          <a className="btn-glass" href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GitHubIcon size={15} />
          </a>
          <a className="btn-glass" href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedInIcon size={15} />
          </a>
        </div>
      </div>
    </article>
  );
}
