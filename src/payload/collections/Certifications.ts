import type { CollectionConfig } from "payload";
import { anyone, loggedIn } from "../access";
import { revalidatePaths } from "../hooks/revalidate";

// Khối chứng nhận hiện ở trang chủ, giới thiệu, nhượng quyền, sản phẩm
const revalidate = revalidatePaths([{ path: "/", type: "layout" }]);

const dayOnly = { pickerAppearance: "dayOnly", displayFormat: "dd/MM/yyyy" } as const;

export const Certifications: CollectionConfig = {
  slug: "certifications",
  labels: { singular: "Chứng nhận", plural: "Chứng nhận" },
  admin: {
    useAsTitle: "standard",
    defaultColumns: ["standard", "number", "scope", "expiresAt", "active"],
    group: "Nội dung",
    description: "Chứng nhận hiện trên website (khối \"Chứng nhận và cam kết chất lượng\"). Admin báo trước 6 tháng khi sắp hết hạn.",
  },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  defaultSort: "order",
  hooks: { afterChange: [revalidate.afterChange], afterDelete: [revalidate.afterDelete] },
  fields: [
    {
      name: "expiryNotice",
      type: "ui",
      admin: { components: { Field: "/payload/components/ExpiryNotice#ExpiryNotice" } },
    },
    {
      type: "row",
      fields: [
        { name: "standard", type: "text", label: "Tiêu chuẩn", required: true, admin: { width: "40%", description: "Vd: ISO 22000:2018" } },
        { name: "name", type: "text", label: "Tên hệ thống", required: true, admin: { width: "60%", description: "Vd: Hệ thống Quản lý An toàn Thực phẩm" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "number", type: "text", label: "Số chứng nhận", required: true, admin: { width: "40%" } },
        { name: "issuer", type: "text", label: "Đơn vị cấp", required: true, admin: { width: "60%" } },
      ],
    },
    { name: "holder", type: "text", label: "Đơn vị được chứng nhận", required: true },
    { name: "decision", type: "text", label: "Quyết định cấp", admin: { description: "Vd: Quyết định số 274/QĐ-WCERT ngày 24/6/2025" } },
    {
      name: "scope",
      type: "textarea",
      label: "Phạm vi chứng nhận",
      required: true,
      admin: { description: "Chỉ gắn huy hiệu chứng nhận cho sản phẩm thuộc phạm vi này." },
    },
    { name: "location", type: "textarea", label: "Địa điểm" },
    {
      type: "row",
      fields: [
        { name: "issuedAt", type: "date", label: "Ngày cấp", required: true, admin: { width: "33%", date: dayOnly } },
        { name: "expiresAt", type: "date", label: "Hết hiệu lực", required: true, admin: { width: "33%", date: dayOnly } },
        { name: "surveillance", type: "text", label: "Giám sát", admin: { width: "34%", description: "Vd: Định kỳ 12 tháng/lần" } },
      ],
    },
    {
      name: "documents",
      type: "array",
      label: "Văn bản (ảnh chụp)",
      labels: { singular: "Văn bản", plural: "Văn bản" },
      admin: { description: "Ảnh giấy chứng nhận, quyết định… — hiện dạng thẻ giấy, bấm để phóng to." },
      fields: [
        {
          type: "row",
          fields: [
            { name: "title", type: "text", label: "Tên văn bản", required: true, admin: { width: "50%" } },
            { name: "image", type: "upload", relationTo: "media", label: "Ảnh", required: true, admin: { width: "50%" } },
          ],
        },
      ],
    },
    { name: "active", type: "checkbox", label: "Hiển thị trên website", defaultValue: true, admin: { position: "sidebar" } },
    { name: "order", type: "number", label: "Thứ tự", defaultValue: 0, admin: { position: "sidebar", description: "Chứng nhận có thứ tự nhỏ nhất hiện ở website." } },
  ],
};
