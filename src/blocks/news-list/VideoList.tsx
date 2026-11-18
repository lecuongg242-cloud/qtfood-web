"use client";

import { useRef } from "react";

export type VideoItem = { src: string; title: string };

/**
 * Video nổi bật tự lưu (Vercel Blob) — thay cho khung nhúng TikTok (TikTok hay chặn nhúng: "Player authentication failed").
 * Không tự phát; chỉ tải phần đầu (preload="metadata", #t=0.1 để hiện khung hình đầu làm ảnh bìa, kể cả trên iPhone).
 * Phát video này thì video kia tự dừng. Điện thoại: vuốt ngang từng video; từ sm: 2 cột.
 */
export function VideoList({ videos }: { videos: VideoItem[] }) {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  return (
    <ul className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 [scrollbar-width:none]">
      {videos.map((v, i) => (
        <li
          key={v.src}
          data-reveal
          className="w-[74%] shrink-0 snap-center overflow-hidden rounded-2xl bg-black shadow-[0_24px_48px_-28px_rgb(16_36_15/0.45)] sm:w-auto"
        >
          <video
            ref={(el) => {
              refs.current[i] = el;
            }}
            src={`${v.src}#t=0.1`}
            title={v.title}
            aria-label={v.title}
            controls
            playsInline
            preload="metadata"
            onPlay={() => refs.current.forEach((other, j) => j !== i && other && !other.paused && other.pause())}
            className="block aspect-[9/16] w-full bg-black object-contain"
          />
        </li>
      ))}
    </ul>
  );
}
