# Hướng dẫn quản trị website QT FOOD

Trang quản trị: **`<tên-miền>/admin`** — đăng nhập bằng email & mật khẩu được cấp.

- **Quản trị (Admin):** toàn quyền, thêm/xoá tài khoản, sửa *Thông tin chung*.
- **Biên tập (Editor):** sửa nội dung (sản phẩm, bài viết, cơ sở, chứng nhận) và xử lý khách hàng.

Mọi thay đổi **hiện trên website sau vài giây** khi bấm *Lưu* / *Xuất bản tài liệu* — không cần gọi kỹ thuật.

Trang đầu (Bảng điều khiển) luôn hiện: **số khách hàng mới chưa liên hệ** và **chứng nhận sắp hết hạn** (báo trước 6 tháng).

---

## 1. Xử lý khách hàng liên hệ

Khách gửi form (đặt hàng, đăng ký nhượng quyền, liên hệ) → có tin nhắn Telegram / email kèm link **"Mở trong admin"**.

1. Vào **Khách hàng → Khách hàng liên hệ** (hoặc bấm thẻ *Khách hàng mới* ở trang đầu).
2. Mở khách hàng, gọi điện tư vấn.
3. Đổi **Trạng thái**: *Mới* → *Đã liên hệ* → *Thành công* / *Không thành*.
4. Chọn **Người phụ trách**, ghi **Ghi chú nội bộ** (khách không thấy) → **Lưu**.

**Lọc & xuất Excel:** dùng *Bộ lọc* (vd Trạng thái = Mới, Loại = Đặt hàng) → bấm **Xuất Excel (CSV)** → tải về danh sách đúng theo bộ lọc, mở bằng Excel.

## 2. Thêm / sửa sản phẩm

1. **Sản phẩm → Sản phẩm → Tạo mới** (hoặc mở sản phẩm có sẵn).
2. Tab **Nội dung**: tên, tóm tắt (2–4 câu), điểm nổi bật, bài mô tả chi tiết.
3. Tab **Ảnh**: tải ảnh — *ảnh đầu tiên là ảnh đại diện*. Mỗi ảnh cần **Mô tả ảnh (alt)**.
4. Tab **Thông số & giá**: giá, đơn vị (quả / túi / kg), khối lượng, hạn dùng, bảo quản. Món ăn tại quán để trống giá.
5. Cột bên phải: **Nhóm sản phẩm**, *Nổi bật ở trang chủ*, *Huy hiệu ISO* (chỉ bật cho sản phẩm thuộc phạm vi chứng nhận: nem lợn, nem ngựa).
6. Bấm **Xem trước** (Live Preview) để thấy trang như khách sẽ thấy — trên máy tính, máy tính bảng, điện thoại.
7. Bấm **Xuất bản tài liệu**. (Trong lúc soạn, admin tự lưu bản nháp — khách chưa thấy cho tới khi xuất bản.)

## 3. Đăng bài tin tức

1. **Nội dung → Tin tức & hoạt động → Tạo mới**.
2. Nhập tiêu đề, tóm tắt, ảnh bìa (ảnh ngang), nội dung. Chọn **Chuyên mục** (Tin tức / Khai trương / Hoạt động) và **Ngày đăng**.
3. **Xem trước** → **Xuất bản tài liệu**. Bài mới tự hiện ở trang *Tin tức* và 3 bài mới nhất ở trang chủ.

Lưu ý nội dung: không dùng từ tuyệt đối ("số 1", "tốt nhất", "tuyệt đối"…); không đưa số liệu chưa kiểm chứng.

## 4. Đổi hotline, email, địa chỉ, mạng xã hội, menu *(chỉ Admin)*

1. **Hệ thống → Thông tin chung**.
2. Tab **Công ty**: tên, mã số thuế, email, địa chỉ, toạ độ bản đồ.
3. Tab **Hotline & mạng xã hội**: hotline đầu tiên là số chính (nút gọi nổi, header). *Số* ghi liền không dấu chấm (vd `0981787992`), *Hiển thị* ghi có dấu chấm (vd `0981.787.992`).
4. Tab **Menu**: các mục menu và nút chính trên header.
5. **Lưu** → toàn bộ website cập nhật (header, footer, trang Liên hệ, nút gọi…).

## 5. Thêm cơ sở nhượng quyền

1. **Nội dung → Cơ sở nhượng quyền → Tạo mới**.
2. Nhập tên quán, tỉnh/thành, địa chỉ, số điện thoại, **link Google Maps** (mở Google Maps → *Chia sẻ* → *Sao chép đường liên kết*), ảnh khai trương.
3. **Lưu**. Trang *Hệ thống cơ sở* tự hiện danh sách & bộ lọc theo tỉnh. Tạm ẩn một cơ sở: bỏ chọn *Hiển thị trên website*.

## 6. Chứng nhận (ISO…)

- **Nội dung → Chứng nhận**: số chứng nhận, đơn vị cấp, phạm vi, ngày cấp, ngày hết hiệu lực, ảnh văn bản.
- Khi còn dưới 6 tháng là hết hạn: trang đầu admin và form chứng nhận hiện cảnh báo màu cam. Sau khi tái chứng nhận, cập nhật số, ngày và ảnh mới.
- Chứng nhận hết hạn mà chưa có bản mới: bỏ chọn *Hiển thị trên website*.

## 7. Chính sách (vận chuyển, thanh toán, đổi trả, bảo mật)

**Nội dung → Chính sách chung** → mở chính sách → sửa → **Lưu**. Link ở chân trang tự cập nhật.

## 8. Ảnh

- Ảnh tải lên tối đa **15MB**; ảnh lớn được tự thu nhỏ (tối đa 2400px) và tạo các bản nhỏ cho điện thoại.
- Luôn điền **Mô tả ảnh (alt)** — giúp Google tìm thấy ảnh & hỗ trợ người khiếm thị.
- Chọn **điểm lấy nét** (focal point) khi ảnh bị cắt không đẹp ở thẻ sản phẩm / bài viết.

---

**Gặp sự cố?** Chụp màn hình lỗi + ghi lại thao tác vừa làm, gửi bộ phận kỹ thuật.
