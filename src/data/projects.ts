export type ProjectItem = {
  title: string;
  tag: string;
  variant: "dark" | "warm" | "green" | "mid";
  headline: string;
  subline: string;
  cta: string;
  description: string;
  stack: string[];
  url: string;
};

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    title: "TaskFlow",
    tag: "Open Source",
    variant: "green",
    headline: "TaskFlow\nMERN Task Manager",
    subline: "Open-source (MIT) and built for first-time contributors.",
    cta: "Start Tracking",
    description: "JWT auth with bcrypt, a stats dashboard, task CRUD with search and priority/status filters, and per-user isolation enforced by the API. Migrated CRA to Vite; ships with contributing docs and good-first-issue labels.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    url: "https://taskflow-plum-one.vercel.app/",
  },
  {
    title: "FinLens",
    tag: "React",
    variant: "mid",
    headline: "FinLens\nFinance Dashboard",
    subline: "A responsive, mobile-first personal finance dashboard.",
    cta: "Get Started",
    description: "Hand-crafted with no UI library: custom Canvas charts, role-based access, and dark/light theming, built with React 18, Vite, and vanilla CSS.",
    stack: ["React 18", "Vite", "Canvas", "Vanilla CSS"],
    url: "https://finlens-seven.vercel.app/",
  },
  {
    title: "WireWise",
    tag: "Next.js",
    variant: "dark",
    headline: "WireWise\nFintech Banking App",
    subline: "Link bank accounts, track transactions, and transfer funds.",
    cta: "View Source",
    description: "A financial SaaS platform with SSR auth, multi-bank linking via Plaid, real-time transactions, and peer-to-peer transfers through Dwolla.",
    stack: ["Next.js", "TypeScript", "Appwrite", "Plaid", "Dwolla"],
    url: "https://github.com/KEX-03/WireWise",
  },
  {
    title: "BloomLife",
    tag: "Next.js",
    variant: "warm",
    headline: "BloomLife\nTherapist Homepage",
    subline: "A thoughtfully designed homepage for a fictional therapy practice.",
    cta: "Check it out",
    description: "Calm, accessible design paired with intentional motion to create a sense of safety, clarity, and professionalism.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    url: "https://bloomlife.vercel.app/",
  },
  {
    title: "DeutschWelt",
    tag: "JavaScript",
    variant: "dark",
    headline: "DeutschWelt\nLanguage School Site",
    subline: "A responsive static landing page built as a frontend showcase.",
    cta: "Start Learning",
    description: "Built to demonstrate frontend fundamentals, UI polish, and scroll-based interaction handling without a framework.",
    stack: ["HTML5", "Tailwind CSS", "Vanilla JS"],
    url: "https://language-school-showcase.vercel.app/",
  },
  {
    title: "Expense Tracker",
    tag: "JavaScript",
    variant: "warm",
    headline: "Expense\nTracker",
    subline: "A frontend expense-splitting app inspired by Splitwise.",
    cta: "Try it free",
    description: "Showcases frontend logic, state management, and clean user interaction rather than backend complexity.",
    stack: ["HTML5", "Tailwind CSS", "Vanilla JS"],
    url: "https://expensetracker-kex03.netlify.app/",
  },
];
