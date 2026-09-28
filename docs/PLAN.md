# QT Fresh Food — Kế hoạch phát triển website

> Cập nhật: 2026-09-28 · Website mẫu: https://truongfoods.vn/

## 0. Mục tiêu

1. **Giai đoạn 1** — Xây website thương hiệu QT Fresh Food — đặc sản **thịt ngựa**, **thương hiệu nhượng quyền Lẩu ngựa & Phở ngựa** (trên 50 cơ sở) — gồm giới thiệu, sản phẩm, nhượng quyền, hệ thống cơ sở, tin tức, liên hệ; hiệu ứng chuyển trang và hover mượt, đẹp.

> **Nguồn nội dung thật:** https://sites.google.com/view/qtfood — đã trích xuất vào [`content/qtfood.json`](../content/qtfood.json) (nội dung có cấu trúc) và [`public/images/`](../public/images/) (56 ảnh đã chọn lọc). Chi tiết: [`content/README.md`](../content/README.md).
2. **Giai đoạn 2** — Biến các trang thành **template** và xây **trình sửa trực quan**: admin bấm vào nội dung trên trang thật để sửa, chỉnh style qua **sidebar bên phải**.

**Nguyên tắc xuyên suốt:** ngay từ giai đoạn 1, mọi trang được ghép từ các **block** nhận dữ liệu qua props (không hardcode nội dung). Nhờ vậy giai đoạn 2 chỉ là "gắn editor vào", không phải viết lại.

---

## 1. Giả định & quyết định

| # | Vấn đề | Mặc định đang áp dụng |
|---|---|---|
| A1 | Bán hàng | ✅ GĐ1–2: sản phẩm chế biến sẵn **hiển thị giá**, nút **Đặt hàng** mở form + Zalo/hotline; Lẩu/Phở (món tại quán) dẫn tới Nhượng quyền / Hệ thống cơ sở. **Giỏ hàng & thanh toán online → Giai đoạn 3.** Model `Products` có sẵn giá, đơn vị, tồn kho để GĐ3 không phải đổi dữ liệu. |
| A2 | Danh mục sản phẩm | ✅ 2 nhóm: **Món ăn tại quán** (Phở ngựa, Lẩu ngựa) và **Chế biến sẵn** (Nem ngựa, Nem riềng, Giò ngựa, Mọc ngựa). |
| A7 | Nhượng quyền | ✅ Là mảng kinh doanh trọng tâm → có trang riêng + form "Đăng ký nhận hồ sơ nhượng quyền" (lead lưu vào admin). |
| A3 | Ngôn ngữ | ✅ Chỉ tiếng Việt. Cấu trúc route & dữ liệu sẵn sàng thêm `en` sau. |
| A4 | Database | ✅ **Neon Postgres** (qua Vercel Marketplace, region Singapore) + adapter `@payloadcms/db-vercel-postgres`. Dev dùng branch riêng của Neon. |
| A5 | Hosting | ✅ **Vercel** (gói Pro — gói Hobby không cho dùng thương mại), region `sin1`. Media lưu **Vercel Blob** (`@payloadcms/storage-vercel-blob`) vì Vercel không có ổ đĩa lưu file lâu dài. |
| A6 | Mức tự do chỉnh style | ✅ Sidebar đầy đủ chức năng, nhưng giá trị mặc định lấy từ **design token** (preset); vẫn cho nhập giá trị tuỳ chỉnh. |

---

## 2. Thương hiệu & Design System

### Màu
| Token | Giá trị | Dùng cho |
|---|---|---|
| `brand-500` | `#4cb448` | Màu chính (logo, CTA, link) |
| `brand-600` | `#3d9a3a` | Hover CTA |
| `brand-700` | `#2f7a2d` | Text trên nền sáng cần tương phản |
| `brand-50` | `#eef8ed` | Nền section nhạt |
| `accent-500` | `#ed1c24` | Đỏ từ nhãn "Horse" — badge, khuyến mãi, điểm nhấn (dùng tiết kiệm) |
| `ink-900` | `#1b2a1c` | Chữ chính |
| `cream-50` | `#fbfaf5` | Nền trang (tông ấm, hợp thực phẩm) |
| `accent` | `#2d8a2a` | Chữ nhấn màu xanh (đủ tương phản trên nền sáng) |

