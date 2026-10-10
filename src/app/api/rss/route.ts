import { NextResponse } from "next/server";
import Parser from "rss-parser";
import { getSiteSettings } from "@/lib/settingsStorage";

interface FeedItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  contentSnippet: string;
}

const parser = new Parser({
  timeout: 4000,
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) SakaryaMimarYapi/1.0",
    "Accept": "application/rss+xml, application/xml, text/xml",
  }
});

const DEFAULT_FEED_URLS = [
  { url: "https://www.trthaber.com/ekonomi_articles.rss", source: "TRT Haber Ekonomi" },
  { url: "https://www.aa.com.tr/tr/rss/default?cat=guncel", source: "Anadolu Ajansı" }
];

const FALLBACK_NEWS: FeedItem[] = [
  {
    id: "f1",
    title: "Sakarya'da Kentsel Dönüşüm ve Deprem Dayanıklı Yapılaşma Hız Kazanıyor",
    link: "https://www.sakarya.bel.tr",
    pubDate: "9 Mart 2026",
    source: "Sakarya Şehir Bülteni",
    contentSnippet: "Adapazarı ve Serdivan genelinde eski yapı stokunun modern, deprem standartlarına uygun yenilenmesi için mimari projeler ve teşvikler artırıldı."
  },
  {
    id: "f2",
    title: "2026 İnşaat ve Konut Tadilatında Enerji Verimliliği ve Isı Yalıtımı Standartları",
    link: "https://csb.gov.tr",
    pubDate: "7 Mart 2026",
    source: "Çevre ve Şehircilik Bakanlığı",
    contentSnippet: "Binalarda mantolama ve A sınıfı enerji kimlik belgesi uygulamaları konut sahiplerine kış aylarında %50'ye varan doğalgaz tasarrufu sağlıyor."
  },
  {
    id: "f3",
    title: "Sapanca Bölgesinde Ekolojik ve Çelik Villa Projelerine İlgi Katlandı",
    link: "https://sakarya.ktb.gov.tr",
    pubDate: "4 Mart 2026",
    source: "Sektörel Mimari Rapor",
    contentSnippet: "Göl havzasında doğa ile uyumlu, çevreye zarar vermeyen hafif çelik yapılar ve butik konaklama tesisleri son dönemin en popüler mimari trendi oldu."
  },
  {
    id: "f4",
    title: "Ev Tadilatında 3D Görselleştirme ve Sözleşmeli Teslimat Tüketiciyi Koruyor",
    link: "https://www.sakaryamimaryapi.com/blog",
    pubDate: "1 Mart 2026",
    source: "TMMOB Mimarlar Odası",
    contentSnippet: "Uzmanlar, anahtar teslim tadilat yaptıracak vatandaşların sürpriz maliyetlerle karşılaşmamak için kurumsal iç mimarlık firmalarıyla çalışmalarını öneriyor."
  }
];

// Güvenli metin temizleyici (HTML taglerini ve scriptleri temizler)
function stripHtml(input: string, maxLen = 200): string {
  if (!input) return "";
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[<>'"&]/g, (char) => {
      const map: Record<string, string> = {
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
        "&": "&amp;",
      };
      return map[char] || char;
    })
    .slice(0, maxLen)
    .trim();
}

// Güvenli URL doğrulayıcı (javascript: veya data: bağlantılarını engeller)
function sanitizeUrl(url?: string): string {
  if (!url) return "#";
  const trimmed = url.trim();
  if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) {
    return trimmed;
  }
  return "#";
}

export async function GET() {
  try {
    const siteSettings = getSiteSettings();
    const rssConfig = siteSettings?.rss;

    // Check if RSS module is enabled globally
    if (rssConfig && !rssConfig.enabled) {
      return NextResponse.json({
        success: true,
        disabled: true,
        items: []
      });
    }

    const activeFeeds = (rssConfig?.feeds && rssConfig.feeds.filter(f => f.enabled).length > 0)
      ? rssConfig.feeds.filter(f => f.enabled).map(f => ({ url: f.url, source: f.name }))
      : DEFAULT_FEED_URLS;

    const maxItems = rssConfig?.itemsToShow || 6;
    const fetchedItems: FeedItem[] = [];

    for (const feed of activeFeeds) {
      try {
        const feedData = await parser.parseURL(feed.url);
        if (feedData.items && feedData.items.length > 0) {
          feedData.items.slice(0, maxItems).forEach((item, index) => {
            if (item.title) {
              const cleanTitle = stripHtml(item.title, 120);
              const cleanSnippet = stripHtml(item.contentSnippet || item.content || "", 200);
              const safeLink = sanitizeUrl(item.link);

              fetchedItems.push({
                id: `rss-${index}-${Date.now()}`,
                title: cleanTitle,
                link: safeLink,
                pubDate: item.pubDate ? new Date(item.pubDate).toLocaleDateString("tr-TR") : "Güncel",
                source: feed.source,
                contentSnippet: cleanSnippet || "Sektörel haber detayı için tıklayınız."
              });
            }
          });
          break; // İlk çalışan feed yeterli
        }
      } catch {
        continue;
      }
    }

    if (fetchedItems.length === 0) {
      return NextResponse.json({
        success: true,
        isFallback: true,
        items: FALLBACK_NEWS
      });
    }

    return NextResponse.json({
      success: true,
      isFallback: false,
      items: fetchedItems
    });
  } catch {
    return NextResponse.json({
      success: true,
      isFallback: true,
      items: FALLBACK_NEWS
    });
  }
}
