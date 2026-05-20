import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { OrderDetail } from "@/components/admin/orders/OrderDetail";

export default async function OrderDetailPage({
  params,
}: any) {
  const doc = await adminDb
    .collection(COLLECTIONS.ORDERS)
    .doc(params.id)
    .get();

  if (!doc.exists) {
    return <div>Order not found</div>;
  }

  return (
    <OrderDetail
      order={{ id: doc.id, ...doc.data() }}
    />
  );
}