import Image from "next/image";
import { Container, Section, type Tone } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Rich";
import { Check } from "@/components/ui/icons";

export type FranchiseTeaserProps = {
  tone?: Tone;
  eyebrow: string;
  stat: { value: number; suffix: string; label: string };
  title: string;
  intro: string;
  benefits: { title: string; text: string }[];
  gallery: string[];
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

export function FranchiseTeaser({
  tone = "brand",
  eyebrow,
  stat,
  title,
  intro,
  benefits,
  gallery,
  primary,
  secondary,
}: FranchiseTeaserProps) {
  const half = Math.ceil(gallery.length / 2);
  const rows = [gallery.slice(0, half), gallery.slice(half)];

  return (
    <Section tone={tone} className="overflow-hidden py-24 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <div data-reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <p data-reveal className="mt-6 flex items-start gap-2 leading-none">
            <span className="text-[clamp(6rem,15vw,11rem)] font-extrabold tracking-[-0.06em] text-accent">
              <span data-count={stat.value}>{stat.value}</span>
              <span className="align-top text-[0.5em]">{stat.suffix}</span>
            </span>
          </p>
          <h2
            data-split
            className="rich mt-2 text-[clamp(1.8rem,3.4vw,2.8rem)] font-extrabold leading-[1.18] tracking-[-0.02em] text-balance"
          >
            <Rich text={title} />
          </h2>
          <p data-reveal className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            {intro}
          </p>
          <div data-reveal className="mt-9 flex flex-wrap gap-3">
            <Button href={primary.href}>{primary.label}</Button>
            <Button href={secondary.href} variant="ghost">
              {secondary.label}
            </Button>
          </div>
        </div>

        <ul className="grid content-center gap-4 sm:grid-cols-2">
          {benefits.map((b) => (
            <li
              key={b.title}
              data-reveal
              className="rounded-[1.5rem] border border-line bg-card p-6 backdrop-blur transition-transform duration-500 ease-[var(--ease-soft)] hover:-translate-y-1.5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-btn text-btn-ink">
                <Check className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-extrabold tracking-tight">{b.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{b.text}</p>
            </li>
          ))}
        </ul>
      </Container>

      {/* Dải ảnh khai trương: 2 hàng cùng chiều, cùng tốc độ, hàng dưới lệch nửa ảnh */}
      <div className="marquee-wrap mt-20 space-y-4" aria-label="Ảnh khai trương các cơ sở nhượng quyền">
        {rows.map((row, r) => (
          <div key={r} className="overflow-hidden">
            <div
              className="marquee gap-4 pr-4"
              style={{ ["--marquee-duration" as string]: "120s", animationDelay: r === 1 ? "-4.6s" : undefined }}
            >
              {[...row, ...row].map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="relative h-56 w-44 shrink-0 overflow-hidden rounded-2xl bg-card sm:h-72 sm:w-56"
                >
                  <Image
                    src={src}
                    alt={i < row.length ? "Khai trương cơ sở nhượng quyền QT FOOD" : ""}
                    fill
                    loading="eager"
                    sizes="224px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
