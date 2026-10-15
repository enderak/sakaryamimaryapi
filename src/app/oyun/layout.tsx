import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Duvardan Tuğla Aşırtma Oyunu | Sakarya Mimar Yapı",
  description: "Mobil uyumlu şantiye ustası tuğla aşırtma oyunu! Tuğlaları duvardan aşırtın, harç teknesini doldurun ve özel tadilat keşif indirimi kazanın.",
  robots: {
    index: true,
    follow: true,
  }
};

export default function OyunLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
