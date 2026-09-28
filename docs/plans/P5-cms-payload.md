# P5 — CMS dữ liệu (Payload 3 + Neon + Vercel Blob) — GĐ1c

> Ước lượng ~4–5 ngày · Phụ thuộc: P1–P4 · Nhánh: `p5-cms` (tách từ `p4-hoan-thien`) · Trạng thái: 🟢 code xong, chờ deploy & QT FOOD thử

## P5 — Kết quả (2026-09-28)
- [x] **Thông tin chung lên website**: header, footer, nút liên hệ nổi, trang Liên hệ/Nhượng quyền/Giới thiệu, JSON-LD đọc global `site-settings` (`getSiteSettings`, trường trống → dữ liệu `qtfood.json`); lưu → làm mới toàn site. `content/site.ts` chỉ còn menu mặc định
- [x] Collection **`certifications`** (Chứng nhận): cảnh báo trong form khi còn ≤ 6 tháng / đã hết hạn; khối Chứng nhận trên web đọc từ CMS (chưa có bản ghi → dùng JSON); `pnpm seed` tạo ISO 22000:2018 khi đã có Blob
- [x] **Bảng điều khiển admin**: thẻ "Khách hàng mới chưa liên hệ" + "Chứng nhận sắp hết hạn"
- [x] **Live Preview** cho Sản phẩm & Tin tức (điện thoại / máy tính bảng / máy tính), tự lưu nháp 1,5s, `/next/preview` chỉ cho người đã đăng nhập (Draft Mode) + thanh "Đang xem bản nháp"; bản nháp chưa xuất bản không làm mới trang công khai
- [x] **Xuất Excel (CSV)** danh sách khách hàng theo bộ lọc đang chọn (`/api/leads/export`, chống CSV injection, BOM cho Excel)
- [x] Ảnh: giới hạn 15MB, bản gốc thu về ≤ 2400px, tải thẳng lên Blob (`clientUploads`, vượt giới hạn 4,5MB của Vercel)
- [x] Migration `cms_p5` (certifications, cột `autosave`); [tài liệu hướng dẫn admin](../huong-dan-admin.md) (chưa có ảnh chụp)
- [x] Đã thử trên Postgres local: đổi hotline trong admin → trang chủ & Liên hệ cập nhật; preview 403 khi chưa đăng nhập, chặn open-redirect; bản nháp chỉ hiện trong Draft Mode; gửi form → lead → CSV đúng; thẻ cảnh báo chứng nhận
- **Để sang P6:** collection `pages` (trang dựng bằng block), hẹn giờ đăng bài (cần Vercel Cron)
- [ ] Còn lại: chạy `pnpm migrate` + `pnpm seed` trên Neon (có Blob → chứng nhận & ảnh bài viết lên CMS); tạo tài khoản cho QT FOOD; thêm ảnh chụp vào tài liệu hướng dẫn; bật Neon branch cho preview


> **2026-09-28:** Neon Postgres đã tạo (PostgreSQL 18.6, region `ap-southeast-1`, DB `neondb`, đang trống), đã gắn vào Vercel; bản local lưu ở `.env.local` (không commit). Mẫu biến: `.env.example`.

## P5a — Lõi admin (làm trước P1, nhánh `p5a-admin-core`) ✅

Quyết định 2026-09-28: có DB sớm → dựng lõi CMS trước để form P1 lưu lead vào DB ngay từ đầu, các trang P2–P4 đọc thẳng từ CMS.

**Đã xong**
- [x] Payload 3.90.2 + `@payloadcms/db-postgres` (Neon, qua `DATABASE_URL`) + Lexical + Vercel Blob (tự bật khi có `BLOB_READ_WRITE_TOKEN`, `alwaysInsertFields` để schema không đổi)
- [x] `"type": "module"`, `next.config.ts` bọc `withPayload`, alias `@payload-config` → `src/payload.config.ts`
- [x] Trang web chuyển vào `src/app/(site)/`; admin & API ở `src/app/(payload)/`; route bắt-mọi-đường-dẫn `(site)/[...slug]` → 404 vẫn có header/footer
- [x] Admin **tiếng Việt** tại `/admin`; collections: `products`, `product-categories`, `leads`, `media`, `users` (Admin/Editor); global `site-settings`
- [x] `leads`: API công khai **không** tạo/đọc được (403) — chỉ Server Action ghi qua Local API
- [x] `products`: nháp/xuất bản (versions), khách chỉ đọc bản đã xuất bản
- [x] Migration đầu tiên `src/migrations/20260928_091351_initial` (22 bảng); `push: false` vì chỉ có 1 DB
- [x] `pnpm seed`: nhập thông tin chung, 2 nhóm, 6 sản phẩm (mô tả → Lexical); chạy lại không tạo trùng; ảnh chờ Vercel Blob
- [x] Kiểm tra: lint, tsc, build sạch; `/admin` → màn hình tạo tài khoản đầu tiên (tài khoản đầu tiên luôn là Admin)

**Scripts**
| Lệnh | Việc |
|---|---|
| `pnpm migrate:create <ten>` | Tạo migration sau khi sửa collection |
| `pnpm migrate` | Áp migration vào DB trong `DATABASE_URL` |
| `pnpm build:deploy` | `migrate` rồi `build` — dùng làm Build Command trên Vercel |
| `pnpm seed` | Nhập/cập nhật dữ liệu từ `content/qtfood.json` |
| `pnpm generate:types` / `generate:importmap` | Sinh lại kiểu & import map sau khi đổi config |

**Cần làm trên Vercel trước khi merge `p5a-admin-core`**
- [ ] Thêm `PAYLOAD_SECRET` (chuỗi ngẫu nhiên ≥ 32 ký tự, khác bản local) cho Production & Preview
- [ ] Settings → Build and Deployment → Build Command: `pnpm build:deploy`
- [x] Tạo Vercel Blob store + `BLOB_READ_WRITE_TOKEN` (local: `.env.local`) → `pnpm seed` đã tải 16 ảnh sản phẩm lên Blob (thư mục `media/`, link CDN trực tiếp) — **kiểm tra Blob store đã được gắn (Connect) vào project Vercel** để bản deploy có token
- [ ] ⚠️ Preview đang dùng chung DB với production → chỉ merge migration đã duyệt; nên bật "tạo Neon branch cho mỗi preview" trong tích hợp Neon

**Chưa làm (các phần còn lại của P5, làm dần cùng P1–P4)**: website đọc dữ liệu từ CMS, `posts`, `stores`, `certifications`, `pages`, live preview, revalidate khi lưu, tài liệu hướng dẫn admin.

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
