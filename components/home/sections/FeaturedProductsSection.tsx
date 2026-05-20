import { Suspense } from "react";
import { ProductCard } from "@/components/shop/ProductCard";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SkeletonCard } from "@/components/ui/skeleton/SkeletonCard";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { adminDb } from "@/lib/firebase/admin";

async function FeaturedContent() {
  const snapshot = await adminDb
    .collection("products")
    .where("isFeatured", "==", true)
    .limit(4)
    .get();

  const products = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (!products.length) {
    return (
      <div className="text-center py-10 text-brand-gray-medium">
        No featured products available.
      </div>
    );
  }

  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function FeaturedProductsSection() {
  return (
    <Section>
      <Container>
        <SectionHeader
          title="Featured Products"
          subtitle="Our most requested printing solutions."
        />

        <Suspense
          fallback={
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          }
        >
          <FeaturedContent />
        </Suspense>

        <div className="text-center mt-10">
          <Link href="/shop">
            <Button variant="outline">
              View All Products
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}