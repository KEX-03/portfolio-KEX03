import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AboutWidget } from "@/widgets/AboutWidget";
import { DesktopFiles } from "@/widgets/DesktopFiles";
import { GitHubWidget } from "@/widgets/GitHubWidget";
import { HomeApps } from "@/widgets/HomeApps";
import { ProfileWidget } from "@/widgets/ProfileWidget";
import { NotesWidget } from "@/widgets/NotesWidget";

export function HomePage() {
  const desktopRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    document.title = "Vivek Sharma - Software Engineer";
  }, []);

  return (
    <motion.div
      ref={desktopRef}
      className="desktop"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <h1 className="sr-only">Vivek Sharma, Software Engineer</h1>
      <div className="desktop-widgets">
        <div className="widget-col">
          <ProfileWidget />
          <GitHubWidget />
        </div>
        <HomeApps />
        <div className="widget-col">
          <AboutWidget />
          <NotesWidget />
        </div>
      </div>
      <DesktopFiles constraintsRef={desktopRef} />
    </motion.div>
  );
}
