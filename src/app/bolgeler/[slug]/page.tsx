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
    <div className="bg-slate-950 text-white min-h-screen">
      {/* Hero section for District */}
      <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>Sakarya • {district.name} İlçesi Yerel Hizmet</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {district.headline}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
              {district.intro}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/${companyInfo.primaryWhatsapp}?text=${encodeURIComponent(
                  `Merhaba Sakarya Mimar Yapı, ${district.name} ilçesindeki evim için keşif ve tadilat teklifi almak istiyorum.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-xl transition-transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{district.name} İçin Keşif İste</span>
              </a>

              <a
                href={`tel:${district.phonePriority.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-bold text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
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
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {district.name} Bölgesinde Yaptığımız Çalışmalar
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Firmamız {district.name} lokasyonundaki konut tipleri, zemin koşulları ve yerel yönetim standartlarına tam hakimdir. Depreme dayanıklı malzeme kullanımı, enerji tasarrufu ve lüks mimari detayları bir arada sunuyoruz.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {district.servicesProvided.map((s, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-200">{s}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-200">
                <span className="font-bold text-amber-400 block mb-1">
                  ⭐ {district.popularProjects}
                </span>
                {district.name} sakinleri için her projede işçilik ve malzeme hatalarına karşı 2 yıl resmi garanti taahhüdü veriyoruz.
              </div>
            </div>

            {/* Other districts quick navigation */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider text-amber-400">
                Diğer Sakarya İlçeleri
              </h3>
              <p className="text-xs text-slate-400">
                Sakarya&apos;nın diğer tüm ilçelerinde de aktif ekiplerimizle hizmet veriyoruz:
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2">
                {sakaryaDistricts.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/bolgeler/${d.slug}`}
                    className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all ${
                      d.slug === slug
                        ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                        : "bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white"
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
