/**
 * FIREBASE CONFIGURATION DOCUMENTATION
 * CLO Media Printing Press
 *
 * This file is documentation + type definitions only.
 * It does NOT initialize Firebase — see:
 *   lib/firebase/client.ts  → client initialization
 *   lib/firebase/admin.ts   → admin initialization
 */

// ─────────────────────────────────────────────
// SETUP CHECKLIST
// ─────────────────────────────────────────────

/**
 * Firebase Project Setup Checklist
 * ==================================
 *
 * STEP 1 — Create Firebase Project
 *   1. Go to https://console.firebase.google.com
 *   2. Click "Create a project"
 *   3. Name: "clo-media-printing-press"
 *   4. Disable Google Analytics (not needed)
 *   5. Click "Create project"
 *
 * STEP 2 — Enable Firestore
 *   1. Left sidebar → Build → Firestore Database
 *   2. Click "Create database"
 *   3. Select "Start in production mode"
 *   4. Choose region: nam5 (US Central) or europe-west (closer to Nigeria: asia-south1)
 *   5. Click "Done"
 *
 * STEP 3 — Enable Authentication
 *   1. Left sidebar → Build → Authentication
 *   2. Click "Get started"
 *   3. Sign-in providers → Email/Password → Enable
 *   4. Save
 *   5. Create admin user manually:
 *      Authentication → Users → Add user
 *      Email: your admin email
 *      Password: strong password
 *
 * STEP 4 — Get Client Config
 *   1. Project Settings (gear icon) → General
 *   2. Scroll to "Your apps" → Click web icon (</>)
 *   3. App nickname: "clo-media-web"
 *   4. Click "Register app"
 *   5. Copy the firebaseConfig values to .env.local
 *
 * STEP 5 — Get Admin Service Account
 *   1. Project Settings → Service accounts
 *   2. Click "Generate new private key"
 *   3. Save the downloaded JSON file SECURELY
 *   4. Copy values to .env.local:
 *      - project_id → FIREBASE_ADMIN_PROJECT_ID
 *      - client_email → FIREBASE_ADMIN_CLIENT_EMAIL
 *      - private_key → FIREBASE_ADMIN_PRIVATE_KEY
 *   5. DELETE the JSON file after copying
 *
 * STEP 6 — Deploy Firestore Security Rules
 *   1. Firestore → Rules tab
 *   2. Replace existing rules with FIRESTORE_SECURITY_RULES below
 *   3. Click "Publish"
 *
 * STEP 7 — Seed Initial Data
 *   Create these documents in Firestore console:
 *   See SECTION 13 in BATCH F-02 documentation.
 */

// ─────────────────────────────────────────────
// CONFIG TYPE DEFINITIONS
// ─────────────────────────────────────────────

/**
 * Shape of Firebase client configuration.
 * All values come from Project Settings → General → SDK setup.
 */
export interface FirebaseClientConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

/**
 * Shape of Firebase Admin service account credentials.
 * Values come from the downloaded service account JSON file.
 */
export interface FirebaseAdminConfig {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

// ─────────────────────────────────────────────
// PRIVATE KEY FORMAT HELPER
// ─────────────────────────────────────────────

/**
 * How to correctly format FIREBASE_ADMIN_PRIVATE_KEY in .env.local:
 *
 * ✅ CORRECT — wrap in double quotes, use \n for newlines:
 *   FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n"
 *
 * ❌ WRONG — without quotes (shell will break on spaces):
 *   FIREBASE_ADMIN_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
 *
 * ❌ WRONG — using actual newlines in .env.local:
 *   FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
 *   MIIEv...
 *   -----END PRIVATE KEY-----"
 *
 * The code in lib/firebase/admin.ts automatically converts
 * literal \n → actual newline characters.
 */

// ─────────────────────────────────────────────
// FIRESTORE SECURITY RULES
// ─────────────────────────────────────────────

/**
 * Production Firestore Security Rules for CLO Media.
 *
 * Deploy these at:
 * Firebase Console → Firestore Database → Rules
 *
 * Rules strategy:
 * - Public READ for products, categories, campaigns, settings, homepage
 * - Restricted WRITE — all writes go through Admin SDK (API routes)
 * - Orders: public create (checkout), restricted update (admin only)
 * - Reviews: create if complete fields present, read if approved only
 * - Admin/Analytics: fully locked — Admin SDK only
 */
export const FIRESTORE_SECURITY_RULES = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ─────────────────────────────────────
    // HELPER FUNCTIONS
    // ─────────────────────────────────────

    function isValidPhone(phone) {
      return phone is string && phone.size() >= 10;
    }

