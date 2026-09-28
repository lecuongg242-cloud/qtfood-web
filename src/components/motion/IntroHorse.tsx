"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { HORSE_PATH } from "./horse-path";

gsap.registerPlugin(DrawSVGPlugin);

/**
 * Hiệu ứng lần đầu vào site: nét ngựa được vẽ → tô màu → màn che trượt lên mở ra trang (≈1,2s).
 * Chỉ chạy khi script đầu trang gắn class `intro` lên <html> (1 lần mỗi phiên, không reduced-motion);
 * ngoài ra màn che bị ẩn bằng CSS nên không nháy. Xem `introBootScript`.
 */
export function IntroHorse() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    if (!el || !html.classList.contains("intro")) return;
    const done = () => html.classList.remove("intro");
    const tl = gsap
      .timeline({ onComplete: done })
      .fromTo(el.querySelector(".intro-stroke"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.7, ease: "power2.inOut" })
      .to(el.querySelector(".intro-fill"), { opacity: 1, duration: 0.25, ease: "power1.out" }, 0.5)
      .to(el, { yPercent: -100, duration: 0.45, ease: "expo.inOut" }, 0.75);
    return () => {
      tl.kill();
      done();
    };
  }, []);

  return (
    <div ref={root} data-tone="hero" aria-hidden className="intro-overlay">
      <svg viewBox="-4 -4 764 408" className="w-[min(46vw,15rem)]">
        <path className="intro-fill" d={HORSE_PATH} fill="#4cb448" fillRule="evenodd" opacity={0} />
        <path className="intro-stroke" d={HORSE_PATH} fill="none" stroke="#2d8a2a" strokeWidth={2.5} strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/** Chạy trong <head> trước khi vẽ: bật cờ `js`, và `intro` nếu là lần đầu trong phiên */
export const introBootScript = `(function(d){d.classList.add('js');try{if(!sessionStorage.getItem('qt-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('intro');sessionStorage.setItem('qt-intro','1')}}catch(e){}})(document.documentElement)`;
