"use client";

import {
  Accessibility,
  Check,
  Gauge,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type CategoryId = "seo" | "performance" | "security" | "a11y";

type Category = {
  id: CategoryId;
  label: string;
  description: string;
  Icon: LucideIcon;
  enabled: boolean;
};

const CATEGORIES: Category[] = [
  {
    id: "seo",
    label: "سئو",
    description: "عنوان، توضیحات متا و زبان صفحه",
    Icon: Search,
    enabled: true,
  },
  {
    id: "performance",
    label: "سرعت",
    description: "زمان بارگذاری و بهینه‌سازی",
    Icon: Gauge,
    enabled: false,
  },
  {
    id: "security",
    label: "امنیت",
    description: "HTTPS و هدرهای امنیتی",
    Icon: ShieldCheck,
    enabled: false,
  },
  {
    id: "a11y",
    label: "دسترسی‌پذیری",
    description: "استانداردهای WCAG",
    Icon: Accessibility,
    enabled: false,
  },
];

type CategoryPickerProps = {
  selected: CategoryId[];
  onToggle: (id: CategoryId) => void;
};

export default function CategoryPicker({
  selected,
  onToggle,
}: CategoryPickerProps) {
  return (
    <fieldset className="mt-7 text-start">
      <legend className="mb-2 text-[13px] font-medium text-[#102A2A]/65">
        چه چیزی بررسی شود؟
      </legend>

      <div className="grid grid-cols-2 gap-2">
        {CATEGORIES.map(({ id, label, description, Icon, enabled }) => {
          const isSelected = selected.includes(id);
          const isDisabled = !enabled;

          return (
            <button
              key={id}
              type="button"
              disabled={isDisabled}
              aria-pressed={isSelected}
              onClick={() => onToggle(id)}
              className={[
                "group relative flex flex-col gap-2 rounded-xl border p-3 text-start outline-none transition duration-150",
                "focus-visible:ring-4 focus-visible:ring-[#99F6E4]/60",
                isDisabled
                  ? "cursor-not-allowed border-dashed border-[#102A2A]/10 bg-[#102A2A]/[0.015]"
                  : isSelected
                    ? "border-[#0F766E] bg-[#F0FDFA] shadow-[0_1px_2px_rgba(15,118,110,0.08)]"
                    : "border-[#102A2A]/12 bg-white hover:border-[#14B8A6] hover:bg-[#F0FDFA]/40",
              ].join(" ")}
            >
              <div className="flex items-center gap-2">
                <span
                  className={[
                    "flex size-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                    isDisabled
                      ? "bg-[#102A2A]/5 text-[#102A2A]/35"
                      : isSelected
                        ? "bg-[#0F766E] text-white"
                        : "bg-[#0F766E]/10 text-[#0F766E]",
                  ].join(" ")}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>

                <span
                  className={[
                    "text-sm font-semibold",
                    isDisabled ? "text-[#102A2A]/45" : "text-[#102A2A]",
                  ].join(" ")}
                >
                  {label}
                </span>

                {isDisabled && (
                  <span className="ms-auto rounded-full bg-[#102A2A]/8 px-1.5 py-0.5 text-[10px] font-medium text-[#102A2A]/55">
                    به‌زودی
                  </span>
                )}

                {!isDisabled && isSelected && (
                  <span className="ms-auto flex size-4 items-center justify-center rounded-full bg-[#0F766E] text-white">
                    <Check className="size-2.5" strokeWidth={3.5} aria-hidden="true" />
                  </span>
                )}
              </div>

              <p
                className={[
                  "text-[11px] leading-4",
                  isDisabled ? "text-[#102A2A]/35" : "text-[#102A2A]/55",
                ].join(" ")}
              >
                {description}
              </p>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}