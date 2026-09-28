# P7 — Bán hàng online (Giai đoạn 3)

> Ước lượng ~2–3 tuần · Phụ thuộc: P5 (P6 không bắt buộc) · Nhánh: `p7-…` · Trạng thái: ⚪

## Mục tiêu
Khách tự đặt & thanh toán sản phẩm chế biến sẵn (Nem ngựa, Nem riềng, Giò ngựa, Mọc ngựa…) trọn luồng; QT FOOD xử lý đơn trong admin.

## Phạm vi
| Hạng mục | Nội dung |
|---|---|
| Sản phẩm | Biến thể (khối lượng/quy cách), giá theo biến thể, tồn kho, trạng thái còn/hết hàng; món tại quán (Lẩu, Phở) **không bán online** |
| Giỏ hàng | Drawer trượt từ phải, lưu trình duyệt (`zustand` + localStorage), đồng bộ khi đăng nhập (nếu có tài khoản khách) |
| Checkout | 1 trang: thông tin nhận hàng, tỉnh/thành (34 tỉnh mới), phí giao theo khu vực, mã giảm giá, ghi chú; đặt không cần tài khoản |
| Thanh toán | **COD**; **chuyển khoản VietQR** (QR theo số tiền + mã đơn, xác nhận tự động qua webhook ngân hàng như SePay/Casso hoặc thủ công); **VNPay**, **MoMo** (cần hợp đồng merchant) |
| Đơn hàng (admin) | Collection `orders`: trạng thái (mới → đã xác nhận → đang giao → hoàn tất / huỷ / hoàn tiền), in phiếu, ghi chú; trừ/hoàn tồn kho tự động |
| Thông báo | Khách: email/SMS xác nhận đơn; QT FOOD: Telegram/email đơn mới (dùng lại hạ tầng P1) |
| Bảo quản | Nhắc sản phẩm cần bảo quản lạnh (Nem 2–6°C) → giới hạn khu vực/giờ giao nếu cần |

## Kỹ thuật
- Giá & tồn kho luôn tính lại phía server khi đặt (không tin giá từ trình duyệt)
- Webhook thanh toán (VNPay IPN, MoMo IPN, ngân hàng): xác thực chữ ký, idempotent theo mã giao dịch, ghi log
- Chuyển các form "Đặt hàng nhanh" của P2 sang thêm-vào-giỏ; giữ nút Gọi/Zalo

## Pháp lý (Việt Nam)
- [ ] **Thông báo website thương mại điện tử bán hàng** với Bộ Công Thương (online.gov.vn) và gắn logo "Đã thông báo" ở footer
- [ ] Công bố đầy đủ: thông tin doanh nghiệp, chính sách giao hàng, thanh toán, đổi trả, bảo mật (hoàn thiện từ bản P4)
- [ ] Hoá đơn điện tử (nếu QT FOOD cần xuất cho đơn online)

## Nghiệm thu
- [ ] Đặt hàng thật với COD và VietQR trên điện thoại; VNPay/MoMo trên môi trường sandbox rồi production
- [ ] Hết hàng không đặt được; giá đổi trong admin cập nhật ngay trên giỏ
- [ ] Đơn hiện trong admin, đổi trạng thái gửi thông báo cho khách
- [ ] Webhook gửi lặp không tạo đơn/thanh toán trùng

## Cần QT FOOD
- Chọn cổng thanh toán, tài khoản ngân hàng nhận VietQR, hợp đồng VNPay/MoMo
- Bảng phí giao hàng theo khu vực, đơn vị vận chuyển, chính sách đổi trả thực tế
- Biến thể & tồn kho ban đầu từng sản phẩm
