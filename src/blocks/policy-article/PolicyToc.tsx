"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

/** Mục lục bám theo khi cuộn, tô đậm mục đang đọc. */
export function PolicyToc({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -60% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Mục lục" className="sticky top-28">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Mục lục</p>
      <ol className="mt-4 space-y-1 border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={clsx(
                "-ml-px block border-l-2 py-2 pl-4 text-sm leading-snug transition-colors duration-300",
                active === item.id ? "border-[#4cb448] font-bold text-ink" : "border-transparent text-muted hover:text-ink",
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
