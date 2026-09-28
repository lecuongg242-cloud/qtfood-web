# P5 — CMS dữ liệu (Payload 3 + Neon + Vercel Blob) — GĐ1c

> Ước lượng ~4–5 ngày · Phụ thuộc: P1–P4 · Nhánh: `p5-cms` · Trạng thái: ⚪ (DB đã sẵn sàng)

> **2026-09-28:** Neon Postgres đã tạo (PostgreSQL 18.6, region `ap-southeast-1`, DB `neondb`, đang trống), đã gắn vào Vercel; bản local lưu ở `.env.local` (không commit). Mẫu biến: `.env.example`.

## Mục tiêu
Nhân viên QT FOOD **tự quản lý** sản phẩm, bài viết, cơ sở, chứng nhận, thông tin liên hệ và **xử lý lead** trong trang admin tiếng Việt — không cần lập trình. Website đọc dữ liệu từ CMS và tự cập nhật khi lưu.

## 1. Kiến trúc
- **Payload 3.9x** chạy trong chính project Next.js (đã kiểm tra: `@payloadcms/next` hỗ trợ Next `>=16.3.3` — dự án đang dùng 16.3.6)
- DB: **Neon Postgres** (Vercel Marketplace, region Singapore) qua `@payloadcms/db-vercel-postgres`
- File: **Vercel Blob** qua `@payloadcms/storage-vercel-blob`
- Admin tại `/admin`, giao diện **tiếng Việt** (i18n `vi` có sẵn trong Payload)

**Tái cấu trúc thư mục app** (bắt buộc — Payload cần root layout riêng):
```
src/app/
├── (site)/            ← chuyển toàn bộ trang hiện tại vào đây
│   ├── layout.tsx     ← layout.tsx hiện tại (Header, Footer, Lenis, GSAP…)
│   ├── page.tsx, nhuong-quyen/, san-pham/, …
├── (payload)/         ← do Payload tạo
│   ├── admin/[[...segments]]/
│   ├── api/[...slug]/
│   └── layout.tsx
src/payload/
├── payload.config.ts
├── collections/  globals/  access/  hooks/  seed/
```
`next.config.ts` bọc bằng `withPayload`. Kiểm tra lại toàn bộ route & hiệu ứng sau khi chuyển.

## 2. Mô hình dữ liệu
| Collection / Global | Trường chính | Ghi chú |
|---|---|---|
| `users` | email, tên, **role** (`admin` / `editor`) | Admin: mọi quyền; Editor: nội dung + lead, không sửa users/cài đặt |
| `media` | ảnh, alt (bắt buộc), caption | Tự tạo nhiều kích thước; lưu Blob |
| `product-categories` | tên, slug, mô tả | `mon-an`, `che-bien-san` |
| `products` | tên, slug, nhóm, tóm tắt, ảnh[], highlights[], specs (KLT, HSD, bảo quản, cách dùng, **giá, đơn vị**), mô tả (rich text), SEO, **nổi bật**, **hiển thị** | Có sẵn trường giá/đơn vị/tồn kho để P7 không đổi schema |
| `posts` / `post-categories` | tiêu đề, slug, ảnh bìa, tóm tắt, chuyên mục, ngày, nội dung, SEO | Nháp / xuất bản / hẹn giờ |
| `stores` | tên quán, tỉnh/thành, địa chỉ, SĐT, toạ độ, ảnh khai trương | Bật `StoreLocator` khi có dữ liệu |
| `certifications` | tiêu chuẩn, số, đơn vị cấp, **phạm vi**, hiệu lực từ–đến, văn bản (ảnh/PDF) | Cảnh báo trong admin khi sắp hết hạn (23/06/2028) |
| `pages` | tiêu đề, slug, **layout (blocks)**, SEO | Block trong Payload **trùng tên & trường** với union `Block` hiện tại (`{blockType, …props}` ↔ `{type, props}`) → P6 dùng lại, không chuyển đổi dữ liệu |
| `leads` | loại (đặt hàng / nhượng quyền / liên hệ), thông tin form, sản phẩm & số lượng (đặt hàng), trang gửi, **trạng thái** (mới → đã gọi → thành công / huỷ), người phụ trách, ghi chú nội bộ | Chỉ tạo qua Server Action (Local API); admin xem/lọc/xuất CSV |
| Global `site-settings` | tên công ty, MST, địa chỉ, hotline[], email, MXH, menu, footer, ảnh OG mặc định | Thay `content/site.ts` |

