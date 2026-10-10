import { NextResponse } from "next/server";
import { getSeoGeoConfig } from "@/lib/seoStorage";
import { companyInfo } from "@/data/company";

export async function GET() {
  const seoConfig = getSeoGeoConfig();
  const baseUrl = seoConfig.meta.canonicalUrl || "https://www.sakaryamimaryapi.com";
  const summary = seoConfig.aiOptimization?.aiSummaryPrompt || seoConfig.meta.siteDescription;

  const content = `# Sakarya Mimar Yapı

> ${summary}

## Kurumsal Künye ve İletişim
- **Resmi Firma:** ${seoConfig.schema.businessName || "Sakarya Mimar Yapı"}
- **Merkez Adres:** ${companyInfo.address}
- **Yetkili Proje Sorumlusu:** ${companyInfo.team[0]?.name} (${companyInfo.team[0]?.phone})
- **Teknik Saha Sorumlusu:** ${companyInfo.team[1]?.name} (${companyInfo.team[1]?.phone})
- **E-Posta:** ${companyInfo.email}
- **Web Sitesi:** ${baseUrl}
- **Hizmet Bölgeleri:** ${seoConfig.geo.targetDistricts.join(", ")}, Sakarya

## Hizmetlerimiz ve Çözümlerimiz
- [Komple Ev Tadilatı](${baseUrl}/hizmetler): Sakarya genelinde anahtar teslim komple daire ve villa yenileme.
- [Mutfak Dolabı & Tadilatı](${baseUrl}/hizmetler): Özel tasarım akrilik/lake dolaplar, porselen ve granit tezgah.
- [Banyo Yenileme & Su Yalıtımı](${baseUrl}/hizmetler): Kırım, membran su yalıtımı, gömme rezervuar, seramik döşeme.
- [Sapanca Villa İnşaatı](${baseUrl}/hizmetler): Temelden çatıya betonarme ve hafif çelik villa üretimi.
- [2026 Fiyat Hesaplayıcı](${baseUrl}/#fiyat-hesapla): Çevrimiçi yaklaşık tadilat maliyeti hesaplama aracı.

## Güvenceler
- **2 Yıl Firma Garantisi:** Yapılan tüm işçilik ve tesisat uygulamalarında 2 yıl resmi garanti.
- **Sözleşmeli Teslimat:** Gününde teslim taahhüdü ve şeffaf hak ediş ödeme planı.
- **Ücretsiz Keşif:** Sakarya içi adrese gelerek ücretsiz ölçüm ve 3D mimari görselleştirme.
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400"
    }
  });
}
