import Image from "next/image";
import { Container, Section, type Tone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export type AboutTeaserProps = {
  tone?: Tone;
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  lines: { title: string; text: string }[];
  quote?: { text: string; author: string; role: string };
  cta?: { label: string; href: string };
};

export function AboutTeaser({ tone = "base", eyebrow, title, intro, image, imageAlt, lines, quote, cta }: AboutTeaserProps) {
  return (
    <Section tone={tone} className="overflow-hidden py-24 lg:py-36">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <div data-clip className="relative aspect-[4/3.4] overflow-hidden rounded-[2rem]">
            <div data-parallax="0.14" className="absolute inset-[-8%]">
              <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
          {quote && (
          <figure
            data-reveal
            data-tone="deep"
            className="relative -mt-16 ml-auto w-[88%] rounded-[1.5rem] p-7 shadow-2xl sm:absolute sm:-bottom-10 sm:-right-6 sm:mt-0 sm:w-[340px]"
          >
            <blockquote className="rich text-xl font-bold leading-snug">
              “{quote.text}”
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted">
              <strong className="text-ink">{quote.author}</strong> · {quote.role}
            </figcaption>
          </figure>
          )}
        </div>

        <div>
          <SectionHeading eyebrow={eyebrow} title={title} />
          <p data-reveal className="mt-6 text-lg leading-relaxed text-muted text-pretty">
            {intro}
          </p>
          <ol className="mt-10 space-y-0 border-t border-line">
            {lines.map((line, i) => (
              <li
                key={line.title}
                data-reveal
                className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-6 transition-colors duration-300"
              >
                <span className="pt-0.5 text-sm font-extrabold text-accent">0{i + 1}</span>
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-1.5">
                    {line.title}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{line.text}</p>
                </div>
              </li>
            ))}
          </ol>
          {cta && (
            <div data-reveal className="mt-10">
              <Button href={cta.href}>{cta.label}</Button>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
