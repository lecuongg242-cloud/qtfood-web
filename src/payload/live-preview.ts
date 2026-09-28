import type { LivePreviewConfig } from "payload";

/**
 * Live Preview trong admin: iframe mở /next/preview (bật Draft Mode, kiểm tra đăng nhập) → chuyển tới trang tương ứng,
 * trang hiển thị bản nháp và tự tải lại mỗi lần tự lưu (RefreshRouteOnSave).
 * Đường dẫn tương đối: iframe cùng tên miền với admin (chạy đúng cả trên link preview của Vercel).
 */
export const livePreview: LivePreviewConfig & { collections: string[] } = {
  collections: ["products", "posts"],
  breakpoints: [
    { name: "mobile", label: "Điện thoại", width: 390, height: 844 },
    { name: "tablet", label: "Máy tính bảng", width: 820, height: 1180 },
    { name: "desktop", label: "Máy tính", width: 1440, height: 900 },
  ],
  url: async ({ data, collectionConfig, req }) => {
    if (!data?.slug) return null;
    let path: string | null = null;
    if (collectionConfig?.slug === "posts") path = `/tin-tuc/${data.slug}`;
    if (collectionConfig?.slug === "products" && data.category) {
      const category =
        typeof data.category === "object"
          ? data.category
          : await req.payload.findByID({ collection: "product-categories", id: data.category, depth: 0, req }).catch(() => null);
      if (category?.slug) path = `/san-pham/${category.slug}/${data.slug}`;
    }
    return path ? `/next/preview?path=${encodeURIComponent(path)}` : null;
  },
};
