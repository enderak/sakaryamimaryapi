import { Metadata } from "next";
import Link from "next/link";
import { companyInfo } from "@/data/company";
import { Cookie, ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: `Çerez Politikası | ${companyInfo.name}`,
  description: `${companyInfo.name} internet sitesinde kullanılan çerezler (cookies) ve kullanım amaçlarına ilişkin bilgilendirme.`
};

export default function CookiePolicyPage() {
  return (
    <div className="py-20 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0f2b5c] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ana Sayfaya Dön</span>
        </Link>

        {/* Header */}
        <div className="border-b border-slate-200 pb-8 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0f2b5c] text-xs font-semibold mb-3">
            <Cookie className="w-4 h-4 text-[#0f2b5c]" />
            <span>Çerez (Cookie) Kullanımı</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Çerez Politikası & <span className="text-[#0f2b5c]">Tercih Yönetimi</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            {companyInfo.name} • {companyInfo.displayWebsite}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. Çerez Nedir?</h2>
            <p>
              Çerezler (cookies), bir internet sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza (bilgisayar, tablet veya telefon) kaydedilen küçük metin dosyalarıdır. Çerezler web sitesinin düzgün çalışmasını, kullanıcı deneyiminin iyileştirilmesini ve ziyaret tercihlerinizin hatırlanmasını sağlar.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">2. Sitemizde Kullanılan Çerez Türleri</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-sm mb-1">A. Zorunlu / Teknik Çerezler</h3>
                <p className="text-xs text-slate-600">
                  Sitenin temel işlevlerini (sayfa gezintisi, form doldurma ve güvenlik önlemleri) yerine getirebilmesi için kesinlikle gereklidir. Bu çerezler kapatılamaz.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-sm mb-1">B. İşlevsel & Tercih Çerezleri</h3>
                <p className="text-xs text-slate-600">
                  Kullanıcının dil, tema tercihlerini ve daha önce çerez onayını verip vermediğini hatırlar.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-sm mb-1">C. Performans & Analitik Çerezler</h3>
                <p className="text-xs text-slate-600">
                  Ziyaretçilerin web sitemizi nasıl kullandığını anonim olarak anlamamıza ve sayfa yükleme hızlarını optimize etmemize yardımcı olur.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
            <p>
              İnternet sitemizi ilk ziyaretinizde karşınıza çıkan çerez onay banner&apos;ı üzerinden tercihlerinizi belirleyebilirsiniz. Ayrıca kullandığınız internet tarayıcısının ayarlarından (Chrome, Safari, Edge, Firefox vb.) çerezleri dilediğiniz an silebilir veya tamamen engelleyebilirsiniz.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">4. İletişim</h2>
            <p>
              Çerez politikamız veya kişisel verileriniz hakkındaki her türlü sorunuz için{" "}
              <a href={`mailto:${companyInfo.email}`} className="text-[#0f2b5c] hover:underline font-bold">
                {companyInfo.email}
              </a>{" "}
              adresi üzerinden bizimle iletişime geçebilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
