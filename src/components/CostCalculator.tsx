"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Calculator, CheckCircle2, MessageCircle, Send, Sparkles, PhoneCall, ShieldCheck, UserCheck } from "lucide-react";
import { sakaryaDistricts } from "@/data/districts";
import { companyInfo } from "@/data/company";

interface ServiceCostRate {
  id: string;
  name: string;
  baseMinM2: number;
  baseMaxM2: number;
}

const serviceRates: ServiceCostRate[] = [
  { id: "komple", name: "Komple Anahtar Teslim Ev Tadilatı", baseMinM2: 5500, baseMaxM2: 8500 },
  { id: "mutfak", name: "Mutfak Yenileme & Dolap/Tezgah", baseMinM2: 3500, baseMaxM2: 6000 },
  { id: "banyo", name: "Banyo Yenileme & Su Yalıtımı", baseMinM2: 4000, baseMaxM2: 7000 },
  { id: "villa", name: "Müstakil Villa / Çelik Yapı İnşaatı", baseMinM2: 14000, baseMaxM2: 22000 },
  { id: "mantolama", name: "Dış Cephe Mantolama & Çatı", baseMinM2: 950, baseMaxM2: 1600 },
  { id: "boya", name: "Boya Badana & Asma Tavan", baseMinM2: 300, baseMaxM2: 650 }
];

