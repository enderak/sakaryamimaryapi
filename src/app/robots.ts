import { MetadataRoute } from "next";
import { getSeoGeoConfig } from "@/lib/seoStorage";

export default function robots(): MetadataRoute.Robots {
  const config = getSeoGeoConfig();
  const baseUrl = config.meta.canonicalUrl || "https://www.sakaryamimaryapi.com";
  const allowAi = config.aiOptimization?.enableAiCrawlers !== false;

  const aiBots = [
    "GPTBot",
    "ChatGPT-User",
    "ClaudeBot",
    "PerplexityBot",
    "Google-Extended",
    "Bytespider",
    "CCBot",
    "cohere-ai",
    "Bingbot"
  ];

  const rules: MetadataRoute.Robots["rules"] = [
    {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"]
    }
  ];

  if (allowAi) {
    rules.push({
      userAgent: aiBots,
      allow: "/",
      disallow: ["/admin/", "/api/"]
    });
  } else {
    rules.push({
      userAgent: aiBots,
      disallow: ["/"]
    });
  }

  return {
    rules,
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
