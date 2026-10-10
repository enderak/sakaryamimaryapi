import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Hammer, Trophy, Sparkles, MessageCircle, Phone, ShieldCheck, CheckCircle2 } from "lucide-react";
import BrickTossGame from "@/components/BrickTossGame";
import { companyInfo } from "@/data/company";

export const metadata: Metadata = {
  title: "Duvardan Tuğla Aşırtma Oyunu | Sakarya Mimar Yapı",
  description: "Mobil uyumlu şantiye ustası tuğla aşırtma oyunu! Tuğlaları duvardan aşırtın, harç teknesini doldurun ve özel tadilat keşif indirimi kazanın.",
  robots: {
    index: true,
    follow: true,
  }
};

export default function OyunPage() {
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
            Duvardan Tuğla <span className="text-[#0f2b5c]">Aşırtma Oyunu</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Parmağınızla tuğlayı geriye çekip nişan alın, duvardan aşırtarak hareketli harç teknesine isabet ettirin!
          </p>
        </div>

        {/* The Game Canvas Component */}
        <div className="mb-10">
          <BrickTossGame />
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
              Oyunda 200 puan ve üzerini geçen tüm Sakaryalı hemşehrilerimiz; ev tadilatı, banyo/mutfak yenileme veya villa inşaatında <strong>%10 işçilik ve keşif indirimi</strong> kazanır!
            </p>
            <div className="pt-1">
              <a
                href={`https://wa.me/${companyInfo.primaryWhatsapp}?text=${encodeURIComponent(
                  "Merhaba Sakarya Mimar Yapı, sitenizdeki Tuğla Aşırtma Oyununu oynadım ve tadilat keşfi için görüşmek istiyorum."
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
