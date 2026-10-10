import { testimonials } from "@/data/testimonials";
import { Star, MessageSquareQuote, CheckCircle2 } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0f2b5c] text-xs font-bold uppercase tracking-wider mb-2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>Müşteri Memnuniyeti</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Sakaryalı Hemşehrilerimiz <span className="text-[#0f2b5c]">Ne Diyor?</span>
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Serdivan, Sapanca ve Adapazarı&apos;nda evini veya ofisini teslim ettiğimiz müşterilerimizin gerçek deneyimleri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#0f2b5c]/40 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">{t.date}</span>
                </div>

                <p className="text-sm text-slate-700 italic leading-relaxed">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#0f2b5c] text-white font-bold flex items-center justify-center text-xs shadow-sm">
                    {t.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                      <span>{t.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {t.location} • <span className="text-[#0f2b5c] font-semibold">{t.service}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
