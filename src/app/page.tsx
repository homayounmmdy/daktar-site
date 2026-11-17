"use client";

import { useState } from "react";
import SiteCheckupHero from "@/components/SiteCheckupHero";
import SeoResult from "@/components/SeoResult";

type CheckResult = { url: string; lang: string | null };

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(url: string) {
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/seo-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "بررسی ناموفق بود");
      setResult({ url, lang: data.lang ?? null });
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطای ناشناخته");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SiteCheckupHero onSubmit={handleSubmit} isLoading={isLoading}>
      <SeoResult result={result} error={error} />
    </SiteCheckupHero>
  );
}