"use client";

import { useRouter, usePathname } from "next/navigation";
import { RefreshRouteOnSave } from "@payloadcms/live-preview-react";

/**
 * Chỉ hiện khi Draft Mode bật (xem bản nháp từ admin): thanh báo + nút thoát,
 * và tự tải lại trang mỗi khi admin lưu / tự lưu.
 */
export function PreviewBar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={typeof window === "undefined" ? "" : window.location.origin} />
      <div
        role="status"
        className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#10240f] py-2 pl-5 pr-2 text-sm font-semibold text-white shadow-lg"
      >
        Đang xem bản nháp
        <a href={`/next/exit-preview?path=${encodeURIComponent(pathname)}`} className="rounded-full bg-white/15 px-3 py-1.5 hover:bg-white/25">
          Thoát
        </a>
      </div>
    </>
  );
}
