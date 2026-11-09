import { Container, Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { HeroSlides, type HeroSlide } from "./HeroSlides";

export type HeroCoverProps = {
  /** Tiêu đề cho SEO/đọc màn hình — chữ đã nằm sẵn trong ảnh bìa nên ẩn đi */
  title: string;
  /** Ảnh bìa — từ 2 ảnh trở lên thì tự chuyển luân phiên */
  images: HeroSlide[];
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  stats: { prefix?: string; value: number; suffix: string; label: string }[];
};

/** Hero dạng ảnh bìa thiết kế sẵn: hiện trọn ảnh (không cắt chữ), CTA + số liệu ở dải bên dưới */
export function HeroCover(p: HeroCoverProps) {
  return (
    <Section tone="hero" data-hero className="overflow-hidden pt-[76px] sm:pt-[84px]">
      <h1 className="sr-only">{p.title}</h1>

      {/* Ảnh hiện trọn theo đúng tỉ lệ gốc (không cắt chữ). Máy tính: giới hạn chiều cao để dải nút + số liệu
          vẫn nằm trong màn hình đầu tiên; phần trống hai bên lấp bằng chính ảnh làm mờ. */}
      <HeroSlides slides={p.images} />

      <Container className="flex flex-col gap-8 py-8 lg:flex-row lg:items-center lg:justify-between lg:py-10">
        <div data-reveal className="flex flex-wrap gap-3 lg:shrink-0 lg:flex-nowrap">
          <Button href={p.primary.href}>{p.primary.label}</Button>
          <Button href={p.secondary.href} variant="ghost">
            {p.secondary.label}
          </Button>
        </div>

        <dl className={`grid gap-4 ${p.stats.length > 3 ? "grid-cols-2 gap-y-6 sm:grid-cols-4 lg:max-w-[40rem]" : "grid-cols-3 lg:min-w-[34rem]"}`}>
          {p.stats.map((s) => (
            <div key={s.label} data-reveal className="border-l-2 border-[#4cb448] pl-4">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-[clamp(1.6rem,2.8vw,2.4rem)] font-extrabold leading-none tracking-tight">
                {s.prefix && <span>{s.prefix}</span>}
                <span data-count={s.value}>{s.value}</span>
                <span className="text-accent">{s.suffix}</span>
              </dd>
              <dd className="mt-2 text-sm leading-snug text-muted text-pretty">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
