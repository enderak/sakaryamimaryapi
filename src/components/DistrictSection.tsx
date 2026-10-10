import Link from "next/link";
import { sakaryaDistricts } from "@/data/districts";
import { companyInfo } from "@/data/company";
import { MapPin, ArrowRight, ShieldCheck, PhoneCall } from "lucide-react";

export default function DistrictSection() {
  return (
    <section className="py-24 bg-slate-50 text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0f2b5c] text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin className="w-4 h-4 text-[#0f2b5c]" />
            <span>Sakarya Geneli Hizmet Ağı</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            İlçenize Özel <span className="text-[#0f2b5c]">Tadilat & İnşaat</span> Çözümleri
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Sakarya&apos;nın her ilçesinin mimari karakterine ve iklim koşullarına uygun uzman usta ve teknik kadromuzla adrese teslim hizmet veriyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sakaryaDistricts.map((district) => (
            <div
              key={district.slug}
              className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#0f2b5c]/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#0f2b5c] flex items-center justify-center font-bold group-hover:bg-[#0f2b5c] group-hover:text-white transition-colors shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Sakarya
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0f2b5c] transition-colors">
                  {district.name}
                </h3>
                <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {district.intro}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-500">
                    Öne Çıkan Hizmetler:
                  </div>
                  {district.servicesProvided.slice(0, 3).map((s, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      <span className="truncate">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/bolgeler/${district.slug}`}
                  className="text-xs font-semibold text-[#0f2b5c] hover:text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Bölge Detayı</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`tel:${companyInfo.team[0].rawPhone}`}
                  className="text-slate-400 hover:text-[#0f2b5c] transition-colors"
                  title="Doğrudan Ara"
                >
                  <PhoneCall className="w-4 h-4 text-[#0f2b5c]" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Local Guarantee Callout */}
        <div className="mt-12 bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0f2b5c] text-white flex items-center justify-center shrink-0 font-black shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-900">
                Sakarya İçi Ücretsiz Keşif Sözümüz
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Konumunuz neresi olursa olsun; mimarımız adresinize gelir, lazer ölçüm yapar ve 3D ön projenizi bedelsiz hazırlar.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${companyInfo.primaryWhatsapp}?text=${encodeURIComponent(
              "Merhaba Sakarya Mimar Yapı, ücretsiz keşif randevusu almak istiyorum."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-[#0f2b5c] hover:bg-[#153a7a] text-white font-bold text-sm shrink-0 shadow-md transition-all hover:scale-105"
          >
            Ücretsiz Keşif Randevusu Al
          </a>
        </div>
      </div>
    </section>
  );
}
