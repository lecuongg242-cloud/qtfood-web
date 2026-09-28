"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Close } from "./icons";
import { pauseScroll, resumeScroll } from "@/components/motion/lenis";

export type LightboxImage = { src: string; alt: string };

type Props = {
  images: LightboxImage[];
  /** chỉ số ảnh đang mở; null = đóng */
  index: number | null;
  onChange: (index: number | null) => void;
};

/** Xem ảnh toàn màn hình: nút/phím ←/→, vuốt trên điện thoại, Esc để đóng, trả focus về ảnh đã bấm. */
export function Lightbox({ images, index, onChange }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const open = index !== null;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      setLoaded(false);
      onChange((index + delta + images.length) % images.length);
    },
    [index, images.length, onChange],
  );

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) {
      opener.current = document.activeElement as HTMLElement;
      el.showModal();
      pauseScroll();
    } else if (!open && el.open) {
      el.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const current = index !== null ? images[index] : null;

  return (
    <dialog
      ref={dialog}
      aria-label="Xem ảnh"
      onClose={() => {
        resumeScroll();
        onChange(null);
        opener.current?.focus();
      }}
      onClick={(e) => e.target === dialog.current && dialog.current.close()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
      className="doc-dialog m-auto h-[100dvh] max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-[#0c1a0c]/85 backdrop:backdrop-blur-sm"
    >
      {current && (
        <div className="grid h-full w-full place-items-center p-4 sm:p-12" onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}>
          <div className="relative flex max-h-full max-w-full items-center justify-center">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={1600}
              height={2000}
              sizes="94vw"
              quality={85}
              onLoad={() => setLoaded(true)}
              className={`h-auto max-h-[82dvh] w-auto max-w-full rounded-xl object-contain shadow-2xl transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
            />
          </div>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-sm font-semibold text-white">
            {(index ?? 0) + 1} / {images.length}
          </p>
        </div>
      )}
      <button
        type="button"
        onClick={() => dialog.current?.close()}
        aria-label="Đóng"
        className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white text-[#10240f] shadow-lg transition-transform hover:rotate-90"
      >
        <Close className="h-5 w-5" />
      </button>
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Ảnh trước"
            className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#10240f] shadow-lg transition-colors hover:bg-[#4cb448] sm:grid"
          >
            <ArrowRight className="h-5 w-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Ảnh sau"
            className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#10240f] shadow-lg transition-colors hover:bg-[#4cb448] sm:grid"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </>
      )}
    </dialog>
  );
}
