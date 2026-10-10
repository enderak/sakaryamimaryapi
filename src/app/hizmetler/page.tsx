import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import { companyInfo } from "@/data/company";
import { Hammer, Check, ArrowRight, ShieldCheck, MapPin, Calculator } from "lucide-react";

export const metadata: Metadata = {
  title: "Tadilat ve Mimarlık Hizmetlerimiz | Sakarya Mimarlık & Yapı",
  description: "Sakarya'da anahtar teslim ev tadilatı, mutfak banyo yenileme, villa inşaatı, çatı mantolama ve iç mimarlık hizmetlerimiz."
};

export default function ServicesPage() {
  return (
    <div className="py-16 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-2">
            <Hammer className="w-4 h-4" />
            <span>Kapsamlı Yapı Hizmetleri</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Sakarya&apos;da Sunduğumuz <span className="text-amber-400">Hizmetler</span>
          </h1>
          <p className="mt-4 text-slate-300 text-base">
            Tüm tadilat ve inşaat süreçlerinde resmi sözleşme, kaliteli 1. sınıf malzeme ve 2 yıl işçilik garantisi veriyoruz.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              <div className={`lg:col-span-6 space-y-4 ${index % 2 === 1 ? "lg:col-start-7" : ""}`}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>En Çok: {service.popularIn.join(", ")}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {service.title}
                </h2>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs uppercase font-extrabold text-amber-400 tracking-wider mb-3">
                    Hizmet Kapsamımız:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/${companyInfo.primaryWhatsapp}?text=${encodeURIComponent(
                      `Merhaba Sakarya Mimar Yapı, "${service.title}" hizmetiniz hakkında keşif ve fiyat bilgisi almak istiyorum.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors"
                  >
                    <span>Ücretsiz Keşif İste</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <Link
                    href="/#fiyat-hesapla"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
                  >
                    <Calculator className="w-4 h-4 text-amber-400" />
                    <span>Maliyetini Hesapla</span>
                  </Link>
                </div>
              </div>

              <div className={`lg:col-span-6 relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-800 ${
                index % 2 === 1 ? "lg:col-start-1" : ""
              }`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
