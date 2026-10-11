import { useRef, type ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { FileText, Mail, Smile, Store, Terminal } from "lucide-react";
import { SITE } from "@/data/site";
import { useClock } from "@/hooks/useClock";

const BASE = 50;
const PEAK = 76;
const RANGE = 150;

const MONTH = new Intl.DateTimeFormat("en-IN", { month: "short", timeZone: "Asia/Kolkata" });
const DAY_NUM = new Intl.DateTimeFormat("en-IN", { day: "numeric", timeZone: "Asia/Kolkata" });

function CalendarGlyph() {
  const { date } = useClock();
  return (
    <span className="cal-glyph" aria-hidden="true">
      <span className="cal-month">{MONTH.format(date)}</span>
      <span className="cal-day">{DAY_NUM.format(date)}</span>
    </span>
  );
}

type DockItemProps = {
  mouseX: MotionValue<number>;
  label: string;
  tile: string;
  children: ReactNode;
  to?: string;
  href?: string;
  external?: boolean;
};

function DockItem({ mouseX, label, tile, children, to, href, external }: DockItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { pathname } = useLocation();

  const distance = useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r || !Number.isFinite(x)) return RANGE;
    return x - (r.left + r.width / 2);
  });
  const target = useTransform(distance, [-RANGE, 0, RANGE], [BASE, PEAK, BASE]);
  const size = useSpring(target, { mass: 0.1, stiffness: 170, damping: 14 });
  const dim = reduce ? BASE : size;

  const isActive = to !== undefined && (to === "/" ? pathname === "/" : pathname.startsWith(to));

  const icon = (
    <motion.div ref={ref} className={`dock-tile ${tile}`} style={{ width: dim, height: dim }}>
      {children}
    </motion.div>
  );

  return (
    <li className={`dock-item${isActive ? " is-active" : ""}`}>
      {to !== undefined ? (
        <NavLink to={to} aria-label={label} end={to === "/"}>
          {icon}
        </NavLink>
      ) : (
        <a href={href} aria-label={label} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {icon}
        </a>
      )}
      <span className="dock-label" aria-hidden="true">
        {label}
      </span>
      <span className="dock-dot" aria-hidden="true" />
    </li>
  );
}

export function Dock() {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);

  return (
    <nav className="dock-wrap" aria-label="Dock">
      <ul className="dock" onMouseMove={(e) => mouseX.set(e.clientX)} onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}>
        <DockItem mouseX={mouseX} label="Home" tile="t-finder" to="/">
          <Smile strokeWidth={1.8} />
        </DockItem>
        <DockItem mouseX={mouseX} label="Projects" tile="t-store" to="/projects">
          <Store strokeWidth={1.8} />
        </DockItem>
        <DockItem mouseX={mouseX} label="Experience" tile="t-calendar" to="/experience">
          <CalendarGlyph />
        </DockItem>
        <DockItem mouseX={mouseX} label="Open Source" tile="t-terminal" to="/open-source">
          <Terminal strokeWidth={2} />
        </DockItem>
        <li className="dock-sep" aria-hidden="true" />
        <DockItem mouseX={mouseX} label="Résumé" tile="t-resume" href={SITE.resume} external>
          <FileText strokeWidth={1.8} />
        </DockItem>
        <DockItem mouseX={mouseX} label="Mail" tile="t-mail" href={`mailto:${SITE.email}`}>
          <Mail strokeWidth={1.8} />
        </DockItem>
      </ul>
    </nav>
  );
}
