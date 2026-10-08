import type { Metadata, Viewport } from "next";
import { draftMode } from "next/headers";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Animations } from "@/components/motion/Animations";
import { IntroHorse, introBootScript } from "@/components/motion/IntroHorse";
import type { Company } from "@/content/types";
import { getSiteSettings } from "@/lib/data/settings";
import { PreviewBar } from "@/components/preview/PreviewBar";
import { absoluteUrl, siteUrl } from "@/lib/site-url";
import "./globals.css";

const body = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin", "vietnamese"],
  weight: ["600"],
  style: ["italic"],
  display: "swap",
});

// Web chỉ thiết kế nền sáng: chặn trình duyệt tự đảo màu khi máy bật chế độ tối.
export const viewport: Viewport = {
  colorScheme: "only light",
};

export async function generateMetadata(): Promise<Metadata> {
  const { company, storeCount } = await getSiteSettings();
  return {
    metadataBase: new URL(siteUrl()),
    title: {
      default: `${company.brand} – ${company.positioning}`,
      template: `%s | ${company.brand}`,
    },
    description: `QT FOOD – đặc sản thịt ngựa tươi sạch, thương hiệu nhượng quyền Lẩu ngựa & Phở ngựa với hơn ${storeCount} cơ sở. Nem ngựa, Nem riềng, Giò ngựa, Mọc ngựa – không chỉ thơm ngon mà còn bổ dưỡng.`,
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: company.brand,
      images: ["/images/brand/banner-nhuong-quyen-lau-pho-ngua.jpg"],
    },
  };
}

// Organization + LocalBusiness cho toàn site (Google Knowledge Panel / Maps)
const siteJsonLd = (company: Company) => {
  const orgId = absoluteUrl("/#organization");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: company.legalName,
        alternateName: company.brand,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/brand/logo-qtfood.png"),
        slogan: company.slogan,
        taxID: company.taxCode,
        email: company.email,
        contactPoint: company.hotlines.map((h) => ({
          "@type": "ContactPoint",
          telephone: `+84${h.number.slice(1)}`,
          contactType: "customer service",
          areaServed: "VN",
          availableLanguage: "vi",
        })),
        sameAs: [company.social.facebook.url, company.social.tiktok.url],
      },
      {
        "@type": "LocalBusiness",
        "@id": absoluteUrl("/#localbusiness"),
        name: company.brand,
        parentOrganization: { "@id": orgId },
        description: company.positioning,
        url: absoluteUrl("/"),
        image: absoluteUrl("/images/brand/banner-nhuong-quyen-lau-pho-ngua.jpg"),
        logo: absoluteUrl("/brand/logo-qtfood.png"),
        telephone: `+84${company.hotlines[0].number.slice(1)}`,
        email: company.email,
        address: { "@type": "PostalAddress", streetAddress: company.address, addressRegion: "Phú Thọ", addressCountry: "VN" },
        geo: { "@type": "GeoCoordinates", latitude: company.geo.lat, longitude: company.geo.lng },
        areaServed: "VN",
      },
    ],
  };
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [settings, { isEnabled: preview }] = await Promise.all([getSiteSettings(), draftMode()]);
  return (
    <html lang="vi" className={`${body.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" />
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
        <noscript>
          <style>{`[data-reveal],[data-split]{opacity:1!important;visibility:visible!important}[data-clip]{clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body data-tone="base" className="min-h-screen antialiased">
        <IntroHorse />
        <SmoothScroll />
        <Animations />
        <Header nav={settings.nav} primaryCta={settings.primaryCta} mainHotline={settings.mainHotline} />
        <main>{children}</main>
        <Footer />
        <FloatingContact company={settings.company} mainHotline={settings.mainHotline} />
        {preview && <PreviewBar />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd(settings.company)).replace(/</g, "\u003c") }} />
      </body>
    </html>
  );
}
