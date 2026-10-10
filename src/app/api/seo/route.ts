import { NextResponse } from "next/server";
import { getSeoGeoConfig, saveSeoGeoConfig } from "@/lib/seoStorage";
import { defaultSeoGeoConfig, SeoGeoConfig } from "@/data/seoGeo";
import { getAdminSession } from "@/lib/adminAuth";

// GET /api/seo - public read
export async function GET() {
  try {
    const config = getSeoGeoConfig();
    return NextResponse.json({ success: true, config });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "SEO ve Geo yapılandırması alınamadı", error },
      { status: 500 }
    );
  }
}

// POST /api/seo - admin protected write
export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz işlem. Lütfen Gmail ile giriş yapınız." },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (body.action === "reset") {
      saveSeoGeoConfig(defaultSeoGeoConfig);
      return NextResponse.json({
        success: true,
        message: "SEO ve Geo ayarları varsayılanlara sıfırlandı.",
        config: defaultSeoGeoConfig
      });
    }

    const newConfig: SeoGeoConfig = body.config;
    if (!newConfig || !newConfig.meta || !newConfig.geo) {
      return NextResponse.json(
        { success: false, message: "Geçersiz SEO/Geo verisi." },
        { status: 400 }
      );
    }

    // Input sanitization & security check (prevent script injection in meta tags)
    if (newConfig.meta.siteTitle) {
      newConfig.meta.siteTitle = newConfig.meta.siteTitle.replace(/<[^>]*>?/gm, "").trim();
    }
    if (newConfig.meta.siteDescription) {
      newConfig.meta.siteDescription = newConfig.meta.siteDescription.replace(/<[^>]*>?/gm, "").trim();
    }
    if (newConfig.googlePlaces?.businessExactName) {
      newConfig.googlePlaces.businessExactName = newConfig.googlePlaces.businessExactName.replace(/<[^>]*>?/gm, "").trim();
    }
    if (newConfig.googlePlaces?.googleMapsProfileUrl) {
      newConfig.googlePlaces.googleMapsProfileUrl = newConfig.googlePlaces.googleMapsProfileUrl.trim();
    }
    if (newConfig.googlePlaces?.googleReviewUrl) {
      newConfig.googlePlaces.googleReviewUrl = newConfig.googlePlaces.googleReviewUrl.trim();
    }
    // Sanitize merchant offers
    if (newConfig.merchant?.offers && Array.isArray(newConfig.merchant.offers)) {
      newConfig.merchant.offers = newConfig.merchant.offers.map((offer) => ({
        ...offer,
        name: offer.name.replace(/<[^>]*>?/gm, "").trim(),
        description: offer.description.replace(/<[^>]*>?/gm, "").trim(),
        minPrice: Number(offer.minPrice) || 0,
        maxPrice: Number(offer.maxPrice) || 0
      }));
    }
    // Sanitize AI Optimization fields
    if (newConfig.aiOptimization?.aiSummaryPrompt) {
      newConfig.aiOptimization.aiSummaryPrompt = newConfig.aiOptimization.aiSummaryPrompt.replace(/<[^>]*>?/gm, "").trim();
    }
    if (newConfig.aiOptimization?.faqSchema && Array.isArray(newConfig.aiOptimization.faqSchema)) {
      newConfig.aiOptimization.faqSchema = newConfig.aiOptimization.faqSchema.map((faq) => ({
        question: faq.question.replace(/<[^>]*>?/gm, "").trim(),
        answer: faq.answer.replace(/<[^>]*>?/gm, "").trim()
      }));
    }

    const saved = saveSeoGeoConfig(newConfig);
    if (!saved) {
      return NextResponse.json(
        { success: false, message: "SEO/Geo dosyasına kaydedilemedi." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "SEO ve Geo etiketleri başarıyla güncellendi.",
      config: newConfig
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "İşlem sırasında sunucu hatası oluştu.", error },
      { status: 500 }
    );
  }
}
