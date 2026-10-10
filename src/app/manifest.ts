import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sakarya Mimar Yapı | Anahtar Teslim Ev Tadilatı",
    short_name: "Mimar Yapı",
    description: "Sakarya tadilat, daire yenileme, Sapanca villa yapımı ve mimari dekorasyon.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f2b5c",
    theme_color: "#0f2b5c",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon"
      }
    ]
  };
}