> `#4cb448` trên nền trắng có độ tương phản ~2.6:1 → **không dùng cho chữ nhỏ**; chữ nhỏ dùng `brand-700`.

### Font (hỗ trợ tiếng Việt đầy đủ)
- Tiêu đề: **Be Vietnam Pro** (700/800) hoặc serif có dấu tốt (**Lora** / **Playfair Display**) cho cảm giác cao cấp — chốt khi làm mockup.
- Nội dung: **Be Vietnam Pro** / **Inter** (400/500/600).
- Load qua `next/font` (self-host, không nháy font).

> Ý nghĩa màu theo bộ nhận diện: **Xanh lá** = đồng cỏ tự nhiên, tươi mới, an toàn; **Đỏ** = điểm nhấn mạnh mẽ, kích thích vị giác, thịt tươi nguyên bản. Biểu tượng: **Ngựa tung vó & thịt tươi** (mạnh mẽ / tốc độ / thiên nhiên / chất lượng).
> Chất liệu trang trí sẵn có: tranh vẽ nét **núi đồi, ruộng bậc thang, chim bay** (tông xanh xám) → dùng làm nền header trang & footer, hợp câu chuyện "đặc sản vùng cao / vùng đất Tổ".

### Logo
- Đã có: `public/brand/logo.png` (PNG trong suốt, **20756×9183px, 2.6MB** — quá lớn).
- Việc cần làm:
  - Xuất các bản tối ưu: header (~400px ngang, WebP/AVIF), OG image, favicon.
  - Tách **icon con ngựa** làm logo thu gọn (header khi cuộn, favicon, loading).
  - Nên **vector hoá sang SVG** (nét logo khá đơn giản, vector hoá sạch được) → nét, nhẹ, và animate được (vẽ nét ngựa khi loading bằng GSAP DrawSVG).

### Ảnh
- Đã có (từ Google Site, trong `public/images/`): ảnh món/sản phẩm (6 sản phẩm), đội ngũ, chân dung Tổng giám đốc, cảnh ruộng bậc thang, **26 ảnh khai trương cơ sở nhượng quyền**, icon cam kết, tranh nền núi đồi.
- Từ Google Drive (đã tải): ảnh bìa → `brand/banner-nhuong-quyen-lau-pho-ngua.jpg` (banner đồ hoạ logo + "Thương hiệu nhượng quyền Lẩu ngựa & Phở ngựa"); ảnh công ty → `about/doi-ngu-qtfood.jpg` (ảnh tập thể đội ngũ).
- Còn thiếu: ảnh sản phẩm **nền đồng nhất** (ảnh hiện tại chụp điện thoại, nền lẫn), ảnh riêng cho Nem riềng dạng thành phẩm, ảnh nhà xưởng/quy trình, giấy chứng nhận ATVSTP, ảnh không gian quán.
- Icon cam kết hiện là icon clip-art → thay bằng bộ icon nét đồng bộ màu thương hiệu.

---

## 3. Công nghệ

| Lớp | Lựa chọn | Lý do |
|---|---|---|
| Framework | **Next.js (App Router)** + TypeScript | SSR/SEO tốt, View Transitions, Payload chạy chung project |
| Styling | **Tailwind CSS v4** + CSS variables cho token | Token dùng chung cho site & editor |
| Smooth scroll | **Lenis** | Cuộn mượt có quán tính, nền cho ScrollTrigger |
| Scroll/timeline animation | **GSAP 3.13+** (ScrollTrigger, SplitText, DrawSVG) | Chuẩn Awwwards, miễn phí toàn bộ plugin kể cả thương mại |
| UI animation | **Motion** (Framer Motion) | Hover, menu, modal, exit animation trong React |
| Chuyển trang | **View Transitions API** (+ fallback Motion) | Ảnh sản phẩm "bay" từ lưới sang trang chi tiết |
| CMS / dữ liệu | **Payload CMS 3** | Chạy trong Next.js, tự host, phân quyền, media, live preview |
| Visual editor | **Puck** (tuỳ biến UI) | Kéo thả block, inline text editing, lưu JSON, UI override được |
| DB | **Neon Postgres** | Tích hợp sẵn trong Vercel, serverless, branch DB cho dev/preview |
| Lưu file | **Vercel Blob** | Ảnh/video upload từ admin |
| Ảnh | `next/image` + sharp (AVIF/WebP) | |
| Form | React Hook Form + Zod | Validate dùng chung client/server |
| Package manager | pnpm (đã có 10.18), Node 22 | |

