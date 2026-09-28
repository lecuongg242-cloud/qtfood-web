# Nội dung & ảnh QT FOOD

Trích xuất từ website cũ https://sites.google.com/view/qtfood (2026-09-28). Dùng làm dữ liệu seed cho website mới (GĐ1: JSON → GĐ1c: import vào Payload).

## Cấu trúc

```
content/
├── qtfood.json      # toàn bộ nội dung có cấu trúc (company, home, about, products, franchise, franchisePolicy)
├── (public/images/) # 56 ảnh đã chọn lọc, đặt tên lại, nén (≤2400–3200px, JPG q86–88) — ~22MB
│   ├── brand/       # logo, banner "Thương hiệu nhượng quyền Lẩu ngựa & Phở ngựa" (bản gốc từ Drive, 3200px)
│   ├── about/       # đội ngũ (bản gốc từ Drive), Tổng giám đốc, ruộng bậc thang
│   ├── products/    # phở, lẩu, nem ngựa, nem riềng, giò, mọc
│   ├── franchise/   # khai-truong-01..26 — ảnh khai trương cơ sở nhượng quyền
│   ├── certificates/ # giấy chứng nhận + quyết định ISO 22000:2018 (WCERT, W2356F)
│   ├── icons/       # 4 icon mục Cam kết (clip-art cũ, sẽ thay)
│   └── decor/       # tranh vẽ nét núi đồi / ruộng bậc thang làm nền
└── source/          # (gitignored) HTML + ảnh gốc tải về, content.json thô
```

Ảnh nằm ở `public/images/` (phục vụ trực tiếp cho website); đường dẫn ảnh trong `qtfood.json` tương đối so với thư mục này.

## Trang cũ → nội dung

| Trang cũ | Khoá trong `qtfood.json` |
|---|---|
| Trang chủ | `home` (3 sản phẩm nổi bật, 4 cam kết) |
| Giới thiệu chung | `about`, `company.ceo` |
| Sản phẩm + 6 trang con | `products[]`, `productCategories` |
| Thương hiệu | `franchise` |
| Thương hiệu › Chính sách | `franchisePolicy` |
| Liên hệ / footer | `company` |
| *(bổ sung 2026-09-28)* Chứng nhận | `certifications[]` |

## Đã chỉnh khi trích xuất
- Sửa lỗi khoảng trắng: `qtfreshfood @gmail.com` → `qtfreshfood@gmail.com`, "A Hi ếu" → "Anh Hiếu", "N ước lẩu" → "Nước lẩu".
- Link Zalo bỏ redirect `google.com/url?q=`.
- Số cơ sở nhượng quyền cập nhật "40" → **"trên 50"** (theo xác nhận 2026-09-28).
- TikTok giữ link `@tho.ngh.tay.tri` (chỉnh trong admin nếu đổi).
- Bỏ ảnh rác (nền nút 174×48), ảnh trùng (3 ảnh khai trương, các bản tranh nền lặp lại).

## Cần xác nhận
- **Giò ngựa:** mục "Nguyên liệu chuẩn" nhắc "viên mọc" (nghi copy từ Mọc ngựa); giá `320.000đ/kg` nhưng KLT `250g`.
- **Nem riềng:** chỉ có ảnh gói hàng số lượng lớn, chưa có ảnh thành phẩm.
- Ảnh khai trương chưa gắn tên cơ sở / địa điểm (chưa cần — hiển thị chung "trên 50 cơ sở").
