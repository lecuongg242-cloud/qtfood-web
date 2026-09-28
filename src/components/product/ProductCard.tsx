import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";

export type ProductCardData = {
  href: string;
  name: string;
  image: { src: string; alt: string };
  summary: string;
  priceLabel?: string;
  unit?: string | null;
  meta?: string[];
  tag?: string;
  /** tên ViewTransition — ảnh "bay" sang trang chi tiết (phải duy nhất trên trang) */
  transitionName?: string;
};

export function ProductCard({ href, name, image, summary, priceLabel, unit, meta = [], tag, transitionName }: ProductCardData) {
  const img = (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
      className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.08]"
    />
  );
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-card transition-[transform,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-2 hover:shadow-[0_28px_56px_-28px_rgb(16_36_15/0.4)]">
      <Link href={href} className="relative block aspect-square overflow-hidden" tabIndex={-1} aria-hidden>
        {transitionName ? (
          <ViewTransition name={transitionName}>
            <div className="absolute inset-0">{img}</div>
          </ViewTransition>
        ) : (
          img
        )}
        {tag && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#10240f] backdrop-blur">
            {tag}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-extrabold tracking-tight">
          <Link href={href} className="transition-colors hover:text-accent">
            {name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{summary}</p>
        {meta.length > 0 && (
          <ul className="mb-6 mt-4 flex flex-wrap gap-1.5">
            {meta.map((m) => (
              <li key={m} className="rounded-full border border-line px-2.5 py-1 text-xs font-semibold text-muted">
                {m}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto space-y-4 border-t border-line pt-5">
          {priceLabel ? (
            <p className="whitespace-nowrap leading-none">
              <span className="text-2xl font-extrabold tracking-tight text-accent">{priceLabel}</span>
              {unit && <span className="text-sm text-muted"> / {unit}</span>}
            </p>
          ) : (
            <p className="text-sm font-semibold text-muted">Phục vụ tại hệ thống cơ sở</p>
          )}
          <Link href={href} className="btn btn-primary w-full justify-center !py-3 text-sm">
            {priceLabel ? "Đặt hàng" : "Xem chi tiết"}
            <ArrowRight className="btn-arrow h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Nhãn thông số ngắn cho thẻ sản phẩm: "KLT 200g", "HSD 01 tháng" */
export const productMeta = (specs: { netWeight?: string | null; shelfLife?: string | null }) =>
  [specs.netWeight && `KLT ${specs.netWeight}`, specs.shelfLife && `HSD ${specs.shelfLife.replace(/ (kể )?từ.*/, "")}`].filter(Boolean) as string[];
