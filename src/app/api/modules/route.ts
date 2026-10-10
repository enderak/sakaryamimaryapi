import { NextResponse } from "next/server";
import { getHomeModulesConfig, saveHomeModulesConfig } from "@/lib/modulesStorage";
import { defaultHomeModulesConfig, HomePageModulesConfig } from "@/data/homeModules";
import { getAdminSession } from "@/lib/adminAuth";

export async function GET() {
  try {
    const config = getHomeModulesConfig();
    return NextResponse.json({ success: true, config });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Modül yapılandırması alınamadı", error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Verify admin session
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz işlem. Lütfen Gmail ile giriş yapınız." },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Check if reset action
    if (body.action === "reset") {
      saveHomeModulesConfig(defaultHomeModulesConfig);
      return NextResponse.json({
        success: true,
        message: "Modüller varsayılan ayarlara sıfırlandı.",
        config: defaultHomeModulesConfig
      });
    }

    const newConfig: HomePageModulesConfig = body.config;
    if (!newConfig || !newConfig.sections) {
      return NextResponse.json(
        { success: false, message: "Geçersiz yapılandırma verisi." },
        { status: 400 }
      );
    }

    const saved = saveHomeModulesConfig(newConfig);
    if (!saved) {
      return NextResponse.json(
        { success: false, message: "Yapılandırma dosyasına kaydedilemedi." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Anasayfa modül ayarları başarıyla güncellendi.",
      config: newConfig
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "İşlem sırasında sunucu hatası oluştu.", error },
      { status: 500 }
    );
  }
}
