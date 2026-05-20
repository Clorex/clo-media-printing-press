export function sanitizeString(input: string): string {
  return input
    .replace(/<[^>]*>?/gm, "")
    .replace(/[<>]/g, "")
    .trim();
}

export function sanitizeTrackingId(input: string): string {
  return input
    .replace(/[^A-Z0-9-]/gi, "")
    .toUpperCase()
    .trim();
}
