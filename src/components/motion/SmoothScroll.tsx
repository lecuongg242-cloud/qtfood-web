"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis, setLenis } from "./lenis";

gsap.registerPlugin(ScrollTrigger);

/** Trạng thái lần chuyển trang đang diễn ra (do bấm link hay do Quay lại/Tiến tới) */
const nav = { pop: false, keep: false };

/** Dừng quán tính cuộn mượt tại chỗ (không di chuyển trang) */
const stopInertia = () => {
  const lenis = getLenis();
  if (lenis?.isScrolling) lenis.scrollTo(window.scrollY, { immediate: true, force: true });
};

/** Nhảy ngay lên đầu trang (cả Lenis lẫn cuộn gốc của trình duyệt) */
const jumpToTop = () => {
  getLenis()?.scrollTo(0, { immediate: true, force: true });
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
};

/**
 * Cuộn mượt có quán tính (Lenis), đồng bộ với GSAP ScrollTrigger.
 *
 * Tự xử lý vị trí cuộn khi chuyển trang (không phụ thuộc vào việc Next.js tự cuộn — vốn không ổn định khi có
 * cuộn mượt: Lenis đang trôi theo quán tính sẽ đẩy trang mới về vị trí cũ, vd đang ở cuối trang → sang trang khác
 * vẫn bị ở cuối):
 *  - bấm link sang trang khác  → lên đầu trang mới
 *  - bấm link tới chính trang đang xem → cuộn mượt lên đầu
 *  - Quay lại / Tiến tới        → giữ vị trí trình duyệt khôi phục
 *  - link có #mục               → để Lenis cuộn tới mục đó
 *  - link nằm trong [data-keep-scroll] (vd tab lọc nhóm sản phẩm) → giữ nguyên vị trí
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const firstPath = useRef(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.09, anchors: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement) || a.origin !== window.location.origin || (a.target && a.target !== "_self")) return;
      if (a.hasAttribute("download")) return;
      stopInertia();
      nav.pop = false;
      nav.keep = Boolean(a.closest("[data-keep-scroll]")) || Boolean(a.hash);
      // Cùng trang (không có #mục): Next.js không cuộn → tự đưa lên đầu
      if (a.pathname === window.location.pathname && !a.hash && !nav.keep) {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    const onPop = () => {
      stopInertia();
      nav.pop = true;
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  // Đã sang trang mới (bỏ qua lần tải trang đầu tiên — để trình duyệt tự khôi phục vị trí khi tải lại)
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    const { pop, keep } = nav;
    nav.pop = false;
    nav.keep = false;
    if (pop) return stopInertia();
    if (keep || window.location.hash) return;
    jumpToTop();
    // Phòng khi nội dung trang mới còn đang dựng xong ở khung hình kế tiếp
    const id = requestAnimationFrame(jumpToTop);
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
