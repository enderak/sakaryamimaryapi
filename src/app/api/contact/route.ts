import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { companyInfo } from "@/data/company";
import fs from "fs";
import path from "path";
import { getSiteSettings } from "@/lib/settingsStorage";

// In-Memory Rate Limiter (IP bazlı istek sınırlaması)
interface RateLimitRecord {
  count: number;
  firstRequestTime: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 dakika

// XSS Temizleyici (HTML Entity Encoder)
function sanitize(input: unknown, maxLength: number): string {
  if (typeof input !== "string") return "";
  const cleaned = input
    .slice(0, maxLength)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
  return cleaned;
}

// Telefon formatı doğrulama (En az 10 basamaklı telefon)
function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

// E-posta formatı doğrulama
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: Request) {
  try {
    const settings = getSiteSettings();
    const sec = settings.security;

    // 1. İstemci IP Adresi Tespiti
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    // 2. IP Engel Kontrolü (Blacklist)
    if (sec.blockedIps && sec.blockedIps.includes(ip)) {
      return NextResponse.json(
        { success: false, error: "Erişiminiz güvenlik politikaları nedeniyle kısıtlanmıştır." },
        { status: 403 }
      );
    }

    // 3. User-Agent Kontrolü (Zararlı bot engeli)
    const userAgent = request.headers.get("user-agent") || "";
    if (sec.blockMaliciousUserAgents) {
      const badBots = ["sqlmap", "nikto", "dirbuster", "nmap", "wpscan", "masscan"];
      const isBadBot = badBots.some(bot => userAgent.toLowerCase().includes(bot));
      if (isBadBot) {
        return NextResponse.json({ success: false, error: "Geçersiz istek." }, { status: 400 });
      }
    }

    // 4. Rate Limiting (Flooding & Spam Koruması)
    if (sec.rateLimitingEnabled) {
      const maxReq = sec.maxContactRequestsPer10Min || 5;
      const now = Date.now();
      const clientRecord = rateLimitMap.get(ip);

      if (clientRecord) {
        if (now - clientRecord.firstRequestTime < RATE_LIMIT_WINDOW_MS) {
          if (clientRecord.count >= maxReq) {
            return NextResponse.json(
              {
                success: false,
                error: "Çok fazla istek gönderdiniz. Güvenliğiniz için lütfen 10 dakika sonra tekrar deneyiniz veya doğrudan bizi arayınız."
              },
              { status: 429 }
            );
          }
          clientRecord.count += 1;
        } else {
          rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
        }
      } else {
        rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
      }
    }

    // 3. Request Body Okuma
    const body = await request.json();
    const {
      name: rawName,
      phone: rawPhone,
      email: rawEmail,
      district: rawDistrict,
      service: rawService,
      targetPerson: rawTargetPerson,
      message: rawMessage,
      website_hp // Honeypot (bot tuzağı)
    } = body;

    // 4. Honeypot Kontrolü (Bot Trap)
    // Gerçek kullanıcıların görmediği gizli alan doldurulmuşsa isteği sessizce düşür
    if (website_hp && String(website_hp).trim().length > 0) {
      return NextResponse.json({ success: true, message: "İşlem başarılı." });
    }

    // 5. Girdi Doğrulama ve Temizleme (Sanitization & Length Bounds)
    const name = sanitize(rawName, 100);
    const phone = sanitize(rawPhone, 25);
    const email = rawEmail ? sanitize(rawEmail, 120) : "";
    const district = sanitize(rawDistrict, 50);
    const service = sanitize(rawService, 100);
    const message = sanitize(rawMessage, 2000);
    const targetPerson = sanitize(rawTargetPerson, 30);

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: "Lütfen geçerli bir ad ve soyad giriniz (en az 2 karakter)." },
        { status: 400 }
      );
    }

    if (!phone || !isValidPhone(phone)) {
      return NextResponse.json(
        { success: false, error: "Lütfen geçerli bir telefon numarası giriniz (örnek: 05xx xxx xx xx)." },
        { status: 400 }
      );
    }

    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Girdiğiniz e-posta adresi geçerli formatta değil." },
        { status: 400 }
      );
    }

    // 6. Alıcı ve Yetkili Belirleme
    const recipient = companyInfo.email; // sakaryamimaryapi@gmail.com
    const targetPersonName =
      targetPerson === "abdussamet"
        ? companyInfo.team[1].name
        : companyInfo.team[0].name;

    const emailSubject = `🏗️ Yeni Tadilat/Keşif Talebi: ${name} (${district || "Sakarya"})`;

    // 7. Güvenli HTML E-posta Şablonu
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0f172a; color: #ffffff; padding: 24px; text-align: center;">
          <h2 style="margin: 0; color: #f59e0b; font-size: 22px;">SAKARYA MİMAR YAPI</h2>
          <p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 13px;">Web Sitesi İletişim & Keşif Formu Bildirimi</p>
        </div>

        <div style="padding: 24px; background-color: #ffffff; color: #334155; line-height: 1.6;">
          <div style="background-color: #f8fafc; border-left: 4px solid #f59e0b; padding: 12px 16px; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 14px; font-weight: bold; color: #0f172a;">Yeni bir müşteri keşif/bilgi talebinde bulundu:</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569; width: 40%;">Müşteri Ad Soyad:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Telefon:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">
                <a href="tel:${phone.replace(/\D/g, "")}" style="color: #2563eb; font-weight: bold; text-decoration: none;">${phone}</a>
              </td>
            </tr>
            ${email ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">E-Posta:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${email}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Sakarya İlçesi:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${district || "Belirtilmedi"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Talep Edilen Hizmet:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold;">${service || "Genel Tadilat"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">İlgili Yetkili:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${targetPersonName}</td>
            </tr>
          </table>

          <div style="margin-top: 20px;">
            <p style="font-weight: bold; margin-bottom: 8px; color: #0f172a;">Müşteri Notu / Talebi:</p>
            <div style="background-color: #f1f5f9; padding: 14px; border-radius: 8px; font-size: 13px; color: #1e293b; white-space: pre-wrap;">
              ${message || "Herhangi bir ek not girilmedi."}
            </div>
          </div>

          <div style="margin-top: 24px; text-align: center;">
            <a href="https://wa.me/90${phone.replace(/\D/g, "")}" style="display: inline-block; background-color: #10b981; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px;">
              Müşteriye WhatsApp'tan Yanıt Ver
            </a>
          </div>
        </div>

        <div style="background-color: #f8fafc; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
          Bu e-posta ${companyInfo.displayWebsite} üzerindeki iletişim formu aracılığıyla güvenli şekilde gönderilmiştir.<br />
          ${companyInfo.address}
        </div>
      </div>
    `;

    // 8. SMTP Gönderimi
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

    let emailSent = false;

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: Number(process.env.SMTP_PORT) || 465,
          secure: process.env.SMTP_SECURE === "false" ? false : true,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Sakarya Mimar Yapı Web Sitesi" <${smtpUser}>`,
          to: recipient,
          subject: emailSubject,
          html: htmlContent,
          replyTo: email || smtpUser,
        });

        emailSent = true;
      } catch (mailErr) {
        console.error("SMTP Gönderim Hatası:", mailErr);
      }
    }

    // 9. Yerel Mesaj Yedekleme
    try {
      const messagesDir = path.join(process.cwd(), "messages");
      if (!fs.existsSync(messagesDir)) {
        fs.mkdirSync(messagesDir, { recursive: true });
      }

      const logFile = path.join(messagesDir, "gelen_mesajlar.json");
      let existingMessages: any[] = [];
      if (fs.existsSync(logFile)) {
        try {
          const content = fs.readFileSync(logFile, "utf-8");
          existingMessages = JSON.parse(content);
        } catch {
          existingMessages = [];
        }
      }

      existingMessages.push({
        id: `msg_${Date.now()}`,
        date: new Date().toISOString(),
        ipMasked: ip.replace(/\.\d+$/, ".xxx"), // KVKK gereği IP anonimleştirme
        name,
        phone,
        email: email || null,
        district,
        service,
        targetPerson: targetPersonName,
        message,
        emailSentToGmail: emailSent
      });

      fs.writeFileSync(logFile, JSON.stringify(existingMessages, null, 2), "utf-8");
    } catch (fsErr) {
      console.error("Mesaj loglama hatası:", fsErr);
    }

    return NextResponse.json({
      success: true,
      emailSent,
      recipient,
      message: emailSent
        ? `${recipient} adresine e-posta başarıyla iletildi.`
        : `Talebiniz güvenle kaydedildi.`
    });
  } catch (error: any) {
    console.error("Security/Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Güvenlik veya sunucu hatası oluştu. Lütfen tekrar deneyiniz." },
      { status: 500 }
    );
  }
}
