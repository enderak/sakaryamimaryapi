import { Metadata } from "next";
import ProjectsGallery from "@/components/ProjectsGallery";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { projects } from "@/data/projects";
import { Sparkles, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Tamamlanan Projeler & Öncesi-Sonrası | Sakarya Mimarlık",
  description: "Sakarya'da teslim ettiğimiz daire, villa, mutfak ve banyo tadilat projeleri. Öncesi ve sonrası fotoğraflarını inceleyin."
};

export default function ProjectsPage() {
  const beforeAfterList = projects.filter((p) => p.hasBeforeAfter && p.beforeImage && p.afterImage);

  return (
    <div className="py-20 bg-[#121316] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[#c5ad97] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Gerçek Uygulamalar</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Tadilat & İnşaat <span className="text-[#c5ad97]">Portföyümüz</span>
          </h1>
          <p className="mt-4 text-slate-300 text-base">
            Sakarya genelinde gerçekleştirdiğimiz projelerimiz ve eski halleriyle karşılaştırmalı teslim fotoğraflarımız.
          </p>
        </div>

        {/* All Before/After Transformations */}
        <div className="mt-14 space-y-12">
          <div className="border-b border-[#2b2d35] pb-4">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <span>🔄 Öncesi / Sonrası Dönüşüm Galerisi</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Kaydırıcı çubuğu sağa sola sürükleyerek yapılan mimari değişimi inceleyebilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {beforeAfterList.map((item) => (
              <div key={item.id} className="bg-[#18191d] border border-[#2b2d35] p-6 rounded-3xl space-y-4 shadow-xl">
                <BeforeAfterSlider
                  beforeImage={item.beforeImage!}
                  afterImage={item.afterImage!}
                  title={item.title}
                  description={`${item.district} • ${item.duration} teslim süresi • ${item.scope}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filterable Full Projects Gallery Component */}
      <ProjectsGallery />
    </div>
  );
}
