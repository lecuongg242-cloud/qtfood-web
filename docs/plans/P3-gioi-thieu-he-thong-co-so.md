# P3 — Giới thiệu & Hệ thống cơ sở

> Giai đoạn 1 · Ước lượng ~2 ngày · Phụ thuộc: P1 (PageHero, GalleryGrid, Lightbox, Steps) · Nhánh: `p3-gioi-thieu` · Trạng thái: ⚪

## Mục tiêu
Kể câu chuyện thương hiệu đủ tin cậy cho cả **khách ăn** lẫn **đối tác nhượng quyền**; cho thấy quy mô hơn 50 cơ sở.

## 1. `/gioi-thieu`
File: `src/app/gioi-thieu/page.tsx` + `src/content/pages/about.ts`

| # | Block | Nội dung (`content/qtfood.json`) | Hiệu ứng |
|---|---|---|---|
| 1 | PageHero (lớn, ảnh ruộng bậc thang) | "Tinh hoa thực phẩm, *vươn tầm sức khoẻ*" (slogan), tagline | Ảnh parallax, tiêu đề trồi dòng |
| 2 | Intro | `about.intro` + ảnh đội ngũ | Ảnh mở clip-path |
| 3 | BusinessLines | 3 mảng: dịch vụ ăn uống · chế biến sẵn · nguyên liệu tươi | Reveal so le |
| 4 | VisionMission | Tầm nhìn (trích dẫn lớn) + 3 sứ mệnh (khách hàng / đối tác / xã hội) | — |
| 5 | CoreValues | Tín – Tâm – Tinh – Tiến (tái dùng block trang chủ) | Chữ chạy ngang theo cuộn |
| 6 | CeoQuote | Tổng giám đốc Nguyễn Tiến Quang, ảnh chân dung, 2 câu "Thành công… / Hạnh phúc…" | Ảnh parallax |
| 7 | BrandIdentity | Logo, ý nghĩa: ngựa tung vó & thịt tươi; 4 cử chỉ (mạnh mẽ, tốc độ, thiên nhiên, chất lượng); 2 màu (xanh #4cb448, đỏ #ed1c24) + ý nghĩa | Ngựa trong logo chạy nhẹ khi xuất hiện |
| 8 | Certifications | ISO 22000:2018 (tái dùng) | Thẻ giấy nghiêng |
| 9 | CTA | Nhượng quyền + Sản phẩm | — |

Block mới: `VisionMission`, `CeoQuote`, `BrandIdentity`, `Intro` (hoặc `FeatureSplit` từ P1).

## 2. `/he-thong-co-so`
File: `src/app/he-thong-co-so/page.tsx` + `src/content/pages/stores.ts`
- PageHero "Hơn *50 cơ sở* trên khắp các tỉnh thành"
- Stats (50+ cơ sở, số tỉnh/thành — **chỉ hiện khi có số liệu**)
- GalleryGrid 26 ảnh khai trương + Lightbox (chú thích chung "Khai trương cơ sở nhượng quyền QT FOOD" vì chưa có tên từng cơ sở)
- CTA "Mở cơ sở tại tỉnh bạn" → `/nhuong-quyen#dang-ky`
- **Chuẩn bị sẵn cho dữ liệu sau:** type `Store { name, province, address, phone, geo, image }` + block `StoreLocator` (danh sách + lọc tỉnh + bản đồ) — ẩn khi `stores.length === 0`, bật tự động khi nhập dữ liệu ở P5

## 3. SEO
- `generateMetadata` 2 trang; JSON-LD `Organization` (logo, MST, hotline, MXH) trên `/gioi-thieu`
- Ảnh OG: ảnh đội ngũ / banner

## 4. Nghiệm thu
- [ ] Nội dung khớp `qtfood.json`, không tuyên bố tuyệt đối, không thêm số liệu chưa có nguồn
- [ ] Ảnh chân dung & đội ngũ sắc nét trên màn hình retina, không vỡ bố cục mobile
- [ ] Trang cơ sở tải nhanh dù 26 ảnh (lazy + kích thước đúng), Lightbox mượt
- [ ] StoreLocator không hiện khi chưa có dữ liệu

## 5. Cần QT FOOD (không chặn P3)
- Năm thành lập, số tỉnh/thành đã có cơ sở, cột mốc phát triển (để làm timeline — hiện chưa có nên không làm)
- Danh sách cơ sở (tên, địa chỉ, SĐT) — nhập ở P5
