import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blog";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sakarya Ev Tadilatı ve Mimari Rehber | Blog",
  description: "Sakarya 2026 ev tadilatı maliyetleri, banyo mutfak yenileme tüyoları ve Sapanca villa yapımı hakkında uzman rehber yazıları."
};

export default function BlogPage() {
  return (
    <div className="py-20 bg-[#121316] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[#c5ad97] text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Mimarın Kaleminden</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Tadilat & Mimari <span className="text-[#c5ad97]">Rehber</span>
          </h1>
          <p className="mt-4 text-slate-300 text-base">
            Evinizi yenilerken doğru kararlar almanız için hazırladığımız kapsamlı teknik rehberler ve maliyet analizleri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-[#18191d] rounded-3xl overflow-hidden border border-[#2b2d35] hover:border-[#c5ad97]/50 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1"
            >
              <div>
                <div className="relative h-52 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 bg-[#121316]/90 backdrop-blur-md text-[#ded0c3] border border-[#c5ad97]/40 text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#c5ad97]" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#c5ad97]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white leading-snug">
                    {post.title}
                  </h2>

                  <p className="mt-3 text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#121316] hover:bg-[#c5ad97] hover:text-[#121316] text-[#ded0c3] font-semibold text-xs transition-colors border border-[#2b2d35]"
                >
                  <span>Rehberi Oku</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
