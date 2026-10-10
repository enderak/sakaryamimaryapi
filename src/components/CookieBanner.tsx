"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, X } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("sakarya_cookie_consent");
      if (!consent) {
        setIsVisible(true);
      }
    } catch {
      // localStorage may fail in private mode
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem("sakarya_cookie_consent", "all");
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    try {
      localStorage.setItem("sakarya_cookie_consent", "essential");
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-lg z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#18191d] border border-[#2b2d35] rounded-3xl p-5 shadow-2xl text-white">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#c5ad97]/10 border border-[#c5ad97]/25 text-[#c5ad97] flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5" />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>Çerez ve Gizlilik Tercihleri</span>
                <ShieldCheck className="w-4 h-4 text-[#c5ad97]" />
              </h4>
              <button
                onClick={handleAcceptEssential}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Sitemizdeki deneyiminizi geliştirmek, ziyaret istatistiklerini ölçümlemek ve 6698 sayılı KVKK kapsamında güvenliğinizi sağlamak amacıyla çerezler kullanmaktayız. Detaylı bilgi için{" "}
              <Link
                href="/kvkk-aydinlatma-metni"
                className="text-[#ded0c3] hover:underline font-bold"
              >
                KVKK Aydınlatma Metni
              </Link>{" "}
              ve{" "}
              <Link
                href="/cerez-politikasi"
                className="text-[#ded0c3] hover:underline font-bold"
              >
                Çerez Politikamızı
              </Link>{" "}
              inceleyebilirsiniz.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button
                onClick={handleAcceptAll}
                className="px-5 py-2.5 rounded-xl bg-[#c5ad97] hover:bg-[#ded0c3] text-[#121316] font-bold text-xs transition-colors shadow-md shadow-black/20"
              >
                Tümünü Kabul Et
              </button>
              <button
                onClick={handleAcceptEssential}
                className="px-4 py-2.5 rounded-xl bg-[#121316] hover:bg-[#2b2d35] text-slate-300 hover:text-white text-xs font-semibold border border-[#2b2d35] transition-colors"
              >
                Sadece Zorunluları Kabul Et
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
