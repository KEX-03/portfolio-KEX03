const STACK = ["React", "Next.js", "React Native", "TypeScript", "Node.js", "Express", "MongoDB", "Firebase", "Tailwind"];

export function AboutWidget() {
  return (
    <article className="widget about-widget">
      <p className="widget-kicker">About me</p>
      <h2>
        Hey, I&apos;m Vivek <span className="wave" aria-hidden="true">👋</span>
      </h2>
      <p className="about-lede">
        A frontend-focused software engineer who builds web and mobile apps with React, Next.js, and React Native. I care about what happens under the hood: render
        performance, accessibility, and code that holds up as a product grows. Off the clock, you&apos;ll find me happily poking around open-source codebases.
      </p>
      <div className="about-cards">
        <div className="about-card">
          <span className="about-emoji" aria-hidden="true">
            🔭
          </span>
          <h3>Exploring</h3>
          <p>Mobile SDKs, render performance, and how big React codebases stay fast.</p>
        </div>
        <div className="about-card">
          <span className="about-emoji" aria-hidden="true">
            🛠
          </span>
          <h3>Stack</h3>
          <p>{STACK.join(" · ")}</p>
        </div>
      </div>
    </article>
  );
}
