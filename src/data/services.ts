export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  iconName: string;
  image: string;
  features: string[];
  popularIn: string[];
}

export const services: Service[] = [
  {
    id: "1",
    slug: "komple-anahtar-teslim-tadilat",
    title: "Komple Anahtar Teslim Tadilat",
    shortDesc: "Evinizi veya iş yerinizi A'dan Z'ye, sözleşmeli ve garantili olarak baştan yaratıyoruz.",
    description: "Sakarya genelinde daire, müstakil ev ve villalarınız için sıhhi tesisat, elektrik, zemin, tavan, boya ve mobilya dahil tüm tadilat süreçlerini tek elden yönetiyoruz. 3D tasarım ve projelendirme ile başlamadan sonucu görmenizi sağlıyoruz.",
    iconName: "Hammer",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Ücretsiz Keşif ve 3D Proje Çizimi",
      "Kırma, Dökme ve Moloz Nakliyesi",
      "Su & Elektrik Tesisatı Yenileme",
      "Alçı, Boya ve Asma Tavan Uygulamaları",
      "Özel İmalat Lake/Membran Kapı ve Dolaplar",
      "Zamanında Teslim ve Resmi Sözleşme Garantisi"
    ],
    popularIn: ["Serdivan", "Adapazarı", "Erenler", "Arifiye"]
  },
  {
    id: "2",
    slug: "banyo-mutfak-yenileme",
    title: "Mutfak & Banyo Yenileme",
    shortDesc: "Modern, ergonomik ve su izolasyonlu mutfak ve banyo alanları tasarlıyoruz.",
    description: "Akrilik tezgahlar, lake mutfak dolapları, ada mutfak sistemleri, gömme rezervuarlar, duşakabin ve ıslak zemin izolasyonları ile evinizin en önemli alanlarını yeniliyoruz.",
    iconName: "Bath",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Su İzolasyonu (Sürme ve membran yalıtım)",
      "Granit, Porselen ve Akrilik Tezgahlar",
      "Gömme Batarya ve Modern Vitrifiye Montajı",
      "Nem ve Suya Dayanıklı Dolap Çözümleri",
      "Gizli LED Aydınlatmalı Niş Tasarımları"
    ],
    popularIn: ["Serdivan", "Sapanca", "Adapazarı"]
  },
  {
    id: "3",
    slug: "villa-insaat-celik-yapi",
    title: "Villa İnşaatı & Çelik Yapı",
    shortDesc: "Sapanca, Karasu ve Sakarya çevresinde modern betonarme ve hafif çelik villalar.",
    description: "Arsanıza özel mimari projelendirme, statik hesaplamalar, ruhsatlandırma, kaba ve ince inşaat süreçlerini anahtar teslim olarak profesyonel mühendislik ekibimizle hayata geçiriyoruz.",
    iconName: "Home",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Deprem Yönetmeliğine %100 Uygun Statik Proje",
      "A Sınıfı Isı ve Ses Yalıtımı",
      "Havuz & Peyzaj Düzenlemesi",
      "Hafif Çelik veya Betonarme Karkas Seçenekleri",
      "Akıllı Ev Otomasyon Sistemleri"
    ],
    popularIn: ["Sapanca", "Kırkpınar", "Karasu", "Hendek"]
  },
  {
    id: "4",
    slug: "ic-mimarlik-3d-tasarim",
    title: "İç Mimarlık & 3D Tasarım",
    shortDesc: "Tadilat başlamadan önce mekanınızı fotogerçekçi 3D render görüntülerle tasarlıyoruz.",
    description: "Renk paletinden malzeme seçimine, aydınlatma planından mobilya ergonomisine kadar mekanınızı kişiselleştiriyoruz. Süpriz maliyetleri sıfıra indiriyoruz.",
    iconName: "PenTool",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Fotogerçekçi 3D Görselleştirme",
      "Tesisat ve Aydınlatma Planı Çizimleri",
      "Malzeme ve Renk Kombinasyon Danışmanlığı",
      "Mekan Optimizasyonu ve Fonksiyonel Tasarım"
    ],
    popularIn: ["Serdivan", "Adapazarı", "Sapanca"]
  },
  {
    id: "5",
    slug: "cati-yalitim-dis-cephe-mantolama",
    title: "Dış Cephe Mantolama & Çatı",
    shortDesc: "Enerji tasarrufu sağlayan A kalite dış cephe yalıtımı ve garantili çatı tadilatı.",
    description: "Sakarya'nın kış ve yağış koşullarına karşı garantili çatı aktarma, sandviç panel, membran kaplama ve taşyünü/karbonlu EPS dış cephe mantolama hizmetleri veriyoruz.",
    iconName: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    features: [
      "%50'ye Varan Yakıt ve Enerji Tasarrufu",
      "Garantili Su İzolasyonu ve Çatı Onarımı",
      "Dekoratif Dış Cephe Boya ve Söve Uygulamaları",
      "10 Yıl Firma İşçilik ve Malzeme Güvencesi"
    ],
    popularIn: ["Erenler", "Adapazarı", "Akyazı", "Hendek"]
  },
  {
    id: "6",
    slug: "ofis-magaza-ticari-tadilat",
    title: "Ofis & Mağaza Dekorasyonu",
    shortDesc: "İşletmenizin marka değerini artıran kurumsal iç mekan ve vitrin tasarımları.",
    description: "Restoran, kafe, klinik, ofis ve showroom mekanlarınız için hızlı, kesintisiz ve şık ticari tadilat çözümleri sunuyoruz.",
    iconName: "Building2",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Hızlı Termin (İşletme kaybını minimize etme)",
      "Kurumsal Kimliğe Uygun Konsept Tasarım",
      "Cam Bölme, Akustik Tavan ve Aydınlatma Sistemleri",
      "Yangın ve Güvenlik Standartlarına Uygunluk"
    ],
    popularIn: ["Adapazarı Çark Caddesi", "Serdivan Cadde54", "Erenler"]
  }
];
