"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { photos } from "@/content/photos";
import { treeTypes } from "@/content/pages";
import { Rich } from "./Rich";

// Pick a kind of tree, see it in the plug.
export function TreePicker({
  title,
  text,
  cta = true,
}: {
  title: string;
  text: string;
  cta?: boolean;
}) {
  const [on, setOn] = useState(1);
  return (
    <div className="picker">
      <div className="picker-names">
        <h2 data-reveal>{title}</h2>
        {treeTypes.map((t, i) => (
          <button
            key={t.name}
            type="button"
            aria-pressed={i === on}
            onClick={() => setOn(i)}
            data-reveal
          >
            {t.name}
          </button>
        ))}
        <div className="picker-text" data-reveal>
          <p>{text}</p>
          {cta ? (
            <Link className="btn" href="/contact?need=farm+visit#form">
              Book a farm walk-through
            </Link>
          ) : null}
        </div>
      </div>
      <div className="picker-stage" data-reveal>
        {treeTypes.map((t, i) => (
          <div key={t.name} className={i === on ? "plug on" : "plug"}>
            <Image
              src={photos[t.photo].src}
              alt={i === on ? photos[t.photo].alt : ""}
              fill
              sizes="(max-width: 720px) 100vw, 42vw"
            />
          </div>
        ))}
      </div>
      <p className="picker-fact" aria-live="polite" data-reveal>
        <Rich text={treeTypes[on].fact} />
        <span className="small" style={{ display: "block", marginTop: 10 }}>
          Stand-in photo. Goes here: {photos[treeTypes[on].photo].swapFor}.
        </span>
      </p>
    </div>
  );
}
