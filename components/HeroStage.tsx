"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Photo } from "@/content/photos";

// The big plug on the right of every first screen. On the home page the
// photograph slowly changes, like light shifting.
export function HeroStage({ photos, quip }: { photos: Photo[]; quip?: string }) {
  const [on, setOn] = useState(0);
  useEffect(() => {
    if (photos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (!document.hidden) setOn((i) => (i + 1) % photos.length);
    }, 5600);
    return () => clearInterval(t);
  }, [photos.length]);
  return (
    <div className="hero-stage">
      <div className="hero-red" />
      <div className="hero-photo">
        {photos.map((p, i) => (
          <Image
            key={p.src}
            src={p.src}
            alt={i === on ? p.alt : ""}
            fill
            priority={i === 0}
            sizes="(max-width: 720px) 80vw, 40vw"
            className={i === on ? "on" : ""}
          />
        ))}
      </div>
      {quip ? <p className="hero-quip">{quip}</p> : null}
      <p className="small stage-note">
        Stand-in photo. Goes here: {photos[on].swapFor}.
      </p>
    </div>
  );
}
