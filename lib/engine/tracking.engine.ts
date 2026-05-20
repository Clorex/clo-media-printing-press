import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";

/**
 * Generate collision‑safe tracking ID
 * Format: CLO-XXXXXX (6 alphanumeric chars)
 */
export async function generateTrackingId(): Promise<string> {
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "CLO-";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }

    // ✅ Collision check
    const snapshot = await adminDb
      .collection(COLLECTIONS.ORDERS)
      .where("trackingId", "==", result)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return result;
    }

    attempts++;
  }

  throw new Error("Unable to generate unique tracking ID.");
}

/**
 * Mask tracking ID for public display
 * Returns: CLO-••••••
 */
export function maskTrackingId(trackingId: string): string {
  if (!trackingId.startsWith("CLO-")) {
    return "CLO-••••••";
  }
  return "CLO-••••••";
}

/**
 * Check if tracking should be visible
 */
export function shouldShowTracking(
  paymentStatus: string,
  orderStatus: string
): boolean {
  return paymentStatus === "CONFIRMED" && orderStatus !== "CANCELLED";
}