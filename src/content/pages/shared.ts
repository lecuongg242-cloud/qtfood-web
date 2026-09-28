import type { Block } from "@/blocks";
import type { Tone } from "@/components/ui/Section";
import { formatDate } from "../data";
import type { CertificationView } from "../types";

/** Block chứng nhận (vd ISO 22000:2018) — dùng ở trang chủ, nhượng quyền, giới thiệu… Không có chứng nhận → không có block. */
export const certificationsBlock = (iso: CertificationView | null, tone: Tone = "base"): Block[] => {
  if (!iso) return [];
  return [{
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
        ...(iso.surveillance ? [{ label: "Giám sát", value: iso.surveillance }] : []),
      ],
      documents: iso.documents,
    },
  }];
};
