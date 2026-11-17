type SeoResultProps = {
  result: { url: string; lang: string | null } | null;
  error: string | null;
};

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

  const hasLang = result.lang !== null;

  return (
    <div className="mt-8 rounded-2xl border border-[#102A2A]/10 bg-[#F0FDFA] p-5 text-start">
      <p className="text-sm text-[#102A2A]/60">
        نتیجه بررسی سئو برای{" "}
        <span dir="ltr" className="font-mono">
          {result.url}
        </span>
      </p>

      <div className="mt-3 flex items-start gap-3">
        <span className="text-xl" aria-hidden="true">
          {hasLang ? "✅" : "❌"}
        </span>
        <div>
          <p className="font-semibold text-[#102A2A]">
            {hasLang ? "تگ lang وجود دارد" : "تگ lang وجود ندارد"}
          </p>
          {hasLang && (
            <p className="mt-1 text-sm text-[#102A2A]/70">
              مقدار:{" "}
              <span dir="ltr" className="font-mono">
                {result.lang}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}