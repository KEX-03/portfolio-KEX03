import { EDUCATION, EXPERIENCE } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section className="section-card experience" id="experience">
      <span className="braces">{"[ ]"}</span>
      <div className="label">
        <span>Experience</span>
        <small>where I&apos;ve shipped</small>
      </div>

      <ol className="timeline">
        {EXPERIENCE.map((job) => (
          <li className={`job${job.current ? " is-current" : ""}`} key={`${job.company}-${job.role}`}>
            <div className="job-when">
              <span className="job-period">{job.period}</span>
              <span className="job-company">{job.company}</span>
              <span className="job-location">{job.location}</span>
            </div>

            <span className="job-node" aria-hidden="true" />

            <div className="job-body">
              <div className="job-head">
                <h4>{job.role}</h4>
                {job.current ? (
                  <span className="job-now">
                    <span className="blip" /> Now
                  </span>
                ) : null}
              </div>
              <p className="job-summary">{job.summary}</p>
              <ul className="job-points">
                {job.highlights.map((h) => (
                  <li key={h.lead}>
                    <strong>{h.lead}</strong>
                    {h.rest}
                  </li>
                ))}
              </ul>
              <div className="job-stack">
                {job.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="education">
        <div className="edu-tape" aria-hidden="true" />
        <h5>Education</h5>
        <ul>
          {EDUCATION.map((e) => (
            <li key={e.degree}>
              <span className="edu-degree">{e.degree}</span>
              <span className="edu-school">{e.school}</span>
              <span className="edu-date">{e.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
