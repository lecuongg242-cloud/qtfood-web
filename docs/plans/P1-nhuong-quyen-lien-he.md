# P1 — Nhượng quyền & Liên hệ (form khách hàng)

> Giai đoạn 1 · Ước lượng ~3 ngày · Phụ thuộc: P0 · Nhánh: `p1-nhuong-quyen` · Trạng thái: ⚪

## Mục tiêu
Nhượng quyền là mảng kinh doanh trọng tâm → trang này phải **thuyết phục và thu được lead**. Mọi form gửi đi phải đến tay QT FOOD trong vài giây.

## Phạm vi
**Trong P1:** `/nhuong-quyen`, `/nhuong-quyen/chinh-sach`, `/lien-he`, UI kit form, Server Action gửi lead + thông báo, các block dùng chung cho trang con (PageHero, Lightbox gallery, Breadcrumb).
**Ngoài P1:** lưu lead vào database/admin (→ P5), bản đồ nhiều cơ sở (→ P3/P5), Zalo OA (chỉ làm nếu có OA).

## 1. Block dùng chung (dùng lại ở P2–P4)
| Block / component | File | Ghi chú |
|---|---|---|
| `PageHero` | `src/blocks/page-hero/PageHero.tsx` | Tiêu đề trang con: eyebrow, title (`*nhấn*`), mô tả, breadcrumb, ảnh/tranh nền núi đồi; nhỏ hơn Hero trang chủ |
| `Breadcrumb` | `src/components/ui/Breadcrumb.tsx` | Kèm JSON-LD `BreadcrumbList` |
| `Lightbox` | `src/components/ui/Lightbox.tsx` | Tổng quát hoá `DocumentCard`: `<dialog>` + chuyển ảnh trước/sau (nút, phím ←/→, vuốt), đếm "3/26" |
| `GalleryGrid` | `src/blocks/gallery-grid/GalleryGrid.tsx` | Lưới ảnh khai trương (masonry nhẹ), bấm mở Lightbox |
| `Steps` | `src/blocks/steps/Steps.tsx` | Quy trình theo bước, đường nối chạy theo cuộn |
| `CertificationsStrip` | tái dùng `Certifications` | Bản gọn cho trang con |

## 2. Trang `/nhuong-quyen`
File: `src/app/nhuong-quyen/page.tsx` + `src/content/pages/franchise.ts`

| # | Block | Nội dung (nguồn `content/qtfood.json`) |
|---|---|---|
| 1 | PageHero | "Nhượng quyền *Lẩu ngựa & Phở ngựa*", `franchise.intro`, CTA cuộn tới form |
| 2 | Stats | 50+ cơ sở · 100% nguyên liệu do công ty cung cấp · đào tạo & đồng hành từ đầu |
| 3 | FeatureSplit | "Vì sao chọn QT FOOD" — 2 lý do trong `franchisePolicy.sections[0]` (mảng ngách, nguồn nguyên liệu ổn định) + ảnh món |
| 4 | Benefits | 4 đặc quyền (`franchise.sections[1].items`) |
| 5 | Steps | Quy trình hợp tác — **lấy từ chính sách**, không thêm cam kết mới: Liên hệ & nhận hồ sơ → Khảo sát, tư vấn mặt bằng → Thiết kế biển bảng, set-up → Đào tạo bếp & vận hành → Khai trương & đồng hành marketing |
| 6 | GalleryGrid | 26 ảnh khai trương, tiêu đề "Hơn 50 cơ sở đã khai trương" |
| 7 | Certifications (gọn) | ISO 22000:2018 — ghi rõ phạm vi nem lợn, nem ngựa |
| 8 | Responsibilities | Tóm tắt trách nhiệm đối tác (`franchisePolicy.sections[2]`) + link "Xem chính sách đầy đủ" |
| 9 | **FranchiseForm** (`id="dang-ky"`) | Form nhận hồ sơ (mục 5) + hotline/Zalo bên cạnh |

## 3. Trang `/nhuong-quyen/chinh-sach`
File: `src/app/nhuong-quyen/chinh-sach/page.tsx` + `src/content/pages/franchise-policy.ts`
- PageHero + bố cục 2 cột: **mục lục bám theo khi cuộn** (sticky, tô đậm mục đang đọc) | nội dung 4 mục `franchisePolicy`
- Component `RichBody` (`src/components/ui/RichBody.tsx`) render mảng `{type: p|h2|h3|list|checklist}` — dùng lại cho mô tả sản phẩm (P2), tin tức & chính sách (P4)
- Cuối trang: CTA về form `/nhuong-quyen#dang-ky`

