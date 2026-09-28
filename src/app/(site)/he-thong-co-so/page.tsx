import type { Metadata } from "next";
import { RenderBlocks } from "@/blocks";
import { storesBlocks } from "@/content/pages/stores";
import { getStores } from "@/lib/data/stores";
import { getSiteSettings } from "@/lib/data/settings";

export async function generateMetadata(): Promise<Metadata> {
  const { storeCount } = await getSiteSettings();
  return {
    alternates: { canonical: "/he-thong-co-so" },
    title: "Hệ thống cơ sở",
    description: `Hơn ${storeCount} cơ sở nhượng quyền Lẩu ngựa & Phở ngựa QT FOOD trên khắp các tỉnh thành. Tìm cơ sở gần bạn hoặc đăng ký mở cơ sở mới.`,
    openGraph: { images: ["/images/franchise/khai-truong-01.jpg"] },
  };
}

export default async function StoresPage() {
  const [stores, { storeCount }] = await Promise.all([getStores(), getSiteSettings()]);
  return <RenderBlocks blocks={storesBlocks(stores, storeCount)} />;
}
