import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "sakarya-mimar-yapi-super-secret-key-2026-secure"
);

export const ADMIN_COOKIE_NAME = "smy_admin_session";

// Allowed Gmail / email accounts that have admin access
export const ALLOWED_ADMIN_EMAILS = [
  "sakaryamimaryapi@gmail.com",
  "enderak@gmail.com"
];

export interface AdminSession {
  email: string;
  name?: string;
  role: "admin";
  loginMethod: "google_oauth" | "gmail_otp" | "master_key";
}

/**
 * Creates an encrypted JWT session token valid for 7 days
 */
export async function createAdminToken(session: AdminSession): Promise<string> {
  return await new SignJWT({ ...session })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);
}

/**
 * Verifies the JWT session token
 */
export async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as unknown as AdminSession;
  } catch {
    return null;
  }
}

/**
 * Checks if current request has a valid admin session cookie
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyAdminToken(token);
}

/**
 * Verifies if an email is authorized to access admin panel
 */
export function isAuthorizedAdminEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  
  // Custom env override
  const customEmails = process.env.ADMIN_ALLOWED_EMAILS
    ? process.env.ADMIN_ALLOWED_EMAILS.split(",").map((e) => e.trim().toLowerCase())
    : [];

  const allAllowed = [...ALLOWED_ADMIN_EMAILS.map((e) => e.toLowerCase()), ...customEmails];
  return allAllowed.includes(normalized);
}
