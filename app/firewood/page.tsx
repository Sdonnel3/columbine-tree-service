import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { Motion } from "@/components/Motion";
import { Rich } from "@/components/Rich";
import { business } from "@/content/business";
import { firewood as c } from "@/content/firewood";
import "./firewood.css";

// This page reads the address bar or sign in on each visit.
export const instant = false;

export const metadata: Metadata = {
  title: { absolute: "Fohn's Firewood | Littleton, Colorado" },
  description: "Firewood from Lou Fohn in Littleton, Colorado. The wood comes from his tree work. Call first, pickup by appointment.",
};

export default async function Firewood({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const sp = await searchParams;
  return (
    <div className="fw">
      <header className="fw-head">
        <Link href="/firewood" className="fw-mark"><i aria-hidden="true" />{c.name}</Link>
        <a className="btn" href={business.phoneHref}>Call {business.phone}</a>
      </header>
      <main>
        <section className="fw-hero">
          <div>
            <h1>{c.title}</h1>
            <p className="lead">{c.lead}</p>
            <div className="actions">
              <a className="btn" href={business.phoneHref}>Call {business.phone}</a>
              <a className="link" href="#buy">Send a note</a>
            </div>
          </div>
          <div className="logs" aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => <i key={i} style={{ ["--i" as string]: i }} />)}
          </div>
        </section>

        <section className="fw-sec split">
          <h2 data-reveal>{c.buyTitle}</h2>
          <ol className="buy">
            {c.buySteps.map((s) => <li key={s} data-reveal>{s}</li>)}
          </ol>
        </section>

        <section className="fw-sec">
          <h2 data-reveal>The details</h2>
          <div className="fw-grid">
            {c.details.map((d) => (
              <div key={d.title} data-reveal>
                <h3>{d.title}</h3>
                <p><Rich text={d.text} /></p>
              </div>
            ))}
          </div>
        </section>

        <section className="fw-sec split" id="buy">
          <div>
            <h2 data-reveal>{c.whoTitle}</h2>
            <p style={{ marginTop: 20, maxWidth: "40ch" }} data-reveal>{c.whoText}</p>
            <p style={{ marginTop: 28 }} data-reveal>
              <a className="bigphone" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }} href={business.phoneHref}>{business.phone}</a>
            </p>
          </div>
          <div>
            {sp.sent ? <p className="fw-sent" role="status">Got it. Lou will call you back. Or call him now at {business.phone}.</p> : null}
            <LeadForm source="firewood" error={sp.error} button="Ask about firewood" />
          </div>
        </section>
      </main>
      <footer className="fw-foot">
        <span>{c.name}. Littleton, Colorado.</span>
        <Link className="link" href="/">Back to Columbine Tree Service</Link>
      </footer>
      <Motion />
    </div>
  );
}
