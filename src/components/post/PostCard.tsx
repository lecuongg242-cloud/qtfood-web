import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, Calendar } from "@/components/ui/icons";

export type PostCardData = {
  href: string;
  title: string;
  excerpt: string;
  categoryLabel: string;
  dateLabel: string;
  cover?: { src: string; alt: string };
};

/** Thẻ bài viết: ảnh bìa ngang, chuyên mục, ngày, tóm tắt. `large` → thẻ nổi bật (bài mới nhất). */
export function PostCard({ href, title, excerpt, categoryLabel, dateLabel, cover, large }: PostCardData & { large?: boolean }) {
  return (
    <article
      className={clsx(
        "group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-card transition-[transform,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-2 hover:shadow-[0_28px_56px_-28px_rgb(16_36_15/0.4)]",
        large && "lg:grid lg:grid-cols-[1.15fr_1fr]",
      )}
    >
      <Link href={href} tabIndex={-1} aria-hidden className={clsx("relative block overflow-hidden bg-bg", large ? "aspect-[16/10] lg:aspect-auto lg:min-h-[22rem]" : "aspect-[16/10]")}>
        {cover && (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes={large ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
          />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#10240f] backdrop-blur">
          {categoryLabel}
        </span>
      </Link>
      <div className={clsx("flex flex-1 flex-col p-6", large && "lg:justify-center lg:p-10")}>
        <p className="flex items-center gap-2 text-sm text-muted">
          <Calendar className="h-4 w-4" />
          {dateLabel}
        </p>
        <h3 className={clsx("mt-3 font-extrabold leading-snug tracking-tight text-balance", large ? "text-[clamp(1.4rem,2.4vw,2rem)]" : "text-xl")}>
          <Link href={href} className="transition-colors hover:text-accent">
            {title}
          </Link>
        </h3>
        <p className={clsx("mt-3 leading-relaxed text-muted", large ? "line-clamp-4" : "line-clamp-3 text-[0.95rem]")}>{excerpt}</p>
        <Link href={href} className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-accent">
          Đọc tiếp
          <ArrowRight className="btn-arrow h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          <span className="sr-only">: {title}</span>
        </Link>
      </div>
    </article>
  );
}
