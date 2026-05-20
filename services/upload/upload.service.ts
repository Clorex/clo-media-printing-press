/**
 * UPLOAD VALIDATION SERVICE
 * CLO Media Printing Press
 */

import {
  validateFileSize,
  validateFileType,
} from "@/lib/cloudinary/helpers";

export interface UploadValidationOptions {
  allowedTypes: string[];
  maxSizeMB: number;
}

export function validateUpload(
  file: {
    mimetype: string;
    size: number;
  },
  options: UploadValidationOptions
): true {
  const { allowedTypes, maxSizeMB } = options;

  if (!validateFileType(file.mimetype, allowedTypes)) {
    throw new Error(
      "Invalid file type. Please upload a supported format."
    );
  }

  if (!validateFileSize(file.size, maxSizeMB)) {
    throw new Error(
      `File too large. Maximum allowed size is ${maxSizeMB}MB.`
    );
  }

  return true;
}