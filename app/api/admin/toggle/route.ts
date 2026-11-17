import { cookies } from "next/headers";
import { ADMIN_COOKIE, tokenValid } from "@/lib/auth";
import { toggleLead } from "@/lib/store";

export async function POST(request: Request) {
  const jar = await cookies();
  if (!tokenValid(jar.get(ADMIN_COOKIE)?.value, process.env.ADMIN_PASSWORD)) {
    return new Response("Not signed in", { status: 401 });
  }
  const form = await request.formData();
  const id = String(form.get("id") ?? "");
  if (id) await toggleLead(id);
  const all = form.get("show") === "all";
  return new Response(null, { status: 303, headers: { Location: all ? "/admin?show=all" : "/admin" } });
}
