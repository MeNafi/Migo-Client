import type { MetadataRoute } from "next";
import { APP_URL } from "@/lib/migo/api";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/how-it-works", "/login", "/register"].map((p, i) => ({ url: `${APP_URL}${p}`, changeFrequency: "weekly", priority: i === 0 ? 1 : 0.7 }));
}
