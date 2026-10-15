import fs from "fs";
import path from "path";
import { HomePageModulesConfig, defaultHomeModulesConfig } from "@/data/homeModules";
import { SiteSettingsConfig, defaultSiteSettingsConfig } from "@/data/siteSettings";
import { SeoGeoConfig, defaultSeoGeoConfig } from "@/data/seoGeo";
import { SocialMediaConfig, defaultSocialMediaConfig } from "@/data/socialMedia";
import { getHomeModulesConfig, saveHomeModulesConfig } from "@/lib/modulesStorage";
import { getSiteSettings, saveSiteSettings } from "@/lib/settingsStorage";
import { getSeoGeoConfig, saveSeoGeoConfig } from "@/lib/seoStorage";
import { getSocialMediaConfig, saveSocialMediaConfig } from "@/lib/socialStorage";

export interface SiteBackupItem {
  id: string;
  createdAt: string; // ISO string
  formattedDate: string; // Turkish formatted date
  title: string;
  description: string;
  type: "manual" | "auto" | "pre_reset";
  summary: {
    modulesCount: number;
    enabledModulesCount: number;
    gameEnabled: boolean;
    activeTheme: string;
    allowedEmailsCount: number;
    seoTitle: string;
  };
  data: {
    modules: HomePageModulesConfig;
    settings: SiteSettingsConfig;
    seo: SeoGeoConfig;
    social: SocialMediaConfig;
  };
}

const DATA_DIR = path.join(process.cwd(), "data");
const BACKUPS_FILE = path.join(DATA_DIR, "site-backups.json");
const MAX_BACKUPS = 40;

function formatTurkishDate(date: Date): string {
  try {
    return date.toLocaleString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Europe/Istanbul"
    });
  } catch {
    return date.toISOString();
  }
}

/**
 * Returns all saved backups, newest first
 */
export function getAllBackups(): SiteBackupItem[] {
  try {
    if (!fs.existsSync(BACKUPS_FILE)) {
      return [];
    }
    const content = fs.readFileSync(BACKUPS_FILE, "utf-8");
    const list: SiteBackupItem[] = JSON.parse(content);
    return Array.isArray(list) ? list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) : [];
  } catch (error) {
    console.error("Error reading backups file:", error);
    return [];
  }
}

/**
 * Saves the backups array to disk
 */
