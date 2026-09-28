import type { Metadata } from "next";
import { RenderBlocks } from "@/blocks";
import { storesBlocks } from "@/content/pages/stores";
import { getStores } from "@/lib/data/stores";

export const metadata: Metadata = {
  title: "Hệ thống cơ sở",
  description: "Hơn 50 cơ sở nhượng quyền Lẩu ngựa & Phở ngựa QT FOOD trên khắp các tỉnh thành. Tìm cơ sở gần bạn hoặc đăng ký mở cơ sở mới.",
  openGraph: { images: ["/images/franchise/khai-truong-01.jpg"] },
};

export default async function StoresPage() {
  const stores = await getStores();
  return <RenderBlocks blocks={storesBlocks(stores)} />;
}
