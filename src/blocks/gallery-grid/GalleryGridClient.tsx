"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Lightbox } from "@/components/ui/Lightbox";
import { ZoomIn } from "@/components/ui/icons";

export function GalleryGridClient({ images, initial }: { images: { src: string; alt: string }[]; initial: number }) {
  const [open, setOpen] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? images : images.slice(0, initial);

  return (
    <>
      <ul className="mt-14 grid grid-flow-dense grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((img, i) => (
          // Chỉ ảnh ban đầu có hiệu ứng xuất hiện; ảnh mở thêm sau đó hiện ngay (không bị ẩn chờ hiệu ứng)
          <li key={img.src} data-reveal={i < initial ? "" : undefined} className={clsx(i % 5 === 0 && "row-span-2")}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Xem ảnh ${i + 1}: ${img.alt}`}
              className="group relative block h-full min-h-44 w-full overflow-hidden rounded-2xl bg-card sm:min-h-56"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-[1.1s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
              />
              <span className="absolute inset-0 grid place-items-center bg-[#10240f]/0 transition-colors duration-500 group-hover:bg-[#10240f]/30">
                <span className="grid h-12 w-12 scale-75 place-items-center rounded-full bg-white text-[#10240f] opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                  <ZoomIn className="h-5 w-5" />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      {!showAll && images.length > initial && (
        <div className="mt-10 text-center">
          <button type="button" onClick={() => setShowAll(true)} className="btn btn-ghost">
            <span>Xem thêm {images.length - initial} ảnh</span>
          </button>
        </div>
      )}
      <Lightbox images={images} index={open} onChange={setOpen} />
    </>
  );
}
