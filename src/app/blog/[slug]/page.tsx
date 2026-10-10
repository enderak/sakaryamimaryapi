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
    <article className="py-16 bg-slate-950 text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tüm Blog Yazılarına Dön</span>
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
            <span>{post.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-b border-slate-800 pb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-500" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-500" />
              {post.readTime}
            </span>
            <span>•</span>
            <span className="text-amber-400 font-semibold">Sakarya Mimari Yapı Rehberi</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden my-8 border border-slate-800">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="space-y-6 text-slate-300 text-base leading-relaxed">
          <p className="text-lg font-semibold text-slate-100 border-l-4 border-amber-500 pl-4 py-1 italic">
            {post.excerpt}
          </p>

          {post.content.map((paragraph, index) => (
            <p key={index} className="text-slate-300">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Call to action inside blog */}
        <div className="mt-14 p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black text-white">Eviniz İçin Ücretsiz Keşif İster misiniz?</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Sakarya&apos;daki eviniz için 3D tasarım ve resmi sözleşmeli fiyat teklifinizi hazırlayalım.
            </p>
          </div>

          <a
            href={`https://wa.me/${companyInfo.primaryWhatsapp}?text=${encodeURIComponent(
              `Merhaba Sakarya Mimar Yapı, "${post.title}" yazınızı okudum, evim için keşif ve bilgi almak istiyorum.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shrink-0 transition-transform hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Mimar ile WhatsApp&apos;ta Görüş</span>
          </a>
        </div>
      </div>
    </article>
  );
}
