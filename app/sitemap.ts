import type { MetadataRoute } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/for-businesses", "/tree-farm", "/services", "/ask-lou", "/contact", "/firewood"].map((p) => ({
    url: `${site}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
