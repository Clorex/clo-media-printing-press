"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function CampaignForm({ onSubmit }: any) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <Input
        placeholder="Campaign Title"
        {...register("title", { required: true })}
      />

      <Input
        type="number"
        placeholder="Override Price"
        {...register("overridePrice", {
          required: true,
        })}
      />

      <Input
        type="datetime-local"
        {...register("startTime")}
      />

      <Input
        type="datetime-local"
        {...register("endTime")}
      />

      <Button disabled={isSubmitting} fullWidth>
        {isSubmitting ? "Saving..." : "Save Campaign"}
      </Button>
    </form>
  );
}
