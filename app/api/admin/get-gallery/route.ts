import { adminDb } from "@/lib/firebase/admin";
import { NextResponse } from "next/server";

export async function GET() {
  const doc = await adminDb
    .collection("homepageGallery")
    .doc("gallery")
    .get();

  return NextResponse.json({
    images: doc.data()?.images || [],
  });
}
