import Link from "next/link";
import { business, nav } from "@/content/business";

export function Header() {
  return (
    <header className="header">
      <Link href="/" className="wordmark" aria-label={`${business.name}, home`}>
        <i aria-hidden="true" />
        {business.shortName}
      </Link>
      <nav className="nav" aria-label="Main">
        {nav.map((n) => (
          <Link key={n.href} href={n.href}>
            {n.label}
          </Link>
        ))}
      </nav>
      <a className="btn" href={business.phoneHref}>
        Call {business.phone}
      </a>
      <details className="menu">
        <summary>Menu</summary>
        <ul>
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href}>{n.label}</Link>
            </li>
          ))}
        </ul>
      </details>
    </header>
  );
}
