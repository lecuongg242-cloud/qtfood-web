import "server-only";
import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Media } from "@/payload-types";
import { content, img } from "@/content/data";
import type { CertificationView } from "@/content/types";

/** Kích thước ảnh văn bản gốc trong public/images/certificates */
const FALLBACK_SIZE = { width: 898, height: 1280 };

/** Chứng nhận hiển thị trên website: bản `active` có thứ tự nhỏ nhất. CMS chưa có chứng nhận nào → dùng content/qtfood.json. */
/** Ngày lưu trong DB (ISO, UTC) → "YYYY-MM-DD" theo giờ Việt Nam */
const vnDate = (iso: string) => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh" }).format(new Date(iso));

/** Chứng nhận hiển thị trên website: bản `active` có thứ tự nhỏ nhất. CMS chưa có chứng nhận nào → dùng content/qtfood.json. */
export const getCertification = cache(async (): Promise<CertificationView | null> => {
  const payload = await getPayload({ config });
  const [{ totalDocs: total }, { docs }] = await Promise.all([
    payload.count({ collection: "certifications" }),
    payload.find({ collection: "certifications", where: { active: { equals: true } }, sort: "order", limit: 1, depth: 1 }),
  ]);
  if (total === 0) {
    const iso = content.certifications[0];
    return iso ? { ...iso, documents: iso.documents.map((d) => ({ title: d.title, image: img(d.image), ...FALLBACK_SIZE })) } : null;
  }
  const c = docs[0];
  if (!c) return null;
  return {
    standard: c.standard,
    name: c.name,
    holder: c.holder,
    number: c.number,
    issuer: c.issuer,
    scope: c.scope,
    issued: vnDate(c.issuedAt),
    expires: vnDate(c.expiresAt),
    surveillance: c.surveillance,
    documents: (c.documents ?? []).flatMap((d) => {
      const m = typeof d.image === "object" ? (d.image as Media) : null;
      return m?.url ? [{ title: d.title, image: m.url, width: m.width ?? FALLBACK_SIZE.width, height: m.height ?? FALLBACK_SIZE.height }] : [];
    }),
  };
});
