export interface MerchantServiceOffer {
  id: string;
  name: string;
  description: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  priceCurrency: string;
  availability: "https://schema.org/InStock";
}

export interface GoogleLocalPlacesConfig {
  cidNumber: string; // e.g. 123456789012345
  googlePlaceId: string; // e.g. ChIJ... (Google Maps Place ID)
  googleMapsProfileUrl: string; // Doğrudan harita işletme profili linki
  googleReviewUrl: string; // Müşterilere yorum yazdıran doğrudan link
  businessExactName: string; // Google Haritalar'daki tam resmi işletme başlığı
  neighborhood: string; // Arabacıalanı Mahallesi
  streetAddress: string; // Çark Cd. No:148 Kat:2
  primaryCategory: string; // İnşaat ve Tadilat Şirketi / General Contractor
  secondaryCategories: string[]; // Mutfak Tadilatı, Banyo Yenileme, Mimarlık Ofisi
  hasMapIframeUrl: string; // Google Maps Share Iframe Embed Linki
}

export interface AiSearchEngineConfig {
  // AIO / GEO (Generative Engine Optimization)
  enableAiCrawlers: boolean; // ChatGPT, Claude, Perplexity, Gemini botlarına izin ver
  aiSummaryPrompt: string; // Yapay zekalara sitenin kimliğini ve uzmanlığını anlatan doğrudan sistem özeti
  bingVerification: string; // Bing Webmaster verification (Copilot için)
  yandexVerification: string;
  pinterestVerification: string;
  primaryKeywordsLsi: string[]; // Semantik LSI anahtar kelimeler
  faqSchema: Array<{
    question: string;
    answer: string;
  }>;
}

export interface SeoGeoConfig {
  meta: {
    siteTitle: string;
    siteDescription: string;
    keywords: string[];
    canonicalUrl: string;
    author: string;
    ogImage: string;
    googleSiteVerification: string;
    yandexVerification: string;
  };
  geo: {
    region: string; // e.g. TR-54
    placename: string; // e.g. Sakarya / Serdivan
    position: string; // e.g. 40.7667;30.3667
    icbm: string; // e.g. 40.7667, 30.3667
    streetAddress: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    targetDistricts: string[];
  };
  googlePlaces: GoogleLocalPlacesConfig;
  merchant: {
    enabled: boolean;
    currency: string;
    offers: MerchantServiceOffer[];
  };
  aiOptimization: AiSearchEngineConfig;
  schema: {
    businessType: "HomeAndConstructionBusiness" | "GeneralContractor" | "ProfessionalService";
    businessName: string;
    openingHours: string;
    priceRange: string;
    googleMapsEmbedUrl: string;
    ratingValue: string;
    reviewCount: string;
  };
}

