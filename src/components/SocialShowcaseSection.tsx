"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Play, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  Share2, 
  Tv,
  ArrowRight
} from "lucide-react";
import { SocialMediaConfig, defaultSocialMediaConfig } from "@/data/socialMedia";

interface SocialShowcaseSectionProps {
  config?: SocialMediaConfig;
}

export default function SocialShowcaseSection({ config: propConfig }: SocialShowcaseSectionProps) {
  const config = propConfig || defaultSocialMediaConfig;
  const { channels, showcaseSection } = config;

  if (!showcaseSection?.enabled) {
    return null;
  }

  const { youtube, instagram, tiktok } = channels;
  const activePostCount = showcaseSection.posts?.length || 0;

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{showcaseSection.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {showcaseSection.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400">
              {showcaseSection.titleHighlight}
            </span>
          </h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            {showcaseSection.description}
          </p>
        </div>

        {/* 3 Main Social Platform Cards (Instagram, YouTube, TikTok) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Instagram Card */}
          {instagram.enabled && (
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-rose-500/50 hover:bg-white/[0.09] transition-all duration-300 hover:-translate-y-1 block shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
                {instagram.handle}
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                {instagram.badge || "Günlük şantiye turları, teslim edilen banyo ve mutfak reels videoları."}
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-rose-400">
                <span>Profili İncele & Takip Et</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          )}

          {/* YouTube Card */}
          {youtube.enabled && (
            <a
              href={youtube.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-red-500/50 hover:bg-white/[0.09] transition-all duration-300 hover:-translate-y-1 block shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/25 group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 flex items-center gap-1">
                  <span>YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                {youtube.handle}
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                Uzun metraj komple daire tadilat turları, 3D mimari modelleme ve şantiye teslim videoları.
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-red-400">
                <span>Kanala Abone Ol & İzle</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          )}

          {/* TikTok Card */}
          {tiktok.enabled && (
            <a
              href={tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-cyan-500/50 hover:bg-white/[0.09] transition-all duration-300 hover:-translate-y-1 block shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-black border border-white/20 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                  <span>TikTok</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                {tiktok.handle}
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                {tiktok.badge || "Öncesi / sonrası kısa dönüşüm videoları ve pratik tadilat tüyoları."}
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-cyan-400">
                <span>Videoları İzle & Keşfet</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          )}
        </div>

        {/* Featured Video Player & Highlight Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Embed (16:9 Player) */}
          {showcaseSection.showYouTubeEmbed && youtube.featuredVideoId ? (
            <div className="lg:col-span-7 bg-white/[0.04] border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Öne Çıkan Şantiye Videosu
                  </span>
                </div>
                <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                  4K Ultra HD
                </span>
              </div>

              {/* Secure Embed with Privacy Mode & Sandbox */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtube.featuredVideoId)}?rel=0&modestbranding=1`}
                  title={youtube.featuredVideoTitle || "Sakarya Mimar Yapı Proje Videosu"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full h-full border-0"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white leading-snug">
                  {youtube.featuredVideoTitle}
                </h3>
                {youtube.featuredVideoDescription && (
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {youtube.featuredVideoDescription}
                  </p>
                )}
              </div>
            </div>
          ) : null}

          {/* Highlight Posts / Reels Column */}
          <div className={`${showcaseSection.showYouTubeEmbed && youtube.featuredVideoId ? "lg:col-span-5" : "lg:col-span-12"} space-y-4`}>
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Tv className="w-4 h-4 text-amber-400" />
                <span>En Çok İzlenen Dönüşümler</span>
              </h3>
              <span className="text-xs text-slate-400">
                Canlı Akış
              </span>
            </div>

            <div className="space-y-3">
              {showcaseSection.posts.map((post) => {
                const isTiktok = post.platform === "tiktok";
                const isYoutube = post.platform === "youtube";

                return (
                  <a
                    key={post.id}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-amber-400/40 hover:bg-white/[0.08] transition-all duration-300 shadow-md"
                  >
                    {/* Thumbnail with overlay icon */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-800 border border-white/10">
                      {post.thumbnailUrl ? (
                        <Image
                          src={post.thumbnailUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                          <Play className="w-6 h-6 text-slate-500" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                        <div className="w-7 h-7 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          isTiktok 
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                            : isYoutube
                            ? "bg-red-500/20 text-red-300 border border-red-500/30"
                            : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        }`}>
                          {isTiktok ? "TikTok" : isYoutube ? "YouTube" : "Instagram"}
                        </span>
                        {post.viewsOrLikes && (
                          <span className="text-[10px] text-slate-400 font-medium">
                            {post.viewsOrLikes}
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 group-hover:text-slate-200">
                        <span>Hemen İzle</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Guaranteed official badge */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-[11px] text-slate-300">
                Tüm videolar Sakarya Mimar Yapı&apos;nın bizzat yönettiği ve tamamladığı tescilli şantiyelerden çekilmektedir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
