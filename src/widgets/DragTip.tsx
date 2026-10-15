import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Smile, X } from "lucide-react";

/** Set for good once the visitor has dragged a file: they know, no need to tell them again. */
const LEARNED_KEY = "kex03-drag-tip-learned";
/** Set per tab once a tip has been shown, so coming back to Home doesn't pop it again. */
const SHOWN_KEY = "kex03-home-tip-shown";
const SHOW_AFTER_MS = 1600;
const AUTO_HIDE_MS = 7000;

function readFlag(storage: () => Storage, key: string) {
  try {
    return storage().getItem(key) === "1";
  } catch {
    return false;
  }
}

function setFlag(storage: () => Storage, key: string) {
  try {
    storage().setItem(key, "1");
  } catch {
    // Without storage the tip may show again, which is harmless.
  }
}

const local = () => window.localStorage;
const session = () => window.sessionStorage;

function usePageVisible() {
  const [visible, setVisible] = useState(() => !document.hidden);
  useEffect(() => {
    const onChange = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);
  return visible;
}

/**
 * Shared timing for the home-screen tips: appears after a short delay once the tab is in
 * front of the visitor, auto-hides after a while (paused while `hold` is true), and only
 * shows once per tab session.
 */
function useTip({ suppressed, hold, onHide }: { suppressed: boolean; hold: boolean; onHide?: () => void }) {
  const [phase, setPhase] = useState<"waiting" | "showing" | "done">("waiting");
  const pageVisible = usePageVisible();

  useEffect(() => {
    if (phase !== "waiting" || !pageVisible || suppressed || readFlag(session, SHOWN_KEY)) return;
    const timer = window.setTimeout(() => setPhase("showing"), SHOW_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, [phase, pageVisible, suppressed]);

  const show = phase === "showing" && !suppressed;

  useEffect(() => {
    if (show) setFlag(session, SHOWN_KEY);
  }, [show]);

  useEffect(() => {
    if (!show || hold || !pageVisible) return;
    const timer = window.setTimeout(() => {
      setPhase("done");
      onHide?.();
    }, AUTO_HIDE_MS);
    return () => window.clearTimeout(timer);
  }, [show, hold, pageVisible, onHide]);

  const dismiss = () => {
    setPhase("done");
    onHide?.();
  };

  return { show, dismiss };
}

type DragTipProps = {
  /** Set once the visitor has dragged something themselves, so the tip is no longer needed. */
  discovered: boolean;
  /** Called when the tip goes away on its own or is dismissed (not when discovered). */
  onDismiss: () => void;
};

/**
 * A macOS-style Finder notification pointing out that desktop files can be dragged.
 * Shows once per tab session, and never again once the visitor has dragged a file.
 */
export function DragTip({ discovered, onDismiss }: DragTipProps) {
  const [hovered, setHovered] = useState(false);
  const [learned] = useState(() => readFlag(local, LEARNED_KEY));
  const { show, dismiss } = useTip({ suppressed: learned || discovered, hold: hovered, onHide: onDismiss });

  useEffect(() => {
    if (discovered) setFlag(local, LEARNED_KEY);
  }, [discovered]);

  return createPortal(
    <AnimatePresence>
      {show ? (
        <motion.div
          className="mac-notif"
          role="status"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          initial={{ opacity: 0, x: 380 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 380 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
        >
          <span className="notif-icon t-finder" aria-hidden="true">
            <Smile strokeWidth={1.8} />
          </span>
          <div className="notif-text">
            <p className="notif-meta">
              <span>Finder</span>
              <span>now</span>
            </p>
            <p className="notif-title">psst… these files move</p>
            <p className="notif-body">Drag the photos and folders on the right anywhere you like.</p>
          </div>
          <button type="button" className="notif-close" onClick={dismiss} aria-label="Dismiss notification">
            <X size={11} strokeWidth={3} />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

/** An iOS-style banner welcoming phone visitors to the home screen. Swipe up or tap to dismiss. */
export function PhoneTip() {
  const [held, setHeld] = useState(false);
  const { show, dismiss } = useTip({ suppressed: false, hold: held });

  return createPortal(
    <AnimatePresence>
      {show ? (
        <motion.div
          className="ios-notif"
          role="status"
          aria-label="Notification. Tap to dismiss."
          tabIndex={0}
          initial={{ opacity: 0, y: -140 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -140 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0.9, bottom: 0.08 }}
          onDragStart={() => setHeld(true)}
          onDragEnd={(_, info) => {
            setHeld(false);
            if (info.offset.y < -30 || info.velocity.y < -300) dismiss();
          }}
          onTap={dismiss}
          onKeyDown={(e) => (e.key === "Enter" || e.key === "Escape") && dismiss()}
        >
          <span className="notif-icon t-finder" aria-hidden="true">
            <Smile strokeWidth={1.8} />
          </span>
          <div className="notif-text">
            <p className="notif-meta">
              <span>Vivek</span>
              <span>now</span>
            </p>
            <p className="notif-title">hey, welcome 👋</p>
            <p className="notif-body">This is my home screen. Tap an app to open it, or use the dock below.</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
