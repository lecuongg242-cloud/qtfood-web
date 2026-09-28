import Image from "next/image";
import { Container, Section, type Tone } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Rich";

export type CtaBandProps = {
  tone?: Tone;
  title: string;
  description?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  decor?: string;
};

/** Dải kêu gọi hành động cuối trang */
export function CtaBand({ tone = "brand", title, description, primary, secondary, decor }: CtaBandProps) {
  return (
    <Section tone={tone} className="overflow-hidden py-20 lg:py-28">
      {decor && (
        <Image src={decor} alt="" aria-hidden width={1774} height={887} className="decor absolute inset-x-0 bottom-0 h-auto w-full opacity-[0.18]" />
      )}
      <Container className="relative text-center">
        <h2 data-split className="rich mx-auto max-w-3xl text-[clamp(2rem,4.2vw,3.4rem)] font-extrabold leading-[1.16] tracking-[-0.025em] text-balance">
          <Rich text={title} />
        </h2>
        {description && (
          <p data-reveal className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {description}
          </p>
        )}
        <div data-reveal className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href={primary.href}>{primary.label}</Button>
          {secondary && (
            <Button href={secondary.href} variant="ghost">
              {secondary.label}
            </Button>
          )}
        </div>
      </Container>
    </Section>
  );
}
