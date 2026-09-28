import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from "payload";

type PathSpec = { path: string; type?: "page" | "layout" };

/**
 * Hook làm mới các trang website liên quan khi dữ liệu đổi trong admin.
 * Chạy ngoài Next (vd `pnpm seed`) thì revalidatePath báo lỗi → bỏ qua.
 */
export const revalidatePaths = (
  paths: PathSpec[],
): { afterChange: CollectionAfterChangeHook; afterDelete: CollectionAfterDeleteHook } => {
  const run = (log: (msg: string) => void) => {
    for (const { path, type } of paths) {
      try {
        revalidatePath(path, type);
      } catch {
        log(`[revalidate] bỏ qua ${path} (không chạy trong Next)`);
        return;
      }
    }
  };
  return {
    afterChange: ({ doc, previousDoc, req }) => {
      // Bản nháp chưa từng xuất bản (kể cả tự lưu khi soạn) không ảnh hưởng trang công khai
      if (doc?._status === "draft" && previousDoc?._status !== "published") return doc;
      run((m) => req.payload.logger.debug(m));
      return doc;
    },
    afterDelete: ({ doc, req }) => {
      run((m) => req.payload.logger.debug(m));
      return doc;
    },
  };
};

/** Sản phẩm & nhóm sản phẩm: làm mới toàn bộ /san-pham và trang chủ */
export const revalidateProductPages = () => revalidatePaths([{ path: "/san-pham", type: "layout" }, { path: "/" }]);

/** Thông tin chung dùng ở header/footer mọi trang → làm mới toàn bộ website */
export const revalidateWholeSite: GlobalAfterChangeHook = ({ doc, req }) => {
  try {
    revalidatePath("/", "layout");
  } catch {
    req.payload.logger.debug("[revalidate] bỏ qua / (không chạy trong Next)");
  }
  return doc;
};
