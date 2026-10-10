"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Rss, ExternalLink, RefreshCw, Calendar, Sparkles } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  contentSnippet: string;
}

export default function RssNewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchRssNews = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/rss");
      const data = await res.json();
      if (data.items) {
        setNews(data.items.slice(0, 4));
        setLastUpdated(new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }));
      }
    } catch (err) {
      console.error("RSS fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRssNews();
  }, []);

  return (
    <section className="py-24 bg-[#121316] text-white border-t border-[#2b2d35]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[#c5ad97] text-xs font-bold uppercase tracking-wider mb-2">
              <Rss className="w-4 h-4 text-[#c5ad97] animate-pulse" />
              <span>Canlı Sektör & Mimarlık Gündemi (RSS)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              İnşaat, Kentsel Dönüşüm & <span className="text-[#c5ad97]">Tadilat Haberleri</span>
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl text-base">
              Sakarya ve Türkiye genelinde yapı sektörü, konut trendleri ve kentsel dönüşümle ilgili güncel RSS akışları.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-xs text-slate-400 hidden sm:inline">
                Son Güncelleme: {lastUpdated}
              </span>
            )}
            <button
              onClick={fetchRssNews}
              disabled={loading}
              className="p-2.5 rounded-xl bg-[#18191d] hover:bg-[#2b2d35] text-slate-300 hover:text-white border border-[#2b2d35] transition-colors"
              title="Yenile"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#c5ad97]" : ""}`} />
            </button>
            <Link
              href="/haberler"
              className="px-5 py-2.5 rounded-xl bg-[#c5ad97] hover:bg-[#ded0c3] text-[#121316] font-bold text-xs transition-colors"
            >
              Tüm Haberler
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-[#18191d] rounded-2xl p-6 border border-[#2b2d35] animate-pulse space-y-4">
                <div className="h-4 bg-[#2b2d35] rounded w-1/3"></div>
                <div className="h-5 bg-[#2b2d35] rounded w-full"></div>
                <div className="h-5 bg-[#2b2d35] rounded w-4/5"></div>
                <div className="h-16 bg-[#2b2d35]/60 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {news.map((item) => (
              <article
                key={item.id}
                className="group bg-[#18191d] rounded-2xl p-6 border border-[#2b2d35] hover:border-[#c5ad97]/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl"
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

                  <h3 className="text-base font-bold text-white group-hover:text-[#ded0c3] transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {item.contentSnippet}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#2b2d35] flex items-center justify-between">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#ded0c3] hover:text-[#c5ad97] flex items-center gap-1 group-hover:underline"
                  >
                    <span>Kaynağında Oku</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                    RSS FEED
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
