"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Menu, X, Compass, ChevronRight, Calculator } from "lucide-react";
import { companyInfo } from "@/data/company";

import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#121316]/95 backdrop-blur-md border-b border-[#2b2d35] text-white shadow-xl">
      {/* Top bar info with Theme Switcher */}
      <div className="hidden md:block bg-[#18191d] text-slate-300 text-xs py-2 px-4 border-b border-[#2b2d35] font-medium">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-slate-400 flex items-center gap-1.5">
            <span className="text-[#c5ad97]">📍</span>
            <span>{companyInfo.address}</span>
          </span>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <span className="text-[#2b2d35]">|</span>
            <span className="flex items-center gap-1.5">
              <span className="text-slate-400">Asım Yılmazer:</span>
              <a href={`tel:${companyInfo.team[0].rawPhone}`} className="text-slate-200 hover:text-[#c5ad97] font-semibold transition-colors">
                {companyInfo.team[0].phone}
              </a>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <span className="text-slate-400">Abdussamet Gültekin:</span>
              <a href={`tel:${companyInfo.team[1].rawPhone}`} className="text-slate-200 hover:text-[#c5ad97] font-semibold transition-colors">
                {companyInfo.team[1].phone}
              </a>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#a68c74] via-[#c5ad97] to-[#ded0c3] flex items-center justify-center text-zinc-950 font-black shadow-md shadow-black/40 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-1.5">
                <span className="text-white">SAKARYA</span>
                <span className="text-[#c5ad97]">MİMAR YAPI</span>
              </div>
              <p className="text-[10px] tracking-wider uppercase text-zinc-400 font-medium">
                {companyInfo.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-300">
            <Link href="/" className="hover:text-[#c5ad97] transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/hizmetler" className="hover:text-[#c5ad97] transition-colors">
              Hizmetlerimiz
            </Link>
            <Link href="/projeler" className="hover:text-[#c5ad97] transition-colors">
              Projelerimiz
            </Link>
            <Link href="/bolgeler/serdivan" className="hover:text-[#c5ad97] transition-colors">
              İlçeler
            </Link>
            <Link href="/haberler" className="hover:text-[#c5ad97] transition-colors flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5ad97]"></span>
              Sektör Haberleri
            </Link>
            <Link href="/blog" className="hover:text-[#c5ad97] transition-colors">
              Tadilat Rehberi
            </Link>
            <Link href="/iletisim" className="hover:text-[#c5ad97] transition-colors">
              İletişim
            </Link>
          </nav>

          {/* Desktop Call & CTA */}
          <div className="hidden md:flex items-center gap-3.5">
            <a
              href={`tel:${companyInfo.primaryPhoneRaw}`}
              className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 transition-colors"
              title="Hemen Ara"
            >
              <Phone className="w-3.5 h-3.5 text-[#c5ad97]" />
              <span>{companyInfo.primaryPhoneDisplay}</span>
            </a>

            <a
              href="#fiyat-hesapla"
              className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-[#c5ad97] hover:bg-[#b39982] text-zinc-950 shadow-md shadow-black/20 transition-all hover:scale-[1.02]"
            >
              <Calculator className="w-4 h-4" />
              <span>Fiyat Hesapla</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`tel:${companyInfo.primaryPhoneRaw}`}
              className="p-2.5 rounded-xl bg-[#c5ad97] text-zinc-950"
              aria-label="Ara"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
              aria-label="Menü"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#18191d] border-b border-[#2b2d35] px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#2b2d35]">
            <span className="text-xs text-slate-400 font-semibold">Tema Rengi:</span>
            <ThemeSwitcher />
          </div>
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-sm font-semibold text-slate-200 border-b border-[#2b2d35]"
          >
            <span>Ana Sayfa</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </Link>
          <Link
            href="/hizmetler"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-200 border-b border-zinc-800/80"
          >
            <span>Hizmetlerimiz</span>
            <ChevronRight className="w-4 h-4 text-zinc-500" />
          </Link>
          <Link
            href="/projeler"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-200 border-b border-zinc-800/80"
          >
            <span>Projeler & Öncesi/Sonrası</span>
            <ChevronRight className="w-4 h-4 text-zinc-500" />
          </Link>
          <Link
            href="/bolgeler/serdivan"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-200 border-b border-zinc-800/80"
          >
            <span>Sakarya İlçeleri (Yerel Hizmet)</span>
            <ChevronRight className="w-4 h-4 text-zinc-500" />
          </Link>
          <Link
            href="/haberler"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-200 border-b border-zinc-800/80"
          >
            <span>Sektör Haberleri (RSS)</span>
            <span className="text-[10px] bg-zinc-800 text-[#c5ad97] px-2 py-0.5 rounded-full font-bold">Canlı</span>
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-200 border-b border-zinc-800/80"
          >
            <span>Tadilat Rehberi & Fiyatlar</span>
            <ChevronRight className="w-4 h-4 text-zinc-500" />
          </Link>
          <Link
            href="/iletisim"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-sm font-semibold text-zinc-200 border-b border-zinc-800/80"
          >
            <span>İletişim & Konum</span>
            <ChevronRight className="w-4 h-4 text-zinc-500" />
          </Link>

          {/* Direct call buttons for both managers */}
          <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
            <a
              href={`tel:${companyInfo.team[0].rawPhone}`}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-center text-zinc-200 hover:text-white"
            >
              <div className="text-[10px] text-[#c5ad97] font-bold">Asım Yılmazer</div>
              <div className="font-semibold">{companyInfo.team[0].phone}</div>
            </a>
            <a
              href={`tel:${companyInfo.team[1].rawPhone}`}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-center text-zinc-200 hover:text-white"
            >
              <div className="text-[10px] text-[#c5ad97] font-bold">Abdussamet Gültekin</div>
              <div className="font-semibold">{companyInfo.team[1].phone}</div>
            </a>
          </div>

          <div className="pt-1 flex flex-col gap-2.5">
            <a
              href={`https://wa.me/${companyInfo.primaryWhatsapp}?text=${encodeURIComponent(
                "Merhaba Sakarya Mimar Yapı, ev tadilatı için bilgi almak istiyorum."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 font-bold text-zinc-200 border border-zinc-700 shadow-lg text-xs"
            >
              <MessageCircle className="w-4 h-4 text-[#c5ad97]" />
              <span>WhatsApp Keşif Hattı</span>
            </a>

            <a
              href="#fiyat-hesapla"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#c5ad97] font-bold text-zinc-950 shadow-lg text-xs"
            >
              <Calculator className="w-4 h-4" />
              <span>Hemen Fiyat Hesapla</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
