import type { Block } from "@/blocks";
import { content, img } from "../data";

const { company, forms } = content;

export const contactBlocks: Block[] = [
  {
    type: "pageHero",
    props: {
      breadcrumb: [{ label: "Trang chủ", href: "/" }, { label: "Liên hệ" }],
      eyebrow: "Liên hệ",
      title: "Kết nối với *QT FOOD*",
      description: "Đặt hàng, tư vấn nhượng quyền hay hợp tác phân phối — gọi hotline, nhắn Zalo hoặc để lại lời nhắn, QT FOOD sẽ liên hệ lại sớm nhất.",
      decor: img("decor/nui-doi-chim-bay.jpg"),
    },
  },
  {
    type: "leadFormSection",
    props: {
      tone: "base",
      kind: "contact",
      eyebrow: company.legalName,
      title: "Gửi lời nhắn *cho chúng tôi*",
      description: company.address,
      points: [`Email: ${company.email}`, `Mã số thuế: ${company.taxCode}`, `Fanpage: ${company.social.facebook.label}`],
      hotlines: company.hotlines,
      zalo: company.social.zalo[0].url,
      topics: forms.contactTopics,
    },
  },
  {
    type: "mapEmbed",
    props: {
      title: company.legalName,
      address: company.address,
      geo: company.geo,
    },
  },
];
