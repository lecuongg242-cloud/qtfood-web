import "server-only";
import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Media } from "@/payload-types";

export type StoreView = {
  id: number;
  name: string;
  province: string;
  address: string;
  phone?: string | null;
  mapUrl?: string | null;
  image?: { src: string; alt: string };
};

export const getStores = cache(async (): Promise<StoreView[]> => {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "stores",
    where: { active: { equals: true } },
    sort: "province",
    limit: 500,
    depth: 1,
  });
  return docs.map((s) => {
    const img = typeof s.image === "object" && s.image ? (s.image as Media) : null;
    return {
      id: s.id,
      name: s.name,
      province: s.province,
      address: s.address,
      phone: s.phone,
      mapUrl: s.mapUrl,
      image: img?.url ? { src: img.url, alt: img.alt } : undefined,
    };
  });
});