---

## 4. Sitemap (Giai đoạn 1)

| # | Trang | Route | Block chính |
|---|---|---|---|
| 1 | Trang chủ | `/` | HeroSlider (banner "Thương hiệu nhượng quyền Lẩu ngựa & Phở ngựa"), AboutTeaser, FeaturedProducts (Phở / Lẩu / Nem ngựa), Commitments (4 cam kết), FranchiseTeaser (số liệu 50+ cơ sở + ảnh khai trương), CoreValues (Tín–Tâm–Tinh–Tiến), NewsList, CTA |
| 2 | Giới thiệu | `/gioi-thieu` | PageHero, Intro + ảnh đội ngũ, BusinessLines (3 mảng kinh doanh), VisionMission, CoreValues, CeoQuote (Tổng giám đốc Nguyễn Tiến Quang), BrandIdentity (ý nghĩa logo & màu), CTA |
| 3 | Sản phẩm | `/san-pham`, `/san-pham/[danh-muc]` | PageHero, CategoryFilter (Món ăn tại quán / Chế biến sẵn), ProductGrid |
| 4 | Chi tiết sản phẩm | `/san-pham/[danh-muc]/[slug]` | ProductGallery, ProductInfo (KLT, HSD, bảo quản, HDSD, giá), OrderCTA, RichText (bài mô tả dài), RelatedProducts |
| 5 | **Nhượng quyền** | `/nhuong-quyen` | PageHero, Stats (50+ cơ sở), WhyFranchise, Benefits (4 đặc quyền), OpeningGallery (26 ảnh khai trương, lightbox), FranchiseForm |
| 6 | Chính sách nhượng quyền | `/nhuong-quyen/chinh-sach` | PageHero, PolicySections (4 mục), CTA |
| 7 | Hệ thống cơ sở | `/he-thong-co-so` | PageHero, Stats (50+ cơ sở), OpeningGallery (ảnh khai trương), CTA đăng ký nhượng quyền. *StoreLocator (bản đồ + danh sách địa chỉ) để sau khi có dữ liệu — collection `Stores` đã sẵn trong admin* |
| 8 | Tin tức & Hoạt động | `/tin-tuc`, `/tin-tuc/[slug]` | PostGrid (lọc: tin tức / khai trương / hoạt động) / PostDetail, RelatedPosts |
| 9 | Liên hệ | `/lien-he` | ContactInfo (2 hotline: A Quang, A Hiếu), ContactForm, Map (21.28092, 105.64257) |
| 10 | Chính sách chung | `/chinh-sach/[slug]` | RichText (vận chuyển, thanh toán, đổi trả, bảo mật) — *cần nội dung* |

**Toàn cục:** Header (logo, menu, hotline, nút "Đăng ký nhượng quyền"; thu gọn khi cuộn), Footer (thông tin DN, MST, địa chỉ, hotline, Fanpage/TikTok/Zalo, nền tranh núi đồi), nút nổi Zalo/Messenger/Gọi, trang 404, loading.

> Đã bỏ: ~~Set quà~~.

---

## 5. Đặc tả hiệu ứng

**Nguyên tắc chung**
- Chỉ animate `transform`, `opacity`, `clip-path` (GPU, không gây reflow).
- Easing chuẩn: `cubic-bezier(.22,1,.36,1)` (out-expo nhẹ); hover 250–400ms, reveal 700–1000ms.
- Tôn trọng `prefers-reduced-motion` (tắt Lenis & reveal, giữ fade ngắn).
- Mục tiêu: 60fps trên điện thoại tầm trung, Lighthouse Performance ≥ 90, CLS ≈ 0.

