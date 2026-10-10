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
    <div className="py-10 sm:py-20 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0f2b5c] text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin className="w-4 h-4 text-[#0f2b5c]" />
            <span>Serdivan Merkez Ofisimiz & İletişim</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Sakarya Mimar Yapı <span className="text-[#0f2b5c]">İletişim</span>
          </h1>
          <p className="mt-3 text-slate-600 text-base">
            Serdivan Çark Caddesi&apos;ndeki ofisimize uğrayabilir veya form üzerinden mesajınızı doğrudan e-posta adresimize ({companyInfo.email}) iletebilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Team Members Direct Cards */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Yetkili İletişim Hatları
              </h3>

              <div className="space-y-4">
                {companyInfo.team.map((person, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-base font-black text-slate-900 flex items-center gap-1.5">
                          <UserCheck className="w-4 h-4 text-[#0f2b5c]" />
                          <span>{person.name}</span>
                        </div>
                        <div className="text-xs text-slate-500">{person.role}</div>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#0f2b5c] border border-blue-200">
                        Yetkili
                      </span>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <a
                        href={`tel:${person.rawPhone}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors shadow-sm"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#0f2b5c]" />
                        <span>{person.phone}</span>
                      </a>

                      <a
                        href={`https://wa.me/${person.whatsappNumber}?text=${encodeURIComponent(
                          `Merhaba ${person.name}, Sakarya Mimar Yapı web siteniz üzerinden ulaşıyorum.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-transform hover:scale-105 shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Office Details */}
              <div className="space-y-3 pt-2 text-xs border-t border-slate-100">
                <div className="flex items-start gap-3 text-slate-600">
                  <MapPin className="w-4 h-4 text-[#0f2b5c] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">Adres:</strong>
                    <span>{companyInfo.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <Globe className="w-4 h-4 text-[#0f2b5c] shrink-0" />
                  <div>
                    <strong className="text-slate-900 inline mr-1 font-bold">Web:</strong>
                    <a href={companyInfo.website} target="_blank" rel="noopener noreferrer" className="text-[#0f2b5c] hover:underline font-bold">
                      {companyInfo.displayWebsite}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="w-4 h-4 text-[#0f2b5c] shrink-0" />
                  <div>
                    <strong className="text-slate-900 inline mr-1 font-bold">E-Posta:</strong>
                    <a href={`mailto:${companyInfo.email}`} className="text-slate-700 hover:text-[#0f2b5c] font-medium">
                      {companyInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-600">
                  <Clock className="w-4 h-4 text-[#0f2b5c] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">Çalışma Saatleri:</strong>
                    <span>Pazartesi - Cumartesi: 08:30 - 19:30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  Ücretsiz Keşif & İletişim Formu
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Mesajınız doğrudan <strong className="text-[#0f2b5c]">{companyInfo.email}</strong> adresimize iletilir.
                </p>
              </div>
              <Mail className="w-8 h-8 text-[#0f2b5c] opacity-60 hidden sm:block" />
            </div>

            {submitted ? (
              <div className="py-8 space-y-5 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-slate-900">Talebiniz Başarıyla Alındı!</h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    İletişim bilgileriniz ve mesajınız <strong>{companyInfo.email}</strong> adresimize iletildi. Yetkililerimiz en kısa sürede sizinle irtibata geçecektir.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleOpenWhatsAppBackup}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md transition-transform hover:scale-105"
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
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300"
                  >
                    Yeni Mesaj Gönder
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Honeypot Bot Tuzağı */}
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
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Adınız Soyadınız *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      placeholder="Ad Soyad"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0f2b5c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Telefon Numaranız *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={20}
                      placeholder="05xx xxx xx xx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0f2b5c]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      E-Posta Adresiniz (İsteğe bağlı)
                    </label>
                    <input
                      type="email"
                      maxLength={120}
                      placeholder="ornek@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0f2b5c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Sakarya İlçesi
                    </label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0f2b5c]"
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
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    İlgilendiğiniz Hizmet
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0f2b5c]"
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
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Hangi Yetkilimize İletilsin?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-300 cursor-pointer">
                      <input
                        type="radio"
                        name="targetPerson"
                        value="asim"
                        checked={formData.targetPerson === "asim"}
                        onChange={() => setFormData({ ...formData, targetPerson: "asim" })}
                        className="accent-[#0f2b5c]"
                      />
                      <div className="text-xs">
                        <div className="font-bold text-slate-900">{companyInfo.team[0].name}</div>
                        <div className="text-[10px] text-slate-500">{companyInfo.team[0].phone}</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-300 cursor-pointer">
                      <input
                        type="radio"
                        name="targetPerson"
                        value="abdussamet"
                        checked={formData.targetPerson === "abdussamet"}
                        onChange={() => setFormData({ ...formData, targetPerson: "abdussamet" })}
                        className="accent-[#0f2b5c]"
                      />
                      <div className="text-xs">
                        <div className="font-bold text-slate-900">{companyInfo.team[1].name}</div>
                        <div className="text-[10px] text-slate-500">{companyInfo.team[1].phone}</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Mekan Hakkında Notlar & Talepleriniz
                  </label>
                  <textarea
                    rows={4}
                    maxLength={2000}
                    placeholder="Örn: Serdivan Arabacıalanı'nda 3+1 daire, mutfak ve banyo komple yenilenecek..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0f2b5c] resize-none"
                  />
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="contact-kvkk"
                    required
                    checked={kvkkAccepted}
                    onChange={(e) => setKvkkAccepted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 bg-white text-[#0f2b5c] focus:ring-[#0f2b5c] accent-[#0f2b5c] shrink-0 cursor-pointer"
                  />
                  <label htmlFor="contact-kvkk" className="text-xs text-slate-600 leading-snug cursor-pointer select-none">
                    <Link href="/kvkk-aydinlatma-metni" target="_blank" className="text-[#0f2b5c] hover:underline font-bold">
                      KVKK Aydınlatma Metni
                    </Link>
                    &apos;ni okudum, iletişim ve keşif amacıyla verilerimin işlenmesini onaylıyorum.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#0f2b5c] hover:bg-[#153a7a] text-white font-bold text-sm shadow-md transition-all hover:scale-[1.01] disabled:opacity-50"
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
