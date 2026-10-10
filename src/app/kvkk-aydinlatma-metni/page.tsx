import { Metadata } from "next";
import Link from "next/link";
import { companyInfo } from "@/data/company";
import { ShieldCheck, ArrowLeft, Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: `KVKK Aydınlatma Metni | ${companyInfo.name}`,
  description: `${companyInfo.name} 6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca aydınlatma ve bilgilendirme metni.`
};

export default function KvkkPage() {
  return (
    <div className="py-20 bg-[#121316] text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-[#ded0c3] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ana Sayfaya Dön</span>
        </Link>

        {/* Header */}
        <div className="border-b border-[#2b2d35] pb-8 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c5ad97]/15 border border-[#c5ad97]/30 text-[#ded0c3] text-xs font-semibold mb-3">
            <ShieldCheck className="w-4 h-4 text-[#c5ad97]" />
            <span>6698 Sayılı Kanun Kapsamında</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Kişisel Verilerin Korunması (KVKK) <br className="hidden sm:inline" />
            <span className="text-[#c5ad97]">Aydınlatma Metni</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Son Güncelleme: 10 Mart 2026 • Veri Sorumlusu: {companyInfo.name}
          </p>
        </div>

        {/* Legal Text Content */}
        <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-[#c5ad97]">1.</span> Veri Sorumlusunun Kimliği
            </h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla{" "}
              <strong className="text-white">{companyInfo.name}</strong> (&ldquo;Firma&rdquo;) tarafından aşağıda açıklanan kapsamda işlenebilecektir.
            </p>
            <div className="p-4 rounded-2xl bg-[#18191d] border border-[#2b2d35] text-xs space-y-1">
              <div><strong className="text-slate-200">Ticari Ünvan / Marka:</strong> {companyInfo.name}</div>
              <div><strong className="text-slate-200">Adres:</strong> {companyInfo.address}</div>
              <div><strong className="text-slate-200">E-Posta:</strong> {companyInfo.email}</div>
              <div><strong className="text-slate-200">Web Sitesi:</strong> {companyInfo.displayWebsite}</div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-[#c5ad97]">2.</span> İşlenen Kişisel Verileriniz
            </h2>
            <p>
              Web sitemizi ziyaret etmeniz, fiyat hesaplayıcı veya keşif talep formlarımızı kullanmanız ve iletişim kanallarımız üzerinden bizimle irtibata geçmeniz halinde aşağıdaki verileriniz işlenebilmektedir:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300 text-xs sm:text-sm">
              <li><strong className="text-white">Kimlik Bilgileri:</strong> Ad, soyad</li>
              <li><strong className="text-white">İletişim Bilgileri:</strong> Telefon numarası, e-posta adresi, ilçe ve açık adres bilgisi</li>
              <li><strong className="text-white">Mekan ve Proje Bilgileri:</strong> Tadilat yapılacak alanın metrekaresi, kat bilgisi, hizmet türü ve müşteri talepleri</li>
              <li><strong className="text-white">İşlem Güvenliği ve Çerez Verileri:</strong> IP adresi, internet sitesi giriş-çıkış kayıtları ve çerez tercihleri</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-[#c5ad97]">3.</span> Kişisel Verilerin İşlenme Amaçları
            </h2>
            <p>Toplanan kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300 text-xs sm:text-sm">
              <li>Tadilat, dekorasyon ve inşaat hizmetlerine yönelik ücretsiz keşif randevusu oluşturulması</li>
              <li>Talep ettiğiniz hizmetlere dair yaklaşık ve kesin fiyat tekliflerinin hazırlanması</li>
              <li>Anahtar teslim tadilat sözleşmelerinin akdedilmesi ve işçilik garantisi takibi</li>
              <li>İletişim taleplerinizin yanıtlanması ve randevu teyitlerinin sağlanması</li>
              <li>Yasal yükümlülüklerimizin (vergi, tüketici hakları vb.) yerine getirilmesi</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-[#c5ad97]">4.</span> Kişisel Verilerin Aktarılması
            </h2>
            <p>
              Kişisel verileriniz, kanunun 8. ve 9. maddelerinde belirtilen şartlara uygun olarak yalnızca yasal zorunluluk halinde yetkili kamu kurum ve kuruluşlarına (adli makamlar, vergi daireleri vb.) aktarılabilir. Kişisel verileriniz kesinlikle izniniz olmadan ticari veya reklam amaçlı üçüncü şahıslara satılmaz veya devredilmez.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-[#c5ad97]">5.</span> Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi
            </h2>
            <p>
              Kişisel verileriniz; web sitemizdeki teklif ve keşif formları, WhatsApp mesajlaşma hatları, telefon görüşmeleri ve yüz yüze keşif ziyaretleri aracılığıyla elektronik ve fiziki ortamlarda toplanmaktadır. Bu süreç KVKK Madde 5/2 kapsamında &ldquo;bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması&rdquo; ve &ldquo;veri sorumlusunun meşru menfaatleri&rdquo; hukuki sebeplerine dayanmaktadır.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-[#c5ad97]">6.</span> KVKK Madde 11 Kapsamındaki Haklarınız
            </h2>
            <p>KVKK&apos;nın 11. maddesi uyarınca veri sahipleri olarak aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300 text-xs sm:text-sm">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
              <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,</li>
              <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
              <li>Eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</li>
              <li>KVKK Madde 7 uyarınca kişisel verilerin silinmesini veya yok edilmesini isteme,</li>
              <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme.</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-[#2b2d35]">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-[#c5ad97]">7.</span> Başvuru ve İletişim
            </h2>
            <p>
              Yukarıda belirtilen haklarınızı kullanmak için yazılı başvurunuzu ıslak imzalı olarak{" "}
              <strong className="text-white">{companyInfo.address}</strong> adresine elden veya noter vasıtasıyla teslim edebilir; ya da{" "}
              <strong className="text-[#ded0c3]">{companyInfo.email}</strong> adresimize güvenli e-posta yoluyla iletebilirsiniz. Başvurularınız en geç 30 gün içinde yasal mevzuat gereğince sonuçlandırılacaktır.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
