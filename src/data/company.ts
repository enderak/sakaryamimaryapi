export interface ContactPerson {
  name: string;
  role: string;
  phone: string;
  rawPhone: string;
  whatsappNumber: string;
}

export const companyInfo = {
  name: "Sakarya Mimar Yapı",
  shortName: "MİMAR YAPI",
  tagline: "İnşaat • Dekorasyon • Tadilat",
  fullTitle: "Sakarya Mimar Yapı | İnşaat, Dekorasyon ve Ev Tadilatı",
  address: "Arabacıalanı Mah. Çark Cd. No:148 Kat:2 Serdivan / Sakarya",
  district: "Serdivan",
  city: "Sakarya",
  website: "https://www.sakaryamimaryapi.com",
  displayWebsite: "www.sakaryamimaryapi.com",
  email: "sakaryamimaryapi@gmail.com",
  primaryPhoneDisplay: "0536 387 35 92",
  primaryPhoneRaw: "05363873592",
  primaryWhatsapp: "905363873592",
  secondaryPhoneDisplay: "0535 371 64 05",
  secondaryPhoneRaw: "05353716405",
  secondaryWhatsapp: "905353716405",
  team: [
    {
      name: "Asım Yılmazer",
      role: "Proje & Uygulama Sorumlusu",
      phone: "0536 387 35 92",
      rawPhone: "05363873592",
      whatsappNumber: "905363873592"
    },
    {
      name: "Abdussamet Gültekin",
      role: "Teknik & Saha Sorumlusu",
      phone: "0535 371 64 05",
      rawPhone: "05353716405",
      whatsappNumber: "905353716405"
    }
  ]
};
