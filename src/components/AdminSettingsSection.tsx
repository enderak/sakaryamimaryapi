"use client";

import { useState } from "react";
import { 
  KeyRound, 
  ShieldCheck, 
  Mail, 
  Plus, 
  Trash2, 
  Rss, 
  BookOpen, 
  Palette, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Lock,
  Layers,
  Settings,
  Globe,
  Sliders,
  Check,
  Smartphone,
  Eye,
  ShieldAlert,
  Ban,
  Shield,
  Server,
  Activity,
  Gamepad2,
  Trophy,
  Sparkles,
  Percent
} from "lucide-react";
import { SiteSettingsConfig, defaultSiteSettingsConfig, RssFeedSource } from "@/data/siteSettings";
import { themeOptions, ThemeType } from "@/components/ThemeSwitcher";

interface AdminSettingsSectionProps {
  settings: SiteSettingsConfig;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettingsConfig | null>>;
  currentUserEmail?: string;
  onSave: () => Promise<void>;
  onReset: () => Promise<void>;
  saving: boolean;
}

export default function AdminSettingsSection({
  settings,
  setSettings,
  currentUserEmail,
  onSave,
  onReset,
  saving
}: AdminSettingsSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState<"security" | "rss" | "blog" | "theme" | "game">("security");
  const [newEmail, setNewEmail] = useState("");
  const [newEmailError, setNewEmailError] = useState<string | null>(null);
  const [newBlockedIp, setNewBlockedIp] = useState("");
  const [newBlockedIpError, setNewBlockedIpError] = useState<string | null>(null);
  
  // New RSS Feed State
  const [newFeedName, setNewFeedName] = useState("");
  const [newFeedUrl, setNewFeedUrl] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // Inline Notification State
  const [inlineMessage, setInlineMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [gameToggling, setGameToggling] = useState(false);

  // Handle Email Add
  const handleAddEmail = () => {
    setNewEmailError(null);
    const trimmed = newEmail.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@") || !trimmed.includes(".")) {
      setNewEmailError("Lütfen geçerli bir e-posta adresi yazınız.");
      return;
    }
    if (settings.security.allowedEmails.map(e => e.toLowerCase()).includes(trimmed)) {
      setNewEmailError("Bu e-posta adresi zaten yetkili listesinde mevcut.");
      return;
    }
    setSettings(prev => {
      const base = prev || settings;
      return {
        ...base,
        security: {
          ...base.security,
          allowedEmails: [...base.security.allowedEmails, trimmed]
        }
      };
    });
    setNewEmail("");
  };

  // Handle Email Delete
  const handleRemoveEmail = (emailToRemove: string) => {
    if (settings.security.allowedEmails.length <= 1) {
      alert("En az bir yönetici e-posta adresi bulunmalıdır!");
      return;
    }
    if (currentUserEmail && emailToRemove.toLowerCase() === currentUserEmail.toLowerCase()) {
      if (!confirm("Kendi oturum açtığınız e-posta adresini silmek üzeresiniz. Emin misiniz?")) {
        return;
      }
    }
    setSettings(prev => {
      const base = prev || settings;
      return {
        ...base,
        security: {
          ...base.security,
          allowedEmails: base.security.allowedEmails.filter(e => e.toLowerCase() !== emailToRemove.toLowerCase())
        }
      };
    });
  };

  // Handle Blocked IP Add
  const handleAddBlockedIp = () => {
    setNewBlockedIpError(null);
    const trimmed = newBlockedIp.trim();
    if (!trimmed) {
      setNewBlockedIpError("Geçerli bir IP adresi yazınız.");
      return;
    }
    const currentList = settings.security.blockedIps || [];
    if (currentList.includes(trimmed)) {
      setNewBlockedIpError("Bu IP adresi zaten engellenenler listesinde.");
      return;
    }
    setSettings(prev => {
      const base = prev || settings;
      return {
        ...base,
        security: {
          ...base.security,
          blockedIps: [...(base.security.blockedIps || []), trimmed]
        }
      };
    });
    setNewBlockedIp("");
  };

  // Handle Blocked IP Remove
  const handleRemoveBlockedIp = (ipToRemove: string) => {
    setSettings(prev => {
      const base = prev || settings;
      return {
        ...base,
        security: {
          ...base.security,
          blockedIps: (base.security.blockedIps || []).filter(ip => ip !== ipToRemove)
        }
      };
    });
  };

  // Handle RSS Feed Add
  const handleAddFeed = () => {
    if (!newFeedName.trim() || !newFeedUrl.trim()) {
      alert("Lütfen feed başlığı ve geçerli bir RSS linki giriniz.");
      return;
    }
    const newFeed: RssFeedSource = {
      id: `feed-${Date.now()}`,
      name: newFeedName.trim(),
      url: newFeedUrl.trim(),
      enabled: true
    };
    setSettings(prev => {
      const base = prev || settings;
      return {
        ...base,
        rss: {
          ...base.rss,
          feeds: [...base.rss.feeds, newFeed]
        }
      };
    });
    setNewFeedName("");
    setNewFeedUrl("");
  };

  // Handle RSS Feed Remove
  const handleRemoveFeed = (id: string) => {
    setSettings(prev => {
      const base = prev || settings;
      return {
        ...base,
        rss: {
          ...base.rss,
          feeds: base.rss.feeds.filter(f => f.id !== id)
        }
      };
    });
  };

  // Handle RSS Keyword Add
  const handleAddKeyword = () => {
    const trimmed = newKeyword.trim().toLowerCase();
    if (!trimmed) return;
    const currentKws = settings.rss.keywords || [];
    if (currentKws.map(k => k.toLowerCase()).includes(trimmed)) return;
    setSettings(prev => {
      const base = prev || settings;
      return {
        ...base,
        rss: {
          ...base.rss,
          keywords: [...(base.rss.keywords || []), trimmed]
        }
      };
    });
    setNewKeyword("");
  };

  // Handle RSS Keyword Remove
  const handleRemoveKeyword = (kw: string) => {
    setSettings(prev => {
      const base = prev || settings;
      return {
        ...base,
        rss: {
          ...base.rss,
          keywords: (base.rss.keywords || []).filter(k => k.toLowerCase() !== kw.toLowerCase())
        }
      };
    });
  };

  // Handle Blog Category Add
  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed) return;
    if (settings.blog.categories.includes(trimmed)) return;
    setSettings(prev => {
      const base = prev || settings;
      return {
        ...base,
        blog: {
          ...base.blog,
          categories: [...base.blog.categories, trimmed]
        }
      };
    });
    setNewCategory("");
  };

  // Handle Blog Category Remove
  const handleRemoveCategory = (cat: string) => {
    setSettings(prev => {
      const base = prev || settings;
      return {
        ...base,
        blog: {
          ...base.blog,
          categories: base.blog.categories.filter(c => c !== cat)
        }
      };
    });
  };

  return (
    <div className="space-y-6">
      {/* Sub Tabs Navigation */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-xs flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSubTab("security")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "security"
              ? "bg-[#0f2b5c] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <KeyRound className="w-4 h-4 text-amber-400" />
          <span>Şifre & Yetkili Yöneticiler</span>
        </button>

        <button
          onClick={() => setActiveSubTab("rss")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "rss"
              ? "bg-[#0f2b5c] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Rss className="w-4 h-4 text-emerald-400" />
          <span>RSS Haber Akışı Ayarları</span>
        </button>

        <button
          onClick={() => setActiveSubTab("blog")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "blog"
              ? "bg-[#0f2b5c] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>Blog & Rehber Ayarları</span>
        </button>

        <button
          onClick={() => setActiveSubTab("theme")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "theme"
              ? "bg-[#0f2b5c] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Palette className="w-4 h-4 text-fuchsia-400" />
          <span>Tema & Görsel Arayüz</span>
        </button>

        <button
          onClick={() => setActiveSubTab("game")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "game"
              ? "bg-[#0f2b5c] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Gamepad2 className="w-4 h-4 text-amber-400" />
          <span>Tuğla Oyunu Ayarları</span>
          {!(settings.game?.enabled ?? defaultSiteSettingsConfig.game.enabled) && (
            <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-rose-500/20 text-rose-300 font-extrabold">Kapalı</span>
          )}
        </button>
      </div>

      {/* 1. SECURITY & ADMIN EMAILS */}
      {activeSubTab === "security" && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0f2b5c] text-xs font-bold mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0f2b5c]" />
                <span>Panel Güvenliği & Erişim</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Yetkili Yönetici E-Postaları & Doğrulama</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                Yalnızca burada listelenen e-posta adresleri Google One-Tap veya tek kullanımlık 6 haneli güvenlik kodu (OTP) ile panele giriş yapabilir.
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-2xl text-[#0f2b5c] shrink-0 hidden sm:block">
              <Lock className="w-6 h-6" />
            </div>
          </div>

          {/* Email List */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#0f2b5c]" />
              <span>Tanımlı Yönetici Adresleri ({settings.security.allowedEmails.length})</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {settings.security.allowedEmails.map((email) => {
                const isCurrent = currentUserEmail?.toLowerCase() === email.toLowerCase();
                return (
                  <div
                    key={email}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#0f2b5c] flex items-center justify-center font-bold text-xs shrink-0">
                        {email[0].toUpperCase()}
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-900 truncate">{email}</div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Tam Yetkili Yönetici</span>
                          {isCurrent && (
                            <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                              Siz
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveEmail(email)}
                      disabled={settings.security.allowedEmails.length <= 1}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                      title="Yetkiyi Kaldır"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Add New Email Input */}
            <div className="mt-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3">
              <label className="block text-xs font-bold text-slate-800">
                Yeni Yönetici E-Postası Ekle
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddEmail();
                      }
                    }}
                    placeholder="ornek@gmail.com"
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0f2b5c]"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddEmail}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0f2b5c] hover:bg-[#163a75] text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yetki Ver</span>
                </button>
              </div>
              {newEmailError && (
                <p className="text-xs text-rose-600 font-medium flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{newEmailError}</span>
                </p>
              )}
            </div>
          </div>

          {/* Security Preferences */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.requireOtp}
                  onChange={(e) =>
                    setSettings(prev => {
                      const base = prev || settings;
                      return {
                        ...base,
                        security: { ...base.security, requireOtp: e.target.checked }
                      };
                    })
                  }
                  className="w-4 h-4 text-[#0f2b5c] rounded focus:ring-0"
                />
                <span className="text-xs font-bold text-slate-800">2 Aşamalı Doğrulama (OTP) Zorunlu</span>
              </label>
              <p className="text-[11px] text-slate-500 mt-1 ml-6">
                Her girişte güvenli 6 haneli kod üretilir ve e-postaya iletilir.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Oturum Geçerlilik Süresi (Gün)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={settings.security.sessionDurationDays}
                onChange={(e) =>
                  setSettings(prev => {
                    const base = prev || settings;
                    return {
                      ...base,
                      security: { ...base.security, sessionDurationDays: Number(e.target.value) || 7 }
                    };
                  })
                }
                className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0f2b5c]"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Admin çerezi belirtilen gün sonunda otomatik olarak sonlandırılır.
              </p>
            </div>
          </div>

          {/* 1.1 Web Application Firewall (WAF) & Saldırı Savunma Kalkanı */}
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Web Güvenlik Duvarı (WAF) & Otomatik Savunma Kalkanı
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.rateLimitingEnabled ?? true}
                    onChange={(e) =>
                      setSettings(prev => {
                        const base = prev || settings;
                        return {
                          ...base,
                          security: { ...base.security, rateLimitingEnabled: e.target.checked }
                        };
                      })
                    }
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span className="text-xs font-bold text-slate-800">DDoS & Spam Sınırlandırma (Rate Limit)</span>
                </label>
                <p className="text-[11px] text-slate-500 mt-1 ml-6">
                  Aynı IP&apos;den 10 dakikada gelen istekleri akıllıca sınırlar.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.blockMaliciousUserAgents ?? true}
                    onChange={(e) =>
                      setSettings(prev => {
                        const base = prev || settings;
                        return {
                          ...base,
                          security: { ...base.security, blockMaliciousUserAgents: e.target.checked }
                        };
                      })
                    }
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span className="text-xs font-bold text-slate-800">Zararlı Tarayıcı/Bot Koruması</span>
                </label>
                <p className="text-[11px] text-slate-500 mt-1 ml-6">
                  sqlmap, nikto, dirbuster vb. otomatik zafiyet tarayıcılarını engeller.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.xssProtectionStrict ?? true}
                    onChange={(e) =>
                      setSettings(prev => {
                        const base = prev || settings;
                        return {
                          ...base,
                          security: { ...base.security, xssProtectionStrict: e.target.checked }
                        };
                      })
                    }
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span className="text-xs font-bold text-slate-800">Katı XSS & Kod Enjeksiyon Filtresi</span>
                </label>
                <p className="text-[11px] text-slate-500 mt-1 ml-6">
                  Tüm form girdilerini HTML Entity şifrelemesiyle temizler.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.clickjackingProtection ?? true}
                    onChange={(e) =>
                      setSettings(prev => {
                        const base = prev || settings;
                        return {
                          ...base,
                          security: { ...base.security, clickjackingProtection: e.target.checked }
                        };
                      })
                    }
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span className="text-xs font-bold text-slate-800">Clickjacking Savunması (iFrame Kilidi)</span>
                </label>
                <p className="text-[11px] text-slate-500 mt-1 ml-6">
                  Sitenin başka zararlı sayfalarda çerçeve içine alınmasını engeller.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.hstsEnabled ?? true}
                    onChange={(e) =>
                      setSettings(prev => {
                        const base = prev || settings;
                        return {
                          ...base,
                          security: { ...base.security, hstsEnabled: e.target.checked }
                        };
                      })
                    }
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span className="text-xs font-bold text-slate-800">Zorunlu HSTS & SSL Şifreleme</span>
                </label>
                <p className="text-[11px] text-slate-500 mt-1 ml-6">
                  Tüm bağlantıları HTTPS tüneli üzerinden güvene alır.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  10 Dakikalık Form İstek Limiti
                </label>
                <input
                  type="number"
                  min="2"
                  max="20"
                  value={settings.security.maxContactRequestsPer10Min || 5}
                  onChange={(e) =>
                    setSettings(prev => {
                      const base = prev || settings;
                      return {
                        ...base,
                        security: { ...base.security, maxContactRequestsPer10Min: Number(e.target.value) || 5 }
                      };
                    })
                  }
                  className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0f2b5c]"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Tek bir IP&apos;den gönderilebilecek azami teklif/iletişim adedi.
                </p>
              </div>
            </div>
          </div>

          {/* 1.2 IP Engelleme & Kara Liste (IP Blacklist) */}
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ban className="w-4 h-4 text-rose-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Engellenen IP Adresleri (Kara Liste - {settings.security.blockedIps?.length || 0})
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Buraya eklenen IP adreslerinin iletişim formlarına, API uçlarına ve siteye erişimi güvenlik kalkanı tarafından 403 Forbidden ile kesilir.
            </p>

            <div className="flex flex-wrap gap-2">
              {(settings.security.blockedIps || []).length === 0 ? (
                <div className="text-xs text-slate-400 italic py-2">
                  Şu anda engellenmiş bir IP adresi bulunmamaktadır.
                </div>
              ) : (
                settings.security.blockedIps.map((ip) => (
                  <div
                    key={ip}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold"
                  >
                    <span>{ip}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBlockedIp(ip)}
                      className="p-0.5 hover:text-rose-700 hover:bg-rose-100 rounded"
                      title="Engeli Kaldır"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Add IP Input */}
            <div className="flex flex-col sm:flex-row gap-2 max-w-md pt-2">
              <input
                type="text"
                value={newBlockedIp}
                onChange={(e) => setNewBlockedIp(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddBlockedIp();
                  }
                }}
                placeholder="Örn: 192.168.1.100 veya 85.105.x.x"
                className="flex-1 text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-rose-600"
              />
              <button
                type="button"
                onClick={handleAddBlockedIp}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>IP Engelle</span>
              </button>
            </div>
            {newBlockedIpError && (
              <p className="text-xs text-rose-600 font-medium flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{newBlockedIpError}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* 2. RSS NEWS SETTINGS */}
      {activeSubTab === "rss" && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2">
                <Rss className="w-3.5 h-3.5 text-emerald-600" />
                <span>Canlı Haber Entegrasyonu</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">RSS Haber Akışı ve Kaynak Yönetimi</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                Anasayfadaki haber bandına canlı haber akışı sağlayan XML/RSS kaynaklarını yapılandırın.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Haber Bandı:</span>
              <button
                type="button"
                onClick={() =>
                  setSettings(prev => {
                    const base = prev || settings;
                    return {
                      ...base,
                      rss: { ...base.rss, enabled: !base.rss.enabled }
                    };
                  })
                }
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  settings.rss.enabled
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {settings.rss.enabled ? "Aktif" : "Kapalı"}
              </button>
            </div>
          </div>

          {/* Limit and Refresh Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Gösterilecek Haber Sayısı
              </label>
              <input
                type="number"
                min="2"
                max="12"
                value={settings.rss.itemsToShow}
                onChange={(e) =>
                  setSettings(prev => {
                    const base = prev || settings;
                    return {
                      ...base,
                      rss: { ...base.rss, itemsToShow: Number(e.target.value) || 4 }
                    };
                  })
                }
                className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0f2b5c]"
              />
              <p className="text-[11px] text-slate-500 mt-1">Anasayfada listelenecek maksimum son dakika haber kartı.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Yenileme Aralığı (Dakika)
              </label>
              <input
                type="number"
                min="5"
                max="120"
                value={settings.rss.refreshIntervalMinutes}
                onChange={(e) =>
                  setSettings(prev => {
                    const base = prev || settings;
                    return {
                      ...base,
                      rss: { ...base.rss, refreshIntervalMinutes: Number(e.target.value) || 30 }
                    };
                  })
                }
                className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0f2b5c]"
              />
              <p className="text-[11px] text-slate-500 mt-1">Önbellek süresi ve otomatik güncelleme periyodu.</p>
            </div>
          </div>

          {/* RSS Feeds List */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center justify-between">
              <span>Bağlı RSS Kaynakları ({settings.rss.feeds.length})</span>
            </h3>

            <div className="space-y-2.5">
              {settings.rss.feeds.map((feed, idx) => (
                <div
                  key={feed.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...settings.rss.feeds];
                        updated[idx].enabled = !updated[idx].enabled;
                        setSettings(prev => {
                          const base = prev || settings;
                          return { ...base, rss: { ...base.rss, feeds: updated } };
                        });
                      }}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        feed.enabled ? "bg-emerald-600 text-white" : "bg-slate-300 text-slate-600"
                      }`}
                      title="Kaynağı Aç/Kapat"
                    >
                      {feed.enabled ? <Check className="w-4 h-4" /> : "✕"}
                    </button>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-900">{feed.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{feed.url}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <a
                      href={feed.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                      title="Bağlantıyı Test Et"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeed(feed.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Kaynağı Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Feed Box */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
              <label className="block text-xs font-bold text-slate-800">
                Yeni RSS Kaynağı Ekle
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={newFeedName}
                  onChange={(e) => setNewFeedName(e.target.value)}
                  placeholder="Kaynak Adı (Örn: Hürriyet Emlak)"
                  className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
                <input
                  type="url"
                  value={newFeedUrl}
                  onChange={(e) => setNewFeedUrl(e.target.value)}
                  placeholder="https://.../feed.xml"
                  className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>
              <button
                type="button"
                onClick={handleAddFeed}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>RSS Kaynağını Ekle</span>
              </button>
            </div>

            {/* Keyword Filtering & Content Rules */}
            <div className="pt-5 border-t border-slate-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Sakarya İnşaat, Tadilat & Dekorasyon Filtresi</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Yalnızca bu anahtar kelimeleri içeren sektörel haberlerin akışa girmesine izin verilir.
                  </p>
                </div>
                <label className="inline-flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <input
                    type="checkbox"
                    checked={settings.rss.filterKeywordsOnly ?? true}
                    onChange={(e) =>
                      setSettings(prev => {
                        const base = prev || settings;
                        return {
                          ...base,
                          rss: { ...base.rss, filterKeywordsOnly: e.target.checked }
                        };
                      })
                    }
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span className="text-xs font-bold text-slate-800">Filtreyi Uygula</span>
                </label>
              </div>

              {/* Keywords Tag List */}
              <div className="flex flex-wrap gap-1.5">
                {(settings.rss.keywords || []).map((kw) => (
                  <span
                    key={kw}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-medium"
                  >
                    <span>{kw}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(kw)}
                      className="text-emerald-700 hover:text-rose-600 rounded-sm font-bold ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Add New Keyword */}
              <div className="flex gap-2 max-w-sm">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddKeyword();
                    }
                  }}
                  placeholder="Yeni anahtar kelime ekle..."
                  className="flex-1 text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
                <button
                  type="button"
                  onClick={handleAddKeyword}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs"
                >
                  Ekle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. BLOG SETTINGS */}
      {activeSubTab === "blog" && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-bold mb-2">
                <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
                <span>İçerik & Blog Stratejisi</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Blog, Makale ve Kategori Ayarları</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                Sakarya tadilat, mimari rehber ve maliyet içeriklerinin anasayfa ve listeleme kurallarını yönetin.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Blog Yayını:</span>
              <button
                type="button"
                onClick={() =>
                  setSettings(prev => {
                    const base = prev || settings;
                    return {
                      ...base,
                      blog: { ...base.blog, enabled: !base.blog.enabled }
                    };
                  })
                }
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  settings.blog.enabled
                    ? "bg-cyan-700 text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {settings.blog.enabled ? "Aktif" : "Kapalı"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Sayfa Başına Yazı Sayısı
              </label>
              <input
                type="number"
                min="3"
                max="18"
                value={settings.blog.postsPerPage}
                onChange={(e) =>
                  setSettings(prev => {
                    const base = prev || settings;
                    return {
                      ...base,
                      blog: { ...base.blog, postsPerPage: Number(e.target.value) || 6 }
                    };
                  })
                }
                className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-600"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.blog.showAuthorInfo}
                  onChange={(e) =>
                    setSettings(prev => {
                      const base = prev || settings;
                      return {
                        ...base,
                        blog: { ...base.blog, showAuthorInfo: e.target.checked }
                      };
                    })
                  }
                  className="w-4 h-4 text-cyan-600 rounded"
                />
                <span className="text-xs font-bold text-slate-800">Yazar & Mimar Bilgisi Göster</span>
              </label>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.blog.showReadTime}
                  onChange={(e) =>
                    setSettings(prev => {
                      const base = prev || settings;
                      return {
                        ...base,
                        blog: { ...base.blog, showReadTime: e.target.checked }
                      };
                    })
                  }
                  className="w-4 h-4 text-cyan-600 rounded"
                />
                <span className="text-xs font-bold text-slate-800">Okuma Süresi Rozetini Göster</span>
              </label>
            </div>
          </div>

          {/* Categories Management */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">
              Aktif Blog Kategorileri ({settings.blog.categories.length})
            </h3>

            <div className="flex flex-wrap gap-2">
              {settings.blog.categories.map((cat) => (
                <div
                  key={cat}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs font-semibold"
                >
                  <span>{cat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(cat)}
                    className="p-0.5 hover:text-rose-600 rounded-md"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 max-w-md pt-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCategory();
                  }
                }}
                placeholder="Yeni kategori adı..."
                className="flex-1 text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-600"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-4 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs"
              >
                Ekle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. THEME & VISUAL INTERFACE */}
      {activeSubTab === "theme" && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-50 text-fuchsia-800 text-xs font-bold mb-2">
                <Palette className="w-3.5 h-3.5 text-fuchsia-600" />
                <span>Marka Görsel Kimliği</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Tema ve Renk Paleti Seçenekleri</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                Sitenin genel kurumsal duruşunu, renk paletini ve gezinme bileşenlerinin davranışını seçin.
              </p>
            </div>
          </div>

          {/* Theme Palette Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themeOptions.map((opt) => {
              const isSelected = settings.theme.activeTheme === opt.id;
              const IconComp = opt.icon;
              return (
                <div
                  key={opt.id}
                  onClick={() =>
                    setSettings(prev => {
                      const base = prev || settings;
                      return {
                        ...base,
                        theme: { ...base.theme, activeTheme: opt.id }
                      };
                    })
                  }
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? "border-[#0f2b5c] bg-blue-50/40 shadow-md"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-slate-100 text-[#0f2b5c]">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-slate-900">{opt.name}</div>
                        <div className="text-[10px] text-slate-500">{opt.badge}</div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-[#0f2b5c] text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 mb-3">{opt.desc}</p>
                  <div className="flex items-center gap-2">
                    {opt.colors.map((c, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full border border-slate-300 shadow-xs"
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Floating and Navbar Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.theme.showThemeSwitcher}
                  onChange={(e) =>
                    setSettings(prev => {
                      const base = prev || settings;
                      return {
                        ...base,
                        theme: { ...base.theme, showThemeSwitcher: e.target.checked }
                      };
                    })
                  }
                  className="w-4 h-4 text-[#0f2b5c] rounded"
                />
                <span className="text-xs font-bold text-slate-800">Menüde Tema Değiştirici Butonu</span>
              </label>
              <p className="text-[11px] text-slate-500 mt-1 ml-6">
                Ziyaretçilerin sağ üstten temayı değiştirebilmesine izin verir.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.theme.showWhatsAppFloating}
                  onChange={(e) =>
                    setSettings(prev => {
                      const base = prev || settings;
                      return {
                        ...base,
                        theme: { ...base.theme, showWhatsAppFloating: e.target.checked }
                      };
                    })
                  }
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <span className="text-xs font-bold text-slate-800">WhatsApp Sabit Canlı Destek Butonu</span>
              </label>
              <p className="text-[11px] text-slate-500 mt-1 ml-6">
                Ekranın sağ alt köşesinde hızlı teklif butonunu gösterir.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.theme.showCookieBanner}
                  onChange={(e) =>
                    setSettings(prev => {
                      const base = prev || settings;
                      return {
                        ...base,
                        theme: { ...base.theme, showCookieBanner: e.target.checked }
                      };
                    })
                  }
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-xs font-bold text-slate-800">KVKK Çerez Uyarı Bandı</span>
              </label>
              <p className="text-[11px] text-slate-500 mt-1 ml-6">
                Yasal mevzuata uygun onay penceresini gösterir.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. GAME SETTINGS */}
      {activeSubTab === "game" && (() => {
        const game = settings.game || defaultSiteSettingsConfig.game;

        const updateGame = (updater: (prevGame: typeof game) => typeof game) => {
          setSettings(prev => {
            const base = prev || settings;
            const currentGame = base.game || defaultSiteSettingsConfig.game;
            return {
              ...base,
              game: updater(currentGame)
            };
          });
        };

        const handleDirectToggleGame = async () => {
          try {
            setGameToggling(true);
            setInlineMessage(null);
            const newEnabled = !game.enabled;
            const newGame = { ...game, enabled: newEnabled };
            const updatedSettings: SiteSettingsConfig = {
              ...settings,
              game: newGame
            };
            setSettings(updatedSettings);

            const res = await fetch("/api/settings", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ config: updatedSettings })
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok && data.success) {
              if (data.config) setSettings(data.config);
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("smy-settings-updated"));
              }
              setInlineMessage({
                type: "success",
                text: newEnabled 
                  ? "🎮 Tuğla Oyunu başarıyla AÇILDI ve yayına alındı!" 
                  : "🎮 Tuğla Oyunu başarıyla KAPATILDI."
              });
              setTimeout(() => setInlineMessage(null), 4000);
            } else {
              setInlineMessage({
                type: "error",
                text: data.message || `Kaydedilemedi (HTTP ${res.status}).`
              });
            }
          } catch (err: any) {
            setInlineMessage({
              type: "error",
              text: err?.message || "Bağlantı hatası oluştu."
            });
          } finally {
            setGameToggling(false);
          }
        };

        return (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold mb-2">
                  <Gamepad2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>İnteraktif Şantiye Modülü</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">Tuğla Aşırtma Oyunu & Kampanya Ayarları</h2>
                <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                  Ziyaretçiler için tuğla aşırtma oyununun açık/kapalı durumunu, menü butonlarını, skor barajını ve WhatsApp keşif indirimi teklifini buradan kontrol edin.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onSave}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0f2b5c] hover:bg-[#163a75] text-white font-bold text-xs shadow-sm transition-all disabled:opacity-50"
                  title="Oyun ile ilgili tüm metin ve kural değişikliklerini kaydet"
                >
                  <Save className="w-3.5 h-3.5 text-amber-400" />
                  <span>{saving ? "Kaydediliyor..." : "Oyun Ayarlarını Kaydet"}</span>
                </button>
              </div>
            </div>

            {/* Inline Alert */}
            {inlineMessage && (
              <div
                className={`p-4 rounded-2xl border flex items-center gap-3 ${
                  inlineMessage.type === "success"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-rose-50 border-rose-200 text-rose-800"
                }`}
              >
                {inlineMessage.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <span className="text-xs font-bold">{inlineMessage.text}</span>
              </div>
            )}

            {/* Status Hero Card */}
            <div className={`p-5 rounded-2xl border transition-all ${
              game.enabled 
                ? "bg-emerald-50/70 border-emerald-200" 
                : "bg-rose-50/70 border-rose-200"
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                    game.enabled ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
                  }`}>
                    <Gamepad2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-black text-slate-900">
                        {game.enabled ? "Oyun Yayında ve Oynanabilir" : "Oyun Geçici Olarak Kapatıldı"}
                      </h3>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        game.enabled ? "bg-emerald-200 text-emerald-900" : "bg-rose-200 text-rose-900"
                      }`}>
                        {game.enabled ? "AKTİF" : "KAPALI"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 max-w-xl">
                      {game.enabled 
                        ? "Ziyaretçiler /oyun adresine girip oynayabilir, harç teknesini doldurup hedef skoru geçtiklerinde indirim kazanabilir." 
                        : "Oyun devre dışı bırakıldığında /oyun sayfasında nazik bir bilgilendirme ekranı ile WhatsApp & keşif formu önerilir."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button
                    type="button"
                    disabled={gameToggling || saving}
                    onClick={handleDirectToggleGame}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50 ${
                      game.enabled
                        ? "bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 shadow-xs"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                    }`}
                  >
                    {gameToggling 
                      ? "Kaydediliyor..." 
                      : (game.enabled ? "Oyunu Hemen Kapat" : "Oyunu Hemen Aç")}
                  </button>

                  <a
                    href="/oyun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 shadow-xs"
                  >
                    <span>Önizle</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#0f2b5c]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Menu & Navigation Visibility Options */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Menü ve Bağlantı Görünürlüğü
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={game.showInNavbar}
                      onChange={(e) => updateGame(g => ({ ...g, showInNavbar: e.target.checked }))}
                      className="w-4 h-4 text-[#0f2b5c] rounded"
                    />
                    <span className="text-xs font-bold text-slate-800">Üst Menüde (Navbar) Oyun Butonunu Göster</span>
                  </label>
                  <p className="text-[11px] text-slate-500 mt-1 ml-6">
                    Ana sayfada ve diğer sayfalarda üst menüde (🎮 Tuğla Oyunu) sekmesini gösterir.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={game.showInFooter}
                      onChange={(e) => updateGame(g => ({ ...g, showInFooter: e.target.checked }))}
                      className="w-4 h-4 text-[#0f2b5c] rounded"
                    />
                    <span className="text-xs font-bold text-slate-800">Alt Bilgide (Footer) Oyun Linkini Göster</span>
                  </label>
                  <p className="text-[11px] text-slate-500 mt-1 ml-6">
                    Sayfanın altındaki hızlı bağlantılar sütununda oyun linkini gösterir.
                  </p>
                </div>
              </div>
            </div>

            {/* Reward & Discount Settings */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Oyun Ödülü & WhatsApp İndirim Kampanyası</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Kazanılacak İndirim Oranı (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={game.discountPercentage}
                      onChange={(e) => updateGame(g => ({ ...g, discountPercentage: Number(e.target.value) || 0 }))}
                      className="w-full text-xs px-3 py-2.5 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0f2b5c]"
                    />
                    <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">%</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Örn: 10 girildiğinde oyuncuya &quot;%10 Keşif & İşçilik İndirimi&quot; hakkı tanınır.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    İndirim İçin Gereken Minimum Skor
                  </label>
                  <input
                    type="number"
                    min="50"
                    step="50"
                    value={game.minScoreForDiscount}
                    onChange={(e) => updateGame(g => ({ ...g, minScoreForDiscount: Number(e.target.value) || 200 }))}
                    className="w-full text-xs px-3 py-2.5 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0f2b5c]"
                  />
                  <p className="text-[11px] text-slate-500">
                    Oyuncunun indirim rozetini açması için toplaması gereken puan (varsayılan: 200).
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Texts & Closed Notice */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Başlık ve Bilgilendirme Metinleri
              </h3>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Oyun Sayfa Başlığı
                </label>
                <input
                  type="text"
                  value={game.title}
                  onChange={(e) => updateGame(g => ({ ...g, title: e.target.value }))}
                  placeholder="Duvardan Tuğla Aşırtma Oyunu"
                  className="w-full text-xs px-3 py-2.5 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0f2b5c]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Oyun Kapalı Olduğunda Ziyaretçiye Gösterilecek Mesaj
                </label>
                <textarea
                  rows={3}
                  value={game.disabledMessage}
                  onChange={(e) => updateGame(g => ({ ...g, disabledMessage: e.target.value }))}
                  placeholder="Tuğla Aşırtma Oyunu şu anda geçici olarak kapalıdır..."
                  className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0f2b5c] resize-y"
                />
                <p className="text-[11px] text-slate-500">
                  Oyun kapatıldığında /oyun sayfasını ziyaret edenlere bu açıklama ve keşif hattı sunulur.
                </p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Global Save / Reset Action Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-700">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Ayarları Kaydetme & Senkronizasyon</div>
            <div className="text-[11px] text-slate-500">Değişiklikler anında güvenlik filtrelerine ve siteye uygulanır.</div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onReset}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Varsayılana Sıfırla</span>
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0f2b5c] hover:bg-[#163a75] text-white font-bold text-xs shadow-md shadow-blue-900/10 transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-amber-400" />
            <span>{saving ? "Kaydediliyor..." : "Tüm Ayarları Kaydet"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
