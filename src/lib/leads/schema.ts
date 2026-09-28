import { z } from "zod";

/** SĐT Việt Nam: 0 hoặc +84, đầu số di động 3/5/7/8/9, tổng 10 số */
const PHONE = /^(0|\+84)(3|5|7|8|9)\d{8}$/;

const phone = z
  .string()
  .trim()
  .min(1, "Vui lòng nhập số điện thoại")
  .transform((v) => v.replace(/[\s.\-()]/g, ""))
  .pipe(z.string().regex(PHONE, "Số điện thoại chưa đúng (vd: 0981 787 992)"));

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Tối đa ${max} ký tự`)
    .optional()
    .transform((v) => v || undefined);

const base = {
  name: z.string().trim().min(2, "Vui lòng nhập họ tên").max(80, "Họ tên quá dài"),
  phone,
  email: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || undefined)
    .pipe(z.email("Email chưa đúng").optional()),
  sourcePage: optionalText(200),
};

export const franchiseLeadSchema = z.object({
  type: z.literal("franchise"),
  ...base,
  province: z.string().trim().min(1, "Vui lòng chọn tỉnh / thành dự kiến mở"),
  hasPremises: z.enum(["yes", "no"]).optional(),
  budget: optionalText(60),
  message: optionalText(1000),
  consent: z.literal("on", { error: "Vui lòng đồng ý để QT FOOD liên hệ tư vấn" }),
});

export const contactLeadSchema = z.object({
  type: z.literal("contact"),
  ...base,
  topic: optionalText(60),
  message: z.string().trim().min(5, "Vui lòng nhập nội dung (ít nhất 5 ký tự)").max(1000, "Tối đa 1000 ký tự"),
});

export const orderLeadSchema = z.object({
  type: z.literal("order"),
  ...base,
  productSlug: z.string().trim().min(1, "Thiếu sản phẩm"),
  quantity: z.coerce
    .number({ error: "Số lượng chưa đúng" })
    .int("Số lượng chưa đúng")
    .min(1, "Tối thiểu 1")
    .max(999, "Đơn lớn vui lòng gọi hotline"),
  address: z.string().trim().min(8, "Vui lòng nhập địa chỉ nhận hàng").max(300, "Địa chỉ quá dài"),
  message: optionalText(1000),
});

export const leadSchema = z.discriminatedUnion("type", [franchiseLeadSchema, contactLeadSchema, orderLeadSchema]);

export type LeadInput = z.infer<typeof leadSchema>;

export type LeadState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<string, string>>;
  values?: Record<string, string>;
  name?: string;
};
