import Image from "next/image";
import Link from "next/link";
import { Container, Section, type Tone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

export type ProductListProps = {
  tone?: Tone;
  eyebrow: string;
  title: string;
  description: string;
  items: {
    name: string;
    href: string;
    image: string;
    summary: string;
    price?: string;
    unit?: string;
    meta: string[];
  }[];
  cta: { label: string; href: string };
};

export function ProductList({ tone = "alt", eyebrow, title, description, items, cta }: ProductListProps) {
  return (
    <Section tone={tone} className="py-24 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <div data-reveal className="shrink-0 lg:pb-2">
            <Button href={cta.href} variant="ghost">
              {cta.label}
            </Button>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.name}
              data-reveal
              className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-line bg-card transition-[transform,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-2 hover:shadow-[0_28px_56px_-28px_rgb(16_36_15/0.4)]"
            >
              <Link href={item.href} className="relative block aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.08]"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-extrabold tracking-tight">
                  <Link href={item.href} className="transition-colors hover:text-accent">
                    {item.name}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{item.summary}</p>
                <ul className="mb-6 mt-4 flex flex-wrap gap-1.5">
                  {item.meta.map((m) => (
                    <li key={m} className="rounded-full border border-line px-2.5 py-1 text-xs font-semibold text-muted">
                      {m}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto space-y-4 border-t border-line pt-5">
                  {item.price && (
                    <p className="whitespace-nowrap leading-none">
                      <span className="text-2xl font-extrabold tracking-tight text-accent">{item.price}</span>
                      <span className="text-sm text-muted"> / {item.unit}</span>
                    </p>
                  )}
                  <Link href={item.href} className="btn btn-primary w-full justify-center !py-3 text-sm">
                    Đặt hàng
                    <ArrowRight className="btn-arrow h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
