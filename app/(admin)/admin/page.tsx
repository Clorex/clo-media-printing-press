import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { Card } from "@/components/ui/Card";

export default async function AdminDashboard() {
  const snapshot = await adminDb
    .collection(COLLECTIONS.ORDERS)
    .get();

  const orders = snapshot.docs.map((d) => d.data());

  const totalOrders = orders.length;
  const pending = orders.filter(
    (o) => o.paymentStatus === "PENDING"
  ).length;
  const delivered = orders.filter(
    (o) => o.orderStatus === "DELIVERED"
  ).length;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <h3>Total Orders</h3>
        <p className="text-2xl font-bold">
          {totalOrders}
        </p>
      </Card>

      <Card>
        <h3>Pending Confirmations</h3>
        <p className="text-2xl font-bold">
          {pending}
        </p>
      </Card>

      <Card>
        <h3>Delivered</h3>
        <p className="text-2xl font-bold">
          {delivered}
        </p>
      </Card>
    </div>
  );
}