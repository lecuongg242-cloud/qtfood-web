import type { Metadata } from "next";
import { RenderBlocks } from "@/blocks";
import { storesBlocks } from "@/content/pages/stores";
import { getStores } from "@/lib/data/stores";

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: { canonical: "/he-thong-co-so" },
    title: "Hệ thống cơ sở",
    description: `Hệ thống cơ sở nhượng quyền Lẩu ngựa & Phở ngựa QT FOOD trên toàn quốc. Tìm cơ sở gần bạn hoặc đăng ký mở cơ sở mới.`,
    openGraph: { images: ["/images/franchise/khai-truong-01.jpg"] },
  };
}

export default async function StoresPage() {
  const stores = await getStores();
  return <RenderBlocks blocks={storesBlocks(stores)} />;
}
