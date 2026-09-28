import raw from "@content/qtfood.json";
import type { SiteContent } from "./types";

export const content = raw as unknown as SiteContent;

/** Đường dẫn ảnh trong qtfood.json tương đối so với /public/images */
export const img = (path: string) => `/images/${path}`;

export const formatPrice = (value: number) => `${value.toLocaleString("vi-VN")}đ`;

/** "2025-06-24" → "24/06/2025" */
export const formatDate = (iso: string) => iso.split("-").reverse().join("/");

export const productBySlug = (slug: string) => content.products.find((p) => p.slug === slug);

export const franchiseGallery = () =>
  Array.from({ length: content.franchise.gallery.count }, (_, i) =>
    img(`${content.franchise.gallery.dir}/khai-truong-${String(i + 1).padStart(2, "0")}.jpg`),
  );
