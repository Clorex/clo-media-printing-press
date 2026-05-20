import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  basePrice100: number;
  images: string[];
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="flex flex-col justify-between">
      <div>
        <div className="aspect-square bg-brand-gray-light rounded-brand mb-4 overflow-hidden">
          {product.images?.[0] && (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <h3 className="font-semibold text-lg mb-2">
          {product.name}
        </h3>

        <p className="text-body-sm text-brand-gray-medium mb-4">
          {product.shortDescription}
        </p>

        <p className="font-semibold mb-4">
          From ₦{product.basePrice100.toLocaleString()}
        </p>
      </div>

      <Link href={`/shop/${product.slug}`}>
        <Button fullWidth>View Details</Button>
      </Link>
    </Card>
  );
}
