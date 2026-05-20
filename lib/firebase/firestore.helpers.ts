/**
 * FIRESTORE HELPER UTILITIES
 * CLO Media Printing Press
 *
 * Reusable functions for converting Firestore documents
 * to typed TypeScript objects, handling Timestamps,
 * and normalizing data across client and server.
 *
 * Safe to import on both client and server.
 * Functions are pure — no side effects.
 */

import {
  type DocumentData,
  type DocumentSnapshot,
  type QueryDocumentSnapshot,
  type QuerySnapshot,
  Timestamp,
  serverTimestamp as firestoreServerTimestamp,
  type FieldValue,
} from "firebase/firestore";

// ─────────────────────────────────────────────
// TYPE: FIRESTORE RAW DATA
// ─────────────────────────────────────────────

/**
 * Represents a raw Firestore document data object.
 * Used internally before conversion to typed models.
 */
type RawFirestoreData = DocumentData & {
  createdAt?: Timestamp | Date | null;
  updatedAt?: Timestamp | Date | null;
  startTime?: Timestamp | Date | null;
  endTime?: Timestamp | Date | null;
  estimatedDelivery?: Timestamp | Date | null;
};

// ─────────────────────────────────────────────
// TIMESTAMP CONVERSION
// ─────────────────────────────────────────────

/**
 * Converts a Firestore Timestamp, JS Date, or null/undefined
 * to a JS Date or undefined.
 *
 * Used internally when normalizing document fields.
 */
function convertTimestamp(
  value: Timestamp | Date | null | undefined
): Date | undefined {
  if (value === null || value === undefined) return undefined;
  if (value instanceof Timestamp) return value.toDate();
  if (value instanceof Date) return value;
  return undefined;
}

/**
 * Normalizes all known timestamp fields in a Firestore data object.
 * Returns a new object with all Timestamps converted to JS Dates.
 */
function normalizeTimestamps(data: RawFirestoreData): Record<string, unknown> {
  const TIMESTAMP_FIELDS = [
    "createdAt",
    "updatedAt",
    "startTime",
    "endTime",
    "estimatedDelivery",
  ] as const;

  const normalized: Record<string, unknown> = { ...data };

  for (const field of TIMESTAMP_FIELDS) {
    if (field in normalized) {
      const converted = convertTimestamp(
        normalized[field] as Timestamp | Date | null | undefined
      );
      if (converted !== undefined) {
        normalized[field] = converted;
      }
    }
  }

  return normalized;
}

// ─────────────────────────────────────────────
// CLIENT-SIDE DOCUMENT CONVERTERS
// ─────────────────────────────────────────────

/**
 * Converts a single Firestore DocumentSnapshot to a typed object.
 *
 * - Returns null if the document does not exist
 * - Automatically includes `id` from doc.id
 * - Converts all Timestamp fields to JS Date
 *
 * Usage:
 *   const product = docToData<Product>(snapshot);
 */
export function docToData<T>(
  doc:
    | DocumentSnapshot<DocumentData>
    | QueryDocumentSnapshot<DocumentData>
): T | null {
  if (!doc.exists()) return null;

  const rawData = doc.data() as RawFirestoreData;
  const normalized = normalizeTimestamps(rawData);

  return {
    ...normalized,
    id: doc.id,
  } as T;
}

/**
 * Converts an array of Firestore QueryDocumentSnapshots to typed objects.
 *
 * - Skips any null results (non-existent docs)
 * - Converts all Timestamp fields to JS Date
 *
 * Usage:
 *   const products = docsToData<Product>(snapshot.docs);
 */
export function docsToData<T>(
  docs: QueryDocumentSnapshot<DocumentData>[]
): T[] {
  return docs
    .map((doc) => docToData<T>(doc))
    .filter((item): item is T => item !== null);
}

/**
 * Converts a Firestore QuerySnapshot to a typed array.
 *
 * Usage:
 *   const products = querySnapshotToData<Product>(querySnapshot);
 */
export function querySnapshotToData<T>(snapshot: QuerySnapshot<DocumentData>): T[] {
  return docsToData<T>(snapshot.docs);
}

// ─────────────────────────────────────────────
// SERVER TIMESTAMP
// ─────────────────────────────────────────────

