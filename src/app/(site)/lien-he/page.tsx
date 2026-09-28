import type { Metadata } from "next";
import { RenderBlocks } from "@/blocks";
import { contactBlocks } from "@/content/pages/contact";

export const metadata: Metadata = {
  alternates: { canonical: "/lien-he" },
  title: "Liên hệ",
  description: "Liên hệ QT FOOD — hotline 0981.787.992, Zalo, email qtfreshfood@gmail.com. Đặt hàng, tư vấn nhượng quyền Lẩu ngựa & Phở ngựa.",
};

export default function ContactPage() {
  return <RenderBlocks blocks={contactBlocks} />;
}
