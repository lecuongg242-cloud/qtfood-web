# P2 — Sản phẩm & đặt hàng nhanh

> Giai đoạn 1 · Ước lượng ~3 ngày · Phụ thuộc: P1, P5a · Nhánh: `p2-san-pham` (tách từ `p1-nhuong-quyen`) · Trạng thái: 🟢 xong

## Kết quả (2026-09-28)
- [x] **Đọc dữ liệu từ CMS** (Payload Local API, `src/lib/data/products.ts`) — trang tĩnh (SSG) + tự làm mới khi sửa sản phẩm/nhóm trong admin (hook `revalidatePath`)
- [x] `/san-pham`, `/san-pham/[danh-muc]` (tab lọc bằng đường dẫn), `/san-pham/[danh-muc]/[slug]` — sai nhóm/slug → 404
- [x] Trang chi tiết: thư viện ảnh + phóng to, giá/thông số, điểm nổi bật, mô tả rich text (Lexical), sản phẩm cùng nhóm, thanh đặt hàng dính đáy (mobile, tự đẩy nút Zalo/Gọi lên), JSON-LD `Product` + `Offer`
- [x] Chuyển cảnh ảnh thẻ → trang chi tiết (`<ViewTransition>` của React)
- [x] **Đặt hàng nhanh** (hộp thoại, trượt từ đáy trên mobile): số lượng −/+, tạm tính; Server Action tra giá phía server → lưu `leads` (type `order`, sản phẩm + số lượng + địa chỉ) → thông báo kèm tạm tính. Đã thử thật & xoá đơn thử
- [x] Món tại quán (Lẩu, Phở) không có giá → CTA Nhượng quyền + gọi hotline
- [x] Trường CMS mới **"Hiện huy hiệu ISO 22000:2018"** (migration `product_iso_badge`), seed chỉ bật cho Nem ngựa (đúng phạm vi chứng nhận)
- [x] `ProductCard` dùng chung (trang chủ, danh mục, liên quan), card cao bằng nhau
- [ ] Ảnh sản phẩm vẫn lấy từ `public/images` (tạm) cho tới khi gắn Vercel Blob và chạy lại `pnpm seed`
- [ ] Nội dung Giò ngựa (giá/kg vs KLT 250g, câu "viên mọc") — chờ QT FOOD, sửa được trực tiếp trong admin


## Mục tiêu
Khách xem sản phẩm dễ, tin tưởng (ảnh, thông số, chứng nhận) và **đặt hàng trong ≤ 3 bước** trên điện thoại. Giỏ hàng thật để P7.

## Phạm vi
**Trong:** danh sách, lọc theo nhóm, trang chi tiết, form đặt nhanh, chuyển cảnh ảnh (View Transitions), SEO sản phẩm.
**Ngoài:** giỏ hàng, thanh toán online, tồn kho (→ P7).

## 1. Route
| Route | File | Ghi chú |
|---|---|---|
| `/san-pham` | `src/app/san-pham/page.tsx` | Tất cả sản phẩm |
| `/san-pham/[danh-muc]` | `src/app/san-pham/[danh-muc]/page.tsx` | `mon-an`, `che-bien-san` — lọc bằng **đường dẫn** (SEO tốt, chia sẻ được), `generateStaticParams` |
| `/san-pham/[danh-muc]/[slug]` | `src/app/san-pham/[danh-muc]/[slug]/page.tsx` | 6 sản phẩm, `generateStaticParams`; `params` là Promise (Next 16); slug sai → `notFound()` |

## 2. Trang danh sách
- PageHero "Đặc sản *thịt ngựa* QT FOOD"
- Thanh lọc dạng tab (Tất cả / Món tại quán / Chế biến sẵn), gạch chân trượt theo tab đang chọn
- Lưới dùng lại card của `ProductList`; card "Món tại quán" (Lẩu, Phở) không có giá → CTA "Tìm cơ sở gần bạn" / "Nhượng quyền"
- Dải chứng nhận ISO (gọn) + CTA liên hệ đặt sỉ

## 3. Trang chi tiết
| Khu vực | Nội dung |
|---|---|
| Thư viện ảnh | Ảnh lớn + dải ảnh nhỏ, bấm mở Lightbox; ảnh lớn có `ViewTransition name="product-<slug>"` khớp với ảnh ở card |
| Thông tin | Tên, nhóm, tóm tắt, **giá / đơn vị**, bảng KLT · HSD · bảo quản · cách dùng (từ `specs`), điểm nổi bật (`highlights`) |
| Hành động | **Đặt hàng** (mở form nhanh) · Gọi · Zalo; món tại quán: "Tìm cơ sở" + "Nhượng quyền" |
| Chứng nhận | Chỉ hiện huy hiệu ISO 22000:2018 cho **Nem ngựa** (phạm vi chứng nhận: nem lợn, nem ngựa) |
| Mô tả dài | `RichBody` từ `products[].body` |
| Liên quan | 3–4 sản phẩm cùng nhóm |
| Thanh CTA dính đáy (mobile) | Giá + nút Đặt hàng luôn hiện khi cuộn |

## 4. Đặt hàng nhanh
- `<dialog>` (hoặc bottom sheet trên mobile): sản phẩm (điền sẵn), số lượng (− / +), họ tên, SĐT, địa chỉ nhận, ghi chú
- Tạm tính = giá × số lượng (ghi rõ "chưa gồm phí giao hàng")
- Dùng action lead của P1 với `type: "order"` → Telegram + email; lời cảm ơn + "QT FOOD sẽ gọi xác nhận đơn"

## 5. Chuyển cảnh & hiệu ứng
- Theo `node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`: `import { ViewTransition } from "react"`, cùng `name` ở card và ảnh chi tiết → ảnh "bay" sang trang mới; trình duyệt không hỗ trợ vẫn điều hướng bình thường
- Hover card giữ như trang chủ; tab lọc chuyển mượt (crossfade lưới)

## 6. SEO
- `generateMetadata` từng sản phẩm: title, description (từ `summary`), ảnh OG = ảnh đầu tiên
- JSON-LD `Product` + `Offer` (giá VND, đơn vị) theo `…/02-guides/json-ld.md`; món tại quán dùng `MenuItem`/không có Offer
- Ảnh có `alt` mô tả món

## 7. Dữ liệu
- Rà nội dung: **Giò ngựa** — mục "Nguyên liệu chuẩn" nhắc "viên mọc"; giá `320.000đ/kg` nhưng KLT `250g` → chờ QT FOOD xác nhận, tạm giữ nguyên
- `products[].body` cho Nem riềng/Giò/Mọc còn ngắn → chấp nhận, bổ sung ở CMS (P5)

## 8. Nghiệm thu
- [ ] Trang chủ → card sản phẩm → chi tiết: ảnh chuyển cảnh mượt (Chrome/Edge), Safari vẫn điều hướng đúng
- [ ] Đặt hàng từ điện thoại ≤ 3 bước, nhận thông báo Telegram/email kèm sản phẩm, số lượng, tạm tính
- [ ] URL lọc chia sẻ được, nút quay lại trình duyệt đúng tab
- [ ] Kiểm tra Rich Results (Google) cho 1 trang sản phẩm: `Product` hợp lệ
- [ ] Không gắn ISO cho sản phẩm ngoài phạm vi

## 9. Cần QT FOOD
- Sửa nội dung Giò ngựa; ảnh sản phẩm nền đồng nhất (nếu có); ảnh Nem riềng thành phẩm
- Phí/khu vực giao hàng (để ghi chú trong form) — mặc định "QT FOOD báo phí khi gọi xác nhận"
