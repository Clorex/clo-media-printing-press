/**
 * CLOUDINARY HELPERS
 * Folder strategy + validation utilities
 */

export const CLOUDINARY_FOLDERS = {
  PRODUCTS: "clomedia/products",
  CAMPAIGNS: "clomedia/campaigns",
  REVIEWS: "clomedia/reviews",
  INVOICES: "clomedia/invoices",

  ORDER_ROOT: (orderId: string) =>
    `clomedia/orders/${orderId}`,

  ORDER_PAYMENT: (orderId: string) =>
    `clomedia/orders/${orderId}/payment`,

  ORDER_DESIGN: (orderId: string) =>
    `clomedia/orders/${orderId}/design`,
} as const;

/**
 * Validates file MIME type
 */
export function validateFileType(
  mimetype: string,
  allowedTypes: string[]
): boolean {
  return allowedTypes.includes(mimetype);
}

/**
 * Validates file size in MB
 */
export function validateFileSize(
  sizeInBytes: number,
  maxSizeMB: number
): boolean {
  const maxBytes = maxSizeMB * 1024 * 1024;
  return sizeInBytes <= maxBytes;
}

/**
 * Extracts public ID from Cloudinary URL
 */
export function extractPublicId(url: string): string | null {
  try {
    const parts = url.split("/");
    const uploadIndex = parts.findIndex((p) => p === "upload");
    if (uploadIndex === -1) return null;

    const publicIdWithExtension = parts
      .slice(uploadIndex + 2)
      .join("/");

    return publicIdWithExtension.replace(/\.[^/.]+$/, "");
  } catch {
    return null;
  }
}