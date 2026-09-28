import clsx from "clsx";
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Hình ngựa từ logo, tô theo currentColor (CSS mask). */
export function HorseMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={clsx("inline-block aspect-[756/400] bg-current", className)}
      style={{
        maskImage: "url(/brand/horse.png)",
        WebkitMaskImage: "url(/brand/horse.png)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

export const ArrowRight = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const ArrowUpRight = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
export const Phone = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);
export const Mail = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
export const MapPin = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
export const Check = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2.4} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
export const ZoomIn = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
  </svg>
);
export const Menu = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);
export const Close = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const Leaf = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" />
    <path d="M5 19c3-4 6-7 10-9" />
  </svg>
);
export const ShieldCheck = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
export const Handshake = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="m11 7-2-2-6 6 2 2M13 7l2-2 6 6-2 2" />
    <path d="m7 13 4 4c.6.6 1.4.6 2 0l4.5-4.5M9 11l2.5-2.5a1.5 1.5 0 0 1 2 0L17 12" />
  </svg>
);
export const Bowl = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M3 12h18a9 9 0 0 1-18 0Z" />
    <path d="M9 8c0-1.5 1-1.5 1-3M13 8c0-1.5 1-1.5 1-3M8 21h8" />
  </svg>
);
export const Facebook = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.3-.1c-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21h3Z" />
  </svg>
);
export const TikTok = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.8a5.7 5.7 0 1 0 4.8 5.6V9.1a7.3 7.3 0 0 0 4.3 1.4v-3a4.3 4.3 0 0 1-3.2-1.7Z" />
  </svg>
);
export const Zalo = ({ className }: { className?: string }) => (
  <span aria-hidden className={clsx("font-extrabold tracking-tight", className)}>
    Zalo
  </span>
);

export const commitmentIcons = [Leaf, ShieldCheck, Handshake, Bowl];
