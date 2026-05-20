"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function SettingsForm({ settings }: any) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: settings,
  });

  async function onSubmit(data: any) {
    await fetch("/api/admin/settings/update", {
      method: "POST",
      body: JSON.stringify(data),
    });
    alert("Settings updated");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <Input
        type="number"
        placeholder="Default Delivery Days"
        {...register("defaultDeliveryDays")}
      />

      <Input
        placeholder="Bank Name"
        {...register("bankName")}
      />

      <Input
        placeholder="Bank Account"
        {...register("bankAccount")}
      />

      <Input
        placeholder="Bank Account Name"
        {...register("bankAccountName")}
      />

      <Input
        placeholder="WhatsApp Number"
        {...register("whatsappNumber")}
      />

      <Button disabled={isSubmitting} fullWidth>
        Save Settings
      </Button>
    </form>
  );
}
