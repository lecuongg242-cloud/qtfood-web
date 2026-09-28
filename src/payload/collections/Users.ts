import type { CollectionConfig } from "payload";
import { adminOnly, adminOnlyField, isAdmin } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Tài khoản", plural: "Tài khoản" },
  auth: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
    group: "Hệ thống",
  },
  access: {
    // Admin quản lý mọi tài khoản; Editor chỉ xem/sửa tài khoản của mình
    read: ({ req }) => (isAdmin(req.user) ? true : { id: { equals: req.user?.id } }),
    update: ({ req }) => (isAdmin(req.user) ? true : { id: { equals: req.user?.id } }),
    create: adminOnly,
    delete: adminOnly,
  },
  hooks: {
    beforeChange: [
      // Tài khoản đầu tiên (tạo ở màn hình "Tạo tài khoản đầu tiên") luôn là Admin
      async ({ data, operation, req }) => {
        if (operation === "create") {
          const { totalDocs } = await req.payload.count({ collection: "users", overrideAccess: true });
          if (totalDocs === 0) data.role = "admin";
        }
        return data;
      },
    ],
  },
  fields: [
    { name: "name", type: "text", label: "Họ tên", required: true },
    {
      name: "role",
      type: "select",
      label: "Vai trò",
      required: true,
      defaultValue: "editor",
      saveToJWT: true,
      access: { update: adminOnlyField },
      options: [
        { label: "Quản trị (Admin)", value: "admin" },
        { label: "Biên tập (Editor)", value: "editor" },
      ],
      admin: {
        description: "Admin: toàn quyền. Editor: sửa nội dung & xử lý khách hàng, không quản lý tài khoản / cài đặt.",
        // Ẩn ở màn hình "Tạo tài khoản đầu tiên" (chưa ai đăng nhập) — tài khoản đầu tiên luôn là Admin
        condition: (_data, _siblingData, { user }) => Boolean(user),
      },
    },
  ],
};
