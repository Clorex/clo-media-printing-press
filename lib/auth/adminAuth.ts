import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "clomedia_admin_session";
const SESSION_EXPIRES_IN = 60 * 60 * 24 * 5 * 1000; // 5 days

// ============================================
// CREATE SESSION
// ============================================

export async function createAdminSession(
  idToken: string
): Promise<NextResponse> {
  const sessionCookie = await adminAuth.createSessionCookie(
    idToken,
    { expiresIn: SESSION_EXPIRES_IN }
  );

  const response = NextResponse.json({
    success: true,
    message: "Login successful",
  });

  response.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: SESSION_EXPIRES_IN / 1000,
    path: "/",
  });

  return response;
}

// ============================================
// VERIFY SESSION
// ============================================

export async function verifyAdminSession() {
  const cookieStore = await cookies();
const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    throw new Error("Unauthorized");
  }

  const decoded = await adminAuth.verifySessionCookie(
    sessionCookie,
    true
  );

  const adminDoc = await adminDb
    .collection(COLLECTIONS.ADMINS)
    .doc(decoded.uid)
    .get();

  if (!adminDoc.exists) {
    throw new Error("Unauthorized");
  }

  const adminData = adminDoc.data();

  if (!adminData?.isActive || adminData.role !== "super_admin") {
    throw new Error("Unauthorized");
  }

  return {
    uid: decoded.uid,
    email: decoded.email,
    role: adminData.role,
  };
}

// ============================================
// CLEAR SESSION
// ============================================

export function clearAdminSession(): NextResponse {
  const response = NextResponse.json({
    success: true,
    message: "Logged out",
  });

  response.cookies.delete(SESSION_COOKIE_NAME);

  return response;
}