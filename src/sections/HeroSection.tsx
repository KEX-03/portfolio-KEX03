import { useEffect, useMemo, useState } from "react";
import heroPortrait from "@/assets/images/IMG_1897.jpeg";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
];

const ROLES = [
  "React + TypeScript",
  "design systems",
  "tiny delightful UIs",
  "performance work",
  "accessibility",
  "motion + interaction",
];

const CODE_LINES = [
  '<span class="k">const</span> <span class="f">engineer</span> = {',
  '  name: <span class="s">"Vivek Sharma"</span>,',
  '  role: <span class="s">"Frontend Engineer"</span>,',
  '  stack: [<span class="s">"React"</span>, <span class="s">"TS"</span>, <span class="s">"Motion"</span>],',
  '  craft: <span class="s">"clean · fast · accessible"</span>,',
  "};",
  "",
  '<span class="c">console</span>.<span class="f">log</span>(engineer);',
];

function useRoleRotator() {
  const [roleText, setRoleText] = useState(ROLES[0]);
  const [swapHidden, setSwapHidden] = useState(false);

  useEffect(() => {
    let roleIndex = 0;
    const timer = window.setInterval(() => {
      roleIndex = (roleIndex + 1) % ROLES.length;
      setSwapHidden(true);

      window.setTimeout(() => {
        setRoleText(ROLES[roleIndex]);
        setSwapHidden(false);
      }, 260);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  return { roleText, swapHidden };
}

function useTypedCode() {
  const [typedHtml, setTypedHtml] = useState("");

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let stopped = false;
    let timer = 0;

    const step = () => {
      if (stopped || lineIndex >= CODE_LINES.length) {
        return;
      }

      const full = CODE_LINES[lineIndex];
      if (full[charIndex] === "<") {
        const end = full.indexOf(">", charIndex);
        charIndex = end + 1;
      } else {
        charIndex += 1;
      }

      const built = `${CODE_LINES.slice(0, lineIndex).join("\n")}${lineIndex ? "\n" : ""}${full.slice(0, charIndex)}`;
      setTypedHtml(built);

      if (charIndex >= full.length) {
        lineIndex += 1;
        charIndex = 0;
        timer = window.setTimeout(step, 220);
      } else {
        timer = window.setTimeout(step, 18 + Math.random() * 30);
      }
    };

    timer = window.setTimeout(step, 700);
    return () => {
      stopped = true;
      window.clearTimeout(timer);
    };
  }, []);

  return typedHtml;
}

export function HeroSection() {
  const resumeUrl = `${import.meta.env.BASE_URL}Resume_Vivek.pdf`;
  const { roleText, swapHidden } = useRoleRotator();
  const typedHtml = useTypedCode();
  const roleClass = useMemo(() => `swap${swapHidden ? " is-hidden" : ""}`, [swapHidden]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className={`nav${isMenuOpen ? " is-open" : ""}`} aria-label="Primary">
        <div className="logo">
          vs<span className="dot" />
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <ul>
          {NAV_ITEMS.map((item, index) => (
            <li key={item.href}>
              <a className={`link${index === 0 ? " active" : ""}`} href={item.href} data-magnet onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <div className="menu-theme-btn" aria-label="Theme control">
              <span className="theme-copy" id="themeText">Theme: Light</span>
              <button className="theme-btn theme-icon-wrap" id="themeBtn" type="button" aria-label="Toggle theme" data-cursor="hover">
                <svg id="themeIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              </button>
            </div>
          </li>
        </ul>
        <span className="status" id="status">
          <span className="pulse" /> Available · <span id="clock">--:--</span> IST
        </span>
        <a className="cta-dark" href="#connect" data-magnet data-cursor="hover">
          Let's Connect
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 19 19 5" />
            <path d="M9 5h10v10" />
          </svg>
        </a>
      </nav>

      <section className="hero" id="home">
        <div>
          <span className="hi">
            Hi, <span className="wave-emoji">👋</span>
          </span>
          <h1 className="name">
            <span className="hl">Vivek</span>
            <br />
            <span className="hl">Sharma</span>
          </h1>

          <svg className="scribble" viewBox="0 0 200 60" aria-hidden="true">
            <path d="M5 40 C 40 5, 80 60, 120 30 S 180 20, 195 36" />
            <path d="M150 36 l 12 -4 M150 36 l 8 8" />
          </svg>

          <div className="role-line">
            <span className="role">&lt;&nbsp;Frontend Engineer&nbsp;/&gt;</span>
            <span className="div" />
            <span className="role-rotator">
              currently shipping <span className={roleClass}>{roleText}</span>
            </span>
          </div>
          <p className="blurb">
            I build interfaces that feel fast and look considered — from messy whiteboard sketches all the way to production. Strong opinions about motion, accessibility,
            and the boring stuff that makes things actually work.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" id="ctaWork" data-magnet data-cursor="hover" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              View My Work
              <span className="arr">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m13 5 7 7-7 7" />
                </svg>
              </span>
            </button>
            <div className="resume-cta">
              <a className="btn-link" href={resumeUrl} target="_blank" rel="noopener noreferrer" data-cursor="hover">
                Read CV
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                </svg>
              </a>
              <a className="btn-link" href={resumeUrl} download="Vivek_Sharma_Resume.pdf" data-cursor="hover">
                Download
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v12" />
                  <path d="m7 10 5 5 5-5" />
                  <path d="M5 21h14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="collage" aria-hidden="true">
          <div className="badge-circ">
            <span>&lt;/&gt;</span>
          </div>
          <div className="spark">✦</div>

          <div className="photo-card">
            <div className="tape t1" />
            <div className="tape t2" />
            <img className="img" src={heroPortrait} alt="Vivek Sharma portrait" />
          </div>

          <div className="code-card">
            <div id="typed" dangerouslySetInnerHTML={{ __html: typedHtml }} />
            <span className="caret" />
          </div>

          <div className="me-arrow">
            <span className="a">↗</span> that&apos;s me!
          </div>
        </div>
      </section>
    </>
  );
}
