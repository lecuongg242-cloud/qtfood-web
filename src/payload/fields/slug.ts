import type { TextField } from "payload";
import { slugify } from "../../lib/slugify";

export { slugify };

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
