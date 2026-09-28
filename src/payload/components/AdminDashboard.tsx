import Link from "next/link";
import type { Payload } from "payload";
import { daysUntil, isoInDays } from "./days-until";

const card: React.CSSProperties = {
  flex: "1 1 260px",
  padding: "1.1rem 1.25rem",
  borderRadius: 8,
  border: "1px solid var(--theme-elevation-150)",
  background: "var(--theme-elevation-0)",
  textDecoration: "none",
  color: "var(--theme-text)",
};

/** Đầu trang Dashboard: khách hàng mới chưa xử lý + chứng nhận sắp hết hạn (≤ 6 tháng). */
export async function AdminDashboard({ payload }: { payload: Payload }) {
  const soon = isoInDays(180);
  const [leads, certs] = await Promise.all([
    payload.count({ collection: "leads", where: { status: { equals: "new" } }, overrideAccess: true }),
    payload.find({
      collection: "certifications",
      where: { active: { equals: true }, expiresAt: { less_than_equal: soon } },
      limit: 10,
      depth: 0,
      overrideAccess: true,
    }),
  ]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
      <Link href="/admin/collections/leads?where[status][equals]=new" style={card}>
        <div style={{ fontSize: 13, opacity: 0.7 }}>Khách hàng mới chưa liên hệ</div>
        <div style={{ fontSize: 32, fontWeight: 700, marginTop: 4, color: leads.totalDocs ? "var(--theme-success-600)" : undefined }}>
          {leads.totalDocs}
        </div>
        <div style={{ fontSize: 13, marginTop: 4 }}>Xem danh sách →</div>
      </Link>
      {certs.docs.map((c) => {
        const days = daysUntil(c.expiresAt);
        return (
          <Link key={c.id} href={`/admin/collections/certifications/${c.id}`} style={{ ...card, borderColor: "var(--theme-warning-400)" }}>
            <div style={{ fontSize: 13, opacity: 0.7 }}>Chứng nhận sắp hết hạn</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 6 }}>{c.standard}</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>{days < 0 ? "Đã hết hiệu lực" : `Còn ${days} ngày`} — cập nhật →</div>
          </Link>
        );
      })}
    </div>
  );
}
