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
    <div className="py-20 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0f2b5c] text-xs font-bold uppercase tracking-wider mb-2">
            <Hammer className="w-4 h-4 text-[#0f2b5c]" />
            <span>Kapsamlı Yapı Hizmetleri</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Sakarya&apos;da Sunduğumuz <span className="text-[#0f2b5c]">Hizmetler</span>
          </h1>
          <p className="mt-4 text-slate-600 text-base">
            Tüm tadilat ve inşaat süreçlerinde resmi sözleşme, kaliteli 1. sınıf malzeme ve 2 yıl işçilik garantisi veriyoruz.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              <div className={`lg:col-span-6 space-y-4 ${index % 2 === 1 ? "lg:col-start-7" : ""}`}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0f2b5c] text-xs font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#0f2b5c]" />
                  <span>En Çok: {service.popularIn.join(", ")}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {service.title}
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs uppercase font-bold text-[#0f2b5c] tracking-wider mb-3">
                    Hizmet Kapsamımız:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
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
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0f2b5c] hover:bg-[#153a7a] text-white font-bold text-xs transition-colors shadow-md"
                  >
                    <span>Ücretsiz Keşif İste</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <Link
                    href="/#fiyat-hesapla"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-300 transition-colors shadow-sm"
                  >
                    <Calculator className="w-4 h-4 text-[#0f2b5c]" />
                    <span>Maliyetini Hesapla</span>
                  </Link>
                </div>
              </div>

              <div className={`lg:col-span-6 relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-sm ${
                index % 2 === 1 ? "lg:col-start-1" : ""
              }`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
