import type { Block } from "@/blocks";
import { content, img } from "../data";

const { franchisePolicy } = content;

export const franchisePolicyBlocks: Block[] = [
  {
    type: "pageHero",
    props: {
      breadcrumb: [{ label: "Trang chủ", href: "/" }, { label: "Nhượng quyền", href: "/nhuong-quyen" }, { label: "Chính sách" }],
      eyebrow: "Chính sách nhượng quyền",
      title: "Chính sách *nhượng quyền* QT FOOD",
      description: "Cơ hội đột phá doanh thu cùng đặc sản Lẩu ngựa – Phở ngựa: quyền lợi, hỗ trợ và trách nhiệm của đối tác.",
      primary: { label: "Nhận hồ sơ nhượng quyền", href: "/nhuong-quyen#dang-ky" },
      decor: img("decor/nui-doi.jpg"),
    },
  },
  {
    type: "policyArticle",
    props: {
      intro: franchisePolicy.intro,
      sections: franchisePolicy.sections.map((s) => (s.cta ? { ...s, cta: { label: "Nhận hồ sơ nhượng quyền", href: "/nhuong-quyen#dang-ky" } } : s)),
    },
  },
];
