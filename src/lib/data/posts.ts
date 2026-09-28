import "server-only";
import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Media, Post } from "@/payload-types";
import seedPosts from "@content/posts.json";
import { img } from "@/content/data";
import { postCategoryLabel } from "@/lib/post-categories";

export type PostView = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: { value: string; label: string };
  publishedAt: string;
  /** "28/09/2026" */
  dateLabel: string;
  updatedAt: string;
  cover?: { src: string; alt: string; width?: number; height?: number };
  body: Post["body"];
  href: string;
  seo: { title?: string | null; description?: string | null };
};

const getClient = cache(() => getPayload({ config }));

/** Ảnh bìa từ CMS; bài chưa có ảnh trong CMS (chưa gắn Vercel Blob) → ảnh bìa mẫu trong public/images theo slug */
function toCover(p: Post): PostView["cover"] {
  const m = typeof p.cover === "object" && p.cover ? (p.cover as Media) : null;
  if (m?.url) return { src: m.url, alt: m.alt, width: m.width ?? undefined, height: m.height ?? undefined };
  const fallback = seedPosts.posts.find((x) => x.slug === p.slug)?.cover;
  return fallback ? { src: img(fallback), alt: p.title } : undefined;
}

function toView(p: Post): PostView {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: { value: p.category, label: postCategoryLabel(p.category) },
    publishedAt: p.publishedAt,
    dateLabel: formatDate(p.publishedAt),
    updatedAt: p.updatedAt,
    cover: toCover(p),
    body: p.body,
    href: `/tin-tuc/${p.slug}`,
    seo: { title: p.seo?.title, description: p.seo?.description },
  };
}

export const getPosts = cache(async (limit = 100) => {
  const payload = await getClient();
  const { docs } = await payload.find({
    collection: "posts",
    where: { _status: { equals: "published" } },
    sort: "-publishedAt",
    limit,
    depth: 1,
  });
  return docs.map(toView);
});

export const getPost = cache(async (slug: string) => {
  const payload = await getClient();
  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug }, _status: { equals: "published" } },
    limit: 1,
    depth: 1,
  });
  return docs[0] ? toView(docs[0]) : null;
});

/** "2026-09-28T…" → "28/09/2026" (giờ Việt Nam) */
const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Asia/Ho_Chi_Minh" }).format(new Date(iso));
