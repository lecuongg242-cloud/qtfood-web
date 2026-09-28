"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { PostCard, type PostCardData } from "./PostCard";

type Item = PostCardData & { category: string };

/**
 * Lưới bài viết + lọc theo chuyên mục. Chuyên mục đang chọn lưu ở `?loai=` (chia sẻ link được),
 * đổi bằng history.replaceState để trang vẫn tĩnh (không cần searchParams phía server).
 */
export function NewsGrid({ posts, categories }: { posts: Item[]; categories: { value: string; label: string }[] }) {
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    const loai = new URLSearchParams(window.location.search).get("loai");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- đọc URL sau khi hydrate (trang tĩnh)
    if (loai && categories.some((c) => c.value === loai)) setCategory(loai);
  }, [categories]);

  const select = (value: string | null) => {
    setCategory(value);
    const url = new URL(window.location.href);
    if (value) url.searchParams.set("loai", value);
    else url.searchParams.delete("loai");
    window.history.replaceState(null, "", url);
  };

  const visible = category ? posts.filter((p) => p.category === category) : posts;
  const [first, ...rest] = visible;

  return (
    <>
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc theo chuyên mục">
          {[null, ...categories.map((c) => c.value)].map((value) => (
            <button
              key={value ?? "all"}
              type="button"
              onClick={() => select(value)}
              aria-pressed={category === value}
              className={clsx(
                "rounded-full border px-4 py-2 text-sm font-bold transition-colors duration-300",
                category === value ? "border-[#4cb448] bg-[#4cb448] text-[#0f230f]" : "border-line bg-card hover:border-[#4cb448]",
              )}
            >
              {value ? categories.find((c) => c.value === value)?.label : "Tất cả"}
            </button>
          ))}
        </div>
      )}

      {first ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2 lg:col-span-3">
            <PostCard {...first} large />
          </div>
          {rest.map((p) => (
            <PostCard key={p.href} {...p} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-muted">Chưa có bài viết trong chuyên mục này.</p>
      )}
    </>
  );
}
