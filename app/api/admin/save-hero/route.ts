import { adminDb } from "@/lib/firebase/admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { images } = await req.json();

  await adminDb
    .collection("homepageHero")
    .doc("hero")
    .set({ images });

  return NextResponse.json({ success: true });
}
