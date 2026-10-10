import { MetadataRoute } from "next";
import { sakaryaDistricts } from "@/data/districts";
import { blogPosts } from "@/data/blog";
import { getSeoGeoConfig } from "@/lib/seoStorage";

export default function sitemap(): MetadataRoute.Sitemap {
  const config = getSeoGeoConfig();
  const baseUrl = config.meta.canonicalUrl || "https://www.sakaryamimaryapi.com";
  const now = new Date();

  // 1. Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/hizmetler`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/projeler`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/iletisim`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/haberler`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${baseUrl}/kvkk-aydinlatma-metni`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/cerez-politikasi`, lastModified: now, changeFrequency: "yearly", priority: 0.3 }
  ];

  // 2. District Geo Pages
  const districtPages: MetadataRoute.Sitemap = sakaryaDistricts.map((d) => ({
    url: `${baseUrl}/bolgeler/${d.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85
  }));

  // 3. Blog Post Pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75
  }));

  return [...staticPages, ...districtPages, ...blogPages];
}
