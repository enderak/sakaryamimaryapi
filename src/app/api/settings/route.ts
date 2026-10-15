import { NextResponse } from "next/server";
import { getSiteSettings, saveSiteSettings } from "@/lib/settingsStorage";
import { defaultSiteSettingsConfig, SiteSettingsConfig } from "@/data/siteSettings";
import { getAdminSession } from "@/lib/adminAuth";

export async function GET() {
  try {
    const config = getSiteSettings();
    return NextResponse.json({ success: true, config });
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

    const newConfig: SiteSettingsConfig = body.config;
    if (!newConfig || !newConfig.security || !newConfig.rss || !newConfig.blog || !newConfig.theme) {
      return NextResponse.json(
        { success: false, message: "Eksik veya geçersiz ayar verisi." },
        { status: 400 }
      );
    }

    // Safety check: ensure at least one admin email remains
    if (!newConfig.security.allowedEmails || newConfig.security.allowedEmails.length === 0) {
      return NextResponse.json(
        { success: false, message: "En az bir yönetici e-posta adresi bulunmalıdır." },
        { status: 400 }
      );
    }

    // Ensure game config fallback exists
    if (!newConfig.game) {
      newConfig.game = defaultSiteSettingsConfig.game;
    }

    const saved = saveSiteSettings(newConfig);
    if (!saved) {
      return NextResponse.json(
        { success: false, message: "Ayarlar dosyasına yazılamadı." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Tüm ayarlar (Şifre/Erişim, RSS, Blog, Tema, Oyun) başarıyla güncellendi.",
      config: newConfig
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
