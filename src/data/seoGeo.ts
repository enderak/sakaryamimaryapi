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
    siteTitle: "Sakarya Mimar Yapı | Anahtar Teslim Tadilat, İnşaat ve Mimarlık",
    siteDescription: "Sakarya Mimar Yapı; Serdivan merkezli anahtar teslim komple ev tadilatı, mutfak & banyo yenileme, Sapanca villa inşaatı ve 3D mimari projelendirme. 2 Yıl işçilik garantisi ve ücretsiz keşif.",
    keywords: [
      "sakarya mimar yapı",
      "sakarya tadilat",
      "serdivan tadilat dekorasyon",
      "sakarya ev tadilatı",
      "serdivan ev yenileme",
      "adapazarı dekorasyon",
      "sapanca villa inşaatı",
      "anahtar teslim tadilat sakarya",
      "sakarya mutfak banyo yenileme",
      "erenler tadilat firması",
      "sakarya inşaat taahhüt",
      "asım yılmazer",
      "abdussamet gültekin"
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
  schema: {
    businessType: "GeneralContractor",
    businessName: "Sakarya Mimar Yapı İnşaat & Tadilat",
    openingHours: "Mo-Sa 08:30-19:30",
    priceRange: "₺₺",
    googleMapsEmbedUrl: "https://maps.google.com/?q=Serdivan+Sakarya",
    ratingValue: "4.9",
    reviewCount: "86"
  }
};
