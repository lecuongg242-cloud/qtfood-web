import type { Metadata } from "next";
import { RenderBlocks } from "@/blocks";
import { franchisePolicyBlocks } from "@/content/pages/franchise-policy";

export const metadata: Metadata = {
  title: "Chính sách nhượng quyền",
  description:
    "Chính sách nhượng quyền thương hiệu QT FOOD: lý do hợp tác, chính sách hỗ trợ setup, đào tạo, marketing, nguồn nguyên liệu và trách nhiệm của đối tác nhận quyền.",
};

export default function FranchisePolicyPage() {
  return <RenderBlocks blocks={franchisePolicyBlocks} />;
}
