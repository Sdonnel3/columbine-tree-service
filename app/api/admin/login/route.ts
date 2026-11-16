import { cookies } from "next/headers";
import { ADMIN_COOKIE, ADMIN_COOKIE_MAX_AGE, adminToken, passwordMatches } from "@/lib/auth";
import { rateLimited } from "@/lib/leads";

export async function POST(request: Request) {
  const form = await request.formData();
  const given = String(form.get("password") ?? "");
  const real = process.env.ADMIN_PASSWORD;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(`login:${ip}`, Date.now(), 10) || !passwordMatches(given, real)) {
    return new Response(null, { status: 303, headers: { Location: "/admin?wrong=1" } });
  }
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, adminToken(real!), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ADMIN_COOKIE_MAX_AGE,
    path: "/",
  });
  return new Response(null, { status: 303, headers: { Location: "/admin" } });
}
