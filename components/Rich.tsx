import { Fragment } from "react";

// Turns "[CONFIRM WITH LOU: something]" inside a sentence into a red tag.
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[CONFIRM WITH LOU[^\]]*\])/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[CONFIRM WITH LOU:?\s*([^\]]*)\]$/);
        if (!m) return <Fragment key={i}>{part}</Fragment>;
        return (
          <mark className="confirm" key={i}>
            Confirm with Lou{m[1] ? `: ${m[1]}` : ""}
          </mark>
        );
      })}
    </>
  );
}
