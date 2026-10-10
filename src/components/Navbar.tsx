"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Menu, X, Compass, ChevronRight, Calculator, UserCheck } from "lucide-react";
import { companyInfo } from "@/data/company";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      {/* Top bar info */}
      <div className="hidden md:block bg-amber-500 text-slate-950 text-xs font-semibold py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>📍 {companyInfo.address}</span>
          <div className="flex items-center gap-4">
            <span className="font-bold flex items-center gap-1.5">
              <span>Asım Yılmazer:</span>
              <a href={`tel:${companyInfo.team[0].rawPhone}`} className="underline font-black hover:text-black">
                {companyInfo.team[0].phone}
              </a>
            </span>
            <span className="text-slate-900">•</span>
            <span className="font-bold flex items-center gap-1.5">
              <span>Abdussamet Gültekin:</span>
              <a href={`tel:${companyInfo.team[1].rawPhone}`} className="underline font-black hover:text-black">
                {companyInfo.team[1].phone}
              </a>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-1.5">
                <span className="text-white">SAKARYA</span>
                <span className="text-amber-400">MİMAR YAPI</span>
              </div>
              <p className="text-[10px] tracking-wider uppercase text-slate-400 font-medium">
                {companyInfo.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/hizmetler" className="hover:text-amber-400 transition-colors">
              Hizmetlerimiz
            </Link>
            <Link href="/projeler" className="hover:text-amber-400 transition-colors">
              Projelerimiz
            </Link>
            <Link href="/bolgeler/serdivan" className="hover:text-amber-400 transition-colors">
              İlçeler
            </Link>
            <Link href="/haberler" className="hover:text-amber-400 transition-colors flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Sektör Haberleri
            </Link>
            <Link href="/blog" className="hover:text-amber-400 transition-colors">
              Tadilat Rehberi
            </Link>
            <Link href="/iletisim" className="hover:text-amber-400 transition-colors">
              İletişim
            </Link>
          </nav>

          {/* Desktop Call & CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${companyInfo.primaryPhoneRaw}`}
              className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-colors"
              title="Hemen Ara"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{companyInfo.primaryPhoneDisplay}</span>
            </a>

            <a
              href="#fiyat-hesapla"
              className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all hover:scale-105"
            >
              <Calculator className="w-4 h-4" />
              <span>Fiyat Hesapla</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`tel:${companyInfo.primaryPhoneRaw}`}
              className="p-2 rounded-lg bg-amber-500 text-slate-950"
              aria-label="Ara"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              aria-label="Menü"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-base font-semibold text-slate-200 border-b border-slate-800"
          >
            <span>Ana Sayfa</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </Link>
          <Link
            href="/hizmetler"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-base font-semibold text-slate-200 border-b border-slate-800"
          >
            <span>Hizmetlerimiz</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </Link>
          <Link
            href="/projeler"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-base font-semibold text-slate-200 border-b border-slate-800"
          >
            <span>Projeler & Öncesi/Sonrası</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </Link>
          <Link
            href="/bolgeler/serdivan"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-base font-semibold text-slate-200 border-b border-slate-800"
          >
            <span>Sakarya İlçeleri (Serdivan, Adapazarı...)</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </Link>
          <Link
            href="/haberler"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-base font-semibold text-slate-200 border-b border-slate-800"
          >
            <span>Sektör Haberleri (RSS)</span>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">Canlı</span>
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-base font-semibold text-slate-200 border-b border-slate-800"
          >
            <span>Tadilat Rehberi & Fiyatlar</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </Link>
          <Link
            href="/iletisim"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-base font-semibold text-slate-200 border-b border-slate-800"
          >
            <span>İletişim & Konum</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </Link>

          {/* Direct call buttons for both managers */}
          <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
            <a
              href={`tel:${companyInfo.team[0].rawPhone}`}
              className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-center text-slate-200 hover:text-white"
            >
              <div className="text-[10px] text-amber-400 font-bold">Asım Yılmazer</div>
              <div className="font-bold">{companyInfo.team[0].phone}</div>
            </a>
            <a
              href={`tel:${companyInfo.team[1].rawPhone}`}
              className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-center text-slate-200 hover:text-white"
            >
              <div className="text-[10px] text-amber-400 font-bold">Abdussamet Gültekin</div>
              <div className="font-bold">{companyInfo.team[1].phone}</div>
            </a>
          </div>

          <div className="pt-1 flex flex-col gap-2.5">
            <a
              href={`https://wa.me/${companyInfo.primaryWhatsapp}?text=${encodeURIComponent(
                "Merhaba Sakarya Mimar Yapı, ev tadilatı için bilgi almak istiyorum."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 font-bold text-white shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Keşif Hattı</span>
            </a>

            <a
              href="#fiyat-hesapla"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 font-bold text-slate-950 shadow-lg"
            >
              <Calculator className="w-5 h-5" />
              <span>Hemen Fiyat Hesapla</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
