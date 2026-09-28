import type { CollectionConfig } from "payload";
import { loggedIn } from "../access";
import { slugField } from "../fields/slug";

export const Products: CollectionConfig = {
  slug: "products",
  labels: { singular: "Sản phẩm", plural: "Sản phẩm" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "specs.price", "featured", "_status"],
    group: "Sản phẩm",
    listSearchableFields: ["name", "slug"],
  },
  access: {
    // Khách chỉ thấy bản đã xuất bản; người đăng nhập thấy cả nháp
    read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }),
    create: loggedIn,
    update: loggedIn,
    delete: loggedIn,
  },
  versions: { drafts: true, maxPerDoc: 30 },
  defaultSort: "order",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Nội dung",
          fields: [
            { name: "name", type: "text", label: "Tên sản phẩm", required: true },
            { name: "headline", type: "text", label: "Tiêu đề trang chi tiết" },
            { name: "summary", type: "textarea", label: "Tóm tắt", required: true, admin: { description: "2–4 câu, hiện ở thẻ sản phẩm và mô tả SEO." } },
            {
              name: "highlights",
              type: "array",
              label: "Điểm nổi bật",
              labels: { singular: "Điểm nổi bật", plural: "Điểm nổi bật" },
              fields: [{ name: "text", type: "textarea", label: "Nội dung", required: true }],
            },
            { name: "body", type: "richText", label: "Bài mô tả chi tiết" },
          ],
        },
        {
          label: "Ảnh",
          fields: [
            {
              name: "images",
              type: "upload",
              relationTo: "media",
              hasMany: true,
              label: "Ảnh sản phẩm",
              admin: { description: "Ảnh đầu tiên là ảnh đại diện." },
            },
          ],
        },
        {
          label: "Thông số & giá",
          fields: [
            {
              name: "specs",
              type: "group",
              label: false,
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "price", type: "number", label: "Giá (đ)", min: 0, admin: { width: "50%", description: "Để trống với món ăn tại quán." } },
                    { name: "priceUnit", type: "text", label: "Đơn vị tính", admin: { width: "50%", description: "Vd: quả, túi, kg" } },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    { name: "netWeight", type: "text", label: "Khối lượng tịnh (KLT)", admin: { width: "50%" } },
                    { name: "shelfLife", type: "text", label: "Hạn sử dụng", admin: { width: "50%" } },
                  ],
                },
                { name: "storage", type: "text", label: "Bảo quản" },
                { name: "usage", type: "textarea", label: "Hướng dẫn sử dụng" },
              ],
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            {
              name: "seo",
              type: "group",
              label: false,
              fields: [
                { name: "title", type: "text", label: "Tiêu đề SEO", admin: { description: "Để trống sẽ dùng tên sản phẩm." } },
                { name: "description", type: "textarea", label: "Mô tả SEO", admin: { description: "Để trống sẽ dùng tóm tắt." } },
              ],
            },
          ],
        },
      ],
    },
    slugField("name"),
    {
      name: "category",
      type: "relationship",
      relationTo: "product-categories",
      label: "Nhóm sản phẩm",
      required: true,
      admin: { position: "sidebar" },
    },
    { name: "featured", type: "checkbox", label: "Nổi bật ở trang chủ", defaultValue: false, admin: { position: "sidebar" } },
    { name: "order", type: "number", label: "Thứ tự hiển thị", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
