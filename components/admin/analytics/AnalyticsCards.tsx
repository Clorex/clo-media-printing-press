import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils/formatCurrency";

export function AnalyticsCards({
  totalRevenue,
  totalOrders,
  pending,
  delivered,
}: any) {
  return (
    <div className="grid gap-6 md:grid-cols-4">
      <Card>
        <h3>Total Revenue</h3>
        <p className="text-2xl font-bold">
          {formatCurrency(totalRevenue)}
        </p>
      </Card>

      <Card>
        <h3>Total Orders</h3>
        <p className="text-2xl font-bold">
          {totalOrders}
        </p>
      </Card>

      <Card>
        <h3>Pending</h3>
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
