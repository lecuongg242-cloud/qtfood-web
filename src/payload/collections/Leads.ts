import type { CollectionConfig } from "payload";
import { adminOnly, loggedIn } from "../access";
import { leadsExport } from "../endpoints/leads-export";

/**
 * Khách hàng để lại thông tin qua form trên website.
 * Chỉ được tạo từ phía server (Server Action dùng Local API với overrideAccess) — không mở API tạo công khai.
 */
export const Leads: CollectionConfig = {
  slug: "leads",
  labels: { singular: "Khách hàng liên hệ", plural: "Khách hàng liên hệ" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "phone", "type", "status", "province", "createdAt"],
    group: "Khách hàng",
    listSearchableFields: ["name", "phone", "email"],
    description: "Thông tin khách gửi từ các form: đặt hàng, đăng ký nhượng quyền, liên hệ.",
    components: { beforeListTable: ["/payload/components/LeadsExportButton#LeadsExportButton"] },
  },
  endpoints: [leadsExport],
  access: {
    create: () => false,
    read: loggedIn,
    update: loggedIn,
    delete: adminOnly,
  },
  defaultSort: "-createdAt",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "type",
          type: "select",
          label: "Loại",
          required: true,
          admin: { width: "50%" },
          options: [
            { label: "Đặt hàng", value: "order" },
            { label: "Đăng ký nhượng quyền", value: "franchise" },
            { label: "Liên hệ", value: "contact" },
          ],
        },
        {
          name: "status",
          type: "select",
          label: "Trạng thái",
          required: true,
          defaultValue: "new",
          admin: { width: "50%" },
          options: [
            { label: "Mới", value: "new" },
            { label: "Đã liên hệ", value: "contacted" },
            { label: "Thành công", value: "won" },
            { label: "Không thành", value: "lost" },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "name", type: "text", label: "Họ tên", required: true, admin: { width: "50%" } },
        { name: "phone", type: "text", label: "Số điện thoại", required: true, admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "email", type: "email", label: "Email", admin: { width: "50%" } },
        { name: "province", type: "text", label: "Tỉnh / thành", admin: { width: "50%" } },
      ],
    },
    { name: "message", type: "textarea", label: "Nội dung / ghi chú của khách" },
    {
      name: "franchiseInfo",
      type: "group",
      label: "Thông tin nhượng quyền",
      admin: { condition: (data) => data?.type === "franchise" },
      fields: [
        {
          name: "hasPremises",
          type: "select",
          label: "Mặt bằng",
          options: [
            { label: "Đã có mặt bằng", value: "yes" },
            { label: "Chưa có", value: "no" },
          ],
        },
        { name: "budget", type: "text", label: "Ngân sách dự kiến" },
      ],
    },
    {
      name: "orderInfo",
      type: "group",
      label: "Thông tin đặt hàng",
      admin: { condition: (data) => data?.type === "order" },
      fields: [
        {
          name: "items",
          type: "array",
          label: "Sản phẩm",
          fields: [
            {
              type: "row",
              fields: [
                { name: "product", type: "relationship", relationTo: "products", label: "Sản phẩm", admin: { width: "60%" } },
                { name: "quantity", type: "number", label: "Số lượng", min: 1, defaultValue: 1, admin: { width: "40%" } },
              ],
            },
          ],
        },
        { name: "address", type: "textarea", label: "Địa chỉ nhận hàng" },
      ],
    },
    // Thông tin nội bộ
    { name: "assignee", type: "relationship", relationTo: "users", label: "Người phụ trách", admin: { position: "sidebar" } },
    { name: "internalNote", type: "textarea", label: "Ghi chú nội bộ", admin: { position: "sidebar" } },
    { name: "sourcePage", type: "text", label: "Trang gửi", admin: { position: "sidebar", readOnly: true } },
  ],
};
