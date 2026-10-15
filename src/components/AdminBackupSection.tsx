"use client";

import { useState, useEffect, useRef } from "react";
import {
  Save,
  RotateCcw,
  Download,
  Upload,
  Trash2,
  History,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  FileJson,
  Layers,
  Gamepad2,
  Clock,
  Sparkles,
  RefreshCw,
  FolderArchive,
  Info
} from "lucide-react";
import { SiteBackupItem } from "@/lib/backupStorage";
import { HomePageModulesConfig } from "@/data/homeModules";
import { SiteSettingsConfig } from "@/data/siteSettings";
import { SeoGeoConfig } from "@/data/seoGeo";
import { SocialMediaConfig } from "@/data/socialMedia";

interface AdminBackupSectionProps {
  currentModules: HomePageModulesConfig | null;
  currentSettings: SiteSettingsConfig | null;
  currentSeo: SeoGeoConfig | null;
  currentSocial: SocialMediaConfig | null;
  onConfigsRestored: (configs: {
    modules: HomePageModulesConfig;
    settings: SiteSettingsConfig;
    seo: SeoGeoConfig;
    social: SocialMediaConfig;
  }) => void;
  onNotify: (msg: { type: "success" | "error"; text: string }) => void;
}

export default function AdminBackupSection({
  currentModules,
  currentSettings,
  currentSeo,
  currentSocial,
  onConfigsRestored,
  onNotify
}: AdminBackupSectionProps) {
  const [backups, setBackups] = useState<SiteBackupItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [showNewModal, setShowNewModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch backups from API
  const fetchBackups = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/backup", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.backups)) {
        setBackups(data.backups);
      }
    } catch (err) {
      console.error("Backups fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackups();
  }, []);

  // 1. Create Manual Backup
  const handleCreateBackup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      setActionLoading(true);
      const res = await fetch("/api/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          title: newTitle.trim() || undefined,
          description: newDesc.trim() || undefined,
          type: "manual"
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        onNotify({ type: "success", text: data.message || "Yedek başarıyla oluşturuldu." });
        setBackups(data.backups || []);
        setNewTitle("");
        setNewDesc("");
        setShowNewModal(false);
      } else {
        onNotify({ type: "error", text: data.message || "Yedek alınamadı." });
      }
    } catch {
      onNotify({ type: "error", text: "Yedekleme sırasında sunucu bağlantı hatası oluştu." });
    } finally {
      setActionLoading(false);
    }
  };

  // 2. Restore Backup
  const handleRestore = async (backup: SiteBackupItem) => {
    const confirmText = `"${backup.title}" yedeğini geri yüklemek istiyor musunuz?\n\n` +
      `Tarih: ${backup.formattedDate}\n` +
      `Oyun: ${backup.summary.gameEnabled ? "Açık" : "Kapalı"}\n` +
      `Aktif Modüller: ${backup.summary.enabledModulesCount}/${backup.summary.modulesCount}\n\n` +
      `Not: Mevcut ayarlarınız geri yükleme öncesinde otomatik olarak güvenlik yedeğine alınacaktır.`;

    if (!confirm(confirmText)) return;

    try {
      setActionLoading(true);
      const res = await fetch("/api/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "restore",
          backupId: backup.id
        })
      });
      const data = await res.json();
      if (res.ok && data.success && data.configs) {
        onConfigsRestored(data.configs);
        setBackups(data.backups || []);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("smy-settings-updated"));
        }
        onNotify({
          type: "success",
          text: `"${backup.title}" başarıyla geri yüklendi! Tüm anasayfa ve site ayarları anında güncellendi.`
        });
      } else {
        onNotify({ type: "error", text: data.message || "Geri yükleme başarısız." });
      }
    } catch {
      onNotify({ type: "error", text: "Geri yükleme sırasında bir hata oluştu." });
    } finally {
      setActionLoading(false);
    }
  };

  // 3. Quick Undo Last Change
  const handleUndo = async () => {
    if (backups.length === 0) {
      alert("Geri alınabilecek kayıtlı bir işlem geçmişi bulunamadı.");
      return;
    }
    const latest = backups[0];
    if (!confirm(`Son yapılan değişikliği geri alıp "${latest.title}" (${latest.formattedDate}) durumuna dönmek istiyor musunuz?`)) {
      return;
    }

    try {
      setActionLoading(true);
      const res = await fetch("/api/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "undo" })
      });
      const data = await res.json();
      if (res.ok && data.success && data.configs) {
        onConfigsRestored(data.configs);
        setBackups(data.backups || []);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("smy-settings-updated"));
        }
        onNotify({
          type: "success",
          text: `İşlem başarıyla geri alındı: "${latest.title}" durumuna dönüldü.`
        });
      } else {
        onNotify({ type: "error", text: data.message || "Geri alma başarısız." });
      }
    } catch {
      onNotify({ type: "error", text: "Geri alma sırasında hata oluştu." });
    } finally {
      setActionLoading(false);
    }
  };

  // 4. Delete Backup
  const handleDelete = async (backup: SiteBackupItem) => {
    if (!confirm(`"${backup.title}" yedeğini kalıcı olarak silmek istediğinizden emin misiniz?`)) {
      return;
    }
    try {
      setActionLoading(true);
      const res = await fetch("/api/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          backupId: backup.id
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        onNotify({ type: "success", text: "Yedek silindi." });
        setBackups(data.backups || []);
      } else {
        onNotify({ type: "error", text: data.message || "Yedek silinemedi." });
      }
    } catch {
      onNotify({ type: "error", text: "Silme işlemi sırasında hata oluştu." });
    } finally {
      setActionLoading(false);
    }
  };

  // 5. Reset All to Defaults
  const handleResetAll = async () => {
    const confirmMessage = "DİKKAT: TÜM SİTE AYARLARI SIFIRLANACAK!\n\n" +
      "1. Anasayfa modülleri orijinal dizilime dönecek\n" +
      "2. Tema, Oyun ve Güvenlik ayarları varsayılana dönecek\n" +
      "3. SEO ve Sosyal medya ayarları fabrika değerlerine dönecek\n\n" +
      "Sıfırlama yapılmadan önce otomatik bir güvenlik yedeği alınacaktır. Onaylıyor musunuz?";

    if (!confirm(confirmMessage)) return;

    try {
      setActionLoading(true);
      const res = await fetch("/api/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset_all" })
      });
      const data = await res.json();
      if (res.ok && data.success && data.configs) {
        onConfigsRestored(data.configs);
        setBackups(data.backups || []);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("smy-settings-updated"));
        }
        onNotify({
          type: "success",
          text: "Tüm site ayarları başarıyla fabrika ayarlarına sıfırlandı. (Güvenlik yedeği oluşturuldu)."
        });
      } else {
        onNotify({ type: "error", text: data.message || "Sıfırlama başarısız oldu." });
      }
    } catch {
      onNotify({ type: "error", text: "Sıfırlama sırasında sunucu hatası oluştu." });
    } finally {
      setActionLoading(false);
    }
  };

  // 6. Export / Download JSON to PC
  const handleDownloadBackupJson = (backup?: SiteBackupItem) => {
    let exportData: any;
    let filename: string;

    const dateStr = new Date().toISOString().slice(0, 10);

    if (backup) {
      exportData = backup;
      filename = `sakarya-mimar-yapi-yedek-${backup.id}.json`;
    } else {
      // Export current live site state
      exportData = {
        title: `Tam Sistem Yedeği (${dateStr})`,
        exportedAt: new Date().toISOString(),
        site: "Sakarya Mimar Yapı",
        data: {
          modules: currentModules,
          settings: currentSettings,
          seo: currentSeo,
          social: currentSocial
        }
      };
      filename = `sakarya-mimar-yapi-canli-yedek-${dateStr}.json`;
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onNotify({ type: "success", text: `${filename} dosyası bilgisayarınıza indirildi.` });
  };

  // 7. Import JSON from PC
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);

        if (!confirm(`"${file.name}" dosyasındaki yedek ayarları sisteme yüklenip uygulansın mı?`)) {
          if (fileInputRef.current) fileInputRef.current.value = "";
          return;
        }

        setActionLoading(true);
        const res = await fetch("/api/backup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "import",
            importedJson: parsed
          })
        });
        const data = await res.json();
        if (res.ok && data.success && data.configs) {
          onConfigsRestored(data.configs);
          setBackups(data.backups || []);
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("smy-settings-updated"));
          }
          onNotify({
            type: "success",
            text: "Dosyadan yedek başarıyla yüklendi ve tüm site güncellendi!"
          });
        } else {
          onNotify({ type: "error", text: data.message || "Dosya içe aktarılamadı." });
        }
      } catch (err: any) {
        onNotify({ type: "error", text: "Geçersiz veya bozuk JSON dosyası: " + err?.message });
      } finally {
        setActionLoading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input for Import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".json"
        className="hidden"
      />

      {/* Top Banner & Quick Controls */}
      <div className="bg-gradient-to-br from-[#0f2b5c] via-[#0d234d] to-[#07142b] border border-blue-900/40 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/10">
              <FolderArchive className="w-3.5 h-3.5 text-amber-400" />
              <span>Geri Alma & Güvenlik Koruması</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Yedekleme, Geçmiş & Tek Tıkla Geri Yükleme
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Yanlışlıkla bir modülü kapattığınızda, içeriği sildiğinizde veya ayarları değiştirdiğinizde endişelenmeyin. 
              İstediğiniz zaman <strong>tek tıkla eski haline dönebilir</strong>, anlık yedek alabilir veya tüm yapılandırmayı bilgisayarınıza indirebilirsiniz.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setShowNewModal(true)}
              disabled={actionLoading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              <Save className="w-4 h-4 text-slate-950" />
              <span>Şimdi Yedek Al</span>
            </button>

            <button
              onClick={handleUndo}
              disabled={actionLoading || backups.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all hover:scale-[1.02] disabled:opacity-40"
              title="Son yapılan değişikliği geri alır"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
              <span>Son Değişikliği Geri Al</span>
            </button>

            <button
              onClick={() => handleDownloadBackupJson()}
              disabled={actionLoading}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-xs border border-white/10 transition-colors"
              title="Canlı ayarları bilgisayarınıza .json olarak indirir"
            >
              <Download className="w-3.5 h-3.5 text-slate-300" />
              <span>İndir (.json)</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={actionLoading}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-xs border border-white/10 transition-colors"
              title="Daha önce indirilen .json yedeğini geri yükler"
            >
              <Upload className="w-3.5 h-3.5 text-slate-300" />
              <span>Yedek Yükle</span>
            </button>
          </div>
        </div>

        {/* Live Status Mini Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <span className="text-[11px] text-slate-400 block font-medium">Toplam Yedek Kaydı</span>
            <span className="text-base font-extrabold text-amber-300 mt-0.5 block">{backups.length} Adet</span>
          </div>

          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <span className="text-[11px] text-slate-400 block font-medium">Tuğla Oyunu Durumu</span>
            <span className={`text-xs font-black px-2 py-0.5 rounded-full inline-block mt-1 ${
              currentSettings?.game?.enabled 
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" 
                : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
            }`}>
              {currentSettings?.game?.enabled ? "Yayında (Açık)" : "Kapalı"}
            </span>
          </div>

          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <span className="text-[11px] text-slate-400 block font-medium">Aktif Anasayfa Modülü</span>
            <span className="text-base font-extrabold text-white mt-0.5 block">
              {Object.values(currentModules?.sections || {}).filter(s => s.enabled).length} / {Object.values(currentModules?.sections || {}).length}
            </span>
          </div>

          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <span className="text-[11px] text-slate-400 block font-medium">Aktif Renk Teması</span>
            <span className="text-xs font-bold text-amber-300 capitalize mt-1 block">
              {currentSettings?.theme?.activeTheme || "Gold & Antrasit"}
            </span>
          </div>
        </div>
      </div>

      {/* Manual Backup Modal Box */}
      {showNewModal && (
        <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 shadow-lg space-y-4 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Save className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-950">Yeni Sistem Yedeği Oluştur</h3>
                <p className="text-[11px] text-slate-500">Mevcut tüm ayarlar anında güvenle arşivlenecektir.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowNewModal(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 px-2 py-1"
            >
              Kapat ✕
            </button>
          </div>

          <form onSubmit={handleCreateBackup} className="space-y-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">
                Yedek Başlığı (İsteğe Bağlı)
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={`Örn: Tuğla Oyunu Kapatılmadan Önceki Hali veya Sezon Sonu Düzeni`}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">
                Açıklama / Not (İsteğe Bağlı)
              </label>
              <input
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Örn: Müşteri istekleri doğrultusunda modül sırası güncellendi."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                disabled={actionLoading}
                className="px-5 py-2 rounded-xl bg-[#0f2b5c] hover:bg-[#163a75] text-white text-xs font-bold shadow-md transition-all disabled:opacity-50"
              >
                {actionLoading ? "Kaydediliyor..." : "Yedeği Kaydet"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Backups List Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-[#0f2b5c]" />
              <h3 className="text-base font-bold text-slate-900">Yedekleme ve İşlem Geçmişi</h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {backups.length} Kayıt
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Herhangi bir yedeğe tıklayarak tek adımda o tarihteki ayarlara dönebilirsiniz.
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={fetchBackups}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              title="Yedek listesini yenile"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Yenile</span>
            </button>

            <button
              onClick={handleResetAll}
              disabled={actionLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors"
              title="Tüm ayarları orijinal fabrika ayarlarına döndürür"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Fabrika Ayarlarına Döndür</span>
            </button>
          </div>
        </div>

        {/* List of Backups */}
        {loading && backups.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <div className="w-7 h-7 border-3 border-[#0f2b5c] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-slate-500 font-semibold">Yedekler yükleniyor...</span>
          </div>
        ) : backups.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <FolderArchive className="w-6 h-6" />
            </div>
            <div className="text-sm font-bold text-slate-700">Henüz Kaydedilmiş Yedek Bulunmuyor</div>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              &quot;Şimdi Yedek Al&quot; butonuna basarak ilk yedeğinizi oluşturabilir veya değişiklik yaptığınızda sistemin otomatik yedek almasını sağlayabilirsiniz.
            </p>
            <button
              onClick={() => setShowNewModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0f2b5c] text-white text-xs font-bold hover:bg-[#163a75] transition-all"
            >
              <Save className="w-3.5 h-3.5 text-amber-400" />
              <span>İlk Yedeği Oluştur</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {backups.map((b, idx) => (
              <div
                key={b.id}
                className="py-4 first:pt-0 last:pb-0 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/70 p-3 rounded-2xl transition-colors"
              >
                {/* Left: Info & Badges */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-black text-slate-900 truncate">
                      {b.title}
                    </span>

                    {/* Badge for Type */}
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      b.type === "manual"
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : b.type === "pre_reset"
                        ? "bg-rose-100 text-rose-800 border border-rose-200"
                        : "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}>
                      {b.type === "manual" ? "Manuel Yedek" : b.type === "pre_reset" ? "Sıfırlama Öncesi" : "Otomatik Sistem"}
                    </span>

                    {idx === 0 && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        En Son Kayıt
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500">
                    {b.description}
                  </p>

                  {/* Summary Badges */}
                  <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-600 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{b.formattedDate}</span>
                    </span>

                    <span>•</span>

                    <span className="flex items-center gap-1 font-semibold">
                      <Gamepad2 className="w-3.5 h-3.5 text-[#0f2b5c]" />
                      <span>Oyun:</span>
                      <strong className={b.summary?.gameEnabled ? "text-emerald-700 font-bold" : "text-rose-700 font-bold"}>
                        {b.summary?.gameEnabled ? "Açık" : "Kapalı"}
                      </strong>
                    </span>

                    <span>•</span>

                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-slate-400" />
                      <span>{b.summary?.enabledModulesCount} Modül Aktif</span>
                    </span>

                    <span>•</span>

                    <span className="capitalize">
                      Tema: {b.summary?.activeTheme || "Gold"}
                    </span>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                  <button
                    onClick={() => handleRestore(b)}
                    disabled={actionLoading}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0f2b5c] hover:bg-[#163a75] text-white text-xs font-bold shadow-xs transition-all hover:scale-[1.02] disabled:opacity-50"
                    title="Bu tarihteki ayarlara anında geri dön"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                    <span>Geri Yükle</span>
                  </button>

                  <button
                    onClick={() => handleDownloadBackupJson(b)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Yedeği .json dosyası olarak bilgisayara indir"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(b)}
                    disabled={actionLoading}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Yedeği sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Safety Notice Card */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-5 flex items-start gap-3.5 text-amber-900 text-xs">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold">Otomatik Güvenlik Güvencesi</h4>
          <p className="text-amber-800 leading-relaxed">
            Sitede yapılan her &quot;Değişiklikleri Yayınla&quot; veya &quot;Fabrika Ayarlarına Döndür&quot; işleminde sistem otomatik olarak mevcut ayarların anlık kopyasını alır. 
            Böylece yanlışlıkla yapılan silme, kapatma ya da sıralama işlemlerini tek bir tıkla her zaman geri alabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
