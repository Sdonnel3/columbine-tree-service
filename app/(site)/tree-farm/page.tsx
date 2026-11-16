import type { Metadata } from "next";
import Link from "next/link";
import { ActionRow } from "@/components/ActionRow";
import { Hero } from "@/components/Hero";
import { MoveCalendar } from "@/components/MoveCalendar";
import { PlugPhoto } from "@/components/Photo";
import { Rich } from "@/components/Rich";
import { TreePicker } from "@/components/TreePicker";
import { business } from "@/content/business";
import { farm as c } from "@/content/pages";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Tree farm and large tree transplanting in Littleton",
  description:
    "Walk five acres of trees grown in Littleton soil and pick your own. Deciduous, coniferous and fruit trees, moved with our own tree spades. Visits by appointment.",
};

export default function TreeFarm() {
  return (
    <>
      <Hero inner title={c.title} lead={c.lead} photos={[photos.path]}>
        <div className="actions">
          <Link className="btn" href="/contact?need=farm+visit#form">Book a farm walk-through</Link>
          <a className="link" href={business.phoneHref}>Call {business.phone}</a>
        </div>
      </Hero>

      <section className="section">
        <TreePicker title={c.growingTitle} text="Deciduous, coniferous and some fruit trees. All of it grown here, in Littleton soil, for years before it is sold." cta={false} />
      </section>

      <section className="section split">
        <PlugPhoto photo={photos.redwood} ratio="4 / 4.6" caption={c.redwoodCaption} />
        <div>
          <h2 data-reveal>{c.moveTitle}</h2>
          <p className="statement" style={{ marginTop: 24 }} data-reveal>{c.moveLead}</p>
          <p style={{ marginTop: 20, maxWidth: "44ch" }} data-reveal><Rich text={c.moveText} /></p>
        </div>
      </section>

      <section className="section">
        <MoveCalendar title={c.calendarTitle} note={c.calendarNote} />
      </section>

      <section className="section">
        <h2 data-reveal>{c.galleryTitle}</h2>
        <ul className="gallery">
          {c.gallery.map((g) => (
            <li key={g} data-reveal>
              <div className="slot">{g}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <p className="statement" data-reveal>
          {c.firewood}{" "}
          <Link className="link" href="/firewood">See Fohn&apos;s Firewood</Link>
        </p>
      </section>

      <ActionRow title="Come walk the rows." text="Visits are by appointment. We're always open to the conversation. Reach out today." href="/contact?need=farm+visit#form" label="Book a walk-through" />
    </>
  );
}
