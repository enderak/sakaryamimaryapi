import Link from "next/link";
import Image from "next/image";
import { services } from "@/data/services";
import { Hammer, Bath, Home, PenTool, ShieldCheck, Building2, ArrowRight, Check } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Hammer,
  Bath,
  Home,
  PenTool,
  ShieldCheck,
  Building2
};

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0f2b5c] text-xs font-bold uppercase tracking-wider mb-2">
              <Hammer className="w-3.5 h-3.5 text-[#0f2b5c]" />
              <span>Uzmanlık Alanlarımız</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Sakarya Tadilat & <span className="text-[#0f2b5c]">Mimarlık Hizmetleri</span>
            </h2>
            <p className="mt-2 text-slate-600 max-w-2xl text-sm sm:text-base">
              Kaba inşaattan en ince detayına kadar profesyonel mimar ve usta kadromuzla yanınızdayız.
            </p>
          </div>

          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-300 transition-colors shrink-0 self-start md:self-auto shadow-sm"
          >
            <span>Tüm Hizmetleri Gör</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0f2b5c]" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((service) => {
            const IconComponent = iconMap[service.iconName] || Hammer;

            return (
              <div
                key={service.id}
                className="group bg-slate-50/60 rounded-3xl overflow-hidden border border-slate-200 hover:border-[#0f2b5c]/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Service Image */}
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-[#0f2b5c] text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                      <IconComponent className="w-5 h-5 stroke-[2.2]" />
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0f2b5c] transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Features list */}
                    <div className="mt-5 space-y-2 border-t border-slate-200/80 pt-4">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 text-xs">
                    <span className="text-slate-500">
                      Sıkça: {service.popularIn.slice(0, 2).join(", ")}
                    </span>
                    <a
                      href="#fiyat-hesapla"
                      className="text-[#0f2b5c] font-bold hover:text-amber-600 flex items-center gap-1 transition-colors"
                    >
                      <span>Fiyat Al</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
