import type { Metadata } from "next";
import { RenderBlocks } from "@/blocks";
import { homeBlocks } from "@/content/pages/home";
import { getPosts } from "@/lib/data/posts";
import { toPostCard } from "@/components/post/to-post-card";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function HomePage() {
  const posts = await getPosts(3);
  return <RenderBlocks blocks={homeBlocks(posts.map(toPostCard))} />;
}
