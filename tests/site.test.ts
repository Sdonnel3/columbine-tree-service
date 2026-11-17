import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { questions } from "../content/ask-lou";
import { adminToken, passwordMatches, tokenValid } from "../lib/auth";
import { rateLimited, validateLead } from "../lib/leads";
import { alertNumbers, formatLeadText, smsReady } from "../lib/sms";

const good = { name: "Pat Smith", phone: "(303) 555-0100", customerType: "business", need: "transplanting", message: "Twelve spruce for an HOA entrance.\nSecond line." };

describe("lead form", () => {
  it("accepts a normal lead", () => {
    const r = validateLead(good);
    expect(r.ok && r.lead.customerType).toBe("business");
  });
  it("needs a name and a real phone number", () => {
    expect(validateLead({ ...good, name: " " })).toMatchObject({ ok: false, error: "name" });
    expect(validateLead({ ...good, phone: "555" })).toMatchObject({ ok: false, error: "phone" });
  });
  it("email is optional but must look like one", () => {
    expect(validateLead({ ...good, email: "" }).ok).toBe(true);
    expect(validateLead({ ...good, email: "nope" })).toMatchObject({ ok: false, error: "email" });
  });
  it("catches bots that fill the hidden field", () => {
    expect(validateLead({ ...good, company_website: "http://spam" })).toMatchObject({ ok: false, spam: true });
  });
  it("tags firewood leads", () => {
    const r = validateLead({ ...good, source: "firewood" });
    expect(r.ok && r.lead.source).toBe("firewood");
    expect(r.ok && r.lead.need).toBe("firewood");
  });
  it("slows down repeat senders", () => {
    const now = Date.now();
    for (let i = 0; i < 5; i++) expect(rateLimited("t1", now)).toBe(false);
    expect(rateLimited("t1", now)).toBe(true);
    expect(rateLimited("t1", now + 11 * 60 * 1000)).toBe(false);
  });
});

describe("text alerts", () => {
  it("texts name, phone, type, need and the first line only", () => {
    const r = validateLead(good);
    if (!r.ok) throw new Error("bad");
    const text = formatLeadText(r.lead);
    expect(text).toContain("Pat Smith");
    expect(text).toContain("(303) 555-0100");
    expect(text).toContain("business, transplanting");
    expect(text).toContain("Twelve spruce");
    expect(text).not.toContain("Second line");
  });
  it("stays in test mode until Twilio and the numbers are set", () => {
    expect(smsReady({} as NodeJS.ProcessEnv)).toBe(false);
    expect(alertNumbers({ LEAD_ALERT_NUMBERS: "+13035550101, +13035550102" } as unknown as NodeJS.ProcessEnv)).toHaveLength(2);
  });
});

describe("owner sign in", () => {
  it("only the right password works", () => {
    expect(passwordMatches("spruce", "spruce")).toBe(true);
    expect(passwordMatches("wrong", "spruce")).toBe(false);
    expect(passwordMatches("", undefined)).toBe(false);
    expect(tokenValid(adminToken("spruce"), "spruce")).toBe(true);
    expect(tokenValid(adminToken("old"), "spruce")).toBe(false);
  });
});

// The rules of the job from the brief, checked on every change.
function files(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    return statSync(p).isDirectory() ? files(p) : /\.(ts|tsx)$/.test(p) ? [p] : [];
  });
}
const copy = ["content", "app", "components"].flatMap(files).map((f) => ({ f, text: readFileSync(f, "utf8") }));

describe("site copy rules", () => {
  it("has no em dashes", () => {
    for (const { f, text } of copy) expect(text.includes("—"), f).toBe(false);
  });
  it("never says guarantee, warranty, arborist or certified", () => {
    for (const { f, text } of copy) expect(/guarantee|warranty|arborist|certified|certification/i.test(text), f).toBe(false);
  });
  it("does not offer storm or emergency work, or seasonal promotions", () => {
    for (const { f, text } of copy) expect(/storm|emergency|% off|sale ends|spring special/i.test(text), f).toBe(false);
  });
  it("publishes no prices", () => {
    for (const { f, text } of copy.filter((c) => c.f.startsWith("content"))) expect(/\$\d/.test(text), f).toBe(false);
  });
  it("keeps secrets out of the code", () => {
    for (const { f, text } of copy) expect(/AC[0-9a-f]{32}|postgres(ql)?:\/\/\S+:\S+@/.test(text), f).toBe(false);
  });
});

describe("Ask Lou", () => {
  it("has all nine questions, each marked as a draft", () => {
    expect(questions).toHaveLength(9);
    for (const q of questions) expect(q.draft).toBe(true);
  });
  it("each answer leads with one direct sentence, then 60 to 120 words", () => {
    for (const q of questions) {
      expect(q.direct.split(/[.?!]\s/).length, q.q).toBe(1);
      const words = q.more.split(/\s+/).length;
      expect(words, q.q).toBeGreaterThanOrEqual(60);
      expect(words, q.q).toBeLessThanOrEqual(120);
    }
  });
});
