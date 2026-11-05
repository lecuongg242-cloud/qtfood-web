import { Container, Section, type Tone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PostCard, type PostCardData } from "@/components/post/PostCard";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowUpRight } from "@/components/ui/icons";

export type NewsListProps = {
  tone?: Tone;
  eyebrow: string;
  title: string;
  description?: string;
  posts: PostCardData[];
  cta: { label: string; href: string };
  /** Video TikTok nổi bật (đã ghim trên kênh) — phát ngay trên web khi người xem bấm */
  videos?: { ids: string[]; channel: { label: string; url: string } };
};

/** Trình phát nhúng chính thức của TikTok: không tự phát, chỉ tải khi cuộn tới */
const tiktokPlayer = (id: string) =>
  `https://www.tiktok.com/player/v1/${id}?autoplay=0&music_info=0&description=1&rel=0&native_context_menu=0`;

/** Tin mới nhất (trang chủ). Chưa có bài nào → không hiển thị. */
export function NewsList({ tone = "base", eyebrow, title, description, posts, cta, videos }: NewsListProps) {
  if (posts.length === 0 && !videos?.ids.length) return null;
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

        {videos && videos.ids.length > 0 && (
          <div className="mt-16 grid items-center gap-10 rounded-[2rem] border border-line bg-card p-6 sm:p-10 lg:mt-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div data-reveal>
              <Eyebrow>Video nổi bật</Eyebrow>
              <h3 className="mt-4 text-[clamp(1.6rem,2.8vw,2.3rem)] font-extrabold leading-[1.18] tracking-[-0.02em] text-balance">
                Xem QT FOOD trên TikTok
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">
                Khai trương cơ sở mới, món ngon tại quán và hậu trường hệ thống — cập nhật thường xuyên trên kênh {videos.channel.label}.
              </p>
              <a href={videos.channel.url} target="_blank" rel="noopener" className="btn btn-primary mt-7">
                <span>Theo dõi kênh TikTok</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            {/* Điện thoại: vuốt ngang từng video; từ sm: 2 cột */}
            <ul className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 [scrollbar-width:none]">
              {videos.ids.map((id, i) => (
                <li key={id} data-reveal className="w-[74%] shrink-0 snap-center overflow-hidden rounded-2xl bg-black sm:w-auto shadow-[0_24px_48px_-28px_rgb(16_36_15/0.45)]">
                  <iframe
                    src={tiktokPlayer(id)}
                    title={`Video TikTok QT FOOD ${i + 1}`}
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share"
                    allowFullScreen
                    className="block aspect-[9/16] w-full border-0"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </Section>
  );
}
