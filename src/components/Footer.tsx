import Link from "next/link";
import { Compass, Phone, Mail, MapPin, Clock, ShieldCheck, Heart, Globe, UserCheck } from "lucide-react";
import { sakaryaDistricts } from "@/data/districts";
import { services } from "@/data/services";
import { companyInfo } from "@/data/company";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      {/* Top Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Resmi Sözleşme Güvencesi</h4>
              <p className="text-xs text-slate-400 mt-0.5">Teslim tarihi ve malzeme listesi resmi taahhüt altındadır.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Sakarya İçi Ücretsiz Keşif</h4>
              <p className="text-xs text-slate-400 mt-0.5">Serdivan, Adapazarı, Sapanca ve tüm ilçelere yerinde ölçüm.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Gününde & Saatinde Teslimat</h4>
              <p className="text-xs text-slate-400 mt-0.5">Geciken her gün için sözleşmeli kira tazminatı garantisi.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  SAKARYA <span className="text-amber-400">MİMAR YAPI</span>
                </span>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                  {companyInfo.tagline}
                </p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Serdivan merkezli ofisimizle; anahtar teslim ev tadilatı, lüks banyo mutfak yenileme, Sapanca villa yapımı ve mimari dekorasyonda Sakarya&apos;nın güvenilir adresi.
            </p>

            <div className="pt-2 space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{companyInfo.address}</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={companyInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-white font-bold">
                  {companyInfo.displayWebsite}
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-white">
                  {companyInfo.email}
                </a>
              </div>

              {/* Team Contact Cards */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Yetkili İletişim Hatları:
                </div>
                {companyInfo.team.map((person, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <div>
                      <div className="text-white font-bold text-xs flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{person.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">{person.role}</div>
                    </div>
                    <a
                      href={`tel:${person.rawPhone}`}
                      className="text-amber-400 hover:text-amber-300 font-extrabold text-xs ml-2"
                    >
                      {person.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Hizmetlerimiz */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Hizmetlerimiz
            </h4>
            <ul className="space-y-2 text-xs">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href="/hizmetler" className="hover:text-amber-400 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Sakarya İlçeleri */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Hizmet Bölgeleri
            </h4>
            <ul className="space-y-2 text-xs">
              {sakaryaDistricts.map((d) => (
                <li key={d.slug}>
                  <Link href={`/bolgeler/${d.slug}`} className="hover:text-amber-400 transition-colors">
                    {d.name} Tadilat & Yapı
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Hızlı Bağlantılar & RSS */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Kurumsal & Bilgi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/projeler" className="hover:text-amber-400 transition-colors">
                  Tamamlanan Projeler
                </Link>
              </li>
              <li>
                <Link href="/projeler" className="hover:text-amber-400 transition-colors">
                  Öncesi / Sonrası Galerisi
                </Link>
              </li>
              <li>
                <a href="#fiyat-hesapla" className="hover:text-amber-400 transition-colors font-bold text-amber-400">
                  ⚡ 2026 Fiyat Hesaplayıcı
                </a>
              </li>
              <li>
                <Link href="/haberler" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Sektör Haberleri (RSS)
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-400 transition-colors">
                  Tadilat & Maliyet Rehberi
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-amber-400 transition-colors">
                  İletişim & Konum
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-900">
                <Link href="/kvkk-aydinlatma-metni" className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>🔒 KVKK Aydınlatma Metni</span>
                </Link>
              </li>
              <li>
                <Link href="/cerez-politikasi" className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>🍪 Çerez Politikası</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-12 mt-12 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Sakarya Mimar Yapı İnşaat Dekorasyon Tadilat. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/kvkk-aydinlatma-metni" className="hover:text-amber-400 transition-colors">
              KVKK Metni
            </Link>
            <span>•</span>
            <Link href="/cerez-politikasi" className="hover:text-amber-400 transition-colors">
              Çerez Tercihleri
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1">
              Serdivan / Sakarya <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
