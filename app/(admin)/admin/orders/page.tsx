import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { OrdersTable } from "@/components/admin/orders/OrdersTable";

export default async function OrdersPage() {
  const snapshot = await adminDb
    .collection(COLLECTIONS.ORDERS)
    .orderBy("createdAt", "desc")
    .get();

  const orders = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return <OrdersTable orders={orders} />;
}