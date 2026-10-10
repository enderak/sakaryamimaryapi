import nodemailer from "nodemailer";

export async function sendOtpEmail(toEmail: string, code: string): Promise<boolean> {
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

  // If SMTP is not yet configured, we log the code to console for quick developer/owner login
  if (!smtpUser || !smtpPass) {
    console.log(`\n========================================`);
    console.log(`🔑 [ADMIN GMAIL GİRİŞ KODU]: ${code}`);
    console.log(`Hedef E-Posta: ${toEmail}`);
    console.log(`(SMTP ayarlanmadığı için konsola yazdırıldı)`);
    console.log(`========================================\n`);
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE === "false" ? false : true,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background: #ffffff;">
        <div style="background-color: #0f2b5c; color: #ffffff; padding: 24px; text-align: center;">
          <h2 style="margin: 0; color: #c28b38; font-size: 22px;">SAKARYA MİMAR YAPI</h2>
          <p style="margin: 6px 0 0 0; color: #cbd5e1; font-size: 13px;">Yönetim Paneli Giriş Doğrulaması</p>
        </div>
        <div style="padding: 30px; text-align: center;">
          <p style="font-size: 14px; color: #475569; margin-bottom: 20px;">
            Yönetim paneline giriş yapabilmek için tek kullanımlık güvenlik kodunuz:
          </p>
          <div style="background-color: #f8fafc; border: 2px dashed #0f2b5c; border-radius: 12px; padding: 18px; display: inline-block; min-width: 200px; margin-bottom: 20px;">
            <span style="font-size: 32px; font-weight: 900; letter-spacing: 6px; color: #0f2b5c;">${code}</span>
          </div>
          <p style="font-size: 12px; color: #94a3b8; margin: 0;">
            Bu kod 10 dakika süreyle geçerlidir. Eğer bu girişi siz talep etmediyseniz bu e-postayı dikkate almayınız.
          </p>
        </div>
        <div style="background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 11px; color: #64748b;">
          Sakarya Mimar Yapı • Serdivan / Sakarya
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Sakarya Mimar Yapı Güvenlik" <${smtpUser}>`,
      to: toEmail,
      subject: `🔑 Yönetici Giriş Kodunuz: ${code}`,
      html
    });

    return true;
  } catch (err) {
    console.error("Error sending OTP email:", err);
    // Fallback log
    console.log(`\n========================================`);
    console.log(`🔑 [ADMIN GMAIL GİRİŞ KODU - FALLBACK]: ${code}`);
    console.log(`Hedef E-Posta: ${toEmail}`);
    console.log(`========================================\n`);
    return true;
  }
}
