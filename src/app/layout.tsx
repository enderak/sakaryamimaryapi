import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import CookieBanner from "@/components/CookieBanner";
import { getSeoGeoConfig } from "@/lib/seoStorage";
import { companyInfo } from "@/data/company";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const seoConfig = getSeoGeoConfig();
  const { meta, geo, aiOptimization } = seoConfig;

  return {
    title: meta.siteTitle,
    description: meta.siteDescription,
    keywords: meta.keywords,
    authors: [{ name: meta.author }],
    metadataBase: new URL(meta.canonicalUrl || "https://www.sakaryamimaryapi.com"),
    alternates: {
      canonical: "/"
    },
    openGraph: {
      title: meta.siteTitle,
      description: meta.siteDescription,
      url: meta.canonicalUrl,
      siteName: "Sakarya Mimar Yapı",
      locale: "tr_TR",
      type: "website",
      images: [
        {
          url: meta.ogImage,
          width: 1200,
          height: 630,
          alt: meta.siteTitle
        }
      ]
    },
    verification: {
      google: meta.googleSiteVerification || undefined,
      yandex: meta.yandexVerification || aiOptimization?.yandexVerification || undefined,
      other: {
        ...(aiOptimization?.bingVerification ? { "msvalidate.01": [aiOptimization.bingVerification] } : {}),
        ...(aiOptimization?.pinterestVerification ? { "p:domain_verify": [aiOptimization.pinterestVerification] } : {})
      }
    },
    other: {
      "geo.region": geo.region,
      "geo.placename": geo.placename,
      "geo.position": geo.position,
      "ICBM": geo.icbm,
      "distribution": "Global",
      "rating": "General",
      "revisit-after": "7 days",
      ...(aiOptimization?.aiSummaryPrompt ? { "ai-summary": aiOptimization.aiSummaryPrompt } : {})
    }
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seoConfig = getSeoGeoConfig();
  const { meta, geo, schema, googlePlaces, merchant, aiOptimization } = seoConfig;

  // LocalBusiness + Google Places + Merchant Offerings Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schema.businessType || "GeneralContractor",
    "name": googlePlaces?.businessExactName || schema.businessName,
    "alternateName": "Sakarya Tadilat & Mimar Yapı",
    "description": aiOptimization?.aiSummaryPrompt || meta.siteDescription,
    "knowsAbout": aiOptimization?.primaryKeywordsLsi || [
      "Sakarya komple ev tadilatı",
      "Serdivan banyo mutfak yenileme",
      "Sapanca villa inşaatı"
    ],
    "image": [
      meta.ogImage,
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    "@id": `${meta.canonicalUrl}/#localbusiness`,
    "url": meta.canonicalUrl,
    "telephone": companyInfo.primaryPhoneRaw,
    "email": companyInfo.email,
    "priceRange": schema.priceRange,
    "currenciesAccepted": "TRY",
    "paymentAccepted": "Nakit, Banka Havalesi / EFT, Kredi Kartı",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": googlePlaces?.streetAddress || geo.streetAddress,
      "addressLocality": "Serdivan",
      "addressRegion": "Sakarya",
      "postalCode": geo.postalCode,
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": geo.latitude,
      "longitude": geo.longitude
    },
    "hasMap": googlePlaces?.googleMapsProfileUrl || `https://maps.google.com/?q=${geo.latitude},${geo.longitude}`,
    "sameAs": [
      googlePlaces?.googleMapsProfileUrl,
      googlePlaces?.googleReviewUrl,
      "https://instagram.com/sakaryamimaryapi",
      "https://facebook.com/sakaryamimaryapi"
    ].filter(Boolean),
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:30",
        "closes": "19:30"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Sakarya",
        "sameAs": "https://tr.wikipedia.org/wiki/Sakarya_(il)"
      },
      ...geo.targetDistricts.map((d) => ({
        "@type": "AdministrativeArea",
        "name": `${d}, Sakarya`
      }))
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": schema.ratingValue,
      "reviewCount": schema.reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    },
    ...(merchant?.enabled && merchant?.offers?.length
      ? {
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Sakarya Tadilat ve İnşaat Hizmetleri Kataloğu",
            "itemListElement": merchant.offers.map((offer) => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": offer.name,
                "description": offer.description,
                "serviceType": offer.category,
                "areaServed": "Sakarya"
              },
              "priceSpecification": {
                "@type": "PriceSpecification",
                "minPrice": offer.minPrice,
                "maxPrice": offer.maxPrice,
                "priceCurrency": offer.priceCurrency || "TRY"
              },
              "availability": "https://schema.org/InStock",
              "url": `${meta.canonicalUrl}/#fiyat-hesapla`
            }))
          }
        }
      : {})
  };

  const faqJsonLd = aiOptimization?.faqSchema?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": aiOptimization.faqSchema.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      }
    : null;

  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-100 selection:text-amber-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloating />
        <CookieBanner />
      </body>
    </html>
  );
}
