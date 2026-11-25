"use client";

import { useRef } from "react";
import clsx from "clsx";
import { LeadForm } from "@/components/form/LeadForm";
import { ArrowRight, Close } from "@/components/ui/icons";
import { pauseScroll, resumeScroll } from "@/components/motion/lenis";
import { ONLINE_ORDER } from "@/lib/shop";

type Props = {
  product: { slug: string; name: string; price?: number | null; unit?: string | null };
  hotline: { number: string; display: string };
  className?: string;
  label?: string;
};

/**
 * Nút "Đặt hàng" → hộp thoại form đặt nhanh (trượt lên từ đáy trên điện thoại).
 * Khi tắt bán hàng trực tuyến (ONLINE_ORDER) → "Liên hệ tư vấn": form rút gọn tên, SĐT, ghi chú.
 */
export function OrderButton({ product, hotline, className, label }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const title = ONLINE_ORDER ? "Đặt hàng nhanh" : "Liên hệ tư vấn";
  return (
    <>
      <button
        type="button"
        onClick={() => {
          dialog.current?.showModal();
          pauseScroll();
        }}
        className={clsx("btn btn-primary", className)}
      >
        <span>{label ?? (ONLINE_ORDER ? "Đặt hàng" : "Liên hệ tư vấn")}</span>
        <ArrowRight className="btn-arrow h-4 w-4" />
      </button>
      <dialog
        ref={dialog}
        aria-label={`${title}: ${product.name}`}
        onClose={resumeScroll}
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        data-lenis-prevent
        className="doc-dialog m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-y-auto rounded-t-[1.75rem] bg-transparent p-0 backdrop:bg-[#0c1a0c]/70 backdrop:backdrop-blur-sm sm:m-auto sm:max-w-2xl sm:rounded-[1.75rem]"
      >
        <div data-tone="base" className="relative rounded-t-[1.75rem] sm:rounded-[1.75rem]">
          <div className="flex items-center justify-between px-6 pt-6 sm:px-9 sm:pt-8">
            <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Đóng"
              className="grid h-11 w-11 place-items-center rounded-full border border-line transition-transform hover:rotate-90"
            >
              <Close className="h-5 w-5" />
            </button>
          </div>
          <div className="p-2 sm:p-3 [&>form]:border-0 [&>div]:border-0">
            <LeadForm kind={ONLINE_ORDER ? "order" : "contact"} product={product} hotline={hotline} />
          </div>
        </div>
      </dialog>
    </>
  );
}
