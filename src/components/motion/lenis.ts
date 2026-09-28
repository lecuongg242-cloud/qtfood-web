import type Lenis from "lenis";

/** Giữ instance Lenis để tạm dừng cuộn mượt khi mở hộp thoại (lightbox, xem văn bản…) */
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const pauseScroll = () => {
  instance?.stop();
  document.documentElement.style.overflow = "hidden";
};

export const resumeScroll = () => {
  document.documentElement.style.overflow = "";
  instance?.start();
};
