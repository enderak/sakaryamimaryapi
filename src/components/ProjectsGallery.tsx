"use client";

import { useState } from "react";
import Image from "next/image";
import { projects, Project } from "@/data/projects";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";
import { companyInfo } from "@/data/company";

export default function ProjectsGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("Tümü");

  const categories = ["Tümü", "Daire Tadilatı", "Villa", "Mutfak & Banyo", "Ticari / Ofis"];

  const filteredProjects = activeCategory === "Tümü"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const featuredBeforeAfter = projects.find((p) => p.hasBeforeAfter && p.beforeImage && p.afterImage);

  return (
    <section id="projeler" className="py-24 bg-slate-50 text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0f2b5c] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-[#0f2b5c]" />
            <span>Referans Portföyümüz</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Sakarya&apos;da Tamamlanan <span className="text-[#0f2b5c]">Projelerimiz</span>
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Serdivan, Sapanca, Adapazarı ve Erenler lokasyonlarında anahtar teslim tamamladığımız gerçek işlerimizden seçkiler.
          </p>
        </div>

        {/* Featured Before/After Interactive Section */}
        {featuredBeforeAfter && (
          <div className="mb-16 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs uppercase font-extrabold px-3 py-1 bg-blue-50 text-[#0f2b5c] rounded-full border border-blue-200">
                  Öne Çıkan Öncesi / Sonrası Dönüşüm
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {featuredBeforeAfter.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-xs text-slate-700">
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                    <MapPin className="w-4 h-4 text-[#0f2b5c]" />
                    {featuredBeforeAfter.district}
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                    <Clock className="w-4 h-4 text-[#0f2b5c]" />
                    Teslim: {featuredBeforeAfter.duration}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {featuredBeforeAfter.description}
                </p>
                <div className="pt-2">
                  <a
                    href="#fiyat-hesapla"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0f2b5c] hover:bg-[#153a7a] text-white font-bold text-sm shadow-md transition-all hover:scale-105"
                  >
                    <span>Benzer Dairem İçin Fiyat Al</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7">
                <BeforeAfterSlider
                  beforeImage={featuredBeforeAfter.beforeImage!}
                  afterImage={featuredBeforeAfter.afterImage!}
                  beforeLabel="Eski Hali"
                  afterLabel="Yeni Hali (Teslim)"
                />
              </div>
            </div>
          </div>
        )}

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCategory === cat
                  ? "bg-[#0f2b5c] text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-200 hover:text-slate-900 hover:border-slate-300 shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: Project) => (
            <div
              key={project.id}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#0f2b5c]/40 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#0f2b5c] text-xs font-semibold px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                    {project.category}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="flex items-center gap-1 font-medium bg-slate-900/70 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {project.district}
                    </span>
                    <span className="flex items-center gap-1 font-medium bg-slate-900/70 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {project.duration}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#0f2b5c] transition-colors">
                    {project.title}
                  </h4>
                  <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                    {project.scope}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/${companyInfo.primaryWhatsapp}?text=${encodeURIComponent(
                    `Merhaba Sakarya Mimar Yapı, sitenizdeki "${project.title}" projenizi inceledim. Benzer bir uygulama için bilgi ve keşif randevusu almak istiyorum.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 hover:bg-[#0f2b5c] hover:text-white text-slate-700 font-semibold text-xs transition-all border border-slate-200 shadow-sm"
                >
                  <span>Bu Proje Hakkında Bilgi Al</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
