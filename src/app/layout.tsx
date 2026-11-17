import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "داکتر سایت — بررسی سلامت وب‌سایت",
  description: "گزارش کامل سلامت وب‌سایت: سئو، سرعت، امنیت و دسترسی‌پذیری.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html dir="rtl" lang="fa" className="h-full antialiased">
      <body className={`${vazirmatn.variable} ${vazirmatn.className}`}>
        {children}
      </body>
    </html>
  );
}
