import { testimonials } from "@/data/testimonials";
import { Star, MessageSquareQuote, CheckCircle2 } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#121316] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-[#c5ad97] text-xs font-bold uppercase tracking-wider mb-2">
            <Star className="w-4 h-4 fill-[#c5ad97]" />
            <span>Müşteri Memnuniyeti</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Sakaryalı Hemşehrilerimiz <span className="text-[#c5ad97]">Ne Diyor?</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Serdivan, Sapanca ve Adapazarı&apos;nda evini veya ofisini teslim ettiğimiz müşterilerimizin gerçek deneyimleri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#18191d] rounded-2xl p-6 border border-[#2b2d35] shadow-xl flex flex-col justify-between hover:border-[#c5ad97]/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#c5ad97]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#c5ad97]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{t.date}</span>
                </div>

                <p className="text-sm text-slate-300 italic leading-relaxed">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#2b2d35]">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-[#c5ad97] text-[#121316] font-bold flex items-center justify-center text-xs">
                    {t.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1">
                      <span>{t.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ded0c3]" />
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {t.location} • <span className="text-[#ded0c3]">{t.service}</span>
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
