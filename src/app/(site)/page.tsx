import type { Metadata } from "next";
import { RenderBlocks } from "@/blocks";
import { homeBlocks } from "@/content/pages/home";
import { getPosts } from "@/lib/data/posts";
import { getSiteData } from "@/lib/data/site";
import { getProducts } from "@/lib/data/products";
import { toPostCard } from "@/components/post/to-post-card";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function HomePage() {
  const [site, posts, products] = await Promise.all([getSiteData(), getPosts(3), getProducts()]);
  return <RenderBlocks blocks={homeBlocks(site, posts.map(toPostCard), products)} />;
}
