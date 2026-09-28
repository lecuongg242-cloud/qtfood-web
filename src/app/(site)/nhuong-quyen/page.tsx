import type { Metadata } from "next";
import { RenderBlocks } from "@/blocks";
import { franchiseBlocks } from "@/content/pages/franchise";
import { getSiteData } from "@/lib/data/site";
import { getSiteSettings } from "@/lib/data/settings";

export async function generateMetadata(): Promise<Metadata> {
  const { storeCount } = await getSiteSettings();
  return {
    alternates: { canonical: "/nhuong-quyen" },
    title: "Nhượng quyền Lẩu ngựa & Phở ngựa",
    description: `Nhượng quyền thương hiệu QT FOOD — mô hình Lẩu ngựa, Phở ngựa đã kiểm chứng qua hơn ${storeCount} cơ sở. Hỗ trợ khảo sát mặt bằng, đào tạo, nguồn nguyên liệu và marketing.`,
    openGraph: { images: ["/images/franchise/khai-truong-01.jpg"] },
  };
}

export default async function FranchisePage() {
  return <RenderBlocks blocks={franchiseBlocks(await getSiteData())} />;
}
