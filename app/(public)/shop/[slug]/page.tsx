import { notFound } from "next/navigation";
import { ProductService } from "@/services/product/product.service";
import { calculateFinalPrice } from "@/lib/engine/pricing.engine";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) return notFound();

  const product: any =
    await ProductService.getProductBySlug(slug);

  if (!product) return notFound();

  const pricing = calculateFinalPrice({
    basePrice100: product.basePrice100,
    basePrice50: product.basePrice50,
    quantity: 100,
    hasDesignAddon: false,
    designAddonPrice: product.designAddonPrice,
  });

  return (
    <Section>
      <Container>
        <div className="grid md:grid-cols-2 gap-10">
          {/* ✅ Show actual product image */}
          <div className="bg-brand-gray-light aspect-square rounded-brand overflow-hidden">
            {product.images?.[0] && (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div>
            <h1 className="text-display-md mb-4">
              {product.name}
            </h1>

            <p className="mb-6">
              {product.description}
            </p>

            <p className="text-xl font-semibold mb-6">
              ₦{pricing.grandTotal.toLocaleString()}
            </p>

            <Button>Proceed to Checkout</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}