| Vị trí | Hiệu ứng |
|---|---|
| Lần đầu vào site | Logo ngựa vẽ nét (DrawSVG) → mask mở ra hero |
| Chuyển trang | View Transition: fade + trượt nhẹ nội dung; ảnh sản phẩm morph từ card sang trang chi tiết |
| Hero | Tiêu đề tách từng dòng/chữ (SplitText) trồi lên; ảnh parallax nhẹ khi cuộn; slider crossfade + zoom chậm (Ken Burns) |
| Reveal khi cuộn | Section fade-up so le (stagger), ảnh mở bằng `clip-path` |
| Card sản phẩm (hover) | Ảnh scale 1.05, card nhấc lên + bóng mềm, nút "Đặt hàng" trượt lên, viền `brand-500` mảnh |
| Nút CTA (hover) | Nền lấp đầy từ trái sang (clip-path), mũi tên dịch phải; hiệu ứng magnetic nhẹ trên desktop |
| Menu | Gạch chân chạy từ trái; mega-menu sản phẩm fade + trượt; menu mobile full-screen, item stagger |
| Header | Luôn cố định trên cùng khi cuộn; rời hero thì thu gọn + nền mờ (blur) |
| Số liệu (năm KN, điểm bán…) | Đếm số khi xuất hiện |
| Logo đối tác | Marquee chạy vô hạn, dừng khi hover |

---

## 6. Kiến trúc Block (nền móng cho Giai đoạn 2)

```
src/
├── app/
│   ├── (site)/                 # website public
│   ├── (payload)/admin/        # Payload admin
│   └── (editor)/editor/[...]   # Visual editor (GĐ2)
├── blocks/                     # MỖI block = 1 thư mục
│   └── hero-slider/
│       ├── HeroSlider.tsx      # component render
│       ├── schema.ts           # Zod schema props (content + style)
│       ├── defaults.ts         # dữ liệu mặc định
│       └── editor.ts           # cấu hình field cho Puck (GĐ2)
├── components/ui/              # Button, Card, Container, Heading…
├── lib/animation/              # Lenis provider, GSAP hooks, presets
├── styles/tokens.css           # design tokens (CSS variables)
└── payload/collections/        # Products, Categories, Posts, Pages, Media…
```

**Quy ước của block:**
- Props chia 2 phần: `content` (chữ, ảnh, link, danh sách) và `style` (override typography/spacing/màu theo breakpoint).
- Mỗi phần tử chữ có thể sửa được bọc bằng `<Editable path="content.title" styleKey="title">` — ở chế độ site thì render thường; ở chế độ editor thì bật inline edit + chọn được để chỉnh style trong sidebar.
- Trang = `{ blocks: Block[] , seo, ... }` lưu JSON trong collection `Pages`.

**Payload collections:** `Pages`, `Products`, `Categories`, `Posts`, `PostCategories`, `Stores` (cơ sở nhượng quyền: tên quán, địa chỉ, tỉnh, toạ độ, SĐT, ảnh khai trương), `Commitments`, `Certificates`, `Media`, `Leads` (form đặt hàng / đăng ký nhượng quyền / liên hệ — phân loại theo `type`), `Users` (phân quyền Admin/Editor), `Templates` (GĐ2). Global: `SiteSettings` (hotline, địa chỉ, MXH, menu, footer).

---

## 7. Visual Editor (Giai đoạn 2)

### Bố cục màn hình

