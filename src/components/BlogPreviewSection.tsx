import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blog";
import { BookOpen, ArrowRight, Clock, Calendar } from "lucide-react";

export default function BlogPreviewSection() {
  return (
    <section className="py-24 bg-white text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0f2b5c] text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4 text-[#0f2b5c]" />
              <span>Sakarya Tadilat Rehberi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Faydalı Bilgiler & <span className="text-[#0f2b5c]">Tadilat Tüyoları</span>
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl text-base">
              Bütçenizi korumanızı, doğru malzeme seçmenizi ve evinizi en verimli şekilde yenilemenizi sağlayacak mimari ipuçları.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 shadow-sm transition-colors shrink-0 self-start md:self-auto"
          >
            <span>Tüm Rehberi Oku</span>
            <ArrowRight className="w-4 h-4 text-[#0f2b5c]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-slate-50/70 rounded-2xl overflow-hidden border border-slate-200 hover:border-[#0f2b5c]/40 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 shadow-sm"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#0f2b5c] border border-slate-200 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#0f2b5c]" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#0f2b5c]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0f2b5c] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="mt-2.5 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f2b5c] group-hover:text-amber-600 group-hover:translate-x-1 transition-all"
                >
                  <span>Yazının Devamını Oku</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
