import { NextResponse } from "next/server";
import { getSiteSettings, saveSiteSettings } from "@/lib/settingsStorage";
import { defaultSiteSettingsConfig, SiteSettingsConfig } from "@/data/siteSettings";
import { getAdminSession } from "@/lib/adminAuth";

export async function GET() {
  try {
    const config = getSiteSettings();
    return NextResponse.json(
      { success: true, config },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Site ayarları alınamadı", error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz işlem. Lütfen giriş yapınız." },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (body.action === "reset") {
      saveSiteSettings(defaultSiteSettingsConfig);
      return NextResponse.json({
        success: true,
        message: "Site ayarları başarıyla varsayılana sıfırlandı.",
        config: defaultSiteSettingsConfig
      });
    }

    const incomingConfig = body.config;
    if (!incomingConfig || typeof incomingConfig !== "object") {
      return NextResponse.json(
        { success: false, message: "Eksik veya geçersiz ayar verisi." },
        { status: 400 }
      );
    }

    const currentConfig = getSiteSettings() || defaultSiteSettingsConfig;

    const mergedConfig: SiteSettingsConfig = {
      ...defaultSiteSettingsConfig,
      ...currentConfig,
      ...incomingConfig,
      security: {
        ...defaultSiteSettingsConfig.security,
        ...(currentConfig?.security || {}),
        ...(incomingConfig?.security || {})
      },
      rss: {
        ...defaultSiteSettingsConfig.rss,
        ...(currentConfig?.rss || {}),
        ...(incomingConfig?.rss || {})
      },
      blog: {
        ...defaultSiteSettingsConfig.blog,
        ...(currentConfig?.blog || {}),
        ...(incomingConfig?.blog || {})
      },
      theme: {
        ...defaultSiteSettingsConfig.theme,
        ...(currentConfig?.theme || {}),
        ...(incomingConfig?.theme || {})
      },
      game: {
        ...defaultSiteSettingsConfig.game,
        ...(currentConfig?.game || {}),
        ...(incomingConfig?.game || {})
      }
    };

    // Safety check: ensure at least one admin email remains
    if (!mergedConfig.security.allowedEmails || mergedConfig.security.allowedEmails.length === 0) {
      mergedConfig.security.allowedEmails = defaultSiteSettingsConfig.security.allowedEmails;
    }

    const saved = saveSiteSettings(mergedConfig);
    if (!saved) {
      return NextResponse.json(
        { success: false, message: "Ayarlar dosyasına yazılamadı." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Tüm ayarlar (Şifre/Erişim, RSS, Blog, Tema, Oyun) başarıyla güncellendi.",
      config: mergedConfig
    });
  } catch (error: any) {
    console.error("Settings POST error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: error?.message || "Ayarlar kaydedilirken sunucu hatası meydana geldi.", 
        error: String(error) 
      },
      { status: 500 }
    );
  }
}

