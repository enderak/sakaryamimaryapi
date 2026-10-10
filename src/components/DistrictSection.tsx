import Link from "next/link";
import { sakaryaDistricts } from "@/data/districts";
import { companyInfo } from "@/data/company";
import { MapPin, ArrowRight, ShieldCheck, PhoneCall } from "lucide-react";

export default function DistrictSection() {
  return (
    <section className="py-24 bg-[#121316] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-[#c5ad97] text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin className="w-4 h-4" />
            <span>Sakarya Geneli Hizmet Ağı</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            İlçenize Özel <span className="text-[#c5ad97]">Tadilat & İnşaat</span> Çözümleri
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Sakarya&apos;nın her ilçesinin mimari karakterine ve iklim koşullarına uygun uzman usta ve teknik kadromuzla adrese teslim hizmet veriyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sakaryaDistricts.map((district) => (
            <div
              key={district.slug}
              className="group bg-[#18191d] rounded-2xl p-6 border border-[#2b2d35] hover:border-[#c5ad97]/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#c5ad97]/10 border border-[#c5ad97]/25 text-[#c5ad97] flex items-center justify-center font-bold group-hover:bg-[#c5ad97] group-hover:text-[#121316] transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Sakarya
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-[#ded0c3] transition-colors">
                  {district.name}
                </h3>
                <p className="mt-2 text-xs text-slate-300 line-clamp-3">
                  {district.intro}
                </p>

                <div className="mt-4 pt-4 border-t border-[#2b2d35] space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-400">
                    Öne Çıkan Hizmetler:
                  </div>
                  {district.servicesProvided.slice(0, 3).map((s, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5ad97]"></span>
                      <span className="truncate">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-[#2b2d35] flex items-center justify-between">
                <Link
                  href={`/bolgeler/${district.slug}`}
                  className="text-xs font-semibold text-[#ded0c3] hover:text-[#c5ad97] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Bölge Detayı</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`tel:${companyInfo.team[0].rawPhone}`}
                  className="text-slate-400 hover:text-white transition-colors"
                  title="Doğrudan Ara"
                >
                  <PhoneCall className="w-4 h-4 text-[#c5ad97]" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Local Guarantee Callout */}
        <div className="mt-12 bg-[#18191d] border border-[#c5ad97]/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#c5ad97] text-[#121316] flex items-center justify-center shrink-0 font-black">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-black text-white">
                Sakarya İçi Ücretsiz Keşif Sözümüz
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
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
            className="px-6 py-3.5 rounded-xl bg-[#c5ad97] hover:bg-[#ded0c3] text-[#121316] font-bold text-sm shrink-0 shadow-lg shadow-black/40 transition-all hover:scale-105"
          >
            Ücretsiz Keşif Randevusu Al
          </a>
        </div>
      </div>
    </section>
  );
}
