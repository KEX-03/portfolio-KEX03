import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { MenuBar } from "@/shell/MenuBar";
import { Dock } from "@/shell/Dock";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";

const ProjectsPage = lazy(() => import("@/pages/ProjectsPage").then((m) => ({ default: m.ProjectsPage })));
const ExperiencePage = lazy(() => import("@/pages/ExperiencePage").then((m) => ({ default: m.ExperiencePage })));
const OpenSourcePage = lazy(() => import("@/pages/OpenSourcePage").then((m) => ({ default: m.OpenSourcePage })));

function DesktopRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="window-loading" aria-hidden="true" />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/open-source" element={<OpenSourcePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export function DesktopShell() {
  const { pathname } = useLocation();

  return (
    // "is-app" lets phones hide the dock while an app is open, like iOS.
    <div className={`desktop-shell${pathname === "/" ? "" : " is-app"}`}>
      <div className="wallpaper" aria-hidden="true" />
      <MenuBar />
      <main className="desktop-main">
        <DesktopRoutes />
      </main>
      <Dock />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <DesktopShell />
    </BrowserRouter>
  );
}

export default App;
