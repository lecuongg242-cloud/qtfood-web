import { Fragment } from "react";
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
      {/* 4 chữ vàng: chữ đặc màu thương hiệu, hiện đủ cả 4 chữ ngay trong khung nhìn */}
      <Container>
        <div className="border-y border-line py-8 lg:py-10">
          {/* Điện thoại: lưới 2×2; từ sm: một hàng dàn đều; ngựa ngăn cách từ lg */}
          <ul className="grid grid-cols-2 gap-y-6 sm:flex sm:items-center sm:justify-between">
            {words.map((w, i) => (
              <Fragment key={w}>
                {i > 0 && (
                  <li aria-hidden className="hidden lg:block">
                    <HorseMark className="h-[clamp(1rem,1.6vw,1.75rem)] w-auto text-[#ed1c24]/80" />
                  </li>
                )}
                <li
                  data-reveal
                  className="text-center text-[15vw] font-extrabold uppercase leading-none tracking-[-0.04em] text-accent sm:text-[clamp(2.5rem,6.5vw,6rem)] lg:text-[clamp(3rem,6vw,6rem)]"
                >
                  {w}
                </li>
              </Fragment>
            ))}
          </ul>
        </div>
      </Container>

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
