import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { business } from "@/content/business";
import { ADMIN_COOKIE, tokenValid } from "@/lib/auth";
import { smsReady } from "@/lib/sms";
import { getStats, hasDatabase, listLeads } from "@/lib/store";
import "./admin.css";

// This page reads the address bar or sign in on each visit.
export const instant = false;

export const metadata: Metadata = { title: "Leads", robots: { index: false, follow: false } };

const when = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    timeZone: "America/Denver",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export default async function Admin({
  searchParams,
}: {
  searchParams: Promise<{ show?: string; wrong?: string }>;
}) {
  const sp = await searchParams;
  const jar = await cookies();
  const signedIn = tokenValid(jar.get(ADMIN_COOKIE)?.value, process.env.ADMIN_PASSWORD);

  if (!signedIn) {
    return (
      <main className="login">
        <h1>Leads</h1>
        <form className="form" method="post" action="/api/admin/login">
          {sp.wrong ? <p className="form-error" role="alert">That password did not work. Try again.</p> : null}
          {!process.env.ADMIN_PASSWORD ? <p className="form-error">No password has been set up yet.</p> : null}
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required autoComplete="current-password" />
          </div>
          <button className="btn dark" type="submit">Sign in</button>
          <p className="small">You stay signed in on this phone for a year.</p>
        </form>
      </main>
    );
  }

  const all = sp.show === "all";
  const [leads, stats] = await Promise.all([listLeads(all), getStats()]);

  return (
    <main className="admin">
      <div className="admin-top">
        <h1>Leads</h1>
        <Link className="link" href="/">See the site</Link>
      </div>

      {!hasDatabase() ? (
        <p className="warn">The database is not connected yet. Leads shown here are temporary test data.</p>
      ) : null}
      {!smsReady() ? (
        <p className="warn">Text alerts are in test mode. Leads are saved here but not texted yet.</p>
      ) : null}

      <div className="filter">
        <a href="/admin" aria-current={!all}>Not done</a>
        <a href="/admin?show=all" aria-current={all}>All</a>
      </div>

      {leads.length === 0 ? (
        <p className="empty">{all ? "No leads yet." : "Nothing waiting. You are caught up."}</p>
      ) : null}
      {leads.map((l) => (
        <article className={l.done ? "lead-card done" : "lead-card"} key={l.id}>
          <div className="who">
            <b>{l.name}</b>
            <span className="small">{when(l.createdAt)}</span>
          </div>
          <a className="tel" href={`tel:${l.phone.replace(/[^\d+]/g, "")}`}>{l.phone}</a>
          <div>
            <span className={l.source === "firewood" ? "tag fw" : "tag"}>{l.source === "firewood" ? "Firewood" : l.customerType === "business" ? "Business" : "Homeowner"}</span>
            {l.source === "firewood" ? null : <span className="tag">{l.need}</span>}
          </div>
          {l.message ? <p className="msg">{l.message}</p> : null}
          {l.email ? <a className="small" href={`mailto:${l.email}`}>{l.email}</a> : null}
          <form method="post" action="/api/admin/toggle">
            <input type="hidden" name="id" value={l.id} />
            {all ? <input type="hidden" name="show" value="all" /> : null}
            <button type="submit">{l.done ? "Done. Tap to undo" : "Mark done"}</button>
          </form>
        </article>
      ))}

      <h2>Visits</h2>
      <div className="numbers">
        <div><b>{stats.visitors7}</b>visitors, last 7 days</div>
        <div><b>{stats.visitors30}</b>visitors, last 30 days</div>
      </div>
      {stats.topPages.length ? (
        <ul className="pages">
          {stats.topPages.map((p) => (
            <li key={p.path}><span>{p.path === "/" ? "Home" : p.path}</span><span>{p.views} views</span></li>
          ))}
        </ul>
      ) : null}

      <h2>Your listings</h2>
      <div className="listing">
        <a className="btn dark" href={business.reviews.google}>Google profile</a>
        <a className="btn dark" href={business.reviews.yelp}>Yelp listing</a>
      </div>
    </main>
  );
}
