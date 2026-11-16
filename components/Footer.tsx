import Link from "next/link";
import { business, nav } from "@/content/business";

export function Footer() {
  const a = business.address;
  return (
    <footer className="footer on-dark">
      <div className="blocks" aria-hidden="true">
        {"COLUMBINE".split("").map((l, i) => (
          <span key={i} style={{ height: `${[78, 100, 64, 88, 70, 96, 60, 84, 74][i]}%` }}>
            {l}
          </span>
        ))}
      </div>
      <div className="footer-grid">
        <div>
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <Link href="/firewood">Fohn&apos;s Firewood</Link>
            </li>
            <li>
              <a href={business.reviews.google}>Reviews on Google</a>
            </li>
            <li>
              <a href={business.reviews.yelp}>Reviews on Yelp</a>
            </li>
            <li>
              <Link href="/credits">Photo credits</Link>
            </li>
          </ul>
        </div>
        <div>
          <a className="phone" href={business.phoneHref}>
            {business.phone}
          </a>
          <p style={{ marginTop: 14 }}>
            {a.street}
            <br />
            {a.city}, {a.state} {a.zip}
          </p>
          <p style={{ marginTop: 14 }}>{business.cta}</p>
        </div>
      </div>
      <div className="footer-end">
        <span>
          {business.legalName}. Fully insured.
          Serving all of Colorado.
        </span>
        <Link href="/admin">Owner sign in</Link>
      </div>
    </footer>
  );
}
