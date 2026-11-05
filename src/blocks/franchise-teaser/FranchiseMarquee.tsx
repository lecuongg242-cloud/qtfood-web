"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/ui/Lightbox";
import { ZoomIn } from "@/components/ui/icons";

const ALT = "Khai trương cơ sở nhượng quyền QT FOOD";

/** Dải ảnh khai trương chạy ngang (2 hàng, hàng dưới lệch nửa ảnh) — bấm ảnh để mở xem toàn màn hình. */
export function FranchiseMarquee({ gallery }: { gallery: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const half = Math.ceil(gallery.length / 2);
  const rows = [gallery.slice(0, half), gallery.slice(half)];
  const images = gallery.map((src, i) => ({ src, alt: `${ALT} – ảnh ${i + 1}` }));

  return (
    <>
      <div className="marquee-wrap mt-20 space-y-4" aria-label="Ảnh khai trương các cơ sở nhượng quyền">
        {rows.map((row, r) => (
          <div key={r} className="overflow-hidden">
            <div
              className="marquee gap-4 pr-4"
              style={{ ["--marquee-duration" as string]: "120s", animationDelay: r === 1 ? "-4.6s" : undefined }}
            >
              {/* Nhân đôi hàng để chạy vòng liền mạch; bản sao ẩn với trình đọc màn hình / phím Tab */}
              {[...row, ...row].map((src, i) => {
                const index = (r === 0 ? 0 : half) + (i % row.length);
                const copy = i >= row.length;
                return (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    onClick={() => setOpen(index)}
                    aria-label={copy ? undefined : `Xem ảnh ${index + 1}: ${ALT}`}
                    aria-hidden={copy || undefined}
                    tabIndex={copy ? -1 : undefined}
                    className="group relative h-56 w-44 shrink-0 cursor-zoom-in overflow-hidden rounded-2xl bg-card sm:h-72 sm:w-56"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      loading="eager"
                      sizes="224px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 grid place-items-center bg-[#10240f]/0 transition-colors duration-500 group-hover:bg-[#10240f]/30">
                      <span className="grid h-12 w-12 scale-75 place-items-center rounded-full bg-white text-[#10240f] opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                        <ZoomIn className="h-5 w-5" />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <Lightbox images={images} index={open} onChange={setOpen} />
    </>
  );
}
