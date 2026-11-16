export const CUSTOMER_TYPES = ["business", "homeowner"] as const;
export const NEEDS = [
  "transplanting",
  "buying a tree",
  "pruning",
  "removal",
  "stump grinding",
  "farm visit",
  "firewood",
  "something else",
] as const;

export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  customerType: (typeof CUSTOMER_TYPES)[number];
  need: (typeof NEEDS)[number];
  message: string;
  source: "main" | "firewood";
  done: boolean;
};

export type LeadInput = Omit<Lead, "id" | "createdAt" | "done">;

type Result =
  | { ok: true; lead: LeadInput }
  | { ok: false; spam: boolean; error: string };

const clean = (v: unknown, max: number) =>
  String(v ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

export function validateLead(raw: Record<string, unknown>): Result {
  // Honeypot: real people never see this field, bots fill it in.
  if (clean(raw.company_website, 200) !== "") {
    return { ok: false, spam: true, error: "spam" };
  }
  const name = clean(raw.name, 80);
  const phone = clean(raw.phone, 30);
  const email = clean(raw.email, 120);
  const message = String(raw.message ?? "").trim().slice(0, 1500);
  const customerType = clean(raw.customerType, 20);
  const need = clean(raw.need, 30);
  const source = clean(raw.source, 20) === "firewood" ? "firewood" : "main";

  if (!name) return { ok: false, spam: false, error: "name" };
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    return { ok: false, spam: false, error: "phone" };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, spam: false, error: "email" };
  }
  const type = (CUSTOMER_TYPES as readonly string[]).includes(customerType)
    ? (customerType as Lead["customerType"])
    : "homeowner";
  const safeNeed = (NEEDS as readonly string[]).includes(need)
    ? (need as Lead["need"])
    : "something else";

  return {
    ok: true,
    lead: {
      name,
      phone,
      email,
      message,
      customerType: type,
      need: source === "firewood" ? "firewood" : safeNeed,
      source,
    },
  };
}

// Simple rate limit: a few submissions per visitor per 10 minutes.
const hits = new Map<string, number[]>();
export function rateLimited(key: string, now = Date.now(), max = 5) {
  const windowMs = 10 * 60 * 1000;
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}
