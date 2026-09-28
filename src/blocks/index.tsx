import { Hero, type HeroProps } from "./hero/Hero";
import { FeaturedProducts, type FeaturedProductsProps } from "./featured-products/FeaturedProducts";
import { Commitments, type CommitmentsProps } from "./commitments/Commitments";
import { Certifications, type CertificationsProps } from "./certifications/Certifications";
import { AboutTeaser, type AboutTeaserProps } from "./about-teaser/AboutTeaser";
import { ProductList, type ProductListProps } from "./product-list/ProductList";
import { CoreValues, type CoreValuesProps } from "./core-values/CoreValues";
import { FranchiseTeaser, type FranchiseTeaserProps } from "./franchise-teaser/FranchiseTeaser";
import { ContactCta, type ContactCtaProps } from "./contact-cta/ContactCta";
import { PageHero, type PageHeroProps } from "./page-hero/PageHero";
import { CardGrid, type CardGridProps } from "./card-grid/CardGrid";
import { Steps, type StepsProps } from "./steps/Steps";
import { GalleryGrid, type GalleryGridProps } from "./gallery-grid/GalleryGrid";
import { PolicyArticle, type PolicyArticleProps } from "./policy-article/PolicyArticle";
import { LeadFormSection, type LeadFormSectionProps } from "./lead-form-section/LeadFormSection";
import { MapEmbed, type MapEmbedProps } from "./map-embed/MapEmbed";
import { VisionMission, type VisionMissionProps } from "./vision-mission/VisionMission";
import { CeoQuote, type CeoQuoteProps } from "./ceo-quote/CeoQuote";
import { BrandIdentity, type BrandIdentityProps } from "./brand-identity/BrandIdentity";
import { CtaBand, type CtaBandProps } from "./cta-band/CtaBand";
import { StoreLocator, type StoreLocatorProps } from "./store-locator/StoreLocator";
import { NewsList, type NewsListProps } from "./news-list/NewsList";

/** Trang = danh sách block (dạng JSON) — GĐ2 sẽ lưu/sửa danh sách này trong editor. */
export type Block =
  | { type: "hero"; props: HeroProps }
  | { type: "featuredProducts"; props: FeaturedProductsProps }
  | { type: "commitments"; props: CommitmentsProps }
  | { type: "certifications"; props: CertificationsProps }
  | { type: "aboutTeaser"; props: AboutTeaserProps }
  | { type: "productList"; props: ProductListProps }
  | { type: "coreValues"; props: CoreValuesProps }
  | { type: "franchiseTeaser"; props: FranchiseTeaserProps }
  | { type: "contactCta"; props: ContactCtaProps }
  | { type: "pageHero"; props: PageHeroProps }
  | { type: "cardGrid"; props: CardGridProps }
  | { type: "steps"; props: StepsProps }
  | { type: "galleryGrid"; props: GalleryGridProps }
  | { type: "policyArticle"; props: PolicyArticleProps }
  | { type: "leadFormSection"; props: LeadFormSectionProps }
  | { type: "mapEmbed"; props: MapEmbedProps }
  | { type: "visionMission"; props: VisionMissionProps }
  | { type: "ceoQuote"; props: CeoQuoteProps }
  | { type: "brandIdentity"; props: BrandIdentityProps }
  | { type: "ctaBand"; props: CtaBandProps }
  | { type: "storeLocator"; props: StoreLocatorProps }
  | { type: "newsList"; props: NewsListProps };

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
          case "certifications":
            return <Certifications key={i} {...block.props} />;
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
          case "pageHero":
            return <PageHero key={i} {...block.props} />;
          case "cardGrid":
            return <CardGrid key={i} {...block.props} />;
          case "steps":
            return <Steps key={i} {...block.props} />;
          case "galleryGrid":
            return <GalleryGrid key={i} {...block.props} />;
          case "policyArticle":
            return <PolicyArticle key={i} {...block.props} />;
          case "leadFormSection":
            return <LeadFormSection key={i} {...block.props} />;
          case "mapEmbed":
            return <MapEmbed key={i} {...block.props} />;
          case "visionMission":
            return <VisionMission key={i} {...block.props} />;
          case "ceoQuote":
            return <CeoQuote key={i} {...block.props} />;
          case "brandIdentity":
            return <BrandIdentity key={i} {...block.props} />;
          case "ctaBand":
            return <CtaBand key={i} {...block.props} />;
          case "storeLocator":
            return <StoreLocator key={i} {...block.props} />;
          case "newsList":
            return <NewsList key={i} {...block.props} />;
        }
      })}
    </>
  );
}
