import { Container, Section, type Tone } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Rich } from "@/components/ui/Rich";
import { HorseMark } from "@/components/ui/icons";

export type CoreValuesProps = {
  tone?: Tone;
  eyebrow: string;
  statement: string;
  items: { key: string; meaning: string; text: string }[];
};

export function CoreValues({ tone = "base", eyebrow, statement, items }: CoreValuesProps) {
  const words = items.map((v) => v.key);
  return (
    <Section tone={tone} className="overflow-hidden py-24 lg:py-32">
      {/* Chữ lớn chạy ngang theo cuộn */}
      <div aria-hidden className="select-none whitespace-nowrap">
        <div
          data-scrub-x="-28"
          className="flex items-center gap-10 text-[clamp(5rem,14vw,12rem)] font-extrabold uppercase leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_color-mix(in_srgb,var(--ink)_22%,transparent)]"
        >
          {[...words, ...words, ...words].map((w, i) => (
            <span key={i} className="flex items-center gap-10">
              {w}
              <HorseMark className="h-[0.4em] w-auto text-[#4cb448]/40" />
            </span>
          ))}
        </div>
      </div>

      <Container className="mt-16 lg:mt-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <div data-reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
            <p
              data-split
              className="rich mt-5 text-[clamp(1.8rem,3.4vw,2.8rem)] font-extrabold leading-[1.2] tracking-[-0.02em] text-balance"
            >
              <Rich text={statement} />
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[1.5rem] bg-[var(--line)] sm:grid-cols-2">
            {items.map((v) => (
              <article key={v.key} data-reveal className="group bg-bg p-7 transition-colors duration-500 hover:bg-card">
                <p className="flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold uppercase tracking-tight text-accent">{v.key}</span>
                  <span className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">{v.meaning}</span>
                </p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
