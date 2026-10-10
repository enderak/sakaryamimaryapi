import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Phone, Star, ShieldCheck, MapPin, Calculator, ArrowRight, UserCheck } from "lucide-react";
import { companyInfo } from "@/data/company";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-[#121316] text-white overflow-hidden border-b border-zinc-800/80">
      {/* Background Hero Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          alt="Sakarya Mimar Yapı İnşaat ve Tadilat"
          fill
          priority
          className="object-cover object-center brightness-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121316] via-[#121316]/85 to-[#121316]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Local Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-[#c5ad97] text-xs font-semibold tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-[#c5ad97] shrink-0" />
              <span>Serdivan, Arabacıalanı • Çark Cad. No:148</span>
              <span className="w-1 h-1 rounded-full bg-[#c5ad97]"></span>
              <span className="text-zinc-200 font-medium">Tüm Sakarya Geneli Keşif</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white">
              Sakarya&apos;da Yaşam Alanınızı <br />
              <span className="bg-gradient-to-r from-[#ded0c3] via-[#c5ad97] to-[#a68c74] bg-clip-text text-transparent">
                Sözleşmeli & Mimari Güvenceyle
              </span> <br />
              Yeniden İnşa Ediyoruz.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl font-normal leading-relaxed">
              <strong className="text-white font-semibold">Sakarya Mimar Yapı</strong>; komple ev ve daire tadilatı, modern mutfak & banyo yenileme, Sapanca villa inşaatı ve 3D iç mimarlık projelendirmesi sunar. Zamanında teslim ve 2 yıl resmi garanti taahhüdü.
            </p>

            {/* Trust points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 bg-zinc-900/80 backdrop-blur-md p-3 rounded-xl border border-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-[#c5ad97] shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-zinc-200">
                  Ücretsiz 3D Keşif
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-zinc-900/80 backdrop-blur-md p-3 rounded-xl border border-zinc-800">
                <ShieldCheck className="w-4 h-4 text-[#c5ad97] shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-zinc-200">
                  2 Yıl Firma Garantisi
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-zinc-900/80 backdrop-blur-md p-3 rounded-xl border border-zinc-800">
                <Star className="w-4 h-4 text-[#c5ad97] fill-[#c5ad97] shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-zinc-200">
                  350+ Tamamlanan Proje
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#fiyat-hesapla"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#c5ad97] hover:bg-[#b39982] text-zinc-950 font-bold text-sm shadow-xl transition-all hover:scale-[1.02]"
              >
                <Calculator className="w-4 h-4" />
                <span>Hemen Fiyat Hesapla</span>
              </a>

              <a
                href={`https://wa.me/${companyInfo.primaryWhatsapp}?text=${encodeURIComponent(
                  "Merhaba Asım Bey / Sakarya Mimar Yapı, ev tadilat keşfi için görüşmek istiyorum."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 font-semibold text-sm transition-all hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4 text-[#c5ad97]" />
                <span>WhatsApp&apos;tan Yazın</span>
              </a>

              <Link
                href="/projeler"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-300 hover:text-[#c5ad97] transition-colors ml-2"
              >
                <span>Projelerimizi Görün</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Direct Contact & Team Cards */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 p-6 rounded-3xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-xs uppercase font-bold text-[#c5ad97] tracking-wider">
                  Sakarya Mimar Yapı Yetkilileri
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                  Doğrudan İletişim
                </span>
              </div>

              {/* Contact Person 1 */}
              <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#c5ad97]" />
                    <span>{companyInfo.team[0].name}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {companyInfo.team[0].role}
                  </p>
                  <a
                    href={`tel:${companyInfo.team[0].rawPhone}`}
                    className="text-[#c5ad97] font-bold text-sm hover:underline block mt-1"
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
                  className="p-2.5 rounded-xl bg-zinc-800 hover:bg-[#c5ad97] hover:text-zinc-950 text-zinc-200 border border-zinc-700 transition-colors"
                  title="WhatsApp'tan Yaz"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

              {/* Contact Person 2 */}
              <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#c5ad97]" />
                    <span>{companyInfo.team[1].name}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {companyInfo.team[1].role}
                  </p>
                  <a
                    href={`tel:${companyInfo.team[1].rawPhone}`}
                    className="text-[#c5ad97] font-bold text-sm hover:underline block mt-1"
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
                  className="p-2.5 rounded-xl bg-zinc-800 hover:bg-[#c5ad97] hover:text-zinc-950 text-zinc-200 border border-zinc-700 transition-colors"
                  title="WhatsApp'tan Yaz"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

              {/* Office Address Badge */}
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs text-zinc-300">
                <div className="text-[#c5ad97] font-semibold mb-0.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Ofis & Şantiye Yönetimi:
                </div>
                <p className="text-[11px] text-zinc-400">
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
