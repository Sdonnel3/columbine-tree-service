import { neon } from "@neondatabase/serverless";
import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { Lead, LeadInput } from "./leads";

// Leads and page views live in Postgres when DATABASE_URL is set (Vercel).
// Without it, they go to a local file so the site still works on a laptop
// and on a preview link. The file version on Vercel is temporary storage.

export type Stats = {
  visitors7: number;
  visitors30: number;
  topPages: { path: string; views: number }[];
};

export const hasDatabase = () => Boolean(process.env.DATABASE_URL);

/* ---------- Postgres ---------- */

let ready: Promise<void> | null = null;
function db() {
  const sql = neon(process.env.DATABASE_URL!);
  if (!ready) {
    ready = (async () => {
      await sql`CREATE TABLE IF NOT EXISTS leads (
        id text PRIMARY KEY,
        created_at timestamptz NOT NULL DEFAULT now(),
        name text NOT NULL,
        phone text NOT NULL,
        email text NOT NULL DEFAULT '',
        customer_type text NOT NULL,
        need text NOT NULL,
        message text NOT NULL DEFAULT '',
        source text NOT NULL DEFAULT 'main',
        done boolean NOT NULL DEFAULT false
      )`;
      await sql`CREATE TABLE IF NOT EXISTS page_views (
        day date NOT NULL DEFAULT current_date,
        path text NOT NULL,
        visitor text NOT NULL
      )`;
    })();
  }
  return { sql, ready };
}

/* ---------- File fallback ---------- */

type FileData = {
  leads: Lead[];
  views: { day: string; path: string; visitor: string }[];
};
const filePath = process.env.VERCEL
  ? "/tmp/columbine-store.json"
  : path.join(process.cwd(), ".data", "store.json");

async function readFile(): Promise<FileData> {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch {
    return { leads: [], views: [] };
  }
}
async function writeFile(data: FileData) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

/* ---------- Public functions ---------- */

export async function saveLead(input: LeadInput): Promise<Lead> {
  const lead: Lead = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    done: false,
  };
  if (hasDatabase()) {
    const { sql, ready } = db();
    await ready;
    await sql`INSERT INTO leads (id, name, phone, email, customer_type, need, message, source)
      VALUES (${lead.id}, ${lead.name}, ${lead.phone}, ${lead.email}, ${lead.customerType}, ${lead.need}, ${lead.message}, ${lead.source})`;
  } else {
    const data = await readFile();
    data.leads.push(lead);
    await writeFile(data);
  }
  return lead;
}

export async function listLeads(includeDone: boolean): Promise<Lead[]> {
  if (hasDatabase()) {
    const { sql, ready } = db();
    await ready;
    const rows = includeDone
      ? await sql`SELECT * FROM leads ORDER BY created_at DESC LIMIT 500`
      : await sql`SELECT * FROM leads WHERE done = false ORDER BY created_at DESC LIMIT 500`;
    return rows.map((r) => ({
      id: r.id,
      createdAt: new Date(r.created_at).toISOString(),
      name: r.name,
      phone: r.phone,
      email: r.email,
      customerType: r.customer_type,
      need: r.need,
      message: r.message,
      source: r.source,
      done: r.done,
    }));
  }
  const data = await readFile();
  return data.leads
    .filter((l) => includeDone || !l.done)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function toggleLead(id: string) {
  if (hasDatabase()) {
    const { sql, ready } = db();
    await ready;
    await sql`UPDATE leads SET done = NOT done WHERE id = ${id}`;
    return;
  }
  const data = await readFile();
  const lead = data.leads.find((l) => l.id === id);
  if (lead) lead.done = !lead.done;
  await writeFile(data);
}

export async function recordView(pagePath: string, visitor: string) {
  if (hasDatabase()) {
    const { sql, ready } = db();
    await ready;
    await sql`INSERT INTO page_views (path, visitor) VALUES (${pagePath}, ${visitor})`;
    return;
  }
  const data = await readFile();
  data.views.push({
    day: new Date().toISOString().slice(0, 10),
    path: pagePath,
    visitor,
  });
  data.views = data.views.slice(-5000);
  await writeFile(data);
}

export async function getStats(): Promise<Stats> {
  if (hasDatabase()) {
    const { sql, ready } = db();
    await ready;
    const [v7] =
      await sql`SELECT count(DISTINCT visitor)::int AS n FROM page_views WHERE day > current_date - 7`;
    const [v30] =
      await sql`SELECT count(DISTINCT visitor)::int AS n FROM page_views WHERE day > current_date - 30`;
    const top =
      await sql`SELECT path, count(*)::int AS views FROM page_views WHERE day > current_date - 30 GROUP BY path ORDER BY views DESC LIMIT 5`;
    return {
      visitors7: v7.n,
      visitors30: v30.n,
      topPages: top.map((t) => ({ path: t.path, views: t.views })),
    };
  }
  const data = await readFile();
  const since = (days: number) =>
    new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
  const uniq = (days: number) =>
    new Set(data.views.filter((v) => v.day > since(days)).map((v) => v.visitor))
      .size;
  const counts = new Map<string, number>();
  for (const v of data.views.filter((v) => v.day > since(30))) {
    counts.set(v.path, (counts.get(v.path) ?? 0) + 1);
  }
  return {
    visitors7: uniq(7),
    visitors30: uniq(30),
    topPages: [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([p, views]) => ({ path: p, views })),
  };
}
