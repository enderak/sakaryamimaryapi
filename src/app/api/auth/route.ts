import { NextResponse } from "next/server";
import { isAuthorizedAdminEmail, createAdminToken, ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/adminAuth";
import { generateOtp, verifyOtp } from "@/lib/otpStore";
import { sendOtpEmail } from "@/lib/sendOtpEmail";

// GET /api/auth/session - returns current logged in status
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false });
  }
  return NextResponse.json({ authenticated: true, session });
}

// POST /api/auth/login - handles send-otp, verify-otp, google-token and master-key
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    // 1. Send OTP to Gmail
    if (action === "send-otp") {
      const { email } = body;
      if (!email || typeof email !== "string") {
        return NextResponse.json({ success: false, message: "Geçerli bir Gmail adresi giriniz." }, { status: 400 });
      }

      if (!isAuthorizedAdminEmail(email)) {
        return NextResponse.json({ 
          success: false, 
          message: "Bu e-posta adresinin yönetici paneline erişim yetkisi bulunmamaktadır." 
        }, { status: 403 });
      }

      const code = generateOtp(email);
      await sendOtpEmail(email, code);

      return NextResponse.json({
        success: true,
        message: `${email} adresine 6 haneli güvenlik doğrulama kodu gönderildi.`
      });
    }

    // 2. Verify OTP code
    if (action === "verify-otp") {
      const { email, code } = body;
      if (!email || !code) {
        return NextResponse.json({ success: false, message: "E-posta ve doğrulama kodu gereklidir." }, { status: 400 });
      }

      const isValid = verifyOtp(email, code);
      if (!isValid) {
        return NextResponse.json({ success: false, message: "Hatalı veya süresi dolmuş doğrulama kodu!" }, { status: 400 });
      }

      // Create JWT session
      const token = await createAdminToken({
        email: email.trim().toLowerCase(),
        role: "admin",
        loginMethod: "gmail_otp"
      });

      const response = NextResponse.json({
        success: true,
        message: "Başarıyla giriş yapıldı.",
        user: { email }
      });

      // Set HTTP-Only Cookie
      response.cookies.set(ADMIN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 // 7 days
      });

      return response;
    }

    // 3. Google One-Tap / OAuth Credential (JWT token decoding)
    if (action === "google-credential") {
      const { credential } = body;
      if (!credential) {
        return NextResponse.json({ success: false, message: "Google kimlik verisi alınamadı." }, { status: 400 });
      }

      // Decode Google ID Token payload
      const parts = credential.split(".");
      if (parts.length !== 3) {
        return NextResponse.json({ success: false, message: "Geçersiz kimlik belirteci." }, { status: 400 });
      }

      const payload = JSON.parse(Buffer.from(parts[1], "base64").toString("utf-8"));
      const googleEmail = payload.email;

      if (!googleEmail || !isAuthorizedAdminEmail(googleEmail)) {
        return NextResponse.json({
          success: false,
          message: `(${googleEmail}) Google hesabı yönetici olarak tanımlı değildir.`
        }, { status: 403 });
      }

      const token = await createAdminToken({
        email: googleEmail,
        name: payload.name,
        role: "admin",
        loginMethod: "google_oauth"
      });

      const response = NextResponse.json({
        success: true,
        message: "Google ile giriş başarılı.",
        user: { email: googleEmail, name: payload.name }
      });

      response.cookies.set(ADMIN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60
      });

      return response;
    }

    // 4. Logout action
    if (action === "logout") {
      const response = NextResponse.json({ success: true, message: "Çıkış yapıldı." });
      response.cookies.set(ADMIN_COOKIE_NAME, "", {
        httpOnly: true,
        path: "/",
        maxAge: 0
      });
      return response;
    }

    return NextResponse.json({ success: false, message: "Geçersiz işlem." }, { status: 400 });
  } catch (error) {
    console.error("Auth route error:", error);
    return NextResponse.json({ success: false, message: "Sunucu hatası meydana geldi." }, { status: 500 });
  }
}
