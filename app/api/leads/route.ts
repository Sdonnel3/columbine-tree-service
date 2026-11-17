import { rateLimited, validateLead } from "@/lib/leads";
import { sendLeadAlerts } from "@/lib/sms";
import { saveLead } from "@/lib/store";

const go = (to: string) => new Response(null, { status: 303, headers: { Location: to } });

export async function POST(request: Request) {
  const form = await request.formData();
  const raw = Object.fromEntries(form.entries());
  const firewood = raw.source === "firewood";
  const back = firewood ? "/firewood" : "/contact";
  const thanks = firewood ? "/firewood?sent=1#buy" : "/thanks";

  const result = validateLead(raw);
  if (!result.ok) {
    // Bots get a normal looking thank you so they do not try again.
    if (result.spam) return go(thanks);
    return go(`${back}?error=${result.error}#form`);
  }
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return go(`${back}?error=busy#form`);

  try {
    await saveLead(result.lead);
  } catch (err) {
    console.error("[leads] could not save", err);
  }
  await sendLeadAlerts(result.lead);
  return go(thanks);
}
