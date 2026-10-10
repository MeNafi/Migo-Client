import type { MetadataRoute } from "next";
import { APP_URL } from "@/lib/migo/api";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: ["/", "/how-it-works"], disallow: ["/admin", "/commuter", "/rides", "/payments", "/profile", "/messages", "/find-ride", "/dashboard", "/safety", "/history", "/routes"] }, sitemap: `${APP_URL}/sitemap.xml` };
}
