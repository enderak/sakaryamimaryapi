import fs from "fs";
import path from "path";
import { SeoGeoConfig, defaultSeoGeoConfig } from "@/data/seoGeo";

const DATA_DIR = path.join(process.cwd(), "data");
const SEO_CONFIG_FILE = path.join(DATA_DIR, "seo-geo-config.json");

export function getSeoGeoConfig(): SeoGeoConfig {
  try {
    if (!fs.existsSync(SEO_CONFIG_FILE)) {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(SEO_CONFIG_FILE, JSON.stringify(defaultSeoGeoConfig, null, 2), "utf-8");
      return defaultSeoGeoConfig;
    }

    const content = fs.readFileSync(SEO_CONFIG_FILE, "utf-8");
    const parsed = JSON.parse(content);

    return {
      meta: {
        ...defaultSeoGeoConfig.meta,
        ...(parsed.meta || {})
      },
      geo: {
        ...defaultSeoGeoConfig.geo,
        ...(parsed.geo || {})
      },
      googlePlaces: {
        ...defaultSeoGeoConfig.googlePlaces,
        ...(parsed.googlePlaces || {})
      },
      merchant: {
        ...defaultSeoGeoConfig.merchant,
        ...(parsed.merchant || {}),
        offers: parsed.merchant?.offers || defaultSeoGeoConfig.merchant.offers
      },
      schema: {
        ...defaultSeoGeoConfig.schema,
        ...(parsed.schema || {})
      }
    };
  } catch (err) {
    console.error("Error reading SEO/GEO config:", err);
    return defaultSeoGeoConfig;
  }
}

export function saveSeoGeoConfig(config: SeoGeoConfig): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(SEO_CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error saving SEO/GEO config:", err);
    return false;
  }
}
