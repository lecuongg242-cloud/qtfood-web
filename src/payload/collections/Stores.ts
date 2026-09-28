import type { CollectionConfig } from "payload";
import { anyone, loggedIn } from "../access";
import { revalidatePaths } from "../hooks/revalidate";
import { PROVINCES } from "../../lib/provinces";

const revalidate = revalidatePaths([{ path: "/he-thong-co-so" }]);

export const Stores: CollectionConfig = {
  slug: "stores",
  labels: { singular: "Cơ sở nhượng quyền", plural: "Cơ sở nhượng quyền" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "province", "phone", "active"],
    group: "Nội dung",
    listSearchableFields: ["name", "address", "phone"],
    description: "Danh sách cơ sở hiển thị ở trang Hệ thống cơ sở. Chưa có cơ sở nào → trang chỉ hiện số liệu & ảnh khai trương.",
  },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  defaultSort: "province",
  hooks: { afterChange: [revalidate.afterChange], afterDelete: [revalidate.afterDelete] },
  fields: [
    { name: "name", type: "text", label: "Tên quán / cơ sở", required: true },
    {
      type: "row",
      fields: [
        {
          name: "province",
          type: "select",
          label: "Tỉnh / thành",
          required: true,
          options: PROVINCES.map((p) => ({ label: p, value: p })),
          admin: { width: "50%" },
        },
        { name: "phone", type: "text", label: "Số điện thoại", admin: { width: "50%" } },
      ],
    },
    { name: "address", type: "text", label: "Địa chỉ", required: true },
    { name: "mapUrl", type: "text", label: "Link Google Maps", admin: { description: "Dán link chia sẻ vị trí từ Google Maps (để khách bấm Chỉ đường)." } },
    { name: "image", type: "upload", relationTo: "media", label: "Ảnh cơ sở / khai trương" },
    { name: "openedAt", type: "date", label: "Ngày khai trương", admin: { position: "sidebar", date: { pickerAppearance: "dayOnly", displayFormat: "dd/MM/yyyy" } } },
    { name: "active", type: "checkbox", label: "Hiển thị trên website", defaultValue: true, admin: { position: "sidebar" } },
  ],
};
