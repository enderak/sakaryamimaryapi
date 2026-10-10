import Link from "next/link";
import { Compass, Home, Phone, ArrowLeft } from "lucide-react";
import { companyInfo } from "@/data/company";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-950 text-white px-4 py-20">
      <div className="max-w-md w-full text-center space-y-6 bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-black text-amber-400 tracking-tight">404</span>
          <h1 className="text-2xl font-bold text-white">Sayfa Bulunamadı</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Aradığınız sayfa silinmiş, taşınmış veya adresi hatalı yazılmış olabilir.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors shadow-lg shadow-amber-500/20"
          >
            <Home className="w-4 h-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>

          <a
            href={`tel:${companyInfo.primaryPhoneRaw}`}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Yetkiliyi Ara: {companyInfo.primaryPhoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
