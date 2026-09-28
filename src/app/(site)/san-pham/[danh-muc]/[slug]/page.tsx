import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Container, Section } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Check, Phone, ShieldCheck } from "@/components/ui/icons";
import { ProductGallery } from "@/components/product/ProductGallery";
import { OrderButton } from "@/components/product/OrderButton";
import { ProductCard, productMeta } from "@/components/product/ProductCard";
import { getProduct, getProducts } from "@/lib/data/products";
import { siteUrl } from "@/lib/site-url";
import { getSiteSettings } from "@/lib/data/settings";

type Params = PageProps<"/san-pham/[danh-muc]/[slug]">;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ "danh-muc": p.category.slug, slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return {};
  return {
    title: p.seo.title || p.name,
    description: p.seo.description || p.summary,
    alternates: { canonical: p.href },
    openGraph: { images: p.images[0] ? [p.images[0].src] : undefined },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug, "danh-muc": categorySlug } = await params;
  const { isEnabled: draft } = await draftMode();
  const product = await getProduct(slug, draft);
  if (!product || product.category.slug !== categorySlug) notFound();

  const { company, mainHotline } = await getSiteSettings();
  const related = (await getProducts(categorySlug)).filter((p) => p.slug !== slug).slice(0, 4);
  const { specs } = product;
  const sellable = Boolean(product.priceLabel);
  // Phần sau ":" hoặc "–" của tiêu đề phụ (vd "Lẩu Ngựa QT Food: Tuyệt phẩm…" → "Tuyệt phẩm…")
  const tagline = product.headline?.split(/\s*[:–]\s*/)[1];
  const orderProduct = { slug: product.slug, name: product.name, price: specs.price, unit: specs.priceUnit };
  const specRows = [
    ["Khối lượng tịnh", specs.netWeight],
    ["Hạn sử dụng", specs.shelfLife],
    ["Bảo quản", specs.storage],
    ["Cách dùng", specs.usage],
  ].filter((r): r is [string, string] => Boolean(r[1]));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: product.images.map((i) => (i.src.startsWith("http") ? i.src : `${siteUrl()}${i.src}`)),
    brand: { "@type": "Brand", name: company.brand },
    ...(specs.price && {
      offers: {
        "@type": "Offer",
        price: specs.price,
        priceCurrency: "VND",
        availability: "https://schema.org/InStock",
        url: `${siteUrl()}${product.href}`,
        seller: { "@type": "Organization", name: company.legalName },
      },
    }),
  };

  return (
    <>
      <Section tone="base" className="pb-20 pt-28 sm:pt-32 lg:pb-28">
        <Container>
          <Breadcrumb
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Sản phẩm", href: "/san-pham" },
              { label: product.category.name, href: `/san-pham/${product.category.slug}` },
              { label: product.name },
            ]}
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <ProductGallery
              images={product.images}
              transitionName={`product-${product.slug}`}
              badge={
                product.isoBadge ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#10240f] shadow">
                    <ShieldCheck className="h-4 w-4 text-[#2d8a2a]" /> ISO 22000:2018
                  </span>
                ) : undefined
              }
            />

            <div className="lg:pt-4">
              <Eyebrow>{product.category.name}</Eyebrow>
              <h1 className="mt-4 text-[clamp(2.2rem,4.4vw,3.5rem)] font-extrabold leading-[1.12] tracking-[-0.03em]">{product.name}</h1>
              {tagline && <p className="mt-2 font-serif-accent text-xl">{tagline}</p>}
              <p className="mt-5 text-lg leading-relaxed text-muted text-pretty">{product.summary}</p>

              <div className="mt-7 rounded-2xl border border-line bg-card p-5">
                {sellable ? (
                  <p className="leading-none">
                    <span className="text-4xl font-extrabold tracking-tight text-accent">{product.priceLabel}</span>
                    {specs.priceUnit && <span className="text-muted"> / {specs.priceUnit}</span>}
                  </p>
                ) : (
                  <p className="font-semibold">Phục vụ tại hệ thống hơn 50 cơ sở nhượng quyền QT FOOD</p>
                )}
                {specRows.length > 0 && (
                  <dl className="mt-5 divide-y divide-[var(--line)] border-t border-line text-[0.95rem]">
                    {specRows.map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-4 py-3">
                        <dt className="text-muted">{k}</dt>
                        <dd className="font-semibold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>

              {product.highlights.length > 0 && (
                <ul className="mt-7 space-y-3">
                  {product.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-btn text-btn-ink">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                {sellable ? (
                  <OrderButton product={orderProduct} hotline={mainHotline} />
                ) : (
                  <Link href="/nhuong-quyen" className="btn btn-primary">
                    Nhượng quyền {product.name.toLowerCase()}
                  </Link>
                )}
                <a href={`tel:${mainHotline.number}`} className="btn btn-ghost">
                  <Phone className="h-4 w-4" />
                  <span>{mainHotline.display}</span>
                </a>
              </div>
              {sellable && <p className="mt-4 text-sm text-muted">QT FOOD gọi xác nhận đơn và báo phí giao hàng trước khi giao.</p>}
            </div>
          </div>
        </Container>
      </Section>

      {product.body && (
        <Section tone="alt" className="py-20 lg:py-28">
          <Container>
            <div className="mx-auto max-w-3xl">
              <Eyebrow>Chi tiết sản phẩm</Eyebrow>
              <div className="prose-qt mt-6">
                <RichText data={product.body} />
              </div>
            </div>
          </Container>
        </Section>
      )}

      {related.length > 0 && (
        <Section tone="base" className="py-20 lg:py-28">
          <Container>
            <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold leading-[1.16] tracking-tight">Sản phẩm cùng nhóm</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard
                  key={p.slug}
                  href={p.href}
                  name={p.name}
                  image={p.images[0]}
                  summary={p.summary}
                  priceLabel={p.priceLabel}
                  unit={p.specs.priceUnit}
                  meta={productMeta(p.specs)}
                  transitionName={`product-${p.slug}`}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Thanh đặt hàng dính đáy — điện thoại */}
      {sellable && (
        <div data-sticky-cta data-tone="base" className="fixed inset-x-0 bottom-0 z-30 border-t border-line px-5 py-3 shadow-[0_-8px_24px_-12px_rgb(16_36_15/0.25)] lg:hidden">
          <div className="flex items-center justify-between gap-4">
            <p className="min-w-0 leading-tight">
              <span className="block truncate text-sm text-muted">{product.name}</span>
              <span className="text-xl font-extrabold text-accent">{product.priceLabel}</span>
              {specs.priceUnit && <span className="text-sm text-muted"> / {specs.priceUnit}</span>}
            </p>
            <OrderButton product={orderProduct} hotline={mainHotline} className="shrink-0 !py-3" />
          </div>
        </div>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