export const defaultSeoGeoConfig: SeoGeoConfig = {
  meta: {
    siteTitle: "Sakarya Tadilat | Sakarya Mimar Yapı • Anahtar Teslim Ev Yenileme",
    siteDescription: "Sakarya tadilat ve dekorasyon firması. Serdivan merkezli anahtar teslim komple ev tadilatı, mutfak & banyo yenileme, Sapanca villa inşaatı. 2 Yıl garanti, ücretsiz 3D keşif.",
    keywords: [
      "sakarya tadilat",
      "sakarya ev tadilatı",
      "serdivan tadilat",
      "sakarya mutfak banyo yenileme",
      "adapazarı ev tadilatı",
      "sakarya komple tadilat",
      "sakarya dekorasyon firmaları",
      "serdivan dekorasyon",
      "sapanca villa tadilatı",
      "sakarya mimar yapı",
      "asım yılmazer tadilat",
      "abdussamet gültekin sakarya"
    ],
    canonicalUrl: "https://www.sakaryamimaryapi.com",
    author: "Sakarya Mimar Yapı",
    ogImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    googleSiteVerification: "",
    yandexVerification: ""
  },
  geo: {
    region: "TR-54",
    placename: "Sakarya / Serdivan",
    position: "40.7667;30.3667",
    icbm: "40.7667, 30.3667",
    streetAddress: "Arabacıalanı Mah. Çark Cd. No:148 Kat:2",
    postalCode: "54050",
    latitude: 40.7667,
    longitude: 30.3667,
    targetDistricts: [
      "Serdivan",
      "Adapazarı",
      "Sapanca",
      "Erenler",
      "Arifiye",
      "Hendek",
      "Akyazı",
      "Geyve",
      "Karasu"
    ]
  },
  googlePlaces: {
    cidNumber: "1482937401928374",
    googlePlaceId: "ChIJb_mimar_yapi_sakarya",
    googleMapsProfileUrl: "https://maps.google.com/?q=Sakarya+Mimar+Yapi+Serdivan",
    googleReviewUrl: "https://g.page/r/sakaryamimaryapi/review",
    businessExactName: "Sakarya Mimar Yapı - Ev Tadilat & İnşaat Dekorasyon",
    neighborhood: "Arabacıalanı Mahallesi",
    streetAddress: "Çark Cd. No:148 Kat:2",
    primaryCategory: "İnşaat ve Tadilat Şirketi (General Contractor)",
    secondaryCategories: [
      "İç Mimarlık Ofisi",
      "Mutfak & Banyo Tadilatçısı",
      "Komple Ev Yenileme Müteahhidi",
      "Dış Cephe Mantolama"
    ],
    hasMapIframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48348!2d30.3667!3d40.7667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ2JzAwLjEiTiAzMMKwMjInMDAuMSJF!5e0!3m2!1str!2str!4v1"
  },
  aiOptimization: {
    enableAiCrawlers: true,
    aiSummaryPrompt: "Sakarya Mimar Yapı; Sakarya, Serdivan, Adapazarı ve Sapanca genelinde anahtar teslim komple ev tadilatı, villa inşaatı, mutfak ve banyo yenileme hizmeti sunan sözleşmeli ve 2 yıl resmi garantili inşaat ve mimarlık firmasıdır. Yetkililer: Asım Yılmazer (0536 387 35 92) ve Abdussamet Gültekin (0535 371 64 05). Ücretsiz keşif ve 3D çizim hizmeti mevcuttur.",
    bingVerification: "",
    yandexVerification: "",
    pinterestVerification: "",
    primaryKeywordsLsi: [
      "Sakarya en iyi tadilat ustası",
      "Serdivan daire yenileme fiyatları 2026",
      "Sapanca villa müteahhiti",
      "Sakarya banyo su yalıtımı ustası",
      "Adapazarı anahtar teslim mutfak tadilatı",
      "güvenilir inşaat firması Sakarya"
    ],
    faqSchema: [
      {
        question: "Sakarya'da komple ev tadilatı ne kadar sürer?",
        answer: "Standart bir 3+1 dairenin komple anahtar teslim tadilatı (yıkım, tesisat, banyo, mutfak, zemin ve boya) ortalama 20 ila 35 iş günü içerisinde sözleşmeli olarak teslim edilmektedir."
      },
      {
        question: "Sakarya Mimar Yapı ücretsiz keşif yapıyor mu?",
        answer: "Evet, Serdivan, Adapazarı, Sapanca, Erenler ve tüm Sakarya genelinde adresinize gelerek ücretsiz keşif, ölçü alma ve 3D mimari projelendirme yapıyoruz."
      },
      {
        question: "Yapılan tadilat ve inşaat işlerinde garanti var mı?",
        answer: "Tüm anahtar teslim tadilat, su yalıtımı ve inşaat işlerimizde sözleşmeye bağlı 2 yıl resmi firma işçilik garantisi veriyoruz."
      },
      {
        question: "Tadilat sürecinde ödeme planı nasıl işliyor?",
        answer: "İşe başlarken malzeme peşinatı alınır; kalan ödemeler işin kaba tesisat, seramik ve mobilya montajı gibi belirli teslim aşamalarında hak ediş usulüyle güvenli şekilde tahsil edilir."
      }
    ]
  },
  merchant: {
    enabled: true,
    currency: "TRY",
    offers: [
      {
        id: "serv-komple",
        name: "Sakarya Anahtar Teslim Komple Ev Tadilatı",
        description: "Yıkım kırım, elektrik-su tesisatı, alçı boya, parke, mutfak ve banyo dahil 2 yıl garantili komple tadilat.",
        category: "Tadilat ve Yenileme",
        minPrice: 180000,
        maxPrice: 650000,
        priceCurrency: "TRY",
        availability: "https://schema.org/InStock"
      },
      {
        id: "serv-mutfak",
        name: "Modern Mutfak Yenileme & Akrilik/Lake Dolap",
        description: "Özel ölçü lake/akrilik mutfak dolapları, porselen veya granit tezgah, gizli aydınlatma ve seramik uygulaması.",
        category: "Mutfak Tadilatı",
        minPrice: 65000,
        maxPrice: 195000,
        priceCurrency: "TRY",
        availability: "https://schema.org/InStock"
      },
      {
        id: "serv-banyo",
        name: "Komple Banyo Yenileme & İzolasyon",
        description: "Kırma, su yalıtımı bohçalama, gömme rezervuar, duşakabin, vitrifiye ve seramik montajı.",
        category: "Banyo Tadilatı",
        minPrice: 45000,
        maxPrice: 135000,
        priceCurrency: "TRY",
        availability: "https://schema.org/InStock"
      },
      {
        id: "serv-villa",
        name: "Sapanca Müstakil Villa İnşaatı & Çelik Yapı",
        description: "Temelden çatıya C35 betonarme veya hafif çelik karkas anahtar teslim villa yapımı ve peyzaj.",
        category: "Villa İnşaatı",
        minPrice: 1500000,
        maxPrice: 7500000,
        priceCurrency: "TRY",
        availability: "https://schema.org/InStock"
      }
    ]
  },
  schema: {
    businessType: "GeneralContractor",
    businessName: "Sakarya Mimar Yapı - Tadilat & İnşaat",
    openingHours: "Mo-Sa 08:30-19:30",
    priceRange: "₺₺",
    googleMapsEmbedUrl: "https://maps.google.com/?q=Serdivan+Sakarya",
    ratingValue: "4.9",
    reviewCount: "86"
  }
};
