"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface Props {
  orderId: string;
  invoiceUrl?: string;
}

export function DownloadInvoiceButton({
  orderId,
  invoiceUrl,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const res = await fetch(`/api/invoice/${orderId}`, {
        method: "POST",
      });
      const data = await res.json();

      if (data.success && data.invoiceUrl) {
        window.open(data.invoiceUrl, "_blank");
        location.reload();
      } else {
        alert(data.message || "Failed to generate invoice");
      }
    } catch {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  }

  if (invoiceUrl) {
    return (
      <Button
        variant="outline"
        onClick={() => window.open(invoiceUrl, "_blank")}
      >
        Download Invoice
      </Button>
    );
  }

  return (
    <Button onClick={generate} disabled={loading}>
      {loading ? "Generating..." : "Generate Invoice"}
    </Button>
  );
}
