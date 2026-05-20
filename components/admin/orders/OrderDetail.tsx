"use client";

import { StatusUpdater } from "./StatusUpdater";
import { Button } from "@/components/ui/Button";

export function OrderDetail({ order }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        Order Details
      </h2>

      <div className="bg-white shadow-brand p-6 rounded-brand space-y-2">
        <p>Customer: {order.customerName}</p>
        <p>Phone: {order.customerPhone}</p>
        <p>Product: {order.item.productName}</p>
        <p>Quantity: {order.item.quantity}</p>
        <p>Total: ₦{order.grandTotal}</p>
        <p>Status: {order.orderStatus}</p>
      </div>

      <StatusUpdater
        orderId={order.id}
        currentStatus={order.orderStatus}
      />

      {order.paymentStatus === "PENDING" && (
        <Button
          onClick={async () => {
            await fetch(
              `/api/admin/orders/${order.id}/confirm`,
              { method: "POST" }
            );
            location.reload();
          }}
        >
          Confirm Payment
        </Button>
      )}
    </div>
  );
}
