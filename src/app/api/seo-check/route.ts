import { NextResponse } from "next/server";

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

export async function POST(request: Request) {
  let body: { url?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "درخواست نامعتبر است" }, { status: 400 });
  }

  const url = typeof body.url === "string" ? body.url.trim() : "";
  if (!/^https?:\/\//i.test(url)) {
    return NextResponse.json({ error: "آدرس معتبر نیست" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; SiteDoctorBot/1.0)" },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `دریافت صفحه ناموفق بود (کد ${res.status})` },
        { status: 502 },
      );
    }

    const html = await res.text();

    // lang
    const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] ?? "";
    const lang =
      htmlTag.match(/\blang\s*=\s*["']([^"']*)["']/i)?.[1]?.trim() || null;

    // title
    const titleRaw = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
    const title = titleRaw ? decodeEntities(titleRaw.trim()) : null;

    // meta description
    const metaTag = html.match(
      /<meta\b[^>]*\bname\s*=\s*["']description["'][^>]*>/i,
    )?.[0];
    const descRaw = metaTag?.match(/\bcontent\s*=\s*["']([^"']*)["']/i)?.[1];
    const description = descRaw ? decodeEntities(descRaw.trim()) : null;

    return NextResponse.json({ lang, title, description });
  } catch {
    return NextResponse.json(
      { error: "اتصال به وب‌سایت ممکن نشد" },
      { status: 502 },
    );
  }
}