/**
 * Validates a Nigerian phone number.
 * Accepts: 080..., 090..., 070..., 081..., +234...
 * Returns true if valid.
 */
export function validateNigerianPhone(phone: string): boolean {
  const cleaned = phone
    .replace(/\s/g, "")
    .replace(/^(\+234|234|0)/, "");
  return /^[789][01]\d{8}$/.test(cleaned);
}

/**
 * Formats a phone number for WhatsApp deep link.
 * Converts any Nigerian format to 234XXXXXXXXXX
 */
export function formatPhoneForWhatsApp(phone: string): string {
  const cleaned = phone.replace(/\s/g, "");
  if (cleaned.startsWith("+234")) return cleaned.replace("+", "");
  if (cleaned.startsWith("234")) return cleaned;
  if (cleaned.startsWith("0")) return `234${cleaned.slice(1)}`;
  return `234${cleaned}`;
}

/**
 * Formats phone for display: 0805 908 6041
 */
export function formatPhoneDisplay(phone: string): string {
  const cleaned = phone.replace(/\D/g, "").replace(/^234/, "0");
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
}

/**
 * Masks phone number for privacy display: 080****6041
 */
export function maskPhone(phone: string): string {
  if (phone.length < 8) return phone;
  return `${phone.slice(0, 4)}****${phone.slice(-4)}`;
}