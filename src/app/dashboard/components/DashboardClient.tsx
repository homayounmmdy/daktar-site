"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DashboardShell from "./DashboardShell";

export default function DashboardClient() {
  const params = useSearchParams();
  const router = useRouter();
  const url = params.get("url");

  useEffect(() => {
    if (!url) router.replace("/");
  }, [url, router]);

  if (!url) return <div className="min-h-dvh bg-[#FAFAFA]" />;
  return <DashboardShell url={url} />;
}