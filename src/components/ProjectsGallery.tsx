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
    <section id="projeler" className="py-24 bg-[#121316] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-[#c5ad97] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Referans Portföyümüz</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Sakarya&apos;da Tamamlanan <span className="text-[#c5ad97]">Projelerimiz</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Serdivan, Sapanca, Adapazarı ve Erenler lokasyonlarında anahtar teslim tamamladığımız gerçek işlerimizden seçkiler.
          </p>
        </div>

        {/* Featured Before/After Interactive Section */}
        {featuredBeforeAfter && (
          <div className="mb-16 bg-[#18191d] border border-[#2b2d35] rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs uppercase font-extrabold px-3 py-1 bg-[#c5ad97]/15 text-[#ded0c3] rounded-full border border-[#c5ad97]/30">
                  Öne Çıkan Öncesi / Sonrası Dönüşüm
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {featuredBeforeAfter.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 bg-[#121316] px-3 py-1.5 rounded-lg border border-[#2b2d35]">
                    <MapPin className="w-4 h-4 text-[#c5ad97]" />
                    {featuredBeforeAfter.district}
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#121316] px-3 py-1.5 rounded-lg border border-[#2b2d35]">
                    <Clock className="w-4 h-4 text-[#c5ad97]" />
                    Teslim: {featuredBeforeAfter.duration}
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {featuredBeforeAfter.description}
                </p>
                <div className="pt-2">
                  <a
                    href="#fiyat-hesapla"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#c5ad97] hover:bg-[#ded0c3] text-[#121316] font-bold text-sm shadow-lg shadow-black/40 transition-all hover:scale-105"
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
                  ? "bg-[#c5ad97] text-[#121316] shadow-md shadow-black/20"
                  : "bg-[#18191d] text-slate-400 border border-[#2b2d35] hover:text-white hover:border-[#c5ad97]/50"
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
              className="group bg-[#18191d] border border-[#2b2d35] rounded-2xl overflow-hidden hover:border-[#c5ad97]/50 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-[#121316]/85 backdrop-blur-md text-[#ded0c3] text-xs font-semibold px-3 py-1 rounded-full border border-[#2b2d35]">
                    {project.category}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="flex items-center gap-1 font-medium bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                      <MapPin className="w-3.5 h-3.5 text-[#c5ad97]" />
                      {project.district}
                    </span>
                    <span className="flex items-center gap-1 font-medium bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-[#ded0c3]" />
                      {project.duration}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-lg font-bold text-white group-hover:text-[#ded0c3] transition-colors">
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
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#121316] hover:bg-[#c5ad97] hover:text-[#121316] text-slate-200 font-semibold text-xs transition-all border border-[#2b2d35] hover:border-[#c5ad97]"
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
