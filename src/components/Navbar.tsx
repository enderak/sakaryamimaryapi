"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Menu, X, Compass, ChevronRight, Calculator, MapPin } from "lucide-react";
import { companyInfo } from "@/data/company";

interface NavbarProps {
  gameConfig?: {
    enabled: boolean;
    showInNavbar: boolean;
    title?: string;
  };
}

export default function Navbar({ gameConfig }: NavbarProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isGameVisible = gameConfig ? (gameConfig.enabled && gameConfig.showInNavbar) : true;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-sm">
      {/* Top corporate info bar */}
      <div className="hidden md:block bg-[#0f2347] text-slate-200 text-xs py-2 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-slate-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{companyInfo.address}</span>
          </span>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <span className="text-slate-400">Asım Yılmazer:</span>
              <a href={`tel:${companyInfo.team[0].rawPhone}`} className="text-white hover:text-amber-400 font-semibold transition-colors">
                {companyInfo.team[0].phone}
              </a>
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1.5">
              <span className="text-slate-400">Abdussamet Gültekin:</span>
              <a href={`tel:${companyInfo.team[1].rawPhone}`} className="text-white hover:text-amber-400 font-semibold transition-colors">
                {companyInfo.team[1].phone}
              </a>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 mr-6 lg:mr-10 xl:mr-14 py-1 group">
            <img
              src="/images/Sakarya-Mimar-Siyah-Logo.png"
              alt="Sakarya Mimar Yapı"
              className="h-11 sm:h-13 w-auto object-contain group-hover:scale-[1.02] transition-transform"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold text-slate-700">
            <Link href="/" className="hover:text-amber-600 transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/hizmetler" className="hover:text-amber-600 transition-colors">
              Hizmetlerimiz
            </Link>
            <Link href="/projeler" className="hover:text-amber-600 transition-colors">
              Projelerimiz
            </Link>
            <Link href="/bolgeler/serdivan" className="hover:text-amber-600 transition-colors">
              İlçeler
            </Link>
            <Link href="/haberler" className="hover:text-amber-600 transition-colors flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Sektör Haberleri
            </Link>
            <Link href="/blog" className="hover:text-amber-600 transition-colors">
              Tadilat Rehberi
            </Link>
            {isGameVisible && (
              <Link href="/oyun" className="hover:text-amber-600 font-bold transition-colors flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                <span>🎮 Tuğla Oyunu</span>
              </Link>
            )}
            <Link href="/iletisim" className="hover:text-amber-600 transition-colors">
              İletişim
            </Link>
          </nav>

          {/* Desktop Call & CTA */}
          <div className="hidden md:flex items-center gap-3.5">
            <a
              href={`tel:${companyInfo.primaryPhoneRaw}`}
              className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-colors"
              title="Hemen Ara"
            >
              <Phone className="w-3.5 h-3.5 text-[#0f2b5c]" />
              <span>{companyInfo.primaryPhoneDisplay}</span>
            </a>

            <a
              href="#fiyat-hesapla"
              className="flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-xl bg-[#0f2b5c] hover:bg-[#153a7a] text-white shadow-md shadow-blue-900/20 transition-all hover:scale-[1.02]"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Fiyat Hesapla</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`tel:${companyInfo.primaryPhoneRaw}`}
              className="p-2.5 rounded-xl bg-[#0f2b5c] text-white"
              aria-label="Ara"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
              aria-label="Menü"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl max-h-[calc(100dvh-5rem)] overflow-y-auto">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 text-sm font-semibold text-slate-800 border-b border-slate-100"
          >
            <span>Ana Sayfa</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            href="/hizmetler"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 text-sm font-semibold text-slate-800 border-b border-slate-100"
          >
            <span>Hizmetlerimiz</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            href="/projeler"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 text-sm font-semibold text-slate-800 border-b border-slate-100"
          >
            <span>Projeler & Öncesi/Sonrası</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            href="/bolgeler/serdivan"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 text-sm font-semibold text-slate-800 border-b border-slate-100"
          >
            <span>Sakarya İlçeleri (Yerel Hizmet)</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            href="/haberler"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 text-sm font-semibold text-slate-800 border-b border-slate-100"
          >
            <span>Sektör Haberleri (RSS)</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Canlı</span>
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 text-sm font-semibold text-slate-800 border-b border-slate-100"
          >
            <span>Tadilat Rehberi & Fiyatlar</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
          {isGameVisible && (
            <Link
              href="/oyun"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 text-sm font-bold text-amber-800 bg-amber-50 px-3 rounded-xl border border-amber-200"
            >
              <span className="flex items-center gap-2">
                <span>🎮</span>
                <span>Tuğla Aşırtma Oyunu</span>
              </span>
              <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-extrabold">Ödüllü</span>
            </Link>
          )}
          <Link
            href="/iletisim"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 text-sm font-semibold text-slate-800 border-b border-slate-100"
          >
            <span>İletişim & Konum</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>

          {/* Direct call buttons for both managers */}
          <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
            <a
              href={`tel:${companyInfo.team[0].rawPhone}`}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center text-slate-800 hover:bg-slate-100"
            >
              <div className="text-[10px] text-[#0f2b5c] font-bold">Asım Yılmazer</div>
              <div className="font-bold text-xs">{companyInfo.team[0].phone}</div>
            </a>
            <a
              href={`tel:${companyInfo.team[1].rawPhone}`}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center text-slate-800 hover:bg-slate-100"
            >
              <div className="text-[10px] text-[#0f2b5c] font-bold">Abdussamet Gültekin</div>
              <div className="font-bold text-xs">{companyInfo.team[1].phone}</div>
            </a>
          </div>

          <div className="pt-1 flex flex-col gap-2.5">
            <a
              href={`https://wa.me/${companyInfo.primaryWhatsapp}?text=${encodeURIComponent(
                "Merhaba Sakarya Mimar Yapı, ev tadilatı için bilgi almak istiyorum."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white shadow-md text-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Keşif Hattı</span>
            </a>

            <a
              href="#fiyat-hesapla"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0f2b5c] font-bold text-white shadow-md text-xs"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Hemen Fiyat Hesapla</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
