import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { Rich } from "@/components/Rich";
import { business } from "@/content/business";
import { contact as c } from "@/content/pages";

// This page reads the address bar or sign in on each visit.
export const instant = false;

export const metadata: Metadata = {
  title: "Contact Lou and Tim",
  description:
    "Call (303) 979-5330 or send a short note. Farm visits by appointment in Littleton. We work all over Colorado.",
};

export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ need?: string; type?: string; error?: string }>;
}) {
  const sp = await searchParams;
  const a = business.address;
  return (
    <>
      <section className="wrap" style={{ paddingTop: "clamp(40px, 7vw, 110px)" }}>
        <h1 data-reveal>{c.title}</h1>
        <p style={{ marginTop: "clamp(20px, 3vw, 44px)" }} data-reveal>
          <a className="bigphone" href={business.phoneHref}>{business.phone}</a>
        </p>
        <p className="lead" style={{ marginTop: 20, maxWidth: "40ch" }} data-reveal>{c.lead}</p>
        <p style={{ marginTop: 12 }} data-reveal><Rich text={c.hours} /></p>
      </section>

      <section className="section split form-first">
        <LeadForm need={sp.need} type={sp.type} error={sp.error} />
        <div className="facts">
          <div data-reveal>
            <h3>{c.farmTitle}</h3>
            <p>{a.street}<br />{a.city}, {a.state} {a.zip}</p>
            <p style={{ marginTop: 10 }}><Rich text={c.farmText} /></p>
          </div>
          <div className="on-dark" data-reveal>
            <h3>{c.areaTitle}</h3>
            <p>{c.areaText}</p>
          </div>
          <div data-reveal>
            <h3>The short version</h3>
            <p>{business.cta}</p>
          </div>
        </div>
      </section>
    </>
  );
}
