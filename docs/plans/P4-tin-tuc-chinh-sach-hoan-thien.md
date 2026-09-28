# P4 — Tin tức, chính sách chung, SEO & hoàn thiện GĐ1

> Giai đoạn 1 · Ước lượng ~3 ngày · Phụ thuộc: P1–P3 · Nhánh: `p4-hoan-thien` · Trạng thái: 🟡 code xong, chờ QA đầy đủ & duyệt nội dung

## Kết quả (2026-09-28)
- [x] Đổi hướng so với plan gốc: Tin tức & Chính sách lưu trong **Payload** (collection `posts`, `policies` + migration `posts_policies`), không dùng JSON — thống nhất với P2–P3. `content/posts.json`, `content/policies.json` chỉ là dữ liệu seed (`pnpm seed`, chỉ tạo mới, không ghi đè bản đã sửa trong admin)
- [x] `/tin-tuc`: lưới bài + bài mới nhất nổi bật, lọc Tin tức / Khai trương / Hoạt động (`?loai=`, trang vẫn tĩnh); `/tin-tuc/[slug]`: ảnh bìa, ngày, chuyên mục, nội dung, chia sẻ (Facebook, Zalo/khác qua Web Share, sao chép link), bài liên quan, JSON-LD `Article`
- [x] 4 bài mở đầu (ISO 22000:2018, hơn 50 cơ sở, mô hình nhượng quyền, thưởng thức nem ngựa) — soạn từ `qtfood.json`, không thêm số liệu mới
- [x] Trang chủ: block `NewsList` (3 bài mới nhất) trước Liên hệ, tự ẩn khi chưa có bài
- [x] `/chinh-sach/[slug]`: vận chuyển, thanh toán, đổi trả, bảo mật (bản mẫu) + link ở footer
- [x] Logo & ngựa vector hoá (potrace) → `public/brand/logo-qtfood.svg`, `logo-qtfood-white.svg`, `horse.svg`; header/footer/HorseMark/favicon (`icon.svg`) dùng SVG. Bản PNG giữ lại cho JSON-LD & OG
- [x] Hiệu ứng mở trang `IntroHorse`: vẽ nét ngựa (DrawSVG) → tô màu → màn che trượt lên, 1,2s, 1 lần/phiên, bỏ qua khi reduced-motion, tự ẩn sau 2,5s nếu JS lỗi
- [x] SEO: `sitemap.ts` (trang, nhóm SP, sản phẩm, bài, chính sách), `robots.ts` (chặn /admin, /api; link preview chặn toàn bộ), `metadataBase`, canonical mọi trang, JSON-LD `Organization` + `LocalBusiness` trong layout (chưa có giờ mở cửa)
- [x] Trang 404 thật (thay "đang xây dựng")
- [x] Sửa kèm: khoảng cách đoạn văn trong nội dung RichText (cả trang sản phẩm); menu header xuống dòng ở 1280px
- [x] Đã kiểm tra: `tsc`, `lint`, `build` sạch; chạy thử với Postgres local (migrate + seed); không cuộn ngang ở 390 / 1024 / 1280 / 1440
- [ ] Còn lại: Lighthouse, thử trên Safari iOS / Cốc Cốc / Zalo in-app, rà chính tả toàn site (mục 5); go-live (mục 6); QT FOOD duyệt bài & chính sách mẫu

**Triển khai lên Vercel:** cần chạy migration `posts_policies` trên Neon trước khi build (Build Command = `pnpm build:deploy`, hoặc chạy tay `pnpm migrate`), rồi `pnpm seed` để nhập bài & chính sách mẫu. Đặt `NEXT_PUBLIC_SITE_URL` khi có tên miền.


## Mục tiêu
Đủ 10 trang theo sitemap, đạt chuẩn chất lượng để **go-live bản đầu** (dữ liệu vẫn từ JSON).

## 1. Tin tức & hoạt động
| Route | Ghi chú |
|---|---|
| `/tin-tuc` | Lưới bài, lọc: Tin tức / Khai trương / Hoạt động (lọc bằng query `?loai=` hoặc route con) |
| `/tin-tuc/[slug]` | Ảnh bìa, ngày, chuyên mục, `RichBody`, chia sẻ (Facebook, Zalo, sao chép link), bài liên quan |

