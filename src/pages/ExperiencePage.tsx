import { useMemo, useState, type CSSProperties } from "react";
import { ArrowUpRight, ChevronDown, GraduationCap } from "lucide-react";
import { EDUCATION, EXPERIENCE, type ExperienceItem } from "@/data/experience";
import { AppWindow } from "@/shell/AppWindow";

type Range = "2025" | "2026" | "all";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2025-08" → months since year 0, so ranges are simple subtraction. */
function monthIndex(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
}

function currentMonthIndex() {
  const now = new Date();
  return now.getFullYear() * 12 + now.getMonth();
}

function rangeBounds(range: Range) {
  if (range === "2025") return { from: monthIndex("2025-01"), to: monthIndex("2025-12") + 1 };
  if (range === "2026") return { from: monthIndex("2026-01"), to: monthIndex("2026-12") + 1 };
  return { from: monthIndex("2025-01"), to: monthIndex("2026-12") + 1 };
}

const jobKey = (job: ExperienceItem) => `${job.company}-${job.role}`;

function initials(name: string) {
  return name
    .split(/[\s-]+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ExperiencePage() {
  const [range, setRange] = useState<Range>("all");
  const [focus, setFocus] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(jobKey(EXPERIENCE[0]));

  const { from, to } = rangeBounds(range);
  const span = to - from;
  const today = currentMonthIndex();
  const todayPct = ((today + 0.5 - from) / span) * 100;

  const months = useMemo(() => Array.from({ length: span }, (_, i) => from + i), [from, span]);
  const bcaGrad = monthIndex("2026-05");

  const select = (key: string) => {
    setFocus((f) => (f === key ? null : key));
    setExpanded(key);
    document.getElementById(`job-${key}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const visibleJobs = focus ? EXPERIENCE.filter((j) => jobKey(j) === focus) : EXPERIENCE;

  return (
    <AppWindow
      title="Calendar"
      className="window-calendar"
      toolbar={
        <div className="segmented" role="tablist" aria-label="Timeline range">
          {(["2025", "2026", "all"] as Range[]).map((r) => (
            <button key={r} type="button" role="tab" aria-selected={range === r} onClick={() => setRange(r)}>
              {r === "all" ? "All" : r}
            </button>
          ))}
        </div>
      }
    >
      <div className="cal">
        <header className="cal-head">
          <div>
            <p className="store-date">Where I&apos;ve worked</p>
            <h2>Experience</h2>
          </div>
          <div className="cal-filters" aria-label="Filter by company">
            {EXPERIENCE.map((job) => {
              const key = jobKey(job);
              return (
                <button
                  key={key}
                  type="button"
                  className={`cal-filter${focus === key ? " is-on" : ""}`}
                  style={{ "--c": job.color } as CSSProperties}
                  onClick={() => select(key)}
                  aria-pressed={focus === key}
                  title={job.company}
                >
                  <span className="cal-filter-logo">{initials(job.company)}</span>
                  <span className="cal-filter-name">{job.company}</span>
                </button>
              );
            })}
          </div>
        </header>

        <div className="gantt" role="img" aria-label="Timeline of roles from 2025 to today">
          <div className="gantt-axis">
            {months.map((m) => {
              const month = m % 12;
              return (
                <span key={m} className={`gantt-month${month === 0 ? " is-year" : ""}`}>
                  {month === 0 ? Math.floor(m / 12) : span > 12 ? MONTHS[month][0] : MONTHS[month]}
                </span>
              );
            })}
          </div>

          <div className="gantt-rows">
            {todayPct >= 0 && todayPct <= 100 ? (
              <span className="gantt-today" style={{ left: `${todayPct}%` }}>
                <span>Today</span>
              </span>
            ) : null}

            {EXPERIENCE.map((job) => {
              const key = jobKey(job);
              const start = Math.max(monthIndex(job.start), from);
              const end = Math.min(job.end ? monthIndex(job.end) + 1 : today + 1, to);
              const inRange = end > start;
              return (
                <div className="gantt-row" key={key}>
                  {inRange ? (
                    <button
                      type="button"
                      className={`gantt-bar${focus && focus !== key ? " is-dim" : ""}${job.current ? " is-current" : ""}`}
                      style={{ left: `${((start - from) / span) * 100}%`, width: `${((end - start) / span) * 100}%`, "--c": job.color } as CSSProperties}
                      onClick={() => select(key)}
                      aria-label={`${job.role} at ${job.company}, ${job.period}`}
                    >
                      <span className="gantt-bar-label">{job.company}</span>
                    </button>
                  ) : null}
                </div>
              );
            })}

            {bcaGrad >= from && bcaGrad < to ? (
              <div className="gantt-row gantt-allday">
                <span className="gantt-milestone" style={{ left: `${((bcaGrad + 0.5 - from) / span) * 100}%` }} title="BCA, Chandigarh University">
                  <GraduationCap size={13} /> BCA
                </span>
              </div>
            ) : null}
          </div>
        </div>

        <ol className="cal-events">
          {visibleJobs.map((job) => {
            const key = jobKey(job);
            const isOpen = expanded === key;
            return (
              <li key={key} id={`job-${key}`} className={`cal-event${isOpen ? " is-open" : ""}`} style={{ "--c": job.color } as CSSProperties}>
                <button type="button" className="cal-event-head" onClick={() => setExpanded(isOpen ? null : key)} aria-expanded={isOpen}>
                  <span className="cal-event-logo">{initials(job.company)}</span>
                  <span className="cal-event-title">
                    <span className="cal-event-role">
                      {job.role}
                      {job.current ? <span className="chip chip-live">Now</span> : null}
                    </span>
                    <span className="cal-event-sub">
                      {job.company} · {job.location}
                    </span>
                  </span>
                  <span className="cal-event-when">{job.period}</span>
                  <ChevronDown className="cal-event-chev" size={18} />
                </button>
                {isOpen ? (
                  <div className="cal-event-body">
                    <p className="cal-event-summary">{job.summary}</p>
                    <ul>
                      {job.highlights.map((h) => (
                        <li key={h.lead}>
                          <strong>{h.lead}</strong>
                          {h.rest}
                        </li>
                      ))}
                    </ul>
                    <div className="cal-event-foot">
                      <span className="cal-event-stack">{job.stack.join(" · ")}</span>
                      {job.url ? (
                        <a href={job.url} target="_blank" rel="noopener noreferrer">
                          Visit site <ArrowUpRight size={13} />
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>

        <section className="cal-allday">
          <h3>
            <GraduationCap size={16} /> Education
          </h3>
          <ul>
            {EDUCATION.map((e) => (
              <li key={e.degree}>
                <span className="cal-allday-dot" aria-hidden="true" />
                <span className="cal-allday-name">{e.degree}</span>
                <span className="cal-allday-school">{e.school}</span>
                <span className="cal-allday-date">{e.date}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppWindow>
  );
}
