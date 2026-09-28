import "server-only";
import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Media, Product, ProductCategory } from "@/payload-types";
import { content, formatPrice, img } from "@/content/data";

export type ProductImage = { src: string; alt: string; width?: number; height?: number };

export type ProductView = {
  id: number;
  slug: string;
  name: string;
  headline?: string | null;
  summary: string;
  highlights: string[];
  body: Product["body"];
  specs: NonNullable<Product["specs"]>;
  priceLabel?: string;
  category: { slug: string; name: string; note?: string | null };
  images: ProductImage[];
  featured: boolean;
  isoBadge: boolean;
  href: string;
  seo: { title?: string | null; description?: string | null };
};

const getClient = cache(() => getPayload({ config }));

/** Ảnh từ CMS; nếu sản phẩm chưa có ảnh trong CMS (chưa gắn Vercel Blob) → dùng ảnh trong public/images theo slug */
function toImages(p: Product): ProductImage[] {
  const fromCms = (p.images ?? [])
    .filter((m): m is Media => typeof m === "object" && m !== null && Boolean(m.url))
    .map((m) => ({ src: m.url as string, alt: m.alt, width: m.width ?? undefined, height: m.height ?? undefined }));
  if (fromCms.length) return fromCms;
  const fallback = content.products.find((x) => x.slug === p.slug)?.images ?? [];
  return fallback.map((path, i) => ({ src: img(path), alt: `${p.name} – ảnh ${i + 1}` }));
}

function toView(p: Product): ProductView {
  const cat = p.category as ProductCategory;
  const specs = p.specs ?? {};
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    headline: p.headline,
    summary: p.summary,
    highlights: (p.highlights ?? []).map((h) => h.text),
    body: p.body,
    specs,
    priceLabel: specs.price ? formatPrice(specs.price) : undefined,
    category: { slug: cat?.slug ?? "", name: cat?.name ?? "", note: cat?.note },
    images: toImages(p),
    featured: Boolean(p.featured),
    isoBadge: Boolean(p.isoBadge),
    href: `/san-pham/${cat?.slug}/${p.slug}`,
    seo: { title: p.seo?.title, description: p.seo?.description },
  };
}

export const getCategories = cache(async () => {
  const payload = await getClient();
  const { docs } = await payload.find({ collection: "product-categories", sort: "order", limit: 50, depth: 0 });
  return docs.map((c) => ({ slug: c.slug, name: c.name, note: c.note }));
});

export const getProducts = cache(async (categorySlug?: string) => {
  const payload = await getClient();
  const { docs } = await payload.find({
    collection: "products",
    where: {
      _status: { equals: "published" },
      ...(categorySlug ? { "category.slug": { equals: categorySlug } } : {}),
    },
    sort: "order",
    limit: 200,
    depth: 1,
  });
  return docs.map(toView);
});

export const getProduct = cache(async (slug: string) => {
  const payload = await getClient();
  const { docs } = await payload.find({
    collection: "products",
    where: { slug: { equals: slug }, _status: { equals: "published" } },
    limit: 1,
    depth: 1,
  });
  return docs[0] ? toView(docs[0]) : null;
});
