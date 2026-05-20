"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ReviewTable({ reviews }: any) {
  const [filter, setFilter] = useState("ALL");

  const filtered = reviews.filter((review: any) => {
    if (filter === "APPROVED")
      return review.isApproved;
    if (filter === "PENDING")
      return !review.isApproved;
    return true;
  });

  async function approve(id: string) {
    await fetch(`/api/admin/reviews/${id}/approve`, {
      method: "POST",
    });
    location.reload();
  }

  async function remove(id: string) {
    await fetch(`/api/admin/reviews/${id}/delete`, {
      method: "POST",
    });
    location.reload();
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => setFilter("ALL")}
        >
          All
        </Button>
        <Button
          variant="outline"
          onClick={() => setFilter("APPROVED")}
        >
          Approved
        </Button>
        <Button
          variant="outline"
          onClick={() => setFilter("PENDING")}
        >
          Pending
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-brand-gray-light">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((review: any) => (
              <tr key={review.id} className="border-t">
                <td className="p-3">
                  {review.customerName}
                </td>
                <td className="p-3">
                  {review.productName}
                </td>
                <td className="p-3">
                  {"★".repeat(review.rating)}
                </td>
                <td className="p-3">
                  {review.isApproved
                    ? "Approved"
                    : "Pending"}
                </td>
                <td className="p-3 space-x-2">
                  {!review.isApproved && (
                    <Button
                      variant="secondary"
                      onClick={() =>
                        approve(review.id)
                      }
                    >
                      Approve
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    onClick={() =>
                      remove(review.id)
                    }
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
