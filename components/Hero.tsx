import type { ReactNode } from "react";
import type { Photo } from "@/content/photos";
import { HeroStage } from "./HeroStage";

export function Hero({
  title,
  lead,
  children,
  photos,
  quip,
  inner = false,
}: {
  title: string;
  lead: string;
  children?: ReactNode;
  photos: Photo[];
  quip?: string;
  inner?: boolean;
}) {
  return (
    <section className={inner ? "hero inner" : "hero"}>
      <div className="hero-card">
        <div className="rowband" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => (
            <i key={i} style={{ ["--i" as string]: i }} />
          ))}
        </div>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        {children}
      </div>
      <HeroStage photos={photos} quip={quip} />
    </section>
  );
}
