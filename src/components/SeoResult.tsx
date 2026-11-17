import CheckItem, { type CheckStatus } from "./CheckItem";

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

const TITLE_MAX_CHARS = 65;
const TITLE_MAX_PX = 568;
const DESC_MIN = 70;
const DESC_MAX = 155;

// تقریب ساده: ~۸.۵ پیکسل برای هر کاراکتر در Arial 20px (دقیق نیست، تخمینی است)
function estimateTitlePx(title: string): number {
  return Math.round(title.length * 8.5);
}

function checkTitle(title: string | null): {
  status: CheckStatus;
  message: string;
  detail?: string;
} {
  if (!title) {
    return { status: "bad", message: "تگ title وجود ندارد." };
  }
  const len = title.length;
  const px = estimateTitlePx(title);
  const detail = `${len} کاراکتر · ≈${px}px / ${TITLE_MAX_PX}px`;

  if (len > TITLE_MAX_CHARS || px > TITLE_MAX_PX) {
    return {
      status: "warning",
      message: `عنوان طولانی است (حداکثر ${TITLE_MAX_CHARS} کاراکتر یا ${TITLE_MAX_PX}px).`,
      detail,
    };
  }
  if (len < 30) {
    return {
      status: "warning",
      message: "عنوان خیلی کوتاه است؛ بهتر است ۳۰ تا ۶۵ کاراکتر باشد.",
      detail,
    };
  }
  return { status: "good", message: "طول عنوان مناسب است.", detail };
}

function checkDescription(desc: string | null): {
  status: CheckStatus;
  message: string;
  detail?: string;
} {
  if (!desc) {
    return { status: "bad", message: "تگ meta description وجود ندارد." };
  }
  const len = desc.length;
  const detail = `${len} کاراکتر / بازهٔ ${DESC_MIN}–${DESC_MAX}`;

  if (len < DESC_MIN) {
    return {
      status: "warning",
      message: `توضیحات کوتاه است (حداقل ${DESC_MIN} کاراکتر).`,
      detail,
    };
  }
  if (len > DESC_MAX) {
    return {
      status: "warning",
      message: `توضیحات طولانی است (حداکثر ${DESC_MAX} کاراکتر).`,
      detail,
    };
  }
  return { status: "good", message: "طول توضیحات مناسب است.", detail };
}

function checkLang(lang: string | null): {
  status: CheckStatus;
  message: string;
  detail?: string;
} {
  if (!lang) {
    return { status: "bad", message: "تگ lang روی <html> وجود ندارد." };
  }
  return {
    status: "good",
    message: "تگ lang وجود دارد.",
    detail: `lang="${lang}"`,
  };
}

export default function SeoResult({ result, error }: SeoResultProps) {
  if (error) {
    return (
      <div
        role="alert"
        className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
      >
        {error}
      </div>
    );
  }
  if (!result) return null;

  const title = checkTitle(result.title);
  const desc = checkDescription(result.description);
  const lang = checkLang(result.lang);

  return (
    <div className="mt-8 rounded-2xl border border-[#102A2A]/10 bg-[#F0FDFA] p-4 text-start">
      <p className="px-1 text-sm text-[#102A2A]/60">
        گزارش سئو برای{" "}
        <span dir="ltr" className="font-mono">
          {result.url}
        </span>
      </p>

      <div className="mt-3 space-y-2">
        <CheckItem
          label="عنوان صفحه (Title)"
          status={title.status}
          message={title.message}
          detail={title.detail ?? result.title ?? undefined}
        />
        <CheckItem
          label="توضیحات متا (Description)"
          status={desc.status}
          message={desc.message}
          detail={desc.detail ?? result.description ?? undefined}
        />
        <CheckItem
          label="زبان صفحه (Lang)"
          status={lang.status}
          message={lang.message}
          detail={lang.detail ?? undefined}
        />
      </div>
    </div>
  );
}