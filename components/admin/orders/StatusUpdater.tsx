"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function StatusUpdater({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  async function update() {
    setLoading(true);
    await fetch(
      `/api/admin/orders/${orderId}/status`,
      {
        method: "POST",
        body: JSON.stringify({ status }),
      }
    );
    setLoading(false);
    location.reload();
  }

  return (
    <div className="space-y-3">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 rounded-brand"
      >
        <option value="PROCESSING">PROCESSING</option>
        <option value="PRINTING">PRINTING</option>
        <option value="PACKAGING">PACKAGING</option>
        <option value="READY_FOR_DELIVERY">
          READY_FOR_DELIVERY
        </option>
        <option value="DELIVERED">DELIVERED</option>
      </select>

      <Button
        onClick={update}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Status"}
      </Button>
    </div>
  );
}
