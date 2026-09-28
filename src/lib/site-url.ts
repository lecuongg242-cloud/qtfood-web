/** URL gốc của website: biến NEXT_PUBLIC_SITE_URL → URL production trên Vercel → localhost */
export const siteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
};

/** "/tin-tuc/abc" → "https://…/tin-tuc/abc"; link tuyệt đối (ảnh Blob) giữ nguyên */
export const absoluteUrl = (path: string) => (/^https?:\/\//.test(path) ? path : `${siteUrl()}${path.startsWith("/") ? "" : "/"}${path}`);
