import { Link } from "react-router-dom";
import { AppWindow } from "@/shell/AppWindow";

export function NotFoundPage() {
  return (
    <AppWindow title="Finder" className="window-small">
      <div className="not-found">
        <span className="not-found-face" aria-hidden="true">
          ¯\_(ツ)_/¯
        </span>
        <h2>Finder can&apos;t find that page.</h2>
        <p>It may have been moved, renamed, or it never existed.</p>
        <Link to="/" className="btn-blue">
          Back to Desktop
        </Link>
      </div>
    </AppWindow>
  );
}
