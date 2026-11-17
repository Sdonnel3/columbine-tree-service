import type { Metadata } from "next";
import { ActionRow } from "@/components/ActionRow";
import { Hero } from "@/components/Hero";
import { Rich } from "@/components/Rich";
import { questions, story } from "@/content/ask-lou";
import { business } from "@/content/business";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Ask Lou: honest answers about planting and moving trees in Colorado",
  description:
    "Lou Fohn has planted and moved trees in Littleton for over 50 years. His straight answers on picking a tree, when to transplant in Colorado, and what to do after planting.",
};

const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: questions.map((q) => ({
    "@type": "Question",
    name: q.q,
    acceptedAnswer: { "@type": "Answer", text: `${q.direct} ${q.more}` },
  })),
};

export default function AskLou() {
  return (
    <>
      <Hero inner title={story.title} lead="Over 50 years of Colorado trees, and he will tell you what he thinks." photos={[photos.boom]}>
        <div className="actions">
          <a className="btn" href={business.phoneHref}>Ask him yourself: {business.phone}</a>
        </div>
      </Hero>

      <section className="section split">
        <div className="slot" style={{ aspectRatio: "4 / 4.4" }} data-reveal>
          Photo of Lou goes here after the shoot
        </div>
        <div className="story">
          {story.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "statement" : undefined} style={i === 1 ? { marginTop: 28 } : undefined} data-reveal>
              <Rich text={p} />
            </p>
          ))}
          <p className="draft-note" data-reveal>
            Every answer below is a draft. Lou has not corrected them yet. They get rewritten from his own words.
          </p>
        </div>
      </section>

      <section className="section">
        {questions.map((q) => (
          <article className="qa" key={q.q} data-reveal>
            <h2>{q.q}</h2>
            <div>
              <p className="direct">{q.direct}</p>
              <p className="more">{q.more}</p>
              <p className="tags">
                <Rich text={`[CONFIRM WITH LOU: ${q.confirm}]`} />
              </p>
            </div>
          </article>
        ))}
      </section>

      <ActionRow title="Got a different question?" text="Lou and Tim answer every one. We're always open to the conversation. Reach out today." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}
