import type { Metadata } from "next";
import { RenderBlocks } from "@/blocks";
import { aboutBlocks } from "@/content/pages/about";
import { company } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Công ty TNHH QT Fresh Food (QT FOOD) — đơn vị cung cấp, chế biến, phân phối đặc sản thịt ngựa tươi và thương hiệu nhượng quyền Lẩu ngựa & Phở ngựa. Tầm nhìn, sứ mệnh, giá trị cốt lõi Tín – Tâm – Tinh – Tiến.",
  openGraph: { images: ["/images/about/doi-ngu-qtfood.jpg"] },
};

export default function AboutPage() {
  const url = siteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    alternateName: company.brand,
    url,
    logo: `${url}/brand/logo-qtfood.png`,
    slogan: company.slogan,
    taxID: company.taxCode,
    email: company.email,
    address: { "@type": "PostalAddress", streetAddress: company.address, addressCountry: "VN" },
    contactPoint: company.hotlines.map((h) => ({ "@type": "ContactPoint", telephone: h.number, contactType: "customer service", areaServed: "VN", availableLanguage: "vi" })),
    sameAs: [company.social.facebook.url, company.social.tiktok.url],
  };
  return (
    <>
      <RenderBlocks blocks={aboutBlocks} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
