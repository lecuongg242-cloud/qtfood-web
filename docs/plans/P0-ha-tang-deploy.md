# P0 — Hạ tầng & deploy

> Giai đoạn 1 · Ước lượng 0,5–1 ngày · Phụ thuộc: — · Trạng thái: 🟡 gần xong

## Mục tiêu
Mọi thay đổi đều có link xem online để duyệt; `main` luôn là bản production chạy được.

## Đã xong
- [x] Repo GitHub `lecuongg242-cloud/qtfood-web`, nhánh `main` đã push (`e761a42`, `73f639e`)
- [x] Project Vercel build thành công từ `main`

## Việc còn lại
- [ ] **Cấu hình Vercel project**
  - Node.js Version: `22.x`
  - Functions region: `sin1` (Singapore) — chưa ảnh hưởng lúc này (web tĩnh), cần cho form (P1) & CMS (P5)
  - Gói **Pro** trước khi go-live (Hobby không cho dùng thương mại)
- [ ] **Chặn index link preview**: thêm `src/app/robots.ts` trả `disallow: /` khi `process.env.VERCEL_ENV !== "production"`; production cho phép (sitemap hoàn thiện ở P4)
- [ ] **Bảo vệ nhánh `main`** (GitHub → Settings → Branches): chỉ merge qua PR, yêu cầu Vercel build xanh
- [ ] **Tên miền** (khi có): gắn vào Vercel, bật HTTPS, chuyển hướng `www` ↔ gốc
- [ ] Ghi link production + quy trình duyệt vào `docs/plans/README.md`

## Biến môi trường
Chưa cần. Next tự lấy URL deploy từ biến hệ thống của Vercel (`VERCEL_PROJECT_PRODUCTION_URL`, `VERCEL_URL`) cho `metadataBase`/ảnh OG.

## Nghiệm thu
- [ ] Mở link production trên điện thoại & máy tính: font, ảnh, hiệu ứng, header cố định hoạt động
- [ ] Tạo thử 1 nhánh → có link preview riêng, link preview có `noindex`
- [ ] Chia sẻ link lên Zalo/Facebook hiện ảnh banner QT FOOD
