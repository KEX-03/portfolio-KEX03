# portfolio-kex03

Vivek Sharma's portfolio, built as a macOS desktop that turns into an iOS home screen on phones.

**Live:** [portfolio-kex03.vercel.app](https://portfolio-kex03.vercel.app/)

- **Desktop:** menu bar, widgets, draggable desktop files, and a magnifying dock. Each page opens as a macOS app window.
- **Phone (≤768px):** an iOS home screen with app icons and widgets. Pages open full-screen, and the dock hides while an app is open.
- Dark by default, with a light theme. The choice is remembered.

| Route | App | What's there |
| --- | --- | --- |
| `/` | Finder | Profile, About, live GitHub activity, Notes widget, desktop files |
| `/projects` | App Store | Featured project, all projects with live/source links |
| `/experience` | Calendar | Timeline of roles, expandable details, education |
| `/open-source` | Terminal | Upstream PRs, shown as a `git log` |

## Stack

React 19, TypeScript, Vite, React Router, Framer Motion, lucide-react, Tailwind v4 (base styles only; the design lives in `src/index.css`), Vitest and Testing Library.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | Does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | ESLint |
| `npm test` | Run the tests once (`npm run test:watch` to watch) |

> On Windows, if PowerShell blocks `npm` ("running scripts is disabled"), use `npm.cmd run dev`, or run
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.

## Editing content

Most changes are data edits. You shouldn't need to touch components.

| To change | Edit |
| --- | --- |
| Name, email, links, résumé path | `src/data/site.ts` |
| Jobs, education, open-source PRs | `src/data/experience.ts` |
| Projects (App Store and iOS app icons) | `src/data/projects.ts` |
| Notes checklist | `src/widgets/NotesWidget.tsx` |
| Desktop files (photos, folders) | `FILES` in `src/widgets/DesktopFiles.tsx` (images go in `src/assets/images/`) |
| GitHub widget's offline fallback | `src/data/github.ts` |

The résumé is served from `public/Resume_Vivek.pdf`. Keep that exact filename; the link is case-sensitive.

## Project structure

```text
src/
  App.tsx            router + desktop shell
  shell/             MenuBar, Dock, AppWindow (window chrome), app route names
  pages/             Home (desktop), Projects, Experience, Open Source, 404
  widgets/           Profile, About, GitHub, Notes, desktop files, drag tip, iOS app grid
  data/              all site content
  hooks/             useTheme (shared light/dark), useClock (IST)
  components/        brand icons
  test/              Vitest setup and tests
  index.css          design tokens, all styles, responsive + iOS rules
```

## Deployment

Deployed on Vercel. `vercel.json` rewrites every path to `index.html` so routes like `/experience` work on refresh.
