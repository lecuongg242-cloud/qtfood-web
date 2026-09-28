import type { Block } from "@/blocks";
import type { SiteData } from "../types";
import { content, franchiseGallery, img } from "../data";
import { certificationsBlock } from "./shared";
import { PROVINCES } from "@/lib/provinces";

const { franchise, franchisePolicy, forms } = content;
const [whySection, supportSection, responsibilitySection, startSection] = franchisePolicy.sections;

/** Trang Nhượng quyền — `company`, `certification`: dữ liệu chung từ admin */
export const franchiseBlocks = ({ company, certification }: SiteData): Block[] => [
  {
    type: "pageHero",
    props: {
      breadcrumb: [{ label: "Trang chủ", href: "/" }, { label: "Nhượng quyền" }],
      eyebrow: "Nhượng quyền thương hiệu",
      title: "Nhượng quyền *Lẩu ngựa & Phở ngựa* cùng QT FOOD",
      description:
        "Mô hình đã được kiểm chứng qua hơn 50 cơ sở trên khắp các tỉnh thành. QT FOOD đồng hành cùng đối tác từ khảo sát mặt bằng, đào tạo, nguồn nguyên liệu đến marketing.",
      image: { src: img("franchise/khai-truong-01.jpg"), alt: "Khai trương cơ sở nhượng quyền QT FOOD" },
      primary: { label: "Nhận hồ sơ nhượng quyền", href: "#dang-ky" },
      secondary: { label: "Xem chính sách", href: "/nhuong-quyen/chinh-sach" },
      stats: [
        { value: 50, suffix: "+", label: "cơ sở nhượng quyền" },
        { value: 100, suffix: "%", label: "nguyên liệu, gia vị do công ty cung cấp" },
        { value: franchise.process.length, suffix: " bước", label: "đồng hành từ đầu đến khai trương" },
      ],
      decor: img("decor/nui-doi-ruong-bac-thang.jpg"),
    },
  },
  {
    type: "cardGrid",
    props: {
      tone: "base",
      eyebrow: "Vì sao chọn QT FOOD",
      title: "Mảng ngách *đầy tiềm năng*, nguồn cung ổn định",
      description: "Lẩu ngựa nổi bật giữa thị trường lẩu phổ thông — và QT FOOD giải quyết bài toán khó nhất của kinh doanh đặc sản: nguồn nguyên liệu.",
      items: whySection.items ?? [],
      image: { src: img("products/lau-ngua-1.jpg"), alt: "Lẩu ngựa QT FOOD" },
    },
  },
  {
    type: "cardGrid",
    props: {
      tone: "alt",
      eyebrow: "Đặc quyền đối tác",
      title: "Đối tác được hỗ trợ *toàn diện*",
      description: supportSection.intro,
      items: supportSection.items ?? [],
      columns: 2,
    },
  },
  {
    type: "steps",
    props: {
      tone: "base",
      eyebrow: "Quy trình hợp tác",
      title: "Từ lần liên hệ đầu tiên *đến ngày khai trương*",
      items: franchise.process,
    },
  },
  {
    type: "galleryGrid",
    props: {
      tone: "alt",
      eyebrow: "Hệ thống cơ sở",
      title: "Hơn *50 cơ sở* đã khai trương",
      description: "Những buổi khai trương rộn ràng trên khắp các tỉnh thành — minh chứng rõ nét nhất cho sức hút của mô hình.",
      images: franchiseGallery().map((src) => ({ src, alt: "Khai trương cơ sở nhượng quyền QT FOOD" })),
      initial: 12,
    },
  },
  ...certificationsBlock(certification, "base"),
  {
    type: "cardGrid",
    props: {
      tone: "alt",
      eyebrow: "Trách nhiệm đối tác",
      title: "Cùng nhau giữ *uy tín thương hiệu*",
      description: responsibilitySection.intro,
      items: responsibilitySection.items ?? [],
      numbered: true,
      cta: { label: "Xem chính sách đầy đủ", href: "/nhuong-quyen/chinh-sach" },
    },
  },
  {
    type: "leadFormSection",
    props: {
      id: "dang-ky",
      tone: "brand",
      kind: "franchise",
      eyebrow: "Đăng ký nhượng quyền",
      title: "Nhận *hồ sơ nhượng quyền*",
      description: startSection.intro ?? "",
      points: ["Nhận bảng hồ sơ nhượng quyền chi tiết", "Tư vấn trực tiếp từ ban giám đốc", "Khảo sát, tư vấn chọn mặt bằng phù hợp"],
      hotlines: company.hotlines,
      zalo: company.social.zalo[0].url,
      provinces: [...PROVINCES],
      budgets: forms.budgets,
    },
  },
];
