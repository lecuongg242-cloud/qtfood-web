import Image from "next/image";
import clsx from "clsx";

/** Logo tự đổi bản màu / bản trắng theo tone nền (biến CSS --logo-color / --logo-white). */
export function Logo({ className, preload }: { className?: string; preload?: boolean }) {
  return (
    <span className={clsx("relative block aspect-[1600/708]", className)}>
      <Image
        src="/brand/logo-qtfood.png"
        alt="QT FOOD"
        fill
        sizes="200px"
        preload={preload}
        className="logo-color object-contain"
      />
      <Image
        src="/brand/logo-qtfood-white.png"
        alt=""
        aria-hidden
        fill
        sizes="200px"
        className="logo-white object-contain"
      />
    </span>
  );
}
