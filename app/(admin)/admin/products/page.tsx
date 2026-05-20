import { ProductService } from "@/services/product/product.service";
import { ProductTable } from "@/components/admin/products/ProductTable";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function ProductsPage() {
  const products =
    await ProductService.getAllProductsForAdmin();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Products
        </h2>

        <Link href="/admin/products/new">
          <Button>Create Product</Button>
        </Link>
      </div>

      <ProductTable products={products} />
    </div>
  );
}
