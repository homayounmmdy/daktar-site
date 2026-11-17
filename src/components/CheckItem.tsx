export type CheckStatus = "good" | "warning" | "bad";

type CheckItemProps = {
  label: string;
  status: CheckStatus;
  message: string;
  detail?: string;
};

const ICONS: Record<CheckStatus, string> = {
  good: "✅",
  warning: "⚠️",
  bad: "❌",
};

const COLORS: Record<CheckStatus, string> = {
  good: "border-emerald-200 bg-emerald-50",
  warning: "border-amber-200 bg-amber-50",
  bad: "border-red-200 bg-red-50",
};

export default function CheckItem({
  label,
  status,
  message,
  detail,
}: CheckItemProps) {
  return (
    <div className={`flex items-start gap-3 rounded-xl border p-3 ${COLORS[status]}`}>
      <span className="text-lg leading-6" aria-hidden="true">
        {ICONS[status]}
      </span>
      <div className="min-w-0 flex-1 text-start">
        <p className="text-sm font-semibold text-[#102A2A]">{label}</p>
        <p className="mt-0.5 text-sm text-[#102A2A]/75">{message}</p>
        {detail && (
          <p dir="ltr" className="mt-1 truncate text-xs font-mono text-[#102A2A]/55">
            {detail}
          </p>
        )}
      </div>
    </div>
  );
}