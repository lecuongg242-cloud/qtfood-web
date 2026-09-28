import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/data/products";
import { getPosts } from "@/lib/data/posts";
import { getPolicies } from "@/lib/data/policies";
import { absoluteUrl } from "@/lib/site-url";

const staticPages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/nhuong-quyen", priority: 0.9, changeFrequency: "monthly" },
  { path: "/san-pham", priority: 0.9, changeFrequency: "weekly" },
  { path: "/gioi-thieu", priority: 0.7, changeFrequency: "yearly" },
  { path: "/he-thong-co-so", priority: 0.7, changeFrequency: "monthly" },
  { path: "/tin-tuc", priority: 0.7, changeFrequency: "weekly" },
  { path: "/nhuong-quyen/chinh-sach", priority: 0.6, changeFrequency: "yearly" },
  { path: "/lien-he", priority: 0.6, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts, policies] = await Promise.all([getProducts(), getPosts(), getPolicies()]);
  const categories = [...new Set(products.map((p) => p.category.slug))];
  return [
    ...staticPages.map((p) => ({ url: absoluteUrl(p.path), priority: p.priority, changeFrequency: p.changeFrequency })),
    ...categories.map((c) => ({ url: absoluteUrl(`/san-pham/${c}`), priority: 0.8, changeFrequency: "weekly" as const })),
    ...products.map((p) => ({
      url: absoluteUrl(p.href),
      priority: 0.8,
      changeFrequency: "monthly" as const,
      images: p.images.slice(0, 1).map((i) => absoluteUrl(i.src)),
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(p.href),
      lastModified: p.updatedAt,
      priority: 0.6,
      changeFrequency: "monthly" as const,
      images: p.cover ? [absoluteUrl(p.cover.src)] : undefined,
    })),
    ...policies.map((p) => ({ url: absoluteUrl(p.href), lastModified: p.updatedAt, priority: 0.3, changeFrequency: "yearly" as const })),
  ];
}
