import type { Metadata } from "next";
import Link from "next/link";
import { ActionRow } from "@/components/ActionRow";
import { Hero } from "@/components/Hero";
import { Rich } from "@/components/Rich";
import { business, services } from "@/content/business";
import { servicesPage as c } from "@/content/pages";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Tree transplanting, tree sales, pruning, removal and stump grinding",
  description:
    "What Columbine Tree does: tree transplanting, tree sales from our Littleton farm, pruning and cleanup, tree removal and stump grinding. Quotes only.",
};

export default function Services() {
  return (
    <>
      <Hero inner title={c.title} lead={c.lead} photos={[photos.climber]}>
        <div className="actions">
          <a className="btn" href={business.phoneHref}>Call {business.phone}</a>
          <Link className="link" href="/contact#form">Send a note</Link>
        </div>
      </Hero>

      <section className="section">
        {services.map((s) => (
          <Link className="service" key={s.name} href={`/contact?need=${encodeURIComponent(s.need)}#form`} data-reveal>
            <h2>{s.name}</h2>
            <p>{s.text}</p>
          </Link>
        ))}
      </section>

      <section className="section">
        <p className="statement" data-reveal>
          {c.other}
        </p>
        <p style={{ marginTop: 16 }} data-reveal><Rich text={c.otherConfirm} /></p>
      </section>

      <ActionRow />
    </>
  );
}
