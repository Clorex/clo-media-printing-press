"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function GlobalError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-center px-6">
      <div>
        <h1 className="text-display-sm mb-4">
          Something went wrong.
        </h1>
        <p className="mb-6 text-brand-gray-medium">
          Please try again later.
        </p>
        <Link href="/">
          <Button>Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
}