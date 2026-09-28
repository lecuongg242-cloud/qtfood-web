"use client";

import { useState, ViewTransition } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Lightbox } from "@/components/ui/Lightbox";
import { ZoomIn } from "@/components/ui/icons";
import type { ProductImage } from "@/lib/data/products";

/** Ảnh lớn (chuyển cảnh từ thẻ sản phẩm) + dải ảnh nhỏ + phóng to */
export function ProductGallery({ images, transitionName, badge }: { images: ProductImage[]; transitionName: string; badge?: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const current = images[active];

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(active)}
        aria-label={`Phóng to ảnh: ${current?.alt}`}
        className="group relative block aspect-square w-full overflow-hidden rounded-[2rem] bg-card"
      >
        <ViewTransition name={transitionName}>
          <div className="absolute inset-0">
            {current && (
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                preload
                quality={85}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
              />
            )}
          </div>
        </ViewTransition>
        <span className="absolute bottom-5 right-5 grid h-12 w-12 place-items-center rounded-full bg-white/90 text-[#10240f] shadow-lg backdrop-blur transition-transform duration-300 group-hover:scale-110">
          <ZoomIn className="h-5 w-5" />
        </span>
        {badge && <span className="absolute left-5 top-5">{badge}</span>}
      </button>

      {images.length > 1 && (
        <ul className="mt-4 grid grid-cols-5 gap-3">
          {images.map((image, i) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Xem ảnh ${i + 1}`}
                aria-pressed={active === i}
                className={clsx(
                  "relative block aspect-square w-full overflow-hidden rounded-xl border-2 transition-[border-color,opacity] duration-300",
                  active === i ? "border-[#4cb448]" : "border-transparent opacity-70 hover:opacity-100",
                )}
              >
                <Image src={image.src} alt="" fill sizes="120px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <Lightbox images={images} index={open} onChange={setOpen} />
    </div>
  );
}
