import avatarImage from "@/assets/images/IMG_4657.jpeg";

export function ContactProcessSection() {
  return (
    <>
      <section className="about-row">
        <div className="panel about" id="about">
          <div className="corner-tape" />
          <div className="about-avatar-wrap">
            <span className="crown">♛</span>
            <div className="avatar">
              <img src={avatarImage} alt="Vivek Sharma avatar" />
            </div>
          </div>
          <div>
            <h3>About Me</h3>
            <p>Self-taught engineer who loves polished UI, prototyping in the browser, and the small details - kerning a label, easing a transition, getting a focus ring just right.</p>
            <p>Off-keyboard: sketching, long walks, and feeding my coffee habit.</p>
            <div className="quote">Let&apos;s build something meaningful.</div>
          </div>
        </div>

        <div className="panel process" id="process">
          <div className="corner-tape process-tape" />
          <h3>My Process</h3>
          <div className="steps" id="steps">
            <div className="step">
              <div className="icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                  <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2Z" />
                </svg>
              </div>
              <span className="n">01</span>
              <h5>Discover</h5>
              <p>Understand the idea, users, and goals.</p>
            </div>
            <div className="step">
              <div className="icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M7 14h6" />
                </svg>
              </div>
              <span className="n">02</span>
              <h5>Design</h5>
              <p>Sketch flows, prototype in browser, iterate fast.</p>
            </div>
            <div className="step">
              <div className="icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m8 6-6 6 6 6" />
                  <path d="m16 6 6 6-6 6" />
                </svg>
              </div>
              <span className="n">03</span>
              <h5>Develop</h5>
              <p>Clean, scalable, performant code.</p>
            </div>
            <div className="step">
              <div className="icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
                  <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                </svg>
              </div>
              <span className="n">04</span>
              <h5>Launch</h5>
              <p>Ship, measure, iterate, improve.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="connect" id="connect">
        <div>
          <h3>Let&apos;s Connect</h3>
          <p className="blurb-s">Have a role to fill, a problem to solve, or just want to say hi? I read every message.</p>
        </div>
        <div>
          <div className="info-line">
            <span className="ic">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 7 9-7" />
              </svg>
            </span>
            viveksharma03@yahoo.com
          </div>
          <div className="info-line">
            <span className="ic">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            Based in Bangalore, India
          </div>
        </div>
        <div className="connect-social-column">
          <div className="socials">
            <a href="https://github.com/KEX-03" data-cursor="hover" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.7.2 2.9.1 3.2.7.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z" />
              </svg>
            </a>
            <a href="https://linkedin.com/in/kex03" data-cursor="hover" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.15 1.45-2.15 2.95v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.86 3.38-1.86 3.62 0 4.29 2.38 4.29 5.48v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
              </svg>
            </a>
            <a href="/Resume_Vivek.pdf" data-cursor="hover" aria-label="Read CV" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M8 8h8M8 12h8M8 16h5" />
              </svg>
            </a>
          </div>
        </div>
        <div className="note">
          Great ideas
          <br />
          start with
          <br />a message.
          <span className="smile">☺</span>
        </div>
      </section>

      <footer>
        <span>© 2026 Vivek Sharma · Crafted with care.</span>
        <span className="now">
          <span className="blip" /> Now: building something with Framer Motion
        </span>
      </footer>

      <div className="toast" id="toast">
        ✦ you found a secret — recruiter mode activated
      </div>
    </>
  );
}
