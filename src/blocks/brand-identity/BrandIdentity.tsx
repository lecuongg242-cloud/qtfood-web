import Image from "next/image";
import { Container, Section, type Tone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export type BrandIdentityProps = {
  tone?: Tone;
  title: string;
  text: string;
  slogan: string;
  symbol: string;
  gestures: string[];
  colors: { name: string; hex: string; meaning: string }[];
  logo: string;
};

/** Ý nghĩa logo & màu sắc thương hiệu */
export function BrandIdentity({ tone = "alt", title, text, slogan, symbol, gestures, colors, logo }: BrandIdentityProps) {
  return (
    <Section tone={tone} className="py-24 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading eyebrow="Bộ nhận diện" title={title} description={text} />
          <p data-reveal className="mt-8 font-serif-accent text-2xl">{slogan}</p>
          <dl className="mt-10 space-y-6">
            <div data-reveal>
              <dt className="text-sm font-bold uppercase tracking-[0.14em] text-muted">Biểu tượng</dt>
              <dd className="mt-2 text-xl font-extrabold tracking-tight">{symbol}</dd>
            </div>
            <div data-reveal>
              <dt className="text-sm font-bold uppercase tracking-[0.14em] text-muted">Thông điệp</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {gestures.map((g) => (
                  <span key={g} className="rounded-full border border-line bg-card px-4 py-2 text-sm font-bold">
                    {g}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        <div className="space-y-5">
          <div data-reveal className="grid place-items-center rounded-[2rem] border border-line bg-white p-10 sm:p-14">
            <Image src={logo} alt="Logo QT FOOD" width={1600} height={708} sizes="(min-width: 1024px) 40vw, 80vw" className="h-auto w-full max-w-md" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {colors.map((c) => (
              <div key={c.hex} data-reveal className="overflow-hidden rounded-[1.5rem] border border-line bg-card">
                <div className="flex h-28 items-end p-5 text-white" style={{ background: c.hex }}>
                  <span className="text-sm font-bold uppercase tracking-wider">{c.hex}</span>
                </div>
                <div className="p-5">
                  <p className="font-extrabold">{c.name}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
