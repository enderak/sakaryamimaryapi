import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Phone, Star, ShieldCheck, MapPin, Calculator, ArrowRight, UserCheck } from "lucide-react";
import { companyInfo } from "@/data/company";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-b from-white via-slate-50 to-white text-slate-900 overflow-hidden border-b border-slate-200">
      {/* Background Subtle Architectural Pattern / Soft Lighting */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-50/80 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Local Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0f2b5c] text-xs font-semibold tracking-wide shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-[#0f2b5c] shrink-0" />
              <span>Serdivan, Arabacıalanı • Çark Cad. No:148</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0f2b5c]"></span>
              <span className="text-slate-700 font-medium">Tüm Sakarya Geneli Ücretsiz Keşif</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-slate-950">
              Sakarya&apos;da Yaşam Alanınızı <br />
              <span className="text-[#0f2b5c]">
                Sözleşmeli & Mimari Güvenceyle
              </span> <br />
              Yeniden İnşa Ediyoruz.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
              <strong className="text-slate-900 font-semibold">Sakarya Mimar Yapı</strong>; komple ev ve daire tadilatı, modern mutfak & banyo yenileme, Sapanca villa inşaatı ve 3D iç mimarlık projelendirmesi sunar. Gününde teslim ve 2 yıl resmi işçilik garantisi.
            </p>

            {/* Trust points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  Ücretsiz 3D Keşif
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#0f2b5c] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  2 Yıl Firma Garantisi
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  350+ Teslim Edilen Proje
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#fiyat-hesapla"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0f2b5c] hover:bg-[#153a7a] text-white font-bold text-sm shadow-lg shadow-blue-950/20 transition-all hover:scale-[1.02]"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Hemen Fiyat Hesapla</span>
              </a>

              <a
                href={`https://wa.me/${companyInfo.primaryWhatsapp}?text=${encodeURIComponent(
                  "Merhaba Asım Bey / Sakarya Mimar Yapı, ev tadilat keşfi için görüşmek istiyorum."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm shadow-xs transition-all hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp&apos;tan Yazın</span>
              </a>

              <Link
                href="/projeler"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0f2b5c] hover:underline ml-2"
              >
                <span>Projelerimizi İnceleyin</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Direct Contact & Team Cards */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs uppercase font-extrabold text-[#0f2b5c] tracking-wider">
                  Yetkili İletişim Hatları
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Doğrudan Görüşme
                </span>
              </div>

              {/* Contact Person 1 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:border-blue-300 transition-colors">
                <div>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-[#0f2b5c]" />
                    <span>{companyInfo.team[0].name}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                    {companyInfo.team[0].role}
                  </p>
                  <a
                    href={`tel:${companyInfo.team[0].rawPhone}`}
                    className="text-[#0f2b5c] font-black text-sm hover:underline block mt-1"
                  >
                    {companyInfo.team[0].phone}
                  </a>
                </div>
                <a
                  href={`https://wa.me/${companyInfo.team[0].whatsappNumber}?text=${encodeURIComponent(
                    "Merhaba Asım Bey, Sakarya Mimar Yapı web siteniz üzerinden ulaşıyorum."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-600 border border-slate-200 transition-colors shadow-xs"
                  title="WhatsApp'tan Yaz"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

              {/* Contact Person 2 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:border-blue-300 transition-colors">
                <div>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-[#0f2b5c]" />
                    <span>{companyInfo.team[1].name}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                    {companyInfo.team[1].role}
                  </p>
                  <a
                    href={`tel:${companyInfo.team[1].rawPhone}`}
                    className="text-[#0f2b5c] font-black text-sm hover:underline block mt-1"
                  >
                    {companyInfo.team[1].phone}
                  </a>
                </div>
                <a
                  href={`https://wa.me/${companyInfo.team[1].whatsappNumber}?text=${encodeURIComponent(
                    "Merhaba Abdussamet Bey, Sakarya Mimar Yapı web siteniz üzerinden ulaşıyorum."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-600 border border-slate-200 transition-colors shadow-xs"
                  title="WhatsApp'tan Yaz"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

              {/* Office Address Badge */}
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700">
                <div className="text-[#0f2b5c] font-bold mb-0.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Ofis & Keşif Koordinasyon:
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  {companyInfo.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
