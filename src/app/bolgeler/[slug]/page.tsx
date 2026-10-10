import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { sakaryaDistricts, DistrictInfo } from "@/data/districts";
import { companyInfo } from "@/data/company";
import CostCalculator from "@/components/CostCalculator";
import { MapPin, Phone, MessageCircle, CheckCircle2, ShieldCheck, ArrowRight, Home } from "lucide-react";

export async function generateStaticParams() {
  return sakaryaDistricts.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const district = sakaryaDistricts.find((d) => d.slug === slug);

  if (!district) {
    return { title: "Bölge Bulunamadı | Sakarya Mimarlık" };
  }

  return {
    title: `${district.name} Ev Tadilatı, Mutfak Banyo & İnşaat | Sakarya Mimarlık`,
    description: `${district.name} bölgesinde anahtar teslim ev tadilatı, modern mutfak ve banyo yenileme, çatı izolasyon ve mimari projeler. Ücretsiz keşif ve 2 yıl garanti.`
  };
}

export default async function DistrictPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const district = sakaryaDistricts.find((d) => d.slug === slug);

  if (!district) {
    notFound();
  }

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* Hero section for District */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0f2b5c] text-xs font-semibold mb-4">
              <MapPin className="w-3.5 h-3.5 text-[#0f2b5c]" />
              <span>Sakarya • {district.name} İlçesi Yerel Hizmet</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {district.headline}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
              {district.intro}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/${companyInfo.primaryWhatsapp}?text=${encodeURIComponent(
                  `Merhaba Sakarya Mimar Yapı, ${district.name} ilçesindeki evim için keşif ve tadilat teklifi almak istiyorum.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition-transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{district.name} İçin Keşif İste</span>
              </a>

              <a
                href={`tel:${district.phonePriority.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-semibold text-sm transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 text-[#0f2b5c]" />
                <span>{district.phonePriority}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services and local details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {district.name} Bölgesinde Yaptığımız Çalışmalar
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Firmamız {district.name} lokasyonundaki konut tipleri, zemin koşulları ve yerel mimari standartlara tam hakimdir. Depreme dayanıklı malzeme kullanımı, enerji tasarrufu ve lüks mimari detayları bir arada sunuyoruz.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {district.servicesProvided.map((s, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-3 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">{s}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-white border border-blue-200 text-xs sm:text-sm text-slate-700 shadow-sm">
                <span className="font-bold text-[#0f2b5c] block mb-1">
                  ⭐ {district.popularProjects}
                </span>
                {district.name} sakinleri için her projede işçilik ve malzeme hatalarına karşı 2 yıl resmi garanti taahhüdü veriyoruz.
              </div>
            </div>

            {/* Other districts quick navigation */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
              <h3 className="text-base font-bold uppercase tracking-wider text-[#0f2b5c]">
                Diğer Sakarya İlçeleri
              </h3>
              <p className="text-xs text-slate-500">
                Sakarya&apos;nın diğer tüm ilçelerinde de aktif ekiplerimizle hizmet veriyoruz:
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2">
                {sakaryaDistricts.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/bolgeler/${d.slug}`}
                    className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all ${
                      d.slug === slug
                        ? "bg-[#0f2b5c] text-white border-[#0f2b5c] font-bold shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:border-[#0f2b5c]/40 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <span>{d.name}</span>
                    <ArrowRight className="w-3 h-3 opacity-60" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Cost Calculator */}
      <CostCalculator />
    </div>
  );
}
