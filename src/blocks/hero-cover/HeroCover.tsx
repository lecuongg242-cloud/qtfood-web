import Image from "next/image";
import { Container, Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export type HeroCoverProps = {
  /** Tiêu đề cho SEO/đọc màn hình — chữ đã nằm sẵn trong ảnh bìa nên ẩn đi */
  title: string;
  image: { src: string; alt: string; width: number; height: number };
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  stats: { value: number; suffix: string; label: string }[];
};

/** Hero dạng ảnh bìa thiết kế sẵn: hiện trọn ảnh (không cắt chữ), CTA + số liệu ở dải bên dưới */
export function HeroCover(p: HeroCoverProps) {
  return (
    <Section tone="hero" data-hero className="overflow-hidden pt-[76px] sm:pt-[84px]">
      <h1 className="sr-only">{p.title}</h1>

      {/* Ảnh hiện trọn theo đúng tỉ lệ gốc, phủ hết chiều ngang */}
      <Image
        src={p.image.src}
        alt={p.image.alt}
        width={p.image.width}
        height={p.image.height}
        preload
        quality={85}
        sizes="100vw"
        className="block h-auto w-full"
      />

      <Container className="flex flex-col gap-8 py-8 lg:flex-row lg:items-center lg:justify-between lg:py-10">
        <div data-reveal className="flex flex-wrap gap-3">
          <Button href={p.primary.href}>{p.primary.label}</Button>
          <Button href={p.secondary.href} variant="ghost">
            {p.secondary.label}
          </Button>
        </div>

        <dl className="grid grid-cols-3 gap-4 lg:min-w-[34rem]">
          {p.stats.map((s) => (
            <div key={s.label} data-reveal className="border-l-2 border-[#4cb448] pl-4">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-[clamp(1.6rem,2.8vw,2.4rem)] font-extrabold leading-none tracking-tight">
                <span data-count={s.value}>{s.value}</span>
                <span className="text-accent">{s.suffix}</span>
              </dd>
              <dd className="mt-2 text-sm leading-snug text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
