import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

type AppWindowProps = {
  title: string;
  /** Extra controls rendered in the title bar, right of the title (tabs, toggles). */
  toolbar?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function AppWindow({ title, toolbar, className = "", children }: AppWindowProps) {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [maximized, setMaximized] = useState(false);

  useEffect(() => {
    document.title = `${title} · Vivek Sharma`;
    return () => {
      document.title = "Vivek Sharma - Software Engineer";
    };
  }, [title]);

  return (
    <motion.section
      className={`window${maximized ? " is-max" : ""} ${className}`}
      aria-label={title}
      initial={reduce ? false : { opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.96, y: 16 }}
      transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="window-bar">
        <div className="traffic">
          <button type="button" className="tl tl-close" aria-label="Close window" onClick={() => navigate("/")} />
          <button type="button" className="tl tl-min" aria-label="Minimize window" onClick={() => navigate("/")} />
          <button type="button" className="tl tl-max" aria-label={maximized ? "Restore window" : "Maximize window"} onClick={() => setMaximized((m) => !m)} />
        </div>
        <button type="button" className="window-back" onClick={() => navigate("/")}>
          <ChevronLeft size={18} strokeWidth={2.4} /> Home
        </button>
        <h1 className="window-title">{title}</h1>
        <div className="window-toolbar">{toolbar}</div>
      </div>
      <div className="window-body">{children}</div>
    </motion.section>
  );
}
