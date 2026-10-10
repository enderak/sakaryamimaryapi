export interface Testimonial {
  id: string;
  name: string;
  location: string;
  service: string;
  comment: string;
  rating: number;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Murat Özkan",
    location: "Serdivan, Yazlık",
    service: "Komple Daire Tadilatı",
    comment: "Eski 3+1 dairemizi anahtar teslim verdik. 3D tasarımda ne gösterdilerse birebir aynısı yapıldı. Süre olarak 30 gün dediler, 27. günde teslim ettiler. Sakarya'da işini böyle dürüst ve temiz yapan usta ve mimar ekibi bulmak gerçekten büyük şans.",
    rating: 5,
    date: "Eylül 2025"
  },
  {
    id: "2",
    name: "Selin & Emre Demir",
    location: "Sapanca, Kırkpınar",
    service: "Villa İnşaatı & Peyzaj",
    comment: "Sapanca'daki arazimize çelik karkas villa yaptırdık. Ruhsattan havuz teslimine kadar her aşamayı şeffaf biçimde raporladılar. Beklentimizin de üzerinde bir konfor elde ettik, tüm ekibe teşekkür ederiz.",
    rating: 5,
    date: "Ağustos 2025"
  },
  {
    id: "3",
    name: "Hakan Yılmaz",
    location: "Adapazarı, Çark Cad.",
    service: "Mutfak & Banyo Yenileme",
    comment: "Banyomuzda sürekli su sızdırma sorunu vardı. Çift kat izolasyon ve yeni nesil gömme rezervuarlarla adeta 5 yıldızlı otel banyosu gibi oldu. Malzeme kalitesi ve temiz çalışma tarzları 10 numara.",
    rating: 5,
    date: "Ekim 2025"
  },
  {
    id: "4",
    name: "Av. Gamze Çelik",
    location: "Serdivan, Cadde54",
    service: "Hukuk Ofisi Dekorasyonu",
    comment: "Müvekkillerimizi ağırladığımız ofisimizin iç mimarisini yaptılar. Akustik yalıtım, gizli LED detayları ve özel lake mobilyalar ofise muazzam bir prestij kattı.",
    rating: 5,
    date: "Kasım 2025"
  }
];
