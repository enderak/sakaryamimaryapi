"use client";

import { useEffect, useState } from "react";
import { Rss, ExternalLink, RefreshCw, Calendar, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface NewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  contentSnippet: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/rss");
      const data = await res.json();
      if (data.items) {
        setNews(data.items);
        setLastUpdated(new Date().toLocaleTimeString("tr-TR"));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.contentSnippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-20 bg-[#121316] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-[#ded0c3] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ana Sayfaya Dön</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c5ad97]/15 border border-[#c5ad97]/30 text-[#ded0c3] text-xs font-semibold mb-3">
              <Rss className="w-4 h-4 text-[#c5ad97] animate-pulse" />
              <span>Canlı RSS Akışı & Sektör Gündemi</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              İnşaat & Kentsel Dönüşüm <span className="text-[#c5ad97]">Haberleri</span>
            </h1>
            <p className="mt-2 text-slate-300 text-sm max-w-2xl">
              Türkiye ve Sakarya yapı sektörü, konut piyasası ve mimari trendlerle ilgili en son RSS haber bültenleri.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-xs text-slate-400">
                Son Güncelleme: {lastUpdated}
              </span>
            )}
            <button
              onClick={fetchNews}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#18191d] hover:bg-[#2b2d35] text-[#ded0c3] border border-[#2b2d35] text-xs font-semibold transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#c5ad97]" : ""}`} />
              <span>Akışı Yenile</span>
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Haber başlığı veya konuda ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#18191d] border border-[#2b2d35] rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#c5ad97]"
            />
          </div>
        </div>

        {/* Content list */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-[#18191d] rounded-2xl p-6 border border-[#2b2d35] animate-pulse space-y-4">
                <div className="h-4 bg-[#2b2d35] rounded w-1/4"></div>
                <div className="h-6 bg-[#2b2d35] rounded w-full"></div>
                <div className="h-16 bg-[#2b2d35]/60 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="bg-[#18191d] rounded-2xl p-12 text-center border border-[#2b2d35]">
            <p className="text-slate-400 text-sm">Aradığınız kriterlere uygun haber bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <article
                key={item.id}
                className="bg-[#18191d] rounded-2xl p-6 border border-[#2b2d35] hover:border-[#c5ad97]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="font-medium text-[#ded0c3] bg-[#c5ad97]/15 px-2.5 py-0.5 rounded-full border border-[#c5ad97]/30">
                      {item.source}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {item.pubDate}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white hover:text-[#ded0c3] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs text-slate-300 line-clamp-4 leading-relaxed">
                    {item.contentSnippet}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#2b2d35] flex items-center justify-between">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#ded0c3] hover:text-[#c5ad97] flex items-center gap-1 hover:underline"
                  >
                    <span>Haber Kaynağını Aç</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                    RSS XML
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
