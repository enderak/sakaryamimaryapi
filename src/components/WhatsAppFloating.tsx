"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Sparkles, UserCheck } from "lucide-react";
import { companyInfo } from "@/data/company";

export default function WhatsAppFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<0 | 1>(0);

  const quickMessages = [
    "Sakarya'da komple ev tadilatı için keşif istiyorum.",
    "Banyo ve mutfak yenileme fiyatları hakkında bilgi alabilir miyim?",
    "Sapanca'da villa inşaatı için görüşmek istiyorum.",
    "Serdivan'da daire tadilatı için keşif randevusu almak istiyorum."
  ];

  const handleSend = (text: string) => {
    const person = companyInfo.team[selectedPerson];
    const encoded = encodeURIComponent(
      `Merhaba ${person.name} (${companyInfo.name}),\n${text}`
    );
    window.open(`https://wa.me/${person.whatsappNumber}?text=${encoded}`, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* WhatsApp Mini Chat Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white text-emerald-700 flex items-center justify-center font-black text-sm">
                  SM
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-600 rounded-full"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">{companyInfo.name}</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span>● Çevrimiçi</span> • Serdivan Ofis
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-emerald-700/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Person Selector */}
          <div className="bg-slate-850 p-2.5 border-b border-slate-800 flex gap-2">
            {companyInfo.team.map((person, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPerson(idx as 0 | 1)}
                className={`flex-1 p-2 rounded-xl text-left text-xs transition-all border ${
                  selectedPerson === idx
                    ? "bg-emerald-600 text-white border-emerald-500 font-bold"
                    : "bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white"
                }`}
              >
                <div className="text-[10px] opacity-80 uppercase tracking-wider">Yetkili {idx + 1}</div>
                <div className="font-bold truncate">{person.name}</div>
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-950/70 space-y-3">
            <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700 text-xs text-slate-200">
              <p className="font-semibold text-amber-400 mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {companyInfo.team[selectedPerson].name} ile Görüşün:
              </p>
              Sakarya geneli (Serdivan, Adapazarı, Sapanca vb.) ücretsiz keşif ve maliyet bilgisi için size nasıl yardımcı olabiliriz?
            </div>

            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Hızlı Keşif Talepleri:
              </p>
              {quickMessages.map((msg, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(msg)}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-800/90 hover:bg-emerald-600/30 border border-slate-700 hover:border-emerald-500/50 text-xs text-slate-200 hover:text-white transition-all flex items-center justify-between group"
                >
                  <span className="truncate">{msg}</span>
                  <Send className="w-3.5 h-3.5 text-emerald-400 opacity-60 group-hover:opacity-100 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Direct CTA */}
          <div className="p-3 bg-slate-900 border-t border-slate-800">
            <button
              onClick={() => handleSend("Sakarya ev tadilatı için keşif ve fiyat almak istiyorum.")}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{companyInfo.team[selectedPerson].name}&apos;e WhatsApp&apos;tan Yaz</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl shadow-emerald-600/40 transition-all duration-300 hover:scale-105"
        aria-label="WhatsApp Canlı Destek"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        <span className="text-xs sm:text-sm font-black hidden sm:inline">
          WhatsApp Keşif Hattı
        </span>
      </button>
    </div>
  );
}
