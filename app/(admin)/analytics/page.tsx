import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { AnalyticsCards } from "@/components/admin/analytics/AnalyticsCards";

export default async function AnalyticsPage() {
  const snapshot = await adminDb
    .collection(COLLECTIONS.ORDERS)
    .get();

  const orders = snapshot.docs.map((d) => d.data());

  const totalRevenue = orders.reduce(
    (sum: number, o: any) =>
      sum + (o.grandTotal || 0),
    0
  );

  const totalOrders = orders.length;
  const pending = orders.filter(
    (o: any) => o.paymentStatus === "PENDING"
  ).length;
  const delivered = orders.filter(
    (o: any) => o.orderStatus === "DELIVERED"
  ).length;

  return (
    <AnalyticsCards
      totalRevenue={totalRevenue}
      totalOrders={totalOrders}
      pending={pending}
      delivered={delivered}
    />
  );
}