"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { useDebounce } from "@/lib/hooks/useDebounce";

interface Props {
  onSearch: (term: string) => void;
}

export function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState("");
  const debounced = useDebounce(value, 500);

  useEffect(() => {
    onSearch(debounced);
  }, [debounced, onSearch]);

  return (
    <Input
      placeholder="Search products..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
