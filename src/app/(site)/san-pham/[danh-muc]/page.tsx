import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/blocks/page-hero/PageHero";
import { ProductCatalog } from "@/components/product/ProductCatalog";
import { img } from "@/content/data";
import { getCategories, getProducts } from "@/lib/data/products";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ "danh-muc": c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/san-pham/[danh-muc]">): Promise<Metadata> {
  const { "danh-muc": slug } = await params;
  const category = (await getCategories()).find((c) => c.slug === slug);
  if (!category) return {};
  return { title: `${category.name} – Sản phẩm`, description: category.note ?? undefined, alternates: { canonical: `/san-pham/${slug}` } };
}

export default async function CategoryPage({ params }: PageProps<"/san-pham/[danh-muc]">) {
  const { "danh-muc": slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();
  const products = await getProducts(slug);

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Sản phẩm", href: "/san-pham" }, { label: category.name }]}
        eyebrow="Sản phẩm"
        title={category.name}
        description={category.note ?? undefined}
        decor={img("decor/nui-doi-ruong-bac-thang.jpg")}
      />
      <ProductCatalog categories={categories} active={slug} products={products} />
    </>
  );
}
