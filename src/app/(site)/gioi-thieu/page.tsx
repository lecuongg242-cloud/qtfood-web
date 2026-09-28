import type { Metadata } from "next";
import { RenderBlocks } from "@/blocks";
import { aboutBlocks } from "@/content/pages/about";
import { getSiteData } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Công ty TNHH QT Fresh Food (QT FOOD) — đơn vị cung cấp, chế biến, phân phối đặc sản thịt ngựa tươi và thương hiệu nhượng quyền Lẩu ngựa & Phở ngựa. Tầm nhìn, sứ mệnh, giá trị cốt lõi Tín – Tâm – Tinh – Tiến.",
  alternates: { canonical: "/gioi-thieu" },
  openGraph: { images: ["/images/about/doi-ngu-qtfood.jpg"] },
};

// JSON-LD Organization nằm ở layout (dùng chung toàn site)
export default async function AboutPage() {
  return <RenderBlocks blocks={aboutBlocks(await getSiteData())} />;
}
