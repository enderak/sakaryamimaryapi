import { NextResponse } from "next/server";
import Parser from "rss-parser";
import { getSiteSettings } from "@/lib/settingsStorage";
import { DEFAULT_SAKARYA_RSS_FEEDS, DEFAULT_RSS_KEYWORDS } from "@/data/siteSettings";

interface FeedItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  contentSnippet: string;
  isSakaryaRelated?: boolean;
}

const parser = new Parser({
  timeout: 5000,
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) SakaryaMimarYapi/1.0",
    "Accept": "application/rss+xml, application/xml, text/xml",
  }
});

const FALLBACK_NEWS: FeedItem[] = [
  {
    id: "f1",
    title: "Sakarya'da Kentsel Dönüşüm ve Deprem Dayanıklı Yapılaşma Hız Kazanıyor",
    link: "https://www.sakarya.bel.tr",
    pubDate: "Güncel",
    source: "Sakarya Şehir Bülteni",
    contentSnippet: "Adapazarı ve Serdivan genelinde eski yapı stokunun modern, deprem standartlarına uygun yenilenmesi için mimari projeler ve teşvikler artırıldı.",
    isSakaryaRelated: true
  },
  {
    id: "f2",
    title: "2026 İnşaat ve Konut Tadilatında Enerji Verimliliği ve Isı Yalıtımı Standartları",
    link: "https://csb.gov.tr",
    pubDate: "Güncel",
    source: "Çevre ve Şehircilik Bakanlığı",
    contentSnippet: "Binalarda mantolama ve A sınıfı enerji kimlik belgesi uygulamaları konut sahiplerine kış aylarında %50'ye varan doğalgaz tasarrufu sağlıyor.",
    isSakaryaRelated: true
  },
  {
    id: "f3",
    title: "Sapanca Bölgesinde Ekolojik ve Çelik Villa Projelerine İlgi Katlandı",
    link: "https://sakarya.ktb.gov.tr",
    pubDate: "Güncel",
    source: "Sektörel Mimari Rapor",
    contentSnippet: "Göl havzasında doğa ile uyumlu, çevreye zarar vermeyen hafif çelik yapılar ve butik konaklama tesisleri son dönemin en popüler mimari trendi oldu.",
    isSakaryaRelated: true
  },
  {
    id: "f4",
    title: "Ev Tadilatında 3D Görselleştirme ve Sözleşmeli Teslimat Tüketiciyi Koruyor",
    link: "https://www.sakaryamimaryapi.com/blog",
    pubDate: "Güncel",
    source: "TMMOB Mimarlar Odası",
    contentSnippet: "Uzmanlar, anahtar teslim tadilat yaptıracak vatandaşların sürpriz maliyetlerle karşılaşmamak için kurumsal iç mimarlık firmalarıyla çalışmalarını öneriyor.",
    isSakaryaRelated: true
  }
];

// Güvenli metin temizleyici (HTML etiketlerini ve zararlı scriptleri temizler, entity'leri düzeltir)
function stripHtml(input: string, maxLen = 220): string {
  if (!input) return "";
  let text = input
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");

  // Güvenlik için tekrar zararlı script parantezlerini escape et
  return text
    .replace(/[<>]/g, "")
    .slice(0, maxLen)
    .trim();
}

// Güvenli URL doğrulayıcı
function sanitizeUrl(url?: string): string {
  if (!url) return "#";
  const trimmed = url.trim();
  if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) {
    return trimmed;
  }
  return "#";
}

// Sakarya inşaat/tadilat/dekorasyon filtre kontrolü
function matchesConstructionKeywords(title: string, snippet: string, keywords: string[]): boolean {
  const combined = (title + " " + snippet).toLowerCase();
  return keywords.some(kw => combined.includes(kw.toLowerCase()));
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
      ? rssConfig.feeds.filter(f => f.enabled)
      : DEFAULT_SAKARYA_RSS_FEEDS;

    const keywords = (rssConfig?.keywords && rssConfig.keywords.length > 0)
      ? rssConfig.keywords
      : DEFAULT_RSS_KEYWORDS;

    const filterEnabled = rssConfig?.filterKeywordsOnly ?? true;
    const maxItems = rssConfig?.itemsToShow || 6;
    const allFetchedItems: FeedItem[] = [];

    // Feeds'leri tara
    for (const feed of activeFeeds) {
      try {
        const feedData = await parser.parseURL(feed.url);
        if (feedData.items && feedData.items.length > 0) {
          for (const item of feedData.items) {
            if (!item.title) continue;

            const cleanTitle = stripHtml(item.title, 140);
            const cleanSnippet = stripHtml(item.contentSnippet || item.content || "", 220);
            const safeLink = sanitizeUrl(item.link);

            // Sakarya ve İnşaat/Tadilat/Dekorasyon filtre kontrolü
            const isRelevant = matchesConstructionKeywords(cleanTitle, cleanSnippet, keywords);

            if (!filterEnabled || isRelevant) {
              const formattedDate = item.pubDate
                ? new Date(item.pubDate).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
                : "Güncel";

              // Kaynak adı belirleme (Google News ise başlık sonundaki gazeteyi veya feed adını kullan)
              let sourceName = feed.name;
              if (cleanTitle.includes(" - ")) {
                const parts = cleanTitle.split(" - ");
                const candidateSource = parts[parts.length - 1].trim();
                if (candidateSource.length > 1 && candidateSource.length < 35) {
                  sourceName = candidateSource;
                }
              }

              allFetchedItems.push({
                id: `rss-${allFetchedItems.length}-${Date.now()}`,
                title: cleanTitle.split(" - ")[0].trim(),
                link: safeLink,
                pubDate: formattedDate,
                source: sourceName,
                contentSnippet: cleanSnippet || "Haber detayı için tıklayınız.",
                isSakaryaRelated: isRelevant
              });

              if (allFetchedItems.length >= maxItems * 2) {
                break;
              }
            }
          }
        }
      } catch (err) {
        console.error(`Feed fetch error for ${feed.name}:`, err);
        continue;
      }
    }

    // İstenen limit kadar döndür
    const finalItems = allFetchedItems.slice(0, maxItems);

    if (finalItems.length === 0) {
      return NextResponse.json({
        success: true,
        isFallback: true,
        items: FALLBACK_NEWS.slice(0, maxItems)
      });
    }

    return NextResponse.json({
      success: true,
      isFallback: false,
      totalCount: finalItems.length,
      items: finalItems
    });
  } catch {
    return NextResponse.json({
      success: true,
      isFallback: true,
      items: FALLBACK_NEWS
    });
  }
}
