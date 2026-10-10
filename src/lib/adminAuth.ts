import fs from "fs";
import path from "path";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "sakarya-mimar-yapi-super-secret-key-2026-secure"
);

export const ADMIN_COOKIE_NAME = "smy_admin_session";

const EMAILS_FILE = path.join(process.cwd(), "data", "admin-emails.json");

// Default Allowed Admin Emails
const DEFAULT_ALLOWED_EMAILS = [
  "sakaryamimaryapi@gmail.com",
  "enderakar@outlook.com",
  "enderakar@gmail.com"
];

/**
 * Gets all authorized admin emails from JSON file and ENV
 */
export function getAllowedAdminEmails(): string[] {
  let fileEmails: string[] = [];

  try {
    if (fs.existsSync(EMAILS_FILE)) {
      const content = fs.readFileSync(EMAILS_FILE, "utf-8");
      fileEmails = JSON.parse(content);
    } else {
      // Ensure data directory exists and write default
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        try {
          fs.mkdirSync(dataDir, { recursive: true });
        } catch {}
      }
      try {
        fs.writeFileSync(EMAILS_FILE, JSON.stringify(DEFAULT_ALLOWED_EMAILS, null, 2), "utf-8");
      } catch {}
      fileEmails = DEFAULT_ALLOWED_EMAILS;
    }
  } catch (err) {
    console.error("Error reading admin emails file:", err);
    fileEmails = DEFAULT_ALLOWED_EMAILS;
  }

  const envEmails = process.env.ADMIN_ALLOWED_EMAILS
    ? process.env.ADMIN_ALLOWED_EMAILS.split(",").map((e) => e.trim().toLowerCase())
    : [];

  const combined = Array.from(
    new Set([
      ...DEFAULT_ALLOWED_EMAILS.map((e) => e.toLowerCase()),
      ...fileEmails.map((e) => e.trim().toLowerCase()),
      ...envEmails
    ])
  ).filter(Boolean);

  return combined;
}

/**
 * Adds a new email to the authorized admin list
 */
export function addAllowedAdminEmail(email: string): boolean {
  try {
    const normalized = email.trim().toLowerCase();
    const currentList = getAllowedAdminEmails();
    if (!currentList.includes(normalized)) {
      currentList.push(normalized);
      try {
        fs.writeFileSync(EMAILS_FILE, JSON.stringify(currentList, null, 2), "utf-8");
      } catch (writeErr) {
        console.warn("Could not write EMAILS_FILE on serverless:", writeErr);
      }
    }
    return true;
  } catch (err) {
    console.error("Error adding admin email:", err);
    return false;
  }
}

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
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  const allowed = getAllowedAdminEmails();
  return allowed.includes(normalized);
}
