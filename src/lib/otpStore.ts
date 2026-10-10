// In-memory OTP code store with 10 minute expiration
interface OtpEntry {
  code: string;
  email: string;
  expiresAt: number;
}

const otpStore = new Map<string, OtpEntry>();

export function generateOtp(email: string): string {
  const normalized = email.trim().toLowerCase();
  // 6-digit random number
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  otpStore.set(normalized, {
    code,
    email: normalized,
    expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
  });

  return code;
}

export function verifyOtp(email: string, inputCode: string): boolean {
  const normalized = email.trim().toLowerCase();
  const entry = otpStore.get(normalized);

  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    otpStore.delete(normalized);
    return false;
  }

  if (entry.code === inputCode.trim()) {
    otpStore.delete(normalized);
    return true;
  }

  return false;
}
