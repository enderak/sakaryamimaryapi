import { MetadataRoute } from "next";
import { getSeoGeoConfig } from "@/lib/seoStorage";

export default function robots(): MetadataRoute.Robots {
  const config = getSeoGeoConfig();
  const baseUrl = config.meta.canonicalUrl || "https://www.sakaryamimaryapi.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"]
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
