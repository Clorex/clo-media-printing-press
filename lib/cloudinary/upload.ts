/**
 * CLOUDINARY UPLOAD UTILITY
 * Server-side only
 */

import cloudinary from "./config";
import streamifier from "streamifier";

interface UploadOptions {
  folder: string;
  fileBuffer: Buffer;
  fileName: string;
  resourceType?: "image" | "raw" | "video" | "auto";
}

export async function uploadToCloudinary({
  folder,
  fileBuffer,
  fileName,
  resourceType = "auto",
}: UploadOptions) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: fileName,
        resource_type: resourceType,
        overwrite: true,
      },
      (error, result) => {
        if (error) {
          console.error("[CLO Media] Cloudinary upload error:", error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
}