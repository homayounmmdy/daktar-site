"use client";

import { useState } from "react";
import SiteCheckupHero from "@/components/SiteCheckupHero";
import SeoResult from "@/components/SeoResult";
import CategoryPicker, { type CategoryId } from "@/components/CategoryPicker";

type CheckResult = {
  url: string;
  lang: string | null;
  title: string | null;
  description: string | null;
};

export default function HomePage() {
  const [selected, setSelected] = useState<CategoryId[]>(["seo"]); // سئو پیش‌فرض
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = (id: CategoryId) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  async function handleSubmit(url: string) {
    if (selected.length === 0) {
      setError("تست بدون هیچ گزینه اجرا نمی‌شود. حداقل یک بخش را انتخاب کنید.");
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/seo-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, categories: selected }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "بررسی ناموفق بود");

      setResult({
        url,
        lang: data.lang ?? null,
        title: data.title ?? null,
        description: data.description ?? null,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطای ناشناخته");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SiteCheckupHero
      onSubmit={handleSubmit}
      isLoading={isLoading}
      hasSelection={selected.length > 0}
      picker={<CategoryPicker selected={selected} onToggle={handleToggle} />}
    >
      <SeoResult result={result} error={error} />
    </SiteCheckupHero>
  );
}