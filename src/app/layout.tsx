import type { Metadata } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Animations } from "@/components/motion/Animations";
import { company } from "@/content/site";
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

export const metadata: Metadata = {
  title: {
    default: `${company.brand} – ${company.positioning}`,
    template: `%s | ${company.brand}`,
  },
  description:
    "QT FOOD – đặc sản thịt ngựa tươi sạch, thương hiệu nhượng quyền Lẩu ngựa & Phở ngựa với hơn 50 cơ sở. Nem ngựa, Nem riềng, Giò ngựa, Mọc ngựa – không chỉ thơm ngon mà còn bổ dưỡng.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: company.brand,
    images: ["/images/brand/banner-nhuong-quyen-lau-pho-ngua.jpg"],
  },
};

// Bật cờ JS trước khi vẽ để trạng thái ban đầu của hiệu ứng không bị nháy
const bootScript = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${body.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript>
          <style>{`[data-reveal],[data-split]{opacity:1!important;visibility:visible!important}[data-clip]{clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body data-tone="base" className="min-h-screen antialiased">
        <SmoothScroll />
        <Animations />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
