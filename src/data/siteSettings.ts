export interface RssFeedSource {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
}

export interface SiteSettingsConfig {
  security: {
    allowedEmails: string[];
    requireOtp: boolean;
    sessionDurationDays: number;
    masterPasswordHint: string;
  };
  rss: {
    enabled: boolean;
    itemsToShow: number;
    refreshIntervalMinutes: number;
    showFallbackOnFail: boolean;
    feeds: RssFeedSource[];
  };
  blog: {
    enabled: boolean;
    postsPerPage: number;
    showAuthorInfo: boolean;
    showReadTime: boolean;
    allowComments: boolean;
    featuredCategory: string;
    categories: string[];
  };
  theme: {
    activeTheme: "navy" | "graphite" | "light";
    brandName: string;
    showThemeSwitcher: boolean;
    navbarStyle: "sticky" | "floating" | "static";
    showWhatsAppFloating: boolean;
    showCookieBanner: boolean;
    primaryAccentColor: string;
  };
}

export const defaultSiteSettingsConfig: SiteSettingsConfig = {
  security: {
    allowedEmails: [
      "sakaryamimaryapi@gmail.com",
      "enderakar@outlook.com",
      "enderakar@gmail.com"
    ],
    requireOtp: true,
    sessionDurationDays: 7,
    masterPasswordHint: "Sakarya 2026 Admin Şifresi / OTP ile doğrulama"
  },
  rss: {
    enabled: true,
    itemsToShow: 4,
    refreshIntervalMinutes: 30,
    showFallbackOnFail: true,
    feeds: [
      {
        id: "feed-trt",
        name: "TRT Haber Ekonomi & İnşaat",
        url: "https://www.trthaber.com/ekonomi_articles.rss",
        enabled: true
      },
      {
        id: "feed-aa",
        name: "Anadolu Ajansı Güncel",
        url: "https://www.aa.com.tr/tr/rss/default?cat=guncel",
        enabled: true
      },
      {
        id: "feed-csb",
        name: "Çevre ve Şehircilik Bakanlığı",
        url: "https://csb.gov.tr/rss",
        enabled: false
      }
    ]
  },
  blog: {
    enabled: true,
    postsPerPage: 6,
    showAuthorInfo: true,
    showReadTime: true,
    allowComments: false,
    featuredCategory: "Maliyet Rehberi",
    categories: [
      "Maliyet Rehberi",
      "Villa & İnşaat",
      "Dekorasyon Fikirleri",
      "İç Mimarlık Trendleri",
      "Kentsel Dönüşüm"
    ]
  },
  theme: {
    activeTheme: "navy",
    brandName: "Sakarya Mimar Yapı",
    showThemeSwitcher: true,
    navbarStyle: "sticky",
    showWhatsAppFloating: true,
    showCookieBanner: true,
    primaryAccentColor: "#c9a86a"
  }
};
