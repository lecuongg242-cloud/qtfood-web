import type { Block } from "@/blocks";
import type { Tone } from "@/components/ui/Section";
import { content, formatDate, img } from "../data";

/** Block chứng nhận ISO 22000:2018 — dùng ở trang chủ, nhượng quyền, giới thiệu… */
export const certificationsBlock = (tone: Tone = "base"): Block => {
  const iso = content.certifications[0];
  return {
    type: "certifications",
    props: {
      tone,
      eyebrow: "Chứng nhận",
      title: "Chứng nhận và *cam kết chất lượng*",
      description: `Hệ thống quản lý an toàn thực phẩm của ${iso.holder} được đánh giá và chứng nhận phù hợp tiêu chuẩn ${iso.standard}.`,
      standard: iso.standard,
      standardName: iso.name,
      facts: [
        { label: "Số chứng nhận", value: iso.number },
        { label: "Đơn vị cấp", value: iso.issuer },
        { label: "Phạm vi", value: iso.scope },
        { label: "Hiệu lực", value: `${formatDate(iso.issued)} – ${formatDate(iso.expires)}` },
        { label: "Giám sát", value: iso.surveillance },
      ],
      documents: iso.documents.map((d) => ({ title: d.title, image: img(d.image), width: 898, height: 1280 })),
    },
  };
};
