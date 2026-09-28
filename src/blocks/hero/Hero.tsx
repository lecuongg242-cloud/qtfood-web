import Image from "next/image";
import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Rich";
import { HorseMark } from "@/components/ui/icons";

export type HeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  stats: { value: number; suffix: string; label: string }[];
  images: { main: string; secondary: string; mainAlt: string; secondaryAlt: string };
  badge: string;
  decor: string;
};

export function Hero(p: HeroProps) {
  return (
    <Section tone="hero" data-hero className="overflow-hidden pb-16 pt-32 sm:pt-36 lg:min-h-[100svh] lg:pb-24 lg:pt-40">
      {/* Nền trang trí */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-[#4cb448] opacity-[0.10] blur-3xl" />
      <Image
        src={p.decor}
        alt=""
        aria-hidden
        width={2048}
        height={1025}
        className="decor absolute inset-x-0 bottom-0 h-auto w-full opacity-[0.16]"
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <div data-reveal>
            <Eyebrow>{p.eyebrow}</Eyebrow>
          </div>
          <h1
            data-split
            className="rich mt-6 text-[clamp(2.5rem,5.4vw,4.6rem)] font-extrabold leading-[1.12] tracking-[-0.035em] text-balance"
          >
            <Rich text={p.title} />
          </h1>
          <p data-reveal className="mt-7 max-w-xl text-lg leading-relaxed text-muted text-pretty">
            {p.lead}
          </p>
          <div data-reveal className="mt-9 flex flex-wrap gap-3">
            <Button href={p.primary.href}>{p.primary.label}</Button>
            <Button href={p.secondary.href} variant="ghost">
              {p.secondary.label}
            </Button>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4">
            {p.stats.map((s) => (
              <div key={s.label} data-reveal className="border-l-2 border-[#4cb448] pl-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-[clamp(1.9rem,3.4vw,2.75rem)] font-extrabold leading-none tracking-tight">
                  <span data-count={s.value}>{s.value}</span>
                  <span className="text-accent">{s.suffix}</span>
                </dd>
                <dd className="mt-2 text-sm leading-snug text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative ml-auto w-[82%] sm:w-[74%]">
            <div data-clip className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-black/20">
              <div data-parallax="0.12" className="absolute inset-[-8%]">
                <Image
                  src={p.images.main}
                  alt={p.images.mainAlt}
                  fill
                  preload
                  quality={85}
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Huy hiệu xoay */}
            <div className="absolute -left-12 top-10 grid h-32 w-32 place-items-center rounded-full bg-[#4cb448] text-[#0f230f] shadow-xl sm:-left-16 sm:h-36 sm:w-36">
              <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full" aria-hidden>
                <defs>
                  <path id="hero-badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-current text-[7.4px] font-bold uppercase tracking-[0.1em]">
                  {/* textLength = chu vi vòng tròn → chữ giãn đều, phủ kín vòng */}
                  <textPath href="#hero-badge-circle" textLength="236" lengthAdjust="spacing">
                    {p.badge}
                  </textPath>
                </text>
              </svg>
              <HorseMark className="h-7 w-auto sm:h-8" />
            </div>
          </div>

          <div
            data-clip
            className="absolute -bottom-8 left-0 aspect-square w-[46%] overflow-hidden rounded-[1.6rem] border-[6px] border-bg shadow-xl shadow-black/20 sm:w-[42%]"
          >
            <div data-parallax="0.2" className="absolute inset-[-10%]">
              <Image
                src={p.images.secondary}
                alt={p.images.secondaryAlt}
                fill
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
