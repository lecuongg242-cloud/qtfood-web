import type { Metadata } from "next";
import { RenderBlocks } from "@/blocks";
import { contactBlocks } from "@/content/pages/contact";
import { getSiteSettings } from "@/lib/data/settings";

export async function generateMetadata(): Promise<Metadata> {
  const { company, mainHotline } = await getSiteSettings();
  return {
    alternates: { canonical: "/lien-he" },
    title: "Liên hệ",
    description: `Liên hệ QT FOOD — hotline ${mainHotline.display}, Zalo, email ${company.email}. Đặt hàng, tư vấn nhượng quyền Lẩu ngựa & Phở ngựa.`,
  };
}

export default async function ContactPage() {
  const { company } = await getSiteSettings();
  return <RenderBlocks blocks={contactBlocks(company)} />;
}
