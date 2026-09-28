import Image from "next/image";
import clsx from "clsx";

/** Logo SVG tự đổi bản màu / bản trắng theo tone nền (biến CSS --logo-color / --logo-white). */
export function Logo({ className, preload }: { className?: string; preload?: boolean }) {
  return (
    <span className={clsx("relative block aspect-[1600/708]", className)}>
      <Image src="/brand/logo-qtfood.svg" alt="QT FOOD" fill unoptimized preload={preload} className="logo-color object-contain" />
      <Image src="/brand/logo-qtfood-white.svg" alt="" aria-hidden fill unoptimized className="logo-white object-contain" />
    </span>
  );
}