function saveBackupsList(backups: SiteBackupItem[]): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      try {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      } catch {}
    }
    // Limit to max backups, preserving manual ones first
    let pruned = backups;
    if (pruned.length > MAX_BACKUPS) {
      const manual = pruned.filter(b => b.type === "manual");
      const others = pruned.filter(b => b.type !== "manual");
      pruned = [...manual, ...others.slice(0, Math.max(0, MAX_BACKUPS - manual.length))].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    fs.writeFileSync(BACKUPS_FILE, JSON.stringify(pruned, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing backups file:", err);
    return false;
  }
}

/**
 * Creates a new full snapshot of the site
 */
export function createSiteBackup(
  title?: string,
  description?: string,
  type: "manual" | "auto" | "pre_reset" = "manual"
): SiteBackupItem {
  const modules = getHomeModulesConfig();
  const settings = getSiteSettings();
  const seo = getSeoGeoConfig();
  const social = getSocialMediaConfig();

  const now = new Date();
  const id = `backup-${now.getTime()}-${Math.random().toString(36).substring(2, 7)}`;
  const dateStr = formatTurkishDate(now);

  const defaultTitle = 
    type === "manual" 
      ? `Manuel Yedek (${dateStr})` 
      : type === "pre_reset" 
      ? `Fabrika Ayarlarına Sıfırlama Öncesi Güvenlik Yedeği` 
      : `Otomatik Sistem Yedeği (${dateStr})`;

  const sectionsList = Object.values(modules?.sections || {});
  const enabledSectionsCount = sectionsList.filter(s => s.enabled).length;

  const newBackup: SiteBackupItem = {
    id,
    createdAt: now.toISOString(),
    formattedDate: dateStr,
    title: title?.trim() || defaultTitle,
    description: description?.trim() || (type === "auto" ? "Değişiklik kaydedilmeden önce sistem tarafından otomatik oluşturuldu." : "Yönetici tarafından elle kaydedilen tam sistem yedeği."),
    type,
    summary: {
      modulesCount: sectionsList.length,
      enabledModulesCount: enabledSectionsCount,
      gameEnabled: Boolean(settings?.game?.enabled),
      activeTheme: settings?.theme?.activeTheme || "gold",
      allowedEmailsCount: settings?.security?.allowedEmails?.length || 0,
      seoTitle: seo?.meta?.siteTitle || "Sakarya Mimar Yapı"
    },
    data: {
      modules,
      settings,
      seo,
      social
    }
  };

  const existing = getAllBackups();
  existing.unshift(newBackup);
  saveBackupsList(existing);

  return newBackup;
}

/**
 * Restores a specific backup by ID
 */
export function restoreSiteBackup(backupId: string): {
  success: boolean;
  message: string;
  configs?: {
    modules: HomePageModulesConfig;
    settings: SiteSettingsConfig;
    seo: SeoGeoConfig;
    social: SocialMediaConfig;
  };
} {
  const backups = getAllBackups();
  const target = backups.find(b => b.id === backupId);

  if (!target || !target.data) {
    return { success: false, message: "Belirtilen yedek kaydı bulunamadı." };
  }

  // Safety: Create an automatic snapshot before restoring
  createSiteBackup(
    `Geri Yükleme Öncesi Güvenlik Yedeği (${target.title})`,
    `"${target.title}" adlı yedeğe dönülmeden önceki mevcut durum.`,
    "auto"
  );

  try {
    if (target.data.modules) saveHomeModulesConfig(target.data.modules);
    if (target.data.settings) saveSiteSettings(target.data.settings);
    if (target.data.seo) saveSeoGeoConfig(target.data.seo);
    if (target.data.social) saveSocialMediaConfig(target.data.social);

    return {
      success: true,
      message: `"${target.title}" başarıyla geri yüklendi ve tüm ayarlar güncellendi!`,
      configs: {
        modules: getHomeModulesConfig(),
        settings: getSiteSettings(),
        seo: getSeoGeoConfig(),
        social: getSocialMediaConfig()
      }
    };
  } catch (err: any) {
    console.error("Restore backup error:", err);
    return { success: false, message: err?.message || "Yedek geri yüklenirken sunucu hatası oluştu." };
  }
}

/**
 * Reverts to the most recent backup before the current state
 */
export function undoLastChange(): {
  success: boolean;
  message: string;
  configs?: {
    modules: HomePageModulesConfig;
    settings: SiteSettingsConfig;
    seo: SeoGeoConfig;
    social: SocialMediaConfig;
  };
} {
  const backups = getAllBackups();
  if (backups.length === 0) {
    return { success: false, message: "Geri alınabilecek kayıtlı bir işlem geçmişi veya yedek bulunamadı." };
  }

  // Pick the most recent backup
  const target = backups[0];
  return restoreSiteBackup(target.id);
}

/**
 * Deletes a backup by ID
 */
export function deleteSiteBackup(backupId: string): boolean {
  const backups = getAllBackups();
  const filtered = backups.filter(b => b.id !== backupId);
  if (filtered.length === backups.length) return false;
  return saveBackupsList(filtered);
}

/**
 * Resets all configurations back to factory defaults
 */
export function resetAllSiteConfigsToDefault(): {
  success: boolean;
  message: string;
  configs: {
    modules: HomePageModulesConfig;
    settings: SiteSettingsConfig;
    seo: SeoGeoConfig;
    social: SocialMediaConfig;
  };
} {
  // 1. Take safety backup before wiping
  createSiteBackup(
    "Fabrika Ayarlarına Sıfırlama Öncesi Güvenlik Yedeği",
    "Tüm site ayarları sıfırlanmadan hemen önceki eksiksiz kopya.",
    "pre_reset"
  );

  // 2. Save defaults
  saveHomeModulesConfig(defaultHomeModulesConfig);
  saveSiteSettings(defaultSiteSettingsConfig);
  saveSeoGeoConfig(defaultSeoGeoConfig);
  saveSocialMediaConfig(defaultSocialMediaConfig);

  return {
    success: true,
    message: "Tüm site modülleri, tema, oyun, SEO ve sosyal medya ayarları başarıyla fabrika ayarlarına sıfırlandı. İstediğiniz an yedeklerden eski haline dönebilirsiniz.",
    configs: {
      modules: defaultHomeModulesConfig,
      settings: defaultSiteSettingsConfig,
      seo: defaultSeoGeoConfig,
      social: defaultSocialMediaConfig
    }
  };
}

/**
 * Imports an external JSON backup file
 */
export function importSiteBackup(importedJson: any): {
  success: boolean;
  message: string;
  configs?: {
    modules: HomePageModulesConfig;
    settings: SiteSettingsConfig;
    seo: SeoGeoConfig;
    social: SocialMediaConfig;
  };
} {
  try {
    if (!importedJson || typeof importedJson !== "object") {
      return { success: false, message: "Geçersiz veya boş yedek dosyası." };
    }

    const payload = importedJson.data ? importedJson.data : importedJson;

    if (!payload.modules && !payload.settings && !payload.seo && !payload.social) {
      return { success: false, message: "Dosya içeriğinde geçerli Sakarya Mimar Yapı ayarları bulunamadı." };
    }

    // Safety backup
    createSiteBackup("Dışarıdan Yedek Yükleme Öncesi Güvenlik Yedeği", "JSON dosyası içe aktarılmadan önceki durum.", "auto");

    if (payload.modules) saveHomeModulesConfig(payload.modules);
    if (payload.settings) saveSiteSettings(payload.settings);
    if (payload.seo) saveSeoGeoConfig(payload.seo);
    if (payload.social) saveSocialMediaConfig(payload.social);

    // Save as an entry in backups
    createSiteBackup(
      importedJson.title || "İçe Aktarılan Yedek Dosyası",
      importedJson.description || "Harici .json dosyasından başarıyla sisteme aktarıldı.",
      "manual"
    );

    return {
      success: true,
      message: "Yedek dosyası başarıyla yüklendi ve tüm site ayarları güncellendi!",
      configs: {
        modules: getHomeModulesConfig(),
        settings: getSiteSettings(),
        seo: getSeoGeoConfig(),
        social: getSocialMediaConfig()
      }
    };
  } catch (err: any) {
    return { success: false, message: err?.message || "Yedek içe aktarılırken hata oluştu." };
  }
}