    function isValidRating(rating) {
      return rating is int && rating >= 1 && rating <= 5;
    }

    function hasRequiredOrderFields(data) {
      return data.keys().hasAll([
        'customerName',
        'customerPhone',
        'trackingId',
        'orderStatus',
        'paymentStatus'
      ]);
    }

    function hasRequiredReviewFields(data) {
      return data.keys().hasAll([
        'orderId',
        'customerName',
        'rating',
        'reviewText'
      ]);
    }

    // ─────────────────────────────────────
    // PRODUCTS (Public Read)
    // ─────────────────────────────────────
    match /products/{productId} {
      allow read: if resource.data.isActive == true;
      allow write: if false;
    }

    // ─────────────────────────────────────
    // CATEGORIES (Public Read)
    // ─────────────────────────────────────
    match /categories/{categoryId} {
      allow read: if resource.data.isActive == true;
      allow write: if false;
    }

    // ─────────────────────────────────────
    // CAMPAIGNS (Public Read — active only)
    // ─────────────────────────────────────
    match /campaigns/{campaignId} {
      allow read: if resource.data.isActive == true;
      allow write: if false;
    }

    // ─────────────────────────────────────
    // SETTINGS (Public Read — single doc)
    // ─────────────────────────────────────
    match /settings/{docId} {
      allow read: if true;
      allow write: if false;
    }

    // ─────────────────────────────────────
    // HOMEPAGE CONTENT (Public Read)
    // ─────────────────────────────────────
    match /homepageContent/{docId} {
      allow read: if true;
      allow write: if false;
    }

    // ─────────────────────────────────────
    // ORDERS
    // - Anyone can read their own order (by tracking ID or order ID)
    // - Anyone can create (checkout flow)
    // - Updates only through Admin SDK
    // ─────────────────────────────────────
    match /orders/{orderId} {
      allow read: if true;
      allow create: if hasRequiredOrderFields(request.resource.data)
        && isValidPhone(request.resource.data.customerPhone);
      allow update, delete: if false;
    }

    // ─────────────────────────────────────
    // REVIEWS
    // - Read only approved reviews
    // - Create if required fields present
    // - Updates/deletes through Admin SDK only
    // ─────────────────────────────────────
    match /reviews/{reviewId} {
      allow read: if resource.data.isApproved == true;
      allow create: if hasRequiredReviewFields(request.resource.data)
        && isValidRating(request.resource.data.rating);
      allow update, delete: if false;
    }

    // ─────────────────────────────────────
    // ANALYTICS — Fully restricted
    // ─────────────────────────────────────
    match /analyticsSnapshots/{docId} {
      allow read, write: if false;
    }

    // ─────────────────────────────────────
    // ADMINS — Fully restricted
    // ─────────────────────────────────────
    match /admins/{adminId} {
      allow read, write: if false;
    }
  }
}
`;

// ─────────────────────────────────────────────
// RECOMMENDED FIRESTORE INDEXES
// ─────────────────────────────────────────────

/**
 * Firestore Composite Indexes needed for queries.
 *
 * Create these at:
 * Firebase Console → Firestore → Indexes → Composite → Add index
 *
 * OR deploy via firebase CLI using firestore.indexes.json
 */
export const FIRESTORE_INDEXES = [
  {
    collection: "orders",
    fields: [
      { field: "paymentStatus", order: "ASCENDING" },
      { field: "createdAt", order: "DESCENDING" },
    ],
    description: "Admin orders list — filter by payment status, newest first",
  },
  {
    collection: "orders",
    fields: [
      { field: "orderStatus", order: "ASCENDING" },
      { field: "createdAt", order: "DESCENDING" },
    ],
    description: "Admin orders list — filter by order status, newest first",
  },
  {
    collection: "orders",
    fields: [
      { field: "customerPhone", order: "ASCENDING" },
      { field: "createdAt", order: "DESCENDING" },
    ],
    description: "Orders by customer phone — for customer order history",
  },
  {
    collection: "products",
    fields: [
      { field: "categoryId", order: "ASCENDING" },
      { field: "isFeatured", order: "DESCENDING" },
    ],
    description: "Products by category — featured first",
  },
  {
    collection: "campaigns",
    fields: [
      { field: "isActive", order: "ASCENDING" },
      { field: "endTime", order: "ASCENDING" },
    ],
    description: "Active campaigns — soonest expiring first",
  },
  {
    collection: "reviews",
    fields: [
      { field: "isApproved", order: "ASCENDING" },
      { field: "createdAt", order: "DESCENDING" },
    ],
    description: "Approved reviews — newest first",
  },
] as const;