import type { PostView } from "@/lib/data/posts";
import type { PostCardData } from "./PostCard";

/** Chỉ lấy dữ liệu cần cho thẻ bài (không gửi nội dung bài xuống client) */
export const toPostCard = (p: PostView): PostCardData => ({
  href: p.href,
  title: p.title,
  excerpt: p.excerpt,
  categoryLabel: p.category.label,
  dateLabel: p.dateLabel,
  cover: p.cover && { src: p.cover.src, alt: p.cover.alt },
});
