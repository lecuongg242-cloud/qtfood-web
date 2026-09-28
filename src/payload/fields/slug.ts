import type { TextField } from "payload";

/** Chuyển tiếng Việt có dấu → slug: "Nem Ngựa" → "nem-ngua" */
export const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Trường slug: tự sinh từ `fromField` nếu để trống. */
export const slugField = (fromField = "name"): TextField => ({
  name: "slug",
  type: "text",
  label: "Đường dẫn (slug)",
  required: true,
  unique: true,
  index: true,
  admin: { position: "sidebar", description: "Để trống sẽ tự tạo từ tên, vd: nem-ngua" },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === "string" && value.trim()) return slugify(value);
        const source = data?.[fromField];
        return typeof source === "string" ? slugify(source) : value;
      },
    ],
  },
});
