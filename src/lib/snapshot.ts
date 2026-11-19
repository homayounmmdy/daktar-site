// این فایل فقط تعریف نوع داده و هیچ کد اجرایی یا منطقی ندارد.
// فقط تایپ — صفر منطق.

export type PageSnapshot = {
  url: string;
  finalUrl: string; 
  status: number;
  headers: Record<string, string>;
  html: string;
  parsed: {
    title: string | null;
    description: string | null;
    lang: string | null;
    canonical: string | null;
    robots: string | null;
    og: Record<string, string>;
    twitter: Record<string, string>;
    jsonLd: unknown[];
    h1s: string[];
    h2s: string[];
    images: { src: string; alt: string | null }[];
    links: { href: string; rel: string | null }[];
    hreflangs: { lang: string; href: string }[];
  };
};

export type SnapshotResult =
  | { ok: true; snapshot: PageSnapshot }
  | { ok: false; message: string; status?: number };