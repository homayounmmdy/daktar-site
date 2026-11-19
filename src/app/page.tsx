"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SiteCheckupHero from "@/components/SiteCheckupHero";
import CategoryPicker, { type CategoryId } from "@/components/CategoryPicker";

export default function HomePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<CategoryId[]>(["seo"]);

  const handleToggle = (id: CategoryId) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSubmit = (url: string) => {
    if (selected.length === 0) return;
    router.push(
      `/dashboard?url=${encodeURIComponent(url)}&cats=${selected.join(",")}`,
    );
  };

  return (
    <SiteCheckupHero
      onSubmit={handleSubmit}
      hasSelection={selected.length > 0}
      picker={<CategoryPicker selected={selected} onToggle={handleToggle} />}
    />
  );
}