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
    <section id="projeler" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Referans Portföyümüz</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Sakarya&apos;da Tamamlanan <span className="text-amber-400">Projelerimiz</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Serdivan, Sapanca, Adapazarı ve Erenler lokasyonlarında anahtar teslim tamamladığımız gerçek işlerimizden örnekler.
          </p>
        </div>

        {/* Featured Before/After Interactive Section */}
        {featuredBeforeAfter && (
          <div className="mb-16 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs uppercase font-extrabold px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full border border-amber-500/30">
                  Öne Çıkan Öncesi / Sonrası Dönüşüm
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {featuredBeforeAfter.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    {featuredBeforeAfter.district}
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                    <Clock className="w-4 h-4 text-amber-400" />
                    Teslim: {featuredBeforeAfter.duration}
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {featuredBeforeAfter.description}
                </p>
                <div className="pt-2">
                  <a
                    href="#fiyat-hesapla"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
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
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
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
              className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-slate-700">
                    {project.category}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="flex items-center gap-1 font-semibold bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {project.district}
                    </span>
                    <span className="flex items-center gap-1 font-semibold bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      {project.duration}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h4>
                  <p className="mt-2 text-xs text-slate-400 line-clamp-2">
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
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold text-xs transition-colors border border-slate-700"
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
