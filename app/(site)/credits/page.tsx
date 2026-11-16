import type { Metadata } from "next";
import { photos } from "@/content/photos";

export const metadata: Metadata = { title: "Photo credits", robots: { index: false } };

export default function Credits() {
  return (
    <section className="wrap" style={{ paddingBlock: "clamp(56px, 8vw, 120px)" }}>
      <h1>Photo credits.</h1>
      <p className="lead" style={{ marginTop: 24, maxWidth: "44ch" }}>
        Every photograph on the site today is a stand-in until Lou&apos;s own photos arrive. None of them show our crew, our farm or our work.
      </p>
      <ul className="rows" style={{ marginTop: 40, maxWidth: 900 }}>
        {Object.values(photos).map((p) => (
          <li key={p.src}>
            <h3>{p.credit}</h3>
            <p>{p.alt}. Free to use under the Unsplash licence.</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