```
┌──────────────────────────────────────────────────────────────────────────┐
│ ← Trang: Trang chủ ▾ │ 🖥 💻 📱 │ ↶ ↷ │ Lịch sử │ Xem trước │ Lưu nháp │ Xuất bản │
├──────────────┬─────────────────────────────────────┬─────────────────────┤
│ SIDEBAR TRÁI │           CANVAS (trang thật)        │   SIDEBAR PHẢI      │
│              │                                     │                     │
│ [Block]      │   Bấm vào chữ → sửa inline          │ Breadcrumb:         │
│  + Hero      │   Bấm vào block → chọn block        │ Trang › Hero › Tiêu đề│
│  + Sản phẩm  │   Kéo thả để sắp xếp                │ ─────────────────── │
│  + Tin tức…  │   Viền xanh = đang chọn             │ [Nội dung][Style][Hiệu ứng][Nâng cao]
│              │   Toolbar mini: B I link ↑↓ ⧉ 🗑    │                     │
│ [Cấu trúc]   │                                     │ (chi tiết bên dưới) │
│  ▸ Hero      │                                     │                     │
│    ▸ Tiêu đề │                                     │                     │
│  ▸ Sản phẩm  │                                     │                     │
│ [Template]   │                                     │                     │
└──────────────┴─────────────────────────────────────┴─────────────────────┘
```

- **Toolbar nổi** chỉ giữ thao tác nhanh (đậm, nghiêng, link, di chuyển, nhân bản, xoá).
- **Sidebar phải** là nơi chỉnh chi tiết, hiển thị theo phần tử đang chọn (block hoặc phần tử chữ/ảnh/nút bên trong block).

### Sidebar phải — các tab

**Tab Nội dung** (field theo schema của block)
- Text / rich text, ảnh (chọn từ thư viện Media, crop, alt), link/nút, danh sách lặp (thêm/xoá/sắp xếp slide, testimonial…), nguồn dữ liệu (VD ProductGrid: chọn danh mục, số lượng, sắp xếp).

**Tab Style**
- *Typography:* font family, cỡ chữ, độ đậm, nghiêng, line-height, letter-spacing, căn lề, text-transform, màu chữ. Mỗi mục có preset từ token + ô nhập tuỳ chỉnh.
- *Kích thước:* width, height, max-width (px / % / auto).
- *Khoảng cách:* margin & padding dạng hộp trực quan 4 cạnh, có khoá liên kết.
- *Nền:* màu / gradient / ảnh nền + overlay, độ mờ.
- *Viền & bo góc & bóng:* border, radius, shadow (preset).
- *Layout block:* canh dọc/ngang, số cột lưới, khoảng cách giữa item.

**Tab Hiệu ứng**
- Hiệu ứng xuất hiện (none / fade-up / clip-reveal / split-text), delay, duration.
- Hiệu ứng hover cho nút/card (chọn preset).

**Tab Nâng cao**
- Ẩn/hiện theo thiết bị, anchor ID, class tuỳ chỉnh, reset style về mặc định.

**Responsive:** mọi giá trị Style có thể đặt riêng cho Desktop / Tablet / Mobile (chọn bằng nút thiết bị trên top bar; giá trị kế thừa từ breakpoint lớn hơn, hiển thị chấm màu khi có override).

### Lưu trữ style
```json
{
  "type": "HeroSlider",
  "content": { "title": "Thịt ngựa tươi sạch…" },
  "style": {
    "title": {
      "base":   { "fontSize": "token:5xl", "color": "token:ink-900" },
      "mobile": { "fontSize": "token:3xl" }
    }
  }
}
```
- Giá trị `token:*` → tham chiếu design token (đổi token là đổi toàn site).
- Khi render, style được biên dịch thành CSS variables + media query theo từng block instance (không inline style lộn xộn, không CLS).

### Template
- **Lưu thành template:** chọn 1 trang hoặc 1 nhóm block → lưu vào collection `Templates`.
- **Tạo trang từ template:** chọn template → nhân bản thành trang mới → sửa.
- Template mặc định sinh ra từ các trang GĐ1: Trang chủ, Landing sản phẩm, Giới thiệu, Tin tức, Liên hệ.

### Quy trình nội dung
- Nháp / Xuất bản / Hẹn giờ xuất bản; lịch sử phiên bản & khôi phục (Payload versions).
- Undo/redo, autosave nháp.
- Phân quyền: **Admin** (mọi thứ, sửa template), **Editor** (sửa nội dung & style trang, không xoá template).

