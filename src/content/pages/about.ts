import type { Block } from "@/blocks";
import type { SiteData } from "../types";
import { content, img } from "../data";
import { certificationsBlock } from "./shared";

const { about } = content;

/** Trang Giới thiệu — `company`, `certification`: dữ liệu chung từ admin */
export const aboutBlocks = ({ company, certification, stats }: SiteData): Block[] => [
  {
    type: "pageHero",
    props: {
      breadcrumb: [{ label: "Trang chủ", href: "/" }, { label: "Giới thiệu" }],
      eyebrow: "Về QT FOOD",
      title: "Tinh hoa thực phẩm, *vươn tầm sức khoẻ*",
      description:
        "Khởi nguồn từ khát vọng đưa tinh hoa đặc sản vùng đất Tổ vươn xa — QT FOOD cung cấp, chế biến và phân phối đặc sản từ thịt ngựa tươi, đồng thời là thương hiệu nhượng quyền Lẩu ngựa & Phở ngựa.",
      image: { src: img(about.landscape), alt: "Ruộng bậc thang vùng cao" },
      stats: [
        { value: stats.stores, suffix: "+", label: "cơ sở nhượng quyền" },
        { value: 3, suffix: "", label: "mảng kinh doanh" },
        { value: stats.products, suffix: "", label: "đặc sản từ thịt ngựa" },
      ],
    },
  },
  {
    type: "aboutTeaser",
    props: {
      tone: "base",
      eyebrow: company.legalName,
      title: "Tiên phong đặc sản *thịt ngựa tươi*",
      intro: about.intro,
      image: img(about.teamPhoto),
      imageAlt: "Đội ngũ QT FOOD",
      lines: about.businessLines.items,
    },
  },
  {
    type: "visionMission",
    props: { tone: "alt", vision: about.vision, missions: about.mission },
  },
  {
    type: "coreValues",
    props: {
      tone: "base",
      eyebrow: "Giá trị cốt lõi",
      statement: "Xây dựng QT FOOD trên *4 chữ vàng* — Tín, Tâm, Tinh, Tiến.",
      items: about.coreValues.items,
    },
  },
  {
    type: "ceoQuote",
    props: {
      tone: "brand",
      name: company.ceo.name,
      title: company.ceo.title,
      photo: img(company.ceo.photo),
      quotes: company.ceo.quote,
    },
  },
  ...certificationsBlock(certification, "base"),
  {
    type: "ctaBand",
    props: {
      tone: "brand",
      title: "Cùng QT FOOD *kiến tạo tương lai*",
      description: "Mang tinh hoa ẩm thực đặc sản đến mọi miền Tổ quốc — trở thành đối tác nhượng quyền hoặc thưởng thức đặc sản ngay hôm nay.",
      primary: { label: "Đăng ký nhượng quyền", href: "/nhuong-quyen" },
      secondary: { label: "Xem sản phẩm", href: "/san-pham" },
      decor: img("decor/nui-doi.jpg"),
    },
  },
];
