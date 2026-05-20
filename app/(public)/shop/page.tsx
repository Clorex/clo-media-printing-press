import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ShopContent } from "@/components/shop/ShopContent";

export default async function ShopPage() {
  const [productsSnap, categoriesSnap] = await Promise.all([
    adminDb
      .collection(COLLECTIONS.PRODUCTS)
      .where("isActive", "==", true)
      .where("isDeleted", "==", false)
      .get(),
    adminDb
      .collection(COLLECTIONS.CATEGORIES)
      .where("isActive", "==", true)
      .get(),
  ]);

  // ✅ Serialize products safely
  const products = productsSnap.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name,
      slug: data.slug,
      shortDescription: data.shortDescription ?? "",
      basePrice100: data.basePrice100 ?? 0,
      images: data.images ?? [],
      isActive: data.isActive ?? true,
      isFeatured: data.isFeatured ?? false,

      // ✅ Convert Firestore timestamps
      createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
      updatedAt: data.updatedAt?.toDate?.().toISOString() ?? null,
    };
  });

  // ✅ Serialize categories safely
  const categories = categoriesSnap.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name,
      slug: data.slug,
      isActive: data.isActive ?? true,

      createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
      updatedAt: data.updatedAt?.toDate?.().toISOString() ?? null,
    };
  });

  return (
    <Section>
      <Container>
        <SectionHeader
          title="Our Products"
          subtitle="Browse our premium printing & branding solutions."
        />

        <ShopContent
          initialProducts={products}
          categories={categories}
        />
      </Container>
    </Section>
  );
}