### Rủi ro kỹ thuật & phương án
| Rủi ro | Phương án |
|---|---|
| Puck mặc định chọn theo **block**, chưa chọn được phần tử con (tiêu đề trong Hero) để chỉnh style | Tự xây lớp `Editable` + store chọn phần tử (zustand), render sidebar phải bằng Puck UI overrides. **Làm spike 2–3 ngày đầu GĐ2** để xác nhận. |
| Nếu Puck không đủ linh hoạt | Fallback: editor tự xây trên dnd-kit + zustand, vẫn dùng lại toàn bộ block & schema (vì block độc lập với editor). |
| Admin chỉnh style tự do làm vỡ layout mobile | Preset token làm mặc định, cảnh báo khi giá trị ngoài token, preview 3 thiết bị, nút reset. |

---

## 8. Lộ trình & tiêu chí hoàn thành

### Giai đoạn 1 — Website

**1a. Nền tảng + Trang chủ demo (duyệt màu)** ← *gần xong — xem kế hoạch tiếp theo ở mục 10*

> Chạy thử: `pnpm install` → `pnpm dev` → http://localhost:3000.

Mục tiêu: có ngay **1 trang chủ hoàn chỉnh bằng nội dung thật** để duyệt màu, font, cảm giác hiệu ứng trước khi làm các trang khác.

| Section | Nội dung (từ `content/qtfood.json`) | Hiệu ứng |
|---|---|---|
| Header | Logo, menu 7 mục, hotline 0981.787.992, nút "Đăng ký nhượng quyền" | Cố định khi cuộn, thu gọn + nền blur; menu mobile full-screen |
| Hero | Ảnh thật Lẩu/Phở ngựa, tiêu đề "Thương hiệu nhượng quyền Lẩu ngựa & Phở ngựa", slogan, 2 CTA, số liệu 50+ cơ sở / 6 sản phẩm / 100% thịt tươi | Chữ trồi lên từng dòng, ảnh parallax + mở bằng clip-path, số đếm |
| Sản phẩm nổi bật | Phở ngựa, Lẩu ngựa, Nem ngựa | Card hover: ảnh zoom, card nhấc, nút trượt lên |
| Cam kết | 4 cam kết (Nguyên liệu sạch, An toàn – có kiểm định, Uy tín, Hương vị truyền thống) | Reveal so le |
| Chứng nhận & cam kết chất lượng | ISO 22000:2018 (WCERT, số W2356F, hiệu lực 24/06/2025–23/06/2028, phạm vi nem lợn, nem ngựa): giấy chứng nhận + quyết định 274/QĐ-WCERT, bảng thông tin | Thẻ giấy nghiêng, hover thẳng lại; bấm để phóng to (dialog) |
| Về QT FOOD | Ảnh đội ngũ, đoạn giới thiệu, 3 mảng kinh doanh | Ảnh mở clip-path, parallax nhẹ |
| Chế biến sẵn | Nem ngựa, Nem riềng, Giò ngựa, Mọc ngựa + giá, KLT | Card hover |
| Giá trị cốt lõi | Tín – Tâm – Tinh – Tiến | Chữ lớn chạy ngang theo cuộn |
| Nhượng quyền | 50+ cơ sở, 4 đặc quyền, dải ảnh khai trương, CTA | Marquee ảnh vô hạn (dừng khi hover) |
| Footer | Thông tin công ty, MST, hotline, MXH, nền tranh núi đồi | — |
| Nút nổi | Zalo, Gọi | Nhịp đập nhẹ |

**Màu đã chốt (2026-09-28): A. Tươi sáng** — nền kem/trắng, xanh thương hiệu chủ đạo, đỏ làm điểm nhấn. Tone section:
| Tone | Nền | Dùng cho |
|---|---|---|
| `base` / `hero` | `#fbfaf5` kem | Hero, phần lớn section |
| `alt` | `#eff5e7` xanh rất nhạt | Section xen kẽ (Cam kết, Chế biến sẵn) |
| `brand` | `#e2f1d8` xanh nhạt | Mảng nổi bật (Nhượng quyền) |
| `deep` | `#1c3520` xanh rừng | Chỉ footer & menu mobile |

