"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { ArrowUpRight, Close, ZoomIn, ZoomOut } from "./icons";
import { pauseScroll, resumeScroll } from "@/components/motion/lenis";

type Props = {
  src: string;
  title: string;
  width: number;
  height: number;
  tilt?: "left" | "right";
};

/**
 * Văn bản / giấy chứng nhận: thẻ giấy nghiêng nhẹ, bấm để xem toàn màn hình trong <dialog>.
 * Điện thoại: ảnh rộng hết màn hình, cuộn dọc để đọc; nút phóng to (gấp đôi, kéo ngang) và mở ảnh gốc.
 */
export function DocumentCard({ src, title, width, height, tilt = "left" }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const close = () => dialog.current?.close();

  return (
    <figure className="group">
      <button
        type="button"
        onClick={() => {
          dialog.current?.showModal();
          pauseScroll();
        }}
        aria-label={`Phóng to: ${title}`}
        className={clsx(
          "relative block w-full rounded-xl bg-white p-2 shadow-[0_30px_60px_-30px_rgb(16_36_15/0.45)] ring-1 ring-black/5 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:rotate-0",
          tilt === "left" ? "-rotate-2" : "rotate-2",
        )}
      >
        <span className="relative block overflow-hidden rounded-lg" style={{ aspectRatio: `${width} / ${height}` }}>
          <Image src={src} alt={title} fill sizes="(min-width: 1024px) 26vw, 80vw" className="object-cover" />
          <span className="absolute inset-0 grid place-items-center bg-[#10240f]/0 transition-colors duration-500 group-hover:bg-[#10240f]/35">
            <span className="grid h-14 w-14 scale-75 place-items-center rounded-full bg-white text-[#10240f] opacity-0 shadow-lg transition-all duration-500 ease-[var(--ease-soft)] group-hover:scale-100 group-hover:opacity-100">
              <ZoomIn className="h-6 w-6" />
            </span>
          </span>
        </span>
      </button>
      <figcaption className="mt-5 text-center text-sm font-semibold text-muted">{title}</figcaption>

      <dialog
        ref={dialog}
        aria-label={title}
        onClose={() => {
          setZoomed(false);
          resumeScroll();
        }}
        className="doc-dialog m-0 h-[100dvh] max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-[#0c1a0c]/85 backdrop:backdrop-blur-sm"
      >
        {/* Vùng cuộn riêng (Lenis đang tạm dừng) — bấm ra ngoài ảnh để đóng */}
        <div
          data-lenis-prevent
          className="h-full w-full overflow-auto overscroll-contain"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div
            className={clsx("flex min-h-full items-center px-3 pb-24 pt-20 sm:px-10 sm:pb-24 sm:pt-16", !zoomed && "justify-center")}
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <Image
              src={src}
              alt={title}
              width={width}
              height={height}
              sizes={zoomed ? "200vw" : "(min-width: 640px) 60vw, 100vw"}
              quality={90}
              onClick={() => setZoomed((z) => !z)}
              className={clsx(
                "h-auto max-w-none shrink-0 rounded-lg bg-white shadow-2xl",
                zoomed
                  ? "w-[200%] cursor-zoom-out sm:w-[min(160vw,2400px)]"
                  : "w-full cursor-zoom-in sm:max-h-[calc(100dvh-10rem)] sm:w-auto sm:max-w-full",
              )}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={close}
          aria-label="Đóng"
          className="fixed right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white text-[#10240f] shadow-lg transition-transform hover:rotate-90"
        >
          <Close className="h-5 w-5" />
        </button>
        <div className="fixed bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#10240f] shadow-lg"
          >
            {zoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
            {zoomed ? "Thu nhỏ" : "Phóng to"}
          </button>
          <a
            href={src}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white/90 px-4 py-2.5 text-sm font-bold text-[#10240f] shadow-lg"
          >
            Mở ảnh gốc
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </dialog>
    </figure>
  );
}
