import type { CollectionConfig } from "payload";
import { anyone, loggedIn } from "../access";
import { slugField } from "../fields/slug";

export const ProductCategories: CollectionConfig = {
  slug: "product-categories",
  labels: { singular: "Nhóm sản phẩm", plural: "Nhóm sản phẩm" },
  admin: { useAsTitle: "name", defaultColumns: ["name", "slug", "order"], group: "Sản phẩm" },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  defaultSort: "order",
  fields: [
    { name: "name", type: "text", label: "Tên nhóm", required: true },
    slugField("name"),
    { name: "note", type: "text", label: "Ghi chú hiển thị", admin: { description: "Vd: Phục vụ tại hệ thống cơ sở nhượng quyền" } },
    { name: "order", type: "number", label: "Thứ tự", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
