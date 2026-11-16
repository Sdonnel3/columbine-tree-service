import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/content/business";
import { contact as c } from "@/content/pages";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

export default function Thanks() {
  return (
    <section className="wrap" style={{ paddingBlock: "clamp(56px, 10vw, 150px)" }}>
      <h1>{c.thanksTitle}</h1>
      <p className="lead" style={{ marginTop: 24, maxWidth: "36ch" }}>{c.thanksText}</p>
      <p style={{ marginTop: 28 }}>
        <a className="bigphone" href={business.phoneHref}>{business.phone}</a>
      </p>
      <p style={{ marginTop: 32 }}>
        <Link className="link" href="/">Back to the home page</Link>
      </p>
    </section>
  );
}
