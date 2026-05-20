"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function AdminHeader() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", {
      method: "POST",
    });
    router.push("/admin/login");
  }

  return (
    <header className="sticky top-0 bg-white shadow-brand-sm px-6 py-4 flex justify-between items-center z-20">
      <h1 className="text-lg font-semibold">
        Admin Dashboard
      </h1>

      <Button variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}
