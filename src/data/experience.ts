export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  current?: boolean;
  summary: string;
  highlights: { lead: string; rest: string }[];
  stack: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Associate Software Engineer",
    company: "Fyn Mobility",
    period: "May 2026 – Present",
    location: "Bengaluru, India",
    current: true,
    summary: "Shipping Infynity's web presence and the SDK integrations, attribution, and notifications behind its mobile app.",
    highlights: [
      { lead: "Built and shipped Infynity's multi-page website in Next.js,", rest: " including a blog with dynamic routing, reusable page layouts, and SEO-optimised metadata." },
      { lead: "Integrated the JAR DigiGold SDK,", rest: " enabling in-app digital gold investment flows for blue-collar and gig workers." },
      { lead: "Integrated the Meta SDK", rest: " for app-event tracking and campaign install attribution, with UTM attribution via the Google Play Install Referrer API; shipped FCM push notifications that deep-link to the relevant screen." },
      { lead: "Resolved production bugs", rest: " across date validation, internationalization, and input handling on iOS and Android; refactored shared state with custom wrappers and lifting-state-up patterns." },
    ],
    stack: ["Next.js", "React Native", "TypeScript", "Firebase", "Meta SDK"],
  },
  {
    role: "Software Engineer Intern (Frontend)",
    company: "Red Tree India",
    period: "Aug 2025 – Mar 2026",
    location: "Remote",
    summary: "Owned features in a React + TypeScript frontend from design handoff all the way to production.",
    highlights: [
      { lead: "Delivered 10+ customer-facing features", rest: " end-to-end in an Agile workflow, from design handoff to production." },
      { lead: "Cut render cost", rest: " with useMemo, useCallback, lazy loading, and code splitting; removed stale-closure bugs in key UI views." },
      { lead: "Integrated 5+ REST APIs", rest: " with JWT auth and structured error handling; worked with backend engineers to trim response payloads through query optimization." },
    ],
    stack: ["React", "TypeScript", "REST", "JWT"],
  },
  {
    role: "Web Design Virtual Intern",
    company: "AICTE-Eduskills",
    period: "Jan – Apr 2025",
    location: "Remote",
    summary: "Turned Figma prototypes into responsive, accessible layouts.",
    highlights: [
      { lead: "Delivered 8+ responsive, accessible web layouts", rest: " using HTML5, CSS3, and Tailwind CSS; translated Figma prototypes into pixel-accurate UI components." },
      { lead: "Applied semantic HTML and ARIA", rest: " for accessibility compliance; optimised assets and the render path for faster page loads." },
    ],
    stack: ["HTML5", "CSS3", "Tailwind CSS", "Figma"],
  },
];

export type ContributionItem = {
  title: string;
  detail: string;
  prs: { number: number; url: string }[];
  merged: boolean;
};

export type OpenSourceRepo = {
  name: string;
  repo: string;
  url: string;
  blurb: string;
  contributions: ContributionItem[];
};

const RBS = "https://github.com/ansulagrawal/react-big-schedule/pull";

export const OPEN_SOURCE: OpenSourceRepo[] = [
  {
    name: "react-big-schedule",
    repo: "ansulagrawal/react-big-schedule",
    url: "https://github.com/ansulagrawal/react-big-schedule",
    blurb: "A React scheduler and resource-planning library, and the project I've learned the most from. Everything from render performance to sneaky date/time bugs.",
    contributions: [
      {
        title: "Cut redundant re-renders",
        detail: "useMemo, PureComponent, and React.memo; fixed stale closures with refs, improving frame rate in a real-time scheduling UI.",
        prs: [{ number: 327, url: `${RBS}/327` }],
        merged: true,
      },
      {
        title: "Merged multi-resource event creation",
        detail: "Vertical drag-selection across rows, a backward-compatible resourceIds API, and clearer row/cell highlight feedback.",
        prs: [{ number: 336, url: `${RBS}/336` }],
        merged: true,
      },
      {
        title: "Parent-based resizing fix",
        detail: "Fixed scheduler resizing behaviour when sized relative to its parent container.",
        prs: [{ number: 337, url: `${RBS}/337` }],
        merged: true,
      },
      {
        title: "UTC offset bug in Month view",
        detail: "Date-only events rendered one day short; added normalizeEventStart / normalizeEventEnd to anchor them to local day boundaries.",
        prs: [{ number: 356, url: `${RBS}/356` }],
        merged: true,
      },
      {
        title: "Event layout across Day, Week, and Month",
        detail: "Multi-day bars span only the visible cells they cover; events render at exact times in hour cells, correct across DST and month boundaries.",
        prs: [
          { number: 414, url: `${RBS}/414` },
          { number: 415, url: `${RBS}/415` },
        ],
        merged: true,
      },
    ],
  },
  {
    name: "jeffrescignano-io",
    repo: "JeffResc/jeffrescignano-io",
    url: "https://github.com/JeffResc/jeffrescignano-io",
    blurb: "An Astro personal site with a Webflow-generated stylesheet.",
    contributions: [
      {
        title: "Semantic CSS refactor",
        detail: "Audited and renamed 50+ Webflow-generated utility classes to semantic equivalents site-wide with zero visual regressions.",
        prs: [{ number: 131, url: "https://github.com/JeffResc/jeffrescignano-io/pull/131" }],
        merged: false,
      },
    ],
  },
];

export const EDUCATION = [
  { degree: "Bachelor of Computer Applications", school: "Chandigarh University", date: "May 2026" },
  { degree: "Diploma in Computer Applications", school: "PCI-Chandigarh", date: "Feb 2023" },
];
