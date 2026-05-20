interface Props {
  order: any;
}

export function TrackingStatus({ order }: Props) {
  if (!order) return null;

  return (
    <div className="mt-10 space-y-4">
      <h2 className="text-lg font-semibold">
        {order.item.productName}
      </h2>

      <p>Status: {order.orderStatus}</p>
      <p>
        Estimated Delivery:{" "}
        {new Date(order.estimatedDelivery).toDateString()}
      </p>
    </div>
  );
}
