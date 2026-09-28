# Kế hoạch triển khai theo từng phần (P0 – P7)

> Lập 2026-09-28. Tổng quan dự án, thiết kế & quyết định chung: [../PLAN.md](../PLAN.md).
> Mỗi P là một phần việc giao được độc lập, kết thúc bằng **1 link preview Vercel** để duyệt.

| P | Tên | Giai đoạn | Ước lượng* | Phụ thuộc | Trạng thái |
|---|---|---|---|---|---|
| [P0](P0-ha-tang-deploy.md) | Hạ tầng & deploy | GĐ1 | 0,5–1 ngày | — | 🟡 Gần xong (GitHub ✓, Vercel ✓) |
| [P1](P1-nhuong-quyen-lien-he.md) | Nhượng quyền & Liên hệ (form khách hàng) | GĐ1 | ~3 ngày | P0 | ⚪ Chưa bắt đầu |
| [P2](P2-san-pham.md) | Sản phẩm & đặt hàng nhanh | GĐ1 | ~3 ngày | P1 (form, thông báo) | ⚪ |
| [P3](P3-gioi-thieu-he-thong-co-so.md) | Giới thiệu & Hệ thống cơ sở | GĐ1 | ~2 ngày | P1 (PageHero, Lightbox) | ⚪ |
| [P4](P4-tin-tuc-chinh-sach-hoan-thien.md) | Tin tức, chính sách chung, SEO & hoàn thiện GĐ1 | GĐ1 | ~3 ngày | P1–P3 | ⚪ |
| [P5](P5-cms-payload.md) | CMS dữ liệu (Payload + Neon + Blob) | GĐ1c | ~4–5 ngày | P1–P4 | ⚪ DB Neon sẵn sàng |
| [P6](P6-visual-editor-template.md) | Visual editor & template | GĐ2 | ~3–4 tuần | P5 | ⚪ |
| [P7](P7-ban-hang-online.md) | Bán hàng online (giỏ hàng, thanh toán) | GĐ3 | ~2–3 tuần | P5 | ⚪ |

\* Ngày làm việc, chỉ để tham khảo độ lớn và thứ tự.

**Mốc ra mắt**
- Sau **P4**: website đủ 10 trang (dữ liệu JSON) → có thể go-live bản đầu.
- Sau **P5**: nhân viên tự quản lý nội dung & lead → go-live chính thức.

## Quy ước làm việc

**Nhánh & duyệt**
- Mỗi P làm trên nhánh `p<n>-<ten-ngan>` (vd `p1-nhuong-quyen`) → Vercel tạo link preview → duyệt → merge vào `main` (production).
- Góp ý khi duyệt được sửa trên cùng nhánh trước khi merge.

**Kiến trúc (giữ nguyên xuyên suốt)**
- Trang = danh sách block: `src/content/pages/<trang>.ts` → `RenderBlocks` (`src/blocks/index.tsx`). Không viết nội dung cứng trong component.
- Block mới: `src/blocks/<ten-block>/<TenBlock>.tsx`, props = nội dung + `tone`; đăng ký vào union `Block`.
- Màu chỉ dùng biến tone (`bg-bg`, `text-ink`, `text-muted`, `text-accent`, `bg-card`, `border-line`, `btn`). Nền tối chỉ cho footer & menu mobile.
- Hiệu ứng qua data-attribute (`data-split`, `data-reveal`, `data-clip`, `data-parallax`, `data-count`, `data-scrub-x`) — xem `src/components/motion/Animations.tsx`.
- Next 16: đọc tài liệu trong `node_modules/next/dist/docs/` trước khi dùng API mới (params là Promise, `preload` thay `priority`, `images.qualities`…).

**Nội dung**
- Không dùng từ tuyệt đối hoá ("tuyệt đối", "số 1", "tốt nhất"…); ưu tiên thông tin kiểm chứng được (vd "có kiểm định", "ISO 22000:2018").
- Chứng nhận ISO chỉ áp dụng **nem lợn, nem ngựa** — không gắn cho sản phẩm khác.

**Định nghĩa "xong" cho mọi P**
- [ ] `pnpm lint`, `tsc --noEmit`, `pnpm build` sạch
- [ ] Kiểm tra trên trình duyệt: 1440 / 1024 / 768 / 390px, không cuộn ngang, đủ dấu tiếng Việt ở mọi tiêu đề
- [ ] Hiệu ứng mượt, tôn trọng `prefers-reduced-motion`; hover không dùng màu đen
- [ ] Link preview Vercel đã gửi duyệt; PLAN / file P cập nhật trạng thái
