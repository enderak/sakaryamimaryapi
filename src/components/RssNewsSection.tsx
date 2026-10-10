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
    <section className="py-24 bg-slate-50 text-slate-900 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0f2b5c] text-xs font-bold uppercase tracking-wider mb-2">
              <Rss className="w-4 h-4 text-[#0f2b5c] animate-pulse" />
              <span>Canlı Sektör & Mimarlık Gündemi (RSS)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              İnşaat, Kentsel Dönüşüm & <span className="text-[#0f2b5c]">Tadilat Haberleri</span>
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl text-base">
              Sakarya ve Türkiye genelinde yapı sektörü, konut trendleri ve kentsel dönüşümle ilgili güncel RSS akışları.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-xs text-slate-500 hidden sm:inline">
                Son Güncelleme: {lastUpdated}
              </span>
            )}
            <button
              onClick={fetchRssNews}
              disabled={loading}
              className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm transition-colors"
              title="Yenile"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#0f2b5c]" : ""}`} />
            </button>
            <Link
              href="/haberler"
              className="px-5 py-2.5 rounded-xl bg-[#0f2b5c] hover:bg-[#153a7a] text-white font-bold text-xs shadow-sm transition-colors"
            >
              Tüm Haberler
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse space-y-4">
                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                <div className="h-5 bg-slate-200 rounded w-full"></div>
                <div className="h-5 bg-slate-200 rounded w-4/5"></div>
                <div className="h-16 bg-slate-100 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {news.map((item) => (
              <article
                key={item.id}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#0f2b5c]/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-medium text-[#0f2b5c] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 text-[11px]">
                      {item.source}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {item.pubDate}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0f2b5c] transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.contentSnippet}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#0f2b5c] hover:text-amber-600 flex items-center gap-1 group-hover:underline"
                  >
                    <span>Kaynağında Oku</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
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
