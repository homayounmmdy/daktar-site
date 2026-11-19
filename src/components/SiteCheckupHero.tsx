"use client";

import { Globe } from "lucide-react";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import LogoMark from "./LogoMark";

type SiteCheckupHeroProps = {
  /** Called with a normalized URL (https:// added if missing). */
  onSubmit?: (url: string) => void;
  isLoading?: boolean;
  children?: ReactNode;
};

function normalizeUrl(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(withProtocol);
    if (!url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export default function SiteCheckupHero({
  onSubmit,
  isLoading = false,
  children,
}: SiteCheckupHeroProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputId = useId();
  const errorId = useId();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = normalizeUrl(value);
    if (!url) {
      setError("آدرس وب‌سایت معتبر نیست. مثال: https://example.com");
      return;
    }
    setError(null);
    onSubmit?.(url);
  };

  return (
    <section
      aria-labelledby="checkup-title"
      className="flex min-h-dvh flex-col bg-white text-[#102A2A] antialiased "
    >
      <main className="flex flex-1 items-center justify-center px-5 pb-24 sm:px-8">
        <div className="w-full max-w-[640px] text-center">
          <div className="flex gap-2 justify-center items-center">
            <LogoMark />
            <p className="text-4xl font-extrabold tracking-tight text-[#0F766E] sm:text-5xl">
              داکتر سایت
            </p>
          </div>

          <h1
            id="checkup-title"
            className="mt-6 text-xl font-semibold leading-relaxed sm:text-2xl"
          >
            سلامت وب‌سایتت را بررسی کن.
          </h1>

          <p className="mx-auto mt-3 max-w-[30rem] text-[15px] leading-8 text-[#102A2A]/70 sm:text-base">
            آدرس وب‌سایتت را وارد کن تا از وضعیت سئو، سرعت، امنیت و دسترسی‌پذیری
            آن باخبر شوی.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-9">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <label htmlFor={inputId} className="sr-only">
                  آدرس وب‌سایت
                </label>
                <input
                  id={inputId}
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  dir="ltr"
                  placeholder="https://example.com"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    if (error) setError(null);
                  }}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? errorId : undefined}
                  className={[
                    "peer h-14 w-full rounded-2xl border bg-white ps-4 pe-2 text-left text-base text-[#102A2A]",
                    "placeholder:text-[#102A2A]/40 outline-none transition duration-200",
                    error
                      ? "border-red-600 focus:ring-4 focus:ring-red-600/15"
                      : "border-[#102A2A]/15 hover:border-[#14B8A6] focus:border-[#0F766E] focus:ring-4 focus:ring-[#99F6E4]/60",
                  ].join(" ")}
                />
                <span className="pointer-events-none absolute inset-y-0 start-4 flex items-center text-[#0F766E]/60 transition-colors peer-focus:text-[#0F766E]">
                  <Globe className="size-5" aria-hidden="true" />
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="h-14 shrink-0 rounded-2xl bg-[#0F766E] px-8 text-base font-semibold text-white outline-none transition duration-200 hover:bg-[#115E59] focus-visible:ring-4 focus-visible:ring-[#14B8A6]/50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none motion-reduce:active:scale-100"
              >
                {isLoading ? "در حال بررسی..." : "معاینه وب‌سایت"}
              </button>
            </div>

            <p
              id={errorId}
              role="alert"
              className={`mt-3 min-h-6 text-sm text-red-700 ${error ? "" : "sr-only"}`}
            >
              {error}
            </p>
          </form>

          {children}

          <p className="mt-4 text-sm text-[#102A2A]/60">
            گزارش کامل سلامت وب‌سایت، به زبان دری
          </p>
        </div>
      </main>
    </section>
  );
}