/**
 * FIREBASE CLIENT SDK INITIALIZATION
 * CLO Media Printing Press
 *
 * ⚠️  CLIENT-SIDE ONLY
 * Safe to import in React components and client-side hooks.
 * Uses singleton pattern — Firebase is only initialized once.
 *
 * Exports:
 *   firebaseApp   → the initialized FirebaseApp instance
 *   firestoreDb   → Firestore database instance
 *   firebaseAuth  → Firebase Auth instance (admin login only)
 */

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

// ─────────────────────────────────────────────
// ENVIRONMENT VARIABLE KEYS
// ─────────────────────────────────────────────

const REQUIRED_ENV_VARS = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
] as const;

// ─────────────────────────────────────────────
// ENVIRONMENT VALIDATION
// ─────────────────────────────────────────────

/**
 * Validates all required Firebase client environment variables.
 * Throws a descriptive error listing every missing variable.
 * Called once during initialization — never silently fails.
 */
function validateClientEnvironment(): void {
  const missing = REQUIRED_ENV_VARS.filter(
    (key) => !process.env[key] || process.env[key]?.trim() === ""
  );

  if (missing.length > 0) {
    throw new Error(
      [
        "[CLO Media] Firebase client initialization failed.",
        "The following environment variables are missing or empty:",
        ...missing.map((key) => `  • ${key}`),
        "",
        "Steps to fix:",
        "  1. Open your .env.local file",
        "  2. Fill in the missing values from your Firebase project settings",
        "  3. Restart your Next.js development server",
        "",
        "Firebase Console → Project Settings → General → Your apps → SDK setup",
      ].join("\n")
    );
  }
}

// ─────────────────────────────────────────────
// CONFIG BUILDER
// ─────────────────────────────────────────────

/**
 * Builds the Firebase client configuration object from environment variables.
 * Only called after validateClientEnvironment() confirms all vars exist.
 */
function buildFirebaseConfig() {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  } as const;
}

// ─────────────────────────────────────────────
// SINGLETON INITIALIZATION
// ─────────────────────────────────────────────

/**
 * Initializes the Firebase app using the singleton pattern.
 *
 * - If Firebase has already been initialized (e.g., hot reload in dev),
 *   returns the existing app instance via getApp().
 * - If not yet initialized, validates environment and creates a new app.
 *
 * This prevents the "Firebase: Firebase App named '[DEFAULT]' already exists"
 * error that occurs during Next.js hot module replacement.
 */
function getFirebaseApp(): FirebaseApp {
  // Return existing instance if already initialized
  if (getApps().length > 0) {
    return getApp();
  }

  // Validate environment before first initialization
  validateClientEnvironment();

  // Initialize with validated config
  const config = buildFirebaseConfig();
  return initializeApp(config);
}

// ─────────────────────────────────────────────
// EXPORTED INSTANCES
// ─────────────────────────────────────────────

/**
 * Initialize once and export stable references.
 *
 * These are module-level singletons — safe to import anywhere
 * in client-side code without risk of re-initialization.
 */
let firebaseApp: FirebaseApp;
let firestoreDb: Firestore;
let firebaseAuth: Auth;

try {
  firebaseApp = getFirebaseApp();
  firestoreDb = getFirestore(firebaseApp);
  firebaseAuth = getAuth(firebaseApp);
} catch (error) {
  // Re-throw with context so the error is visible in dev
  console.error(
    "[CLO Media] Critical: Firebase client SDK failed to initialize.\n",
    error
  );
  throw error;
}

export { firebaseApp, firestoreDb, firebaseAuth };
export default firebaseApp;