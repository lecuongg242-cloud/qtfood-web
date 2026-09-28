"use client";

import { useSearchParams } from "next/navigation";

/** Nút "Xuất Excel (CSV)" phía trên danh sách khách hàng — giữ bộ lọc đang chọn. */
export function LeadsExportButton() {
  const params = useSearchParams();
  // Chỉ chuyển tiếp tham số lọc (where / search), bỏ phân trang
  const query = new URLSearchParams();
  params.forEach((value, key) => {
    if (key.startsWith("where")) query.append(key, value);
  });
  const qs = query.toString();
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
      <a className="btn btn--style-secondary btn--size-small" href={`/api/leads/export${qs ? `?${qs}` : ""}`} download>
        Xuất Excel (CSV)
      </a>
    </div>
  );
}
