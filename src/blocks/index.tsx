import { Hero, type HeroProps } from "./hero/Hero";
import { FeaturedProducts, type FeaturedProductsProps } from "./featured-products/FeaturedProducts";
import { Commitments, type CommitmentsProps } from "./commitments/Commitments";
import { AboutTeaser, type AboutTeaserProps } from "./about-teaser/AboutTeaser";
import { ProductList, type ProductListProps } from "./product-list/ProductList";
import { CoreValues, type CoreValuesProps } from "./core-values/CoreValues";
import { FranchiseTeaser, type FranchiseTeaserProps } from "./franchise-teaser/FranchiseTeaser";
import { ContactCta, type ContactCtaProps } from "./contact-cta/ContactCta";

/** Trang = danh sách block (dạng JSON) — GĐ2 sẽ lưu/sửa danh sách này trong editor. */
export type Block =
  | { type: "hero"; props: HeroProps }
  | { type: "featuredProducts"; props: FeaturedProductsProps }
  | { type: "commitments"; props: CommitmentsProps }
  | { type: "aboutTeaser"; props: AboutTeaserProps }
  | { type: "productList"; props: ProductListProps }
  | { type: "coreValues"; props: CoreValuesProps }
  | { type: "franchiseTeaser"; props: FranchiseTeaserProps }
  | { type: "contactCta"; props: ContactCtaProps };

export function RenderBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "hero":
            return <Hero key={i} {...block.props} />;
          case "featuredProducts":
            return <FeaturedProducts key={i} {...block.props} />;
          case "commitments":
            return <Commitments key={i} {...block.props} />;
          case "aboutTeaser":
            return <AboutTeaser key={i} {...block.props} />;
          case "productList":
            return <ProductList key={i} {...block.props} />;
          case "coreValues":
            return <CoreValues key={i} {...block.props} />;
          case "franchiseTeaser":
            return <FranchiseTeaser key={i} {...block.props} />;
          case "contactCta":
            return <ContactCta key={i} {...block.props} />;
        }
      })}
    </>
  );
}
