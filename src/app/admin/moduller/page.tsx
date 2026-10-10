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
  Star,
  Bot,
  Sparkles,
  HelpCircle,
  Share2,
  Video,
  ShieldCheck,
  Play,
  BookOpen,
  Settings
} from "lucide-react";
import { HomePageModulesConfig, defaultHomeModulesConfig } from "@/data/homeModules";
import { SeoGeoConfig, defaultSeoGeoConfig, MerchantServiceOffer } from "@/data/seoGeo";
import { SocialMediaConfig, defaultSocialMediaConfig, extractYouTubeId, SocialPostItem } from "@/data/socialMedia";
import { SiteSettingsConfig, defaultSiteSettingsConfig } from "@/data/siteSettings";
import AdminGuideSection from "@/components/AdminGuideSection";
import AdminSettingsSection from "@/components/AdminSettingsSection";

export default function AdminModulesPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(null);
  const [config, setConfig] = useState<HomePageModulesConfig | null>(null);
  const [seoConfig, setSeoConfig] = useState<SeoGeoConfig | null>(null);
  const [socialConfig, setSocialConfig] = useState<SocialMediaConfig | null>(null);
  const [settingsConfig, setSettingsConfig] = useState<SiteSettingsConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"visibility" | "content" | "seo" | "social" | "settings" | "guide">("visibility");
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
      try {
        const res = await fetch("/api/modules");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.config) {
            setConfig(data.config);
          } else {
            setConfig(defaultHomeModulesConfig);
          }
        } else {
          setConfig(defaultHomeModulesConfig);
        }
      } catch {
        setConfig(defaultHomeModulesConfig);
      }

      // 3. Fetch SEO Config
      try {
        const seoRes = await fetch("/api/seo");
        if (seoRes.ok) {
          const seoData = await seoRes.json();
          if (seoData.success && seoData.config) {
            setSeoConfig(seoData.config);
          } else {
            setSeoConfig(defaultSeoGeoConfig);
          }
        } else {
          setSeoConfig(defaultSeoGeoConfig);
        }
      } catch {
        setSeoConfig(defaultSeoGeoConfig);
      }

      // 4. Fetch Social Media Config
      try {
        const socialRes = await fetch("/api/social");
        if (socialRes.ok) {
          const socialData = await socialRes.json();
          if (socialData.success && socialData.config) {
            setSocialConfig(socialData.config);
          } else {
            setSocialConfig(defaultSocialMediaConfig);
          }
        } else {
          setSocialConfig(defaultSocialMediaConfig);
        }
      } catch {
        setSocialConfig(defaultSocialMediaConfig);
      }

      // 5. Fetch Site Settings Config
      try {
        const settingsRes = await fetch("/api/settings");
        if (settingsRes.ok) {
          const settingsData = await settingsRes.json();
          if (settingsData.success && settingsData.config) {
            setSettingsConfig(settingsData.config);
          } else {
            setSettingsConfig(defaultSiteSettingsConfig);
          }
        } else {
          setSettingsConfig(defaultSiteSettingsConfig);
        }
      } catch (settingsErr) {
        console.warn("Settings fetch fallback used:", settingsErr);
        setSettingsConfig(defaultSiteSettingsConfig);
      }
    } catch (e) {
      console.error(e);
      setConfig(defaultHomeModulesConfig);
      setSeoConfig(defaultSeoGeoConfig);
      setSocialConfig(defaultSocialMediaConfig);
      setSettingsConfig(defaultSiteSettingsConfig);
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

  const handleSaveSocial = async () => {
    if (!socialConfig) return;
    try {
      setSaving(true);
      setStatusMessage(null);
      const res = await fetch("/api/social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config: socialConfig })
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({ type: "success", text: "Sosyal medya ve video akışı ayarları başarıyla güncellendi!" });
        if (data.config) {
          setSocialConfig(data.config);
        }
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        setStatusMessage({ type: "error", text: data.message || "Kaydedilemedi." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Sosyal medya kaydedilirken sunucu hatası oluştu." });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSettings = async () => {
    if (!settingsConfig) return;
    try {
      setSaving(true);
      setStatusMessage(null);
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config: settingsConfig })
      });
      let data: any = {};
      try {
        data = await res.json();
      } catch {
        data = { success: false, message: `Sunucu yanıtı okunamadı (HTTP ${res.status}).` };
      }
      if (res.ok && data.success) {
        setStatusMessage({ type: "success", text: "Tüm ayarlar (Şifre, RSS, Blog, Tema) başarıyla güncellendi!" });
        if (data.config) {
          setSettingsConfig(data.config);
        }
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        setStatusMessage({ type: "error", text: data.message || `Ayarlar kaydedilemedi (HTTP ${res.status}).` });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Ayarlar kaydedilirken bağlantı hatası oluştu." });
    } finally {
      setSaving(false);
    }
  };

  const handleResetSettings = async () => {
    if (!confirm("Şifre, RSS, Blog ve Tema ayarlarını varsayılan fabrika ayarlarına döndürmek istiyor musunuz?")) {
      return;
    }
    try {
      setSaving(true);
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" })
      });
      const data = await res.json();
      if (data.success && data.config) {
        setSettingsConfig(data.config);
        setStatusMessage({ type: "success", text: "Ayarlar varsayılana sıfırlandı." });
        setTimeout(() => setStatusMessage(null), 4000);
      }
    } catch {
      setStatusMessage({ type: "error", text: "Sıfırlama başarısız oldu." });
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
    <div className="min-h-screen bg-slate-50 text-slate-900 py-6 sm:py-10 px-3 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Top Header Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0f2b5c] text-xs font-bold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5 text-[#0f2b5c]" />
              <span>Anasayfa Modül & İçerik Yönetimi</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Anasayfa Bölüm Kontrol Paneli
            </h1>
            <p className="mt-1 text-slate-600 text-xs sm:text-sm max-w-2xl">
              Anasayfadaki 9 farklı bölümü tek tıkla gizleyebilir, yerlerini yukarı/aşağı taşıyabilir ve başlık/açıklama metinlerini anında güncelleyebilirsiniz.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
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
              onClick={() => setActiveTab("settings")}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                activeTab === "settings"
                  ? "bg-indigo-600 text-white font-black shadow-md ring-2 ring-indigo-300"
                  : "bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200"
              }`}
              title="Şifre, RSS, Blog ve Tema Ayarları"
            >
              <Settings className="w-4 h-4 text-indigo-600" />
              <span>Ayarlar</span>
            </button>

            <button
              onClick={() => setActiveTab("guide")}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                activeTab === "guide"
                  ? "bg-amber-400 text-slate-950 font-black shadow-md ring-2 ring-amber-300"
                  : "bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200"
              }`}
              title="Kullanım Kılavuzu & Arama Motoru Rehberi"
            >
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>Kullanım Kılavuzu</span>
            </button>

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
        <div className="flex border-b border-slate-200 gap-2 sm:gap-3 overflow-x-auto no-scrollbar whitespace-nowrap pb-1">
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
            <span>SEO, Haritalar & Yapay Zeka (AIO/GEO)</span>
          </button>

          <button
            onClick={() => setActiveTab("social")}
            className={`pb-3 px-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "social"
                ? "border-[#0f2b5c] text-[#0f2b5c]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Share2 className="w-4 h-4 text-rose-500" />
            <span>Sosyal Medya & Videolar</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-3 px-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "settings"
                ? "border-[#0f2b5c] text-[#0f2b5c]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Settings className="w-4 h-4 text-indigo-600" />
            <span>Ayarlar (Şifre, RSS, Blog, Tema)</span>
          </button>

          <button
            onClick={() => setActiveTab("guide")}
            className={`pb-3 px-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "guide"
                ? "border-[#0f2b5c] text-[#0f2b5c]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Kullanım Kılavuzu & Arama Rehberi</span>
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

              {/* Arama Motorları Webmaster Doğrulama Merkezi */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Tüm Arama Motorları Doğrulama & Webmaster Kodları</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Sitenizi arama motorlarına tek tıkla kaydettirmek ve mülk sahibi olduğunuzu onaylatmak için doğrulama kodlarını girin.
                    </p>
                  </div>
                  
                  {/* Webmaster Konsollarına Hızlı Erişim Linkleri */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href="https://search.google.com/search-console"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-[11px] font-bold border border-blue-200 transition-colors"
                    >
                      <span>Google Console</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://www.bing.com/webmasters"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-800 hover:bg-cyan-100 text-[11px] font-bold border border-cyan-200 transition-colors"
                    >
                      <span>Bing Webmaster</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://webmaster.yandex.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 text-[11px] font-bold border border-amber-200 transition-colors"
                    >
                      <span>Yandex Webmaster</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://businessconnect.apple.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 text-[11px] font-bold border border-slate-300 transition-colors"
                    >
                      <span>Apple Connect</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Google Search Console Meta */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Google Search Console Meta Kodu
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: 4Z3x_example_code (google-site-verification)"
                      value={seoConfig.meta.googleSiteVerification || ""}
                      onChange={(e) => setSeoConfig({
                        ...seoConfig,
                        meta: { ...seoConfig.meta, googleSiteVerification: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      HTML etiketi yöntemindeki <code className="bg-slate-100 px-1 rounded">content=&quot;...&quot;</code> içindeki kod.
                    </p>
                  </div>

                  {/* Google HTML Doğrulama Dosyası */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Google HTML Doğrulama Dosyası Adı (Opsiyonel)
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: google827364823.html"
                      value={seoConfig.meta.googleHtmlVerificationFile || ""}
                      onChange={(e) => setSeoConfig({
                        ...seoConfig,
                        meta: { ...seoConfig.meta, googleHtmlVerificationFile: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Google&apos;ın verdiği HTML dosyasının adı. Kaydettiğinizde otomatik olarak sitenizin ana dizininde yayınlanır.
                    </p>
                  </div>

                  {/* Microsoft Bing / Copilot */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Microsoft Bing (Copilot) Kodu (msvalidate.01)
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: 9D49062F81B828135832E5203A9BC2F9"
                      value={seoConfig.meta.bingVerification || seoConfig.aiOptimization?.bingVerification || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSeoConfig({
                          ...seoConfig,
                          meta: { ...seoConfig.meta, bingVerification: val },
                          aiOptimization: {
                            ...(seoConfig.aiOptimization || defaultSeoGeoConfig.aiOptimization),
                            bingVerification: val
                          }
                        });
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Bing Webmaster ve Copilot aramaları için. Otomatik olarak <code className="bg-slate-100 px-1 rounded">/BingSiteAuth.xml</code> dosyası oluşturur.
                    </p>
                  </div>

                  {/* Yandex Webmaster */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Yandex Webmaster Doğrulama Kodu (yandex-verification)
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: a1b2c3d4e5f6"
                      value={seoConfig.meta.yandexVerification || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSeoConfig({
                          ...seoConfig,
                          meta: { ...seoConfig.meta, yandexVerification: val },
                          aiOptimization: {
                            ...(seoConfig.aiOptimization || defaultSeoGeoConfig.aiOptimization),
                            yandexVerification: val
                          }
                        });
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    />
                  </div>

                  {/* Pinterest Domain Verify */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Pinterest Domain Doğrulama Kodu (p:domain_verify)
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: 8b1f2e3d4c5b6a7"
                      value={seoConfig.meta.pinterestVerification || seoConfig.aiOptimization?.pinterestVerification || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSeoConfig({
                          ...seoConfig,
                          meta: { ...seoConfig.meta, pinterestVerification: val },
                          aiOptimization: {
                            ...(seoConfig.aiOptimization || defaultSeoGeoConfig.aiOptimization),
                            pinterestVerification: val
                          }
                        });
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    />
                  </div>

                  {/* Facebook / Meta Domain Verify */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Facebook / Meta Domain Doğrulama Kodu
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: abcd1234efgh5678 (facebook-domain-verification)"
                      value={seoConfig.meta.facebookVerification || ""}
                      onChange={(e) => setSeoConfig({
                        ...seoConfig,
                        meta: { ...seoConfig.meta, facebookVerification: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                    />
                  </div>
                </div>

                {/* Arama Motorlarına İletilecek Otomatik Harita ve Beslemeler */}
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0f2b5c] uppercase tracking-wider flex items-center gap-1.5">
                      <FileCode className="w-3.5 h-3.5" />
                      <span>Arama Motorlarına Gönderilecek Otomatik Harita & Besleme Linkleri</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-[#0f2b5c]">
                      Canlı & Otomatik Güncellenir
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-white border border-blue-100 shadow-sm">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">XML Site Haritası (Google & Bing)</div>
                      <div className="font-mono text-xs text-blue-700 truncate mt-0.5">
                        {seoConfig.meta.canonicalUrl || "https://www.sakaryamimaryapi.com"}/sitemap.xml
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-blue-100 shadow-sm">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Yapay Zeka Özeti (LLMs.txt)</div>
                      <div className="font-mono text-xs text-purple-700 truncate mt-0.5">
                        {seoConfig.meta.canonicalUrl || "https://www.sakaryamimaryapi.com"}/llms.txt
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-blue-100 shadow-sm">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Canlı RSS Beslemesi</div>
                      <div className="font-mono text-xs text-amber-700 truncate mt-0.5">
                        {seoConfig.meta.canonicalUrl || "https://www.sakaryamimaryapi.com"}/api/rss
                      </div>
                    </div>
                  </div>
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

            {/* Section 6: Yapay Zeka Arama Motorları (AIO & GEO) & Modern Algoritma Optimizasyonu */}
            <div className="space-y-5 pt-6 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-extrabold text-[#0f2b5c] uppercase tracking-wider flex items-center gap-2">
                    <Bot className="w-4 h-4 text-purple-600" />
                    <span>6. Yapay Zeka Arama Motorları (AIO & GEO) & Güncel Arama Desteği</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    ChatGPT, Perplexity, Google Gemini, Claude ve Microsoft Copilot gibi yapay zekaların ve modern arama motorlarının sitenizi tam yetkiyle tarayıp doğrudan kaynak göstermesini sağlar.
                  </p>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 shrink-0">
                  ChatGPT • Gemini • Perplexity • Copilot
                </span>
              </div>

              {/* Bot İzni & Bing/Yandex Doğrulamaları */}
              <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>Yapay Zeka Tarayıcılarına Açık İzin Ver (GPTBot, PerplexityBot, ClaudeBot vb.)</span>
                    </label>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      robots.txt üzerinden yapay zeka botlarına tam tarama izni verir, aramalarda önerilmenizi sağlar.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={seoConfig.aiOptimization?.enableAiCrawlers ?? true}
                      onChange={(e) => setSeoConfig({
                        ...seoConfig,
                        aiOptimization: {
                          ...(seoConfig.aiOptimization || defaultSeoGeoConfig.aiOptimization),
                          enableAiCrawlers: e.target.checked
                        }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-purple-100">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Microsoft Bing (Copilot) Kodu
                    </label>
                    <input
                      type="text"
                      value={seoConfig.aiOptimization?.bingVerification || ""}
                      onChange={(e) => setSeoConfig({
                        ...seoConfig,
                        aiOptimization: {
                          ...(seoConfig.aiOptimization || defaultSeoGeoConfig.aiOptimization),
                          bingVerification: e.target.value
                        }
                      })}
                      placeholder="msvalidate.01 meta kodu"
                      className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-purple-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Yandex Webmaster Kodu
                    </label>
                    <input
                      type="text"
                      value={seoConfig.aiOptimization?.yandexVerification || ""}
                      onChange={(e) => setSeoConfig({
                        ...seoConfig,
                        aiOptimization: {
                          ...(seoConfig.aiOptimization || defaultSeoGeoConfig.aiOptimization),
                          yandexVerification: e.target.value
                        }
                      })}
                      placeholder="yandex-verification kodu"
                      className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-purple-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Pinterest Doğrulama Kodu
                    </label>
                    <input
                      type="text"
                      value={seoConfig.aiOptimization?.pinterestVerification || ""}
                      onChange={(e) => setSeoConfig({
                        ...seoConfig,
                        aiOptimization: {
                          ...(seoConfig.aiOptimization || defaultSeoGeoConfig.aiOptimization),
                          pinterestVerification: e.target.value
                        }
                      })}
                      placeholder="p:domain_verify kodu"
                      className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-purple-600"
                    />
                  </div>
                </div>
              </div>

              {/* Doğrudan Yapay Zeka Özeti (AI Summary Prompt) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Yapay Zeka ve LLM Sistem Özeti (Direct AI Context Prompt)
                </label>
                <textarea
                  rows={3}
                  value={seoConfig.aiOptimization?.aiSummaryPrompt || ""}
                  onChange={(e) => setSeoConfig({
                    ...seoConfig,
                    aiOptimization: {
                      ...(seoConfig.aiOptimization || defaultSeoGeoConfig.aiOptimization),
                      aiSummaryPrompt: e.target.value
                    }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 leading-relaxed"
                  placeholder="Yapay zekanın kullanıcıya sitenizi özetlerken referans alacağı doğrudan şirket bilgisi..."
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Yapay zekalar (ChatGPT, Gemini, Perplexity) sitenizi okurken buradaki bilgileri baz alarak kullanıcılara tavsiye ve doğrudan yanıt üretir.
                </p>
              </div>

              {/* LSI & Semantik Anahtar Kelimeler */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Semantik LSI Anahtar Kelimeler (Virgülle ayırın)
                </label>
                <input
                  type="text"
                  value={seoConfig.aiOptimization?.primaryKeywordsLsi?.join(", ") || ""}
                  onChange={(e) => {
                    const lsiArr = e.target.value.split(",").map((k) => k.trim()).filter(Boolean);
                    setSeoConfig({
                      ...seoConfig,
                      aiOptimization: {
                        ...(seoConfig.aiOptimization || defaultSeoGeoConfig.aiOptimization),
                        primaryKeywordsLsi: lsiArr
                      }
                    });
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Sakarya en iyi tadilat ustası, Serdivan daire yenileme fiyatları, Sapanca villa müteahhiti"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Arama motorlarının ve vektörel yapay zeka modellerinin içeriğinizi sektör uzmanlığıyla eşleştirmesini sağlar.
                </p>
              </div>

              {/* Yapılandırılmış SSS (FAQ Schema) */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                      <span>Google & Yapay Zeka SSS Şeması (FAQPage Schema.org)</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Google arama sonuçlarında genişletilebilir soru-cevap akordeonları olarak görünür ve AI Overviews tarafından doğrudan yanıt olarak alıntılanır.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const newFaq = {
                        question: "Yeni Sıkça Sorulan Soru?",
                        answer: "Bu sorunun detaylı ve güven veren açıklaması."
                      };
                      setSeoConfig({
                        ...seoConfig,
                        aiOptimization: {
                          ...(seoConfig.aiOptimization || defaultSeoGeoConfig.aiOptimization),
                          faqSchema: [...(seoConfig.aiOptimization?.faqSchema || defaultSeoGeoConfig.aiOptimization.faqSchema), newFaq]
                        }
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-bold border border-purple-200 transition-colors shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Soru & Cevap Ekle</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(seoConfig.aiOptimization?.faqSchema || defaultSeoGeoConfig.aiOptimization.faqSchema).map((faq, fIdx) => (
                    <div key={fIdx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                          Soru #{fIdx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const currentFaqs = seoConfig.aiOptimization?.faqSchema || defaultSeoGeoConfig.aiOptimization.faqSchema;
                            const updated = currentFaqs.filter((_, idx) => idx !== fIdx);
                            setSeoConfig({
                              ...seoConfig,
                              aiOptimization: {
                                ...(seoConfig.aiOptimization || defaultSeoGeoConfig.aiOptimization),
                                faqSchema: updated
                              }
                            });
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                          title="Soruyu Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => {
                          const currentFaqs = [...(seoConfig.aiOptimization?.faqSchema || defaultSeoGeoConfig.aiOptimization.faqSchema)];
                          currentFaqs[fIdx].question = e.target.value;
                          setSeoConfig({
                            ...seoConfig,
                            aiOptimization: {
                              ...(seoConfig.aiOptimization || defaultSeoGeoConfig.aiOptimization),
                              faqSchema: currentFaqs
                            }
                          });
                        }}
                        className="w-full text-xs font-bold px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-purple-600"
                        placeholder="Örn: Sakarya'da komple ev tadilatı ne kadar sürer?"
                      />

                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => {
                          const currentFaqs = [...(seoConfig.aiOptimization?.faqSchema || defaultSeoGeoConfig.aiOptimization.faqSchema)];
                          currentFaqs[fIdx].answer = e.target.value;
                          setSeoConfig({
                            ...seoConfig,
                            aiOptimization: {
                              ...(seoConfig.aiOptimization || defaultSeoGeoConfig.aiOptimization),
                              faqSchema: currentFaqs
                            }
                          });
                        }}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-purple-600"
                        placeholder="Cevap detayları..."
                      />
                    </div>
                  ))}
                </div>
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
                <span>{saving ? "Kaydediliyor..." : "Tüm SEO, Harita & Yapay Zeka Ayarlarını Kaydet"}</span>
              </button>
            </div>

          </div>
        )}

        {/* TAB 4: SOSYAL MEDYA & VİDEO YÖNETİMİ */}
        {activeTab === "social" && socialConfig && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
            {/* Top Banner & Security Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-rose-500" />
                  <span>Sosyal Medya Kanalları & Video Akışı Yönetimi</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Instagram, YouTube, TikTok hesap bağlantılarını, şantiye video oynatıcısını ve anasayfa vitrinini yönetin.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>SSL & XSS Güvenlik Korumalı</span>
              </div>
            </div>

            {/* Güvenlik Bilgi Notu */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0f2b5c]" />
                <span>Güvenlik & Gizlilik Önlemleri:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                • <strong>XSS & URL Filtresi:</strong> Girilen tüm bağlantılar yalnızca güvenli protokoller (<code className="bg-slate-200 px-1 rounded">https://</code>) ve resmi domainler (<code className="bg-slate-200 px-1 rounded">instagram.com</code>, <code className="bg-slate-200 px-1 rounded">youtube.com</code>, <code className="bg-slate-200 px-1 rounded">tiktok.com</code>) üzerinden doğrulanır.
              </p>
              <p className="text-[11px] leading-relaxed">
                • <strong>YouTube Gizlilik Modu:</strong> Oynatıcı, kullanıcı verisi ve üçüncü taraf çerez takibini engelleyen resmi <code className="bg-slate-200 px-1 rounded">youtube-nocookie.com</code> altyapısı ve katı <code className="bg-slate-200 px-1 rounded">sandbox</code> kurallarıyla izole edilmiştir.
              </p>
              <p className="text-[11px] leading-relaxed">
                • <strong>Google & SEO Güçlendirmesi:</strong> Burada tanımlanan aktif hesaplar, sitenin Schema.org LocalBusiness &ldquo;sameAs&rdquo; dizisine otomatik işlenerek Google Haritalar profilinizle eşleştirilir.
              </p>
            </div>

            {/* Bölüm 1: Instagram */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Instagram Hesabı</h3>
                    <p className="text-[11px] text-slate-500">Reels videoları, şantiye hikayeleri ve banyo/mutfak teslimleri</p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={socialConfig.channels.instagram.enabled}
                    onChange={(e) => setSocialConfig({
                      ...socialConfig,
                      channels: {
                        ...socialConfig.channels,
                        instagram: { ...socialConfig.channels.instagram, enabled: e.target.checked }
                      }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Instagram Profil URL</label>
                  <input
                    type="url"
                    value={socialConfig.channels.instagram.url}
                    onChange={(e) => setSocialConfig({
                      ...socialConfig,
                      channels: {
                        ...socialConfig.channels,
                        instagram: { ...socialConfig.channels.instagram, url: e.target.value }
                      }
                    })}
                    placeholder="https://www.instagram.com/sakaryamimaryapi"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kullanıcı Adı (Handle)</label>
                  <input
                    type="text"
                    value={socialConfig.channels.instagram.handle}
                    onChange={(e) => setSocialConfig({
                      ...socialConfig,
                      channels: {
                        ...socialConfig.channels,
                        instagram: { ...socialConfig.channels.instagram, handle: e.target.value }
                      }
                    })}
                    placeholder="@sakaryamimaryapi"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Açıklama / Rozet Notu</label>
                <input
                  type="text"
                  value={socialConfig.channels.instagram.badge || ""}
                  onChange={(e) => setSocialConfig({
                    ...socialConfig,
                    channels: {
                      ...socialConfig.channels,
                      instagram: { ...socialConfig.channels.instagram, badge: e.target.value }
                    }
                  })}
                  placeholder="Günlük Şantiye Reels & Hikayeleri"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            {/* Bölüm 2: YouTube & Video Oynatıcısı */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-600/25">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">YouTube Kanalı & Şantiye Video Oynatıcısı</h3>
                    <p className="text-[11px] text-slate-500">Resmi kanal linki ve anasayfada izlenecek öne çıkan tadilat/villa turu videosu</p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={socialConfig.channels.youtube.enabled}
                    onChange={(e) => setSocialConfig({
                      ...socialConfig,
                      channels: {
                        ...socialConfig.channels,
                        youtube: { ...socialConfig.channels.youtube, enabled: e.target.checked }
                      }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">YouTube Kanal URL</label>
                  <input
                    type="url"
                    value={socialConfig.channels.youtube.channelUrl}
                    onChange={(e) => setSocialConfig({
                      ...socialConfig,
                      channels: {
                        ...socialConfig.channels,
                        youtube: { ...socialConfig.channels.youtube, channelUrl: e.target.value }
                      }
                    })}
                    placeholder="https://www.youtube.com/@sakaryamimaryapi"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kanal Kullanıcı Adı</label>
                  <input
                    type="text"
                    value={socialConfig.channels.youtube.handle}
                    onChange={(e) => setSocialConfig({
                      ...socialConfig,
                      channels: {
                        ...socialConfig.channels,
                        youtube: { ...socialConfig.channels.youtube, handle: e.target.value }
                      }
                    })}
                    placeholder="@sakaryamimaryapi"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>

              {/* Öne Çıkan Video Ayarları & Otomatik ID Ayıklayıcı */}
              <div className="p-4 rounded-2xl bg-red-50/50 border border-red-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-red-600" />
                      <span>Anasayfa Öne Çıkan YouTube Videosu</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      YouTube video linkini veya Shorts bağlantısını yapıştırın; video ID&apos;si otomatik ayıklanır.
                    </p>
                  </div>
                  {socialConfig.channels.youtube.featuredVideoId && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800 font-mono">
                      ID: {socialConfig.channels.youtube.featuredVideoId}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Video / Shorts Bağlantısı (URL)
                    </label>
                    <input
                      type="url"
                      value={socialConfig.channels.youtube.featuredVideoUrl}
                      onChange={(e) => {
                        const newUrl = e.target.value;
                        const extracted = extractYouTubeId(newUrl);
                        setSocialConfig({
                          ...socialConfig,
                          channels: {
                            ...socialConfig.channels,
                            youtube: {
                              ...socialConfig.channels.youtube,
                              featuredVideoUrl: newUrl,
                              featuredVideoId: extracted || socialConfig.channels.youtube.featuredVideoId
                            }
                          }
                        });
                      }}
                      placeholder="https://www.youtube.com/watch?v=ScMzIvxBSi4"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-600 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Video Başlığı</label>
                    <input
                      type="text"
                      value={socialConfig.channels.youtube.featuredVideoTitle}
                      onChange={(e) => setSocialConfig({
                        ...socialConfig,
                        channels: {
                          ...socialConfig.channels,
                          youtube: { ...socialConfig.channels.youtube, featuredVideoTitle: e.target.value }
                        }
                      })}
                      placeholder="Sakarya Serdivan Villa & Daire Komple Tadilat Turu"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-600 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Video Açıklama Notu</label>
                  <input
                    type="text"
                    value={socialConfig.channels.youtube.featuredVideoDescription}
                    onChange={(e) => setSocialConfig({
                      ...socialConfig,
                      channels: {
                        ...socialConfig.channels,
                        youtube: { ...socialConfig.channels.youtube, featuredVideoDescription: e.target.value }
                      }
                    })}
                    placeholder="Anahtar teslim daire tadilatı, modern mutfak ve banyo dönüşüm sürecimizi adım adım inceleyin."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-600 bg-white"
                  />
                </div>

                {/* Video Canlı Önizlemesi */}
                {socialConfig.channels.youtube.featuredVideoId && (
                  <div className="pt-2">
                    <label className="block text-[11px] font-bold text-slate-700 mb-2">
                      Canlı Oynatıcı Önizlemesi (Sandbox Güvenlik Korumalı):
                    </label>
                    <div className="max-w-md aspect-video rounded-xl overflow-hidden shadow-md bg-black border border-slate-300">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(socialConfig.channels.youtube.featuredVideoId)}?rel=0`}
                        title="Önizleme"
                        sandbox="allow-scripts allow-same-origin allow-presentation"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bölüm 3: TikTok */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-black border border-slate-700 flex items-center justify-center text-white shadow-md shadow-cyan-500/10">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">TikTok Hesabı</h3>
                    <p className="text-[11px] text-slate-500">Hızlı kırım, dönüşüm ve şantiye günlükleri videoları</p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={socialConfig.channels.tiktok.enabled}
                    onChange={(e) => setSocialConfig({
                      ...socialConfig,
                      channels: {
                        ...socialConfig.channels,
                        tiktok: { ...socialConfig.channels.tiktok, enabled: e.target.checked }
                      }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">TikTok Profil URL</label>
                  <input
                    type="url"
                    value={socialConfig.channels.tiktok.url}
                    onChange={(e) => setSocialConfig({
                      ...socialConfig,
                      channels: {
                        ...socialConfig.channels,
                        tiktok: { ...socialConfig.channels.tiktok, url: e.target.value }
                      }
                    })}
                    placeholder="https://www.tiktok.com/@sakaryamimaryapi"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kullanıcı Adı (Handle)</label>
                  <input
                    type="text"
                    value={socialConfig.channels.tiktok.handle}
                    onChange={(e) => setSocialConfig({
                      ...socialConfig,
                      channels: {
                        ...socialConfig.channels,
                        tiktok: { ...socialConfig.channels.tiktok, handle: e.target.value }
                      }
                    })}
                    placeholder="@sakaryamimaryapi"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Bölüm 4: Diğer Sosyal Ağlar (Facebook, LinkedIn, Pinterest) */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs">
                Diğer Sosyal Ağ Bağlantıları
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Facebook */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Facebook</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={socialConfig.channels.facebook.enabled}
                        onChange={(e) => setSocialConfig({
                          ...socialConfig,
                          channels: {
                            ...socialConfig.channels,
                            facebook: { ...socialConfig.channels.facebook, enabled: e.target.checked }
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <input
                    type="url"
                    value={socialConfig.channels.facebook.url}
                    onChange={(e) => setSocialConfig({
                      ...socialConfig,
                      channels: {
                        ...socialConfig.channels,
                        facebook: { ...socialConfig.channels.facebook, url: e.target.value }
                      }
                    })}
                    placeholder="https://facebook.com/..."
                    className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                {/* LinkedIn */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">LinkedIn</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={socialConfig.channels.linkedin.enabled}
                        onChange={(e) => setSocialConfig({
                          ...socialConfig,
                          channels: {
                            ...socialConfig.channels,
                            linkedin: { ...socialConfig.channels.linkedin, enabled: e.target.checked }
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-700"></div>
                    </label>
                  </div>
                  <input
                    type="url"
                    value={socialConfig.channels.linkedin.url}
                    onChange={(e) => setSocialConfig({
                      ...socialConfig,
                      channels: {
                        ...socialConfig.channels,
                        linkedin: { ...socialConfig.channels.linkedin, url: e.target.value }
                      }
                    })}
                    placeholder="https://linkedin.com/company/..."
                    className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-700"
                  />
                </div>

                {/* Pinterest */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Pinterest</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={socialConfig.channels.pinterest.enabled}
                        onChange={(e) => setSocialConfig({
                          ...socialConfig,
                          channels: {
                            ...socialConfig.channels,
                            pinterest: { ...socialConfig.channels.pinterest, enabled: e.target.checked }
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-700"></div>
                    </label>
                  </div>
                  <input
                    type="url"
                    value={socialConfig.channels.pinterest.url}
                    onChange={(e) => setSocialConfig({
                      ...socialConfig,
                      channels: {
                        ...socialConfig.channels,
                        pinterest: { ...socialConfig.channels.pinterest, url: e.target.value }
                      }
                    })}
                    placeholder="https://pinterest.com/..."
                    className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-700"
                  />
                </div>
              </div>
            </div>

            {/* Bölüm 5: Anasayfa Video & Sosyal Medya Vitrini (Showcase) */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Anasayfa Sosyal Medya & Canlı Şantiye Vitrini</h3>
                  <p className="text-[11px] text-slate-500">Ziyaretçilerin doğrudan izleyebileceği büyük video ve reels vitrini</p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={socialConfig.showcaseSection.enabled}
                    onChange={(e) => setSocialConfig({
                      ...socialConfig,
                      showcaseSection: { ...socialConfig.showcaseSection, enabled: e.target.checked }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0f2b5c]"></div>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Üst Rozet</label>
                  <input
                    type="text"
                    value={socialConfig.showcaseSection.badge}
                    onChange={(e) => setSocialConfig({
                      ...socialConfig,
                      showcaseSection: { ...socialConfig.showcaseSection, badge: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Başlık</label>
                  <input
                    type="text"
                    value={socialConfig.showcaseSection.title}
                    onChange={(e) => setSocialConfig({
                      ...socialConfig,
                      showcaseSection: { ...socialConfig.showcaseSection, title: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Vurgulu Başlık</label>
                  <input
                    type="text"
                    value={socialConfig.showcaseSection.titleHighlight}
                    onChange={(e) => setSocialConfig({
                      ...socialConfig,
                      showcaseSection: { ...socialConfig.showcaseSection, titleHighlight: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Açıklama</label>
                <textarea
                  rows={2}
                  value={socialConfig.showcaseSection.description}
                  onChange={(e) => setSocialConfig({
                    ...socialConfig,
                    showcaseSection: { ...socialConfig.showcaseSection, description: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                />
              </div>

              {/* Öne Çıkan Gönderiler / Reels Listesi */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase">
                    Öne Çıkan Reels / TikTok / YouTube Videoları ({socialConfig.showcaseSection.posts.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const newPost: SocialPostItem = {
                        id: `post-${Date.now()}`,
                        platform: "instagram",
                        title: "Yeni Şantiye Dönüşüm Videosu",
                        url: "https://www.instagram.com/sakaryamimaryapi",
                        viewsOrLikes: "10K İzlenme",
                        thumbnailUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
                      };
                      setSocialConfig({
                        ...socialConfig,
                        showcaseSection: {
                          ...socialConfig.showcaseSection,
                          posts: [...socialConfig.showcaseSection.posts, newPost]
                        }
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Video Kartı Ekle</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {socialConfig.showcaseSection.posts.map((post, pIdx) => (
                    <div key={post.id || pIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center">
                            {pIdx + 1}
                          </span>
                          <select
                            value={post.platform}
                            onChange={(e) => {
                              const updated = [...socialConfig.showcaseSection.posts];
                              updated[pIdx].platform = e.target.value as any;
                              setSocialConfig({
                                ...socialConfig,
                                showcaseSection: { ...socialConfig.showcaseSection, posts: updated }
                              });
                            }}
                            className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#0f2b5c]"
                          >
                            <option value="instagram">Instagram</option>
                            <option value="youtube">YouTube</option>
                            <option value="tiktok">TikTok</option>
                          </select>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const updated = socialConfig.showcaseSection.posts.filter((_, idx) => idx !== pIdx);
                            setSocialConfig({
                              ...socialConfig,
                              showcaseSection: { ...socialConfig.showcaseSection, posts: updated }
                            });
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                          title="Kartı Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-6">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Başlık</label>
                          <input
                            type="text"
                            value={post.title}
                            onChange={(e) => {
                              const updated = [...socialConfig.showcaseSection.posts];
                              updated[pIdx].title = e.target.value;
                              setSocialConfig({
                                ...socialConfig,
                                showcaseSection: { ...socialConfig.showcaseSection, posts: updated }
                              });
                            }}
                            className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0f2b5c]"
                          />
                        </div>

                        <div className="sm:col-span-6">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Video Bağlantısı (URL)</label>
                          <input
                            type="url"
                            value={post.url}
                            onChange={(e) => {
                              const updated = [...socialConfig.showcaseSection.posts];
                              updated[pIdx].url = e.target.value;
                              setSocialConfig({
                                ...socialConfig,
                                showcaseSection: { ...socialConfig.showcaseSection, posts: updated }
                              });
                            }}
                            className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0f2b5c]"
                          />
                        </div>

                        <div className="sm:col-span-4">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">İzlenme / Beğeni Notu</label>
                          <input
                            type="text"
                            value={post.viewsOrLikes || ""}
                            onChange={(e) => {
                              const updated = [...socialConfig.showcaseSection.posts];
                              updated[pIdx].viewsOrLikes = e.target.value;
                              setSocialConfig({
                                ...socialConfig,
                                showcaseSection: { ...socialConfig.showcaseSection, posts: updated }
                              });
                            }}
                            placeholder="Örn: 24.5K İzlenme"
                            className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0f2b5c]"
                          />
                        </div>

                        <div className="sm:col-span-8">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Kapak Görseli Linki</label>
                          <input
                            type="url"
                            value={post.thumbnailUrl || ""}
                            onChange={(e) => {
                              const updated = [...socialConfig.showcaseSection.posts];
                              updated[pIdx].thumbnailUrl = e.target.value;
                              setSocialConfig({
                                ...socialConfig,
                                showcaseSection: { ...socialConfig.showcaseSection, posts: updated }
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
            </div>

            {/* Bottom Save Action */}
            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button
                onClick={handleSaveSocial}
                disabled={saving}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#0f2b5c] hover:bg-[#163a75] text-white font-bold text-xs shadow-md shadow-blue-900/10 transition-all hover:scale-[1.02]"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>{saving ? "Kaydediliyor..." : "Tüm Sosyal Medya & Video Ayarlarını Kaydet"}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: AYARLAR (ŞİFRE, RSS, BLOG, TEMA) */}
        {activeTab === "settings" && settingsConfig && (
          <AdminSettingsSection
            settings={settingsConfig}
            setSettings={(newSettings) => setSettingsConfig(newSettings)}
            currentUserEmail={currentUser?.email}
            onSave={handleSaveSettings}
            onReset={handleResetSettings}
            saving={saving}
          />
        )}

        {/* TAB 6: KULLANIM KILAVUZU & ARAMA MOTORU REHBERİ */}
        {activeTab === "guide" && (
          <AdminGuideSection canonicalUrl={seoConfig?.meta?.canonicalUrl} />
        )}

      </div>
    </div>
  );
}

