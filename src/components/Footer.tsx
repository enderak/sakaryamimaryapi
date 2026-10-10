import Link from "next/link";
import { Compass, Phone, Mail, MapPin, Clock, ShieldCheck, Heart, Globe, UserCheck } from "lucide-react";
import { sakaryaDistricts } from "@/data/districts";
import { services } from "@/data/services";
import { companyInfo } from "@/data/company";
import { getSocialMediaConfig } from "@/lib/socialStorage";

export default function Footer() {
  const socialConfig = getSocialMediaConfig();
  const { channels } = socialConfig;

  return (
    <footer className="bg-[#0a152d] text-slate-300 border-t border-[#16274a] text-sm">
      {/* Top Banner */}
      <div className="bg-[#0d1d3d] border-b border-[#16274a] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Resmi Sözleşme Güvencesi</h4>
              <p className="text-xs text-slate-300 mt-0.5">Teslim tarihi ve malzeme listesi resmi taahhüt altındadır.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 text-amber-400 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Sakarya İçi Ücretsiz Keşif</h4>
              <p className="text-xs text-slate-300 mt-0.5">Serdivan, Adapazarı, Sapanca ve tüm ilçelere yerinde ölçüm.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Gününde & Saatinde Teslimat</h4>
              <p className="text-xs text-slate-300 mt-0.5">Geciken her gün için sözleşmeli tazminat garantisi.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  SAKARYA <span className="text-amber-400">MİMAR YAPI</span>
                </span>
                <p className="text-[10px] uppercase tracking-wider text-slate-300 font-medium">
                  {companyInfo.tagline}
                </p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
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
              <div className="pt-3 border-t border-[#16274a] space-y-2">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Yetkili İletişim Hatları:
                </div>
                {companyInfo.team.map((person, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-[#0d1d3d] p-3 rounded-xl border border-[#16274a]">
                    <div>
                      <div className="text-white font-bold text-xs flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>{person.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">{person.role}</div>
                    </div>
                    <a
                      href={`tel:${person.rawPhone}`}
                      className="text-amber-400 hover:text-amber-300 font-bold text-xs ml-2"
                    >
                      {person.phone}
                    </a>
                  </div>
                ))}
              </div>

              {/* Social Media Channels */}
              <div className="pt-3 border-t border-[#16274a] space-y-2">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Sosyal Medya Kanallarımız:
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {channels.instagram?.enabled && channels.instagram.url && (
                    <a
                      href={channels.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Instagram: ${channels.instagram.handle}`}
                      className="w-8 h-8 rounded-xl bg-white/5 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 border border-white/10 hover:border-transparent text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}

                  {channels.youtube?.enabled && channels.youtube.channelUrl && (
                    <a
                      href={channels.youtube.channelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`YouTube: ${channels.youtube.handle}`}
                      className="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-600 border border-white/10 hover:border-transparent text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  )}

                  {channels.tiktok?.enabled && channels.tiktok.url && (
                    <a
                      href={channels.tiktok.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`TikTok: ${channels.tiktok.handle}`}
                      className="w-8 h-8 rounded-xl bg-white/5 hover:bg-black border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                      </svg>
                    </a>
                  )}

                  {channels.facebook?.enabled && channels.facebook.url && (
                    <a
                      href={channels.facebook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Facebook"
                      className="w-8 h-8 rounded-xl bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-transparent text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  )}

                  {channels.pinterest?.enabled && channels.pinterest.url && (
                    <a
                      href={channels.pinterest.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Pinterest"
                      className="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-700 border border-white/10 hover:border-transparent text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.365-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                </div>
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
                  <Link href="/hizmetler" className="text-slate-300 hover:text-amber-300 transition-colors">
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
                  <Link href={`/bolgeler/${d.slug}`} className="text-slate-300 hover:text-amber-300 transition-colors">
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
                <Link href="/projeler" className="text-slate-300 hover:text-amber-300 transition-colors">
                  Tamamlanan Projeler
                </Link>
              </li>
              <li>
                <Link href="/projeler" className="text-slate-300 hover:text-amber-300 transition-colors">
                  Öncesi / Sonrası Galerisi
                </Link>
              </li>
              <li>
                <a href="#fiyat-hesapla" className="text-slate-300 hover:text-amber-300 transition-colors font-semibold">
                  ⚡ 2026 Fiyat Hesaplayıcı
                </a>
              </li>
              <li>
                <Link href="/haberler" className="text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  Sektör Haberleri (RSS)
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-300 hover:text-amber-300 transition-colors">
                  Tadilat & Maliyet Rehberi
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-slate-300 hover:text-amber-300 transition-colors">
                  İletişim & Konum
                </Link>
              </li>
              <li className="pt-2 border-t border-[#16274a]">
                <Link href="/kvkk-aydinlatma-metni" className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>🔒 KVKK Aydınlatma Metni</span>
                </Link>
              </li>
              <li>
                <Link href="/cerez-politikasi" className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>🍪 Çerez Politikası</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-12 mt-12 border-t border-[#16274a] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Sakarya Mimar Yapı İnşaat Dekorasyon Tadilat. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/admin/moduller" className="text-amber-400 hover:text-amber-300 font-bold transition-colors flex items-center gap-1">
              <span>⚙️ Modül Yönetimi</span>
            </Link>
            <span>•</span>
            <Link href="/kvkk-aydinlatma-metni" className="hover:text-amber-300 transition-colors">
              KVKK Metni
            </Link>
            <span>•</span>
            <Link href="/cerez-politikasi" className="hover:text-amber-300 transition-colors">
              Çerez Tercihleri
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-300">
              Serdivan / Sakarya <Heart className="w-3 h-3 text-amber-400 fill-amber-400" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
