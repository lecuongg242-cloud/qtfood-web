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
  items: { title: string; text: string }[];
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
        // Có ảnh bên cạnh → cột hẹp, xếp 1 cột cho dễ đọc
        !image && "sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        columns === 4 && "lg:grid-cols-4",
      )}
    >
      {items.map((item, i) => (
        <li
          key={item.title}
          data-reveal
          className="rounded-[1.5rem] border border-line bg-card p-7 transition-[transform,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-28px_rgb(16_36_15/0.35)]"
        >
          {numbered ? (
            <span className="text-sm font-extrabold text-accent">{String(i + 1).padStart(2, "0")}</span>
          ) : (
            <span className="grid h-10 w-10 place-items-center rounded-full bg-btn text-btn-ink">
              <Check className="h-5 w-5" />
            </span>
          )}
          <h3 className="mt-5 text-lg font-extrabold leading-snug tracking-tight">{item.title}</h3>
          <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">{item.text}</p>
        </li>
      ))}
    </ul>
  );

  return (
    <Section tone={tone} className="py-24 lg:py-32">
      <Container>
        {image ? (
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <SectionHeading eyebrow={eyebrow} title={title} description={description} />
              <div data-clip className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[1.75rem]">
                <div data-parallax="0.12" className="absolute inset-[-8%]">
                  <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                </div>
              </div>
            </div>
            <div className="lg:pt-4">{grid}</div>
          </div>
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
