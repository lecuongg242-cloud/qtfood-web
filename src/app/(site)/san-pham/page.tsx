import type { Metadata } from "next";
import { PageHero } from "@/blocks/page-hero/PageHero";
import { RenderBlocks } from "@/blocks";
import { ProductCatalog } from "@/components/product/ProductCatalog";
import { certificationsBlock } from "@/content/pages/shared";
import { img } from "@/content/data";
import { getCategories, getProducts } from "@/lib/data/products";
import { getCertification } from "@/lib/data/certifications";

export const metadata: Metadata = {
  alternates: { canonical: "/san-pham" },
  title: "Sản phẩm",
  description: "Đặc sản thịt ngựa QT FOOD: Phở ngựa, Lẩu ngựa, Nem ngựa, Nem riềng, Giò ngựa, Mọc ngựa — không chỉ thơm ngon mà còn bổ dưỡng.",
};

export default async function ProductsPage() {
  const [categories, products, certification] = await Promise.all([getCategories(), getProducts(), getCertification()]);
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Sản phẩm" }]}
        eyebrow="Sản phẩm"
        title="Đặc sản *thịt ngựa* QT FOOD"
        description="Món ăn tại hệ thống cơ sở nhượng quyền và đặc sản chế biến sẵn đóng gói — mua về thưởng thức hoặc làm quà biếu."
        decor={img("decor/nui-doi-ruong-bac-thang.jpg")}
      />
      <ProductCatalog categories={categories} products={products} />
      <RenderBlocks blocks={certificationsBlock(certification, "alt")} />
    </>
  );
}
