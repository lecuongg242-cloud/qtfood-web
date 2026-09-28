"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Facebook, LinkIcon, Share } from "@/components/ui/icons";

const noop = () => () => {};

const btn =
  "inline-flex h-11 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-bold transition-colors duration-300 hover:border-[#4cb448] hover:text-accent";

/**
 * Chia sẻ bài viết: Facebook, Zalo/khác qua bảng chia sẻ của điện thoại (Web Share API — có Zalo trên máy đã cài),
 * sao chép link. `url` là URL tuyệt đối của bài.
 */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  // Server & lần vẽ đầu: false → sau hydrate mới hiện nút (tránh lệch HTML)
  const canShare = useSyncExternalStore(noop, () => "share" in navigator, () => false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Sao chép link bài viết:", url);
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-muted">Chia sẻ:</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
      >
        <Facebook className="h-4 w-4" />
        Facebook
      </a>
      {canShare && (
        <button type="button" className={btn} onClick={() => navigator.share({ title, url }).catch(() => {})}>
          <Share className="h-4 w-4" />
          Zalo / khác
        </button>
      )}
      <button type="button" className={btn} onClick={copy} aria-live="polite">
        {copied ? <Check className="h-4 w-4 text-accent" /> : <LinkIcon className="h-4 w-4" />}
        {copied ? "Đã sao chép" : "Sao chép link"}
      </button>
    </div>
  );
}
