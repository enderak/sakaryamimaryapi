"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, HardHat, MapPin, ShieldCheck, CheckCircle2, ArrowRight, Play, Pause } from "lucide-react";
import { companyInfo } from "@/data/company";

interface ConstructionSlide {
  id: string;
  title: string;
  subtitle: string;
  district: string;
  category: string;
  image: string;
  scope: string;
  features: string[];
  specs: { label: string; value: string }[];
}

const slides: ConstructionSlide[] = [
  {
    id: "c1",
    title: "Sapanca Göl Manzaralı Çelik & Betonarme Villa İnşaatı",
    subtitle: "Temelden Çatıya Anahtar Teslim Müteahhitlik ve Statik Proje",
    district: "Sapanca (Kırkpınar)",
    category: "Lüks Villa İnşaatı",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85",
    scope: "380 m² oturum alanı, radye temel, hafif çelik karkas, infinity havuz ve peyzaj düzenlemesi.",
    features: [
      "Deprem yönetmeliğine %100 uygun C35 betonarme temel",
      "Taşyünü ses ve A+ sınıfı ısı izolasyonu",
      "Yerden ısıtma ve akıllı ev otomasyon sistemi"
    ],
    specs: [
      { label: "Alan", value: "380 m²" },
      { label: "Konum", value: "Sapanca" },
      { label: "Teslim", value: "Anahtar Teslim" }
    ]
  },
  {
    id: "c2",
    title: "Serdivan Çok Katlı Konut & Rezidans Kaba-İnce İnşaatı",
    subtitle: "Modern Mimari Çizgiler, Depreme Dayanıklı Perde Beton Sistemi",
    district: "Serdivan (Mavi Durak)",
    category: "Konut İnşaatı",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1920&q=85",
    scope: "12 dairelik butik konut projesi; kaba yapı, elektrik-su altyapısı, şap ve ince işçilik.",
    features: [
      "Perde kolon ve radye jeneral temel mimarisi",
      "Akustik tavan ve komşu duvar ses yalıtımı",
      "Modern dış cephe kompozit ve prekast kaplama"
    ],
    specs: [
      { label: "Kapasite", value: "12 Daire" },
      { label: "Konum", value: "Serdivan" },
      { label: "Yapı Türü", value: "Betonarme" }
    ]
  },
  {
    id: "c3",
    title: "Erenler & Sakarya Sanayi Çelik Konstrüksiyon ve Depo Yapımı",
    subtitle: "Hızlı Kurulum, Yüksek Mukavemetli Ağır ve Hafif Çelik Yapılar",
    district: "Erenler / 1. OSB",
    category: "Çelik Yapı & Hangarlar",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=85",
    scope: "1.200 m² endüstriyel depo ve fabrika binası çelik karkas montajı ve sandviç panel çatı kaplaması.",
    features: [
      "Galvanizli yüksek mukavemetli çelik taşıyıcı kolonlar",
      "Poliüretan dolgulu yangına dayanıklı sandviç panel cephe",
      "Endüstriyel helikopterli zemin betonu"
    ],
    specs: [
      { label: "Kapalı Alan", value: "1200 m²" },
      { label: "Konum", value: "Erenler" },
      { label: "Karkas", value: "Çelik Yapı" }
    ]
  },
  {
    id: "c4",
    title: "Adapazarı Müstakil Ev Yenileme, Güçlendirme & Çatı İnşaatı",
    subtitle: "Zemin İyileştirme, Kolon Mantolama ve Garantili Çatı İzolasyonu",
    district: "Adapazarı (Çark Cad.)",
    category: "Güçlendirme & Çatı",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1920&q=85",
    scope: "Eski yapının statik güçlendirilmesi, karbon elyaf sargılama, yeni çelik çatı konstrüksiyonu.",
    features: [
      "Resmi mühendislik statik analizi ve raporlama",
      "Garantili çift kat su izolasyonlu membran çatı",
      "Bina dışı drenaj ve nem izolasyon bohçalama"
    ],
    specs: [
      { label: "İşlem", value: "Güçlendirme" },
      { label: "Konum", value: "Adapazarı" },
      { label: "Garanti", value: "10 Yıl" }
    ]
  }
];

export default function ConstructionSlider() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    touchStartX.current = null;
  };

  const currentSlide = slides[current];

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-3">
              <HardHat className="w-4 h-4 text-amber-400" />
              <span>Şantiye & Saha Çalışmalarımız</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Sakarya <span className="text-amber-400">İnşaat Projelerimiz</span>
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl text-sm sm:text-base">
              Sapanca villalarından Serdivan konutlarına, kaba inşaattan çelik konstrüksiyona kadar mühendislik güvencemizle yükselen yapılarımız.
            </p>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              title={isPlaying ? "Durdur" : "Oynat"}
              aria-label="Otomatik geçiş kontrolü"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-amber-400" />}
            </button>
            <button
              onClick={prevSlide}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-400 transition-all"
              aria-label="Önceki Proje"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-400 transition-all"
              aria-label="Sonraki Proje"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Slider Canvas */}
        <div
          className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl min-h-[520px] sm:min-h-[560px] flex items-end group"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Background Images with Fade Transition */}
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={idx === 0}
                className="object-cover object-center brightness-50"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
            </div>
          ))}

          {/* Slide Content Overlay */}
          <div className="relative z-20 p-6 sm:p-10 lg:p-12 w-full max-w-4xl space-y-5">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg">
                {currentSlide.category}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-200 border border-slate-700 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {currentSlide.district}
              </span>
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Deprem & Statik Onaylı
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                {currentSlide.title}
              </h3>
              <p className="text-amber-300 text-sm sm:text-base font-semibold">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* Scope description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-none">
              {currentSlide.scope}
            </p>

            {/* Technical Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {currentSlide.features.map((feat, fIdx) => (
                <div
                  key={fIdx}
                  className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>

            {/* Specs & Actions */}
            <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80">
              {/* Specs Pills */}
              <div className="flex items-center gap-4 text-xs">
                {currentSlide.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">{spec.label}</span>
                    <span className="text-white font-extrabold">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/${companyInfo.primaryWhatsapp}?text=${encodeURIComponent(
                    `Merhaba Sakarya Mimar Yapı, web sitenizdeki "${currentSlide.title}" inşaat projesi hakkında keşif ve teklif görüşmesi yapmak istiyorum.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/20 transition-all hover:scale-105 flex items-center gap-2"
                >
                  <span>Bu Proje İçin Keşif İste</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  href="/projeler"
                  className="px-4 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-colors"
                >
                  Tüm Projeler
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrent(idx)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                idx === current
                  ? "bg-slate-900 border-amber-400 text-white shadow-lg shadow-amber-500/10"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className={`font-black ${idx === current ? "text-amber-400" : "text-slate-500"}`}>
                  0{idx + 1}
                </span>
                <span className="text-[10px] text-slate-400 truncate max-w-[80px]">{slide.district}</span>
              </div>
              <div className="text-xs font-bold truncate text-slate-200">
                {slide.title}
              </div>
              <div className="text-[10px] text-slate-400 truncate mt-0.5">
                {slide.category}
              </div>

              {/* Progress bar line for active slide */}
              {idx === current && (
                <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-amber-400 h-full w-full animate-[progress_5.5s_linear]" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
