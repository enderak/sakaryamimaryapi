import { NextResponse } from "next/server";
import { getSeoGeoConfig } from "@/lib/seoStorage";

export async function GET() {
  const config = getSeoGeoConfig();
  const bingCode = config.meta?.bingVerification || config.aiOptimization?.bingVerification || "9D49062F81B828135832E5203A9BC2F9";

  const xml = `<?xml version="1.0"?>
<users>
  <user>${bingCode}</user>
</users>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400"
    }
  });
}
