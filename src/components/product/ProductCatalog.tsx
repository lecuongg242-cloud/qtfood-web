import Link from "next/link";
import clsx from "clsx";
import { Container, Section } from "@/components/ui/Section";
import { ProductCard, productMeta } from "./ProductCard";
import type { ProductView } from "@/lib/data/products";

type Props = {
  categories: { slug: string; name: string; note?: string | null }[];
  active?: string;
  products: ProductView[];
};

/** Tab nhóm (lọc bằng đường dẫn → chia sẻ được, SEO tốt) + lưới sản phẩm */
export function ProductCatalog({ categories, active, products }: Props) {
  const tabs = [{ slug: "", name: "Tất cả", href: "/san-pham" }, ...categories.map((c) => ({ ...c, href: `/san-pham/${c.slug}` }))];
  const activeNote = categories.find((c) => c.slug === active)?.note;

  return (
    <Section tone="base" className="pb-24 lg:pb-32">
      <Container>
        <nav aria-label="Nhóm sản phẩm" className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <ul className="flex w-max gap-2 rounded-full border border-line bg-card p-1.5">
            {tabs.map((t) => {
              const isActive = (active ?? "") === t.slug;
              return (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    scroll={false}
                    aria-current={isActive ? "page" : undefined}
                    className={clsx(
                      "block rounded-full px-5 py-2.5 text-sm font-bold transition-colors duration-300",
                      isActive ? "bg-[#4cb448] text-[#0f230f]" : "text-muted hover:text-ink",
                    )}
                  >
                    {t.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {activeNote && <p className="mt-5 text-muted">{activeNote}</p>}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <div key={p.slug} data-reveal className="h-full">
              <ProductCard
                href={p.href}
                name={p.name}
                image={p.images[0] ?? { src: "/images/brand/banner-nhuong-quyen-lau-pho-ngua.jpg", alt: p.name }}
                summary={p.summary}
                priceLabel={p.priceLabel}
                unit={p.specs.priceUnit}
                meta={productMeta(p.specs)}
                tag={p.category.name}
                transitionName={`product-${p.slug}`}
              />
            </div>
          ))}
        </div>
        {products.length === 0 && <p className="mt-10 text-muted">Chưa có sản phẩm trong nhóm này.</p>}
      </Container>
    </Section>
  );
}
