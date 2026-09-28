import type { CollectionConfig } from "payload";
import { anyone, loggedIn } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Ảnh / tệp", plural: "Thư viện ảnh" },
  admin: { group: "Nội dung" },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  upload: {
    // Khi chưa có Vercel Blob (chỉ dùng ở máy dev), tệp lưu tại ./media — đã nằm trong .gitignore
    staticDir: "media",
    mimeTypes: ["image/*", "application/pdf"],
    imageSizes: [
      { name: "thumbnail", width: 400 },
      { name: "card", width: 900 },
      { name: "large", width: 1800 },
    ],
    adminThumbnail: "thumbnail",
    focalPoint: true,
  },
  fields: [
    { name: "alt", type: "text", label: "Mô tả ảnh (alt)", required: true, admin: { description: "Mô tả ngắn nội dung ảnh — tốt cho SEO & người khiếm thị." } },
    { name: "caption", type: "text", label: "Chú thích" },
  ],
};