## 4. Trang `/lien-he`
File: `src/app/lien-he/page.tsx` + `src/content/pages/contact.ts`
- PageHero ngắn
- 2 cột: **thẻ liên hệ** (2 hotline + người phụ trách, Zalo, email, địa chỉ, MST, Fanpage/TikTok) | **ContactForm**
- Bản đồ Google Maps nhúng (toạ độ `company.geo`), tải lười (chỉ tải iframe khi cuộn tới) để không ảnh hưởng tốc độ

## 5. Form & xử lý lead
**UI kit** (`src/components/form/`): `Field`, `Input`, `Textarea`, `Select`, `Checkbox`, `SubmitButton` (trạng thái đang gửi), `FormMessage`. Nhãn & lỗi tiếng Việt, cao ≥ 48px trên mobile, bàn phím số cho SĐT (`inputMode="tel"`).

**Trường dữ liệu**
| Form | Trường |
|---|---|
| Nhượng quyền | Họ tên*, SĐT*, Tỉnh/thành dự kiến mở*, Đã có mặt bằng? (có/chưa), Ngân sách dự kiến (khoảng), Ghi chú, Đồng ý được liên hệ* |
| Liên hệ | Họ tên*, SĐT*, Email, Chủ đề (Đặt hàng / Nhượng quyền / Khác), Nội dung* |
| (P2) Đặt hàng nhanh | dùng chung schema, `type: "order"` |

**Kỹ thuật** (theo `node_modules/next/dist/docs/01-app/02-guides/forms.md`)
- `src/lib/leads/schema.ts`: Zod schema dùng chung client/server; SĐT Việt Nam `^(0|\+84)(3|5|7|8|9)\d{8}$`
- `src/app/actions/lead.ts` (`"use server"`): validate → trả lỗi theo trường qua `useActionState` → gửi thông báo trong `after()` (không bắt khách chờ)
- Chống spam: honeypot ẩn + thời gian điền tối thiểu (~3 giây) + giới hạn tần suất bằng quy tắc Vercel Firewall cho POST (gói Pro)
- **Thông báo** (`src/lib/notify/`): Telegram Bot API (`sendMessage`, định dạng gọn: loại lead, tên, SĐT bấm gọi được, tỉnh, ghi chú, trang gửi) + email qua Resend REST API. Kênh nào lỗi thì kênh còn lại vẫn gửi; cả hai lỗi → `console.error` toàn bộ lead để còn tra trong Vercel Logs
- Sau khi gửi: thay form bằng lời cảm ơn + "Chúng tôi sẽ gọi lại trong giờ làm việc" + nút gọi hotline
- Thêm cài đặt `zod` (chưa có trong dự án); không cần React Hook Form

## 6. Dữ liệu
- `content/qtfood.json`: thêm `franchise.process` (5 bước ở mục 2), `forms.provinces` (63→34 tỉnh/thành sau sáp nhập 2025 — dùng danh sách mới), `forms.budgets` (khoảng ngân sách — **cần QT FOOD xác nhận**)
- `src/content/types.ts` cập nhật tương ứng

## 7. Biến môi trường (Vercel → Settings → Environment Variables)
| Biến | Ví dụ | Ghi chú |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | `123456:ABC…` | Tạo bot qua @BotFather |
| `TELEGRAM_CHAT_ID` | `-100…` | ID nhóm nhận lead (thêm bot vào nhóm) |
| `RESEND_API_KEY` | `re_…` | resend.com, xác minh tên miền gửi |
| `LEAD_EMAIL_TO` | `qtfreshfood@gmail.com` | Có thể nhiều email, cách nhau dấu phẩy |
| `LEAD_EMAIL_FROM` | `QT FOOD <no-reply@…>` | Cần tên miền đã xác minh |
Thiếu biến → action vẫn nhận form, bỏ qua kênh đó và ghi cảnh báo (không làm hỏng trải nghiệm khách).

## 8. Nghiệm thu
- [ ] 3 trang hiển thị đúng nội dung, không chữ "tuyệt đối", đủ dấu tiếng Việt
- [ ] Gửi form hợp lệ → Telegram + email nhận được < 10 giây, khách thấy lời cảm ơn
- [ ] Bỏ trống/nhập sai SĐT → lỗi hiện đúng trường, không mất dữ liệu đã nhập
- [ ] Form hoạt động khi tắt JavaScript (Server Action gửi thường)
- [ ] Lightbox: phím ←/→/Esc, vuốt trên điện thoại, focus quay lại ảnh vừa mở
- [ ] Mục lục chính sách tô đúng mục khi cuộn
- [ ] Lighthouse mobile ≥ 90 cho `/nhuong-quyen`

## 9. Cần QT FOOD xác nhận
- Nhóm Telegram / email nhận lead (mặc định: `qtfreshfood@gmail.com` + 1 nhóm Telegram)
- Các khoảng ngân sách hiển thị trong form (hoặc bỏ trường này)
- Có muốn hiện **mức phí nhượng quyền / vốn đầu tư tham khảo** không (hiện chưa có dữ liệu → không hiển thị)
