export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "2026-sakarya-ev-tadilat-maliyetleri",
    title: "2026 Sakarya Ev Tadilat Maliyetleri ve Fiyat Hesaplama Rehberi",
    excerpt: "Sakarya'da 2+1 ve 3+1 dairelerin A'dan Z'ye komple tadilatında malzeme ve işçilik giderleri nelerdir? Bütçenizi nasıl doğru planlarsınız?",
    date: "15 Ocak 2026",
    readTime: "5 dk okuma",
    category: "Maliyet Rehberi",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Ev tadilatı kararı alırken en kritik konu bütçe öngörülebilirliğidir. Sakarya piyasasında malzeme ve işçilik kalemleri projenin kapsamına göre değişkenlik gösterir.",
      "1. Kaba Yıkım ve Moloz Giderleri: Eski fayansların, kapıların ve duvarların kırılması, çuvallanması ve belediye döküm sahasına nakliyesi.",
      "2. Tesisat Yenileme (Elektrik & Su): 20 yıldan eski binalarda boruların plastik PPRC borularla ve elektrik hatlarının yangına dayanıklı kablolarla değişimi şarttır.",
      "3. Islak Hacimler (Banyo & Mutfak): Toplam bütçenin yaklaşık %40-45'ini oluşturur. Seramik kalitesi, lake dolaplar ve granit/porselen tezgahlar maliyeti belirler.",
      "4. Anahtar Teslim Avantajı: Tek tek usta aramak yerine anahtar teslim mimari firma ile çalışmak sözleşme garantisi sağlar ve beklenmedik ek maliyetlerin önüne geçer."
    ]
  },
  {
    id: "b2",
    slug: "sapanca-villa-insaatinda-dikkat-edilmesi-gerekenler",
    title: "Sapanca'da Müstakil Villa ve Çelik Ev Yaptırırken Nelere Dikkat Edilmeli?",
    excerpt: "Sapanca bölgesinin zemin yapısı, nem dengesi, imar izinleri ve depreme dayanıklı modern mimari çözümler.",
    date: "28 Şubat 2026",
    readTime: "6 dk okuma",
    category: "Villa & İnşaat",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Sapanca doğal güzellikleri ve İstanbul'a yakınlığı ile villa yatırımlarının gözdesi konumunda. Ancak doğru inşaat tekniği seçilmediğinde rutubet ve ısı kaybı sorunları yaşanabilir.",
      "Zemin Etüdü ve Drenaj: Yağış alan bir coğrafya olduğu için temel altı membran bohçalama ve çevre drenajı taviz verilmemesi gereken ilk adımdır.",
      "Hafif Çelik vs Betonarme: Hızlı inşaat süresi ve yüksek deprem güvenliği nedeniyle Sapanca'da hafif çelik karkas yapılar popülerliğini artırmaktadır.",
      "Isı İzolasyonu ve Şömine/Yerden Isıtma: Kış aylarında konfor için çift camlı alüminyum doğramalar ve taşyünü yalıtım tercih edilmelidir."
    ]
  },
  {
    id: "b3",
    slug: "kucuk-banyolar-icin-genisletme-tuyolari",
    title: "Küçük Banyoları 2 Kat Ferah Göstermenin 7 İç Mimari Yolu",
    excerpt: "Dar banyolarda doğru seramik ebatları, niş aydınlatmaları ve gömme sistemlerle maksimum kullanım alanı yaratın.",
    date: "10 Mart 2026",
    readTime: "4 dk okuma",
    category: "Dekorasyon Fikirleri",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Banyonuz metrekare olarak küçük olsa bile doğru mimari hilelerle son derece lüks ve ferah bir spa atmosferine kavuşabilir.",
      "1. Büyük Ebatlı (60x120cm) Porselen Seramikler: Derz çizgisini azaltarak alanı kesintisiz ve geniş algılatır.",
      "2. Duvara Gömme Rezervuar & Asma Klozet: Zemin alanını boş bırakarak temizliği kolaylaştırır ve gözü yormaz.",
      "3. Şeffaf Cam Duşakabin: Opak veya desenli camlar yerine tamamen şeffaf temperli cam tercih edin.",
      "4. Aynalı Dolaplar & Gizli LED Aydınlatma: Yansıma ve endirekt ışık mekana derinlik hissi kazandırır."
    ]
  }
];
