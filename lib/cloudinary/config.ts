/**
 * CLOUDINARY SERVER CONFIGURATION
 * CLO Media Printing Press
 *
 * ⚠️ SERVER-SIDE ONLY
 * Never import in client components.
 */

import { v2 as cloudinary } from "cloudinary";

if (typeof window !== "undefined") {
  throw new Error(
    "[CLO Media] SECURITY VIOLATION: Cloudinary config imported on client side."
  );
}

const REQUIRED_ENV_VARS = [
  "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
] as const;

function validateEnvironment(): void {
  const missing = REQUIRED_ENV_VARS.filter(
    (key) => !process.env[key] || process.env[key]?.trim() === ""
  );

  if (missing.length > 0) {
    throw new Error(
      [
        "[CLO Media] Cloudinary initialization failed.",
        "Missing environment variables:",
        ...missing.map((v) => `  • ${v}`),
        "",
        "Check your .env.local file.",
      ].join("\n")
    );
  }
}

validateEnvironment();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export default cloudinary;