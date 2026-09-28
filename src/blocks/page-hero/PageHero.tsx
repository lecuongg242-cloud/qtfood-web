import Image from "next/image";
import { Container, Section, type Tone } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Rich";
import { Breadcrumb, type Crumb } from "@/components/ui/Breadcrumb";

export type PageHeroProps = {
  tone?: Tone;
  breadcrumb: Crumb[];
  eyebrow?: string;
  title: string;
  description?: string;
  image?: { src: string; alt: string };
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  stats?: { value: number; suffix: string; label: string }[];
  decor?: string;
};

/** Tiêu đề trang con — gọn hơn Hero trang chủ, có breadcrumb, ảnh tuỳ chọn. */
export function PageHero({ tone = "hero", breadcrumb, eyebrow, title, description, image, primary, secondary, stats, decor }: PageHeroProps) {
  return (
    <Section tone={tone} data-hero className="overflow-hidden pb-16 pt-32 sm:pt-36 lg:pb-24">
      {decor && (
        <Image src={decor} alt="" aria-hidden width={2048} height={1025} className="decor absolute inset-x-0 bottom-0 h-auto w-full opacity-[0.14]" />
      )}
      <Container className={image ? "relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16" : "relative"}>
        <div className={image ? "" : "max-w-4xl"}>
          <div data-reveal>
            <Breadcrumb items={breadcrumb} />
          </div>
          {eyebrow && (
            <div data-reveal className="mt-8">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          )}
          <h1
            data-split
            className="rich mt-5 text-[clamp(2.3rem,5vw,4.2rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-balance"
          >
            <Rich text={title} />
          </h1>
          {description && (
            <p data-reveal className="mt-6 max-w-2xl text-lg leading-relaxed text-muted text-pretty">
              {description}
            </p>
          )}
          {(primary || secondary) && (
            <div data-reveal className="mt-9 flex flex-wrap gap-3">
              {primary && <Button href={primary.href}>{primary.label}</Button>}
              {secondary && (
                <Button href={secondary.href} variant="ghost">
                  {secondary.label}
                </Button>
              )}
            </div>
          )}
          {stats && (
            <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-5 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} data-reveal className="border-l-2 border-[#4cb448] pl-4">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold leading-none tracking-tight">
                    <span data-count={s.value}>{s.value}</span>
                    <span className="text-accent">{s.suffix}</span>
                  </dd>
                  <dd className="mt-2 text-sm leading-snug text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        {image && (
          <div data-clip className="relative aspect-[4/3.6] overflow-hidden rounded-[2rem] shadow-2xl shadow-black/15">
            <div data-parallax="0.12" className="absolute inset-[-8%]">
              <Image src={image.src} alt={image.alt} fill preload quality={85} sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
