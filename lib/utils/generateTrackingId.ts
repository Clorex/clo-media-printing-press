/**
 * Generates a unique tracking ID in format: CLO-XXXXXX
 * Uses alphanumeric characters (uppercase only)
 */
export function generateTrackingId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `CLO-${suffix}`;
}

/**
 * Generates a unique order document ID
 * Format: ORD-{timestamp}-{random5chars}
 */
export function generateOrderId(): string {
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-${Date.now()}-${random}`;
}

/**
 * Validates that a string matches the CLO tracking ID format
 */
export function isValidTrackingId(value: string): boolean {
  return /^CLO-[A-Z0-9]{6}$/.test(value.trim().toUpperCase());
}

/**
 * Normalizes a tracking ID input (trims + uppercases)
 */
export function normalizeTrackingId(value: string): string {
  return value.trim().toUpperCase();
}