import raw from "@content/qtfood.json";
import type { SiteContent } from "./types";

export const content = raw as unknown as SiteContent;

/** Đường dẫn ảnh trong qtfood.json tương đối so với /public/images */
export const img = (path: string) => `/images/${path}`;

export const formatPrice = (value: number) => `${value.toLocaleString("vi-VN")}đ`;

/** "2025-06-24" → "24/06/2025" */
export const formatDate = (iso: string) => iso.split("-").reverse().join("/");

export const productBySlug = (slug: string) => content.products.find((p) => p.slug === slug);

/** Ảnh khai trương khai-truong-01..N — số lớn là cơ sở mới nhất, nên xếp mới nhất lên trước */
export const franchiseGallery = () => {
  const { count, dir } = content.franchise.gallery;
  return Array.from({ length: count }, (_, i) => img(`${dir}/khai-truong-${String(count - i).padStart(2, "0")}.jpg`));
};
