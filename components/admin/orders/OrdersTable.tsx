"use client";

import Link from "next/link";

export function OrdersTable({ orders }: any) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead>
          <tr className="bg-brand-gray-light">
            <th className="p-3 text-left">Tracking</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Product</th>
            <th className="p-3 text-left">Total</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left"></th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order: any) => (
            <tr key={order.id} className="border-t">
              <td className="p-3">{order.trackingId}</td>
              <td className="p-3">{order.customerName}</td>
              <td className="p-3">
                {order.item.productName}
              </td>
              <td className="p-3">
                ₦{order.grandTotal}
              </td>
              <td className="p-3">
                {order.orderStatus}
              </td>
              <td className="p-3">
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="text-brand-orange"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