export default function CostCalculator() {
  const [selectedService, setSelectedService] = useState(serviceRates[0].id);
  const [district, setDistrict] = useState("serdivan");
  const [area, setArea] = useState(120);
  const [tier, setTier] = useState<"standard" | "comfort" | "luxury">("comfort");
  const [targetContact, setTargetContact] = useState<"asim" | "abdussamet">("asim");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Calculate price estimate
  const calculation = useMemo(() => {
    const rate = serviceRates.find((s) => s.id === selectedService) || serviceRates[0];
    let multiplier = 1.0;
    if (tier === "standard") multiplier = 0.85;
    if (tier === "luxury") multiplier = 1.35;

    const minTotal = Math.round((area * rate.baseMinM2 * multiplier) / 1000) * 1000;
    const maxTotal = Math.round((area * rate.baseMaxM2 * multiplier) / 1000) * 1000;

    return {
      serviceName: rate.name,
      minTotal,
      maxTotal
    };
  }, [selectedService, area, tier]);

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const districtObj = sakaryaDistricts.find((d) => d.slug === district);
    const districtName = districtObj ? districtObj.name : "Sakarya";
    const tierName =
      tier === "luxury" ? "Lüks Mimari Tasarım" : tier === "comfort" ? "Konfor Paket" : "Standart";

    const selectedPerson = targetContact === "asim" ? companyInfo.team[0] : companyInfo.team[1];

    const text = `Merhaba ${selectedPerson.name} (${companyInfo.name}),
Web sitenizden (${companyInfo.displayWebsite}) tahmini maliyet hesapladım:
- İlçe: ${districtName}
- Hizmet: ${calculation.serviceName}
- Alan: ${area} m²
- Paket: ${tierName}
- Tahmini Bütçe: ${calculation.minTotal.toLocaleString("tr-TR")} TL - ${calculation.maxTotal.toLocaleString("tr-TR")} TL
${fullName ? `- Ad Soyad: ${fullName}` : ""}
${phone ? `- Telefon: ${phone}` : ""}
${notes ? `- Not: ${notes}` : ""}

Adresime (${districtName}) ücretsiz keşif ve net fiyat teklifi için görüşmek istiyorum.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${selectedPerson.whatsappNumber}?text=${encoded}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="fiyat-hesapla" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black tracking-wider uppercase mb-3">
            <Calculator className="w-4 h-4" />
            <span>Şeffaf & Anında Hesaplama</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Sakarya Mimar Yapı <span className="text-amber-400">Fiyat Hesaplayıcı</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Evinizin ya da iş yerinizin özelliklerini seçin; 2026 piyasa koşullarına uygun yaklaşık maliyet aralığını anında görün. Serdivan merkez ofisimizden tüm Sakarya&apos;ya ücretsiz keşif hizmeti.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls form */}
          <div className="lg:col-span-7 bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="space-y-6">
              {/* Step 1: Service */}
              <div>
                <label className="block text-sm font-bold text-slate-200 mb-2">
                  1. Tadilat / İnşaat Türünü Seçin
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {serviceRates.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedService(s.id)}
                      className={`p-3 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all border ${
                        selectedService === s.id
                          ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 font-bold"
                          : "bg-slate-900/60 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white"
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-200 mb-2">
                    2. Sakarya İlçesi
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
                  >
                    {sakaryaDistricts.map((d) => (
                      <option key={d.slug} value={d.slug}>
                        {d.name} İlçesi
                      </option>
                    ))}
                  </select>
                </div>

                {/* Step 3: Area */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-slate-200">
                      3. Yaklaşık Alan
                    </label>
                    <span className="text-amber-400 font-black text-sm bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/30">
                      {area} m²
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="450"
                    step="5"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500 mt-2"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>20 m² (Oda/Banyo)</span>
                    <span>120 m² (3+1)</span>
                    <span>450 m² (Villa/Ticari)</span>
                  </div>
                </div>
              </div>

              {/* Step 4: Tier */}
              <div>
                <label className="block text-sm font-bold text-slate-200 mb-2">
                  4. Malzeme & Tasarım Segmenti
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setTier("standard")}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      tier === "standard"
                        ? "bg-slate-700 border-amber-400 text-white font-bold"
                        : "bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="text-xs font-bold">Standart</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Ekonomik & Kaliteli</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTier("comfort")}
                    className={`p-3 rounded-xl border text-center transition-all relative ${
                      tier === "comfort"
                        ? "bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-lg shadow-amber-500/20"
                        : "bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] bg-emerald-500 text-white px-2 py-0.2 rounded-full font-black uppercase">
                      Popüler
                    </span>
                    <div className="text-xs">Konfor</div>
                    <div className={`text-[10px] mt-0.5 ${tier === "comfort" ? "text-slate-900" : "text-slate-400"}`}>
                      1. Sınıf Markalar
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTier("luxury")}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      tier === "luxury"
                        ? "bg-slate-700 border-amber-400 text-white font-bold"
                        : "bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="text-xs font-bold">Lüks Mimari</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Özel Üretim Lake/Ada</div>
                  </button>
                </div>
              </div>

              {/* Step 5: Which Contact Person */}
              <div>
                <label className="block text-sm font-bold text-slate-200 mb-2">
                  5. İletişime Geçeceğiniz Yetkiliyi Seçin
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTargetContact("asim")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      targetContact === "asim"
                        ? "bg-amber-500 text-slate-950 border-amber-400 font-black shadow-lg"
                        : "bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5" />
                      {companyInfo.team[0].name}
                    </div>
                    <div className={`text-[11px] mt-0.5 ${targetContact === "asim" ? "text-slate-950 font-semibold" : "text-slate-400"}`}>
                      {companyInfo.team[0].phone}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetContact("abdussamet")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      targetContact === "abdussamet"
                        ? "bg-amber-500 text-slate-950 border-amber-400 font-black shadow-lg"
                        : "bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5" />
                      {companyInfo.team[1].name}
                    </div>
                    <div className={`text-[11px] mt-0.5 ${targetContact === "abdussamet" ? "text-slate-950 font-semibold" : "text-slate-400"}`}>
                      {companyInfo.team[1].phone}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Result & Quote Contact Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700">
              <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                Tahmini Bütçe Aralığı
              </span>
              <span className="text-xs text-slate-400">2026 Sakarya Fiyatları</span>
            </div>

            <div className="my-6 text-center">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {calculation.minTotal.toLocaleString("tr-TR")} ₺
                <span className="text-slate-400 text-2xl font-light mx-2">-</span>
                {calculation.maxTotal.toLocaleString("tr-TR")} ₺
              </div>
              <p className="text-xs text-slate-300 mt-2">
                *KDV ve keşif sonrası netleşecek özel malzeme seçimlerine göre kesinleşir.
              </p>
            </div>

            <div className="space-y-3 bg-slate-900/60 rounded-2xl p-4 border border-slate-700/60 text-xs text-slate-300 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Ücretsiz adrese mimari keşif ve 3D çizim</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Resmi sözleşmeli taahhüt ve gecikme cezası</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>2 Yıl malzeme ve işçilik garanti sertifikası</span>
              </div>
            </div>

            {/* Quick Contact Inputs */}
            <form onSubmit={handleWhatsAppSend} className="space-y-3">
              <div>
                <input
                  type="text"
                  maxLength={100}
                  placeholder="Adınız Soyadınız (İsteğe bağlı)"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <input
                  type="tel"
                  maxLength={25}
                  placeholder="Telefon Numaranız (05xx xxx xx xx)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <textarea
                  rows={2}
                  maxLength={1000}
                  placeholder="Eklemek istediğiniz detaylar (Örn: Dairem 2. katta, mutfak dolapları yenilenecek...)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="calc-kvkk"
                  required
                  checked={kvkkAccepted}
                  onChange={(e) => setKvkkAccepted(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-400 accent-amber-500 shrink-0 cursor-pointer"
                />
                <label htmlFor="calc-kvkk" className="text-[11px] text-slate-400 leading-snug cursor-pointer select-none">
                  <Link href="/kvkk-aydinlatma-metni" target="_blank" className="text-amber-400 hover:underline font-bold">
                    KVKK Aydınlatma Metni
                  </Link>
                  &apos;ni okudum, iletişim ve keşif amacıyla verilerimin işlenmesini onaylıyorum.
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-black text-sm shadow-xl shadow-emerald-600/30 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>
                  {targetContact === "asim" ? "Asım Yılmazer" : "Abdussamet Gültekin"}&apos;e WhatsApp&apos;tan Gönder
                </span>
              </button>

              <div className="flex items-center justify-center gap-3 pt-2 text-xs text-slate-400">
                <span>Doğrudan aramak için:</span>
                <a
                  href={`tel:${targetContact === "asim" ? companyInfo.team[0].rawPhone : companyInfo.team[1].rawPhone}`}
                  className="text-amber-400 font-bold hover:underline flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  {targetContact === "asim" ? companyInfo.team[0].phone : companyInfo.team[1].phone}
                </a>
              </div>
            </form>

            {submitted && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs text-center font-bold">
                WhatsApp açıldı! Keşif talebiniz yetkilimize ulaştırılıyor.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
