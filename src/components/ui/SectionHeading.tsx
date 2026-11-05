import clsx from "clsx";
import { Rich } from "./Rich";
import { HorseMark } from "./icons";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={clsx(
        "inline-flex items-center gap-3 text-[0.9rem] font-extrabold uppercase tracking-[0.16em] text-accent sm:text-base",
        className,
      )}
    >
      <HorseMark className="h-5 w-auto sm:h-6" />
      {children}
    </p>
  );
}

export function SectionHeading({ eyebrow, title, description, align = "left", className }: Props) {
  return (
    <div className={clsx(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      {eyebrow && (
        <div data-reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        data-split
        className="rich mt-4 text-[clamp(2rem,4.2vw,3.5rem)] font-extrabold leading-[1.16] tracking-[-0.025em] text-balance"
      >
        <Rich text={title} />
      </h2>
      {description && (
        <p data-reveal className="mt-5 text-lg leading-relaxed text-muted text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}
