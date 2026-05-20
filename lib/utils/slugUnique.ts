import { adminDb } from "@/lib/firebase/admin";

export async function ensureUniqueSlug(
  collection: string,
  baseSlug: string
): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const snapshot = await adminDb
      .collection(collection)
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (snapshot.empty) break;

    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}