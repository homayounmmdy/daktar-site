import { AlertTriangle, Check, X } from "lucide-react";
import type { ReactNode } from "react";

export type CheckStatus = "good" | "warning" | "bad";

export type CheckItemProps = {
  label: string;
  status: CheckStatus;
  message: string;
  badge?: string;
  code?: ReactNode;
  range?: { current: number; min: number; max: number };
};

const STATUS = {
  good: {
    Icon: Check,
    ring: "ring-emerald-200",
    bg: "bg-emerald-100",
    fg: "text-emerald-700",
    bar: "bg-emerald-500",
  },
  warning: {
    Icon: AlertTriangle,
    ring: "ring-amber-200",
    bg: "bg-amber-100",
    fg: "text-amber-700",
    bar: "bg-amber-500",
  },
  bad: {
    Icon: X,
    ring: "ring-red-200",
    bg: "bg-red-100",
    fg: "text-red-700",
    bar: "bg-red-500",
  },
} as const;

function RangeBar({
  current,
  min,
  max,
  color,
}: {
  current: number;
  min: number;
  max: number;
  color: string;
}) {
  const ceiling = Math.max(max * 1.25, current * 1.05, 1);
  const pct = (n: number) => Math.min(100, (n / ceiling) * 100);

  return (
    <div
      dir="ltr"
      className="relative mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#102A2A]/[0.06]"
      aria-hidden="true"
    >
      {/* محدودهٔ سبز = ناحیهٔ مطلوب */}
      <div
        className="absolute inset-y-0 rounded-full bg-emerald-500/20"
        style={{
          left: `${pct(min)}%`,
          width: `${Math.max(0, pct(max) - pct(min))}%`,
        }}
      />
      {/* مقدار فعلی */}
      <div
        className={`absolute inset-y-0 left-0 rounded-full ${color}`}
        style={{ width: `${pct(current)}%` }}
      />
    </div>
  );
}

export default function CheckItem({
  label,
  status,
  message,
  badge,
  code,
  range,
}: CheckItemProps) {
  const s = STATUS[status] ?? STATUS.bad;
  const Icon = s.Icon;

  return (
    <div className="group flex items-start gap-3 px-4 py-4 transition-colors hover:bg-[#102A2A]/[0.015]">
      <span
        className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ${s.bg} ${s.fg} ${s.ring}`}
      >
        <Icon className="size-3.5" strokeWidth={2.75} aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <p className="text-sm font-medium text-[#102A2A]">{label}</p>
          {badge && (
            <span
              dir="ltr"
              className={`font-mono text-[11px] tabular-nums ${s.fg}`}
            >
              {badge}
            </span>
          )}
        </div>

        <p className="mt-0.5 text-xs leading-5 text-[#102A2A]/60">{message}</p>

        {range && (
          <RangeBar
            current={range.current}
            min={range.min}
            max={range.max}
            color={s.bar}
          />
        )}

        {code && (
          <pre className="mt-2.5 max-h-28 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-[#102A2A]/[0.03] px-3 py-2 font-mono text-[11.5px] leading-5 text-[#102A2A]/75">
            {code}
          </pre>
        )}
      </div>
    </div>
  );
}
