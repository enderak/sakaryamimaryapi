import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { companyInfo } from "@/data/company";
import { Calendar, Clock, ArrowLeft, ArrowRight, MessageCircle, Phone } from "lucide-react";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Yazı Bulunamadı | Sakarya Mimarlık" };
  }

  return {
    title: `${post.title} | Sakarya Mimarlık & Yapı`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-20 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0f2b5c] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tüm Blog Yazılarına Dön</span>
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0f2b5c] text-xs font-semibold">
            <span>{post.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-200 pb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#0f2b5c]" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0f2b5c]" />
              {post.readTime}
            </span>
            <span>•</span>
            <span className="text-[#0f2b5c] font-semibold">Sakarya Mimar Yapı Rehberi</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden my-8 border border-slate-200 shadow-md">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="space-y-6 text-slate-700 text-base leading-relaxed">
          <p className="text-lg font-medium text-slate-900 border-l-4 border-[#0f2b5c] pl-4 py-2 italic bg-slate-100/60 rounded-r-xl">
            {post.excerpt}
          </p>

          {post.content.map((paragraph, index) => (
            <p key={index} className="text-slate-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Call to action inside blog */}
        <div className="mt-14 p-8 rounded-3xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <h3 className="text-xl font-black text-slate-900">Eviniz İçin Ücretsiz Keşif İster misiniz?</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Sakarya&apos;daki eviniz için 3D tasarım ve resmi sözleşmeli fiyat teklifinizi hazırlayalım.
            </p>
          </div>

          <a
            href={`https://wa.me/${companyInfo.primaryWhatsapp}?text=${encodeURIComponent(
              `Merhaba Sakarya Mimar Yapı, "${post.title}" yazınızı okudum, evim için keşif ve bilgi almak istiyorum.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0f2b5c] hover:bg-[#153a7a] text-white font-bold text-xs shrink-0 transition-transform hover:scale-105 shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Mimar ile WhatsApp&apos;ta Görüş</span>
          </a>
        </div>
      </div>
    </article>
  );
}