> Không dùng nền tối cho section nội dung (phản hồi: Giá trị cốt lõi & Nhượng quyền "hơi tối"). Dải ảnh khai trương: 2 hàng cùng chiều, cùng tốc độ, chạy chậm.

Việc cụ thể:
- [x] Khởi tạo Next.js 16 + React 19 + TS + Tailwind v4 (pnpm), cấu trúc thư mục mục 6
- [x] Design tokens theo tone section × 3 phương án màu; font Be Vietnam Pro + Playfair Display (có tiếng Việt); logo bản màu/trắng, icon ngựa, favicon
- [ ] Vector hoá logo sang SVG (hiệu ứng vẽ nét ngựa khi tải trang)
- [x] Lenis + GSAP (ScrollTrigger, SplitText): hiệu ứng theo data-attribute (`data-split`, `data-reveal`, `data-clip`, `data-parallax`, `data-count`, `data-scrub-x`), tôn trọng reduced-motion
- [x] UI kit: Button (hover fill), Section/Container, SectionHeading, icon set
- [ ] UI kit: Input, Form, Badge (làm cùng trang Liên hệ / Nhượng quyền)
- [x] Header (cố định khi cuộn, thu gọn, đổi tone, menu mobile toàn màn hình), Footer, nút nổi Zalo/Gọi
- [x] Trang chủ 9 block từ `content/qtfood.json` (`src/content/pages/home.ts` → `RenderBlocks`)
- [x] Chốt phương án màu A (Tươi sáng) → đã gỡ bộ chọn màu, giữ 1 bộ token
- ✅ *Xong khi:* trang demo UI kit chạy mượt, Lighthouse ≥ 90.

**1b. Các trang (dữ liệu mẫu JSON)**
- [ ] Viết các block ở mục 4 theo quy ước mục 6
- [ ] Ghép 10 trang (mục 4) từ dữ liệu thật `content/qtfood.json`, View Transitions giữa các trang, morph ảnh sản phẩm
- [ ] Responsive (360 / 768 / 1024 / 1440), SEO (metadata, OG, sitemap.xml, schema.org Product/Organization)
- ✅ *Xong khi:* toàn bộ trang duyệt được, không nội dung nào hardcode trong component.

**1c. CMS dữ liệu**
- [ ] Tích hợp Payload 3 + Neon Postgres + Vercel Blob, collections & globals mục 6, phân quyền
- [ ] Chuyển dữ liệu mẫu JSON → Payload, trang đọc dữ liệu từ Payload (ISR / revalidate khi lưu)
- [ ] Form đặt hàng & liên hệ → lưu `Leads` + gửi email/Telegram/Zalo OA thông báo
- [ ] Deploy Vercel (preview mỗi nhánh dùng Neon branch riêng, production dùng branch `main`)
- ✅ *Xong khi:* admin thêm/sửa sản phẩm, tin tức trong Payload và thấy trên site.

### Giai đoạn 2 — Template & Visual Editor

**2a. Editor cơ bản**
- [ ] Spike Puck: chọn phần tử con + sidebar phải tuỳ biến (xác nhận hoặc chuyển fallback)
- [ ] Đăng ký toàn bộ block vào editor, kéo thả, thêm/xoá/nhân bản, sidebar trái (Block / Cấu trúc)
- [ ] Inline text editing trên canvas + toolbar nổi thao tác nhanh
- [ ] Tab Nội dung trong sidebar phải
- ✅ *Xong khi:* sửa được nội dung mọi trang trực tiếp trên canvas và xuất bản.

**2b. Style & Template**
- [ ] Tab Style / Hiệu ứng / Nâng cao, responsive per-breakpoint, biên dịch style → CSS
- [ ] Collection `Templates`: lưu trang/nhóm block thành template, tạo trang từ template
- [ ] Nháp / xuất bản / lịch sử phiên bản, undo/redo, autosave
- ✅ *Xong khi:* tạo được trang landing mới hoàn toàn từ template, chỉnh font/cỡ/màu/khoảng cách qua sidebar phải, hiển thị đúng trên 3 thiết bị.

