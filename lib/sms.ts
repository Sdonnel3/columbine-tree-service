import type { LeadInput } from "./leads";

// The text Lou and Tim get: name, phone, type, need, first line of the message.
export function formatLeadText(lead: LeadInput) {
  const firstLine = lead.message.split(/\r?\n/)[0]?.trim().slice(0, 140) ?? "";
  const tag = lead.source === "firewood" ? "FIREWOOD lead" : "New lead";
  const lines = [
    `${tag}: ${lead.name}`,
    lead.phone,
    `${lead.customerType}, ${lead.need}`,
  ];
  if (firstLine) lines.push(`"${firstLine}"`);
  return lines.join("\n");
}

export function alertNumbers(env = process.env) {
  return (env.LEAD_ALERT_NUMBERS ?? "")
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean);
}

export function smsReady(env = process.env) {
  return Boolean(
    env.TWILIO_ACCOUNT_SID &&
      env.TWILIO_AUTH_TOKEN &&
      env.TWILIO_FROM_NUMBER &&
      alertNumbers(env).length,
  );
}

// Sends the alert. Until Twilio is approved and the numbers are set in
// Vercel, this is "test mode": the lead is still saved, nothing is texted.
export async function sendLeadAlerts(lead: LeadInput) {
  const body = formatLeadText(lead);
  if (!smsReady()) {
    console.log("[sms test mode] would text:\n" + body);
    return { sent: 0, testMode: true };
  }
  const sid = process.env.TWILIO_ACCOUNT_SID!;
  const auth = Buffer.from(`${sid}:${process.env.TWILIO_AUTH_TOKEN}`).toString(
    "base64",
  );
  let sent = 0;
  for (const to of alertNumbers()) {
    try {
      const res = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            To: to,
            From: process.env.TWILIO_FROM_NUMBER!,
            Body: body,
          }),
        },
      );
      if (res.ok) sent++;
      else console.error("[sms] Twilio said", res.status);
    } catch (err) {
      console.error("[sms] failed", err);
    }
  }
  return { sent, testMode: false };
}
