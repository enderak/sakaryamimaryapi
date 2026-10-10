import Link from "next/link";
import { Compass, Home, Phone, ArrowLeft } from "lucide-react";
import { companyInfo } from "@/data/company";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 text-slate-900 px-4 py-20">
      <div className="max-w-md w-full text-center space-y-6 bg-white border border-slate-200 p-8 rounded-3xl shadow-xl shadow-slate-200/50">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-[#0f2b5c] flex items-center justify-center mx-auto shadow-sm">
          <Compass className="w-8 h-8 text-[#0f2b5c]" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-black text-[#c28b38] tracking-tight">404</span>
          <h1 className="text-2xl font-bold text-[#0f2b5c]">Sayfa Bulunamadı</h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Aradığınız sayfa silinmiş, taşınmış veya adresi hatalı yazılmış olabilir.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#0f2b5c] hover:bg-[#163a75] text-white font-bold text-sm transition-colors shadow-md shadow-blue-900/10"
          >
            <Home className="w-4 h-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>

          <a
            href={`tel:${companyInfo.primaryPhoneRaw}`}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-sm border border-slate-200 transition-colors"
          >
            <Phone className="w-4 h-4 text-[#c28b38]" />
            <span>Yetkiliyi Ara: {companyInfo.primaryPhoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
