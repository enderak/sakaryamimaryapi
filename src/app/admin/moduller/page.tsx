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
  Shield,
  Sparkles,
  LogOut,
  UserCheck
} from "lucide-react";
import { HomePageModulesConfig, defaultHomeModulesConfig } from "@/data/homeModules";

export default function AdminModulesPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(null);
  const [config, setConfig] = useState<HomePageModulesConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"visibility" | "content">("visibility");
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
    } catch (e) {
      console.error(e);
      setConfig(defaultHomeModulesConfig);
    } finally {
      setLoading(false);
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

      </div>
    </div>
  );
}
