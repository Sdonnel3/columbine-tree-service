import Link from "next/link";
import { Columbine } from "@/components/Columbine";
import { ActionRow } from "@/components/ActionRow";
import { Hero } from "@/components/Hero";
import { PlugPhoto } from "@/components/Photo";
import { Rich } from "@/components/Rich";
import { TreePicker } from "@/components/TreePicker";
import { business } from "@/content/business";
import { home } from "@/content/pages";
import { photos } from "@/content/photos";

export default function Home() {
  const tone = ["", "", "dark", "", "ink", ""];
  return (
    <>
      <Hero title={home.title} lead={home.lead} photos={[photos.climber, photos.boom]} quip={home.quip}>
        <div className="actions">
          <a className="btn" href={business.phoneHref}>
            Call {business.phone}
          </a>
          <Link className="link" href="/for-businesses">
            For builders and HOAs
          </Link>
        </div>
        <div className="hero-links">
          <Link className="link" href="/tree-farm">Walk the farm</Link>
          <Link className="link" href="/services">Services</Link>
          <Link className="link" href="/ask-lou">Ask Lou</Link>
        </div>
      </Hero>

      <section className="section">
        <div className="board">
          <div className="tile head" data-reveal>
            <h2>{home.proofTitle}</h2>
            <Columbine className="headmark" />
          </div>
          {home.proof.map((p, i) => (
            <div className={`tile ${tone[i]}`} key={p.title} data-reveal>
              <h3>{p.title}</h3>
              <p>
                <Rich text={p.text} />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <TreePicker title={home.farmTitle} text={home.farmText} />
      </section>

      <section className="section">
        <div className="steps-head">
          <h2 data-reveal>{home.stepsTitle}</h2>
          <p className="muted" data-reveal>{home.stepsNote}</p>
        </div>
        <ol className="steps">
          {home.steps.map((s) => (
            <li className="step" key={s.name}>
              <i aria-hidden="true" data-grow />
              <h3 data-reveal>{s.name}</h3>
              <p data-reveal>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section reviews">
        <div className="portrait">
          <PlugPhoto photo={photos.truckCrew} ratio="4 / 3" />
        </div>
        <div className="words">
          <p className="statement" data-reveal>{home.reviewsStatement}</p>
          <div className="actions" data-reveal>
            <a className="btn dark" href={business.reviews.google}>Read our Google reviews</a>
            <a className="link" href={business.reviews.yelp}>See us on Yelp</a>
          </div>
        </div>
        <div className="trusted">
          <h2 data-reveal>{home.trustedTitle}</h2>
          <div className="board">
            {home.trusted.map((t, i) => (
              <div className="tile" key={i} data-reveal>
                <p><Rich text={t} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ActionRow />
    </>
  );
}
