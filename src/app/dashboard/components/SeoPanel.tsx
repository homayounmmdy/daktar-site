"use client";

import { useEffect, useState } from "react";
import SeoResult from "@/components/SeoResult";

type SeoData = {
  url: string;
  lang: string | null;
  title: string | null;
  description: string | null;
};

export default function SeoPanel({ url }: { url: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<SeoData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function run() {
      setIsLoading(true);
      setError(null);
      setResult(null);

      try {
        const res = await fetch("/api/seo-check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
          signal: controller.signal,
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
        if ((e as Error).name === "AbortError") return;
        setError(e instanceof Error ? e.message : "خطای ناشناخته");
      } finally {
        setIsLoading(false);
      }
    }

    run();
    return () => controller.abort();
  }, [url]);

  if (isLoading) return <SeoLoadingSkeleton />;
  return <SeoResult result={result} error={error} />;
}

/* ─────────────── Loading skeleton ─────────────── */

function SeoLoadingSkeleton() {
  const bar = (w: string, h = "h-3") => (
    <div className={`${h} ${w} rounded bg-[#102A2A]/[0.06]`} />
  );

  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="animate-pulse overflow-hidden rounded-2xl border border-[#102A2A]/10 bg-white"
    >
      {/* Header */}
      <div className="border-b border-[#102A2A]/[0.06] px-4 py-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-2">
            {bar("w-20", "h-2.5")}
            {bar("w-56", "h-4")}
          </div>
          {bar("w-12 h-6 rounded-lg")}
        </div>
        <div className="mt-3 flex gap-1.5">
          {bar("w-16 h-5 rounded-full")}
          {bar("w-16 h-5 rounded-full")}
          {bar("w-16 h-5 rounded-full")}
        </div>
        <div className="mt-3 h-1 w-full rounded-full bg-[#102A2A]/[0.06]" />
      </div>

      {/* Rows */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex items-start gap-3 border-t border-[#102A2A]/[0.06] px-4 py-4"
        >
          <div className="size-6 shrink-0 rounded-full bg-[#102A2A]/[0.06]" />
          <div className="flex-1 space-y-2">
            {bar("w-32")}
            {bar("w-48", "h-2.5")}
            {bar("w-full max-w-md h-2.5")}
          </div>
        </div>
      ))}
    </div>
  );
}