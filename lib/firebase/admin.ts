import {
  initializeApp,
  getApps,
  cert,
  type App,
  type ServiceAccount,
} from "firebase-admin/app";

import {
  getFirestore,
  type Firestore as AdminFirestore,
} from "firebase-admin/firestore";

import { getAuth, type Auth as AdminAuth } from "firebase-admin/auth";

// Prevent client-side usage
if (typeof window !== "undefined") {
  throw new Error(
    "Firebase Admin SDK cannot be used in the browser."
  );
}

const REQUIRED_ADMIN_ENV_VARS = [
  "FIREBASE_ADMIN_PROJECT_ID",
  "FIREBASE_ADMIN_CLIENT_EMAIL",
  "FIREBASE_ADMIN_PRIVATE_KEY",
] as const;

function validateEnv(): void {
  const missing = REQUIRED_ADMIN_ENV_VARS.filter(
    (key) => !process.env[key] || process.env[key]?.trim() === ""
  );

  if (missing.length > 0) {
    throw new Error(
      "Missing Firebase Admin environment variables:\n" +
        missing.map((key) => ` - ${key}`).join("\n")
    );
  }
}

function buildServiceAccount(): ServiceAccount {
  return {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY!.replace(
      /\\n/g,
      "\n"
    ),
  };
}

function getAdminApp(): App {
  const existingApps = getApps();
  if (existingApps.length > 0) {
    return existingApps[0];
  }

  validateEnv();

  return initializeApp({
    credential: cert(buildServiceAccount()),
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID!,
  });
}

const adminApp = getAdminApp();
const adminDb: AdminFirestore = getFirestore(adminApp);
const adminAuth: AdminAuth = getAuth(adminApp);

export { adminApp, adminDb, adminAuth };
export default adminApp;