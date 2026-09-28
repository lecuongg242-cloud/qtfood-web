import "server-only";
import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";

const getClient = cache(() => getPayload({ config }));

export const getPolicies = cache(async () => {
  const payload = await getClient();
  const { docs } = await payload.find({ collection: "policies", sort: "order", limit: 50, depth: 0 });
  return docs.map((p) => ({ slug: p.slug, title: p.title, summary: p.summary, body: p.body, updatedAt: p.updatedAt, href: `/chinh-sach/${p.slug}` }));
});

export const getPolicy = cache(async (slug: string) => (await getPolicies()).find((p) => p.slug === slug) ?? null);
