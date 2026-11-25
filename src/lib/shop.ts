/**
 * Bán hàng trực tuyến: hiện giá sản phẩm + nút "Đặt hàng" (form có số lượng, địa chỉ nhận).
 * Đang TẮT vì chưa thông báo website thương mại điện tử với Bộ Công Thương:
 * web không hiện giá, nút đổi thành "Liên hệ tư vấn" (form chỉ hỏi tên, SĐT, ghi chú).
 * Bật lại: đổi thành `true` (giá vẫn được lưu trong admin, không mất).
 */
export const ONLINE_SHOP = false;

export const SHOW_PRICES = ONLINE_SHOP;
export const ONLINE_ORDER = ONLINE_SHOP;
