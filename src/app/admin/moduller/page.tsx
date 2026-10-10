"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Sliders, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Edit3, 
  Layers, 
  ExternalLink,
  ChevronRight,
  LogOut,
  UserCheck,
  Globe,
  MapPin,
  Search,
  FileCode,
  Check,
  Store,
  ShoppingBag,
  Plus,
  Trash2,
  Map,
  Star
} from "lucide-react";
import { HomePageModulesConfig, defaultHomeModulesConfig } from "@/data/homeModules";
import { SeoGeoConfig, defaultSeoGeoConfig, MerchantServiceOffer } from "@/data/seoGeo";

export default function AdminModulesPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(null);
  const [config, setConfig] = useState<HomePageModulesConfig | null>(null);
  const [seoConfig, setSeoConfig] = useState<SeoGeoConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"visibility" | "content" | "seo">("visibility");
  const [selectedModuleKey, setSelectedModuleKey] = useState<string>("hero");

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    try {
      setLoading(true);
      // 1. Check Session
      const authRes = await fetch("/api/auth");
      const authData = await authRes.json();
      if (!authData.authenticated) {
        router.push("/admin/login");
        return;
      }
      setCurrentUser(authData.session);

      // 2. Fetch Modules Config
      const res = await fetch("/api/modules");
      const data = await res.json();
      if (data.success && data.config) {
        setConfig(data.config);
      } else {
        setConfig(defaultHomeModulesConfig);
      }

      // 3. Fetch SEO Config
      const seoRes = await fetch("/api/seo");
      const seoData = await seoRes.json();
      if (seoData.success && seoData.config) {
        setSeoConfig(seoData.config);
      } else {
        setSeoConfig(defaultSeoGeoConfig);
      }
    } catch (e) {
      console.error(e);
      setConfig(defaultHomeModulesConfig);
      setSeoConfig(defaultSeoGeoConfig);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSeo = async () => {
    if (!seoConfig) return;
    try {
      setSaving(true);
      setStatusMessage(null);
      const res = await fetch("/api/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config: seoConfig })
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({ type: "success", text: "SEO, Meta ve Geo etiketleri başarıyla güncellendi!" });
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        setStatusMessage({ type: "error", text: data.message || "Kaydedilemedi." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "SEO kaydedilirken sunucu hatası oluştu." });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" })
      });
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  const handleToggle = (key: keyof HomePageModulesConfig["sections"]) => {
    if (!config) return;
    setConfig({
      ...config,
      sections: {
        ...config.sections,
        [key]: {
          ...config.sections[key],
          enabled: !config.sections[key].enabled
        }
      }
    });
  };

  const handleMove = (key: keyof HomePageModulesConfig["sections"], direction: "up" | "down") => {
    if (!config) return;
    const sorted = Object.entries(config.sections).sort((a, b) => a[1].order - b[1].order);
    const index = sorted.findIndex(([k]) => k === key);
    if (index === -1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sorted.length) return;

    // Swap orders
    const currentItem = sorted[index];
    const targetItem = sorted[targetIndex];

    const currentOrder = currentItem[1].order;
    const targetOrder = targetItem[1].order;

    setConfig({
      ...config,
      sections: {
        ...config.sections,
        [currentItem[0]]: { ...currentItem[1], order: targetOrder },
        [targetItem[0]]: { ...targetItem[1], order: currentOrder }
      }
    });
  };

  const handleSave = async () => {
    if (!config) return;
    try {
      setSaving(true);
      setStatusMessage(null);
      const res = await fetch("/api/modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config })
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({ type: "success", text: "Değişiklikler anında anasayfaya yansıtıldı!" });
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        setStatusMessage({ type: "error", text: data.message || "Kaydedilemedi." });
      }
    } catch (e) {
      console.error(e);
      setStatusMessage({ type: "error", text: "Bir sunucu hatası meydana geldi." });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm("Tüm anasayfa modül sıralama ve içerik ayarlarını orijinal fabrika ayarlarına sıfırlamak istiyor musunuz?")) {
      return;
    }
    try {
      setSaving(true);
      const res = await fetch("/api/modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" })
      });
      const data = await res.json();
      if (data.success && data.config) {
        setConfig(data.config);
        setStatusMessage({ type: "success", text: "Ayarlar başarıyla varsayılana sıfırlandı." });
        setTimeout(() => setStatusMessage(null), 4000);
      }
    } catch (e) {
      console.error(e);
      setStatusMessage({ type: "error", text: "Sıfırlama başarısız oldu." });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !config) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#0f2b5c] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-600 font-medium text-sm">Modül Yönetim Paneli Yükleniyor...</p>
        </div>
      </div>
    );
  }

  const sortedSections = Object.entries(config.sections).sort((a, b) => a[1].order - b[1].order);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0f2b5c] text-xs font-bold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5 text-[#0f2b5c]" />
              <span>Anasayfa Modül & İçerik Yönetimi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Anasayfa Bölüm Kontrol Paneli
            </h1>
            <p className="mt-1 text-slate-600 text-sm max-w-2xl">
              Anasayfadaki 9 farklı bölümü tek tıkla gizleyebilir, yerlerini yukarı/aşağı taşıyabilir ve başlık/açıklama metinlerini anında güncelleyebilirsiniz.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {currentUser && (
              <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{currentUser.email}</span>
              </div>
            )}

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-300 transition-colors shadow-xs"
            >
              <ExternalLink className="w-4 h-4 text-[#0f2b5c]" />
              <span>Siteyi Gör</span>
            </Link>

            <button
              onClick={handleReset}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-rose-50 text-rose-600 font-semibold text-xs border border-rose-200 transition-colors"
              title="Varsayılan Ayarlara Sıfırla"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Sıfırla</span>
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0f2b5c] hover:bg-[#163a75] text-white font-bold text-xs shadow-md shadow-blue-900/10 transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>{saving ? "Kaydediliyor..." : "Değişiklikleri Yayınla"}</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-rose-700 font-semibold text-xs border border-slate-300 transition-colors"
              title="Güvenli Çıkış Yap"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>

        {/* Status Alert */}
        {statusMessage && (
          <div
            className={`p-4 rounded-2xl border flex items-center gap-3 ${
              statusMessage.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span className="text-sm font-semibold">{statusMessage.text}</span>
          </div>
        )}

        {/* Tabs: Visibility & Order vs Content Editing */}
        <div className="flex border-b border-slate-200 gap-3">
          <button
            onClick={() => setActiveTab("visibility")}
            className={`pb-3 px-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "visibility"
                ? "border-[#0f2b5c] text-[#0f2b5c]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Modülleri Aç / Kapat & Sırala</span>
          </button>

          <button
            onClick={() => setActiveTab("content")}
            className={`pb-3 px-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "content"
                ? "border-[#0f2b5c] text-[#0f2b5c]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Modül İçerik & Başlıklarını Düzenle</span>
          </button>

          <button
            onClick={() => setActiveTab("seo")}
            className={`pb-3 px-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "seo"
                ? "border-[#0f2b5c] text-[#0f2b5c]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Globe className="w-4 h-4 text-amber-500" />
            <span>SEO & Yerel Geo (Harita) Yönetimi</span>
          </button>
        </div>

        {/* TAB 1: VISIBILITY & ORDER */}
        {activeTab === "visibility" && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs uppercase font-extrabold text-[#0f2b5c] tracking-wider">
                Anasayfa Bölüm Sıralaması ve Aktiflik Durumu
              </span>
              <span className="text-xs text-slate-500">
                Toplam {sortedSections.length} Bölüm ({sortedSections.filter(([_, s]) => s.enabled).length} Aktif)
              </span>
            </div>

            <div className="space-y-3">
              {sortedSections.map(([key, section], idx) => {
                const isFirst = idx === 0;
                const isLast = idx === sortedSections.length - 1;

                return (
                  <div
                    key={key}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition-all ${
                      section.enabled
                        ? "bg-slate-50/70 border-slate-200 hover:border-blue-200"
                        : "bg-slate-100/60 border-dashed border-slate-300 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 mb-3 sm:mb-0">
                      <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-[#0f2b5c] font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                        {idx + 1}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900">
                            {section.name}
                          </h3>
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                              section.enabled
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-slate-200 text-slate-600"
                            }`}
                          >
                            {section.enabled ? "Görünüyor" : "Gizli"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {section.description}
                        </p>
                      </div>
                    </div>

                    {/* Actions: Toggle and Move */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => handleToggle(key as keyof HomePageModulesConfig["sections"])}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                          section.enabled
                            ? "bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200"
                            : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200"
                        }`}
                      >
                        {section.enabled ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5 text-amber-600" />
                            <span>Kapat</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Aç</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center rounded-xl bg-white border border-slate-200 p-0.5 shadow-xs">
                        <button
                          onClick={() => handleMove(key as keyof HomePageModulesConfig["sections"], "up")}
                          disabled={isFirst}
                          className="p-1.5 text-slate-600 hover:text-[#0f2b5c] hover:bg-slate-100 rounded-lg disabled:opacity-25"
                          title="Yukarı Taşı"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMove(key as keyof HomePageModulesConfig["sections"], "down")}
                          disabled={isLast}
                          className="p-1.5 text-slate-600 hover:text-[#0f2b5c] hover:bg-slate-100 rounded-lg disabled:opacity-25"
                          title="Aşağı Taşı"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedModuleKey(key);
                          setActiveTab("content");
                        }}
                        className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-[#0f2b5c] hover:border-slate-300 shadow-xs transition-colors"
                        title="İçeriği Düzenle"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: CONTENT EDITING */}
        {activeTab === "content" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Module Selector */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-2 h-fit">
              <span className="text-xs uppercase font-extrabold text-[#0f2b5c] tracking-wider px-3 pb-2 block border-b border-slate-100">
                Düzenlenecek Bölüm Seçin
              </span>
              {sortedSections.map(([key, sec]) => (
                <button
                  key={key}
                  onClick={() => setSelectedModuleKey(key)}
                  className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between text-xs font-bold ${
                    selectedModuleKey === key
                      ? "bg-[#0f2b5c] text-white shadow-sm"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center text-[10px]">
                      {sec.order}
                    </span>
                    <span>{sec.name}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${selectedModuleKey === key ? "text-amber-400" : "text-slate-400"}`} />
                </button>
              ))}
            </div>

            {/* Content Edit Form */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* HERO FORM */}
              {selectedModuleKey === "hero" && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-lg font-bold text-slate-900">Hero (Ana Karşılama) Metinleri</h2>
                    <p className="text-xs text-slate-500">Ziyaretçiyi karşılayan ana manşet ve rozet detayları</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Üst Konum Rozeti</label>
                    <input
                      type="text"
                      value={config.content.hero.badgeLocation}
                      onChange={(e) => setConfig({
                        ...config,
                        content: {
                          ...config.content,
                          hero: { ...config.content.hero, badgeLocation: e.target.value }
                        }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Rozet Yan Notu</label>
                    <input
                      type="text"
                      value={config.content.hero.badgeNote}
                      onChange={(e) => setConfig({
                        ...config,
                        content: {
                          ...config.content,
                          hero: { ...config.content.hero, badgeNote: e.target.value }
                        }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Başlık 1. Satır</label>
                      <input
                        type="text"
                        value={config.content.hero.titleLine1}
                        onChange={(e) => setConfig({
                          ...config,
                          content: {
                            ...config.content,
                            hero: { ...config.content.hero, titleLine1: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Vurgulu Renkli Metin</label>
                      <input
                        type="text"
                        value={config.content.hero.titleHighlight}
                        onChange={(e) => setConfig({
                          ...config,
                          content: {
                            ...config.content,
                            hero: { ...config.content.hero, titleHighlight: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0f2b5c] font-bold focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Başlık Bitiş Satırı</label>
                    <input
                      type="text"
                      value={config.content.hero.titleLine2}
                      onChange={(e) => setConfig({
                        ...config,
                        content: {
                          ...config.content,
                          hero: { ...config.content.hero, titleLine2: e.target.value }
                        }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Açıklama Paragrafı</label>
                    <textarea
                      rows={3}
                      value={config.content.hero.description}
                      onChange={(e) => setConfig({
                        ...config,
                        content: {
                          ...config.content,
                          hero: { ...config.content.hero, description: e.target.value }
                        }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    />
                  </div>
                </div>
              )}

              {/* SLIDER FORM */}
              {selectedModuleKey === "constructionSlider" && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-lg font-bold text-slate-900">İnşaat Projeleri Slider Başlıkları</h2>
                    <p className="text-xs text-slate-500">Slider üstündeki rozet ve ana başlık ayarları</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Rozet Metni</label>
                    <input
                      type="text"
                      value={config.content.constructionSlider.badgeText}
                      onChange={(e) => setConfig({
                        ...config,
                        content: {
                          ...config.content,
                          constructionSlider: { ...config.content.constructionSlider, badgeText: e.target.value }
                        }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ana Başlık</label>
                      <input
                        type="text"
                        value={config.content.constructionSlider.sectionTitle}
                        onChange={(e) => setConfig({
                          ...config,
                          content: {
                            ...config.content,
                            constructionSlider: { ...config.content.constructionSlider, sectionTitle: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Vurgulu Başlık</label>
                      <input
                        type="text"
                        value={config.content.constructionSlider.sectionSubtitle}
                        onChange={(e) => setConfig({
                          ...config,
                          content: {
                            ...config.content,
                            constructionSlider: { ...config.content.constructionSlider, sectionSubtitle: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0f2b5c] font-bold focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SERVICES FORM */}
              {selectedModuleKey === "services" && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-lg font-bold text-slate-900">Hizmetlerimiz Bölümü</h2>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Rozet Metni</label>
                    <input
                      type="text"
                      value={config.content.services.badge}
                      onChange={(e) => setConfig({
                        ...config,
                        content: {
                          ...config.content,
                          services: { ...config.content.services, badge: e.target.value }
                        }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ana Başlık</label>
                      <input
                        type="text"
                        value={config.content.services.title}
                        onChange={(e) => setConfig({
                          ...config,
                          content: {
                            ...config.content,
                            services: { ...config.content.services, title: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Vurgulu Başlık</label>
                      <input
                        type="text"
                        value={config.content.services.titleHighlight}
                        onChange={(e) => setConfig({
                          ...config,
                          content: {
                            ...config.content,
                            services: { ...config.content.services, titleHighlight: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0f2b5c] font-bold focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Açıklama</label>
                    <textarea
                      rows={2}
                      value={config.content.services.description}
                      onChange={(e) => setConfig({
                        ...config,
                        content: {
                          ...config.content,
                          services: { ...config.content.services, description: e.target.value }
                        }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    />
                  </div>
                </div>
              )}

              {/* PROJECTS FORM */}
              {selectedModuleKey === "projects" && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-lg font-bold text-slate-900">Projeler Galerisi</h2>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Rozet Metni</label>
                    <input
                      type="text"
                      value={config.content.projects.badge}
                      onChange={(e) => setConfig({
                        ...config,
                        content: {
                          ...config.content,
                          projects: { ...config.content.projects, badge: e.target.value }
                        }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ana Başlık</label>
                      <input
                        type="text"
                        value={config.content.projects.title}
                        onChange={(e) => setConfig({
                          ...config,
                          content: {
                            ...config.content,
                            projects: { ...config.content.projects, title: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Vurgulu Başlık</label>
                      <input
                        type="text"
                        value={config.content.projects.titleHighlight}
                        onChange={(e) => setConfig({
                          ...config,
                          content: {
                            ...config.content,
                            projects: { ...config.content.projects, titleHighlight: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0f2b5c] font-bold focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Açıklama</label>
                    <textarea
                      rows={2}
                      value={config.content.projects.description}
                      onChange={(e) => setConfig({
                        ...config,
                        content: {
                          ...config.content,
                          projects: { ...config.content.projects, description: e.target.value }
                        }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    />
                  </div>
                </div>
              )}

              {/* CALCULATOR FORM */}
              {selectedModuleKey === "calculator" && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-lg font-bold text-slate-900">Maliyet Hesaplayıcı</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ana Başlık</label>
                      <input
                        type="text"
                        value={config.content.calculator.title}
                        onChange={(e) => setConfig({
                          ...config,
                          content: {
                            ...config.content,
                            calculator: { ...config.content.calculator, title: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Vurgulu Başlık</label>
                      <input
                        type="text"
                        value={config.content.calculator.titleHighlight}
                        onChange={(e) => setConfig({
                          ...config,
                          content: {
                            ...config.content,
                            calculator: { ...config.content.calculator, titleHighlight: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0f2b5c] font-bold focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Açıklama</label>
                    <textarea
                      rows={2}
                      value={config.content.calculator.description}
                      onChange={(e) => setConfig({
                        ...config,
                        content: {
                          ...config.content,
                          calculator: { ...config.content.calculator, description: e.target.value }
                        }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    />
                  </div>
                </div>
              )}

              {/* DISTRICTS FORM */}
              {selectedModuleKey === "districts" && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-lg font-bold text-slate-900">Sakarya İlçeleri Bölümü</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ana Başlık</label>
                      <input
                        type="text"
                        value={config.content.districts.title}
                        onChange={(e) => setConfig({
                          ...config,
                          content: {
                            ...config.content,
                            districts: { ...config.content.districts, title: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Vurgulu Başlık</label>
                      <input
                        type="text"
                        value={config.content.districts.titleHighlight}
                        onChange={(e) => setConfig({
                          ...config,
                          content: {
                            ...config.content,
                            districts: { ...config.content.districts, titleHighlight: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0f2b5c] font-bold focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Açıklama</label>
                    <textarea
                      rows={2}
                      value={config.content.districts.description}
                      onChange={(e) => setConfig({
                        ...config,
                        content: {
                          ...config.content,
                          districts: { ...config.content.districts, description: e.target.value }
                        }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    />
                  </div>
                </div>
              )}

              {/* TESTIMONIALS FORM */}
              {selectedModuleKey === "testimonials" && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-lg font-bold text-slate-900">Müşteri Yorumları Bölümü</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ana Başlık</label>
                      <input
                        type="text"
                        value={config.content.testimonials.title}
                        onChange={(e) => setConfig({
                          ...config,
                          content: {
                            ...config.content,
                            testimonials: { ...config.content.testimonials, title: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Vurgulu Başlık</label>
                      <input
                        type="text"
                        value={config.content.testimonials.titleHighlight}
                        onChange={(e) => setConfig({
                          ...config,
                          content: {
                            ...config.content,
                            testimonials: { ...config.content.testimonials, titleHighlight: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0f2b5c] font-bold focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Açıklama</label>
                    <textarea
                      rows={2}
                      value={config.content.testimonials.description}
                      onChange={(e) => setConfig({
                        ...config,
                        content: {
                          ...config.content,
                          testimonials: { ...config.content.testimonials, description: e.target.value }
                        }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    />
                  </div>
                </div>
              )}

              {/* NEWS FORM */}
              {selectedModuleKey === "news" && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-lg font-bold text-slate-900">RSS Canlı Haberler Bölümü</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ana Başlık</label>
                      <input
                        type="text"
                        value={config.content.news.title}
                        onChange={(e) => setConfig({
                          ...config,
                          content: {
                            ...config.content,
                            news: { ...config.content.news, title: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Vurgulu Başlık</label>
                      <input
                        type="text"
                        value={config.content.news.titleHighlight}
                        onChange={(e) => setConfig({
                          ...config,
                          content: {
                            ...config.content,
                            news: { ...config.content.news, titleHighlight: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0f2b5c] font-bold focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Gösterilecek Haber Sayısı</label>
                    <input
                      type="number"
                      min={2}
                      max={8}
                      value={config.content.news.itemsToShow}
                      onChange={(e) => setConfig({
                        ...config,
                        content: {
                          ...config.content,
                          news: { ...config.content.news, itemsToShow: parseInt(e.target.value) || 4 }
                        }
                      })}
                      className="w-32 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    />
                  </div>
                </div>
              )}

              {/* BLOG FORM */}
              {selectedModuleKey === "blog" && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-lg font-bold text-slate-900">Blog & Rehber Önizlemesi</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ana Başlık</label>
                      <input
                        type="text"
                        value={config.content.blog.title}
                        onChange={(e) => setConfig({
                          ...config,
                          content: {
                            ...config.content,
                            blog: { ...config.content.blog, title: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Vurgulu Başlık</label>
                      <input
                        type="text"
                        value={config.content.blog.titleHighlight}
                        onChange={(e) => setConfig({
                          ...config,
                          content: {
                            ...config.content,
                            blog: { ...config.content.blog, titleHighlight: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0f2b5c] font-bold focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Açıklama</label>
                    <textarea
                      rows={2}
                      value={config.content.blog.description}
                      onChange={(e) => setConfig({
                        ...config,
                        content: {
                          ...config.content,
                          blog: { ...config.content.blog, description: e.target.value }
                        }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    />
                  </div>
                </div>
              )}

              {/* Bottom Quick Save */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f2b5c] hover:bg-[#163a75] text-white font-bold text-xs shadow-md shadow-blue-900/10 transition-all hover:scale-[1.02]"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>{saving ? "Kaydediliyor..." : "Metin Değişikliklerini Kaydet"}</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: SEO & GEO MANAGEMENT */}
        {activeTab === "seo" && seoConfig && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0f2b5c] text-xs font-bold uppercase tracking-wider mb-2">
                  <Globe className="w-3.5 h-3.5 text-[#0f2b5c]" />
                  <span>Google & Yerel Arama Optimizasyonu</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  SEO Meta Etiketleri & Yerel Geo (Harita) Yapılandırması
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Google, Yandex ve harita botlarının Sakarya içi yerel aramalarda sitenizi en üst sıralara çıkarmasını sağlayan teknik meta ve koordinat ayarları.
                </p>
              </div>

              <button
                onClick={handleSaveSeo}
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f2b5c] hover:bg-[#163a75] text-white font-bold text-xs shadow-md shadow-blue-900/10 transition-all hover:scale-[1.02] shrink-0 self-start sm:self-auto"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>{saving ? "Kaydediliyor..." : "SEO Ayarlarını Kaydet"}</span>
              </button>
            </div>

            {/* Section 1: Meta Tags */}
            <div className="space-y-5">
              <h3 className="text-sm font-extrabold text-[#0f2b5c] uppercase tracking-wider flex items-center gap-2">
                <Search className="w-4 h-4" />
                <span>1. Genel Arama Motoru Meta Bilgileri</span>
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Site Başlığı (Title Tag - Max 60-70 karakter)
                </label>
                <input
                  type="text"
                  value={seoConfig.meta.siteTitle}
                  onChange={(e) => setSeoConfig({
                    ...seoConfig,
                    meta: { ...seoConfig.meta, siteTitle: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Karakter sayısı: {seoConfig.meta.siteTitle.length} (Önerilen: 50-65)
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Site Açıklaması (Meta Description - Max 150-160 karakter)
                </label>
                <textarea
                  rows={3}
                  value={seoConfig.meta.siteDescription}
                  onChange={(e) => setSeoConfig({
                    ...seoConfig,
                    meta: { ...seoConfig.meta, siteDescription: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Karakter sayısı: {seoConfig.meta.siteDescription.length} (Önerilen: 120-160)
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Anahtar Kelimeler (Keywords - Virgülle ayırınız)
                </label>
                <input
                  type="text"
                  value={seoConfig.meta.keywords.join(", ")}
                  onChange={(e) => setSeoConfig({
                    ...seoConfig,
                    meta: {
                      ...seoConfig.meta,
                      keywords: e.target.value.split(",").map((k) => k.trim()).filter(Boolean)
                    }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Google Search Console Doğrulama Kodu (google-site-verification)
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: 4Z3x_example_code"
                    value={seoConfig.meta.googleSiteVerification}
                    onChange={(e) => setSeoConfig({
                      ...seoConfig,
                      meta: { ...seoConfig.meta, googleSiteVerification: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Yandex Webmaster Doğrulama Kodu (yandex-verification)
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: a1b2c3d4e5f6"
                    value={seoConfig.meta.yandexVerification}
                    onChange={(e) => setSeoConfig({
                      ...seoConfig,
                      meta: { ...seoConfig.meta, yandexVerification: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: GEO & Location Tags */}
            <div className="space-y-5 pt-6 border-t border-slate-100">
              <h3 className="text-sm font-extrabold text-[#0f2b5c] uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>2. Yerel Geo (Coğrafi Konum & Harita) Etiketleri</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Geo Bölge (geo.region)</label>
                  <input
                    type="text"
                    value={seoConfig.geo.region}
                    onChange={(e) => setSeoConfig({
                      ...seoConfig,
                      geo: { ...seoConfig.geo, region: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Yer Adı (geo.placename)</label>
                  <input
                    type="text"
                    value={seoConfig.geo.placename}
                    onChange={(e) => setSeoConfig({
                      ...seoConfig,
                      geo: { ...seoConfig.geo, placename: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Posta Kodu</label>
                  <input
                    type="text"
                    value={seoConfig.geo.postalCode}
                    onChange={(e) => setSeoConfig({
                      ...seoConfig,
                      geo: { ...seoConfig.geo, postalCode: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Enlem (Latitude)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={seoConfig.geo.latitude}
                    onChange={(e) => {
                      const lat = parseFloat(e.target.value) || 0;
                      setSeoConfig({
                        ...seoConfig,
                        geo: {
                          ...seoConfig.geo,
                          latitude: lat,
                          position: `${lat};${seoConfig.geo.longitude}`,
                          icbm: `${lat}, ${seoConfig.geo.longitude}`
                        }
                      });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Boylam (Longitude)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={seoConfig.geo.longitude}
                    onChange={(e) => {
                      const lng = parseFloat(e.target.value) || 0;
                      setSeoConfig({
                        ...seoConfig,
                        geo: {
                          ...seoConfig.geo,
                          longitude: lng,
                          position: `${seoConfig.geo.latitude};${lng}`,
                          icbm: `${seoConfig.geo.latitude}, ${lng}`
                        }
                      });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hedef İlçe ve Hizmet Bölgeleri (Virgülle ayırınız)
                </label>
                <input
                  type="text"
                  value={seoConfig.geo.targetDistricts.join(", ")}
                  onChange={(e) => setSeoConfig({
                    ...seoConfig,
                    geo: {
                      ...seoConfig.geo,
                      targetDistricts: e.target.value.split(",").map((d) => d.trim()).filter(Boolean)
                    }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                />
              </div>
            </div>

            {/* Section 3: Schema.org & LocalBusiness */}
            <div className="space-y-5 pt-6 border-t border-slate-100">
              <h3 className="text-sm font-extrabold text-[#0f2b5c] uppercase tracking-wider flex items-center gap-2">
                <FileCode className="w-4 h-4 text-amber-500" />
                <span>3. Schema.org (Google Zengin Sonuç / Rich Snippet) Yapılandırması</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Google İşletme Türü</label>
                  <select
                    value={seoConfig.schema.businessType}
                    onChange={(e) => setSeoConfig({
                      ...seoConfig,
                      schema: { ...seoConfig.schema, businessType: e.target.value as any }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c] bg-white"
                  >
                    <option value="GeneralContractor">Müteahhit / Genel İnşaatçı (GeneralContractor)</option>
                    <option value="HomeAndConstructionBusiness">Ev & İnşaat Şirketi (HomeAndConstructionBusiness)</option>
                    <option value="ProfessionalService">Mimarlık & Profesyonel Hizmet (ProfessionalService)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Resmi İşletme Ünvanı</label>
                  <input
                    type="text"
                    value={seoConfig.schema.businessName}
                    onChange={(e) => setSeoConfig({
                      ...seoConfig,
                      schema: { ...seoConfig.schema, businessName: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Çalışma Saatleri</label>
                  <input
                    type="text"
                    value={seoConfig.schema.openingHours}
                    onChange={(e) => setSeoConfig({
                      ...seoConfig,
                      schema: { ...seoConfig.schema, openingHours: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ortalama Puan (1-5)</label>
                  <input
                    type="text"
                    value={seoConfig.schema.ratingValue}
                    onChange={(e) => setSeoConfig({
                      ...seoConfig,
                      schema: { ...seoConfig.schema, ratingValue: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Toplam Yorum Sayısı</label>
                  <input
                    type="text"
                    value={seoConfig.schema.reviewCount}
                    onChange={(e) => setSeoConfig({
                      ...seoConfig,
                      schema: { ...seoConfig.schema, reviewCount: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Google Haritalar & Yerler (Places / Local Pack) */}
            <div className="space-y-5 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-[#0f2b5c] uppercase tracking-wider flex items-center gap-2">
                  <Store className="w-4 h-4 text-blue-600" />
                  <span>4. Google Haritalar & &ldquo;Yerler&rdquo; (Local Pack) Sıralama Ayarları</span>
                </h3>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#0f2b5c] border border-blue-200">
                  Google Haritalar 1. Sıra Optimizasyonu
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Google&apos;da &ldquo;sakarya tadilat&rdquo; arandığında çıkan 3&apos;lü harita kutucuğunda (Google Local 3-Pack) en üstte listelenmek için işletme adı, Place ID ve yorum bağlantılarını tanımlayın.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Google Haritalar İşletme Tam Adı (GMB Name)
                  </label>
                  <input
                    type="text"
                    value={seoConfig.googlePlaces?.businessExactName || ""}
                    onChange={(e) => setSeoConfig({
                      ...seoConfig,
                      googlePlaces: {
                        ...(seoConfig.googlePlaces || defaultSeoGeoConfig.googlePlaces),
                        businessExactName: e.target.value
                      }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    placeholder="Sakarya Mimar Yapı - Ev Tadilat & İnşaat Dekorasyon"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Öneri: Anahtar kelimeyi içeren resmi işletme adı (&ldquo;Sakarya Mimar Yapı - Tadilat & Dekorasyon&rdquo;)</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Google Maps Profil URL (Doğrudan Harita Linki)
                  </label>
                  <input
                    type="url"
                    value={seoConfig.googlePlaces?.googleMapsProfileUrl || ""}
                    onChange={(e) => setSeoConfig({
                      ...seoConfig,
                      googlePlaces: {
                        ...(seoConfig.googlePlaces || defaultSeoGeoConfig.googlePlaces),
                        googleMapsProfileUrl: e.target.value
                      }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    placeholder="https://maps.google.com/?cid=..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Google Yorum İsteme Linki (Review Link)
                  </label>
                  <input
                    type="url"
                    value={seoConfig.googlePlaces?.googleReviewUrl || ""}
                    onChange={(e) => setSeoConfig({
                      ...seoConfig,
                      googlePlaces: {
                        ...(seoConfig.googlePlaces || defaultSeoGeoConfig.googlePlaces),
                        googleReviewUrl: e.target.value
                      }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    placeholder="https://g.page/r/.../review"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Müşterilerinize tek tıkla 5 yıldız verdiren Google kısa linki</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Google Maps Place ID
                  </label>
                  <input
                    type="text"
                    value={seoConfig.googlePlaces?.googlePlaceId || ""}
                    onChange={(e) => setSeoConfig({
                      ...seoConfig,
                      googlePlaces: {
                        ...(seoConfig.googlePlaces || defaultSeoGeoConfig.googlePlaces),
                        googlePlaceId: e.target.value
                      }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    placeholder="ChIJb_mimar_yapi_sakarya"
                  />
                </div>
              </div>
            </div>

            {/* Section 5: Google Merchant & Hizmet/Fiyat Kataloğu (Rich Products) */}
            <div className="space-y-5 pt-6 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-extrabold text-[#0f2b5c] uppercase tracking-wider flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-amber-500" />
                    <span>5. Google Merchant & Yapılandırılmış Hizmet Fiyat Kataloğu</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Google arama sonuçlarında fiyat aralıkları (₺) ve hizmet kartlarının &ldquo;Stokta / Hemen Keşif&rdquo; şeklinde zengin gösterilmesini sağlar.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const newOffer: MerchantServiceOffer = {
                        id: `serv-${Date.now()}`,
                        name: "Yeni Tadilat Hizmeti",
                        description: "Hizmet detay açıklaması ve garanti şartları",
                        category: "Ev Tadilatı",
                        minPrice: 50000,
                        maxPrice: 150000,
                        priceCurrency: "TRY",
                        availability: "https://schema.org/InStock"
                      };
                      setSeoConfig({
                        ...seoConfig,
                        merchant: {
                          ...(seoConfig.merchant || defaultSeoGeoConfig.merchant),
                          offers: [...(seoConfig.merchant?.offers || []), newOffer]
                        }
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-[#0f2b5c] hover:bg-blue-100 text-xs font-bold border border-blue-200 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Hizmet / Fiyat Ekle</span>
                  </button>
                </div>
              </div>

              {/* Offerings list */}
              <div className="space-y-3">
                {seoConfig.merchant?.offers?.map((offer, oIdx) => (
                  <div key={offer.id || oIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#0f2b5c] font-bold text-xs flex items-center justify-center">
                          {oIdx + 1}
                        </span>
                        <input
                          type="text"
                          value={offer.name}
                          onChange={(e) => {
                            const updated = [...seoConfig.merchant.offers];
                            updated[oIdx].name = e.target.value;
                            setSeoConfig({
                              ...seoConfig,
                              merchant: { ...seoConfig.merchant, offers: updated }
                            });
                          }}
                          className="font-bold text-xs sm:text-sm text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0f2b5c]"
                          placeholder="Hizmet Adı"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const updated = seoConfig.merchant.offers.filter((_, idx) => idx !== oIdx);
                          setSeoConfig({
                            ...seoConfig,
                            merchant: { ...seoConfig.merchant, offers: updated }
                          });
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                        title="Hizmeti Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <div className="sm:col-span-7">
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Açıklama</label>
                        <input
                          type="text"
                          value={offer.description}
                          onChange={(e) => {
                            const updated = [...seoConfig.merchant.offers];
                            updated[oIdx].description = e.target.value;
                            setSeoConfig({
                              ...seoConfig,
                              merchant: { ...seoConfig.merchant, offers: updated }
                            });
                          }}
                          className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0f2b5c]"
                          placeholder="Hizmet kapsamı..."
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Min Fiyat (₺)</label>
                        <input
                          type="number"
                          value={offer.minPrice}
                          onChange={(e) => {
                            const updated = [...seoConfig.merchant.offers];
                            updated[oIdx].minPrice = Number(e.target.value) || 0;
                            setSeoConfig({
                              ...seoConfig,
                              merchant: { ...seoConfig.merchant, offers: updated }
                            });
                          }}
                          className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0f2b5c]"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Max Fiyat (₺)</label>
                        <input
                          type="number"
                          value={offer.maxPrice}
                          onChange={(e) => {
                            const updated = [...seoConfig.merchant.offers];
                            updated[oIdx].maxPrice = Number(e.target.value) || 0;
                            setSeoConfig({
                              ...seoConfig,
                              merchant: { ...seoConfig.merchant, offers: updated }
                            });
                          }}
                          className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0f2b5c]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Save Action */}
            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button
                onClick={handleSaveSeo}
                disabled={saving}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#0f2b5c] hover:bg-[#163a75] text-white font-bold text-xs shadow-md shadow-blue-900/10 transition-all hover:scale-[1.02]"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>{saving ? "Kaydediliyor..." : "Tüm SEO, Yerler & Merchant Ayarlarını Kaydet"}</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

