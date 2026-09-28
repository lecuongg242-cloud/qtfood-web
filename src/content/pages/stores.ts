import type { Block } from "@/blocks";
import type { StoreView } from "@/lib/data/stores";
import { franchiseGallery, img } from "../data";

/** Trang Hệ thống cơ sở — danh sách cơ sở lấy từ CMS (ẩn khi chưa có dữ liệu) */
export const storesBlocks = (stores: StoreView[]): Block[] => [
  {
    type: "pageHero",
    props: {
      breadcrumb: [{ label: "Trang chủ", href: "/" }, { label: "Hệ thống cơ sở" }],
      eyebrow: "Hệ thống cơ sở",
      title: "Hơn *50 cơ sở* trên khắp các tỉnh thành",
      description:
        "Mỗi cơ sở mang bộ nhận diện xanh lá đặc trưng và cùng một tiêu chuẩn hương vị — từ Lẩu ngựa, Phở ngựa đến Nem, Giò, Mọc ngựa.",
      primary: { label: "Mở cơ sở tại tỉnh bạn", href: "/nhuong-quyen#dang-ky" },
      stats: [
        { value: 50, suffix: "+", label: "cơ sở nhượng quyền" },
        ...(stores.length
          ? [{ value: new Set(stores.map((s) => s.province)).size, suffix: "", label: "tỉnh/thành có cơ sở" }]
          : []),
      ],
      decor: img("decor/nui-doi-ruong-bac-thang.jpg"),
    },
  },
  { type: "storeLocator", props: { tone: "base", title: "Tìm cơ sở gần bạn", stores } },
  {
    type: "galleryGrid",
    props: {
      tone: stores.length ? "alt" : "base",
      eyebrow: "Khai trương",
      title: "Những ngày *khai trương* rộn ràng",
      description: "Hình ảnh khai trương các cơ sở nhượng quyền QT FOOD trên khắp các tỉnh thành.",
      images: franchiseGallery().map((src) => ({ src, alt: "Khai trương cơ sở nhượng quyền QT FOOD" })),
      initial: 16,
    },
  },
  {
    type: "ctaBand",
    props: {
      tone: "brand",
      title: "Mở cơ sở *Lẩu ngựa & Phở ngựa* tại tỉnh bạn",
      description: "Nhận hồ sơ nhượng quyền chi tiết và được tư vấn trực tiếp từ ban giám đốc.",
      primary: { label: "Nhận hồ sơ nhượng quyền", href: "/nhuong-quyen#dang-ky" },
      secondary: { label: "Chính sách nhượng quyền", href: "/nhuong-quyen/chinh-sach" },
      decor: img("decor/nui-doi.jpg"),
    },
  },
];
