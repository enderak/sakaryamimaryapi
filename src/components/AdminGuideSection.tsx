"use client";

import { useState } from "react";
import { 
  BookOpen, 
  Search, 
  MapPin, 
  Bot, 
  Share2, 
  Sliders, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Tv, 
  Star, 
  FileCode,
  HelpCircle,
  Lightbulb,
  ArrowRight
} from "lucide-react";

interface AdminGuideSectionProps {
  canonicalUrl?: string;
}

export default function AdminGuideSection({ canonicalUrl = "https://www.sakaryamimaryapi.com" }: AdminGuideSectionProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeGuideSubtab, setActiveGuideSubtab] = useState<"search" | "maps" | "ai" | "social" | "modules">("search");

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const sitemapUrl = `${canonicalUrl}/sitemap.xml`;
  const rssUrl = `${canonicalUrl}/api/rss`;
  const llmsUrl = `${canonicalUrl}/llms.txt`;
  const bingAuthUrl = `${canonicalUrl}/BingSiteAuth.xml`;
  const robotsUrl = `${canonicalUrl}/robots.txt`;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>Yönetici Başucu Rehberi & Strateji Kılavuzu</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Sakarya Mimar Yapı Kullanım Kılavuzu
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Arama motorlarına kayıt, Google Haritalar&apos;da 1. sıraya yükselme, ChatGPT/Gemini optimizasyonu ve anasayfa modül yönetimi adımları.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Tüm Sistemler %100 Hazır & Yayında</span>
        </div>
      </div>

      {/* Hızlı Kopyalanabilir Bağlantılar Paneli */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white space-y-3 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Arama Motorlarına & Yapay Zekalara Gönderilecek Hazır Linkler</span>
          </span>
          <span className="text-[11px] text-slate-300">
            Kopyalamak için butona tıklayın
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Sitemap */}
          <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex flex-col justify-between gap-2 backdrop-blur-sm">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">XML Site Haritası (Google/Bing)</div>
              <div className="font-mono text-[11px] text-amber-300 truncate mt-0.5">{sitemapUrl}</div>
            </div>
            <button
              onClick={() => copyToClipboard(sitemapUrl, "sitemap")}
              className="inline-flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-lg bg-white/15 hover:bg-white/25 text-white font-semibold text-[11px] transition-colors"
            >
              {copiedKey === "sitemap" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === "sitemap" ? "Kopyalandı!" : "Linki Kopyala"}</span>
            </button>
          </div>

          {/* LLMs.txt */}
          <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex flex-col justify-between gap-2 backdrop-blur-sm">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Yapay Zeka Özeti (llms.txt)</div>
              <div className="font-mono text-[11px] text-purple-300 truncate mt-0.5">{llmsUrl}</div>
            </div>
            <button
              onClick={() => copyToClipboard(llmsUrl, "llms")}
              className="inline-flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-lg bg-white/15 hover:bg-white/25 text-white font-semibold text-[11px] transition-colors"
            >
              {copiedKey === "llms" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === "llms" ? "Kopyalandı!" : "Linki Kopyala"}</span>
            </button>
          </div>

          {/* RSS Feed */}
          <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex flex-col justify-between gap-2 backdrop-blur-sm">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Canlı RSS Beslemesi</div>
              <div className="font-mono text-[11px] text-cyan-300 truncate mt-0.5">{rssUrl}</div>
            </div>
            <button
              onClick={() => copyToClipboard(rssUrl, "rss")}
              className="inline-flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-lg bg-white/15 hover:bg-white/25 text-white font-semibold text-[11px] transition-colors"
            >
              {copiedKey === "rss" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === "rss" ? "Kopyalandı!" : "Linki Kopyala"}</span>
            </button>
          </div>

          {/* Bing XML */}
          <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex flex-col justify-between gap-2 backdrop-blur-sm">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Bing Doğrulama Dosyası</div>
              <div className="font-mono text-[11px] text-emerald-300 truncate mt-0.5">{bingAuthUrl}</div>
            </div>
            <button
              onClick={() => copyToClipboard(bingAuthUrl, "bing")}
              className="inline-flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-lg bg-white/15 hover:bg-white/25 text-white font-semibold text-[11px] transition-colors"
            >
              {copiedKey === "bing" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === "bing" ? "Kopyalandı!" : "Linki Kopyala"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Guide Sub-Nav Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1 text-xs sm:text-sm">
        <button
          onClick={() => setActiveGuideSubtab("search")}
          className={`pb-3 px-3 font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeGuideSubtab === "search"
              ? "border-[#0f2b5c] text-[#0f2b5c]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Search className="w-4 h-4 text-blue-600" />
          <span>1. Arama Motorlarına Kayıt</span>
        </button>

        <button
          onClick={() => setActiveGuideSubtab("maps")}
          className={`pb-3 px-3 font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeGuideSubtab === "maps"
              ? "border-[#0f2b5c] text-[#0f2b5c]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span>2. Google Haritalar & Yerler</span>
        </button>

        <button
          onClick={() => setActiveGuideSubtab("ai")}
          className={`pb-3 px-3 font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeGuideSubtab === "ai"
              ? "border-[#0f2b5c] text-[#0f2b5c]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Bot className="w-4 h-4 text-purple-600" />
          <span>3. Yapay Zekada Yer Alma (AIO)</span>
        </button>

        <button
          onClick={() => setActiveGuideSubtab("social")}
          className={`pb-3 px-3 font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeGuideSubtab === "social"
              ? "border-[#0f2b5c] text-[#0f2b5c]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Share2 className="w-4 h-4 text-rose-600" />
          <span>4. Sosyal Medya & Video</span>
        </button>

        <button
          onClick={() => setActiveGuideSubtab("modules")}
          className={`pb-3 px-3 font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeGuideSubtab === "modules"
              ? "border-[#0f2b5c] text-[#0f2b5c]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Sliders className="w-4 h-4 text-amber-600" />
          <span>5. Anasayfa Modül Kontrolü</span>
        </button>
      </div>

      {/* SUBTAB 1: ARAMA MOTORLARI REHBERİ */}
      {activeGuideSubtab === "search" && (
        <div className="space-y-6">
          <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-5 text-xs text-blue-900 space-y-2">
            <h3 className="font-extrabold text-sm text-[#0f2b5c] flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-600" />
              <span>Google, Microsoft Bing ve Yandex Kayıt & Onay Adımları</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Arama motorlarına sitenizi tanıtmak sadece 2 dakika sürer. Kod yüklemeye veya hosting paneline girmenize gerek yoktur; sistem tüm dosyaları otomatik olarak üretmektedir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Google Search Console */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs">G</span>
                  <span>Google Search Console</span>
                </span>
                <a
                  href="https://search.google.com/search-console"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50 transition-colors"
                  title="Google Search Console'u Aç"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <ol className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded text-[11px]">1</span>
                  <span><strong>Giriş Yapın:</strong> search.google.com/search-console adresine Gmail adresinizle girin.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded text-[11px]">2</span>
                  <span><strong>Mülk Ekleyin:</strong> &ldquo;URL Ön Eki&rdquo; seçeneğini seçip tam adresinizi (<code className="bg-slate-200 px-1 rounded">https://www.sakaryamimaryapi.com</code>) yazın.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded text-[11px]">3</span>
                  <span><strong>HTML Etiketini Alın:</strong> &ldquo;HTML Etiketi&rdquo; yöntemini seçip <code className="bg-slate-200 px-1 rounded">content=&quot;...&quot;</code> içindeki kodu kopyalayın.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded text-[11px]">4</span>
                  <span><strong>Panele Kaydedin:</strong> Admin paneli &ldquo;SEO & Yerel Geo&rdquo; sekmesindeki Google kutusuna yapıştırıp kaydedin.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded text-[11px]">5</span>
                  <span><strong>Site Haritası Gönderin:</strong> Google sol menüden <strong>Site Haritaları</strong> sekmesine gidip <code className="bg-blue-100 text-blue-800 font-bold px-1 rounded">sitemap.xml</code> yazarak gönderin.</span>
                </li>
              </ol>
            </div>

            {/* Microsoft Bing Webmaster */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-lg bg-cyan-600 text-white flex items-center justify-center text-xs">B</span>
                  <span>Microsoft Bing & Copilot</span>
                </span>
                <a
                  href="https://www.bing.com/webmasters"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-cyan-600 hover:text-cyan-800 rounded-lg hover:bg-cyan-50 transition-colors"
                  title="Bing Webmaster'ı Aç"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <ol className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-cyan-600 bg-cyan-100 px-1.5 py-0.5 rounded text-[11px]">1</span>
                  <span><strong>Kolay İçe Aktarma:</strong> bing.com/webmasters adresine girip <strong>&ldquo;Google Search Console&apos;dan İçe Aktar&rdquo;</strong> butonuna basın.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-cyan-600 bg-cyan-100 px-1.5 py-0.5 rounded text-[11px]">2</span>
                  <span><strong>Otomatik Onay:</strong> Bing, Google&apos;daki onayınızı ve sitemap linkinizi anında çeker.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-cyan-600 bg-cyan-100 px-1.5 py-0.5 rounded text-[11px]">3</span>
                  <span><strong>Manuel Kod Seçeneği:</strong> Size vereceği <code className="bg-slate-200 px-1 rounded">msvalidate.01</code> kodunu admin paneline yapıştırmanız yeterlidir. Sitede <code className="bg-slate-200 px-1 rounded">/BingSiteAuth.xml</code> dosyası hazır olduğu için anında doğrulanır.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-cyan-600 bg-cyan-100 px-1.5 py-0.5 rounded text-[11px]">4</span>
                  <span><strong>Copilot Etkisi:</strong> Bing onayı tamamlandığında Microsoft Copilot yapay zekası sitenizi kaynak listesine dahil eder.</span>
                </li>
              </ol>
            </div>

            {/* Yandex Webmaster */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center text-xs">Y</span>
                  <span>Yandex Webmaster</span>
                </span>
                <a
                  href="https://webmaster.yandex.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50 transition-colors"
                  title="Yandex Webmaster'ı Aç"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <ol className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded text-[11px]">1</span>
                  <span><strong>Siteyi Ekleyin:</strong> webmaster.yandex.com sayfasına girip sitenizi mülk olarak ekleyin.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded text-[11px]">2</span>
                  <span><strong>Doğrulama Kodu:</strong> Size vereceği meta etiketindeki kodu admin panelindeki Yandex alanına yapıştırın.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded text-[11px]">3</span>
                  <span><strong>Sitemap:</strong> Yandex Indexing menüsünden <code className="bg-red-100 text-red-800 font-bold px-1 rounded">sitemap.xml</code> linkinizi gönderin.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded text-[11px]">4</span>
                  <span><strong>Yandex Haritalar:</strong> Yandex Sprav (İşletme Rehberi) kaydınız da bu sayede otomatik eşleşir.</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: HARİTALAR REHBERİ */}
      {activeGuideSubtab === "maps" && (
        <div className="space-y-6">
          <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-5 text-xs text-emerald-950 space-y-2">
            <h3 className="font-extrabold text-sm text-emerald-900 flex items-center gap-2">
              <Star className="w-4 h-4 text-emerald-600" />
              <span>&ldquo;Sakarya Tadilat&rdquo; Aramasında Google Yerler (Local 3-Pack) 1. Sıra Formülü</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Kullanıcılar Google&apos;a &ldquo;sakarya tadilat&rdquo; veya &ldquo;serdivan ev yenileme&rdquo; yazdığında sayfanın en üstünde çıkan 3 harita kutucuğuna (Google Local 3-Pack) girmek için aşağıdaki adımları uygulayın.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>1. İşletme Adı & Anahtar Kelime Uyumu (GMB Name)</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Google Haritalar&apos;daki işletme adınızı sade &ldquo;Sakarya Mimar Yapı&rdquo; yerine paneldeki gibi <code className="bg-slate-200 px-1 rounded font-bold">Sakarya Mimar Yapı - Ev Tadilat & İnşaat Dekorasyon</code> olarak tanımlayın.
              </p>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-500">
                <strong>Neden önemli?</strong> Google harita algoritması doğrudan anahtar kelimeyi içeren işletmeleri yerel aramalarda öncelikli olarak ilk 3&apos;e taşır.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>2. 5 Yıldızlı Yorum İsteme Linki Stratejisi</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Google İşletme profilinizden &ldquo;Yorum İsteyin&rdquo; butonuna basıp kısa linki alın (örn. <code className="bg-slate-200 px-1 rounded">https://g.page/r/.../review</code>). Bu linki admin panelindeki alana kaydedin.
              </p>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-500">
                <strong>Taktik:</strong> İşi teslim ettiğiniz her müşteriye bu linki WhatsApp&apos;tan atarak 1 dakikada 5 yıldız vermesini rica edin. 15-20 olumlu yorum sizi bölgenin 1 numarası yapar.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>3. Place ID ve Harita Bağlantısı</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Google Haritalar profil linkinizi ve Place ID kodunuzu panele girdiğinizde, sitenizin altına ve kodlarına resmi <code className="bg-slate-200 px-1 rounded">Schema.org LocalBusiness</code> harita etiketi basılır.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>4. Apple Haritalar (Apple Business Connect)</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                iPhone kullanıcıları için <a href="https://businessconnect.apple.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-bold">businessconnect.apple.com</a> adresinden Apple Harita kartı açın. Sitenizdeki Applebot izni sayesinde Siri aramalarında en başta önerilirsiniz.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: YAPAY ZEKA REHBERİ */}
      {activeGuideSubtab === "ai" && (
        <div className="space-y-6">
          <div className="bg-purple-50/60 border border-purple-200/80 rounded-2xl p-5 text-xs text-purple-950 space-y-2">
            <h3 className="font-extrabold text-sm text-purple-900 flex items-center gap-2">
              <Bot className="w-4 h-4 text-purple-600" />
              <span>Yapay Zekalara (ChatGPT, Perplexity, Gemini, Claude) Kendini Tavsiye Ettirme</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Giderek daha fazla insan artık Google yerine ChatGPT veya Perplexity&apos;ye <em>&ldquo;Sakarya&apos;da anahtar teslim villa tadilatı için en güvenilir mimar kim?&rdquo;</em> diye soruyor. Sitenizin bu yanıtlarda 1. sırada önerilmesi için sistemde kurulu olan yapay zeka mekanizmaları:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* LLMs.txt */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-purple-600" />
                <span>1. /llms.txt Standardı</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Sitenizin kök dizininde çalışan <code className="bg-purple-100 text-purple-800 font-mono px-1 rounded">/llms.txt</code> dosyası, OpenAI, Anthropic ve Perplexity botlarının okuması için özel olarak tasarlanmış temiz bir markdown belgesidir.
              </p>
              <p className="text-slate-500 text-[11px]">
                Yapay zeka modelleri web sitesini tararken bu dosyayı okur; Asım Yılmazer ve Abdussamet Gültekin&apos;in telefonlarını, 2 yıl resmi garantiyi ve hizmet verilen ilçeleri doğrudan hafızasına kaydeder.
              </p>
            </div>

            {/* FAQPage JSON-LD */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>2. Soru & Cevap (FAQ Schema)</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Admin panelindeki <strong>&ldquo;Soru & Cevap Ekle&rdquo;</strong> alanından sorular ekleyin (örn: <em>&ldquo;Sakarya&apos;da komple ev tadilatı ne kadar sürer?&rdquo;</em>).
              </p>
              <p className="text-slate-500 text-[11px]">
                Google AI Overviews ve ChatGPT arama asistanları, kullanıcılara yanıt üretirken bu soruları ve verdiğiniz yanıtları doğrudan tırnak içinde kaynak göstererek sitenize link verir.
              </p>
            </div>

            {/* AI Summary Prompt */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>3. Doğrudan Bilgi Özeti</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Admin panelinde bulunan <strong>&ldquo;Yapay Zeka ve LLM Sistem Özeti&rdquo;</strong> metni sitenin meta kodlarına eklenir.
              </p>
              <p className="text-slate-500 text-[11px]">
                Yapay zekanın kullanıcıya sitenizi özetlerken referans alacağı resmi ve güven verici şirket künyesini dilediğiniz gibi güncelleyebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: SOSYAL MEDYA REHBERİ */}
      {activeGuideSubtab === "social" && (
        <div className="space-y-6">
          <div className="bg-rose-50/60 border border-rose-200/80 rounded-2xl p-5 text-xs text-rose-950 space-y-2">
            <h3 className="font-extrabold text-sm text-rose-900 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-rose-600" />
              <span>Instagram, YouTube ve TikTok Yönetimi & Güvenlik Kılavuzu</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Sosyal medya hesaplarınızı bağlayarak şantiye güvenilirliğinizi katlayabilir ve anasayfada video oynatıcısı gösterebilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Tv className="w-4 h-4 text-red-600" />
                <span>YouTube Video ve Shorts Ekleme</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Kanalınızdaki herhangi bir videonun veya YouTube Shorts bağlantısının linkini panele yapıştırmanız yeterlidir. Sistem video ID&apos;sini otomatik ayıklar ve panelde canlı önizlemesini gösterir.
              </p>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-500">
                <strong>Gizlilik Güvencesi:</strong> Video oynatıcı, Google&apos;ın resmi <code className="bg-slate-200 px-1 rounded">youtube-nocookie.com</code> gizlilik modu ve sandbox korumasıyla izole edilmiştir.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-rose-600" />
                <span>Instagram & TikTok Reels Kartları</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Anasayfada yer alan <strong>&ldquo;Sosyal Medyada Sakarya Mimar Yapı&rdquo;</strong> vitrinine istediğiniz kadar kısa şantiye videosu kartı ekleyebilirsiniz.
              </p>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-500">
                <strong>Nasıl Eklenir?</strong> &ldquo;Video Kartı Ekle&rdquo; butonuna basın, platformu (Instagram/TikTok/YouTube) seçin, videonun linkini ve tahmini izlenme rozetini (örn. &ldquo;24.5K İzlenme&rdquo;) yazıp kaydedin.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: ANASAYFA MODÜL REHBERİ */}
      {activeGuideSubtab === "modules" && (
        <div className="space-y-6">
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-5 text-xs text-amber-950 space-y-2">
            <h3 className="font-extrabold text-sm text-amber-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-600" />
              <span>Anasayfa Bölümlerini Açma, Kapatma ve Sıralama</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Sitedeki hiçbir bölüm sabit değildir. Dilediğiniz zaman istemediğiniz bölümü tek tıkla gizleyebilir veya yerini değiştirebilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span>👁️ Bölümü Gizle / Aç</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                &ldquo;Modülleri Aç / Kapat & Sırala&rdquo; sekmesindeki <strong>Göz</strong> ikonuna tıklayarak herhangi bir bölümü anında anasayfadan kaldırabilir veya tekrar açabilirsiniz.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span>⬆️ ⬇️ Yerini Değiştir</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Her modülün yanındaki <strong>Yukarı / Aşağı</strong> oklarına basarak bölümlerin anasayfadaki akış sırasını dilediğiniz gibi düzenleyebilirsiniz.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span>✏️ Başlık & Metinleri Değiştir</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                &ldquo;Modül İçeriklerini Düzenle&rdquo; sekmesinden Hero başlıklarını, Fiyat Hesaplayıcı açıklamalarını veya Hizmet metinlerini anında güncelleyebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Alt Destek & İletişim Kutusu */}
      <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Tüm değişiklikler kaydedildiği anda canlı sitede eşzamanlı olarak aktifleşir.</span>
        </div>
        <div className="text-slate-400 text-[11px]">
          Sakarya Mimar Yapı © 2026 Yönetim & Doğrulama Sistemi
        </div>
      </div>
    </div>
  );
}