### Giai đoạn 3 — Bán hàng online
- [ ] Giỏ hàng (drawer trượt, lưu localStorage + đồng bộ khi đăng nhập), chọn biến thể/khối lượng
- [ ] Checkout: thông tin giao hàng, phí ship theo khu vực, mã giảm giá
- [ ] Thanh toán: COD, chuyển khoản QR (VietQR), VNPay / MoMo
- [ ] Quản lý đơn hàng trong admin (trạng thái, in phiếu, thông báo Zalo/email), tồn kho
- ✅ *Xong khi:* khách đặt & thanh toán trọn luồng, admin xử lý đơn trong Payload.

---

## 9. Cần từ phía QT Fresh Food
- [x] ~~Xác nhận giả định A1, A3, A6~~ — đã chốt (giỏ hàng → GĐ3)
- [x] ~~Danh mục & sản phẩm~~ — đã có 6 sản phẩm từ Google Site
- [x] ~~Thông tin doanh nghiệp, MXH~~ — đã có (địa chỉ, 2 hotline, email, MST, Fanpage, TikTok, Zalo)
- [x] ~~Nội dung giới thiệu, tầm nhìn, sứ mệnh, giá trị cốt lõi, nhượng quyền~~ — đã có
- [ ] *(Sau)* Danh sách chi tiết các cơ sở nhượng quyền — hiện hiển thị "trên 50 cơ sở", nhập vào admin khi cần
- [ ] Rà lại lỗi nội dung cũ: Giò ngựa (mục "Nguyên liệu" đang nhắc "viên mọc"; giá 320.000đ/kg nhưng KLT 250g)
- [x] ~~Giấy chứng nhận~~ — đã có ISO 22000:2018 (WCERT) cho sản xuất & kinh doanh nem lợn, nem ngựa
- [ ] Ảnh sản phẩm nền đồng nhất, ảnh Nem riềng thành phẩm; chứng nhận khác nếu có (OCOP, công bố sản phẩm, ATTP cơ sở)
- [ ] Nội dung chính sách chung (vận chuyển, thanh toán, đổi trả, bảo mật) — mặc định: soạn bản mẫu để duyệt
- [ ] Testimonial khách hàng / đối tác nhượng quyền (nếu có)
- [ ] Tên miền

---

## 10. Kế hoạch triển khai tiếp theo → [docs/plans/](plans/README.md)

Kế hoạch chi tiết đã tách thành từng phần **P0 – P7**, mỗi phần 1 file (mục tiêu, phạm vi, file cần tạo/sửa, dữ liệu, biến môi trường, nghiệm thu, việc cần QT FOOD):

| P | Nội dung | Giai đoạn | Trạng thái |
|---|---|---|---|
| [P0](plans/P0-ha-tang-deploy.md) | Hạ tầng & deploy | GĐ1 | 🟡 GitHub ✓ · Vercel ✓ · còn region/noindex/tên miền |
| [P1](plans/P1-nhuong-quyen-lien-he.md) | Nhượng quyền & Liên hệ (form, thông báo lead) | GĐ1 | 🟢 code xong, chờ cấu hình thông báo |
| [P2](plans/P2-san-pham.md) | Sản phẩm & đặt hàng nhanh | GĐ1 | 🟢 xong (dữ liệu từ CMS) |
| [P3](plans/P3-gioi-thieu-he-thong-co-so.md) | Giới thiệu & Hệ thống cơ sở | GĐ1 | 🟢 xong |
| [P4](plans/P4-tin-tuc-chinh-sach-hoan-thien.md) | Tin tức, chính sách, SEO, QA → go-live bản đầu | GĐ1 | ⚪ |
| [P5](plans/P5-cms-payload.md) | CMS Payload + Neon + Blob → go-live chính thức | GĐ1c | 🟡 P5a lõi admin xong (làm trước P1) |
| [P6](plans/P6-visual-editor-template.md) | Visual editor & template | GĐ2 | ⚪ |
| [P7](plans/P7-ban-hang-online.md) | Bán hàng online | GĐ3 | ⚪ |
