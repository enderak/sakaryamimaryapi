export interface Project {
  id: string;
  title: string;
  category: "Daire Tadilatı" | "Villa" | "Mutfak & Banyo" | "Ticari / Ofis";
  district: string;
  year: string;
  duration: string;
  scope: string;
  coverImage: string;
  hasBeforeAfter?: boolean;
  beforeImage?: string;
  afterImage?: string;
  description: string;
}

export const projects: Project[] = [
  {
    id: "p1",
    title: "Serdivan Modern Daire Komple Yenileme",
    category: "Daire Tadilatı",
    district: "Serdivan (Mavi Durak)",
    year: "2025",
    duration: "28 Gün",
    scope: "3+1 145m² dairenin elektrik, su, zemin, asma tavan ve mutfak yenilemesi",
    coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
    hasBeforeAfter: true,
    beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
    description: "Eski tip karanlık koridorlar açılarak ferah bir açık mutfak konseptine dönüştürüldü. Lake süpürgelikler, gizli LED tavanlar ve ada tezgah ile lüks bir yaşam alanı oluşturuldu."
  },
  {
    id: "p2",
    title: "Sapanca Göl Kenarı Lüks Villa İnşaatı",
    category: "Villa",
    district: "Sapanca (Kırkpınar)",
    year: "2025",
    duration: "5 Ay",
    scope: "320m² müstakil çelik karkas villa, sonsuzluk havuzu ve peyzaj",
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
    hasBeforeAfter: true,
    beforeImage: "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
    description: "Doğayla bütünleşik geniş cam cepheli, yerden ısıtmalı ve akıllı ev altyapısına sahip butik villa projemiz tam vaktinde teslim edildi."
  },
  {
    id: "p3",
    title: "Adapazarı Çark Caddesi Rezidans Banyo Tasarımı",
    category: "Mutfak & Banyo",
    district: "Adapazarı",
    year: "2025",
    duration: "9 Gün",
    scope: "12m² ebeveyn banyosu komple kırım, su yalıtımı ve porselen seramik döşeme",
    coverImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=80",
    hasBeforeAfter: true,
    beforeImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=80",
    description: "Eski seramikler söküldü, çift kat izolasyon yapıldı. Gömme bataryalar, siyah profilli duş kabini ve antrasit banyo dolabı monte edildi."
  },
  {
    id: "p4",
    title: "Cadde54 Prestij Ofis & Toplantı Salonu",
    category: "Ticari / Ofis",
    district: "Serdivan",
    year: "2024",
    duration: "18 Gün",
    scope: "210m² şirket genel merkezi iç mimari uygulama ve akustik tavan",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
    description: "Modern çalışma ortamı, ses yalıtımlı toplantı odaları ve dinamik LED aydınlatmalar ile verimli çalışma ortamı kurgulandı."
  },
  {
    id: "p5",
    title: "Erenler Dubleks Daire Mutfak & Merdiven Dönüşümü",
    category: "Daire Tadilatı",
    district: "Erenler",
    year: "2024",
    duration: "21 Gün",
    scope: "Ahşap merdiven yenileme, ada mutfak ve boya-badana uygulaması",
    coverImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80",
    description: "Kullanışsız merdiven altı depolama alanına dönüştürüldü, mutfak alanı genişletilerek aile için ferah bir yaşam köşesi yaratıldı."
  },
  {
    id: "p6",
    title: "Karasu Yazlık Villa Dış Cephe & Mantolama",
    category: "Villa",
    district: "Karasu",
    year: "2024",
    duration: "14 Gün",
    scope: "Deniz tuzu korozyonuna karşı dayanıklı dış cephe yalıtımı ve çatı aktarımı",
    coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
    description: "Karasu iklimine uygun silikonlu dış cephe kaplaması ve garantili su izolasyon membranları uygulandı."
  }
];
