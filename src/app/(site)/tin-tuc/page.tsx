import type { Metadata } from "next";
import { PageHero } from "@/blocks/page-hero/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { NewsGrid } from "@/components/post/NewsGrid";
import { toPostCard } from "@/components/post/to-post-card";
import { img } from "@/content/data";
import { getPosts } from "@/lib/data/posts";
import { POST_CATEGORIES } from "@/lib/post-categories";

export const metadata: Metadata = {
  title: "Tin tức & hoạt động",
  description: "Tin tức, khai trương cơ sở nhượng quyền và hoạt động của QT FOOD — thương hiệu Lẩu ngựa & Phở ngựa, đặc sản thịt ngựa tươi sạch.",
  alternates: { canonical: "/tin-tuc" },
};

export default async function NewsPage() {
  const posts = await getPosts();
  // Chỉ hiện nút lọc cho chuyên mục đã có bài
  const categories = POST_CATEGORIES.filter((c) => posts.some((p) => p.category.value === c.value)).map((c) => ({ value: c.value, label: c.label }));
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Tin tức" }]}
        eyebrow="Tin tức & hoạt động"
        title="Câu chuyện *QT FOOD*"
        description="Tin tức thương hiệu, những ngày khai trương cơ sở nhượng quyền và kiến thức thưởng thức đặc sản thịt ngựa."
        decor={img("decor/nui-doi-chim-bay.jpg")}
      />
      <Section tone="base" className="pb-24 pt-14 lg:pb-32 lg:pt-20">
        <Container>
          {posts.length ? (
            <NewsGrid posts={posts.map((p) => ({ ...toPostCard(p), category: p.category.value }))} categories={categories} />
          ) : (
            <p className="py-10 text-lg text-muted">Tin tức đang được cập nhật. Mời bạn quay lại sau.</p>
          )}
        </Container>
      </Section>
    </>
  );
}
