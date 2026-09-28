"use client";

import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const EASE = "expo.out";

/**
 * Gắn hiệu ứng theo data-attribute, để block vẫn là server component:
 *  - data-split       : tiêu đề trồi lên từng dòng
 *  - data-reveal      : fade-up (tự động so le theo nhóm)
 *  - data-clip        : ảnh mở từ dưới lên bằng clip-path
 *  - data-parallax=N  : dịch chuyển theo cuộn (N = tỉ lệ, vd 0.15)
 *  - data-count=N     : số đếm lên N
 *  - data-scrub-x=N   : chạy ngang theo cuộn (N = % chiều rộng)
 *  - data-draw        : đường kẻ "vẽ" dần theo cuộn (ngang hoặc dọc tuỳ kích thước)
 */
export function Animations() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const splits: SplitText[] = [];
        // Đang chạy hiệu ứng mở trang (IntroHorse) → hero chờ màn che mở ra rồi mới chạy
        const introDelay = document.documentElement.classList.contains("intro") ? 0.85 : 0;

        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const inHero = !!el.closest("[data-hero]");
          splits.push(
            SplitText.create(el, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              onSplit(self) {
                gsap.set(el, { visibility: "visible" });
                // Nới khung che để dấu tiếng Việt (ẩ, ợ…) không bị cắt khi line-height chặt
                gsap.set(self.masks, { paddingBlock: "0.25em", marginBlock: "-0.25em" });
                return gsap.from(self.lines, {
                  yPercent: 140,
                  duration: 1.2,
                  ease: EASE,
                  stagger: 0.09,
                  delay: inHero ? 0.25 + introDelay : 0,
                  scrollTrigger: inHero ? undefined : { trigger: el, start: "top 88%", once: true },
                  // Chạy xong thì trả về HTML gốc: không còn khung che, không còn chia dòng
                  onComplete: () => {
                    self.kill();
                    self.revert();
                  },
                });
              },
            }),
          );
        });

        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { y: 36, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 1.1, ease: EASE, stagger: 0.09, overwrite: true, delay: batch[0]?.closest("[data-hero]") ? introDelay : 0 },
            ),
        });

        gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
          gsap.to(el, {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.5,
            ease: "expo.inOut",
            delay: el.closest("[data-hero]") ? 0.15 + introDelay : 0,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || "0.15");
          gsap.fromTo(
            el,
            { yPercent: -speed * 50 },
            {
              yPercent: speed * 50,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const target = parseFloat(el.dataset.count || "0");
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = Math.round(obj.v).toString();
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-scrub-x]").forEach((el) => {
          const amount = parseFloat(el.dataset.scrubX || "-30");
          gsap.fromTo(
            el,
            { xPercent: 0 },
            {
              xPercent: amount,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((el) => {
          const horizontal = el.offsetWidth >= el.offsetHeight;
          gsap.fromTo(
            el,
            horizontal ? { scaleX: 0 } : { scaleY: 0 },
            {
              ...(horizontal ? { scaleX: 1 } : { scaleY: 1 }),
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top 75%", end: "bottom 60%", scrub: 0.6 },
            },
          );
        });

        return () => splits.forEach((s) => s.revert());
      });

      // Khi giảm chuyển động: hiện mọi thứ ngay
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal], [data-split]", { autoAlpha: 1, visibility: "visible" });
        gsap.set("[data-clip]", { clipPath: "none" });
      });

      // Font tải xong có thể đổi chiều cao → tính lại vị trí trigger
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
