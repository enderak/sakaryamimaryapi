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
  const { meta, geo } = seoConfig;

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
      yandex: meta.yandexVerification || undefined
    },
    other: {
      "geo.region": geo.region,
      "geo.placename": geo.placename,
      "geo.position": geo.position,
      "ICBM": geo.icbm,
      "distribution": "Global",
      "rating": "General",
      "revisit-after": "7 days"
    }
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seoConfig = getSeoGeoConfig();
  const { meta, geo, schema } = seoConfig;

  // LocalBusiness Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schema.businessType || "GeneralContractor",
    "name": schema.businessName,
    "image": meta.ogImage,
    "@id": `${meta.canonicalUrl}/#business`,
    "url": meta.canonicalUrl,
    "telephone": companyInfo.primaryPhoneRaw,
    "priceRange": schema.priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": geo.streetAddress,
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
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:30",
        "closes": "19:30"
      }
    ],
    "areaServed": geo.targetDistricts.map((d) => ({
      "@type": "AdministrativeArea",
      "name": `${d}, Sakarya`
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": schema.ratingValue,
      "reviewCount": schema.reviewCount
    }
  };

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
