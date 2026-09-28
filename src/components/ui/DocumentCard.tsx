"use client";

import { useRef } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Close, ZoomIn } from "./icons";
import { pauseScroll, resumeScroll } from "@/components/motion/lenis";

type Props = {
  src: string;
  title: string;
  width: number;
  height: number;
  tilt?: "left" | "right";
};

/** Văn bản / giấy chứng nhận: thẻ giấy nghiêng nhẹ, bấm để phóng to trong <dialog>. */
export function DocumentCard({ src, title, width, height, tilt = "left" }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);

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
        onClose={resumeScroll}
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        className="doc-dialog m-auto max-h-[94vh] max-w-[94vw] overflow-visible bg-transparent p-0 backdrop:bg-[#0c1a0c]/75 backdrop:backdrop-blur-sm"
      >
        <Image
          src={src}
          alt={title}
          width={width}
          height={height}
          sizes="94vw"
          quality={85}
          className="h-auto max-h-[90vh] w-auto rounded-lg shadow-2xl"
        />
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          aria-label="Đóng"
          className="absolute -right-3 -top-3 grid h-11 w-11 place-items-center rounded-full bg-white text-[#10240f] shadow-lg transition-transform hover:rotate-90"
        >
          <Close className="h-5 w-5" />
        </button>
      </dialog>
    </figure>
  );
}
