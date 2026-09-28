import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Container, Section } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/icons";
import { PostCard } from "@/components/post/PostCard";
import { ShareButtons } from "@/components/post/ShareButtons";
import { toPostCard } from "@/components/post/to-post-card";
import { getPost, getPosts } from "@/lib/data/posts";
import { absoluteUrl } from "@/lib/site-url";
import { getSiteSettings } from "@/lib/data/settings";

type Params = PageProps<"/tin-tuc/[slug]">;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) return {};
  return {
    title: p.seo.title || p.title,
    description: p.seo.description || p.excerpt,
    alternates: { canonical: p.href },
    openGraph: {
      type: "article",
      publishedTime: p.publishedAt,
      modifiedTime: p.updatedAt,
      images: p.cover ? [p.cover.src] : undefined,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const { isEnabled: draft } = await draftMode();
  const post = await getPost(slug, draft);
  if (!post) notFound();

  const [all, { company }] = await Promise.all([getPosts(), getSiteSettings()]);
  // Ưu tiên bài cùng chuyên mục, sau đó bài mới nhất
  const others = all.filter((p) => p.slug !== slug);
  const related = [...others.filter((p) => p.category.value === post.category.value), ...others.filter((p) => p.category.value !== post.category.value)].slice(0, 3);
  const url = absoluteUrl(post.href);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.cover ? [absoluteUrl(post.cover.src)] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: company.legalName, url: absoluteUrl("/") },
    publisher: { "@type": "Organization", name: company.legalName, logo: { "@type": "ImageObject", url: absoluteUrl("/brand/logo-qtfood.png") } },
  };

  return (
    <>
      <Section tone="hero" data-hero className="pb-12 pt-28 sm:pt-32 lg:pb-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div data-reveal>
              <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Tin tức", href: "/tin-tuc" }, { label: post.title }]} />
            </div>
            <div data-reveal className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Eyebrow>{post.category.label}</Eyebrow>
              <time dateTime={post.publishedAt} className="flex items-center gap-2 text-sm text-muted">
                <Calendar className="h-4 w-4" />
                {post.dateLabel}
              </time>
            </div>
            <h1 data-split className="mt-5 text-[clamp(2rem,4.4vw,3.4rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-balance">
              {post.title}
            </h1>
            <p data-reveal className="mt-5 text-lg leading-relaxed text-muted text-pretty">
              {post.excerpt}
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="base" className="pb-20 pt-12 lg:pb-28 lg:pt-16">
        <Container>
          {post.cover && (
            <div data-clip className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-[1.75rem] shadow-2xl shadow-black/15">
              <Image src={post.cover.src} alt={post.cover.alt} fill preload quality={85} sizes="(min-width: 1100px) 1024px, 100vw" className="object-cover" />
            </div>
          )}
          <article className="mx-auto mt-12 max-w-3xl lg:mt-16">
            <div className="prose-qt">
              <RichText data={post.body} />
            </div>
            <div className="mt-12 border-t border-line pt-8">
              <ShareButtons url={url} title={post.title} />
            </div>
          </article>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="alt" className="py-20 lg:py-28">
          <Container>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold leading-[1.16] tracking-tight">Bài viết liên quan</h2>
              <Button href="/tin-tuc" variant="ghost">
                Tất cả tin tức
              </Button>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} {...toPostCard(p)} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }} />
    </>
  );
}
