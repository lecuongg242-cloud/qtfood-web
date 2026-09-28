import type { CollectionConfig } from "payload";
import { anyone, loggedIn } from "../access";
import { slugField } from "../fields/slug";
import { revalidatePaths } from "../hooks/revalidate";

const revalidate = revalidatePaths([{ path: "/chinh-sach", type: "layout" }, { path: "/sitemap.xml" }]);

export const Policies: CollectionConfig = {
  slug: "policies",
  labels: { singular: "Chính sách", plural: "Chính sách chung" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    group: "Nội dung",
    description: "Vận chuyển, thanh toán, đổi trả, bảo mật… — hiện ở chân trang, đường dẫn /chinh-sach/<slug>.",
  },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  defaultSort: "order",
  hooks: { afterChange: [revalidate.afterChange], afterDelete: [revalidate.afterDelete] },
  fields: [
    { name: "title", type: "text", label: "Tên chính sách", required: true },
    { name: "summary", type: "textarea", label: "Mô tả ngắn", required: true, admin: { description: "1–2 câu dưới tiêu đề, dùng làm mô tả SEO." } },
    { name: "body", type: "richText", label: "Nội dung", required: true },
    slugField("title"),
    { name: "order", type: "number", label: "Thứ tự ở chân trang", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
