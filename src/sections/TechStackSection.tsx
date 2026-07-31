import { Icon } from "@iconify/react";
import { useRef } from "react";

const TECHS = [
  { name: "HTML", icon: "simple-icons:html5", bg: "#e44d26" },
  { name: "CSS", icon: "simple-icons:css", bg: "#264de4" },
  { name: "JavaScript", icon: "simple-icons:javascript", bg: "#f7df1e", fg: "#1d1a14" },
  { name: "TypeScript", icon: "simple-icons:typescript", bg: "#2f74c0" },
  { name: "React", icon: "simple-icons:react", bg: "#1c1a16", fg: "#61dafb" },
  { name: "Next.js", icon: "simple-icons:nextdotjs", bg: "#1d1a14" },
  { name: "Node.js", icon: "simple-icons:nodedotjs", bg: "#5fa04e" },
  { name: "Framer Motion", icon: "simple-icons:framer", bg: "#0055ff" },
  { name: "GraphQL", icon: "simple-icons:graphql", bg: "#e535ab" },
  { name: "Tailwind", icon: "simple-icons:tailwindcss", bg: "#38bdf8", fg: "#1d1a14" },
  { name: "Figma", icon: "simple-icons:figma", bg: "#1d1a14", fg: "#ff7262" },
  { name: "Storybook", icon: "simple-icons:storybook", bg: "#ff4785" },
];

export function TechStackSection() {
  const doubled = [...TECHS, ...TECHS];
  const bandRef = useRef<HTMLDivElement | null>(null);
  const techRef = useRef<HTMLDivElement | null>(null);

  const tweenRate = (el: HTMLElement | null, target: number, ms = 300) => {
    if (!el) return;
    const anim = el.getAnimations()[0];
    if (!anim) return;

    const start = anim.playbackRate || 1;
    const t0 = performance.now();

    const tick = (t: number) => {
      const p = Math.min((t - t0) / ms, 1);
      anim.playbackRate = start + (target - start) * p;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return (
    <>
      <div
        className="band"
        aria-hidden="true"
        onMouseEnter={() => tweenRate(bandRef.current, 0.2, 350)}
        onMouseLeave={() => tweenRate(bandRef.current, 1, 350)}
      >
        <div className="mq" ref={bandRef}>
          <span>
            Available for work <span className="star">{"\u2726"}</span> Frontend Engineer <span className="star">{"\u2726"}</span> React {"\u00B7"} TypeScript {"\u00B7"} Motion <span className="star">{"\u2726"}</span> Currently in Bangalore{" "}
            <span className="star">{"\u2726"}</span> Let&apos;s build something <span className="star">{"\u2726"}</span>
          </span>
          <span>
            Available for work <span className="star">{"\u2726"}</span> Frontend Engineer <span className="star">{"\u2726"}</span> React {"\u00B7"} TypeScript {"\u00B7"} Motion <span className="star">{"\u2726"}</span> Currently in Bangalore{" "}
            <span className="star">{"\u2726"}</span> Let&apos;s build something <span className="star">{"\u2726"}</span>
          </span>
        </div>
      </div>

      <section className="section-card" id="skills">
        <span className="braces">{"{ }"}</span>
        <div className="label">
          <span>Tech I Work With</span>
          <small>infinite {"\u00B7"} slow on hover</small>
        </div>
        <div
          className="marquee"
          aria-label="Technology stack"
          onMouseEnter={() => tweenRate(techRef.current, 0.2, 350)}
          onMouseLeave={() => tweenRate(techRef.current, 1, 350)}
        >
          <div className="marquee-track" id="techTrack" ref={techRef}>
            {doubled.map((tech, index) => (
              <div className="tech-pill" key={`${tech.name}-${index}`}>
                <div className="glyph" style={{ background: tech.bg, color: tech.fg ?? "#ffffff" }}>
                  <Icon icon={tech.icon} width={24} height={24} />
                </div>
                <div className="name">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
