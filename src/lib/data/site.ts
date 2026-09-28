import "server-only";
import { cache } from "react";
import type { SiteData } from "@/content/types";
import { getSiteSettings } from "./settings";
import { getCertification } from "./certifications";

/** Dữ liệu chung cho các trang dựng từ block (xem `SiteData`) */
export const getSiteData = cache(async (): Promise<SiteData> => {
  const [{ company }, certification] = await Promise.all([getSiteSettings(), getCertification()]);
  return { company, certification };
});
