import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Smile, X } from "lucide-react";

const SEEN_KEY = "kex03-drag-tip-seen";
const SHOW_AFTER_MS = 1600;
const AUTO_HIDE_MS = 7000;

function hasSeen() {
  try {
    return localStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    localStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Without storage the tip may show again next visit, which is harmless.
  }
}

type DragTipProps = {
  /** Set once the visitor has dragged something themselves, so the tip is no longer needed. */
  discovered: boolean;
  /** Called when the tip goes away on its own or is dismissed (not when discovered). */
  onDismiss: () => void;
};

/** A one-time macOS-style Finder notification pointing out that desktop files can be dragged. */
export function DragTip({ discovered, onDismiss }: DragTipProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (hasSeen()) return;
    const timer = window.setTimeout(() => setVisible(true), SHOW_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // Once they have dragged something themselves, the tip has done its job.
  const show = visible && !discovered;

  useEffect(() => {
    if (!show) return;
    const timer = window.setTimeout(() => {
      setVisible(false);
      markSeen();
      onDismiss();
    }, AUTO_HIDE_MS);
    return () => window.clearTimeout(timer);
  }, [show, onDismiss]);

  useEffect(() => {
    if (discovered) markSeen();
  }, [discovered]);

  const dismiss = () => {
    setVisible(false);
    markSeen();
    onDismiss();
  };

  return createPortal(
    <AnimatePresence>
      {show ? (
        <motion.div
          className="mac-notif"
          role="status"
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
