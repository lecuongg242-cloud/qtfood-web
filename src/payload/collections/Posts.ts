import type { CollectionConfig } from "payload";
import { loggedIn } from "../access";
import { slugField } from "../fields/slug";
import { revalidatePaths } from "../hooks/revalidate";
import { POST_CATEGORIES } from "../../lib/post-categories";

const revalidate = revalidatePaths([{ path: "/tin-tuc", type: "layout" }, { path: "/" }, { path: "/sitemap.xml" }]);

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Bài viết", plural: "Tin tức & hoạt động" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "_status"],
    group: "Nội dung",
    listSearchableFields: ["title", "slug"],
  },
  access: {
    // Khách chỉ thấy bản đã xuất bản; người đăng nhập thấy cả nháp
    read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }),
    create: loggedIn,
    update: loggedIn,
    delete: loggedIn,
  },
  versions: { drafts: true, maxPerDoc: 30 },
  hooks: { afterChange: [revalidate.afterChange], afterDelete: [revalidate.afterDelete] },
  defaultSort: "-publishedAt",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Nội dung",
          fields: [
            { name: "title", type: "text", label: "Tiêu đề", required: true },
            { name: "excerpt", type: "textarea", label: "Tóm tắt", required: true, admin: { description: "1–3 câu, hiện ở thẻ bài viết và mô tả SEO." } },
            { name: "cover", type: "upload", relationTo: "media", label: "Ảnh bìa" },
            { name: "body", type: "richText", label: "Nội dung bài viết", required: true },
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
                { name: "title", type: "text", label: "Tiêu đề SEO", admin: { description: "Để trống sẽ dùng tiêu đề bài." } },
                { name: "description", type: "textarea", label: "Mô tả SEO", admin: { description: "Để trống sẽ dùng tóm tắt." } },
              ],
            },
          ],
        },
      ],
    },
    slugField("title"),
    {
      name: "category",
      type: "select",
      label: "Chuyên mục",
      required: true,
      defaultValue: "tin-tuc",
      options: POST_CATEGORIES.map((c) => ({ label: c.label, value: c.value })),
      admin: { position: "sidebar" },
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Ngày đăng",
      required: true,
      defaultValue: () => new Date().toISOString(),
      index: true,
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly", displayFormat: "dd/MM/yyyy" } },
    },
  ],
};
