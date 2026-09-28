import "server-only";
import { cache } from "react";
import type { SiteData } from "@/content/types";
import { getSiteSettings } from "./settings";
import { getCertification } from "./certifications";
import { getProducts } from "./products";

/** Dữ liệu chung cho các trang dựng từ block (xem `SiteData`) */
export const getSiteData = cache(async (): Promise<SiteData> => {
  const [{ company, storeCount }, certification, products] = await Promise.all([getSiteSettings(), getCertification(), getProducts()]);
  return { company, certification, stats: { stores: storeCount, products: products.length } };
});
