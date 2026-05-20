/**
 * FIREBASE CONNECTION TEST UTILITY
 * CLO Media Printing Press
 *
 * Manual connection verification script.
 * Run this to confirm Firebase is correctly configured.
 *
 * ⚠️  DO NOT import this in production code.
 * ⚠️  DO NOT use in components or API routes.
 *
 * Usage (in development only):
 *   Uncomment and call testFirebaseConnection() from a
 *   temporary API route, then remove it after testing.
 *
 * Or use via a test script — see instructions below.
 *
 * ─────────────────────────────────────────────
 * HOW TO TEST YOUR CONNECTION:
 * ─────────────────────────────────────────────
 *
 * Option A — Via temporary API route:
 *   1. Create: app/api/test-firebase/route.ts
 *   2. Import and call testFirebaseConnection()
 *   3. Visit: http://localhost:3000/api/test-firebase
 *   4. Check console output
 *   5. DELETE the test route when done
 *
 * Option B — Check browser console:
 *   1. Run: npm run dev
 *   2. Open http://localhost:3000
 *   3. Open DevTools → Console
 *   4. Look for Firebase errors or success messages
 *
 * Option C — Check Network tab:
 *   1. Run: npm run dev
 *   2. Open DevTools → Network
 *   3. Filter by "firestore"
 *   4. Successful requests = connected
 * ─────────────────────────────────────────────
 */

import { collection, getDocs, limit, query, doc, getDoc } from "firebase/firestore";
import { firestoreDb } from "./client";
import { COLLECTIONS, DOCUMENT_IDS } from "./collections";

// ─────────────────────────────────────────────
// CONNECTION TEST RESULT TYPE
// ─────────────────────────────────────────────

export interface ConnectionTestResult {
  success: boolean;
  clientConnected: boolean;
  settingsDocExists: boolean;
  homepageDocExists: boolean;
  errors: string[];
  timestamp: string;
}

// ─────────────────────────────────────────────
// CLIENT-SIDE CONNECTION TEST
// ─────────────────────────────────────────────

/**
 * Tests Firebase client SDK connectivity by:
 * 1. Reading the settings singleton document
 * 2. Reading the homepage content document
 * 3. Reading up to 1 product (to verify collection access)
 *
 * Returns a structured result object.
 * Never throws — catches all errors and includes them in result.
 */
export async function testFirebaseConnection(): Promise<ConnectionTestResult> {
  const errors: string[] = [];
  let clientConnected = false;
  let settingsDocExists = false;
  let homepageDocExists = false;

  console.log("\n[CLO Media] Starting Firebase connection test...\n");

  // Test 1: Settings document
  try {
    const settingsRef = doc(
      firestoreDb,
      COLLECTIONS.SETTINGS,
      DOCUMENT_IDS.SITE_SETTINGS
    );
    const settingsSnap = await getDoc(settingsRef);
    clientConnected = true;
    settingsDocExists = settingsSnap.exists();

    if (settingsDocExists) {
      console.log("✅ Settings document: FOUND");
      console.log("   Data:", settingsSnap.data());
    } else {
      console.warn("⚠️  Settings document: NOT FOUND");
      console.warn(
        "   Create it at: Firestore → settings/siteSettings"
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    errors.push(`Settings read failed: ${message}`);
    console.error("❌ Settings document read FAILED:", error);
  }

  // Test 2: Homepage content document
  try {
    const homepageRef = doc(
      firestoreDb,
      COLLECTIONS.HOMEPAGE_CONTENT,
      DOCUMENT_IDS.HOMEPAGE_CONTENT
    );
    const homepageSnap = await getDoc(homepageRef);
    homepageDocExists = homepageSnap.exists();

    if (homepageDocExists) {
      console.log("✅ Homepage content document: FOUND");
    } else {
      console.warn("⚠️  Homepage content document: NOT FOUND");
      console.warn(
        "   Create it at: Firestore → homepageContent/main"
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    errors.push(`Homepage content read failed: ${message}`);
    console.error("❌ Homepage content document read FAILED:", error);
  }

  // Test 3: Products collection access
  try {
    const productsQuery = query(
      collection(firestoreDb, COLLECTIONS.PRODUCTS),
      limit(1)
    );
    const productsSnap = await getDocs(productsQuery);
    console.log(
      `✅ Products collection: ACCESSIBLE (${productsSnap.size} doc(s) found)`
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    errors.push(`Products collection read failed: ${message}`);
    console.error("❌ Products collection read FAILED:", error);
  }

  const success = clientConnected && errors.length === 0;
  const result: ConnectionTestResult = {
    success,
    clientConnected,
    settingsDocExists,
    homepageDocExists,
    errors,
    timestamp: new Date().toISOString(),
  };

  if (success) {
    console.log(
      "\n✅✅✅ Firebase connection test PASSED — CLO Media is ready! ✅✅✅\n"
    );
  } else {
    console.error(
      "\n❌❌❌ Firebase connection test FAILED. See errors above. ❌❌❌\n"
    );
    console.error("Errors:", errors);
  }

  return result;
}

// ─────────────────────────────────────────────
// FIRESTORE DATA SEED INSTRUCTIONS
// ─────────────────────────────────────────────

/**
 * Initial Firestore Data to Create Manually
 * ==========================================
 *
 * After Firebase is connected, create these documents
 * in the Firebase Console:
 *
 * ── Collection: settings ──
 * Document ID: siteSettings
 * Fields:
 *   defaultDeliveryDays: 7             (number)
 *   bankName: "Opay"                   (string)
 *   bankAccount: "8059086041"          (string)
 *   bankAccountName: "Itabita Miracle Okiemute" (string)
 *   whatsappNumber: "2348059086041"    (string)
 *   address: "Opposite Borrow Pit Junction, NDDC Road, Amukpe, Sapele, Delta State" (string)
 *   designAddonPrice: 5000             (number)
 *   isMaintenanceMode: false           (boolean)
 *   updatedAt: (use Timestamp field — current time)
 *
 * ── Collection: homepageContent ──
 * Document ID: main
 * Fields:
 *   heroHeadline: "We Help Your Business Grow"  (string)
 *   heroSubheadline: "Premium printing, branding, packaging & design solutions for businesses across Nigeria." (string)
 *   trustPoints: (array of strings)
 *     - "Fast Nationwide Delivery"
 *     - "Premium Quality Printing"
 *     - "Professional Branding"
 *     - "Reliable Customer Service"
 *   featuredProductIds: (array — leave empty for now)
 *   updatedAt: (use Timestamp field — current time)
 */