## 3. Nhập dữ liệu (seed)
- `src/payload/seed/index.ts` (chạy bằng `payload run`): đọc `content/qtfood.json`, `posts.json`, `policies.json`, các file `src/content/pages/*.ts` → tạo bản ghi; tải ảnh `public/images/**` lên Media (Blob)
- Chuyển `RichBody` (p/h2/h3/list) → Lexical; trang dùng `RichText` của `@payloadcms/richtext-lexical/react`
- Chạy được nhiều lần (idempotent theo slug) để thử trên nhánh DB riêng
- Sau seed: `public/images` chỉ giữ ảnh trang trí (decor, logo)

## 4. Website đọc từ CMS
- Lớp truy cập dữ liệu `src/lib/data/*` (Local API `getPayload`) thay `src/content/data.ts`; giữ nguyên props các block → component không đổi
- Trang tĩnh + cập nhật khi lưu: hook `afterChange` / `afterDelete` gọi `revalidatePath` / `revalidateTag` (đọc `…/04-functions/revalidatePath.md` trước khi làm)
- **Live Preview** trong admin cho Products, Posts, Pages
- Action lead (P1) ghi vào `leads` rồi mới gửi thông báo; thông báo kèm link mở lead trong admin

## 5. Vận hành
- Migration: `payload migrate:create` khi đổi schema; build trên Vercel chạy `payload migrate && next build`
- **Nhánh DB Neon**: preview dùng branch riêng, production dùng `main` — thử seed/migration không ảnh hưởng dữ liệu thật
- Sao lưu: khôi phục theo thời điểm (PITR) của Neon; xuất dữ liệu định kỳ
- Tài liệu admin ngắn (có ảnh chụp): thêm sản phẩm, đăng bài, xử lý lead, đổi hotline, thêm cơ sở

## 6. Biến môi trường
| Biến | Nguồn |
|---|---|
| `DATABASE_URL` / `POSTGRES_URL` | Tự thêm khi gắn Neon từ Vercel Marketplace |
| `BLOB_READ_WRITE_TOKEN` | Tự thêm khi tạo Vercel Blob store |
| `PAYLOAD_SECRET` | Chuỗi ngẫu nhiên ≥ 32 ký tự, khác nhau giữa preview/production |
| (giữ từ P1) `TELEGRAM_*`, `RESEND_API_KEY`, `LEAD_EMAIL_*` | — |

## 7. Nghiệm thu
- [ ] Đăng nhập `/admin` (tiếng Việt), phân quyền Admin/Editor đúng
- [ ] Sửa giá sản phẩm / đăng bài mới → hiện trên web trong vài giây, không cần deploy
- [ ] Gửi form → lead xuất hiện trong admin + thông báo Telegram/email có link tới lead
- [ ] Toàn bộ trang hiển thị giống hệt trước khi chuyển sang CMS (so sánh ảnh chụp)
- [ ] Lighthouse không giảm so với P4
- [ ] Nhân viên QT FOOD tự làm được 5 thao tác trong tài liệu hướng dẫn

## 8. Rủi ro
| Rủi ro | Phương án |
|---|---|
| Chuyển app vào `(site)` làm hỏng route/hiệu ứng | Làm bước này đầu tiên, kiểm tra lại toàn bộ trước khi thêm collection |
| Neon ngủ sau 5 phút (gói free) → lần mở admin đầu chậm | Trang public là tĩnh nên khách không bị ảnh hưởng; nâng gói khi go-live |
| Ảnh lớn làm chậm admin | Giới hạn kích thước upload, Payload tự tạo bản nhỏ |

## 9. Cần QT FOOD
- Danh sách tài khoản admin/editor (email); gói Vercel Pro; ai xử lý lead
