"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type HeroSlide = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Ảnh nền liền màu (vd banner nền xanh): lấp phần thừa bằng màu này thay vì ảnh làm mờ */
  bg?: string;
};

const INTERVAL = 6000;

/**
 * Ảnh bìa chạy luân phiên. Ảnh đầu tiên quyết định khung (hiện trọn theo tỉ lệ gốc, không cắt chữ);
 * ảnh sau khác tỉ lệ thì nằm giữa khung, phần thừa lấp bằng chính ảnh đó làm mờ.
 * Tự chuyển mỗi 6 giây (dừng khi rê chuột / người dùng bật giảm chuyển động); vuốt ngang trên điện thoại.
 */
export function HeroSlides({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;
  const go = useCallback((i: number) => setActive(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % count), INTERVAL);
    return () => window.clearInterval(id);
  }, [count, paused, active]);

  const [first, ...rest] = slides;
  const fade = (i: number) => `transition-opacity duration-1000 ease-out ${i === active ? "opacity-100" : "opacity-0"}`;

  return (
    <div
      className="relative isolate overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
      }}
      aria-roledescription="carousel"
    >
      {/* Máy tính: phần trống hai bên lấp bằng ảnh đang hiện làm mờ */}
      {slides.map((s, i) =>
        s.bg ? (
          <div key={`bg-${s.src}`} aria-hidden className={`absolute inset-0 -z-10 hidden lg:block ${fade(i)}`} style={{ background: s.bg }} />
        ) : (
          <Image
            key={`bg-${s.src}`}
            src={s.src}
            alt=""
            aria-hidden
            fill
            quality={30}
            sizes="40vw"
            className={`-z-10 hidden scale-110 object-cover blur-2xl saturate-125 lg:block ${fade(i)}`}
          />
        ),
      )}

      <div className="relative mx-auto w-full lg:w-fit lg:max-w-full lg:[mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]">
        <Image
          src={first.src}
          alt={first.alt}
          aria-hidden={active !== 0}
          width={first.width}
          height={first.height}
          preload
          quality={85}
          sizes="100vw"
          className={`mx-auto block h-auto w-full lg:w-auto lg:max-h-[calc(100svh-84px-9rem)] lg:max-w-full ${fade(0)}`}
        />
        {/* Ảnh sau (không có màu nền riêng): nằm trong khung của ảnh đầu, phần thừa lấp bằng ảnh làm mờ */}
        {rest.map((s, n) =>
          s.bg ? null : (
            <div key={s.src} aria-hidden={active !== n + 1} className={`absolute inset-0 overflow-hidden ${fade(n + 1)}`}>
              <Image src={s.src} alt="" aria-hidden fill quality={30} sizes="40vw" className="scale-110 object-cover blur-2xl saturate-125" />
              <Image src={s.src} alt={s.alt} fill quality={85} sizes="100vw" className="object-contain" />
            </div>
          ),
        )}
      </div>

      {/* Ảnh nền liền màu (vd banner bản đồ): trải hết chiều ngang, nằm giữa theo chiều dọc,
          mép trên/dưới mờ dần vào đúng màu nền ảnh — không lộ đường nối */}
      {rest.map((s, n) =>
        s.bg ? (
          <div
            key={s.src}
            aria-hidden={active !== n + 1}
            className={`absolute inset-0 flex items-center overflow-hidden ${fade(n + 1)}`}
            style={{ background: s.bg }}
          >
            <div
              className="relative max-h-full w-full [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]"
              style={{ aspectRatio: `${s.width} / ${s.height}` }}
            >
              <Image src={s.src} alt={s.alt} fill quality={85} sizes="100vw" className="object-contain" />
            </div>
          </div>
        ) : null,
      )}

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2 sm:bottom-5">
          {slides.map((s, i) => (
            <button
              key={`dot-${s.src}`}
              type="button"
              onClick={() => go(i)}
              aria-label={`Xem ảnh bìa ${i + 1}`}
              aria-current={i === active}
              className={`h-2.5 rounded-full shadow ring-1 ring-black/10 transition-all duration-300 ${
                i === active ? "w-7 bg-white" : "w-2.5 bg-white/60 hover:bg-white/90"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
