import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";
import { getSocialMediaConfig, saveSocialMediaConfig } from "@/lib/socialStorage";
import { SocialMediaConfig, extractYouTubeId, defaultSocialMediaConfig } from "@/data/socialMedia";

function stripHtml(text: string): string {
  if (!text || typeof text !== "string") return "";
  return text.replace(/<[^>]*>?/gm, "").trim();
}

function isValidSocialUrl(url: string, allowedHostPattern?: RegExp): boolean {
  if (!url || typeof url !== "string") return true; // empty is allowed (channel disabled)
  const trimmed = url.trim();
  if (trimmed === "") return true;

  // Disallow hazardous schemes
  if (/^(javascript|data|vbscript|file):/i.test(trimmed)) {
    return false;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return false;
    }
    if (allowedHostPattern && !allowedHostPattern.test(parsed.hostname)) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  const config = getSocialMediaConfig();
  return NextResponse.json({ success: true, config });
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz işlem. Lütfen yönetici olarak giriş yapın." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const incomingConfig = body.config as Partial<SocialMediaConfig>;

    if (!incomingConfig || !incomingConfig.channels) {
      return NextResponse.json(
        { success: false, message: "Geçersiz yapılandırma verisi." },
        { status: 400 }
      );
    }

    // Validate URLs
    const instagramUrl = incomingConfig.channels.instagram?.url?.trim() || "";
    if (instagramUrl && !isValidSocialUrl(instagramUrl, /^(www\.)?instagram\.com$/i)) {
      return NextResponse.json(
        { success: false, message: "Geçersiz Instagram adresi. Sadece https://instagram.com/ formatı kabul edilir." },
        { status: 400 }
      );
    }

    const tiktokUrl = incomingConfig.channels.tiktok?.url?.trim() || "";
    if (tiktokUrl && !isValidSocialUrl(tiktokUrl, /^(www\.)?tiktok\.com$/i)) {
      return NextResponse.json(
        { success: false, message: "Geçersiz TikTok adresi. Sadece https://tiktok.com/ formatı kabul edilir." },
        { status: 400 }
      );
    }

    const youtubeUrl = incomingConfig.channels.youtube?.channelUrl?.trim() || "";
    if (youtubeUrl && !isValidSocialUrl(youtubeUrl, /^(www\.)?(youtube\.com|youtu\.be)$/i)) {
      return NextResponse.json(
        { success: false, message: "Geçersiz YouTube kanal adresi. Sadece youtube.com formatı kabul edilir." },
        { status: 400 }
      );
    }

    const youtubeVideoUrl = incomingConfig.channels.youtube?.featuredVideoUrl?.trim() || "";
    if (youtubeVideoUrl && !isValidSocialUrl(youtubeVideoUrl, /^(www\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)$/i)) {
      return NextResponse.json(
        { success: false, message: "Geçersiz YouTube video adresi." },
        { status: 400 }
      );
    }

    // Clean and build sanitized config
    const rawChannels = incomingConfig.channels;
    const sanitizedConfig: SocialMediaConfig = {
      channels: {
        instagram: {
          enabled: Boolean(rawChannels.instagram?.enabled),
          url: instagramUrl,
          handle: stripHtml(rawChannels.instagram?.handle || "@sakaryamimaryapi"),
          badge: stripHtml(rawChannels.instagram?.badge || "Günlük Şantiye Reels & Hikayeleri")
        },
        tiktok: {
          enabled: Boolean(rawChannels.tiktok?.enabled),
          url: tiktokUrl,
          handle: stripHtml(rawChannels.tiktok?.handle || "@sakaryamimaryapi"),
          badge: stripHtml(rawChannels.tiktok?.badge || "Kısa Şantiye Dönüşüm Videoları")
        },
        youtube: {
          enabled: Boolean(rawChannels.youtube?.enabled),
          channelUrl: youtubeUrl,
          handle: stripHtml(rawChannels.youtube?.handle || "@sakaryamimaryapi"),
          featuredVideoUrl: youtubeVideoUrl,
          featuredVideoId: extractYouTubeId(youtubeVideoUrl) || stripHtml(rawChannels.youtube?.featuredVideoId || ""),
          featuredVideoTitle: stripHtml(rawChannels.youtube?.featuredVideoTitle || "Sakarya Tadilat & Şantiye Turu"),
          featuredVideoDescription: stripHtml(rawChannels.youtube?.featuredVideoDescription || "")
        },
        facebook: {
          enabled: Boolean(rawChannels.facebook?.enabled),
          url: stripHtml(rawChannels.facebook?.url || ""),
          handle: stripHtml(rawChannels.facebook?.handle || ""),
          badge: stripHtml(rawChannels.facebook?.badge || "Resmi Facebook Sayfamız")
        },
        linkedin: {
          enabled: Boolean(rawChannels.linkedin?.enabled),
          url: stripHtml(rawChannels.linkedin?.url || ""),
          handle: stripHtml(rawChannels.linkedin?.handle || ""),
          badge: stripHtml(rawChannels.linkedin?.badge || "Kurumsal Ağımız")
        },
        pinterest: {
          enabled: Boolean(rawChannels.pinterest?.enabled),
          url: stripHtml(rawChannels.pinterest?.url || ""),
          handle: stripHtml(rawChannels.pinterest?.handle || ""),
          badge: stripHtml(rawChannels.pinterest?.badge || "Mimari İlham Panoları")
        }
      },
      showcaseSection: {
        enabled: Boolean(incomingConfig.showcaseSection?.enabled ?? true),
        badge: stripHtml(incomingConfig.showcaseSection?.badge || "Canlı Şantiye & Sosyal Medya"),
        title: stripHtml(incomingConfig.showcaseSection?.title || "Sosyal Medyada"),
        titleHighlight: stripHtml(incomingConfig.showcaseSection?.titleHighlight || "Sakarya Mimar Yapı"),
        description: stripHtml(incomingConfig.showcaseSection?.description || ""),
        showYouTubeEmbed: Boolean(incomingConfig.showcaseSection?.showYouTubeEmbed ?? true),
        privacyMode: Boolean(incomingConfig.showcaseSection?.privacyMode ?? true),
        posts: Array.isArray(incomingConfig.showcaseSection?.posts)
          ? incomingConfig.showcaseSection!.posts.map((p, idx) => ({
              id: p.id || `post-${Date.now()}-${idx}`,
              platform: (p.platform === "tiktok" || p.platform === "youtube") ? p.platform : "instagram",
              title: stripHtml(p.title || "Şantiye Paylaşımı"),
              url: (p.url && isValidSocialUrl(p.url)) ? p.url.trim() : "",
              viewsOrLikes: stripHtml(p.viewsOrLikes || ""),
              thumbnailUrl: (p.thumbnailUrl && isValidSocialUrl(p.thumbnailUrl)) ? p.thumbnailUrl.trim() : defaultSocialMediaConfig.showcaseSection.posts[0]?.thumbnailUrl
            }))
          : defaultSocialMediaConfig.showcaseSection.posts
      }
    };

    const saved = saveSocialMediaConfig(sanitizedConfig);
    if (!saved) {
      return NextResponse.json(
        { success: false, message: "Sosyal medya yapılandırması kaydedilemedi." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Sosyal medya ve video ayarları güvenle güncellendi.",
      config: sanitizedConfig
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "İşlem sırasında sunucu hatası oluştu.", error },
      { status: 500 }
    );
  }
}
