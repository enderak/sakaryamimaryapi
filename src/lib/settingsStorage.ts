import fs from "fs";
import path from "path";
import { SiteSettingsConfig, defaultSiteSettingsConfig } from "@/data/siteSettings";
import { getAllowedAdminEmails } from "@/lib/adminAuth";

const DATA_DIR = path.join(process.cwd(), "data");
const SETTINGS_FILE = path.join(DATA_DIR, "site-settings.json");
const ADMIN_EMAILS_FILE = path.join(DATA_DIR, "admin-emails.json");

export function getSiteSettings(): SiteSettingsConfig {
  try {
    const currentEmails = getAllowedAdminEmails();

    if (!fs.existsSync(SETTINGS_FILE)) {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const initialConfig: SiteSettingsConfig = {
        ...defaultSiteSettingsConfig,
        security: {
          ...defaultSiteSettingsConfig.security,
          allowedEmails: currentEmails.length > 0 ? currentEmails : defaultSiteSettingsConfig.security.allowedEmails
        }
      };
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(initialConfig, null, 2), "utf-8");
      return initialConfig;
    }

    const content = fs.readFileSync(SETTINGS_FILE, "utf-8");
    const parsed = JSON.parse(content);

    return {
      security: {
        ...defaultSiteSettingsConfig.security,
        ...(parsed.security || {}),
        allowedEmails: currentEmails.length > 0 ? currentEmails : (parsed.security?.allowedEmails || defaultSiteSettingsConfig.security.allowedEmails),
        blockedIps: parsed.security?.blockedIps || defaultSiteSettingsConfig.security.blockedIps,
        ipWhitelistForAdmin: parsed.security?.ipWhitelistForAdmin || defaultSiteSettingsConfig.security.ipWhitelistForAdmin
      },
      rss: {
        ...defaultSiteSettingsConfig.rss,
        ...(parsed.rss || {}),
        feeds: parsed.rss?.feeds || defaultSiteSettingsConfig.rss.feeds
      },
      blog: {
        ...defaultSiteSettingsConfig.blog,
        ...(parsed.blog || {}),
        categories: parsed.blog?.categories || defaultSiteSettingsConfig.blog.categories
      },
      theme: {
        ...defaultSiteSettingsConfig.theme,
        ...(parsed.theme || {})
      }
    };
  } catch (err) {
    console.error("Error reading site settings:", err);
    return defaultSiteSettingsConfig;
  }
}

export function saveSiteSettings(config: SiteSettingsConfig): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // Also sync admin emails back to data/admin-emails.json if modified
    if (config.security?.allowedEmails && Array.isArray(config.security.allowedEmails)) {
      const cleanEmails = Array.from(
        new Set(
          config.security.allowedEmails
            .map((e) => e.trim().toLowerCase())
            .filter((e) => e.includes("@") && e.includes("."))
        )
      );
      if (cleanEmails.length > 0) {
        fs.writeFileSync(ADMIN_EMAILS_FILE, JSON.stringify(cleanEmails, null, 2), "utf-8");
      }
    }

    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(config, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error saving site settings:", err);
    return false;
  }
}
