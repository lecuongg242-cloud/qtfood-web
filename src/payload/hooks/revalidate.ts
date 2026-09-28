import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

/**
 * Làm mới các trang website liên quan khi dữ liệu đổi trong admin.
 * Chạy ngoài Next (vd `pnpm seed`) thì revalidatePath báo lỗi → bỏ qua.
 */
const revalidate = (paths: { path: string; type?: "page" | "layout" }[], log: (msg: string) => void) => {
  for (const { path, type } of paths) {
    try {
      revalidatePath(path, type);
    } catch {
      log(`[revalidate] bỏ qua ${path} (không chạy trong Next)`);
      return;
    }
  }
};

export const revalidateProductPages = (): {
  afterChange: CollectionAfterChangeHook;
  afterDelete: CollectionAfterDeleteHook;
} => {
  const paths = [{ path: "/san-pham", type: "layout" as const }, { path: "/" }];
  return {
    afterChange: ({ doc, req }) => {
      revalidate(paths, (m) => req.payload.logger.debug(m));
      return doc;
    },
    afterDelete: ({ doc, req }) => {
      revalidate(paths, (m) => req.payload.logger.debug(m));
      return doc;
    },
  };
};
