import { Calculator, ChartPie, Flower2, Landmark, Languages, ListChecks, Receipt, type LucideIcon } from "lucide-react";

export type ProjectItem = {
  title: string;
  tagline: string;
  description: string;
  category: string;
  status: ("Live" | "Open source")[];
  stack: string[];
  url?: string;
  repo: string;
  icon: LucideIcon;
  /** Tile gradient, top-left to bottom-right. */
  tile: [string, string];
  featured?: boolean;
};

export const PROJECTS: ProjectItem[] = [
  {
    title: "TaskFlow",
    tagline: "A MERN task manager built for first-time contributors.",
    description:
      "JWT auth with bcrypt, a stats dashboard, task CRUD with search and priority/status filters, and per-user isolation enforced by the API. Migrated CRA to Vite; ships with contributing docs and good-first-issue labels.",
    category: "Productivity",
    status: ["Live", "Open source"],
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    url: "https://taskflow-plum-one.vercel.app/",
    repo: "https://github.com/KEX-03/taskflow",
    icon: ListChecks,
    tile: ["#34c759", "#0f7b3a"],
    featured: true,
  },
  {
    title: "FinLens",
    tagline: "A mobile-first personal finance dashboard.",
    description: "Hand-crafted with no UI library: custom Canvas charts, role-based access, and dark/light theming, built with React 18, Vite, and vanilla CSS.",
    category: "Finance",
    status: ["Live"],
    stack: ["React 18", "Vite", "Canvas", "Vanilla CSS"],
    url: "https://finlens-seven.vercel.app/",
    repo: "https://github.com/KEX-03/finlens",
    icon: ChartPie,
    tile: ["#a78bfa", "#5b3fd1"],
  },
  {
    title: "WireWise",
    tagline: "Link bank accounts, track transactions, transfer funds.",
    description: "A financial SaaS platform with SSR auth, multi-bank linking via Plaid, real-time transactions, and peer-to-peer transfers through Dwolla.",
    category: "Finance",
    status: ["Open source"],
    stack: ["Next.js", "TypeScript", "Appwrite", "Plaid", "Dwolla"],
    repo: "https://github.com/KEX-03/WireWise",
    icon: Landmark,
    tile: ["#3a3a3c", "#111113"],
  },
  {
    title: "BloomLife",
    tagline: "A calm homepage for a fictional therapy practice.",
    description: "Calm, accessible design paired with intentional motion to create a sense of safety, clarity, and professionalism.",
    category: "Design",
    status: ["Live"],
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    url: "https://bloomlife.vercel.app/",
    repo: "https://github.com/KEX-03/Assignment_GMT",
    icon: Flower2,
    tile: ["#ffb3c7", "#e0567f"],
  },
  {
    title: "DeutschWelt",
    tagline: "A language school landing page, no framework.",
    description: "Built to demonstrate frontend fundamentals, UI polish, and scroll-based interaction handling without a framework.",
    category: "Education",
    status: ["Live"],
    stack: ["HTML5", "Tailwind CSS", "Vanilla JS"],
    url: "https://language-school-showcase.vercel.app/",
    repo: "https://github.com/KEX-03/language-school-showcase",
    icon: Languages,
    tile: ["#ffd60a", "#e08a00"],
  },
  {
    title: "Expense Tracker",
    tagline: "Split expenses with friends, Splitwise-style.",
    description: "Showcases frontend logic, state management, and clean user interaction rather than backend complexity.",
    category: "Finance",
    status: ["Live"],
    stack: ["HTML5", "Tailwind CSS", "Vanilla JS"],
    url: "https://expensetracker-kex03.netlify.app/",
    repo: "https://github.com/KEX-03/expense-tracker",
    icon: Receipt,
    tile: ["#64d2ff", "#0a84ff"],
  },
  {
    title: "React Calc",
    tagline: "A tidy calculator in React and TypeScript.",
    description: "A responsive calculator supporting basic arithmetic with a clean, minimal UI.",
    category: "Utilities",
    status: ["Live"],
    stack: ["React", "TypeScript"],
    url: "https://react-calc-rosy.vercel.app",
    repo: "https://github.com/KEX-03/React_Calc",
    icon: Calculator,
    tile: ["#ff9f0a", "#c2410c"],
  },
];
