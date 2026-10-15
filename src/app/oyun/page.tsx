import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Hammer, Trophy, Sparkles, MessageCircle, Phone, CheckCircle2 } from "lucide-react";
import BrickTossGame from "@/components/BrickTossGame";
import { companyInfo } from "@/data/company";
import { getSiteSettings } from "@/lib/settingsStorage";
import { defaultSiteSettingsConfig } from "@/data/siteSettings";

export const metadata: Metadata = {
  title: "Duvardan Tuğla Aşırtma Oyunu | Sakarya Mimar Yapı",
  description: "Mobil uyumlu şantiye ustası tuğla aşırtma oyunu! Tuğlaları duvardan aşırtın, harç teknesini doldurun ve özel tadilat keşif indirimi kazanın.",
  robots: {
    index: true,
    follow: true,
  }
};

export default function OyunPage() {
  const siteSettings = getSiteSettings();
  const gameConfig = siteSettings.game || defaultSiteSettingsConfig.game;

  // Closed State Screen
  if (!gameConfig.enabled) {
    return (
      <div className="py-12 sm:py-24 bg-slate-50 min-h-screen text-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-md">
            <Hammer className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">
              <span>Şantiye Molası Kapalı</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {gameConfig.title || "Tuğla Aşırtma Oyunu"} Şu Anda Kapalı
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              {gameConfig.disabledMessage || "Tuğla Aşırtma Oyunu şu anda geçici olarak kapalıdır. Tadilat ve mimari keşif talepleriniz için WhatsApp veya telefon hattımızdan bize doğrudan ulaşabilirsiniz."}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 max-w-md mx-auto">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Doğrudan İletişim & Ücretsiz Keşif
            </h3>
            <div className="flex flex-col gap-2.5">
              <a
                href={`https://wa.me/${companyInfo.primaryWhatsapp}?text=${encodeURIComponent(
                  "Merhaba Sakarya Mimar Yapı, ev tadilatı ve mimari keşif için bilgi almak istiyorum."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white shadow-md text-xs transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Keşif Hattı</span>
              </a>

              <a
                href={`tel:${companyInfo.primaryPhoneRaw}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0f2b5c] hover:bg-[#163a75] font-bold text-white shadow-md text-xs transition-all"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{companyInfo.primaryPhoneDisplay} (Hemen Ara)</span>
              </a>

              <Link
                href="/"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Ana Sayfaya Dön</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Game Screen
  return (
    <div className="py-8 sm:py-16 bg-slate-50 min-h-screen text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0f2b5c] p-2 rounded-xl bg-white border border-slate-200 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Şantiye Molası</span>
          </div>
        </div>

        {/* Intro Banner */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {gameConfig.title || "Duvardan Tuğla Aşırtma Oyunu"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Parmağınızla tuğlayı geriye çekip nişan alın, duvardan aşırtarak hareketli harç teknesine isabet ettirin!
          </p>
        </div>

        {/* The Game Canvas Component */}
        <div className="mb-10">
          <BrickTossGame
            minScoreForDiscount={gameConfig.minScoreForDiscount}
            discountPercentage={gameConfig.discountPercentage}
          />
        </div>

        {/* How to Play & Rewards Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Hammer className="w-4 h-4 text-[#0f2b5c]" />
              <span>Oyun Kuralları ve İpuçları</span>
            </h3>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Sapan Tekniği:</strong> Tuğlayı parmağınızla ne kadar geriye çekerseniz atış o kadar hızlı ve yüksek olur.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Rüzgar Faktörü:</strong> İlerleyen seviyelerde rüzgar tuğlanın yönünü etkiler, göstergeyi takip edin.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Combo Bonusu:</strong> Iskalama yapmadan art arda yapılan isabetler ekstra x2, x3 puan kazandırır.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#0f2b5c] to-[#0a1b3a] p-5 rounded-3xl text-white shadow-sm space-y-3">
            <h3 className="text-sm font-bold flex items-center gap-2 text-amber-300">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Usta Ödülü: Tadilat İndirimi</span>
            </h3>
            <p className="text-xs text-slate-200 leading-relaxed">
              Oyunda {gameConfig.minScoreForDiscount} puan ve üzerini geçen tüm Sakaryalı hemşehrilerimiz; ev tadilatı, banyo/mutfak yenileme veya villa inşaatında <strong>%{gameConfig.discountPercentage} işçilik ve keşif indirimi</strong> kazanır!
            </p>
            <div className="pt-1">
              <a
                href={`https://wa.me/${companyInfo.primaryWhatsapp}?text=${encodeURIComponent(
                  `Merhaba Sakarya Mimar Yapı, sitenizdeki ${gameConfig.title || "Tuğla Aşırtma Oyunu"}nu oynadım ve tadilat keşfi için görüşmek istiyorum.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Keşif Hattı</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
