/**
 * FIREBASE PUBLIC BARREL EXPORT
 * CLO Media Printing Press
 *
 * ⚠️  IMPORTANT: Admin SDK is intentionally NOT exported here.
 *
 * The admin SDK must be imported directly from:
 *   import { adminDb, adminAuth } from "@/lib/firebase/admin"
 *
 * This barrel is safe to import in any client or server file.
 * It only re-exports client-safe utilities.
 *
 * Usage:
 *   import { firestoreDb, COLLECTIONS, docToData } from "@/lib/firebase"
 */

// ─────────────────────────────────────────────
// CLIENT SDK INSTANCES
// (Safe for client components)
// ─────────────────────────────────────────────

export {
  firebaseApp,
  firestoreDb,
  firebaseAuth,
} from "./client";

// ─────────────────────────────────────────────
// COLLECTION CONSTANTS
// (Safe everywhere — client and server)
// ─────────────────────────────────────────────

export {
  COLLECTIONS,
  DOCUMENT_IDS,
  CLOUDINARY_FOLDERS,
  type CollectionName,
  type DocumentId,
} from "./collections";

// ─────────────────────────────────────────────
// FIRESTORE HELPERS
// (Safe everywhere — pure utility functions)
// ─────────────────────────────────────────────

export {
  // Client-side converters
  docToData,
  docsToData,
  querySnapshotToData,

  // Timestamp utilities
  serverNow,
  dateToTimestamp,
  timestampToDate,

  // Admin converters (only called in server code)
  adminDocToData,
  adminDocsToData,

  // Write helpers
  stripUndefined,
  withCreateTimestamps,
  withUpdateTimestamp,
} from "./firestore.helpers";

// ─────────────────────────────────────────────
// ⚠️  NOT EXPORTED — ADMIN ONLY
// ─────────────────────────────────────────────
//
// adminApp, adminDb, adminAuth
//
// Import these directly in server-side files:
//   import { adminDb, adminAuth, adminApp } from "@/lib/firebase/admin"
//
// ─────────────────────────────────────────────