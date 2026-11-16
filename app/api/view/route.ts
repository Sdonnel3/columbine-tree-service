import { createHash } from "node:crypto";
import { recordView } from "@/lib/store";

// Counts a page view. The visitor is stored as a scrambled daily code,
// never as an IP address.
export async function POST(request: Request) {
  try {
    const { path } = JSON.parse(await request.text());
    if (typeof path !== "string" || !path.startsWith("/") || path.length > 120) {
      return new Response(null, { status: 204 });
    }
    const ua = request.headers.get("user-agent") ?? "";
    if (/bot|crawl|spider|preview|headless/i.test(ua)) return new Response(null, { status: 204 });
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
    const day = new Date().toISOString().slice(0, 10);
    const visitor = createHash("sha256").update(`${ip}|${ua}|${day}`).digest("hex").slice(0, 16);
    await recordView(path, visitor);
  } catch {}
  return new Response(null, { status: 204 });
}
