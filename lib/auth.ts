import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "cts_admin";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // one year

// The cookie holds a fingerprint of the password, never the password itself.
// Changing the password in Vercel signs everyone out.
export function adminToken(password: string) {
  return createHmac("sha256", password).update("columbine-admin-v1").digest("hex");
}

export function passwordMatches(given: string, real: string | undefined) {
  if (!real || !given) return false;
  const a = Buffer.from(adminToken(given));
  const b = Buffer.from(adminToken(real));
  return a.length === b.length && timingSafeEqual(a, b);
}

export function tokenValid(token: string | undefined, real: string | undefined) {
  if (!real || !token) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(adminToken(real));
  return a.length === b.length && timingSafeEqual(a, b);
}
