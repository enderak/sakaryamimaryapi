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
    <section className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-2">
              <Hammer className="w-4 h-4" />
              <span>Uzmanlık Alanlarımız</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Sakarya Tadilat & <span className="text-amber-400">Mimarlık Hizmetleri</span>
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl text-base">
              Kaba inşaattan en ince detayına kadar profesyonel mimar ve usta kadromuzla yanınızdayız.
            </p>
          </div>

          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-colors shrink-0 self-start md:self-auto"
          >
            <span>Tüm Hizmetleri Gör</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = iconMap[service.iconName] || Hammer;

            return (
              <div
                key={service.id}
                className="group bg-slate-800/60 rounded-3xl overflow-hidden border border-slate-700/60 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Service Image */}
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6 stroke-[2.2]" />
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-300 line-clamp-2">
                      {service.shortDesc}
                    </p>

                    {/* Features list */}
                    <div className="mt-5 space-y-2 border-t border-slate-700/60 pt-4">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700/40 text-xs">
                    <span className="text-slate-400">
                      Sıkça: {service.popularIn.slice(0, 2).join(", ")}
                    </span>
                    <a
                      href="#fiyat-hesapla"
                      className="text-amber-400 font-bold hover:underline flex items-center gap-1"
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
