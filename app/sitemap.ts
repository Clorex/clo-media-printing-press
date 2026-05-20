import { MetadataRoute } from "next";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productsSnap = await adminDb
    .collection(COLLECTIONS.PRODUCTS)
    .where("isActive", "==", true)
    .get();

  const categoriesSnap = await adminDb
    .collection(COLLECTIONS.CATEGORIES)
    .where("isActive", "==", true)
    .get();

  const products = productsSnap.docs.map((doc) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop/${doc.data().slug}`,
    lastModified: new Date(),
  }));

  const categories = categoriesSnap.docs.map((doc) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop?category=${doc.data().slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      lastModified: new Date(),
    },
    ...products,
    ...categories,
  ];
}