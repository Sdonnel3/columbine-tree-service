import { NEEDS } from "@/lib/leads";

// The short form. It posts to /api/leads, which saves the lead and texts
// Lou and Tim. Works without JavaScript.
export function LeadForm({
  source = "main",
  need,
  type,
  error,
  button = "Send it to Lou and Tim",
}: {
  source?: "main" | "firewood";
  need?: string;
  type?: string;
  error?: string;
  button?: string;
}) {
  const needs = NEEDS.filter((n) => n !== "firewood");
  return (
    <form className="form" id="form" method="post" action="/api/leads">
      {error ? (
        <p className="form-error" role="alert">
          {error === "phone"
            ? "That phone number looks short. Please check it and try again."
            : error === "busy"
              ? "That is a lot of notes in a few minutes. Please call us instead."
              : "Something was missing. We need at least a name and a phone number."}
        </p>
      ) : null}
      <input type="hidden" name="source" value={source} />
      <div className="hp" aria-hidden="true">
        <label htmlFor="company_website">Leave this empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="two">
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required autoComplete="name" />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" />
        </div>
      </div>
      <div>
        <label htmlFor="email">Email, if you like</label>
        <input id="email" name="email" type="email" autoComplete="email" />
      </div>
      <fieldset>
        <legend>You are a</legend>
        <div className="chips">
          <label>
            <input type="radio" name="customerType" value="business" defaultChecked={type === "business"} />
            <span>Business</span>
          </label>
          <label>
            <input type="radio" name="customerType" value="homeowner" defaultChecked={type !== "business"} />
            <span>Homeowner</span>
          </label>
        </div>
      </fieldset>
      {source === "main" ? (
        <fieldset>
          <legend>What you need</legend>
          <div className="chips">
            {needs.map((n, i) => (
              <label key={n}>
                <input type="radio" name="need" value={n} defaultChecked={need ? need === n : i === 0} />
                <span>{n[0].toUpperCase() + n.slice(1)}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}
      <div>
        <label htmlFor="message">A short message</label>
        <textarea id="message" name="message" />
      </div>
      <div>
        <button className="btn" type="submit">
          {button}
        </button>
      </div>
    </form>
  );
}
