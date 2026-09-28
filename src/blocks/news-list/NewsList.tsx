import { Container, Section, type Tone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PostCard, type PostCardData } from "@/components/post/PostCard";

export type NewsListProps = {
  tone?: Tone;
  eyebrow: string;
  title: string;
  description?: string;
  posts: PostCardData[];
  cta: { label: string; href: string };
};

/** Tin mới nhất (trang chủ). Chưa có bài nào → không hiển thị. */
export function NewsList({ tone = "base", eyebrow, title, description, posts, cta }: NewsListProps) {
  if (posts.length === 0) return null;
  return (
    <Section tone={tone} className="py-24 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <div data-reveal className="shrink-0 lg:pb-2">
            <Button href={cta.href} variant="ghost">
              {cta.label}
            </Button>
          </div>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <div key={p.href} data-reveal className="h-full">
              <PostCard {...p} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
