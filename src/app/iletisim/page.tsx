"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Globe, UserCheck, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { sakaryaDistricts } from "@/data/districts";
import { companyInfo } from "@/data/company";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    district: "Serdivan",
    service: "Komple Ev Tadilatı",
    targetPerson: "asim",
    message: "",
    website_hp: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [kvkkAccepted, setKvkkAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kvkkAccepted) {
      alert("Lütfen devam etmek için KVKK Aydınlatma Metni'ni onaylayınız.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || "Mesaj gönderilirken bir hata oluştu.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Bağlantı hatası oluştu. Lütfen doğrudan telefon veya WhatsApp ile iletişime geçiniz.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenWhatsAppBackup = () => {
    const person = formData.targetPerson === "asim" ? companyInfo.team[0] : companyInfo.team[1];
    const text = `Merhaba ${person.name} (${companyInfo.name}),
Web sitenizdeki iletişim formunu doldurdum:
- Ad Soyad: ${formData.name}
- Telefon: ${formData.phone}
${formData.email ? `- E-Posta: ${formData.email}\n` : ""}- İlçe: ${formData.district}
- Hizmet: ${formData.service}
- Not: ${formData.message}`;

    window.open(`https://wa.me/${person.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="py-16 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-2">
            <MapPin className="w-4 h-4" />
            <span>Serdivan Merkez Ofisimiz & İletişim</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Sakarya Mimar Yapı <span className="text-amber-400">İletişim</span>
          </h1>
          <p className="mt-3 text-slate-300 text-base">
            Serdivan Çark Caddesi&apos;ndeki ofisimize uğrayabilir veya form üzerinden mesajınızı doğrudan e-posta adresimize ({companyInfo.email}) iletebilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Team Members Direct Cards */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                Yetkili İletişim Hatları
              </h3>

              <div className="space-y-4">
                {companyInfo.team.map((person, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-base font-black text-white flex items-center gap-1.5">
                          <UserCheck className="w-4 h-4 text-amber-400" />
                          <span>{person.name}</span>
                        </div>
                        <div className="text-xs text-slate-400">{person.role}</div>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Yetkili
                      </span>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <a
                        href={`tel:${person.rawPhone}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-white transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>{person.phone}</span>
                      </a>

                      <a
                        href={`https://wa.me/${person.whatsappNumber}?text=${encodeURIComponent(
                          `Merhaba ${person.name}, Sakarya Mimar Yapı web siteniz üzerinden ulaşıyorum.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-transform hover:scale-105"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Office Details */}
              <div className="space-y-3 pt-2 text-xs border-t border-slate-800">
                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Adres:</strong>
                    <span>{companyInfo.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <strong className="text-white inline mr-1">Web:</strong>
                    <a href={companyInfo.website} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline font-bold">
                      {companyInfo.displayWebsite}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <strong className="text-white inline mr-1">E-Posta:</strong>
                    <a href={`mailto:${companyInfo.email}`} className="text-slate-300 hover:text-white">
                      {companyInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Clock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Çalışma Saatleri:</strong>
                    <span>Pazartesi - Cumartesi: 08:30 - 19:30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div>
                <h3 className="text-2xl font-black text-white">
                  Ücretsiz Keşif & İletişim Formu
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Mesajınız doğrudan <strong className="text-amber-400">{companyInfo.email}</strong> adresimize iletilir.
                </p>
              </div>
              <Mail className="w-8 h-8 text-amber-400 opacity-60 hidden sm:block" />
            </div>

            {submitted ? (
              <div className="py-8 space-y-5 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-white">Talebiniz Başarıyla Alındı!</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    İletişim bilgileriniz ve mesajınız <strong>{companyInfo.email}</strong> adresimize iletildi. Yetkililerimiz en kısa sürede sizinle irtibata geçecektir.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleOpenWhatsAppBackup}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-transform hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Aynı Mesajı WhatsApp&apos;tan da İlet</span>
                  </button>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        district: "Serdivan",
                        service: "Komple Ev Tadilatı",
                        targetPerson: "asim",
                        message: "",
                        website_hp: ""
                      });
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Yeni Mesaj Gönder
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Honeypot Bot Tuzağı (İnsanlar görmez, botlar doldurursa engellenir) */}
                <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
                  <input
                    type="text"
                    name="website_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website_hp}
                    onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Adınız Soyadınız *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      placeholder="Ad Soyad"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Telefon Numaranız *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={20}
                      placeholder="05xx xxx xx xx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      E-Posta Adresiniz (İsteğe bağlı)
                    </label>
                    <input
                      type="email"
                      maxLength={120}
                      placeholder="ornek@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Sakarya İlçesi
                    </label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      {sakaryaDistricts.map((d) => (
                        <option key={d.slug} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    İlgilendiğiniz Hizmet
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Komple Ev Tadilatı">Komple Ev Tadilatı</option>
                    <option value="Mutfak & Banyo Yenileme">Mutfak & Banyo Yenileme</option>
                    <option value="Sapanca Villa İnşaatı">Villa & Çelik Ev Yapımı</option>
                    <option value="İç Mimarlık & 3D Proje">İç Mimarlık & 3D Proje</option>
                    <option value="Dış Cephe Mantolama / Çatı">Dış Cephe Mantolama / Çatı</option>
                    <option value="Ofis / Ticari Mekan Tadilatı">Ofis / Ticari Tadilat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Hangi Yetkilimize İletilsin?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                      <input
                        type="radio"
                        name="targetPerson"
                        value="asim"
                        checked={formData.targetPerson === "asim"}
                        onChange={() => setFormData({ ...formData, targetPerson: "asim" })}
                        className="accent-amber-500"
                      />
                      <div className="text-xs">
                        <div className="font-bold text-white">{companyInfo.team[0].name}</div>
                        <div className="text-[10px] text-slate-400">{companyInfo.team[0].phone}</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                      <input
                        type="radio"
                        name="targetPerson"
                        value="abdussamet"
                        checked={formData.targetPerson === "abdussamet"}
                        onChange={() => setFormData({ ...formData, targetPerson: "abdussamet" })}
                        className="accent-amber-500"
                      />
                      <div className="text-xs">
                        <div className="font-bold text-white">{companyInfo.team[1].name}</div>
                        <div className="text-[10px] text-slate-400">{companyInfo.team[1].phone}</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Mekan Hakkında Notlar & Talepleriniz
                  </label>
                  <textarea
                    rows={4}
                    maxLength={2000}
                    placeholder="Örn: Serdivan Arabacıalanı'nda 3+1 daire, mutfak ve banyo komple yenilenecek..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="contact-kvkk"
                    required
                    checked={kvkkAccepted}
                    onChange={(e) => setKvkkAccepted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-400 accent-amber-500 shrink-0 cursor-pointer"
                  />
                  <label htmlFor="contact-kvkk" className="text-xs text-slate-400 leading-snug cursor-pointer select-none">
                    <Link href="/kvkk-aydinlatma-metni" target="_blank" className="text-amber-400 hover:underline font-bold">
                      KVKK Aydınlatma Metni
                    </Link>
                    &apos;ni okudum, iletişim ve keşif amacıyla verilerimin işlenmesini onaylıyorum.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.01] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>E-Posta Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Mesajı Gönder (E-Posta & Keşif İste)</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
