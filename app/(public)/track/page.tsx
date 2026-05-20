"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { TrackingForm } from "@/components/tracking/TrackingForm";
import { TrackingStatus } from "@/components/tracking/TrackingStatus";

export default function TrackPage() {
  const [order, setOrder] = useState<any>(null);

  function handleSearch(trackingId: string) {
    console.log("Search:", trackingId);
  }

  return (
    <Section>
      <Container>
        <h1 className="text-display-md mb-6">
          Track Your Order
        </h1>

        <TrackingForm onSearch={handleSearch} />

        <TrackingStatus order={order} />
      </Container>
    </Section>
  );
}