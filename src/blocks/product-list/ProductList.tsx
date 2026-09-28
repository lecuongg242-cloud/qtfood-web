import { Container, Section, type Tone } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";

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
            <div key={item.name} data-reveal className="h-full">
              <ProductCard
                href={item.href}
                name={item.name}
                image={{ src: item.image, alt: item.name }}
                summary={item.summary}
                priceLabel={item.price}
                unit={item.unit}
                meta={item.meta}
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