/**
 * Returns a Firestore server-generated timestamp.
 * Use this for createdAt and updatedAt fields on writes.
 *
 * Note: This is the client-side version.
 * For admin writes, use adminDb.FieldValue.serverTimestamp().
 *
 * Usage:
 *   await setDoc(ref, { createdAt: serverNow() });
 */
export function serverNow(): FieldValue {
  return firestoreServerTimestamp();
}

/**
 * Converts a JS Date to a Firestore Timestamp.
 * Use when you need to store a specific date (e.g., estimatedDelivery).
 *
 * Usage:
 *   dateToTimestamp(new Date("2025-07-01"))
 */
export function dateToTimestamp(date: Date): Timestamp {
  return Timestamp.fromDate(date);
}

/**
 * Converts a Firestore Timestamp to a JS Date.
 * Safe to call with a Date (returns as-is) for flexibility.
 *
 * Usage:
 *   const jsDate = timestampToDate(firestoreTimestamp);
 */
export function timestampToDate(value: Timestamp | Date): Date {
  if (value instanceof Timestamp) return value.toDate();
  return value;
}

// ─────────────────────────────────────────────
// ADMIN (SERVER-SIDE) DOCUMENT CONVERTERS
// ─────────────────────────────────────────────

/**
 * Converts an Admin SDK DocumentSnapshot to a typed object.
 *
 * ⚠️ For use in API routes and server-side code only.
 * Uses FirebaseFirestore namespace from firebase-admin.
 *
 * - Returns null if document does not exist
 * - Automatically includes `id` from doc.id
 * - Converts all admin Timestamp fields to JS Date
 *
 * Usage (in API route):
 *   const order = adminDocToData<Order>(docSnapshot);
 */
export function adminDocToData<T>(
  doc: FirebaseFirestore.DocumentSnapshot
): T | null {
  if (!doc.exists) return null;

  const rawData = doc.data();
  if (!rawData) return null;

  // Normalize timestamps using admin Timestamp type
  const normalized: Record<string, unknown> = { ...rawData };
  const TIMESTAMP_FIELDS = [
    "createdAt",
    "updatedAt",
    "startTime",
    "endTime",
    "estimatedDelivery",
  ] as const;

  for (const field of TIMESTAMP_FIELDS) {
    const value = normalized[field];
    if (value && typeof (value as FirebaseFirestore.Timestamp).toDate === "function") {
      normalized[field] = (value as FirebaseFirestore.Timestamp).toDate();
    }
  }

  return {
    ...normalized,
    id: doc.id,
  } as T;
}

/**
 * Converts an Admin SDK QuerySnapshot to a typed array.
 *
 * ⚠️ For use in API routes and server-side code only.
 *
 * Usage (in API route):
 *   const orders = adminDocsToData<Order>(querySnapshot);
 */
export function adminDocsToData<T>(
  snapshot: FirebaseFirestore.QuerySnapshot
): T[] {
  return snapshot.docs
    .map((doc) => adminDocToData<T>(doc))
    .filter((item): item is T => item !== null);
}

// ─────────────────────────────────────────────
// FIRESTORE WRITE HELPERS
// ─────────────────────────────────────────────

/**
 * Removes undefined fields from an object before writing to Firestore.
 * Firestore rejects documents with `undefined` values — use null instead,
 * or strip the field entirely with this utility.
 *
 * Usage:
 *   await setDoc(ref, stripUndefined(payload));
 */
export function stripUndefined<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  ) as Partial<T>;
}

/**
 * Creates a standard Firestore create payload with timestamps.
 * Merges your data with automatic createdAt and updatedAt fields.
 *
 * Usage:
 *   await setDoc(ref, withCreateTimestamps({ name: "test" }));
 */
export function withCreateTimestamps<T extends Record<string, unknown>>(
  data: T
): T & { createdAt: FieldValue; updatedAt: FieldValue } {
  return {
    ...data,
    createdAt: firestoreServerTimestamp(),
    updatedAt: firestoreServerTimestamp(),
  };
}

/**
 * Creates a standard Firestore update payload with updatedAt timestamp.
 * Merges your data with an automatic updatedAt field.
 *
 * Usage:
 *   await updateDoc(ref, withUpdateTimestamp({ status: "DELIVERED" }));
 */
export function withUpdateTimestamp<T extends Record<string, unknown>>(
  data: T
): T & { updatedAt: FieldValue } {
  return {
    ...data,
    updatedAt: firestoreServerTimestamp(),
  };
}