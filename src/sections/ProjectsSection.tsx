import { useEffect, useMemo, useRef } from "react";
import { FEATURED_PROJECTS } from "@/data/projects";

function MidWave() {
  const bars = Array.from({ length: 18 }).map((_, k) => {
    const x = 4 + k * 8;
    const h = 8 + Math.abs(Math.sin(k * 0.9)) * 38 + (k % 3) * 4;
    return <path key={k} d={`M${x} ${30 - h / 2} V ${30 + h / 2}`} />;
  });

  return (
    <svg className="wave" viewBox="0 0 140 60" fill="none" stroke="#b5a8ff" strokeWidth="2" strokeLinecap="round">
      {bars}
    </svg>
  );
}

export function ProjectsSection() {
  const projects = FEATURED_PROJECTS;
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const currentIndexRef = useRef(projects.length);
  const dragRef = useRef({ isDown: false, startX: 0, startY: 0, baseTx: 0, axisLock: null as "x" | "y" | null });
  const autoTimerRef = useRef<number | null>(null);
  const autoResumeTimerRef = useRef<number | null>(null);
  const activeTiltCardRef = useRef<HTMLElement | null>(null);

  const tripledProjects = useMemo(() => [...projects, ...projects, ...projects], [projects]);

  useEffect(() => {
    const track = trackRef.current;
    const carousel = carouselRef.current;
    if (!track || !carousel) {
      return;
    }

    const N = projects.length;

    const cardStep = () => {
      const card = track.querySelector(".project") as HTMLElement | null;
      if (!card) {
        return 0;
      }
      const rect = card.getBoundingClientRect();
      const gap = Number.parseInt(getComputedStyle(track).gap, 10) || 22;
      return rect.width + gap;
    };

    const snap = (animated = true) => {
      const step = cardStep();
      track.style.transition = animated ? "transform .52s cubic-bezier(.16,1,.3,1)" : "none";
      track.style.transform = `translateX(${-currentIndexRef.current * step}px)`;
    };

    const normalize = () => {
      if (currentIndexRef.current >= 2 * N) {
        currentIndexRef.current -= N;
        snap(false);
      } else if (currentIndexRef.current < N) {
        currentIndexRef.current += N;
        snap(false);
      }
    };

    const next = () => {
      currentIndexRef.current += 1;
      snap();
    };

    const prev = () => {
      currentIndexRef.current -= 1;
      snap();
    };

    const onTransitionEnd = () => normalize();
    track.addEventListener("transitionend", onTransitionEnd);

    const onNextClick = () => {
      clearAuto();
      clearAutoResume();
      next();
      scheduleAutoResume(1800);
    };
    const onPrevClick = () => {
      clearAuto();
      clearAutoResume();
      prev();
      scheduleAutoResume(1800);
    };
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    nextBtn?.addEventListener("click", onNextClick);
    prevBtn?.addEventListener("click", onPrevClick);

    const onPointerDown = (e: PointerEvent) => {
      if (!e.isPrimary) {
        return;
      }
      clearAuto();
      clearAutoResume();
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button")) {
        scheduleAutoResume(1200);
        return;
      }
      dragRef.current.isDown = true;
      dragRef.current.startX = e.clientX;
      dragRef.current.startY = e.clientY;
      dragRef.current.axisLock = null;
      const t = getComputedStyle(track).transform;
      const m = t.match(/matrix.*\((.+)\)/);
      dragRef.current.baseTx = m ? Number.parseFloat(m[1].split(",")[4]) : 0;
      track.style.transition = "none";
      carousel.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragRef.current.isDown) {
        return;
      }

      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;

      if (!dragRef.current.axisLock && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
        dragRef.current.axisLock = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
      }

      if (dragRef.current.axisLock === "y") {
        scheduleAutoResume(1100);
        return;
      }

      if (dragRef.current.axisLock !== "x") {
        return;
      }

      e.preventDefault();
      track.style.transform = `translateX(${dragRef.current.baseTx + dx * 0.9}px)`;
    };

    const endDrag = (e: PointerEvent) => {
      if (!dragRef.current.isDown) {
        return;
      }
      dragRef.current.isDown = false;
      const wasHorizontalDrag = dragRef.current.axisLock !== "y";
      dragRef.current.axisLock = null;

      if (!wasHorizontalDrag) {
        snap();
        scheduleAutoResume(1200);
        return;
      }

      const dx = e.clientX - dragRef.current.startX;
      const step = cardStep();
      const swipeThreshold = Math.max(36, step * 0.18);
      let moved = 0;

      if (dx <= -swipeThreshold) {
        moved = 1;
      } else if (dx >= swipeThreshold) {
        moved = -1;
      }

      currentIndexRef.current = Math.max(0, currentIndexRef.current + moved);
      snap();
      scheduleAutoResume(1800);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") {
        return;
      }
      if (e.key === "ArrowRight") {
        next();
      }
      if (e.key === "ArrowLeft") {
        prev();
      }
    };

    const onResize = () => snap(false);
    const clearAuto = () => {
      if (autoTimerRef.current) {
        window.clearInterval(autoTimerRef.current);
        autoTimerRef.current = null;
      }
    };
    const clearAutoResume = () => {
      if (autoResumeTimerRef.current) {
        window.clearTimeout(autoResumeTimerRef.current);
        autoResumeTimerRef.current = null;
      }
    };
    const startAuto = () => {
      clearAuto();
      autoTimerRef.current = window.setInterval(next, 8000);
    };
    const scheduleAutoResume = (delay = 1800) => {
      clearAutoResume();
      autoResumeTimerRef.current = window.setTimeout(() => {
        startAuto();
      }, delay);
    };

    const onTiltMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const card = target?.closest(".project") as HTMLElement | null;
      if (!card) {
        if (activeTiltCardRef.current) {
          activeTiltCardRef.current.style.setProperty("--rx", "0deg");
          activeTiltCardRef.current.style.setProperty("--ry", "0deg");
          activeTiltCardRef.current = null;
        }
        return;
      }

      if (activeTiltCardRef.current && activeTiltCardRef.current !== card) {
        activeTiltCardRef.current.style.setProperty("--rx", "0deg");
        activeTiltCardRef.current.style.setProperty("--ry", "0deg");
      }

      activeTiltCardRef.current = card;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty("--ry", `${px * 8}deg`);
      card.style.setProperty("--rx", `${-py * 8}deg`);
    };

    const resetTilt = () => {
      const cards = track.querySelectorAll(".project");
      cards.forEach((card) => {
        const el = card as HTMLElement;
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      });
      activeTiltCardRef.current = null;
    };

    carousel.addEventListener("pointerdown", onPointerDown);
    carousel.addEventListener("pointermove", onPointerMove);
    carousel.addEventListener("pointerup", endDrag);
    carousel.addEventListener("pointercancel", endDrag);
    carousel.addEventListener("pointerleave", endDrag);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    carousel.addEventListener("mouseenter", clearAuto);
    carousel.addEventListener("mouseleave", startAuto);
    carousel.addEventListener("mousemove", onTiltMove);
    carousel.addEventListener("mouseleave", resetTilt);

    requestAnimationFrame(() => snap(false));
    startAuto();

    return () => {
      track.removeEventListener("transitionend", onTransitionEnd);
      nextBtn?.removeEventListener("click", onNextClick);
      prevBtn?.removeEventListener("click", onPrevClick);
      carousel.removeEventListener("pointerdown", onPointerDown);
      carousel.removeEventListener("pointermove", onPointerMove);
      carousel.removeEventListener("pointerup", endDrag);
      carousel.removeEventListener("pointercancel", endDrag);
      carousel.removeEventListener("pointerleave", endDrag);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      carousel.removeEventListener("mouseenter", clearAuto);
      carousel.removeEventListener("mouseleave", startAuto);
      carousel.removeEventListener("mousemove", onTiltMove);
      carousel.removeEventListener("mouseleave", resetTilt);
      clearAuto();
      clearAutoResume();
    };
  }, [projects.length]);

  return (
    <>
      <div className="projects-head" id="projects">
        <div className="label">
          <span>Featured Projects</span>
        </div>
        <div className="projects-head-right">
          <a className="view-all" href="https://github.com/KEX-03?tab=repositories" target="_blank" rel="noopener noreferrer" data-cursor="hover">
            View all projects -&gt;
          </a>
          <div className="pager">
            <button id="prevBtn" aria-label="Previous" data-cursor="hover">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button id="nextBtn" aria-label="Next" data-cursor="hover">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="carousel" id="carousel" ref={carouselRef}>
        <div className="carousel-track" id="track" ref={trackRef}>
          {tripledProjects.map((p, idx) => {
            const trimmedUrl = p.url.trim();
            const isPlaceholder = trimmedUrl === "" || trimmedUrl === "#";
            const resolvedUrl = isPlaceholder
              ? "#"
              : trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")
                ? trimmedUrl
                : `https://${trimmedUrl}`;

            return (
              <article className="project" aria-label={p.title} data-cursor="hover" key={`${p.title}-${idx}`}>
                <div className={`shot ${p.variant}`}>
                  <div className="bar">
                    <i />
                    <i />
                    <i />
                  </div>
                  <h4 dangerouslySetInnerHTML={{ __html: p.headline.replace("\n", "<br/>") }} />
                  <p>{p.subline}</p>
                  <span className="pseudo-cta">{p.cta}</span>
                  {p.variant === "mid" ? <MidWave /> : null}
                </div>
                <div className="meta">
                  <div className="row">
                    <h3>{p.title}</h3>
                    <span className="tag">{p.tag}</span>
                  </div>
                  <p>{p.description}</p>
                  <div className="stack">
                    {p.stack.map((s, stackIndex) => (
                      <span key={`${p.title}-${s}-${stackIndex}`}>
                        {stackIndex > 0 ? <span className="dot" /> : null}
                        <span>{s}</span>
                      </span>
                    ))}
                    <a
                      href={resolvedUrl}
                      className="open"
                      data-cursor="hover"
                      aria-label={`Open ${p.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => {
                        if (isPlaceholder) {
                          event.preventDefault();
                        }
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17 17 7" />
                        <path d="M8 7h9v9" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <div className="carousel-hint">drag, scroll, or use arrow keys</div>
    </>
  );
}