- Dữ liệu tạm: `content/posts.json` — `{ slug, title, excerpt, category, date, cover, body[] }` (cùng định dạng `RichBody`) → chuyển sang Payload ở P5 không đổi cấu trúc
- **3–5 bài mở đầu** soạn từ thông tin sẵn có để QT FOOD duyệt: giới thiệu mô hình nhượng quyền, cột mốc hơn 50 cơ sở (kèm ảnh khai trương), QT FOOD đạt ISO 22000:2018, cách thưởng thức nem ngựa đúng vị… — không bịa số liệu, ngày tháng
- Trang chủ: thêm block `NewsList` (3 bài mới nhất) trước phần Liên hệ

## 2. Chính sách chung
- `/chinh-sach/[slug]`: `van-chuyen`, `thanh-toan`, `doi-tra`, `bao-mat`
- Dữ liệu: `content/policies.json`; **bản mẫu để QT FOOD duyệt** (phù hợp giai đoạn chưa bán online: đặt hàng qua điện thoại/Zalo, COD/chuyển khoản)
- Link ở footer; chính sách bảo mật nêu rõ dữ liệu form được dùng để liên hệ tư vấn

## 3. Logo SVG & hiệu ứng mở trang
- Vector hoá `content/source/brand/logo-goc.png` → `public/brand/logo-qtfood.svg`, `horse.svg` (potrace hoặc vẽ lại, dọn nét thủ công)
- Header/footer/favicon dùng SVG (nhẹ, nét trên mọi màn hình)
- Hiệu ứng lần đầu vào site: nét ngựa được vẽ (GSAP DrawSVG) → mở ra hero; chỉ chạy 1 lần mỗi phiên, ≤ 1,2 giây, bỏ qua khi reduced-motion

## 4. SEO kỹ thuật
- `src/app/sitemap.ts` (mọi trang, sản phẩm, bài viết), `src/app/robots.ts` (hoàn thiện từ P0)
- JSON-LD: `Organization` + `LocalBusiness` (địa chỉ, giờ mở cửa nếu có, toạ độ) trong layout; `Article` cho bài viết
- `generateMetadata` + OG image cho mọi trang; canonical; `lang="vi"`
- Trang 404 thật (thay trang "đang xây dựng" khi đủ trang)

## 5. Kiểm tra chất lượng (QA)
| Hạng mục | Tiêu chí |
|---|---|
| Responsive | 360 / 390 / 768 / 1024 / 1440 / 1920 — không cuộn ngang, chữ không tràn, ảnh đúng tỉ lệ |
| Hiệu năng | Lighthouse mobile ≥ 90 (Performance, SEO, Accessibility, Best Practices); LCP < 2,5s; CLS < 0,1 |
| Truy cập | Tương phản chữ đạt AA, điều hướng bằng bàn phím, focus rõ, `alt` ảnh, nhãn form |
| Hiệu ứng | 60fps khi cuộn trên điện thoại tầm trung; reduced-motion tắt parallax/scrub |
| Nội dung | Rà toàn bộ chữ: chính tả, dấu tiếng Việt, không từ tuyệt đối hoá, số điện thoại/email đúng |
| Trình duyệt | Chrome, Safari iOS, Firefox, Cốc Cốc, Zalo in-app browser |
| Liên kết | Không còn link 404 trong menu/footer |

## 6. Go-live bản đầu (nếu QT FOOD muốn ra mắt trước P5)
- [ ] Gắn tên miền, HTTPS, chuyển hướng www
- [ ] Gói Vercel Pro
- [ ] Google Search Console + gửi sitemap; Google Business Profile trỏ về web
- [ ] Google Analytics 4 hoặc Vercel Analytics (hỏi QT FOOD)

## 7. Nghiệm thu
- [ ] 10 trang hoạt động, không trang "đang xây dựng"
- [ ] Bảng QA mục 5 đạt
- [ ] QT FOOD duyệt nội dung bài viết & chính sách mẫu

## 8. Cần QT FOOD
- Duyệt bài viết mẫu, chính sách mẫu; giờ làm việc (cho LocalBusiness); chọn công cụ thống kê truy cập; tên miền
