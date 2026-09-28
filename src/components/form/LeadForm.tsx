"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { submitLead } from "@/lib/leads/actions";
import type { LeadState } from "@/lib/leads/schema";
import { Check, Phone } from "@/components/ui/icons";
import { Checkbox, Choice, Field, Input, Select, SubmitButton, Textarea } from "./fields";

type Props = {
  kind: "franchise" | "contact" | "order";
  /** kind = "order": sản phẩm đang đặt */
  product?: { slug: string; name: string; price?: number | null; unit?: string | null };
  provinces?: string[];
  budgets?: string[];
  topics?: string[];
  hotline: { number: string; display: string };
  submitLabel?: string;
};

const initial: LeadState = { status: "idle" };

export function LeadForm({ kind, product, provinces = [], budgets = [], topics = [], hotline, submitLabel }: Props) {
  const [state, action] = useActionState(submitLead, initial);
  const pathname = usePathname();
  const startedAt = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const v = state.values ?? {};
  const e = state.errors ?? {};
  const [qty, setQty] = useState(() => Math.max(1, Number(state.values?.quantity) || 1));

  // Ghi thời điểm bắt đầu điền (chống bot gửi tức thì)
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="rounded-[1.75rem] border border-line bg-card p-8 text-center outline-none sm:p-12">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#4cb448] text-[#0f230f]">
          <Check className="h-8 w-8" />
        </span>
        <h3 className="mt-6 text-2xl font-extrabold tracking-tight">
          Cảm ơn {state.name ? `anh/chị ${state.name}` : "anh/chị"}!
        </h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
          {kind === "order"
            ? "QT FOOD đã nhận đơn và sẽ gọi xác nhận đơn, báo phí giao hàng trong giờ làm việc."
            : "QT FOOD đã nhận được thông tin và sẽ gọi lại trong giờ làm việc."}{" "}
          Cần trao đổi ngay, anh/chị vui lòng gọi hotline.
        </p>
        <a href={`tel:${hotline.number}`} className="btn btn-primary mt-8">
          <Phone className="h-4 w-4" />
          <span>Gọi {hotline.display}</span>
        </a>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="relative rounded-[1.75rem] border border-line bg-card p-6 sm:p-9">
      <input type="hidden" name="type" value={kind} />
      <input type="hidden" name="sourcePage" value={pathname} />
      <input ref={startedAt} type="hidden" name="_t" defaultValue="" />
      {/* Ô bẫy bot — người dùng không thấy */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="mb-6 rounded-xl bg-[#d9161e]/8 px-4 py-3 text-sm font-semibold text-[#c01018]">
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Họ và tên" name="name" required error={e.name}>
          <Input name="name" autoComplete="name" defaultValue={v.name} error={e.name} placeholder="Nguyễn Văn A" />
        </Field>
        <Field label="Số điện thoại" name="phone" required error={e.phone}>
          <Input name="phone" type="tel" inputMode="tel" autoComplete="tel" defaultValue={v.phone} error={e.phone} placeholder="0981 787 992" />
        </Field>

        {kind === "order" && product ? (
          <>
            <input type="hidden" name="productSlug" value={product.slug} />
            <div className="sm:col-span-2 rounded-2xl bg-bg p-4">
              <p className="text-sm text-muted">Sản phẩm</p>
              <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
                <p className="text-lg font-extrabold tracking-tight">{product.name}</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-line bg-card">
                    <button type="button" aria-label="Giảm số lượng" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-10 w-10 place-items-center rounded-full text-lg font-bold hover:bg-[#4cb448]/15">
                      −
                    </button>
                    <input
                      name="quantity"
                      inputMode="numeric"
                      aria-label="Số lượng"
                      value={qty}
                      onChange={(ev) => setQty(Math.max(1, Math.min(999, Number(ev.target.value.replace(/\D/g, "")) || 1)))}
                      className="h-10 w-12 bg-transparent text-center font-bold outline-none"
                    />
                    <button type="button" aria-label="Tăng số lượng" onClick={() => setQty((q) => Math.min(999, q + 1))} className="grid h-10 w-10 place-items-center rounded-full text-lg font-bold hover:bg-[#4cb448]/15">
                      +
                    </button>
                  </div>
                  {product.unit && <span className="text-sm text-muted">{product.unit}</span>}
                </div>
              </div>
              {product.price ? (
                <p className="mt-3 text-sm text-muted">
                  Tạm tính:{" "}
                  <strong className="text-lg text-accent">{(product.price * qty).toLocaleString("vi-VN")}đ</strong> (chưa gồm phí giao hàng)
                </p>
              ) : null}
              {e.quantity && <p role="alert" className="mt-1.5 text-sm text-[#c01018]">{e.quantity}</p>}
            </div>
            <Field label="Địa chỉ nhận hàng" name="address" required error={e.address} className="sm:col-span-2">
              <Input name="address" autoComplete="street-address" defaultValue={v.address} error={e.address} placeholder="Số nhà, đường, xã/phường, tỉnh/thành" />
            </Field>
          </>
        ) : kind === "franchise" ? (
          <>
            <Field label="Tỉnh / thành dự kiến mở" name="province" required error={e.province}>
              <Select name="province" options={provinces} placeholder="Chọn tỉnh / thành" defaultValue={v.province ?? ""} error={e.province} />
            </Field>
            <Field label="Ngân sách dự kiến" name="budget" error={e.budget}>
              <Select name="budget" options={budgets} placeholder="Chọn khoảng" defaultValue={v.budget ?? ""} />
            </Field>
            <div className="sm:col-span-2">
              <p className="mb-2 text-sm font-semibold">Anh/chị đã có mặt bằng chưa?</p>
              <Choice
                name="hasPremises"
                defaultValue={v.hasPremises}
                options={[
                  { label: "Đã có mặt bằng", value: "yes" },
                  { label: "Chưa có", value: "no" },
                ]}
              />
            </div>
          </>
        ) : (
          <>
            <Field label="Email" name="email" error={e.email}>
              <Input name="email" type="email" inputMode="email" autoComplete="email" defaultValue={v.email} error={e.email} placeholder="ban@email.com" />
            </Field>
            <Field label="Chủ đề" name="topic">
              <Select name="topic" options={topics} placeholder="Chọn chủ đề" defaultValue={v.topic ?? ""} />
            </Field>
          </>
        )}

        <Field
          label={kind === "contact" ? "Nội dung" : "Ghi chú"}
          name="message"
          required={kind === "contact"}
          error={e.message}
          className="sm:col-span-2"
        >
          <Textarea
            name="message"
            defaultValue={v.message}
            error={e.message}
            placeholder={
              kind === "franchise"
                ? "Vị trí mặt bằng, câu hỏi về mô hình…"
                : kind === "order"
                  ? "Thời gian nhận hàng mong muốn, yêu cầu khác…"
                  : "Anh/chị cần QT FOOD hỗ trợ điều gì?"
            }
            rows={kind === "order" ? 3 : 4}
          />
        </Field>

        {kind === "franchise" && (
          <div className="sm:col-span-2">
            <Checkbox name="consent" error={e.consent} defaultChecked={v.consent === "on"}>
              Tôi đồng ý để QT FOOD liên hệ tư vấn nhượng quyền qua số điện thoại đã cung cấp.
            </Checkbox>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <SubmitButton>
          {submitLabel ?? (kind === "franchise" ? "Nhận hồ sơ nhượng quyền" : kind === "order" ? "Gửi đơn đặt hàng" : "Gửi liên hệ")}
        </SubmitButton>
        <p className="text-sm text-muted">
          Hoặc gọi{" "}
          <a href={`tel:${hotline.number}`} className="font-bold text-accent">
            {hotline.display}
          </a>
        </p>
      </div>
    </form>
  );
}
