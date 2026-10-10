"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { 
  ShieldCheck, 
  Mail, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Building2,
  RefreshCw,
  Send,
  Home
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("sakaryamimaryapi@gmail.com");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"enter_email" | "enter_code">("enter_email");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  // Check if already authenticated
  useEffect(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          router.push("/admin/moduller");
        } else {
          setCheckingSession(false);
        }
      })
      .catch(() => setCheckingSession(false));
  }, [router]);

  // Handle Google Credential Callback (GIS)
  const handleGoogleCallback = async (response: any) => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "google-credential",
          credential: response.credential
        })
      });
      const data = await res.json();
      if (data.success) {
        setInfoMsg("Giriş başarılı! Yönlendiriliyorsunuz...");
        setTimeout(() => router.push("/admin/moduller"), 1000);
      } else {
        setErrorMsg(data.message || "Google ile giriş yetkilendirilmedi.");
      }
    } catch {
      setErrorMsg("Google kimlik doğrulamasında bağlantı hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  // Expose callback to window for Google Script
  useEffect(() => {
    (window as any).handleGoogleLoginResponse = handleGoogleCallback;
  }, []);

  // Send 6-digit OTP code to Gmail
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setLoading(true);
      setErrorMsg(null);
      setInfoMsg(null);

      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send-otp", email: email.trim() })
      });
      const data = await res.json();

      if (data.success) {
        setStep("enter_code");
        setInfoMsg(data.message);
      } else {
        setErrorMsg(data.message || "Kod gönderilemedi.");
      }
    } catch {
      setErrorMsg("Sunucuya bağlanırken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP code
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    try {
      setLoading(true);
      setErrorMsg(null);

      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify-otp",
          email: email.trim(),
          code: code.trim()
        })
      });
      const data = await res.json();

      if (data.success) {
        setInfoMsg("Doğrulama başarılı! Yönetici paneline aktarılıyorsunuz...");
        setTimeout(() => router.push("/admin/moduller"), 800);
      } else {
        setErrorMsg(data.message || "Kod doğrulanamadı.");
      }
    } catch {
      setErrorMsg("Doğrulama sırasında bağlantı hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-[#0f2b5c] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 px-4 py-12">
      {/* Google Identity Services Script */}
      <Script src="https://accounts.google.com/gsi/client" strategy="lazyOnload" />

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50 space-y-7">
        
        {/* Top Logo / Identity */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-[#0f2b5c] flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-8 h-8 text-[#0f2b5c]" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            Yönetim Paneli Girişi
          </h1>
          <p className="text-xs text-slate-500">
            Sakarya Mimar Yapı anasayfa modül ve içerik yönetimi için yetkili Gmail hesabınızla giriş yapınız.
          </p>
        </div>

        {/* Notifications */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {infoMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{infoMsg}</span>
          </div>
        )}

        {/* Google One-Tap / Standard Button Container */}
        <div className="space-y-3">
          <div className="text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              YÖNTEM 1: GOOGLE İLE TEK TIKLA GİRİŞ
            </span>
          </div>

          <div
            id="g_id_onload"
            data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "1016629731671-example.apps.googleusercontent.com"}
            data-context="signin"
            data-ux_mode="popup"
            data-callback="handleGoogleLoginResponse"
            data-auto_prompt="false"
          />

          <div
            className="g_id_signin flex justify-center"
            data-type="standard"
            data-shape="pill"
            data-theme="outline"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="left"
            data-width="100%"
          />
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            VEYA
          </span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* YÖNTEM 2: GMAIL OTP DOĞRULAMA KODU */}
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              YÖNTEM 2: GMAIL GÜVENLİK KODU İLE GİRİŞ
            </span>
          </div>

          {step === "enter_email" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Yetkili Gmail Adresiniz
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@gmail.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2b5c] transition-all"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-1.5 mt-2 text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-700">Hızlı Seç:</span>
                  <button
                    type="button"
                    onClick={() => setEmail("sakaryamimaryapi@gmail.com")}
                    className="px-2 py-0.5 rounded-lg bg-blue-50 text-[#0f2b5c] font-medium hover:bg-blue-100 border border-blue-200 transition-colors"
                  >
                    sakaryamimaryapi@gmail.com
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmail("enderak@gmail.com")}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 border border-slate-200 transition-colors"
                  >
                    enderak@gmail.com
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmail("enderakar@outlook.com")}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 border border-slate-200 transition-colors"
                  >
                    enderakar@outlook.com
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0f2b5c] hover:bg-[#163a75] text-white font-bold text-xs shadow-md shadow-blue-900/10 transition-all hover:scale-[1.01] disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 text-amber-400" />
                )}
                <span>{loading ? "Kod Gönderiliyor..." : "Gmail'e Doğrulama Kodu Gönder"}</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    6 Haneli Giriş Kodu
                  </label>
                  <button
                    type="button"
                    onClick={() => setStep("enter_email")}
                    className="text-[11px] text-[#0f2b5c] hover:underline font-semibold"
                  >
                    E-Postayı Değiştir
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    autoFocus
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="123456"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-center tracking-widest text-lg font-black text-[#0f2b5c] focus:outline-none focus:ring-2 focus:ring-[#0f2b5c] transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1 text-center">
                  <span className="font-semibold">{email}</span> kutunuza gelen 6 haneli kodu yazın.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0f2b5c] hover:bg-[#163a75] text-white font-bold text-xs shadow-md shadow-blue-900/10 transition-all hover:scale-[1.01] disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                )}
                <span>{loading ? "Doğrulanıyor..." : "Kodu Doğrula & Panele Gir"}</span>
              </button>
            </form>
          )}
        </div>

        {/* Back to Website */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <Link href="/" className="flex items-center gap-1.5 hover:text-[#0f2b5c] font-semibold transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>Ana Sayfaya Dön</span>
          </Link>
          <span className="text-[11px] text-slate-400">Sakarya Mimar Yapı Güvenlik</span>
        </div>

      </div>
    </div>
  );
}
