import type { Endpoint, Where } from "payload";
import type { Lead, Product, User } from "../../payload-types";

const TYPE: Record<string, string> = { order: "Đặt hàng", franchise: "Nhượng quyền", contact: "Liên hệ" };
const STATUS: Record<string, string> = { new: "Mới", contacted: "Đã liên hệ", won: "Thành công", lost: "Không thành" };

const cell = (v: unknown) => {
  const s = v === null || v === undefined ? "" : String(v);
  // Chặn công thức khi mở bằng Excel (CSV injection) + escape dấu nháy
  const safe = /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
  return `"${safe.replace(/"/g, '""')}"`;
};

const vnTime = (iso: string) =>
  new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short", timeZone: "Asia/Ho_Chi_Minh" }).format(new Date(iso));

/**
 * GET /api/leads/export — tải danh sách khách hàng (CSV, mở bằng Excel).
 * Giữ nguyên bộ lọc đang chọn ở màn hình danh sách (tham số `where` trên URL).
 */
export const leadsExport: Endpoint = {
  path: "/export",
  method: "get",
  handler: async (req) => {
    if (!req.user) return Response.json({ message: "Chưa đăng nhập" }, { status: 401 });
    const where = (req.query?.where ?? {}) as Where;
    const { docs } = await req.payload.find({
      collection: "leads",
      where,
      sort: "-createdAt",
      limit: 5000,
      depth: 1,
      pagination: false,
      overrideAccess: false,
      user: req.user,
      req,
    });

    const header = ["Ngày gửi", "Loại", "Trạng thái", "Họ tên", "Điện thoại", "Email", "Tỉnh/thành", "Nội dung", "Sản phẩm", "Địa chỉ nhận", "Mặt bằng", "Ngân sách", "Người phụ trách", "Ghi chú nội bộ", "Trang gửi"];
    const rows = (docs as Lead[]).map((l) => [
      vnTime(l.createdAt),
      TYPE[l.type] ?? l.type,
      STATUS[l.status] ?? l.status,
      l.name,
      l.phone,
      l.email,
      l.province,
      l.message,
      (l.orderInfo?.items ?? [])
        .map((i) => `${typeof i.product === "object" && i.product ? (i.product as Product).name : "?"} x${i.quantity ?? 1}`)
        .join("; "),
      l.orderInfo?.address,
      l.franchiseInfo?.hasPremises === "yes" ? "Đã có" : l.franchiseInfo?.hasPremises === "no" ? "Chưa có" : "",
      l.franchiseInfo?.budget,
      typeof l.assignee === "object" && l.assignee ? (l.assignee as User).name : "",
      l.internalNote,
      l.sourcePage,
    ]);

    // BOM để Excel đọc đúng tiếng Việt (UTF-8)
    const csv = "﻿" + [header, ...rows].map((r) => r.map(cell).join(",")).join("\r\n");
    const date = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh" }).format(new Date());
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="khach-hang-${date}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  },
};
