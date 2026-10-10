export interface SocialChannelConfig {
  enabled: boolean;
  url: string;
  handle: string;
  badge?: string;
}

export interface YouTubeChannelConfig {
  enabled: boolean;
  channelUrl: string;
  handle: string;
  featuredVideoUrl: string;
  featuredVideoId: string;
  featuredVideoTitle: string;
  featuredVideoDescription: string;
}

export interface SocialPostItem {
  id: string;
  platform: "instagram" | "tiktok" | "youtube";
  title: string;
  url: string;
  viewsOrLikes?: string;
  thumbnailUrl?: string;
}

export interface SocialMediaConfig {
  channels: {
    instagram: SocialChannelConfig;
    tiktok: SocialChannelConfig;
    youtube: YouTubeChannelConfig;
    facebook: SocialChannelConfig;
    linkedin: SocialChannelConfig;
    pinterest: SocialChannelConfig;
  };
  showcaseSection: {
    enabled: boolean;
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    showYouTubeEmbed: boolean;
    privacyMode: boolean; // youtube-nocookie.com
    posts: SocialPostItem[];
  };
}

export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return "";
  const trimmed = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/))([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : "";
}

export const defaultSocialMediaConfig: SocialMediaConfig = {
  channels: {
    instagram: {
      enabled: true,
      url: "https://www.instagram.com/sakaryamimaryapi",
      handle: "@sakaryamimaryapi",
      badge: "Günlük Şantiye Reels & Hikayeleri"
    },
    youtube: {
      enabled: true,
      channelUrl: "https://www.youtube.com/@sakaryamimaryapi",
      handle: "@sakaryamimaryapi",
      featuredVideoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
      featuredVideoId: "ScMzIvxBSi4",
      featuredVideoTitle: "Sakarya Serdivan Villa & Daire Komple Tadilat Turu",
      featuredVideoDescription: "Anahtar teslim daire tadilatı, modern mutfak ve banyo dönüşüm sürecimizi adım adım inceleyin."
    },
    tiktok: {
      enabled: true,
      url: "https://www.tiktok.com/@sakaryamimaryapi",
      handle: "@sakaryamimaryapi",
      badge: "Kısa Şantiye Dönüşüm Videoları"
    },
    facebook: {
      enabled: true,
      url: "https://www.facebook.com/sakaryamimaryapi",
      handle: "sakaryamimaryapi",
      badge: "Resmi Facebook Sayfamız"
    },
    linkedin: {
      enabled: false,
      url: "https://www.linkedin.com/company/sakaryamimaryapi",
      handle: "Sakarya Mimar Yapı",
      badge: "Kurumsal Ağımız"
    },
    pinterest: {
      enabled: true,
      url: "https://www.pinterest.com/sakaryamimaryapi",
      handle: "sakaryamimaryapi",
      badge: "Mimari İlham Panoları"
    }
  },
  showcaseSection: {
    enabled: true,
    badge: "Canlı Şantiye & Sosyal Medya",
    title: "Sosyal Medyada",
    titleHighlight: "Sakarya Mimar Yapı",
    description: "Şantiyelerimizden canlı yayınlanan Instagram Reels, TikTok dönüşüm videoları ve YouTube tadilat turlarımızla işçiliğimizi şeffafça izleyin.",
    showYouTubeEmbed: true,
    privacyMode: true,
    posts: [
      {
        id: "post-1",
        platform: "instagram",
        title: "Serdivan 3+1 Daire Komple Dönüşüm Hikayesi",
        url: "https://www.instagram.com/sakaryamimaryapi",
        viewsOrLikes: "14.2K İzlenme",
        thumbnailUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "post-2",
        platform: "tiktok",
        title: "Eski Banyo Kırımından Lüks Tasarıma Geçiş (24 Gün)",
        url: "https://www.tiktok.com/@sakaryamimaryapi",
        viewsOrLikes: "28.5K İzlenme",
        thumbnailUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "post-3",
        platform: "youtube",
        title: "Sapanca Müstakil Villa Çelik Karkas İskelet Montajı",
        url: "https://www.youtube.com/@sakaryamimaryapi",
        viewsOrLikes: "9.8K İzlenme",
        thumbnailUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
      }
    ]
  }
};
