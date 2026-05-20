"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function TrackingForm({
  onSearch,
}: {
  onSearch: (trackingId: string) => void;
}) {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-4">
      <Input
        placeholder="Enter Tracking ID (CLO-XXXXXX)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <Button
        fullWidth
        onClick={() => onSearch(value)}
      >
        Track Order
      </Button>
    </div>
  );
}
