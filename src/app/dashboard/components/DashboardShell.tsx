"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Accessibility,
  Gauge,
  LayoutDashboard,
  Lock,
  RefreshCw,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import LogoMark from "@/components/LogoMark";
import SeoPanel from "./SeoPanel";

type NavItem = {
  id: string;
  label: string;
  Icon: LucideIcon;
  enabled: boolean;
};

const NAV: NavItem[] = [
  { id: "overview", label: "نمای کلی", Icon: LayoutDashboard, enabled: false },
  { id: "seo", label: "سئو", Icon: Search, enabled: true },
  { id: "performance", label: "سرعت", Icon: Gauge, enabled: false },
  { id: "security", label: "امنیت", Icon: ShieldCheck, enabled: false },
  { id: "a11y", label: "دسترسی‌پذیری", Icon: Accessibility, enabled: false },
];

export default function DashboardShell({ url }: { url: string }) {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-dvh bg-[#FAFAFA] text-[#102A2A] antialiased selection:bg-[#99F6E4]">
      {/* ─── Top bar ─── */}
      <header className="sticky top-0 z-20 border-b border-[#102A2A]/[0.06] bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between gap-3 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <LogoMark />
            <span className="text-lg font-extrabold tracking-tight text-[#0F766E]">
              داکتر سایت
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <div
              dir="ltr"
              className="hidden max-w-[280px] truncate rounded-lg bg-[#102A2A]/[0.04] px-3 py-1.5 font-mono text-xs text-[#102A2A]/70 md:block"
              title={url}
            >
              {url}
            </div>

            <button
              type="button"
              onClick={() => setRefreshKey((k) => k + 1)}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#102A2A]/10 bg-white px-2.5 text-xs font-medium text-[#102A2A]/75 transition hover:border-[#14B8A6] hover:text-[#0F766E] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#99F6E4]/60"
            >
              <RefreshCw className="size-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">بررسی مجدد</span>
            </button>

            <Link
              href="/"
              className="inline-flex h-8 items-center rounded-lg bg-[#0F766E] px-3 text-xs font-semibold text-white transition hover:bg-[#115E59] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#14B8A6]/40"
            >
              سایت دیگر
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Body ─── */}
      <div className="mx-auto flex max-w-[1240px] gap-8 px-4 py-6 sm:px-6 lg:py-8">
        {/* Sidebar – desktop */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav aria-label="بخش‌ها" className="sticky top-20 space-y-1">
            {NAV.map((item) => (
              <NavButton key={item.id} item={item} variant="sidebar" />
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          {/* Mobile nav */}
          <nav
            aria-label="بخش‌ها"
            className="mb-5 -mx-1 flex gap-1.5 overflow-x-auto pb-1 lg:hidden"
          >
            {NAV.map((item) => (
              <NavButton key={item.id} item={item} variant="pill" />
            ))}
          </nav>

          <section aria-labelledby="seo-heading">
            <div className="mb-5">
              <h1
                id="seo-heading"
                className="text-xl font-bold tracking-tight sm:text-2xl"
              >
                گزارش سئو
              </h1>
              <p className="mt-1.5 text-sm text-[#102A2A]/55">
                بررسی عنوان، توضیحات متا و زبان صفحه.
              </p>
            </div>

            <SeoPanel key={refreshKey} url={url} />
          </section>
        </main>
      </div>
    </div>
  );
}

/* ─────────────────────────── Nav item ─────────────────────────── */

function NavButton({
  item,
  variant,
}: {
  item: NavItem;
  variant: "sidebar" | "pill";
}) {
  const { id, label, Icon, enabled } = item;
  const isActive = id === "seo";

  if (variant === "pill") {
    if (!enabled) {
      return (
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-dashed border-[#102A2A]/10 bg-white px-3 py-1.5 text-xs text-[#102A2A]/40">
          <Icon className="size-3.5" aria-hidden="true" />
          {label}
          <Lock className="size-2.5" aria-hidden="true" />
        </span>
      );
    }
    return (
      <span
        aria-current={isActive ? "page" : undefined}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#0F766E]/10 px-3 py-1.5 text-xs font-semibold text-[#0F766E]"
      >
        <Icon className="size-3.5" aria-hidden="true" />
        {label}
      </span>
    );
  }

  // Sidebar
  if (!enabled) {
    return (
      <div className="flex cursor-not-allowed select-none items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[#102A2A]/35">
        <Icon className="size-4" aria-hidden="true" />
        <span className="flex-1">{label}</span>
        <Lock className="size-3" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      aria-current={isActive ? "page" : undefined}
      className={[
        "relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition",
        isActive
          ? "bg-[#0F766E]/10 text-[#0F766E]"
          : "text-[#102A2A]/70 hover:bg-[#102A2A]/[0.03] hover:text-[#102A2A]",
      ].join(" ")}
    >
      {isActive && (
        <span className="absolute inset-y-1.5 start-0 w-0.5 rounded-full bg-[#0F766E]" />
      )}
      <Icon className="size-4" aria-hidden="true" />
      <span className="flex-1">{label}</span>
    </div>
  );
}