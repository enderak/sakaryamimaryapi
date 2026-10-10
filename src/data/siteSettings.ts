export interface RssFeedSource {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
  category?: "sakarya" | "insaat" | "tadilat" | "dekorasyon" | "genel";
}

export interface SecurityDefenseConfig {
  // 1. Kimlik ve Oturum
  allowedEmails: string[];
  requireOtp: boolean;
  sessionDurationDays: number;
  masterPasswordHint: string;
  maxLoginAttempts: number;

  // 2. Savunma & WAF Kuralları
  rateLimitingEnabled: boolean;
  maxContactRequestsPer10Min: number;
  blockMaliciousUserAgents: boolean;
  blockSqlInjectionPatterns: boolean;
  xssProtectionStrict: boolean;
  
  // 3. Güvenlik Başlıkları & İpuçları
  clickjackingProtection: boolean;
  hstsEnabled: boolean;
  nosniffEnabled: boolean;
  
  // 4. IP Engel & İzin Listesi
  blockedIps: string[];
  ipWhitelistForAdmin: string[];
}

export interface RssSettingsConfig {
  enabled: boolean;
  itemsToShow: number;
  refreshIntervalMinutes: number;
  showFallbackOnFail: boolean;
  filterKeywordsOnly: boolean; // Yalnızca Sakarya, inşaat, tadilat, dekorasyon, mimari ile eşleşenleri göster
  keywords: string[]; // Filtreleme anahtar kelimeleri
  feeds: RssFeedSource[];
}

export interface SiteSettingsConfig {
  security: SecurityDefenseConfig;
  rss: RssSettingsConfig;
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

export const DEFAULT_SAKARYA_RSS_FEEDS: RssFeedSource[] = [
  {
    id: "feed-sakarya-insaat-google",
    name: "Sakarya İnşaat, Tadilat & Kentsel Dönüşüm (Google Haberler)",
    url: "https://news.google.com/rss/search?q=sakarya+in%C5%9Faat+OR+tadilat+OR+kentsel+d%C3%B6n%C3%BC%C5%9F%C3%BCm+OR+mimari+OR+dekorasyon&hl=tr&gl=TR&ceid=TR:tr",
    enabled: true,
    category: "sakarya"
  },
  {
    id: "feed-trt-ekonomi",
    name: "TRT Haber - Ekonomi & Gayrimenkul",
    url: "https://www.trthaber.com/ekonomi_articles.rss",
    enabled: true,
    category: "insaat"
  },
  {
    id: "feed-aa-guncel",
    name: "Anadolu Ajansı - Güncel & Şehircilik",
    url: "https://www.aa.com.tr/tr/rss/default?cat=guncel",
    enabled: true,
    category: "genel"
  }
];

export const DEFAULT_RSS_KEYWORDS: string[] = [
  "sakarya",
  "adapazarı",
  "serdivan",
  "sapanca",
  "inşaat",
  "tadilat",
  "dekorasyon",
  "kentsel dönüşüm",
  "mimari",
  "konut",
  "villa",
  "çelik ev",
  "yalıtım",
  "mantolama",
  "bina",
  "çevre ve şehircilik"
];

export const defaultSiteSettingsConfig: SiteSettingsConfig = {
  security: {
    allowedEmails: [
      "sakaryamimaryapi@gmail.com",
      "enderakar@outlook.com",
      "enderakar@gmail.com"
    ],
    requireOtp: true,
    sessionDurationDays: 7,
    masterPasswordHint: "Sakarya 2026 Admin Şifresi / OTP ile doğrulama",
    maxLoginAttempts: 5,
    rateLimitingEnabled: true,
    maxContactRequestsPer10Min: 5,
    blockMaliciousUserAgents: true,
    blockSqlInjectionPatterns: true,
    xssProtectionStrict: true,
    clickjackingProtection: true,
    hstsEnabled: true,
    nosniffEnabled: true,
    blockedIps: [],
    ipWhitelistForAdmin: []
  },
  rss: {
    enabled: true,
    itemsToShow: 6,
    refreshIntervalMinutes: 30,
    showFallbackOnFail: true,
    filterKeywordsOnly: true,
    keywords: DEFAULT_RSS_KEYWORDS,
    feeds: DEFAULT_SAKARYA_RSS_FEEDS
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
