import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { slugify } from "@/lib/utils/slugify";

const categories = [
  "Graphic Design",
  "Printing",
  "Packaging",
  "Frames",
  "Business Support",
];

async function seedCategories() {
  for (const name of categories) {
    const slug = slugify(name);

    const existing = await adminDb
      .collection(COLLECTIONS.CATEGORIES)
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (!existing.empty) continue;

    await adminDb.collection(COLLECTIONS.CATEGORIES).add({
      name,
      slug,
      description: `${name} services`,
      icon: "Package",
      displayOrder: 1,
      isActive: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  console.log("✅ Categories seeded safely.");
}

seedCategories();