/**
 * CLOUDINARY DELETE UTILITY
 * Server-side only
 */

import cloudinary from "./config";

export async function deleteFromCloudinary(
  publicId: string,
  resourceType: "image" | "raw" | "video" | "auto" = "image"
) {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    return result;
  } catch (error) {
    console.error("[CLO Media] Cloudinary delete error:", error);
    throw error;
  }
}