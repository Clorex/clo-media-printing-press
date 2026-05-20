"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface FormValues {
  customerName: string;
  customerPhone: string;
}

export function CheckoutForm({
  total,
}: {
  total: number;
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  async function onSubmit(data: FormValues) {
    console.log("Submit order:", data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <Input
        placeholder="Full Name"
        {...register("customerName", { required: true })}
      />

      <Input
        placeholder="Phone Number"
        {...register("customerPhone", { required: true })}
      />

      <div className="font-semibold">
        Total: ₦{total.toLocaleString()}
      </div>

      <Button fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Place Order"}
      </Button>
    </form>
  );
}
