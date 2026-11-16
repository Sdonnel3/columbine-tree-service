"use client";
import { useState, useSyncExternalStore } from "react";
import { Rich } from "./Rich";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const FULL = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// From the brief: they transplant in wider windows than the textbook says,
// but not in December or January.
const NO = new Set([0, 11]);

export function MoveCalendar({ title, note }: { title: string; note: string }) {
  // Starts on the visitor's current month.
  const thisMonth = useSyncExternalStore(
    () => () => {},
    () => new Date().getMonth(),
    () => 3,
  );
  const [picked, setM] = useState<number | null>(null);
  const m = picked ?? thisMonth;
  const no = NO.has(m);
  return (
    <div className="calendar">
      <div>
        <h2 className="verdict" aria-live="polite" data-reveal>
          {no ? `${FULL[m]}? Not then.` : `${FULL[m]}? Yes.`}
        </h2>
        <p className="why" data-reveal>
          {no
            ? "December and January are the two months we leave trees alone. Call now and we will plan it for when the ground is ready."
            : "With a spade the tree keeps its own soil, so the window is wider than the textbook says. Lou still checks the ground and the forecast first."}
        </p>
        <p className="why small" data-reveal>
          <Rich text={note} />
        </p>
      </div>
      <div className="months" role="group" aria-label={title} data-reveal>
        {MONTHS.map((name, i) => (
          <button
            key={name}
            type="button"
            aria-pressed={i === m}
            data-no={NO.has(i)}
            aria-label={FULL[i]}
            onClick={() => setM(i)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
