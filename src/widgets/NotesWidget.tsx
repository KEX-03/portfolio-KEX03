import { useState } from "react";
import { Folder } from "lucide-react";

const ITEMS = [
  { text: "Ship Infynity's web + app bits", done: false },
  { text: "Chase calendar bugs in react-big-schedule", done: true },
  { text: "Learn something new ☕", done: false },
];

/** Looks like the macOS Notes widget: a checklist you can actually tick. */
export function NotesWidget() {
  const [items, setItems] = useState(ITEMS);

  const toggle = (index: number) => setItems((list) => list.map((item, i) => (i === index ? { ...item, done: !item.done } : item)));

  return (
    <article className="widget notes-widget" aria-label="Notes: what I'm up to">
      <header className="notes-app">
        <Folder size={13} strokeWidth={2.4} />
        Notes
      </header>
      <h3 className="notes-title">Currently</h3>
      <p className="notes-date">Today</p>
      <ul className="notes-checklist">
        {items.map((item, i) => (
          <li key={item.text}>
            <button type="button" role="checkbox" aria-checked={item.done} className={item.done ? "is-done" : ""} onClick={() => toggle(i)}>
              <span className="notes-check" aria-hidden="true" />
              <span className="notes-text">{item.text}</span>
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}
