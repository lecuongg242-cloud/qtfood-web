# P6 — Visual editor & template (Giai đoạn 2)

> Ước lượng ~3–4 tuần · Phụ thuộc: P5 · Nhánh: `p6a-…`, `p6b-…`, `p6c-…` · Trạng thái: ⚪
> Thiết kế chi tiết màn hình & sidebar: [../PLAN.md mục 7](../PLAN.md#7-visual-editor-giai-đoạn-2)

## Mục tiêu
Admin bấm vào nội dung **ngay trên trang thật** để sửa; chỉnh font, cỡ chữ, màu, khoảng cách… ở **sidebar bên phải**; lưu các trang thành **template** để tạo trang mới.

## Nguyên tắc
- Dữ liệu trang dùng chung với P5 (`pages.layout` = danh sách block) — editor chỉ là giao diện sửa khác, không tạo định dạng dữ liệu thứ hai
- Block giữ nguyên component đang chạy trên web → "thấy sao được vậy"
- Style mặc định lấy từ **token** (màu, cỡ chữ, khoảng cách của bộ màu đã chốt); vẫn cho nhập giá trị tuỳ chỉnh

## P6a — Spike & editor cơ bản (~1–1,5 tuần)
- [ ] **Spike 2–3 ngày** với **Puck** (`@puckeditor/core`, bản 0.23 tại thời điểm lập plan): (1) chọn được **phần tử con** trong block (tiêu đề, ảnh, nút), (2) thay sidebar phải bằng UI riêng, (3) sửa chữ inline trên canvas, (4) canvas chạy được Lenis/GSAP mà không lỗi
  - Đạt → dùng Puck. Không đạt → editor tự xây trên `dnd-kit` + `zustand`, vẫn dùng lại block & dữ liệu
- [ ] Route `/editor/[[...slug]]`, chỉ user đăng nhập Payload (role admin/editor) mới vào được
- [ ] Đăng ký toàn bộ block (cấu hình field sinh từ type props của block)
- [ ] Sidebar trái: thư viện block (kéo vào trang), cây cấu trúc trang; kéo thả sắp xếp, nhân bản, xoá
- [ ] Wrapper `<Editable path="…" styleKey="…">`: bấm chọn phần tử, sửa chữ inline, toolbar nổi (đậm, nghiêng, link, lên/xuống, nhân bản, xoá)
- [ ] Sidebar phải — tab **Nội dung** (chữ, ảnh từ thư viện Media, link, danh sách lặp)
- [ ] Lưu nháp / Xuất bản qua Payload (versions & drafts)
- ✅ Sửa được nội dung mọi trang trực tiếp trên canvas và xuất bản

## P6b — Style & responsive (~1 tuần)
- [ ] Sidebar phải — tab **Style**: typography (font, cỡ, độ đậm, line-height, letter-spacing, căn lề, màu), kích thước, margin/padding dạng hộp 4 cạnh, nền (màu/gradient/ảnh + lớp phủ), viền/bo góc/bóng, bố cục block (cột, khoảng cách)
- [ ] Tab **Hiệu ứng**: kiểu xuất hiện (fade-up / clip / split-text / không), độ trễ, hover preset
- [ ] Tab **Nâng cao**: ẩn/hiện theo thiết bị, anchor ID, reset style
- [ ] **Responsive**: nút Desktop / Tablet / Mobile trên top bar; giá trị theo breakpoint, kế thừa từ màn lớn, chấm màu khi có override
- [ ] Lưu style dạng `{ base, tablet, mobile }` với giá trị `token:*` hoặc tuỳ chỉnh → biên dịch thành CSS variables + media query theo từng block (không inline style lộn xộn, không CLS)
- [ ] Cảnh báo khi giá trị ngoài token (vd màu chữ không đủ tương phản)
- ✅ Chỉnh font/cỡ/màu/khoảng cách qua sidebar phải, hiển thị đúng trên 3 thiết bị

## P6c — Template & quy trình (~0,5–1 tuần)
- [ ] Collection `templates`: lưu cả trang hoặc 1 nhóm block thành template (tên, ảnh xem trước tự chụp)
- [ ] "Tạo trang từ template" → nhân bản → sửa
- [ ] Template mặc định sinh từ trang GĐ1: Trang chủ, Landing sản phẩm, Giới thiệu, Tin tức, Nhượng quyền, Liên hệ
- [ ] Undo/redo, tự lưu nháp, lịch sử phiên bản & khôi phục, hẹn giờ xuất bản
- [ ] Phân quyền: Admin sửa template; Editor sửa trang, không xoá template
- ✅ Tạo được 1 trang landing mới hoàn toàn từ template trong < 15 phút, không cần lập trình

## Rủi ro
| Rủi ro | Phương án |
|---|---|
| Puck chỉ chọn cấp block | Spike quyết định sớm; fallback editor tự xây |
| Chỉnh style tự do làm vỡ mobile / lệch thương hiệu | Token làm mặc định, preview 3 thiết bị, cảnh báo tương phản, nút reset |
| Hiệu ứng GSAP trong canvas editor gây giật khi chọn phần tử | Tắt Lenis & animation trong chế độ editor, có nút "xem trước hiệu ứng" |
