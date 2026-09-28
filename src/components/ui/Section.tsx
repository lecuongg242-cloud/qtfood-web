import clsx from "clsx";
import type { ComponentProps } from "react";

export type Tone = "base" | "alt" | "hero" | "deep" | "brand";

type SectionProps = ComponentProps<"section"> & { tone?: Tone };

export function Section({ tone = "base", className, children, ...rest }: SectionProps) {
  return (
    <section data-tone={tone} className={clsx("relative", className)} {...rest}>
      {children}
    </section>
  );
}

export function Container({ className, children, ...rest }: ComponentProps<"div">) {
  return (
    <div className={clsx("mx-auto w-full max-w-[1320px] px-5 sm:px-8", className)} {...rest}>
      {children}
    </div>
  );
}
