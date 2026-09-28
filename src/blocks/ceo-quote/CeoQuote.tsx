import Image from "next/image";
import { Container, Section, type Tone } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";

export type CeoQuoteProps = {
  tone?: Tone;
  name: string;
  title: string;
  photo: string;
  quotes: { keyword: string; text: string }[];
};

/** Lời Tổng giám đốc: ảnh chân dung + các câu "Thành công… / Hạnh phúc…" */
export function CeoQuote({ tone = "brand", name, title, photo, quotes }: CeoQuoteProps) {
  return (
    <Section tone={tone} className="overflow-hidden py-24 lg:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div data-clip className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-card">
          <div data-parallax="0.1" className="absolute inset-[-6%]">
            <Image src={photo} alt={`${title} ${name}`} fill sizes="(min-width: 1024px) 35vw, 90vw" className="object-cover object-top" />
          </div>
        </div>
        <figure>
          <div data-reveal>
            <Eyebrow>Thông điệp lãnh đạo</Eyebrow>
          </div>
          <blockquote className="mt-8 space-y-8">
            {quotes.map((q) => (
              <p key={q.keyword} data-reveal className="text-[clamp(1.8rem,3.6vw,3rem)] font-extrabold leading-[1.2] tracking-[-0.02em]">
                <span className="font-serif-accent">{q.keyword}</span> là {q.text.replace(/^Là /i, "").replace(/^./, (c) => c.toLowerCase())}.
              </p>
            ))}
          </blockquote>
          <figcaption data-reveal className="mt-10 flex items-center gap-4">
            <span className="h-px w-12 bg-current opacity-40" />
            <span>
              <strong className="block text-lg">{name}</strong>
              <span className="text-muted">{title}</span>
            </span>
          </figcaption>
        </figure>
      </Container>
    </Section>
  );
}
