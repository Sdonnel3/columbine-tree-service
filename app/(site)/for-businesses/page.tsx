import type { Metadata } from "next";
import Link from "next/link";
import { ActionRow } from "@/components/ActionRow";
import { Hero } from "@/components/Hero";
import { LeadForm } from "@/components/LeadForm";
import { PlugPhoto } from "@/components/Photo";
import { Rich } from "@/components/Rich";
import { business } from "@/content/business";
import { businesses as c } from "@/content/pages";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Commercial tree planting for HOAs, builders and property managers",
  description:
    "One company plans the planting, supplies the trees from its own Littleton farm, and installs them with its own tree spades. Fully insured. All of Colorado.",
};

export default function ForBusinesses() {
  return (
    <>
      <Hero inner title={c.title} lead={c.lead} photos={[photos.bucketTruck]}>
        <div className="actions">
          <Link className="btn" href="#form">Request a quote</Link>
          <a className="link" href={business.phoneHref}>Call {business.phone}</a>
        </div>
      </Hero>

      <section className="section split">
        <h2 data-reveal>{c.checksTitle}</h2>
        <ul className="rows">
          {c.checks.map((x) => (
            <li key={x.title} data-reveal>
              <h3>{x.title}</h3>
              <p><Rich text={x.text} /></p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2 data-reveal style={{ maxWidth: "18ch" }}>{c.waysTitle}</h2>
        <div className="ways">
          {c.ways.map((w) => (
            <div key={w.title} data-reveal>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="band on-dark">
        <div>
          <h2 data-reveal>{c.reachTitle}</h2>
          <p className="lead" style={{ marginTop: 20 }} data-reveal>{c.reachText}</p>
        </div>
        <div>
          <PlugPhoto photo={photos.rows} ratio="4 / 2.6" />
          <p style={{ marginTop: 20 }} data-reveal><Rich text={c.hawaii} /></p>
        </div>
      </section>

      <section className="section split">
        <div>
          <h2 data-reveal>{c.clientsTitle}</h2>
          <ul className="rows" style={{ marginTop: 28 }}>
            {c.clients.map((x, i) => (
              <li key={i} data-reveal style={{ gridTemplateColumns: "1fr" }}>
                <p><Rich text={x} /></p>
              </li>
            ))}
          </ul>
        </div>
        <PlugPhoto photo={photos.truckCrew} ratio="4 / 3" />
      </section>

      <section className="section split">
        <div>
          <h2 data-reveal>{c.quoteTitle}</h2>
          <p className="lead" style={{ marginTop: 20 }} data-reveal>{c.quoteText}</p>
        </div>
        <LeadForm type="business" button="Request a quote" />
      </section>

      <ActionRow />
    </>
  );
}
