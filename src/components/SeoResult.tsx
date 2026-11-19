import CheckItem, { type CheckItemProps } from "./CheckItem";

type SeoReport = {
  url: string;
  lang: string | null;
  title: string | null;
  description: string | null;
};

type SeoResultProps = {
  result: SeoReport | null;
  error: string | null;
};

const TITLE_MIN = 30;
const TITLE_MAX = 65;
const TITLE_MAX_PX = 568;
const DESC_MIN = 70;
const DESC_MAX = 155;

function checkTitle(
  title: string | null,
): Pick<CheckItemProps, "status" | "message" | "badge" | "code" | "range"> {
  if (!title) {
    return {
      status: "bad",
      message: "تگ <title> در صفحه وجود ندارد.",
      badge: "—",
    };
  }
  const len = title.length;
  const px = Math.round(len * 8.5);
  const badge = `${len} / ${TITLE_MAX} chars`;
  const range = { current: len, min: TITLE_MIN, max: TITLE_MAX };
  const code = title;

  if (len > TITLE_MAX || px > TITLE_MAX_PX) {
    return {
      status: "warning",
      message: `عنوان طولانی است؛ حداکثر ${TITLE_MAX} کاراکتر یا ${TITLE_MAX_PX}px (اکنون ≈${px}px).`,
      badge,
      range,
      code,
    };
  }
  if (len < TITLE_MIN) {
    return {
      status: "warning",
      message: `عنوان کوتاه است؛ بهتر است بین ${TITLE_MIN} تا ${TITLE_MAX} کاراکتر باشد.`,
      badge,
      range,
      code,
    };
  }
  return {
    status: "good",
    message: "طول عنوان در محدودهٔ مناسب است.",
    badge,
    range,
    code,
  };
}

function checkDescription(
  desc: string | null,
): Pick<CheckItemProps, "status" | "message" | "badge" | "code" | "range"> {
  if (!desc) {
    return {
      status: "bad",
      message: 'تگ <meta name="description"> وجود ندارد.',
      badge: "—",
    };
  }
  const len = desc.length;
  const badge = `${len} / ${DESC_MAX} chars`;
  const range = { current: len, min: DESC_MIN, max: DESC_MAX };
  const code = desc;

  if (len > DESC_MAX) {
    return {
      status: "warning",
      message: `توضیحات طولانی است؛ حداکثر ${DESC_MAX} کاراکتر توصیه می‌شود.`,
      badge,
      range,
      code,
    };
  }
  if (len < DESC_MIN) {
    return {
      status: "warning",
      message: `توضیحات کوتاه است؛ حداقل ${DESC_MIN} کاراکتر توصیه می‌شود.`,
      badge,
      range,
      code,
    };
  }
  return {
    status: "good",
    message: "طول توضیحات در محدودهٔ مناسب است.",
    badge,
    range,
    code,
  };
}

function checkLang(
  lang: string | null,
): Pick<CheckItemProps, "status" | "message" | "badge" | "code"> {
  if (!lang) {
    return {
      status: "bad",
      message: "تگ lang روی <html> تعریف نشده است.",
      badge: "—",
      code: "<html>",
    };
  }
  return {
    status: "good",
    message: "تگ lang به‌درستی تعریف شده است.",
    badge: lang,
    code: `<html lang="${lang}">`,
  };
}

function SummaryPill({
  tone,
  label,
}: {
  tone: "emerald" | "amber" | "red";
  label: string;
}) {
  const styles = {
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    red: "bg-red-50 text-red-700 ring-red-200",
  } as const;
  const dot = {
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    red: "bg-red-500",
  } as const;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-inset ${styles[tone]}`}
    >
      <span className={`size-1.5 rounded-full ${dot[tone]}`} />
      {label}
    </span>
  );
}

export default function SeoResult({ result, error }: SeoResultProps) {
  if (error) {
    return (
      <div
        role="alert"
        className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
      >
        {error}
      </div>
    );
  }
  if (!result) return null;

  const title = checkTitle(result.title);
  const desc = checkDescription(result.description);
  const lang = checkLang(result.lang);

  const checks: (CheckItemProps & { key: string })[] = [
    { key: "title", label: "عنوان صفحه (Title)", ...title },
    { key: "description", label: "توضیحات متا (Description)", ...desc },
    { key: "lang", label: "زبان صفحه (Lang)", ...lang },
  ];

  const total = checks.length;
  const good = checks.filter((c) => c.status === "good").length;
  const warn = checks.filter((c) => c.status === "warning").length;
  const bad = checks.filter((c) => c.status === "bad").length;
  const score = Math.round((good / total) * 100);

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-[#102A2A]/10 bg-white text-start shadow-[0_1px_2px_rgba(16,42,42,0.04)]">
      {/* Header */}
      <div className="border-b border-[#102A2A]/[0.06] bg-gradient-to-b from-[#F0FDFA]/70 to-white px-4 py-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wide text-[#102A2A]/45">
              گزارش سئو
            </p>
            <p
              dir="ltr"
              className="mt-0.5 truncate font-mono text-sm text-[#102A2A]"
            >
              {result.url}
            </p>
          </div>
          <span className="shrink-0 rounded-lg bg-[#0F766E]/10 px-2.5 py-1 font-mono text-sm font-semibold tabular-nums text-[#0F766E]">
            {score}%
          </span>
        </div>

        {/* Pills */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <SummaryPill tone="emerald" label={`${good} خوب`} />
          <SummaryPill tone="amber" label={`${warn} هشدار`} />
          <SummaryPill tone="red" label={`${bad} خطا`} />
        </div>

        {/* Progress bar */}
        <div
          className="mt-3 flex h-1 w-full overflow-hidden rounded-full bg-[#102A2A]/[0.06]"
          aria-hidden="true"
        >
          <div
            className="bg-emerald-500"
            style={{ width: `${(good / total) * 100}%` }}
          />
          <div
            className="bg-amber-500"
            style={{ width: `${(warn / total) * 100}%` }}
          />
          <div
            className="bg-red-500"
            style={{ width: `${(bad / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#102A2A]/[0.06]">
        {checks.map((c) => (
          <CheckItem
            key={c.key}
            label={c.label}
            status={c.status}
            message={c.message}
            badge={c.badge}
            code={c.code}
            range={c.range}
          />
        ))}
      </div>
    </div>
  );
}
