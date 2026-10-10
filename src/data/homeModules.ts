export interface SectionConfig {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  order: number;
}

export interface HeroConfig {
  badgeLocation: string;
  badgeHighlight: string;
  badgeNote: string;
  titleLine1: string;
  titleHighlight: string;
  titleLine2: string;
  description: string;
  trustPoints: Array<{
    text: string;
    icon: "check" | "shield" | "star";
  }>;
  consultationBox: {
    title: string;
    description: string;
    phoneLabel: string;
    subNote: string;
  };
}

export interface SliderConfig {
  sectionTitle: string;
  sectionSubtitle: string;
  badgeText: string;
  autoPlayIntervalMs: number;
}

export interface ServicesSectionConfig {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export interface ProjectsSectionConfig {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  showBeforeAfter: boolean;
}

export interface CalculatorSectionConfig {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
}

export interface DistrictSectionConfig {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
}

export interface TestimonialsSectionConfig {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
}

export interface RssNewsSectionConfig {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  itemsToShow: number;
}

export interface BlogPreviewSectionConfig {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  ctaText: string;
}

export interface HomePageModulesConfig {
  sections: {
    constructionSlider: SectionConfig;
    hero: SectionConfig;
    services: SectionConfig;
    projects: SectionConfig;
    calculator: SectionConfig;
    districts: SectionConfig;
    testimonials: SectionConfig;
    news: SectionConfig;
    blog: SectionConfig;
  };
  content: {
    hero: HeroConfig;
    constructionSlider: SliderConfig;
    services: ServicesSectionConfig;
    projects: ProjectsSectionConfig;
    calculator: CalculatorSectionConfig;
    districts: DistrictSectionConfig;
    testimonials: TestimonialsSectionConfig;
    news: RssNewsSectionConfig;
    blog: BlogPreviewSectionConfig;
  };
}

export const defaultHomeModulesConfig: HomePageModulesConfig = {
  sections: {
    constructionSlider: {
      id: "constructionSlider",
      name: "İnşaat Projeleri Slider'ı",
      description: "Menünün hemen altında dönen büyük vitrin ve inşaat projeleri slaytı",
      enabled: true,
      order: 1
    },
    hero: {
      id: "hero",
      name: "Hero (Ana Karşılama Alanı)",
      description: "Ana başlık, mimari güvence rozetleri ve hızlı keşif formu/kartı",
      enabled: true,
      order: 2
    },
    services: {
      id: "services",
      name: "Uzmanlık Alanlarımız & Hizmetler",
      description: "Komple tadilat, mutfak/banyo, villa inşaatı, 3D mimarlık kartları",
      enabled: true,
      order: 3
    },
    projects: {
      id: "projects",
      name: "Projeler & Öncesi/Sonrası Galerisi",
      description: "Tamamlanan projeler ve interaktif Before/After karşılaştırma kaydırıcısı",
      enabled: true,
      order: 4
    },
    calculator: {
      id: "calculator",
      name: "Fiyat & Maliyet Hesaplayıcı",
      description: "Kullanıcıların m² ve tadilat tipi seçip anında bütçe çıkardığı interaktif modül",
      enabled: true,
      order: 5
    },
    districts: {
      id: "districts",
      name: "Sakarya İlçe Hizmet Ağı",
      description: "Serdivan, Adapazarı, Sapanca vb. ilçelere özel hizmet kartları",
      enabled: true,
      order: 6
    },
    testimonials: {
      id: "testimonials",
      name: "Müşteri Yorumları & Referanslar",
      description: "Teslim edilen projelerin müşteri puanları ve memnuniyet yorumları",
      enabled: true,
      order: 7
    },
    news: {
      id: "news",
      name: "Güncel Sakarya & Sektör Haberleri (RSS)",
      description: "Canlı RSS haber akışı ve mimarlık dünyasından son gelişmeler",
      enabled: true,
      order: 8
    },
    blog: {
      id: "blog",
      name: "Blog & Tadilat Rehberi",
      description: "Ev tadilatı maliyetleri ve rehber makalelerinin özet kartları",
      enabled: true,
      order: 9
    }
  },
  content: {
    hero: {
      badgeLocation: "Serdivan, Arabacıalanı • Çark Cad. No:148",
      badgeHighlight: "",
      badgeNote: "Tüm Sakarya Geneli Ücretsiz Keşif",
      titleLine1: "Sakarya'da Yaşam Alanınızı",
      titleHighlight: "Sözleşmeli & Mimari Güvenceyle",
      titleLine2: "Yeniden İnşa Ediyoruz.",
      description: "Sakarya Mimar Yapı; komple ev ve daire tadilatı, modern mutfak & banyo yenileme, Sapanca villa inşaatı ve 3D iç mimarlık projelendirmesi sunar. Gününde teslim ve 2 yıl resmi işçilik garantisi.",
      trustPoints: [
        { text: "Ücretsiz 3D Keşif", icon: "check" },
        { text: "2 Yıl Firma Garantisi", icon: "shield" },
        { text: "350+ Teslim Edilen Proje", icon: "star" }
      ],
      consultationBox: {
        title: "Ücretsiz Keşif & Proje Danışmanlığı",
        description: "Sakarya içi 24 saatte yerinde keşif, 3D çizim ve şeffaf malzeme maliyet listesi hazırlıyoruz.",
        phoneLabel: "Hemen Ara & Randevu Al",
        subNote: "Gününde teslim garantisi • Resmi sözleşmeli ve garantili iş teslimi"
      }
    },
    constructionSlider: {
      sectionTitle: "Devam Eden & Tamamlanan",
      sectionSubtitle: "İnşaat ve Taahhüt Projelerimiz",
      badgeText: "Canlı Şantiye & Proje Vitrini",
      autoPlayIntervalMs: 6500
    },
    services: {
      badge: "Uzmanlık Alanlarımız",
      title: "Sakarya Tadilat &",
      titleHighlight: "Mimarlık Hizmetleri",
      description: "Kaba inşaattan en ince detayına kadar profesyonel mimar ve usta kadromuzla yanınızdayız.",
      ctaText: "Tüm Hizmetleri Gör",
      ctaLink: "/hizmetler"
    },
    projects: {
      badge: "Referans Portföyümüz",
      title: "Sakarya'da Tamamlanan",
      titleHighlight: "Projelerimiz",
      description: "Serdivan, Sapanca, Adapazarı ve Erenler lokasyonlarında anahtar teslim tamamladığımız gerçek işlerimizden seçkiler.",
      showBeforeAfter: true
    },
    calculator: {
      badge: "Şeffaf & Anında Hesaplama",
      title: "Sakarya Mimar Yapı",
      titleHighlight: "Fiyat Hesaplayıcı",
      description: "Evinizin ya da iş yerinizin özelliklerini seçin; 2026 piyasa koşullarına uygun yaklaşık maliyet aralığını anında görün. Serdivan merkez ofisimizden tüm Sakarya'ya ücretsiz keşif hizmeti."
    },
    districts: {
      badge: "Sakarya Geneli Hizmet Ağı",
      title: "İlçenize Özel",
      titleHighlight: "Tadilat & İnşaat",
      description: "Sakarya'nın her ilçesinin mimari karakterine ve iklim koşullarına uygun uzman usta ve teknik kadromuzla adrese teslim hizmet veriyoruz."
    },
    testimonials: {
      badge: "Müşteri Memnuniyeti",
      title: "Sakaryalı Hemşehrilerimiz",
      titleHighlight: "Ne Diyor?",
      description: "Serdivan, Sapanca ve Adapazarı'nda evini veya ofisini teslim ettiğimiz müşterilerimizin gerçek deneyimleri."
    },
    news: {
      badge: "Canlı Haber Akışı",
      title: "Sakarya & İnşaat",
      titleHighlight: "Gündemi",
      description: "Sakarya yapı sektörü, konut projeleri ve kentsel dönüşüm ile ilgili en güncel haberler.",
      itemsToShow: 4
    },
    blog: {
      badge: "Sakarya Tadilat Rehberi",
      title: "Faydalı Bilgiler &",
      titleHighlight: "Tadilat Tüyoları",
      description: "Bütçenizi korumanızı, doğru malzeme seçmenizi ve evinizi en verimli şekilde yenilemenizi sağlayacak mimari ipuçları.",
      ctaText: "Tüm Rehberi Oku"
    }
  }
};
