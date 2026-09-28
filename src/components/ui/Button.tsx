import clsx from "clsx";
import Link from "next/link";
import { ArrowRight } from "./icons";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  arrow?: boolean;
  className?: string;
  external?: boolean;
};

export function Button({ href, children, variant = "primary", arrow = true, className, external }: Props) {
  const cls = clsx("btn", variant === "primary" ? "btn-primary" : "btn-ghost", className);
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight className="btn-arrow h-4 w-4" />}
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
