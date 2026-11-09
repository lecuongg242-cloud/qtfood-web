import type { Block } from "@/blocks";
import type { Tone } from "@/components/ui/Section";
import { formatDate } from "../data";
import type { CertificationView, SiteData } from "../types";

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

/** Số liệu đầu trang (trang chủ & Giới thiệu) — sửa ở đây là cả hai trang cùng đổi */
export const brandStats = (stats: SiteData["stats"]) => [
  { prefix: "Số ", value: 1, suffix: "", label: "trong lĩnh vực nhượng quyền Lẩu ngựa & Phở ngựa tại Việt Nam" },
  { value: 100, suffix: "%", label: "thịt ngựa tươi từ trang trại QT Farm của chúng tôi" },
  { value: stats.products, suffix: "", label: "món đặc sản nổi bật" },
  { value: 3, suffix: "", label: "mảng kinh doanh chủ lực" },
];
