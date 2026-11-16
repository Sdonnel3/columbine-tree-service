import Image from "next/image";
import Link from "next/link";
import { business } from "@/content/business";
import { photos } from "@/content/photos";

// The year round call to action. On every page.
export function ActionRow({
  title = "Reach out today.",
  text = "We're always open to the conversation.",
  href = "/contact#form",
  label = "Send a note",
}: {
  title?: string;
  text?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="action-row">
      <div className="side-photo">
        <Image src={photos.fog.src} alt="" fill sizes="20vw" />
      </div>
      <div className="action-tile on-accent on-dark">
        <h2 data-reveal>{title}</h2>
        <p data-reveal>{text}</p>
        <div className="actions" data-reveal>
          <a className="btn" href={business.phoneHref}>
            Call {business.phone}
          </a>
          <Link className="link" href={href}>
            {label}
          </Link>
        </div>
      </div>
      <div className="side-field" />
    </section>
  );
}
