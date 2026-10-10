import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Phone, Star, ShieldCheck, MapPin, Calculator, ArrowRight, UserCheck } from "lucide-react";
import { companyInfo } from "@/data/company";

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center bg-slate-950 text-white overflow-hidden">
      {/* Background Hero Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          alt="Sakarya Mimar Yapı İnşaat ve Tadilat"
          fill
          priority
          className="object-cover object-center brightness-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Local Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold tracking-wide">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Serdivan, Arabacıalanı • Çark Cad. No:148</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span className="text-white font-semibold">Tüm Sakarya Geneli Keşif</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Sakarya&apos;da Evinizi <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                Sözleşmeli & Garantili
              </span> <br />
              Yeniden İnşa Ediyoruz.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              <strong className="text-white">Sakarya Mimar Yapı</strong> güvencesiyle; komple ev ve daire tadilatı, modern mutfak & banyo yenileme, villa inşaatı ve 3D mimari tasarım. Sürpriz maliyet yok; zamanında teslim ve 2 yıl resmi garanti var.
            </p>

            {/* Trust points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 bg-slate-900/60 backdrop-blur-md p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-200">
                  Ücretsiz 3D Keşif
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-900/60 backdrop-blur-md p-3 rounded-xl border border-slate-800">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-200">
                  2 Yıl Firma Garantisi
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-900/60 backdrop-blur-md p-3 rounded-xl border border-slate-800">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-200">
                  350+ Mutlu Müşteri
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#fiyat-hesapla"
                className="flex items-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-base shadow-xl shadow-amber-500/25 transition-all hover:scale-105"
              >
                <Calculator className="w-5 h-5" />
                <span>Hemen Fiyat Hesapla</span>
              </a>

              <a
                href={`https://wa.me/${companyInfo.primaryWhatsapp}?text=${encodeURIComponent(
                  "Merhaba Asım Bey / Sakarya Mimar Yapı, ev tadilat keşfi için görüşmek istiyorum."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-white font-bold text-base transition-all hover:scale-105"
              >
                <Phone className="w-5 h-5 text-emerald-400" />
                <span>WhatsApp&apos;tan Yazın</span>
              </a>

              <Link
                href="/projeler"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-300 hover:text-amber-400 transition-colors ml-2"
              >
                <span>Projelerimizi Görün</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Direct Contact & Team Cards */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                  Sakarya Mimar Yapı Yetkilileri
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                  Doğrudan İletişim
                </span>
              </div>

              {/* Contact Person 1 */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="text-sm font-black text-white flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-amber-400" />
                    <span>{companyInfo.team[0].name}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {companyInfo.team[0].role}
                  </p>
                  <a
                    href={`tel:${companyInfo.team[0].rawPhone}`}
                    className="text-amber-400 font-extrabold text-sm hover:underline block mt-1"
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
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-transform hover:scale-105"
                  title="WhatsApp'tan Yaz"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

              {/* Contact Person 2 */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="text-sm font-black text-white flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-amber-400" />
                    <span>{companyInfo.team[1].name}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {companyInfo.team[1].role}
                  </p>
                  <a
                    href={`tel:${companyInfo.team[1].rawPhone}`}
                    className="text-amber-400 font-extrabold text-sm hover:underline block mt-1"
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
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-transform hover:scale-105"
                  title="WhatsApp'tan Yaz"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

              {/* Office Address Badge */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                <div className="text-amber-400 font-bold mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Ofis & Şantiye Yönetimi:
                </div>
                <p className="text-[11px] text-slate-400">
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
