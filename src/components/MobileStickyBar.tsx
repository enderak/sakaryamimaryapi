"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Calculator, Compass, X, UserCheck, ArrowRight } from "lucide-react";
import { companyInfo } from "@/data/company";

export default function MobileStickyBar() {
  const [callSheetOpen, setCallSheetOpen] = useState(false);

  return (
    <>
      {/* Phone Call Bottom Sheet Modal */}
      {callSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full max-w-lg bg-white rounded-t-3xl p-6 shadow-2xl space-y-4 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0f2b5c] flex items-center justify-center font-bold">
                  <Phone className="w-4 h-4 text-[#0f2b5c]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Doğrudan Yetkiliyi Arayın</h3>
                  <p className="text-[11px] text-slate-500">Sakarya merkezli ücretsiz keşif & danışma</p>
                </div>
              </div>
              <button
                onClick={() => setCallSheetOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
                aria-label="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Direct Call Cards */}
            <div className="grid grid-cols-1 gap-2.5">
              {companyInfo.team.map((member, idx) => (
                <a
                  key={idx}
                  href={`tel:${member.rawPhone}`}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-300 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0f2b5c] text-amber-400 flex items-center justify-center font-black text-xs shadow-xs">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{member.name}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">{member.role}</p>
                      <span className="text-xs font-black text-[#0f2b5c] block mt-0.5">
                        {member.phone}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs group-hover:bg-emerald-500 transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Ara</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick Note */}
            <p className="text-[11px] text-center text-slate-400">
              Haftanın 7 günü 08:30 - 20:00 saatleri arasında kesintisiz hizmet vermekteyiz.
            </p>
          </div>
        </div>
      )}

      {/* Main Sticky Bottom Navigation Bar (Mobile Only) */}
      <nav 
        aria-label="Hızlı Mobil İletişim"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom,0px)]"
      >
        <div className="grid grid-cols-4 items-center h-16 px-2 max-w-md mx-auto">
          {/* 1. Hemen Ara */}
          <button
            onClick={() => setCallSheetOpen(true)}
            className="flex flex-col items-center justify-center h-full py-1 text-slate-700 hover:text-[#0f2b5c] active:scale-95 transition-all"
            aria-label="Doğrudan Telefonla Ara"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-2xl bg-blue-50 text-[#0f2b5c] flex items-center justify-center mb-0.5 shadow-xs">
                <Phone className="w-4 h-4 text-[#0f2b5c]" />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
            </div>
            <span className="text-[10px] font-bold tracking-tight">Hemen Ara</span>
          </button>

          {/* 2. WhatsApp Keşif */}
          <a
            href={`https://wa.me/${companyInfo.primaryWhatsapp}?text=${encodeURIComponent(
              "Merhaba Sakarya Mimar Yapı, ev tadilatı / inşaat için keşif ve fiyat teklifi almak istiyorum."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center h-full py-1 text-slate-700 hover:text-emerald-600 active:scale-95 transition-all"
            aria-label="WhatsApp'tan Hızlı Keşif İste"
          >
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-0.5 shadow-xs">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-[10px] font-bold tracking-tight text-emerald-700">WhatsApp</span>
          </a>

          {/* 3. Fiyat Hesapla */}
          <a
            href="#fiyat-hesapla"
            className="flex flex-col items-center justify-center h-full py-1 text-slate-700 hover:text-amber-600 active:scale-95 transition-all"
            aria-label="Tadilat Fiyatını Hesapla"
          >
            <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-0.5 shadow-xs">
              <Calculator className="w-4 h-4 text-amber-600" />
            </div>
            <span className="text-[10px] font-bold tracking-tight">Hesapla</span>
          </a>

          {/* 4. Hizmetlerimiz / Projeler */}
          <Link
            href="/hizmetler"
            className="flex flex-col items-center justify-center h-full py-1 text-slate-700 hover:text-[#0f2b5c] active:scale-95 transition-all"
            aria-label="Tüm Hizmetlerimizi Görün"
          >
            <div className="w-9 h-9 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mb-0.5 shadow-xs">
              <Compass className="w-4 h-4 text-slate-700" />
            </div>
            <span className="text-[10px] font-bold tracking-tight">Hizmetler</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
