import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FileText, Folder, X } from "lucide-react";
import portrait from "@/assets/images/portrait.webp";
import avatar from "@/assets/images/avatar.webp";
import { SITE } from "@/data/site";
import { DragTip, PhoneTip } from "./DragTip";

/**
 * Icons on the desktop. To add a photo, drop it in src/assets/images and add an
 * `{ kind: "image", ... }` entry here.
 */
type DesktopFile =
  | { kind: "image"; name: string; src: string; alt: string }
  | { kind: "pdf"; name: string; href: string }
  | { kind: "folder"; name: string; href: string; external?: boolean };

const FILES: DesktopFile[] = [
  { kind: "image", name: "me.jpg", src: portrait, alt: "Vivek smiling outdoors" },
  { kind: "image", name: "avatar.jpg", src: avatar, alt: "Vivek's avatar photo" },
  { kind: "pdf", name: "resume.pdf", href: SITE.resume },
  { kind: "folder", name: "taskflow", href: "https://github.com/KEX-03/taskflow", external: true },
  { kind: "folder", name: "projects", href: "/projects" },
];

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

function FileIcon({ file }: { file: DesktopFile }) {
  if (file.kind === "image") {
    return (
      <span className="file-thumb">
        <img src={file.src} alt="" draggable={false} />
      </span>
    );
  }
  if (file.kind === "pdf") {
    return (
      <span className="file-doc">
        <FileText size={30} strokeWidth={1.4} />
        <span className="file-doc-tag">PDF</span>
      </span>
    );
  }
  return (
    <span className="file-folder">
      <Folder size={46} strokeWidth={1.2} fill="currentColor" />
    </span>
  );
}

type DesktopFilesProps = { constraintsRef: RefObject<HTMLElement | null> };

export function DesktopFiles({ constraintsRef }: DesktopFilesProps) {
  const navigate = useNavigate();
  const canDrag = useMediaQuery("(pointer: fine) and (min-width: 1024px)");
  // Same breakpoint as the iOS home screen in index.css.
  const isPhone = useMediaQuery("(max-width: 768px)");
  const [preview, setPreview] = useState<Extract<DesktopFile, { kind: "image" }> | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const draggedRef = useRef(false);
  const reduce = useReducedMotion();
  const [discovered, setDiscovered] = useState(false);
  const [nudge, setNudge] = useState(false);

  // After the tip goes away, wiggle the icons once so it is obvious which things it meant.
  const onTipDismiss = useCallback(() => {
    if (reduce) return;
    setNudge(true);
    window.setTimeout(() => setNudge(false), 1400);
  }, [reduce]);

  useEffect(() => {
    if (!preview) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPreview(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [preview]);

  const open = (file: DesktopFile) => {
    if (file.kind === "image") setPreview(file);
    else if (file.kind === "pdf") window.open(file.href, "_blank", "noopener,noreferrer");
    else if (file.external) window.open(file.href, "_blank", "noopener,noreferrer");
    else navigate(file.href);
  };

  return (
    <>
      <div className="desktop-files">
        {FILES.map((file, index) => (
          <motion.button
            key={file.name}
            type="button"
            className={`desktop-file${selected === file.name ? " is-selected" : ""}`}
            drag={canDrag}
            dragConstraints={constraintsRef}
            dragMomentum={false}
            dragElastic={0.08}
            whileDrag={{ scale: 1.06, zIndex: 30 }}
            animate={nudge ? { rotate: [0, -7, 6, -4, 3, 0] } : { rotate: 0 }}
            transition={{ rotate: { duration: 0.6, delay: nudge ? index * 0.08 : 0 } }}
            onDragStart={() => {
              draggedRef.current = true;
              setDiscovered(true);
              setSelected(file.name);
            }}
            onClick={() => {
              // A drag also fires click on release; don't open the file in that case.
              if (draggedRef.current) {
                draggedRef.current = false;
                return;
              }
              setSelected(file.name);
              open(file);
            }}
            aria-label={`Open ${file.name}`}
          >
            <FileIcon file={file} />
            <span className="file-name">{file.name}</span>
          </motion.button>
        ))}
      </div>

      {canDrag ? <DragTip discovered={discovered} onDismiss={onTipDismiss} /> : null}
      {isPhone ? <PhoneTip /> : null}

      <AnimatePresence>
        {preview ? (
          <motion.div
            className="quicklook-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
          >
            <motion.figure
              className="quicklook"
              role="dialog"
              aria-modal="true"
              aria-label={preview.name}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <figcaption>
                <span>{preview.name}</span>
                <button type="button" onClick={() => setPreview(null)} aria-label="Close preview" autoFocus>
                  <X size={16} />
                </button>
              </figcaption>
              <img src={preview.src} alt={preview.alt} />
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
