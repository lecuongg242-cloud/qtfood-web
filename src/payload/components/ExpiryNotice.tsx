"use client";

import { useFormFields } from "@payloadcms/ui";
import { daysUntil } from "./days-until";

/** Cảnh báo trong form Chứng nhận: đã hết hạn / còn dưới 6 tháng. */
export function ExpiryNotice() {
  const expiresAt = useFormFields(([fields]) => fields.expiresAt?.value as string | undefined);
  if (!expiresAt) return null;

  const days = daysUntil(expiresAt);
  if (days > 180) return null;

  const expired = days < 0;
  return (
    <div
      role="alert"
      style={{
        marginBottom: "1.5rem",
        padding: "0.9rem 1.1rem",
        borderRadius: 6,
        border: `1px solid ${expired ? "var(--theme-error-400)" : "var(--theme-warning-400)"}`,
        background: expired ? "var(--theme-error-50)" : "var(--theme-warning-50)",
        color: "var(--theme-text)",
      }}
    >
      <strong>{expired ? "Chứng nhận đã hết hiệu lực" : `Chứng nhận còn ${days} ngày là hết hiệu lực`}</strong>
      <div style={{ marginTop: 4, fontSize: 13 }}>
        {expired
          ? "Website vẫn đang hiển thị chứng nhận này — bỏ chọn \"Hiển thị trên website\" hoặc cập nhật chứng nhận mới."
          : "Liên hệ đơn vị cấp để đánh giá tái chứng nhận, sau đó cập nhật số, ngày cấp và ảnh văn bản mới."}
      </div>
    </div>
  );
}
