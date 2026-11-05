import Image from "next/image";
import clsx from "clsx";
import { Container, Section, type Tone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/icons";

export type CardGridProps = {
  tone?: Tone;
  eyebrow?: string;
  title: string;
  description?: string;
  /** `points`: gạch đầu dòng ý chính (hiện thay cho `text` nếu có) */
  items: { title: string; text?: string; points?: string[] }[];
  /** ảnh minh hoạ bên trái (tuỳ chọn) */
  image?: { src: string; alt: string };
  columns?: 2 | 3 | 4;
  cta?: { label: string; href: string };
  numbered?: boolean;
};

/** Lưới thẻ: lợi ích, lý do chọn, trách nhiệm… */
export function CardGrid({ tone = "base", eyebrow, title, description, items, image, columns = 2, cta, numbered }: CardGridProps) {
  const grid = (
    <ul
      className={clsx(
        "grid gap-4",
        // Có ảnh bên cạnh → xếp 1 cột; ảnh tự giãn cao bằng cột thẻ
        image ? "content-start" : "sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        columns === 4 && "lg:grid-cols-4",
      )}
    >
      {items.map((item, i) => (
        <li
          key={item.title}
          data-reveal
          className="flex flex-col rounded-[1.5rem] border border-line bg-card p-7 transition-[transform,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-28px_rgb(16_36_15/0.35)]"
        >
          {numbered ? (
            <span className="text-sm font-extrabold text-accent">{String(i + 1).padStart(2, "0")}</span>
          ) : (
            <span className="grid h-10 w-10 place-items-center rounded-full bg-btn text-btn-ink">
              <Check className="h-5 w-5" />
            </span>
          )}
          <h3 className="mt-5 text-lg font-extrabold leading-snug tracking-tight">{item.title}</h3>
          {item.points?.length ? (
            <ul className="mt-4 grid gap-2.5 text-[0.95rem] leading-[1.7] text-muted">
              {item.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : (
            item.text && <p className="mt-3 text-[0.95rem] leading-[1.75] text-muted">{item.text}</p>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <Section tone={tone} className="py-24 lg:py-32">
      <Container>
        {image ? (
          <>
            <SectionHeading eyebrow={eyebrow} title={title} description={description} />
            {/* Ảnh và thẻ cùng một hàng, cao bằng nhau → khối vuông vắn, không hụt khoảng trống */}
            <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
              <div data-clip className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] lg:aspect-auto lg:min-h-[26rem]">
                <div data-parallax="0.12" className="absolute inset-[-8%]">
                  <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                </div>
              </div>
              {grid}
            </div>
          </>
        ) : (
          <>
            <SectionHeading eyebrow={eyebrow} title={title} description={description} />
            <div className="mt-14">{grid}</div>
          </>
        )}
        {cta && (
          <div data-reveal className="mt-12">
            <Button href={cta.href} variant="ghost">
              {cta.label}
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}
